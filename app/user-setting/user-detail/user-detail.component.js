import template from './user-detail.template.html';
import * as style from './user-detail.style.less';

export class UserDetailController {
    constructor(Store, $timeout, $ngConfirm, $stateParams) {
        console.log(Store.data);
        this.$ngConfirm = $ngConfirm;
        this.$stateParams = $stateParams;
        this.data = Store.data;
        console.log(this.$stateParams.id, this.$stateParams.opt);
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
        ]
    }
}

UserDetailController.$inject=['Store', '$timeout', '$ngConfirm', '$stateParams'];

export const userDetail = {
    controller: UserDetailController,
    controllerAs: 'userDetail',
    template: template
};