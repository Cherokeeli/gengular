import { AppConfig } from "./appConfig.service";
import { globalInterceptor } from "./globalInterceptors";
import { includeReplace } from "./directive/includeReplace.directive";
import { AppBaseService } from "./appBase.service";
import { contenteditable } from "./directive/contenteditable.directive";
import { AuthService } from "./auth.service";
import { authOpt } from "./directive/authOpt.directive";
import { qlIf } from "./directive/qlIf.directive";
import { TemplateHelper } from "./templateHelper.service";
import { dirtyAndHide } from "./directive/dirtyAndHide.directive";
import { AlertToasterService } from "./alertToaster.service";

export const GLOBAL_MODULE = angular.module('global', [
    // 在这写模块依赖诶
]);

GLOBAL_MODULE.config(['$httpProvider', ($httpProvider) => {

    // 注册该模块下的请求拦截器
    $httpProvider.interceptors.push(globalInterceptor);
}]);

GLOBAL_MODULE.directive('includeReplace', includeReplace);
GLOBAL_MODULE.directive('contenteditable', contenteditable);
GLOBAL_MODULE.directive('authOpt', authOpt);
GLOBAL_MODULE.directive('qlIf', qlIf);
GLOBAL_MODULE.directive('dirtyAndHide', dirtyAndHide);

GLOBAL_MODULE.service('AppConfig', AppConfig);
GLOBAL_MODULE.service('AppBaseService', AppBaseService);
GLOBAL_MODULE.service('AuthService', AuthService);
GLOBAL_MODULE.service('TemplateHelper', TemplateHelper);
GLOBAL_MODULE.service('AlertToasterService', AlertToasterService);

GLOBAL_MODULE.factory('AuthStore', () => {
    return {
        data: {
            auths:[]
        }
    }
});