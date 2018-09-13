export class MainService {
    constructor(AppBaseService) {
        this.appBaseService = AppBaseService;
    }

    logIn(param) {
        let url = 'api/login.do';
        return this.appBaseService.post(url, param);
    }

}

MainService.$inject = ['AppBaseService'];