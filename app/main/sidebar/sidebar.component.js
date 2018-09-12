import sidebarTemplate from './sidebar.template.html';

const sidebarConfig = [
    {
        sectionHeader: 'MAIN FEATURES'
    },
    {

        title: 'Dashboard',
        href: 'dashboard',
        icon: 'fa fa-dashboard',
        children: []
    },
    {
        title: 'Multilevel',
        href: '',
        icon: 'fa fa-share',
        children: [
            {
                title: 'level1',
                href: '',
                icon: 'fa fa-share',
                children: []
            },
            {
                title: 'level1',
                href: '',
                icon: 'fa fa-share',
                children: [
                    {
                        title: 'level2',
                        href: '',
                        icon: 'fa fa-share',
                        children: [
                            {
                                title: 'level3',
                                href: '',
                                icon: 'fa fa-share',
                                children: [
                                    {
                                        title: 'level4',
                                        href: '',
                                        icon: 'fa fa-share',
                                        children: [
                                            {
                                                title: 'level5',
                                                href: '',
                                                icon: 'fa fa-share',
                                                children: [
                                                    {
                                                        title: 'level6',
                                                        href: '',
                                                        icon: 'fa fa-share',
                                                        children: [
                                                            {
                                                                title: 'level7',
                                                                href: '',
                                                                icon: 'fa fa-share',
                                                                children: []
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

class SidebarController {
    constructor() {
        this.sidebarConfig = sidebarConfig;
    }
}

SidebarController.$inject=['$compile'];

export const sidebar = {
    controller: SidebarController,
    controllerAs: 'sidebar',
    template: sidebarTemplate
};