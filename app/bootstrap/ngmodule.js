/**
 * 全局的angular和第三方插件
 */

// angularjs主文件
import * as angular from 'angular';

// htmlt-boilerplate
import 'html5-boilerplate/dist/css/normalize.css';
import 'html5-boilerplate/dist/css/main.css';
import 'html5-boilerplate/dist/js/vendor/modernizr-3.6.0.min';

// angularjs插件
import uiRouter from '@uirouter/angularjs';

// 自定义模块
import { MAIN_MODULE } from '../main/main.module';

export const ngmodule = angular.module('App', [
    uiRouter,
    MAIN_MODULE.name
]);

ngmodule.config(['$uiRouterProvider', '$locationProvider', ($uiRouterProvider, $locationProvider) => {
    $locationProvider.hashPrefix('');
}]);