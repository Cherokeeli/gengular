export const usersState = {
    name: 'users',
    url: '/users',
    parent: 'app',
    component: 'users'
};

export const userDetailState = {
    name: 'user',
    url: '/users/:id',
    parent: 'app',
    params: {opt: null},
    component: 'userdetail'
};