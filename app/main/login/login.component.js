/**
 *  LoginController
 *  登录控制器
 */

class LoginController {
    constructor() {
        console.info("loginController");
    }
}

export const login = {
    binding: { returnTo: '<' },
    controller: LoginController,
    template: `<h1>ads敖德萨实打实的</h1>`
};