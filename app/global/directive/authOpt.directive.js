export function authOpt(AuthStore) {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element, attrs, ctrl) {
            let auth = attrs.authOpt;
            let auths = AuthStore.data.auths;
            if (auths.indexOf(auth) === -1) {
                element.remove();
            }
        }
    }
}

authOpt.$inject = ['AuthStore'];