export class UserSettingService {
    constructor(AppBaseService) {
        this.appBaseService = AppBaseService;
    }
}

SystemSettingService.$inject = ['AppBaseService'];