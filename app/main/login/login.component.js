/**
 *  LoginController
 *  登录控制器
 */

import loginTemplate from './login.html';

class LoginController {
    constructor() {
        console.info("loginController");
    }
}

export const login = {
    binding: { returnTo: '<' },
    controller: LoginController,
    template: loginTemplate
};