export function contenteditable() {
    return {
        require: '?ngModel',
        link: (scope, element, attrs, ctrl) => {
            element.bind('keyup', function (event) {
                scope.$apply(_=> {
                    let html = element.text().replace(/\<(S*?)[^\>]*\>.*?|\<.*?\/>/g,"");
                    ctrl.$setViewValue(html);
                    ctrl.$render();
                })
            });

            ctrl.$formatters.unshift(function (value) {
                element.html(value);
            });
        }
    }
}