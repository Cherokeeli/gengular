import sidebarTemplate from './sidebar.template.html';
import * as style from './sidebar.style.less';
import {Component} from "../../global/decorator/Component";

@Component({
    inject: ['$timeout', 'MainService', '$rootScope'],
    as: 'sidebar',
    template: sidebarTemplate,
    style: style
})
export class SidebarController {

    afterInjectHook() {
        this.menuConfig = [];
        this.refreshSidebar();
        // 设置刷新侧边栏事件接收
        this.$rootScope.$on('refreshSidebar', () => {
            this.refreshSidebar();
        });
    }

    refreshSidebar() {
        this.mainService.getNavList().then(res => {
            console.log(res);
            this.menuConfig = res;
        });
    }
}