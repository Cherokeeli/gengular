import { AppConfig } from "./appConfig.service";
import { globalInterceptor } from "./globalInterceptors";
import { AppBaseService } from "./appBase.service";
import { contenteditable } from "./directive/contenteditable.directive";
import { AuthService } from "./auth.service";
import { authOpt } from "./directive/authOpt.directive";
import { TemplateHelper } from "./templateHelper.service";
import { AlertToasterService } from "./alertToaster.service";
import {dateParser} from "./directive/dateParser.directive";
import {laydatePicker} from "./directive/laydatePicker.directive";

export const GLOBAL_MODULE = angular.module('global', [
    // 在这写模块依赖诶
]);

GLOBAL_MODULE.config(['$httpProvider', ($httpProvider) => {

    // 注册该模块下的请求拦截器
    $httpProvider.interceptors.push(globalInterceptor);
}]);

GLOBAL_MODULE.directive('contenteditable', contenteditable);
GLOBAL_MODULE.directive('authOpt', authOpt);
GLOBAL_MODULE.directive('dateParser', dateParser);
GLOBAL_MODULE.directive('laydatePicker', laydatePicker);

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