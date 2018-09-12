/**
 *  DashboardController
 *  登录控制器
 */

import template from './dashboard.template.html';
import * as style from './dashboard.style.less';

class DashboardController {
    constructor() {
        this.style = style;
        this.logName = "";
        this.password = "";
    }
}

export const dashboard = {
    binding: { returnTo: '<' },
    controller: DashboardController,
    controllerAs: 'dashboard',
    template: template
};