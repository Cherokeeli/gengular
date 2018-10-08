import {OPT_TYPE} from "../global.enum";
import {copyPropertiesTo, objectIndexOf} from "../../utils/utils";

export function StandardList(options) {
    return (targetClass) => {

        let bindings = {
            /**
             * 输入到组件的id数组，用来回显list组件中回显的选择控件的状态。
             * 单向绑定
             * param {Array}
             */
            inputids: '<',


            /**
             * 是否能够对checkbox控件进行操作
             * 单向绑定
             * param {Boolean}
             */
            checkable: '<',


            /**
             * 组件暴露的选择的id数组，使用这个属性来获取组件中选择的id数组
             * 双向绑定
             * param {Array}
             */
            checkedids: '=',


            /**
             * 是否使用checkbox控件
             * 单向绑定
             * param {Boolean}
             */
            checktool: '<',
            /**
             * 是否使用搜索控件
             * 单向绑定
             * param {Boolean}
             */
            searchtool: '<',


            /**
             * 是否使用页面条数更换控件
             * 单向绑定
             * param {Boolean}
             */
            pagesizetool: '<',


            /**
             * list页面单页条数
             * 单向绑定
             * param {Number}
             */
            itemsperpage: '<'
        };


        copyPropertiesTo(bindings, targetClass.prototype, 'bindings');



        let service = options.service;
        let list = options.list;
        let listModel = options.listModel;
        let deleteMethod = options.delete;



        let proto = targetClass.prototype;

        // 这里如果用箭头函数，this会绑定成当前StandardCURD作用域，所以使用function，调用的时候this会正常指向Class
        proto.queryPage = function(search) {
            this.itemsperpage = this.itemsperpage || 10;
            this.bigCurrentPage = this.bigCurrentPage || 1;
            let param = {
                pageNo: this.bigCurrentPage,
                pageSize: this.itemsperpage || 10
            };
            if(search) {
                copyPropertiesTo(search, param, '');
            }
            this[service][list](param).then(res => {
                this[listModel] = res.records;
                if(Array.isArray(this.inputids)) {
                    this.inputids.map(id => {
                        let index = objectIndexOf(this[listModel], 'id', id);
                        if(index > -1) {
                            this[listModel][index].checked = true;
                        }
                    });
                }
                this.totalCount = res.total;
            }, err => {
                console.info(err);
            });
        };

        proto.$onInit = function () {
            this.queryPage();
            if(angular.isFunction(this.$onInitHook)) {
                this.$onInitHook();
            }
        };

        proto.$onChanges = function (changes) {
            if(changes.inputids.currentValue) {
                this.queryPage();
            }
            if(angular.isFunction(this.$onChangesHook)) {
                this.$onChangesHook();
            }
        };

        proto.checkItem = function(node) {
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
        };

        proto.tblOptDelete = function (id) {
            if(!id) {
                return 0;
            }
            this.alertToasterService.dialog().confirmation(_ => {
                let param = {
                    id: id
                };
                this[service][deleteMethod](param).then(res => {
                    console.log(res);
                    this.queryPage();
                }, err => {
                    console.info(err);
                });
            })

        }
    }
}