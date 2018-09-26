export class MenuSettingService {
    constructor(AppBaseService, $q) {
        this.appBaseService = AppBaseService;
        this.$q = $q;
    }

    getMenuList() {
        let url = '/sysMenu/list';
        return this.appBaseService.get(url);
    }

    updateMenuItem(param) {
        let url = '/sysMenu';
        return this.appBaseService.put(url, param);
    }

    deleteMenuItem(param) {
        let url = '/sysMenu';
        return this.appBaseService.delete(url, param);
    }
}

MenuSettingService.$inject = ['AppBaseService', '$q'];