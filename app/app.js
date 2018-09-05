// angularjs的入口文件，加入主模块的依赖
import angular from 'core/angularjs/angular';
import ui_router from 'core/angular-ui-router/angular-ui-router';

angular.module('App', ['ui.router'], function () {
    console.info('angularjs initialize successfully. version: ', angular.version.full);
});