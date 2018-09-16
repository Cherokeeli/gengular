export class UserSettingService {
    constructor(AppBaseService) {
        this.appBaseService = AppBaseService;
    }
}

UserSettingService.$inject = ['AppBaseService'];