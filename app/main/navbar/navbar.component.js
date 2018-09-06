import navbarTemplate from './navbar.template.html';
import * as style from './navbar.style.css';

class NavbarController {
    constructor() {
        this.style = style;
        console.log(style);
    }
}

export const navbar = {
    controller: NavbarController,
    template: navbarTemplate
};