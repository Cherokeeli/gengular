import template from './users.template.html';

const OPT_TYPE = {
    EDIT: 1,
    VIEW: 2,
    DELETE: 3
};

class UsersController {
    constructor($ngConfirm, Notification, $timeout, Store, UserSettingService, $state) {
        this.$ngConfirm = $ngConfirm;
        this.notification = Notification;
        this.$timeout = $timeout;
        this.userSettingService = UserSettingService;
        this.itemsPerPage = 2;
        this.$state = $state;
        this.userList = [
            {
                id: 1,
                userName: 'QUANLI1',
                logName: 'quanli422',
                contacts: [
                    'quanlime@gmail.com',
                    '13530088648'
                ]
            },
            {
                id: 2,
                userName: 'QUANLI2',
                logName: 'quanli422',
                contacts: [
                    'quanlime@gmail.com',
                    '13530088648'
                ]
            },
            {
                id: 3,
                userName: 'QUANLI3',
                logName: 'quanli422',
                contacts: [
                    'quanlime@gmail.com',
                    '13530088648'
                ]
            },
            {
                id: 4,
                userName: 'QUANLI4',
                logName: 'quanli422',
                contacts: [
                    'quanlime@gmail.com',
                    '13530088648'
                ]
            }
        ];
        this.totalCount = this.userList.length;
    }

    queryPage() {
        this.userSettingService.getUsers().then(res=> {
            this.userList = res.data;
        });
    }

    tblOptEdit(id) {
        console.log(id);
        this.$state.go('user', {id: id, opt: OPT_TYPE.EDIT});
    }

    tblOptView(id) {
        this.$state.go('user', {id: id, opt: OPT_TYPE.VIEW});
    }

    tblOptDelete(id) {
        this.$state.go('user', {id: id, opt: ''});
    }
}

UsersController.$inject = ['$ngConfirm', 'Notification', '$timeout', 'Store', 'UserSettingService', '$state'];

export const users = {
    controller: UsersController,
    controllerAs: 'users',
    template: template
};