import treeTemplate from './menu-tree.template.html';
import * as style from './menu-tree.style.less';
import { objectGetProperty, objectIndexOf } from "../../utils/utils";

export class MenuTreeController {
    constructor(Store, $timeout, $ngConfirm, MenuSettingService, $state) {
        console.log(Store.data);
        this.$ngConfirm = $ngConfirm;
        this.globalData = Store.data;
        this.menuSettingService = MenuSettingService;
        this.$state = $state;
        this.$timeout = $timeout;
        this.checkednodes = [];
        this.checkedids = [];
        this.tree = {};
        let that = this;
        this.menuTreeOption = {
            dropped(event) {
                console.log(event);
                console.log(that.menuConfig);
                if (objectGetProperty(event.dest.nodesScope,'$parent.$modelValue.id')) {
                    event.source.nodeScope.$modelValue.parentId = event.dest.nodesScope.$parent.$modelValue.id;
                } else {
                    event.source.nodeScope.$modelValue.parentId = '0';
                }
                // 通过source获取原始的hashkey，然后在在dest里获取对应的formName,这样不行，因为放下去之后form重新命名了
                // let hashKay = event.source.nodeScope.$modelValue.$$hashKey;
                // console.log(event.dest.nodesScope.$nodesMap[hashKay].$childNodesScope.formName);
                // that[event.dest.nodesScope.$nodesMap[hashKay].$childNodesScope.formName].$setDirty();
                /*that.$timeout(_ => {
                    that[event.dest.nodesScope.$nodesMap[hashKay].$childNodesScope.formName].$setDirty();
                },0);*/
                console.log();
                that.$timeout( _ => {
                    event.source.nodeScope.$element.find('[contenteditable]').eq(0).controller('ngModel').$$parentForm.$setDirty();
                }, 0);
            }
        };
        this.style = style;
    }

    queryPage() {
        this.menuSettingService.getMenuList().then(res => {
            console.log(res);
            let dict = new Map();
            res.forEach((item, i) => {
                res[i].children = [];
                dict.set(item.id, item);
            });

            if(Array.isArray(this.inputids)) {
                this.inputids.map(id => {
                    dict.get(id).checked = true;
                });
            }

            res.forEach(item => {
                if(item.parentId !== '0') {
                    dict.get(item.parentId).children.push(item);
                }
            });

            dict.forEach(item => {
                if(item.parentId !== '0') {
                    dict.delete(item.id);
                }
            });

            this.menuConfig = Array.from(dict.values());
            // this.globalData.menuConfig = this.menuConfig;

        }, err => {
            console.info(err);
        });
    }

    $onInit() {
        this.queryPage();
    }

    $onChanges(changes) {
        if(changes.inputids.currentValue) {
            this.queryPage();
        }
    }

    addNode(scope) {
        console.log(scope);
        let list = scope.$modelValue;
        // 新增的节点加入一个isNew字段判断之后调用保存还是更新方法
        list.children.unshift({
            title: 'New node',
            url: '#',
            type: 0,
            parentId: list.id,
            icon: '',
            isNew: true,
            children: []
        })
    }

    removeNode(scope) {
        let that = this;
        let node = scope.$modelValue;
        console.log(scope);
        that.$ngConfirm({
            icon: 'fa fa-warning',
            theme: 'material',
            type: 'orange',
            title: 'Delete?',
            animation: 'zoom',
            closeAnimation: 'zoom',
            animationSpeed: 200,
            content: 'This operation cannot be rollbacked',
            autoClose: 'cancel|5000',
            buttons: {
                deleteUser: {
                    text: 'YES',
                    btnClass: 'btn-orange',
                    action: function () {
                        that.menuSettingService.deleteMenuItem(node).then(res => {
                            console.log(res);
                            scope.remove();
                        }, err => {

                        });

                    }
                },
                cancel: {
                    text: 'NO',
                    action:  function () {

                    }
                }
            }
        });
    }

    saveNode(scope, formName) {
        let node = scope.$modelValue;
        this.menuSettingService.addMenuItem(node).then(res=> {
            console.log(res);
            this[formName].$setPristine();
        }, err => {
            console.log(err);
        });
    }

    updateNode(scope, formName) {
        let node = scope.$modelValue;
        this.menuSettingService.updateMenuItem(node).then(res => {
            console.log(res, this[formName]);
            this[formName].$setPristine();
        }, err => {
            console.log(err);
        });
    }

    checkItem(node) {
        console.log(this);
        if(!Array.isArray(this.checkedids)) {
            this.checkedids = []
        }
        let index = this.checkedids.indexOf(node.id);
        if (node.checked) {
            if (index === -1) {
                this.checkedids.push(node.id);
            }
        } else {
            if (index > -1) {
                this.checkedids.splice(index, 1);
            }
        }
    }
}

MenuTreeController.$inject=['Store', '$timeout', '$ngConfirm', 'MenuSettingService', '$state'];

export const menuTree = {
    controller: MenuTreeController,
    controllerAs: 'menuTree',
    bindings: {
        inputids: '<',
        checkedids: '=',
        checkable: '<',
        editable: '<',
        radiotool: '<',
        addtool: '<',
        deletetool: '<',
        typetool: '<'
    },
    template: treeTemplate
};