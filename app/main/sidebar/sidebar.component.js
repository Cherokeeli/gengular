import sidebarTemplate from './sidebar.template.html';

class SidebarController {
    constructor() {
    }
}

export const sidebar = {
    controller: SidebarController,
    controllerAs: 'sidebar',
    template: sidebarTemplate
};