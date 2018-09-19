import navbarTemplate from './navbar.template.html';
import * as style from './navbar.style.less';

class NavbarController {
    constructor(MainService, $state) {
        this.style = style;
        this.mainService = MainService;
        this.$state = $state;
    }

    signOut() {
        this.mainService.logOut().then(res => {
            this.$state.go('login');
        }, err => {
            console.info('Logout failed',err);
        })
    }
}

NavbarController.$inject = ['MainService', '$state'];

export const navbar = {
    controller: NavbarController,
    controllerAs: 'navbar',
    template: navbarTemplate
};