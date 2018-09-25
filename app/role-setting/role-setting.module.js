import {
    roleAddState,
    roleDetailState,
    roleEditState,
    rolesState, roleViewState
} from "./role-setting.state";
import { RoleSettingService } from "./role-setting.service";
import { roles } from "./roles/roles.component";
import { roleDetail } from "./role-detail/role-detail.component";

export const ROLE_SETTING_MODULE = angular.module('rolesetting', [

]);

/**
 * 注册该模块下的routes
 */
ROLE_SETTING_MODULE.config(['$uiRouterProvider', function($uiRouter) {
    // $uiRouter.trace.enable(1);

    const $urlService = $uiRouter.urlService;
    // $urlService.rules.otherwise({ state: 'users' });

    const $stateRegistry = $uiRouter.stateRegistry;
    $stateRegistry.register(rolesState);
    $stateRegistry.register(roleDetailState);
    $stateRegistry.register(roleEditState);
    $stateRegistry.register(roleViewState);
    $stateRegistry.register(roleAddState);
}]);

/**
 * 注册模块下的component
 */
ROLE_SETTING_MODULE.component('roles', roles);
ROLE_SETTING_MODULE.component('roledetail', roleDetail);

/**
 * 注册模块下的service
 */
ROLE_SETTING_MODULE.service('RoleSettingService', RoleSettingService);
ROLE_SETTING_MODULE.factory('Store', () => {
    return {
        data: {
            optType: ""
        }
    };
});
