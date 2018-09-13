import sidebarTemplate from './sidebar.template.html';
import * as style from './sidebar.style.less';

class SidebarController {
    constructor(Store, $timeout) {
        console.log(Store.data);
        this.data = Store.data;

        this.style = style;
    }
}

SidebarController.$inject=['Store', '$timeout'];

export const sidebar = {
    controller: SidebarController,
    controllerAs: 'sidebar',
    template: sidebarTemplate
};