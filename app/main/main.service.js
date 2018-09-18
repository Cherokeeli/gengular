export class MainService {
    constructor(AppBaseService) {
        this.appBaseService = AppBaseService;
    }

    logIn(param) {
        let url = '/admin/login';
        return this.appBaseService.post(url, param);
    }

}

MainService.$inject = ['AppBaseService'];