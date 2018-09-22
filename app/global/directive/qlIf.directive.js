export function qlIf() {
    return {
        restrict: 'A',
        scope: false,
        link: function (scope, element, attrs, ctrl) {
            console.log(scope, ctrl);
        }
    }
}