/**
 * 权限指令，通过接口获取的权限数组，用这个指令进行权限控制，没有权限的就删除
 * @param AuthStore
 * @return {{restrict: string, scope: boolean, link: link}}
 */

export function authOpt(AuthStore) {
    return {
        restrict: 'A',
        scope: false,
        link: (scope, element, attrs, ctrl) => {
            let auth = attrs.authOpt;
            let auths = AuthStore.data.auths;
            if (auths.indexOf(auth) === -1) {
                element.remove();
            }
        }
    }
}

authOpt.$inject = ['AuthStore'];