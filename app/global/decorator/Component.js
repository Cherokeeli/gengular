/**
 * Component修饰器，配合Module中componentFactory函数对Controller进行包装，自动注入相应service和controllerAs, template等参数
 * options:
 * {
 *     inject:   {Array}  注入数组
 *     as:       {String} 在template中替代$ctrl的名字
 *     template: {String} html模板
 * }
 */

import {copyPropertiesTo} from "../../utils/utils";


export function Component(option) {
    return (targetClass) => {
        console.log(targetClass.prototype);
        /**
         * 这段代码重写了Class的constructor,通过inject属性直接将依赖注入到constructor里面，依赖如果是大写开头，则注入到this是小写开头，
         * 如SampleService => this.sampleServce, 最后调用afterInjectHook钩子函数来做注入之后的动作
         */
        let proto = targetClass.prototype;
        targetClass = function(...args) {
            console.log(...args);
            let that = this;
            option.inject.forEach((dep, index) => {
                if(dep[0].match(/[A-Z]/)) {
                    dep = dep[0].toLowerCase()+dep.slice(1);
                }
                console.log(dep);
                that[dep] = args[index];
            });
            if(angular.isFunction(this.afterInjectHook)) {
                this.afterInjectHook();
            }
        };

        /**
         * 将inject,as,template参数复制到prototype上，然后在module使用componentFactory函数包装成angularjs的component格式
         */
        targetClass.prototype = proto;
        // TODO bindings的变量必须在$onInit里面才能获取到，$onInitHook在单独写Component修饰器的时候就没有了，只在StandardList里面实现了，暂时判断如果没有实现$onInit就在此实现
        if(angular.isFunction(proto.$onInit)) {
            proto.$onInit = function () {
                if (angular.isFunction(this.$onInitHook)) {
                    this.$onInitHook();
                }
            };
        }
        if(option.bindings) {
            copyPropertiesTo(option.bindings, targetClass.prototype, 'bindings');
        }        proto.inject = option.inject;
        proto.controllerAs = option.as;
        proto.template = option.template;
        return targetClass;
    }
}