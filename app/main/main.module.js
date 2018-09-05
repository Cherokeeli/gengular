import { login } from './login/login.component';
import { app } from "./app/app.component";
import { loginState, appState } from './main.state'

export const MAIN_MODULE = angular.module('main', []);

/**
 * 注册该模块下的routes
 */
MAIN_MODULE.config(['$uiRouterProvider', function($uiRouter) {
    // $uiRouter.trace.enable(1);

    // If the user enters a URL that doesn't match any known URL (state), send them to `/welcome`
    const $urlService = $uiRouter.urlService;
    $urlService.rules.otherwise({ state: 'login' });

    const $stateRegistry = $uiRouter.stateRegistry;
    $stateRegistry.register(appState);
    $stateRegistry.register(loginState);
}]);

/**
 * 注册module下的component
 */
MAIN_MODULE.component('app', app);
MAIN_MODULE.component('login', login);
