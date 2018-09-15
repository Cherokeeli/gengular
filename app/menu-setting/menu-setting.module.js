import {appState, dashboardState, loginState} from "../main/main.state";
import {MAIN_MODULE} from "../main/main.module";
import {userState} from "./user-setting.state";

export const USER_SETTING_MODULE = angular.module('systemSetting', [

]);

/**
 * 注册该模块下的routes
 */
USER_SETTING_MODULE.config(['$uiRouterProvider', function($uiRouter) {
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
USER_SETTING_MODULE.component('app', app);

/**
 * 注册模块下的service
 */
USER_SETTING_MODULE.service('MainService', MainService);
USER_SETTING_MODULE.factory('Store', () => {
    return {
        data: {
            config: {}
        }
    };
});