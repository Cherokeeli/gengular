import appTemplate from './app.template.html';
import {Component} from "../../global/decorator/Component";

@Component({
    inject: [],
    as: 'app',
    template: appTemplate,
    bindings: {
        authPermission: '<'
    }
})
export class AppController {

    afterInjectHook() {
        // FIX 去掉ng-include的wrapper
        angular.element(() => {
            /*console.log('page loading completed');
            let nodes = document.querySelectorAll('div[include-replace]');
            Array.prototype.forEach.call(nodes, (node) => {
                $(node).replaceWith($(node).children());
            });
            console.log(angular.element('.edit-url'));*/
            // uiFrame();

        });
        this.ctrlName = "AppCtrl";
    }
}