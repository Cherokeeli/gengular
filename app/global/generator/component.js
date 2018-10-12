/**
 * 组件生成器，自动生成一套component
 */
const fs = require('fs');
const join = require('path').join;

let nameIndex = process.argv.indexOf('--name');
let pathIndex = process.argv.indexOf('--path');
let componentName = "sample";
let pathName = "./";
if(nameIndex > -1 && nameIndex+1 < process.argv.length) {
    componentName = process.argv[nameIndex+1];
}
if(pathIndex > -1 && pathIndex+1 < process.argv.length) {
    pathName = join(process.argv[pathIndex+1], componentName);
}

let formattedName = "";
let preSplit = false;
for(let i = 0; i < componentName.length; i++) {
    if(i===0 || preSplit) {
        formattedName += componentName[i].toUpperCase();
        preSplit = false;
    } else if (componentName[i] ==='-') {
        if(i + 1 < componentName.length) {
            preSplit = true;
        } else {
            throw new Error('name参数不合法，"-"分隔符应该在名称中间');
        }
    } else {
        formattedName += componentName[i];
        preSplit = false;
    }
}
let controllerTemplate =
    `import { Component } from "../../global/decorator/Component";
import template from './${componentName}.template.html';
import style from './${componentName}.style.less';

@Component({
    inject: ['ServiceName'],
    as: '',
    template: template,
    style: style
})
export class ${formattedName}Controller {

    afterInjectHook() {
        // 自动注入后钩子函数
    }
    
       
    $onInitHook() {
        // $onInit运行后钩子函数
    }
}
`;

let viewTemplate =
    `<div id="{{asName.style.cssModuleName}}">
    <h1>${componentName} works</h1>
</div>
`;

let styleTemplate =
    `:local(#cssModuleName) {
    width: auto;
}`;
fs.exists(pathName, exists => {
    if(!exists) {
        fs.mkdir(pathName, err => {
            console.log(err);
        })
    }
    fs.writeFile(`${pathName}/${componentName}.component.js`, controllerTemplate, err => {
        console.log(err);
    });
    fs.writeFile(`${pathName}/${componentName}.style.less`, styleTemplate, err => {
        console.log(err);
    });
    fs.writeFile(`${pathName}/${componentName}.template.html`, viewTemplate, err => {
        console.log(err);
    });
});


