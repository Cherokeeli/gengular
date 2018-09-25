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
            this.totalCount = res.total;
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
        let that = this;
        this.$ngConfirm({
            icon: 'fa fa-warning',
            theme: 'material',
            type: 'orange',
            title: 'Delete?',
            animation: 'zoom',
            closeAnimation: 'zoom',
            animationSpeed: 200,
            content: 'This operation cannot be rollbacked',
            autoClose: 'cancel|5000',
            buttons: {
                deleteUser: {
                    text: 'YES',
                    btnClass: 'btn-orange',
                    action: function () {
                        let param = {
                            id: id
                        };
                        that.userSettingService.deleteUser(param).then(res => {
                            console.log(res);
                            that.queryPage();
                        }, err => {

                        });
                    }
                },
                cancel: {
                    text: 'NO',
                    action:  function () {

                    }
                }
            }
        });
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