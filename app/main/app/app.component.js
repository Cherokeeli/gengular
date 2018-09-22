import appTemplate from './app.template.html';

class AppController {
    constructor() {
        // FIX 去掉ng-include的wrapper
        angular.element(function () {
            console.log('page loading completed');
            let nodes = document.querySelectorAll('div[include-replace]');
            Array.prototype.forEach.call(nodes, (node) => {
                $(node).replaceWith($(node).children());
            });
        });
        this.ctrlName = "AppCtrl";
    }
}

export const app = {
    controller: AppController,
    bindings: {
        authPermission: '<'
    },
    controllerAs: 'app',
    template: appTemplate
};