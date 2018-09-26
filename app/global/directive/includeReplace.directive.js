
export function includeReplace() {
    return {
        require: 'ngInclude',
        restrict: 'A',
        replace: true,
        /*controller: function ($scope, $element, $attrs, $transclude) {
            // let ngInclude = angular.element( element[ 0 ].querySelector( 'ng-include' ) );
            // ngInclude.replaceWith( ngInclude.children() );
            console.log($element[0].childNodes, $element[0].parentElement);
            /!*let nodes = $element[0].childNodes;
            Array.prototype.forEach.call(nodes, (node) => {
                $element[0].parentElement.insertBefore(node, $element[0]);
            });*!/

            console.log($element.children());
            $element.parent().append($element[0].childNodes);
            /!*return {
                post : angular.noop
            };*!/
        }*/
        /*link: function (scope, element, attrs) {
            console.log(element[0].childNodes)
        }*/
        compile: (tElement, tAttrs) => {
            console.log(tElement);
            tElement.replaceWith(tElement.children());
            return {
                post : angular.noop
            };
        }
    };
}