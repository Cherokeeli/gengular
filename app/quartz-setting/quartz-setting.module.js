import { quartzAddState, quartzDetailState, quartzEditState, quartzState, quartzViewState } from "./quartz-setting.state";
import { QuartzSettingService } from "./quartz-setting.service";
import { QuartzController } from "./quartz/quartz.component";
import { quartzDetail } from "./quartz-detail/quartz-detail.component";
import {componentFactory} from "../global/componentFactory";

export const QUARTZ_SETTING_MODULE = angular.module('quartzsetting', [

]);

QUARTZ_SETTING_MODULE.config(['$uiRouterProvider', ($uiRouterProvider) => {
    const stateRegistry = $uiRouterProvider.stateRegistry;
    stateRegistry.register(quartzState);
    stateRegistry.register(quartzDetailState);
    stateRegistry.register(quartzAddState);
    stateRegistry.register(quartzEditState);
    stateRegistry.register(quartzViewState);
}]);

QUARTZ_SETTING_MODULE.component('quartz',componentFactory(QuartzController));
QUARTZ_SETTING_MODULE.component('quartzdetail',quartzDetail);

QUARTZ_SETTING_MODULE.service('QuartzSettingService', QuartzSettingService);

