import {LoginController} from './login/login.component';
import {AppController} from "./app/app.component";
import {
    loginState,
    appState,
    dashboardState,
    authState,
    menuModuleState,
    userModuleState,
    roleModuleState, quartzModuleState
} from './main.state'
import {NavbarController} from "./navbar/navbar.component";
import {SidebarController} from "./sidebar/sidebar.component";
import { MainService } from "./main.service";
import {DashboardController} from "./dashboard/dashboard.component";
/*import { MENU_SETTING_MODULE } from "../menu-setting/menu-setting.module";
import { ROLE_SETTING_MODULE } from "../role-setting/role-setting.module";
import { USER_SETTING_MODULE } from "../user-setting/user-setting.module";
import {QUARTZ_SETTING_MODULE} from "../quartz-setting/quartz-setting.module";*/
import {componentFactory} from "../global/componentFactory";

export const MAIN_MODULE = angular.module('main', [
    // 在这写依赖模块诶, 现在已经使用按需加载，见app/main/main.state.js
    /*MENU_SETTING_MODULE.name,
    USER_SETTING_MODULE.name,
    ROLE_SETTING_MODULE.name,
    QUARTZ_SETTING_MODULE.name*/
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
    $stateRegistry.register(dashboardState);
    $stateRegistry.register(authState);
    $stateRegistry.register(menuModuleState);
    $stateRegistry.register(userModuleState);
    $stateRegistry.register(roleModuleState);
    $stateRegistry.register(quartzModuleState);
}]);

/**
 * 注册模块下的component
 */
MAIN_MODULE.component('app', componentFactory(AppController));
MAIN_MODULE.component('login', componentFactory(LoginController));
MAIN_MODULE.component('navbar', componentFactory(NavbarController));
MAIN_MODULE.component('sidebar', componentFactory(SidebarController));
MAIN_MODULE.component('dashboard', componentFactory(DashboardController));

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
