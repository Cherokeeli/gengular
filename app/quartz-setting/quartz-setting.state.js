import {OPT_TYPE} from "../global/global.enum";

export const quartzState = {
    name: 'quartzes',
    url: '/quartzes',
    parent: 'app',
    templateUrl: 'app/quartz-setting/quartz-overview.template.html'
};

export const quartzDetailState = {
    name: 'quartz',
    url: '/quartz?:id',
    parent: 'app',
    abstract: true
};

export const quartzEditState = {
    name: 'quartz.edit',
    url: '/edit',
    params: {opt: OPT_TYPE.EDIT},
    component: 'quartzdetail'
};

export const quartzViewState = {
    name: 'quartz.view',
    url: '/view',
    params: {opt: OPT_TYPE.VIEW},
    component: 'quartzdetail'
};

export const quartzAddState = {
    name: 'quartz.add',
    url: '/add',
    params: {opt: OPT_TYPE.ADD},
    component: 'quartzdetail'
};