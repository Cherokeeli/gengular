import {OPT_TYPE} from "../global/global.enum";
import overviewTemplate from './role-overview.template.html';

export const rolesState = {
    name: 'roles',
    url: '/roles',
    parent: 'app',
    template: overviewTemplate
};

export const roleDetailState = {
    name: 'role',
    url: '/roles?:id',
    parent: 'app',
    abstract: true
};

export const roleEditState = {
    name: 'role.edit',
    url: '/edit',
    params: {opt: OPT_TYPE.EDIT},
    component: 'roledetail'
};

export const roleViewState = {
    name: 'role.view',
    url: '/view',
    params: {opt: OPT_TYPE.VIEW},
    component: 'roledetail'
};

export const roleAddState = {
    name: 'role.add',
    url: '/add',
    params: {opt: OPT_TYPE.ADD},
    component: 'roledetail'
};

/*
export const userDetailAddState = {
    name: 'add',
    parent: 'user',
    url: '/users',
    // parent: 'app',
    params: {opt: OPT_TYPE.ADD},
    component: 'userdetail'
};*/
