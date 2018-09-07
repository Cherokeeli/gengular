import { login } from './login/login.component';
import { app } from "./app/app.component";
import { loginState, appState } from './main.state'
import { navbar } from "./navbar/navbar.component";
import { sidebar } from "./sidebar/sidebar.component";
import { MainService } from "./main.service";

export const MAIN_MODULE = angular.module('main', [
    // 在这写依赖模块诶
]);

/**
 * 注册该模块下的routes
 */
MAIN_MODULE.config(['$uiRouterProvider', function($uiRouter) {
    // $uiRouter.trace.enable(1);

    const $urlService = $uiRouter.urlService;
    $urlService.rules.otherwise({ state: 'login' });

    const $stateRegistry = $uiRouter.stateRegistry;
    $stateRegistry.register(appState);
    $stateRegistry.register(loginState);
}]);

/**
 * 注册模块下的component
 */
MAIN_MODULE.component('app', app);
MAIN_MODULE.component('login', login);
MAIN_MODULE.component('navbar', navbar);
MAIN_MODULE.component('sidebar', sidebar);

/**
 * 注册模块下的service
 */
MAIN_MODULE.service('MainService', MainService);
