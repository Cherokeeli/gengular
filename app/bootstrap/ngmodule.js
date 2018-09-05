import * as angular from 'angular';
// import '../../core/html5-boilerplate/js/vendor/modernizr-2.8.3.min';
import uiRouter from '@uirouter/angularjs';
import { MAIN_MODULE } from '../main/main.module';

export const ngmodule = angular.module('App', [
    uiRouter,
    MAIN_MODULE.name
]);

ngmodule.config(['$uiRouterProvider', '$locationProvider', ($uiRouterProvider, $locationProvider) => {
    $locationProvider.hashPrefix('');
}]);