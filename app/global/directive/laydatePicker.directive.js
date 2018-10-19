
/**
 * laydate-picker的封装指令函数
 * [laydate-picker]     input框或者其他标签写上这个属性，点击即可调用laydate控件
 * [date-type]          这个属性用于描述数据类型，有year, month, date, time, datetime
 * [date-format]        这个用于描述日期格式，你懂得
 */
export function laydatePicker() {
    return {
        restrict: "A",
        require: "?ngModel",
        replace: false,
        link: function (scope, element, attrs, ctrl) {
            ctrl.$parsers.unshift(function (value) {
                if(attrs.utcFormat && typeof(value)!=='undefined' && value!="") {
                    return new Date(value);
                }
                if(attrs.formatToTimestamp && typeof(value)!=='undefined' && value!="") {
                    return Date.parse(new Date(value));
                }
                return value;
            });
            ctrl.$formatters.unshift(function (value) {
                if(attrs.dateFormat && typeof(value)!=='undefined' && value!="") {
                    return $filter('date')(new Date(value), attrs.dateFormat);
                }
                if(attrs.timestampToFormat && typeof(value)!=='undefined' && value!="") {
                    return $filter('date')(value, attrs.timestampToFormat);
                }
                return value;
            });
            element.on('click', function (ev) {
//              console.log(ev.target);
                var options = {
                    elem: element[0], //指定元素
                    show: true,
                    isInitValue: true,
                    value: ctrl.$modelValue,
                    trigger: "click",
                    closeStop: element.next().find("em")[0],
                    done: function (value, date, endDate) {
                        scope.$apply(function () {
                            ctrl.$setViewValue(value);
                            ctrl.$render();

                        });

                    }
                };

                if(attrs.dateType) options.type = attrs.dateType;
                if(attrs.dateFormat) options.format = attrs.dateFormat;
                scope.$apply(function () {
                    laydate.render(options);
                });
            });
        }
    }
}