/**
 * component包装函数，将component包装成angularjs需要的component结构
 * @param targetClass
 * @return {AngularjsComponent}
 */

export function componentFactory(targetClass) {
    let proto = targetClass.prototype;
    targetClass.$inject = proto.inject;
    return {
        controller: targetClass,
        controllerAs: proto.controllerAs,
        bindings: proto.bindings,
        template: proto.template
    };
}