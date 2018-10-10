import menuConfigTemplate from './menu.template.html';
import {Component} from "../../global/decorator/Component";

@Component({
    inject: ['$timeout', 'AlertToasterService'],
    template: menuConfigTemplate,
    as: 'menuConfig',
    bindings: {
        authPermission: '<'
    }
})
export class MenuConfigController {

    save() {
        let that = this;
        let pend = this.alertToasterService.popup('Pending!', 'Saving Data...').pending();
        this.$timeout( _ => {
            this.submitFlag = false;
            /*pend.then(noti => {
                noti.kill();
            });*/
            this.alertToasterService.popup('Success!', 'Saving Successfully').success();
        }, 3000);
    }

    $onInit() {
        console.log(this.authPermission);
    }
}