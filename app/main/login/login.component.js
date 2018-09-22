/**
 *  LoginController
 *  登录控制器
 */

import loginTemplate from './login.template.html';
import * as style from './login.style.less';

class LoginController {
    constructor(MainService, $state) {
        console.info("loginController");
        this.mainService = MainService;
        this.style = style;
        this.$state = $state;
        this.user = {};
        this.logSuccess = true;
    }

    logIn() {
        console.log(this);
        this.mainService.logIn(this.user).then(res => {
            console.log(res);
            this.$state.go('dashboard', {reload: true});
        }, err => {
            console.info('error:',err);
            this.logSuccess = false;
        });
    }

    validateFormRequired(form, formEle) {
        return form[formEle].$dirty && form[formEle].$invalid;
    }
}

LoginController.$inject = ['MainService', '$state'];

export const login = {
    bindings: { returnTo: '<' },
    controller: LoginController,
    controllerAs: 'login',
    template: loginTemplate
};