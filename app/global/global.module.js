import { AppConfig } from "./appConfig.service";
import { globalInterceptor } from "./globalInterceptors";

export const GLOBAL_MODULE = angular.module('global', [
    // 在这写模块依赖诶
]);

GLOBAL_MODULE.config(['$httpProvider', ($httpProvider) => {

    // 注册该模块下的请求拦截器
    $httpProvider.interceptors.push(globalInterceptor)
}]);

GLOBAL_MODULE.service('AppConfig', AppConfig);