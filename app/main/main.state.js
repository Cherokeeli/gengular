// 根目录resovle的, login切换到app的根目录的时候能够获取
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

// 按需加载

export const menuModuleState = {
    name: 'menuConfig.**',
    url: '/menu_config',
    parent: 'app',
    lazyLoad: (transition) => {
        const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
        return import('../menu-setting/menu-setting.module.js').then(mod => {
            $ocLazyLoad.load(mod.MENU_SETTING_MODULE);
        })
    }
};

export const roleModuleState = {
    name: 'roles.**',
    parent: 'app',
    url: '/roles',
    lazyLoad: (transition) => {
        const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
        return import('../role-setting/role-setting.module.js').then(mod => {
            $ocLazyLoad.load(mod.ROLE_SETTING_MODULE);
        })
    }
};

export const userModuleState = {
    name: 'users.**',
    parent: 'app',
    url: '/users',
    lazyLoad: (transition) => {
        const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
        return import('../user-setting/user-setting.module.js').then(mod => {
            $ocLazyLoad.load(mod.USER_SETTING_MODULE);
        })
    }
};

export const quartzModuleState = {
    name: 'quartzes.**',
    parent: 'app',
    url: '/quartzes',
    lazyLoad: (transition) => {
        const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
        return import('../quartz-setting/quartz-setting.module.js').then(mod => {
            $ocLazyLoad.load(mod.QUARTZ_SETTING_MODULE);
        })
    }
};