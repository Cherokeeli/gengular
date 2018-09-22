import template from './user-detail.template.html';
import * as style from './user-detail.style.less';
import { OPT_TYPE } from '../../global/global.enum';

export class UserDetailController {
    constructor(Store, $timeout, $ngConfirm, $stateParams, UserSettingService) {
        console.log(Store.data);
        this.$ngConfirm = $ngConfirm;
        this.$stateParams = $stateParams;
        this.userSettingService = UserSettingService;
        this.data = Store.data;
        this.style = style;

        this.roleList = [
            {
                id: 1,
                roleName: 'CIO'
            },
            {
                id: 2,
                roleName: 'CEO'
            },
            {
                id: 3,
                roleName: 'CTO'
            },
            {
                id: 4,
                roleName: 'COO'
            }
        ];

    }

    $onInit() {
        let currentStatus = this.$stateParams.opt;
        if(this.$stateParams.id) {
            this.userSettingService.getUserById(this.$stateParams.id).then(res => {
                console.log(res);
                this.user = res;
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
        let param = this.user;
        this.userSettingService.addUser(param).then(res => {
            console.log(res);
        }, err => {
            console.info(err);
        })
    }

    editPageInit() {
        let that = this;
        this.uneditable = false;
        this.submitForm = function () {
            that.userSettingService.updateUser(that.user).then(res => {
                console.log(res);
            }, err => {
                console.log(err);
            });
        };
    }

    viewPageInit() {
        this.uneditable  = true;
    }
}

UserDetailController.$inject=['Store', '$timeout', '$ngConfirm', '$stateParams', 'UserSettingService'];

export const userDetail = {
    controller: UserDetailController,
    controllerAs: 'userDetail',
    template: template
};