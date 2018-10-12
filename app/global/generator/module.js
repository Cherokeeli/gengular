/**
 * 模块生成器，自动生成一套module代码
 */

const fs = require('fs');
const join = require('path').join;

let nameIndex = process.argv.indexOf('--name');
let pathIndex = process.argv.indexOf('--path');
let moduleName = "sample";
let pathName = "./";
if(nameIndex > -1 && nameIndex+1 < process.argv.length) {
    moduleName = process.argv[nameIndex+1];
}
if(pathIndex > -1 && pathIndex+1 < process.argv.length) {
    pathName = join(process.argv[pathIndex+1], moduleName);
}

let formattedName = "";
for(let i = 0; i < moduleName.length; i++) {
    if (moduleName[i] ==='-') {
        if(i + 1 < moduleName.length) {
            formattedName += '_';
        } else {
            throw new Error('name参数不合法，"-"分隔符应该在名称中间');
        }
    } else {
        formattedName += moduleName[i].toUpperCase();
    }
}

let camelCase = "";
let preSplit = false;
for(let i = 0; i < moduleName.length; i++) {
    if(i===0 || preSplit) {
        camelCase += moduleName[i].toUpperCase();
        preSplit = false;
    } else if (moduleName[i] ==='-') {
        if(i + 1 < moduleName.length) {
            preSplit = true;
        } else {
            throw new Error('name参数不合法，"-"分隔符应该在名称中间');
        }
    } else {
        camelCase += moduleName[i];
        preSplit = false;
    }
}
let moduleTemplate =
    `import {componentFactory} from "../global/componentFactory";

export const ${formattedName}_MODULE = angular.module('${moduleName.replace(/\-/g, '')}', [
    // 注册模块依赖
]);

/**
 * 注册该模块下的routes
 */
${formattedName}_MODULE.config(['$uiRouterProvider', function($uiRouter) {

    const $urlService = $uiRouter.urlService;
    $urlService.rules.otherwise({ state: '/*例外路由*/' });

    const $stateRegistry = $uiRouter.stateRegistry;
    $stateRegistry.register(/*路由*/);
}]);

/**
 * 注册模块下的component
 */
${formattedName}_MODULE.component('/*Component名字*/', componentFactory(/*Component控制器名*/));

/**
 * 注册模块下的service
 */
${formattedName}_MODULE.service('/*注册service名*/', /*Service文件名*/);
`;

let serviceTemplate =
    `export class ${camelCase}Service {
    constructor(AppBaseService) {
        this.appBaseService = AppBaseService;
    }
}

${camelCase}Service.$inject = ['AppBaseService'];
`;

let stateTemplate =
    `export const appState = {
    name: '/*state名字*/',
    parent: '/*父级state名*/',
    url: '/*url名*/',
    component: '/*绑定component名*/'
};`;
fs.exists(pathName, exists => {
    if(!exists) {
        fs.mkdir(pathName, err => {
            console.log(err);
        })
    }
    fs.writeFile(`${pathName}/${moduleName}.module.js`, moduleTemplate, err => {
        console.log(err);
    });
    fs.writeFile(`${pathName}/${moduleName}.service.js`, serviceTemplate, err => {
        console.log(err);
    });
    fs.writeFile(`${pathName}/${moduleName}.state.js`, stateTemplate, err => {
        console.log(err);
    });
});


