import navbarTemplate from './navbar.template.html';
import * as style from './navbar.style.less';

class NavbarController {
    constructor() {
        this.style = style;
    }
}

export const navbar = {
    controller: NavbarController,
    controllerAs: 'navbar',
    template: navbarTemplate
};