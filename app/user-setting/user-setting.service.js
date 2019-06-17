export class UserSettingService {
    constructor(AppBaseService, $q) {
        this.appBaseService = AppBaseService;
        this.$q = $q;
    }

    getUsers(param) {
        let url = 'https://www.easy-mock.com/mock/5d06ec6fe95b861a02e2d50e/gengular/sysUsers';
        return this.appBaseService.get(url, param, true);
    }


    getUserById(id) {
        let url = `/sysUsers/userId/${id}`;
        return this.appBaseService.get(url, {});
    }

    updateUser(param) {
        let url = '/sysUsers';
        return this.appBaseService.put(url, param);
    }

    addUser(param) {
        let url = '/sysUsers';
        return this.appBaseService.post(url, param);
    }

    deleteUser(param) {
        let url = '/sysUsers';
        return this.appBaseService.delete(url, param);
    }
}

UserSettingService.$inject = ['AppBaseService', '$q'];
