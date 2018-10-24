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
            // TODO 登录成功的时候reload一下，不然min-height的js不执行，待看
            window.location.href = '#!/app/dashboard';
            window.location.reload();
        }, err => {
            console.info('error:',err);
            this.logSuccess = false;
        });
    }

    validateFormRequired(form, formEle) {
        return form[formEle].$dirty && form[formEle].$invalid;
    }
}
