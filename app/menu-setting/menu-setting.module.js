import { menuState } from "./menu-setting.state";
import {MenuConfigController} from "./menu/menu.component";
import { MenuSettingService } from "./menu-setting.service";
import {MenuTreeController} from "./menu-tree/menu-tree.component";
import {componentFactory} from "../global/componentFactory";

export const MENU_SETTING_MODULE = angular.module('menuSetting', [
]);

/**
 * 注册该模块下的routes
 */
MENU_SETTING_MODULE.config(['$uiRouterProvider', function($uiRouter) {
    // $uiRouter.trace.enable(1);

    const $urlService = $uiRouter.urlService;
    $urlService.rules.otherwise({ state: 'menuConfig' });

    const $stateRegistry = $uiRouter.stateRegistry;
    $stateRegistry.register(menuState);
}]);

/**
 * 注册模块下的component
 */
MENU_SETTING_MODULE.component('menuconfig', componentFactory(MenuConfigController));
MENU_SETTING_MODULE.component('menutree', componentFactory(MenuTreeController));

/**
 * 注册模块下的service
 */
MENU_SETTING_MODULE.service('MenuSettingService', MenuSettingService);
MENU_SETTING_MODULE.factory('Store', () => {
    return {
        data: {
            menuConfig: {}
        }
    };
});
