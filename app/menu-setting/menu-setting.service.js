export class MenuSettingService {
    constructor(AppBaseService, $q) {
        this.appBaseService = AppBaseService;
        this.$q = $q;
    }

    getMenuList() {
        let url = '/sysMenu/list';
        return this.appBaseService.get(url);
    }
}

MenuSettingService.$inject = ['AppBaseService', '$q'];