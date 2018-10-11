/**
 *  LoginController
 *  登录控制器
 */

import loginTemplate from './login.template.html';
import * as style from './login.style.less';
import {Component} from "../../global/decorator/Component";
@Component({
    inject: ['MainService', '$state'],
    as: 'login',
    template: loginTemplate,
    style: style
})
export class LoginController {
    afterInjectHook() {
        this.user = {};
        this.logSuccess = true;
    }


    logIn() {
        console.log(this);
        this.mainService.logIn(this.user).then(res => {
            console.log(res);
            // this.$state.go('dashboard', null, {reload: true});
            // TODO 进入Dashboard之后ui框架的js不执行，暂时强制刷新重新执行这些js
            window.location.href = '#/app/dashboard';
            window.location.reload(true);
        }, err => {
            console.info('error:',err);
            this.logSuccess = false;
        });
    }
}
