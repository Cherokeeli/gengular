import navbarTemplate from './navbar.template.html';
import * as style from './navbar.style.less';
import {Component} from "../../global/decorator/Component";

@Component({
    inject: ['MainService', '$state'],
    as: 'navbar',
    template: navbarTemplate,
    style: style
})
export class NavbarController {
    signOut() {
        this.mainService.logOut().then(res => {
            this.$state.go('login');
        }, err => {
            console.info('Logout failed',err);
        })
    }

    $onInit() {
        this.mainService.getLogInfo().then(res => {
            this.user = res;
        }, err => {
            console.info(err);
        })
    }
}