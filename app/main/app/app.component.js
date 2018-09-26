import appTemplate from './app.template.html';

class AppController {
    constructor() {
        // FIX 去掉ng-include的wrapper
        angular.element(() => {
            console.log('page loading completed');
            let nodes = document.querySelectorAll('div[include-replace]');
            Array.prototype.forEach.call(nodes, (node) => {
                $(node).replaceWith($(node).children());
            });
            console.log(angular.element('.edit-url'));
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