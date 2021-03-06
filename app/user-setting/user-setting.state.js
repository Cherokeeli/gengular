import {OPT_TYPE} from "../global/global.enum";
import overviewTemplate from './user-overview.template.html';

export const usersState = {
    name: 'users',
    url: '/users',
    parent: 'app',
    // component: 'users',
    template: overviewTemplate
};

export const userDetailState = {
    name: 'user',
    url: '/users?:id',
    parent: 'app',
    abstract: true
};

export const userEditState = {
    name: 'user.edit',
    url: '/edit',
    params: {opt: OPT_TYPE.EDIT},
    component: 'userdetail'
};

export const userViewState = {
    name: 'user.view',
    url: '/view',
    params: {opt: OPT_TYPE.VIEW},
    component: 'userdetail'
};

export const userAddState = {
    name: 'user.add',
    url: '/add',
    params: {opt: OPT_TYPE.ADD},
    component: 'userdetail'
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
