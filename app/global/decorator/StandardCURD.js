/**
 * StandardCURD修饰器
 * 给Component的bindings加入一些绑定属性，供使用组件的对组件进行CURD的行为进行控制
 */

import {copyPropertiesTo, objectIndexOf} from "../../utils/utils";
import {OPT_TYPE} from "../global.enum";

export function StandardCURD(options) {
    return (targetClass) => {
        let bindings = {
            /**
             * 是否使用edit页面跳转控件
             * 单向绑定
             * param {Boolean}
             */
            edittool: '<',


            /**
             * 是否使用view页面跳转控件
             * 单向绑定
             * param {Boolean}
             */
            viewtool: '<',


            /**
             * 是否使用delete控件
             * 单向绑定
             * param {Boolean}
             */
            deletetool: '<',


            /**
             * 是否使用add新增控件
             * 单向绑定
             * param {Boolean}
             */
            addtool: '<'

        };

        // 将bindings复制到class.prototype的bindings属性上
        let proto = targetClass.prototype;
        copyPropertiesTo(bindings, targetClass.prototype, 'bindings');

        let addState =  options.addState;
        let editState = options.editState;
        let viewState = options.viewState;

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