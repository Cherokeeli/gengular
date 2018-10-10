/**
 *  DashboardController
 *  登录控制器
 */

import template from './dashboard.template.html';
import * as style from './dashboard.style.less';
import {Component} from "../../global/decorator/Component";

@Component({
    bindings: {
        menuConfig: '<',
        authPermission: '<',
        onViewChange: '&'
    },
    as: 'dashboard',
    template: template,
    style: style
})
export class DashboardController {

    $onInitHook() {
        console.log(this.authPermission);
    }
}