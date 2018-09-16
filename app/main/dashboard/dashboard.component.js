/**
 *  DashboardController
 *  登录控制器
 */

import template from './dashboard.template.html';
import * as style from './dashboard.style.less';

class DashboardController {
    constructor(Store) {
        this.style = style;
        this.data = Store.data;
        this.logName = "";
        this.password = "";
        let that = this;
        /*this.treeOptions = {
            dropped(event) {
                Store.set({config: that.list});
            }
        };*/
        console.log(this.sidebarCtrl);
        /*this.list = [
            {
                title: 'MAIN FEATURES',
                icon: 'fa fa-dashboard'
            },
            {

                title: 'Dashboard',
                href: 'dashboard',
                icon: 'fa fa-dashboard',
                children: []
            },
            {
                title: 'Quartz Job',
                href: 'quartz_job',
                icon: 'fa fa-clock-o',
                children: []
            },
            {
                title: 'Source Data',
                href: '',
                icon: 'fa fa-database',
                children: [
                    {
                        title: 'Position',
                        href: 'position',
                        icon: 'fa fa-table',
                        children: []
                    },
                    {
                        title: 'Cash Balance',
                        href: 'cash_banlance',
                        icon: 'fa fa-table',
                        children: []
                    }
                ]
            },
            {
                title: 'System Setting',
                href: '',
                icon: 'fa fa-gear',
                children: [
                    {
                        title: 'Role Setting',
                        href: 'role_setting',
                        icon: 'fa fa-users',
                        children: []
                    },
                    {
                        title: 'Feature Setting',
                        href: 'feature_setting',
                        icon: 'fa fa-cubes',
                        children: []
                    },
                    {
                        title: 'User Setting',
                        href: 'user_setting',
                        icon: 'fa fa-user',
                        children: []
                    }
                ]
            }
        ];*/
        // this.data.config = this.list;
    }
}

DashboardController.$inject = ['Store'];

export const dashboard = {
    binding: {
        menuConfig: '<',
        onViewChange: '&'
    },
    controller: DashboardController,
    controllerAs: 'dashboard',
    template: template
};