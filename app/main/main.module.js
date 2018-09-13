import { login } from './login/login.component';
import { app } from "./app/app.component";
import { loginState, appState, dashboardState } from './main.state'
import { navbar } from "./navbar/navbar.component";
import { sidebar } from "./sidebar/sidebar.component";
import { MainService } from "./main.service";
import { dashboard } from "./dashboard/dashboard.component";

export const MAIN_MODULE = angular.module('main', [
    // 在这写依赖模块诶
]);

/**
 * 注册该模块下的routes
 */
MAIN_MODULE.config(['$uiRouterProvider', function($uiRouter) {
    // $uiRouter.trace.enable(1);

    const $urlService = $uiRouter.urlService;
    $urlService.rules.otherwise({ state: 'dashboard' });

    const $stateRegistry = $uiRouter.stateRegistry;
    $stateRegistry.register(appState);
    $stateRegistry.register(loginState);
    $stateRegistry.register(dashboardState);
}]);

/**
 * 注册模块下的component
 */
MAIN_MODULE.component('app', app);
MAIN_MODULE.component('login', login);
MAIN_MODULE.component('navbar', navbar);
MAIN_MODULE.component('sidebar', sidebar);
MAIN_MODULE.component('dashboard', dashboard);

/**
 * 注册模块下的service
 */
MAIN_MODULE.service('MainService', MainService);
MAIN_MODULE.factory('Store', () => {
    return {
        data: {
            config: {}
        }
    };
});
