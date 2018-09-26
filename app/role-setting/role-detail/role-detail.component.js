import style from './role-detail.style.less';
import template from './role-detail.template.html';
import {OPT_TYPE} from "../../global/global.enum";
import {UserDetailController} from "../../user-setting/user-detail/user-detail.component";

class RoleDetailController {
    constructor(Store, $timeout, $ngConfirm, $stateParams, RoleSettingService, $state) {
        this.style = style;

        this.$ngConfirm = $ngConfirm;
        this.$stateParams = $stateParams;
        this.roleSettingService = RoleSettingService;
        this.data = Store.data;
        this.style = style;
        this.$state = $state;
        this.role = {};
        this.checkedNodes = "123123";

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
        this.checkedNodes = [];
        if(this.$stateParams.id) {
            this.roleSettingService.getRoleById(this.$stateParams.id)
                .then(res => {
                    console.log(res);
                    this.role = res;
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
        let param = this.role;
        this.roleSettingService.addRole(param).then(res => {
            console.log(res);
        }, err => {
            console.info(err);
        })
    }

    editPageInit() {
        let that = this;
        let param = this.role;
        this.uneditable = false;
        this.submitForm = function () {
            that.roleSettingService.updateRole(that.role).then(res => {
                console.log(res);
            }, err => {
                console.log(err);
            });
        };
    }

    back() {
        this.$state.go('roles');
    }

    viewPageInit() {
        this.uneditable  = true;
    }

}

RoleDetailController.$inject=['Store', '$timeout', '$ngConfirm', '$stateParams', 'RoleSettingService', '$state'];

export const roleDetail = {
    controller: RoleDetailController,
    controllerAs: 'roleDetail',
    template: template
};