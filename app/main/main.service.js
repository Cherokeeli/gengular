export class MainService {
    constructor(AppBaseService, $q) {
        this.appBaseService = AppBaseService;
        this.$q = $q;
    }

    logIn(param) {
        let url = '/admin/login';
        return this.appBaseService.post(url, param);
    }

    logOut() {
        let url = '/admin/login/logout';
        return this.appBaseService.post(url, {});
    }

    getLogInfo() {
        let url = '/sysUsers/info';
        return this.appBaseService.get(url, {});
    }

    getNavList() {
        let url = '/sysMenu/nav';
        return this.appBaseService.get(url, {});
    }

}

MainService.$inject = ['AppBaseService', '$q'];