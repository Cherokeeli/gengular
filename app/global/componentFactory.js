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