export class MainService {
    constructor(AppBaseService, $q) {
        this.appBaseService = AppBaseService;
        this.$q = $q;
    }

    logIn(param) {
        let url = 'https://www.easy-mock.com/mock/5d06ec6fe95b861a02e2d50e/gengular/login';
        return this.appBaseService.post(url, param, true);
    }

    logOut() {
        let url = 'https://www.easy-mock.com/mock/5d06ec6fe95b861a02e2d50e/gengular/logout';
        return this.appBaseService.post(url, {}, true);
    }

    getLogInfo() {
        let url = 'https://www.easy-mock.com/mock/5d06ec6fe95b861a02e2d50e/gengular/userInfo';
        return this.appBaseService.get(url, {}, true);
    }

    getNavList() {
        let url = 'https://www.easy-mock.com/mock/5d06ec6fe95b861a02e2d50e/gengular/nav';
        return this.appBaseService.get(url, {}, true);
    }

}

MainService.$inject = ['AppBaseService', '$q'];
