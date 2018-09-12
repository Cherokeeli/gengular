import appTemplate from './app.template.html';

class AppController {
    constructor() {
        // 修复，ng-include的wrapper
        angular.element(function () {
            console.log('page loading completed');
            let nodes = document.querySelectorAll('div[include-replace]');
            Array.prototype.forEach.call(nodes, (node) => {
                $(node).replaceWith($(node).children());
            });
        });
    }
}

export const app = {
    controller: AppController,
    controllerAs: 'app',
    template: appTemplate
};