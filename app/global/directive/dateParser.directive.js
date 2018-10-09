/**
 * date-parser          将对应的ngModel转换成自己规定的日期格式
 */
export function dateParser($filter) {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {
            if (attr.dateParser) {
                //将ngModel转化为时间戳
                if(attr.toStamp) {
                    ctrl.$parsers.push(function (value) {
                        console.log(value);
                        return Date.parse(new Date(value));
                    });
                    //默认将ngModel转换为date-parser设置的格式
                } else {
                    //将ngModel置为指令指定的格式
                    ctrl.$parsers.push(function (value) {
                        console.log(value);
                        return value? $filter('date')(new Date(value), attr.dateParser):undefined;
                    });
                }
            }
        }
    }
}

dateParser.$inject = ['$filter'];
