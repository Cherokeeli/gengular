import sidebarTemplate from './sidebar.template.html';
import * as style from './sidebar.style.less';
import {Component} from "../../global/decorator/Component";

@Component({
    inject: ['$timeout', 'MainService'],
    as: 'sidebar',
    template: sidebarTemplate,
    style: style
})
export class SidebarController {

    afterInjectHook() {
        this.menuConfig = [];

        this.mainService.getNavList().then(res => {
            console.log(res);
            this.menuConfig = res;
        }, err => {
            console.info(err);
        });
    }
}