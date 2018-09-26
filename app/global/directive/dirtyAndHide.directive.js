export function dirtyAndHide() {
    return {
        restrict: 'A',
        link: (scope, element, attrs, ctrl) => {
            let parentElement = element;
            let selectors = attrs.dirtyAndHide.split('|');
            let orOpt = false;
            for(let i = 0; i < selectors.length; i++) {
                let selector = selectors[i];
                // let checkElement = parentElement.find(selector);
                while(!parentElement.find(selector).length) {
                    parentElement = parentElement.parent();
                    if(parentElement[0] === document) {
                        throw new Error('selector element is not exist');
                    }
                }

                if(parentElement.find(selector)) {
                    orOpt = orOpt && parentElement.find(selector).controller('ngModel').$dirty;
                }
            }

            if(orOpt === false) {
                element.remove();
            }
        }
    }
}