// 整个项目以及requirejs的入口文件，加载项目所有相关文件以及依赖

require.config({
    paths: {
        // angularjs主文件
        'angular': '../core/angularjs/angular',
        // angular-ui-router主文件
        'ui-router': '../core/angular-ui-router/angular-ui-router'
    },
    shim: {
        'angular': { exports: 'angular' },
        'ui-router': ['angular']
    }
});

require(['angular','app'], function (angular) {
    console.info('angularjs initialize successfully. version: ', angular.version.full);
});