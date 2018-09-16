import menuConfigTemplate from './menu.template.html';

class MenuConfigController {
    constructor($ngConfirm, Notification, $timeout, Store) {
        this.$ngConfirm = $ngConfirm;
        this.notification = Notification;
        this.$timeout = $timeout;
        this.data = Store.data;
    }

    save() {
        let that = this;

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
        console.log(this.data.config);

    }
}

MenuConfigController.$inject = ['$ngConfirm', 'Notification', '$timeout', 'Store'];

export const menu = {
    controller: MenuConfigController,
    controllerAs: 'menuConfig',
    template: menuConfigTemplate
};