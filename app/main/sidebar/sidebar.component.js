import sidebarTemplate from './sidebar.template.html';
import * as style from './sidebar.style.less';
import {Component} from "../../global/decorator/Component";

@Component({
    inject: ['$timeout', 'MainService', '$rootScope', '$scope'],
    as: 'sidebar',
    template: sidebarTemplate,
    style: style
})
export class SidebarController {

    afterInjectHook() {
        this.menuConfig = [];
        this.menuData = [];
        this.querySidebar();
        // 设置刷新侧边栏事件接收，当其他组件emit的这个事件即可刷新，如：配置菜单保存后立即生效，不用刷新
        this.$rootScope.$on('refreshSidebar', () => {
            this.querySidebar();
        });
    }

    querySidebar() {
        this.mainService.getNavList().then(res => {
            console.log(res);
            this.menuConfig = res;
            this.menuData = res;
        });
    }

    /**
     * 递归查询菜单
     * @param items
     * @param accumlateItems
     */
    searchSubMenuItemRecursive(query, items, accumlateItems) {
        return items.reduce((accu, curr) => {
            if (curr.name.toLowerCase().indexOf(query.toLowerCase())>-1) {
                try {
                    accu.push(curr);
                } catch (e) {
                    console.error(e);
                    console.log(query, items, accumlateItems);
                }
            }
            if (curr.list) {
                try {
                    accu.concat(this.searchSubMenuItemRecursive(query, curr.list, accu));
                } catch (e) {
                    console.error(e);
                    console.log(query, items, accumlateItems)
                }
            }
            return accu;
        }, accumlateItems);
    }


    searchSidebar(query) {
        let instantMenu = this.menuData;
        // this.menuConfig = this.menuData;
        if(!query || query.length===0) {
            this.menuConfig = this.menuData;
        } else {
            this.menuConfig = this.searchSubMenuItemRecursive(query, this.menuData,[]);
            console.log(this.menuConfig.map(res=>res.name).join(','));
        }
    }
}