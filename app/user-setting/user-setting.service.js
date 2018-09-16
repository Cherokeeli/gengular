export class UserSettingService {
    constructor(AppBaseService) {
        this.appBaseService = AppBaseService;
    }

    getUsers(param) {
        let url = 'api/login.do';
        return this.appBaseService.get(url, param);
    }
}

UserSettingService.$inject = ['AppBaseService'];