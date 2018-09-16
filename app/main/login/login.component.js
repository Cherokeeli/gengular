/**
 *  LoginController
 *  登录控制器
 */

import loginTemplate from './login.template.html';
import * as style from './login.style.less';

class LoginController {
    constructor(MainService) {
        console.info("loginController");
        this.mainService = MainService;
        this.style = style;
        this.user = {};
    }

    logIn() {
        console.log(this);
        this.mainService.logIn(this.user).then(res => {
            console.log(res);
        });
    }

    validateFormRequired(form, formEle) {
        return form[formEle].$dirty && form[formEle].$invalid;
    }
}

LoginController.$inject = ['MainService'];

export const login = {
    binding: { returnTo: '<' },
    controller: LoginController,
    controllerAs: 'login',
    template: loginTemplate
};