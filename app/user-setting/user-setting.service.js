export class SystemSettingService {
    constructor(AppBaseService) {
        this.appBaseService = AppBaseService;
    }
}

SystemSettingService.$inject = ['AppBaseService'];