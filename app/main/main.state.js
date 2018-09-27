// 根目录resovle的, login切换到app的根目录的时候能够获取
// TODO 只有刷新才会调这个state以获取auth数组，改成任意statechange都能调用
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