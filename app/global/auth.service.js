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
        let url = 'https://www.easy-mock.com/mock/5d06ec6fe95b861a02e2d50e/gengular/authorities';
        return this.appBaseService.get(url, {}, true);
    }
}

AuthService.$inject = ['AppBaseService'];
