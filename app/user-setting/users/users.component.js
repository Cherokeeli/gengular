import template from './users.template.html';

class UsersController {
    constructor($ngConfirm, Notification, $timeout, Store) {
        this.$ngConfirm = $ngConfirm;
        this.notification = Notification;
        this.$timeout = $timeout;
    }
}

UsersController.$inject = ['$ngConfirm', 'Notification', '$timeout', 'Store'];

export const users = {
    controller: UsersController,
    controllerAs: 'users',
    template: template
};