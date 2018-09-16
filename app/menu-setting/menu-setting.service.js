export class MenuSettingService {
    constructor(AppBaseService) {
        this.appBaseService = AppBaseService;
    }
}

MenuSettingService.$inject = ['AppBaseService'];