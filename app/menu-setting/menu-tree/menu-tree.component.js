import treeTemplate from './menu-tree.template.html';
import * as style from './menu-tree.style.less';

export class MenuTreeController {
    constructor(Store, $timeout, $ngConfirm, MenuSettingService) {
        console.log(Store.data);
        this.$ngConfirm = $ngConfirm;
        this.globalData = Store.data;
        this.menuSettingService = MenuSettingService;
        // this.menuConfig = [
        //     {
        //         title: 'SETTINGS',
        //         icon: 'fa fa-dashboard'
        //     },
        //     {
        //
        //         title: 'Dashboard',
        //         href: 'dashboard',
        //         icon: 'fa fa-dashboard',
        //         children: []
        //     },
        //     {
        //         title: 'System Setting',
        //         href: '',
        //         icon: 'fa fa-gear',
        //         children: [
        //             {
        //                 title: 'Role Setting',
        //                 href: 'role_setting',
        //                 icon: 'fa fa-users',
        //                 children: []
        //             },
        //             {
        //                 title: 'Feature Setting',
        //                 href: 'menuConfig',
        //                 icon: 'fa fa-cubes',
        //                 children: []
        //             },
        //             {
        //                 title: 'User Setting',
        //                 href: 'users',
        //                 icon: 'fa fa-user',
        //                 children: []
        //             }
        //         ]
        //     },
        //
        //     {
        //         title: 'MAIN FEATURES',
        //         icon: 'fa fa-dashboard'
        //     },
        //     {
        //         title: 'Source Data',
        //         href: '',
        //         icon: 'fa fa-database',
        //         children: [
        //             {
        //                 title: 'Position',
        //                 href: 'position',
        //                 icon: 'fa fa-table',
        //                 children: []
        //             },
        //             {
        //                 title: 'Cash Balance',
        //                 href: 'cash_banlance',
        //                 icon: 'fa fa-table',
        //                 children: []
        //             }
        //         ]
        //     },
        //     {
        //         title: 'Quartz Job',
        //         href: 'quartz_job',
        //         icon: 'fa fa-clock-o',
        //         children: []
        //     }
        // ];


        this.menuSettingService.getMenuList().then(res => {
            console.log(res);
            let dict = new Map();
            res.forEach((item, i) => {
                res[i].children = [];
                dict.set(item.id, item);
            });

            res.forEach(item => {
                if(item.parentId !== '0') {
                    dict.get(item.parentId).children.push(item);
                }
            });

            dict.forEach(item => {
                if(item.parentId !== '0') {
                    dict.delete(item.id);
                }
            });

            this.menuConfig = Array.from(dict.values());
            this.globalData.menuConfig = this.menuConfig;

        }, err => {
            console.info(err);
        });


        this.style = style;
    }

    addNode(scope) {
        console.log(scope);
        let list = scope.$modelValue;
        list.children.unshift({
            title: 'New node',
            href: '',
            icon: '',
            children: []
        })
    }

    removeNode(scope) {
        let that = this;
        that.$ngConfirm({
            icon: 'fa fa-warning',
            theme: 'material',
            type: 'orange',
            title: 'Delete?',
            animation: 'zoom',
            closeAnimation: 'zoom',
            animationSpeed: 200,
            content: 'This operation cannot be rollbacked',
            autoClose: 'cancel|5000',
            buttons: {
                deleteUser: {
                    text: 'YES',
                    btnClass: 'btn-orange',
                    action: function () {
                        scope.remove();
                    }
                },
                cancel: {
                    text: 'NO',
                    action:  function () {

                    }
                }
            }
        });
    }
}

MenuTreeController.$inject=['Store', '$timeout', '$ngConfirm', 'MenuSettingService'];

export const menuTree = {
    controller: MenuTreeController,
    controllerAs: 'menuTree',
    template: treeTemplate
};