import {OPT_TYPE} from "../global.enum";
import {copyPropertiesTo} from "../../utils/utils";

export function StandardList(options) {
    return (targetClass) => {

        let bindings = {
            inputids: '<',
            checkable: '<',
            checkedids: '=',
            checktool: '<',
            edittool: '<',
            viewtool: '<',
            deletetool: '<',
            addtool: '<',
            searchtool: '<',
            pagesizetool: '<',
            itemsperpage: '<'
        };


        copyPropertiesTo(bindings, targetClass.prototype, 'bindings');



        let service = options.service;
        let list = options.list;
        let listModel = options.listModel;
        let addState =  options.addState;
        let editState = options.editState;
        let viewState = options.viewState;


        let proto = targetClass.prototype;

        // 这里如果用箭头函数，this会绑定成当前StandardCURD作用域，所以使用function，调用的时候this会正常指向Class
        proto.queryPage = function() {
            let param = {
                pageNo: this.bigCurrentPage,
                pageSize: this.itemsperpage || 10
            };
            this[service][list](param).then(res => {
                this[listModel] = res.records;
                if(Array.isArray(this.inputids)) {
                    this.inputids.map(id => {
                        let index = objectIndexOf(this.userList, 'id', id);
                        if(index > -1) {
                            this.userList[index].checked = true;
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

        proto.tblOptAdd = function() {
            // console.log(id);
            this.$state.go(addState, {opt: OPT_TYPE.ADD});
        };

        proto.tblOptEdit = function(id) {
            // console.log(id);
            this.$state.go(editState, {id: id, opt: OPT_TYPE.EDIT});
        };

        proto.tblOptView = function(id) {
            this.$state.go(viewState, {id: id, opt: OPT_TYPE.VIEW});
        };
    }
}