/**
 * 可编辑html节点，这个指令实现了其中的值可以绑定到ngModel上
 * @return {{require: string, link: link}}
 */
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