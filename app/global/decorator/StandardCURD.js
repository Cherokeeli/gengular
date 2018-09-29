/**
 * StandardCURD修饰器
 * 给Component的bindings加入一些绑定属性，供使用组件的对组件进行CURD的行为进行控制
 */

import {copyPropertiesTo, objectIndexOf} from "../../utils/utils";

export function StandardCURD(targetClass) {

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
        copyPropertiesTo(bindings, targetClass.prototype, 'bindings');
}