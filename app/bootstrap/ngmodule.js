/**
 * App模块，全局的angular和第三方插件
 */

// angularjs主文件
import * as angular from 'angular';

import '../app.style.less';

// jquery主文件 不需要在这里导入，webpack已经处理好
// import 'jquery';

// htmlt-boilerplate
import 'html5-boilerplate/dist/css/normalize.css';
import 'html5-boilerplate/dist/css/main.css';
import 'html5-boilerplate/dist/js/vendor/modernizr-3.6.0.min';

// bootstrap
import 'bootstrap/dist/css/bootstrap.css';

// 图标
import 'font-awesome/css/font-awesome.min.css';
import 'ionicons/dist/css/ionicons.min.css';

// ui框架和主题
import '../../core/ui-framework/dist/css/AdminLTE.min.css';
// import '../../core/ui-framework/dist/css/skins/_all-skins.css';
import '../../core/ui-framework/bower_components/jquery-slimscroll/jquery.slimscroll.min';
import '../../core/ui-framework/bower_components/fastclick/lib/fastclick';
import '../../core/ui-framework/dist/css/skins/skin-purple.min.css';
// 在这里载入lte框架的js会有问题，应当在进入App后在载入框架，当前解决方案是在登录后进入dashboard的时候载入lte框架
// import '../../core/ui-framework/dist/js/adminlte.min';


// angularjs插件
// ui-router插件
import uiRouter from '@uirouter/angularjs';
// bootstrap的angularjs实现
import uiBootstrap from 'angular-ui-bootstrap';
// angularjs树形结构插件
import 'angular-ui-tree/dist/angular-ui-tree.css';
import uiAngularTree from 'angular-ui-tree';
// 确认框插件
import 'angular-confirm1/dist/angular-confirm.min';
import 'angular-confirm1/dist/angular-confirm.min.css';
// toaster插件
import 'angular-ui-notification/dist/angular-ui-notification.min';
import 'angular-ui-notification/dist/angular-ui-notification.min.css';
// 文件上传插件
import 'angular-file-upload/dist/angular-file-upload.min';
// 动态效果插件
import ngAnimate from 'angular-animate';
// 自定义模块
import { MAIN_MODULE } from '../main/main.module';
import { GLOBAL_MODULE } from "../global/global.module";

export const ngmodule = angular.module('App', [
    uiRouter,
    uiBootstrap,
    uiAngularTree,
    ngAnimate,
    'ui-notification',
    'cp.ngConfirm',
    'angularFileUpload',
    GLOBAL_MODULE.name,
    MAIN_MODULE.name,
]);

ngmodule.config(['$uiRouterProvider', '$locationProvider', 'NotificationProvider', ($uiRouterProvider, $locationProvider, NotificationProvider) => {
    // 设置请求的prefix
    // $locationProvider.hashPrefix('');
    // 设置通知框的出现位置
    NotificationProvider.setOptions({
        positionX: 'right',
        positionY: 'bottom'
    });
}]);

ngmodule.run(['$transitions','AuthService', 'AuthStore', ($transitions, AuthService, AuthStore) => {

    // 除了登录前的login state, 其余每次state切换的时候都会调用请求权限的api，来获取最新的api
    $transitions.onStart({}, function(trans) {
        console.log(trans.to());
        if(trans.to().name !== `login`) {
            // return promise，当数据resolve的时候就会继续transition
            return AuthService.getPermissions().then(res => {
                console.info('permission:', res);
                AuthStore.data.auths = res;
                return res;
            });
        }
    });
}]);