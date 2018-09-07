/**
 *  LoginController
 *  登录控制器
 */

import loginTemplate from './login.template.html';
import * as style from './login.style.less';

class LoginController {
    constructor() {
        console.info("loginController");
        this.style = style;
    }
}

export const login = {
    binding: { returnTo: '<' },
    controller: LoginController,
    controllerAs: 'login',
    template: loginTemplate
};