import menuConfigTemplate from './menu.template.html';

class MenuConfigController {
    constructor($timeout, Store, AlertToasterService) {
        this.$timeout = $timeout;
        this.globalData = Store.data;
        this.alertToasterService = AlertToasterService;
    }

    save() {
        let that = this;
        console.log(this);
        let pend = this.alertToasterService.popup('pending', 'Pending!', 'Saving Data...');
        this.$timeout( _ => {
            this.submitFlag = false;
            /*pend.then(noti => {
                noti.kill();
            });*/
            this.alertToasterService.popup('success', 'Success!', 'Saving Successfully');
        }, 3000);

        // TODO 菜单json调接口保存
        console.log(this.globalData.menuConfig);

    }

    $onInit() {
        console.log(this.authPermission);
    }
}

MenuConfigController.$inject = ['$timeout', 'Store', 'AlertToasterService'];

export const menu = {
    controller: MenuConfigController,
    bindings: {
        authPermission: '<'
    },
    controllerAs: 'menuConfig',
    template: menuConfigTemplate
};