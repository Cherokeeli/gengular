import {OPT_TYPE} from "../../global/global.enum";
import template from "./quartz-detail.template.html";
import * as style from './quartz-detail.style.less';

class QuartzDetailController {
    constructor(Store, $timeout, $ngConfirm, $stateParams, QuartzSettingService, $state) {
        this.$ngConfirm = $ngConfirm;
        this.$stateParams = $stateParams;
        this.quartzSettingService = QuartzSettingService;
        this.data = Store.data;
        this.style = style;
        this.$state = $state;
        console.log($state);

    }

    $onInit() {
        let currentStatus = this.$stateParams.opt;
        let that = this;
        if(this.$stateParams.id) {
            that.quartzSettingService.getTaskById(this.$stateParams.id)
                .then(res => {
                    console.log(res);
                    this.quartz = res;
                }, err => {
                    console.info(err);
                });

            switch (currentStatus) {
                case OPT_TYPE.EDIT:
                    this.editPageInit();
                    break;
                case OPT_TYPE.VIEW:
                    this.viewPageInit();
                    break;
            }
        }
    }

    submitForm() {
        let param = this.quartz;
        this.quartzSettingService.addTask(param).then(res => {
            console.log(res);
        }, err => {
            console.info(err);
        })
    }

    editPageInit() {
        let that = this;
        this.uneditable = false;
        this.submitForm = function () {
            that.quartzSettingService.updateTask(that.quartz).then(res => {
                console.log(res);
            }, err => {
                console.log(err);
            });
        };
    }

    back() {
        this.$state.go('quartzes');
    }

    viewPageInit() {
        this.uneditable  = true;
    }
}

QuartzDetailController.$inject=['Store', '$timeout', '$ngConfirm', '$stateParams', 'QuartzSettingService', '$state'];

export const quartzDetail = {
    controller: QuartzDetailController,
    controllerAs: 'quartzDetail',
    template: template
};
