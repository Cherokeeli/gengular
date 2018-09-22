import menuConfigTemplate from './menu.template.html';

class MenuConfigController {
    constructor($ngConfirm, Notification, $timeout, Store) {
        this.$ngConfirm = $ngConfirm;
        this.notification = Notification;
        this.$timeout = $timeout;
        this.globalData = Store.data;
    }

    save() {
        let that = this;
        console.log(this);
        this.$timeout( _ => {
            this.submitFlag = false;
            this.notification(
                {
                    delay: 3000,
                    message:`
                <div class="alert alert-success alert-dismissible">
                <h4><i class="icon fa fa-info"></i> Success!</h4>
                Saving successfully.
              </div>`});
        }, 3000);

        // TODO 菜单json调接口保存
        console.log(this.globalData.menuConfig);

    }

    $onInit() {
        console.log(this.authPermission);
    }
}

MenuConfigController.$inject = ['$ngConfirm', 'Notification', '$timeout', 'Store'];

export const menu = {
    controller: MenuConfigController,
    bindings: {
        authPermission: '<'
    },
    controllerAs: 'menuConfig',
    template: menuConfigTemplate
};