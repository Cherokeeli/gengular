import {
    userAddState,
    userDetailAddState,
    userDetailState,
    userDetailUpdateOrViewState,
    userEditState,
    usersState, userViewState
} from "./user-setting.state";
import { UserSettingService } from "./user-setting.service";
import { UsersController } from "./users/users.component";
import { userDetail } from "./user-detail/user-detail.component";
import { componentFactory } from "../global/componentFactory";

export const USER_SETTING_MODULE = angular.module('usersetting', [

]);

/**
 * 注册该模块下的routes
 */
USER_SETTING_MODULE.config(['$uiRouterProvider', function($uiRouter) {
    // $uiRouter.trace.enable(1);

    const $urlService = $uiRouter.urlService;
    // $urlService.rules.otherwise({ state: 'users' });

    const $stateRegistry = $uiRouter.stateRegistry;
    $stateRegistry.register(usersState);
    $stateRegistry.register(userDetailState);
    $stateRegistry.register(userEditState);
    $stateRegistry.register(userViewState);
    $stateRegistry.register(userAddState);
}]);

/**
 * 注册模块下的component
 */
USER_SETTING_MODULE.component('users', componentFactory(UsersController));
USER_SETTING_MODULE.component('userdetail', userDetail);

/**
 * 注册模块下的service
 */
USER_SETTING_MODULE.service('UserSettingService', UserSettingService);
USER_SETTING_MODULE.factory('Store', () => {
    return {
        data: {
            optType: ""
        }
    };
});
