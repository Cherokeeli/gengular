import treeTemplate from './menu-tree.template.html';
import * as style from './menu-tree.style.less';
import { objectGetProperty, objectIndexOf } from "../../utils/utils";
import {Component} from "../../global/decorator/Component";

@Component({
    inject: ['$timeout', '$ngConfirm', 'MenuSettingService', '$state', '$rootScope'],
    template: treeTemplate,
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
    as: 'menuTree',
    style: style
})
export class MenuTreeController {

    afterInjectHook() {
        this.checkednodes = [];
        this.checkedids = [];
        this.tree = {};
        let that = this;
        this.menuTreeOption = {
            dropped(event) {
                console.log(event);
                console.log(that.menuConfig);
                if (objectGetProperty(event.dest.nodesScope,'$parent.$modelValue.id')) {
                    if(event.source.nodeScope.$modelValue.parentId !== event.dest.nodesScope.$parent.$modelValue.id) {
                        event.source.nodeScope.$modelValue.tempParentId = event.dest.nodesScope.$parent.$modelValue.id;
                    }
                } else {
                    event.source.nodeScope.$modelValue.tempParentId = '0';
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
                    if(dict.get(id)) {
                        dict.get(id).checked = true;
                    }
                });
            }

            res.forEach(item => {
                if(item.parentId !== '0') {
                    if(dict.get(item.parentId)) {
                        dict.get(item.parentId).children.push(item);
                    }
                }
            });

            dict.forEach(item => {
                if(item.parentId !== '0') {
                    dict.delete(item.id);
                }
            });

            this.menuConfig = Array.from(dict.values());
            this.$timeout(_ => {
                let expand_dom = document.querySelector('.expand-start');
                expand_dom.style.maxHeight = `${expand_dom.firstElementChild.offsetHeight+20}px`;
            }, 500);
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
            name: 'New node',
            url: '#',
            type: 0,
            parentId: list.id,
            tempParentId: list.id,
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
                            // 通知刷新侧边栏
                            this.$rootScope.$emit('refreshSidebar');
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
        node.parentId = node.tempParentId;
        this.menuSettingService.addMenuItem(node).then(res=> {
            console.log(res);
            this[formName].$setPristine();
            node.isNew = false;
            // 通知刷新侧边栏
            this.$rootScope.$emit('refreshSidebar');
        });
    }

    updateNode(scope, formName) {
        let node = scope.$modelValue;
        node.parentId = node.tempParentId;
        this.menuSettingService.updateMenuItem(node).then(res => {
            console.log(res, this[formName]);
            this[formName].$setPristine();
            // 通知刷新侧边栏
            this.$rootScope.$emit('refreshSidebar');
        });
    }

    checkItem(scope) {
        console.log(scope.$parent.$parent.$parent.$parent.$modelValue);
        let node = scope.$modelValue;
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
