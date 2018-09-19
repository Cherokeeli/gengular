import sidebarTemplate from './sidebar.template.html';
import * as style from './sidebar.style.less';

class SidebarController {
    constructor(Store, $timeout, MainService) {
        console.log(Store.data);
        this.globalData = Store.data;
        this.mainService = MainService;
        // this.menuConfig = [
        //     {
        //         name: 'SETTINGS',
        //         icon: 'fa fa-dashboard'
        //     },
        //     {
        //
        //         name: 'Dashboard',
        //         url: 'dashboard',
        //         icon: 'fa fa-dashboard',
        //         children: []
        //     },
        //     {
        //         name: 'System Setting',
        //         url: '#',
        //         icon: 'fa fa-gear',
        //         children: [
        //         ]
        //     },
        //
        //     {
        //         name: 'Role Setting',
        //         url: 'role_setting',
        //         icon: 'fa fa-users',
        //         children: []
        //     },
        //     {
        //         name: 'Feature Setting',
        //         url: 'menuConfig',
        //         icon: 'fa fa-cubes',
        //         children: []
        //     },
        //     {
        //         name: 'User Setting',
        //         url: 'users',
        //         icon: 'fa fa-user',
        //         children: []
        //     },
        //
        //     {
        //         name: 'MAIN FEATURES',
        //         icon: 'fa fa-dashboard'
        //     },
        //     {
        //         name: 'Source Data',
        //         url: '#',
        //         icon: 'fa fa-database',
        //         children: [
        //             {
        //                 name: 'Position',
        //                 url: 'position',
        //                 icon: 'fa fa-table',
        //                 children: []
        //             },
        //             {
        //                 name: 'Cash Balance',
        //                 url: 'cash_banlance',
        //                 icon: 'fa fa-table',
        //                 children: []
        //             }
        //         ]
        //     },
        //     {
        //         name: 'Quartz Job',
        //         url: 'quartz_job',
        //         icon: 'fa fa-clock-o',
        //         children: []
        //     }
        // ];
        this.menuConfig = [];

        this.mainService.getNavList().then(res => {
            console.log(res);
            this.menuConfig = res;
        }, err => {
            console.info(err);
        });



        this.style = style;
    }
}

SidebarController.$inject=['Store', '$timeout', 'MainService'];

export const sidebar = {
    controller: SidebarController,
    controllerAs: 'sidebar',
    template: sidebarTemplate
};