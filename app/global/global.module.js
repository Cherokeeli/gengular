import { AppConfig } from "./appConfig.service";
import { globalInterceptor } from "./globalInterceptors";
import { includeReplace } from "./directive/includeReplace.directive";
import { AppBaseService } from "./appBase.service";

export const GLOBAL_MODULE = angular.module('global', [
    // 在这写模块依赖诶
]);

GLOBAL_MODULE.config(['$httpProvider', ($httpProvider) => {

    // 注册该模块下的请求拦截器
    $httpProvider.interceptors.push(globalInterceptor);
}]);

GLOBAL_MODULE.directive('includeReplace', includeReplace);

GLOBAL_MODULE.service('AppConfig', AppConfig);
GLOBAL_MODULE.service('AppBaseService', AppBaseService);