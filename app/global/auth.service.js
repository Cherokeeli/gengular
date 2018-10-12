/**
 * 认证模块Service
 */

export class AuthService {
    constructor(AppBaseService) {
        this.appBaseService = AppBaseService;
    }

    /**
     * 获取权限数据
     * @return {*|T|ActiveX.IXMLDOMNode|Promise<any>|V|string|IDBRequest|FormDataEntryValue|MediaKeyStatus}
     */
    getPermissions() {
        let url = '/sysUsers/authorities';
        return this.appBaseService.get(url, {});
    }
}

AuthService.$inject = ['AppBaseService'];