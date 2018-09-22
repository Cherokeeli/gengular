import template from './users.template.html';
import { OPT_TYPE } from '../../global/global.enum';


class UsersController {
    constructor($ngConfirm, Notification, $timeout, Store, UserSettingService, $state) {
        this.$ngConfirm = $ngConfirm;
        this.notification = Notification;
        this.$timeout = $timeout;
        this.userSettingService = UserSettingService;
        this.itemsPerPage = 2;
        this.$state = $state;
        this.globalData = Store.data;
        this.userList = [];
        this.totalCount = this.userList.length;
        this.bigCurrentPage = 1;
    }

    queryPage() {
        let param = {
            pageNo: this.bigCurrentPage,
            pageSize: this.itemsPerPage
        };
        this.userSettingService.getUsers(param).then(res => {
            this.userList = res.records;
            this.totalCount = res.count;
        }, err => {
            console.info(err);
        });
    }

    tblOptAdd() {
        // console.log(id);
        this.$state.go('user.add', {opt: OPT_TYPE.ADD});
    }

    tblOptEdit(id) {
        // console.log(id);
        this.$state.go('user.edit', {id: id, opt: OPT_TYPE.EDIT});
    }

    tblOptView(id) {
        this.$state.go('user.view', {id: id, opt: OPT_TYPE.VIEW});
    }

    tblOptDelete(id) {
        this.$state.go('user', {id: id, opt: ''});
    }

    $onInit() {
        this.queryPage();
    }
}

UsersController.$inject = ['$ngConfirm', 'Notification', '$timeout', 'Store', 'UserSettingService', '$state'];

export const users = {
    controller: UsersController,
    controllerAs: 'users',
    template: template
};