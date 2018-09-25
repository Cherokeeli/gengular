export class UserSettingService {
    constructor(AppBaseService, $q) {
        this.appBaseService = AppBaseService;
        this.$q = $q;
    }

    getUsers(param) {
        let url = '/sysUsers';
        return this.appBaseService.get(url, param);
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