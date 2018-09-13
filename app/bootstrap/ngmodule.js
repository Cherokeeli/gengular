/**
 * 全局的angular和第三方插件
 */

// angularjs主文件
import * as angular from 'angular';

import '../app.style.less';

// jquery主文件
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
import '../../core/ui-framework/dist/js/adminlte.min';


// angularjs插件
import uiRouter from '@uirouter/angularjs';
import uiBootstrap from 'angular-ui-bootstrap';
import 'angular-ui-tree/dist/angular-ui-tree.css';
import uiAngularTree from 'angular-ui-tree';

// 自定义模块
import { MAIN_MODULE } from '../main/main.module';
import { GLOBAL_MODULE } from "../global/global.module";

export const ngmodule = angular.module('App', [
    uiRouter,
    uiBootstrap,
    uiAngularTree,
    GLOBAL_MODULE.name,
    MAIN_MODULE.name
]);

ngmodule.config(['$uiRouterProvider', '$locationProvider', ($uiRouterProvider, $locationProvider) => {
    $locationProvider.hashPrefix('');
}]);