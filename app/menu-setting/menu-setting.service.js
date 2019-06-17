export class MenuSettingService {
    constructor(AppBaseService, $q) {
        this.appBaseService = AppBaseService;
        this.$q = $q;
    }

    getMenuList() {
        let url = 'https://www.easy-mock.com/mock/5d06ec6fe95b861a02e2d50e/gengular/sysMenu';
        return this.appBaseService.get(url, {}, true);
    }

    addMenuItem(param) {
        let url = '/sysMenu';
        return this.appBaseService.post(url, param);
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
