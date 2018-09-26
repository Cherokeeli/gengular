// 根目录resovle的子路由都能接到
export const authState = {
    name: 'root',
    url: '/',
    abstract: true,
    resolve: {
        // 获取权限信息
        authPermission: ['AuthService', 'AuthStore', (AuthService, AuthStore) => {
            return AuthService.getPermissions().then(res => {
                console.info('permission:',res);
                AuthStore.data.auths = res;
                return res;
            });
        }]
    }
};

export const appState = {
    name: 'app',
    parent: 'root',
    url: 'app',
    component: 'app'
};

export const dashboardState = {
    parent: 'app',
    name: 'dashboard',
    url: '/dashboard',
    component: 'dashboard'
};

export const loginState = {
    name: 'login',
    url: '/login',
    component: 'login'
};