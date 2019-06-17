export class RoleSettingService {
    constructor(AppBaseService, $q) {
        this.appBaseService = AppBaseService;
        this.$q = $q;
    }

    getRoles(param) {
        let url = 'https://www.easy-mock.com/mock/5d06ec6fe95b861a02e2d50e/gengular/sysRoles';
        return this.appBaseService.get(url, param, true);
    }

    getRoleById(id) {
        let url = `/sysRoles/info/${id}`;
        return this.appBaseService.get(url, {});
    }

    updateRole(param) {
        let url = '/sysRoles';
        return this.appBaseService.put(url, param);
    }

    addRole(param) {
        let url = '/sysRoles';
        return this.appBaseService.post(url, param);
    }

    deleteRole(param) {
        let url = '/sysRoles';
        return this.appBaseService.delete(url, param);
    }
}

RoleSettingService.$inject = ['AppBaseService', '$q'];
