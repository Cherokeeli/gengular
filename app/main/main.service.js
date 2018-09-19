export class MainService {
    constructor(AppBaseService, $q) {
        this.appBaseService = AppBaseService;
        this.$q = $q;
    }

    logIn(param) {
        let url = '/admin/login';
        return this.appBaseService.post(url, param);
    }

}

MainService.$inject = ['AppBaseService', '$q'];