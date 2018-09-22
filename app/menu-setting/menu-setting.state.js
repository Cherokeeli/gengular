export const menuState = {
    name: 'menuConfig',
    url: '/menu_config',
    parent: 'app',
    component: 'menuconfig',
    resolve: {
        /*authPermission: (AuthService) => {
            return AuthService.getPermissions().then(res => {
                return res;
            });
        }*/
    }
};