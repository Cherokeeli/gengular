import sidebarTemplate from './sidebar.template.html';
import * as style from './sidebar.style.less';

class SidebarController {
    constructor(Store, $timeout) {
        console.log(Store.data);
        this.data = Store.data;
        this.data.config = [
            {
                title: 'SETTINGS',
                icon: 'fa fa-dashboard'
            },
            {

                title: 'Dashboard',
                href: 'dashboard',
                icon: 'fa fa-dashboard',
                children: []
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
                        href: 'menuConfig',
                        icon: 'fa fa-cubes',
                        children: []
                    },
                    {
                        title: 'User Setting',
                        href: 'users',
                        icon: 'fa fa-user',
                        children: []
                    }
                ]
            },

            {
                title: 'MAIN FEATURES',
                icon: 'fa fa-dashboard'
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
                title: 'Quartz Job',
                href: 'quartz_job',
                icon: 'fa fa-clock-o',
                children: []
            }
        ];

        this.style = style;
    }
}

SidebarController.$inject=['Store', '$timeout'];

export const sidebar = {
    controller: SidebarController,
    controllerAs: 'sidebar',
    template: sidebarTemplate
};