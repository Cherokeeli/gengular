/**
 * 认证模块Service
 */

export class AuthService {
    constructor(AppBaseService) {
        this.appBaseService = AppBaseService;
    }

    getPermissions() {
        let url = '/sysUsers/authorities';
        return this.appBaseService.get(url, {});
    }
}

AuthService.$inject = ['AppBaseService'];