# gengular
配JSON，写页面，你也可以

[TOC]

## webpack 4 升级注意事项
npm install 过程中会需 chromedriver 下载的情况

- npm install --save-dev webpack@4.17.2 chromedriver --chromedriver_cdnurl=http://localhost:7000/mirrors/chromedriver (chrome driver 不能是 file:// 协议的)
- npm install --save-dev webpack-cli

## Sass 安装
- 先装ruby，配置好环境 window环境安装麻烦，用Mac电脑吧
- npm install -g sass
- npm install —save node-sass
- 如果下载不了请根据版本去 https://npm.taobao.org/mirrors/node-sass/ 寻找对应版本进行下载
- 然后执行 npm i node-sass --sass_binary_path=/Users/zhangzhijie303/Downloads/darwin-x64-57_binding.node
- 注意
- 这样官网安装的node-sass会缺少一个vendor文件夹
- 只需要在node-sass文件夹，创建vendor并且根据你下载的内容如 ‘darwin-x64-57_binding.node’
- 按照内容创建darwin-x64-57/binding.node 这么创建就好了

## 项目插件
项目中集成了以下6种常用插件，可直接注入然后使用
- ui-router                 angularjs路由插件
- angular-ui-bootstrap      angularjs bootstrap插件
- angular-ui-tree           angularjs 树形插件
- angular-ui-notification   angularjs toaster插件
- angular-confirm           angularjs 确认框插件
- angular-file-upload       angularjs 文件上传插件

## 文件类型
项目中除了标准的js,html,less,css文件名，为了标识更详尽的类型，有一下的类型
- module:模块
- component:组件
- service:服务
- state:路由
- directive:指令
- style:样式
- template:模板
- enum:枚举

## 目录结构
```
|____index.html                             项目入口
|____package.json                           npm依赖目录
|____webpack.development.config.js          webpack开发环境编译配置
|____webpack.production.config.js           webpack生产环境编译配置
|____core                                   ui框架
|____dist                                   编译路径
|____app                                    代码主目录
| |____bootstrap                            应用主目录
| | |____bootstrap.js                       webpack打包入口文件
| | |____ngmodule.js                        App模块
| |____global                               全局模块目录
| | |____compiler                           模板编译器，可编译静态模板供定制，通过json文件
| | |____decorator                          修饰器，主要有Component,StandardList, StandardCURD等修饰器
| | |____directive                          里面有各种angularjs指令
| | |____template                           供模板编译器编译的原始模板文件
| | |____alertToaster.service.js            封装的确认框和提示框service
| | |____appBase.service.js                 封装get,post,put,delete,upload,downloadGet,downloadPost函数
| | |____appConfig.service.js               应用的全局变量定义
| | |____auth.service.js                    权限控制的service，里面有相应接口函数
| | |____componentFactory.js                组件工厂，将export的组件经过这个包装后放入MODULE.component()里面
| | |____global.enum.js                     全局枚举
| | |____global.module.js                   global模块
| | |____globalInterceptors.js              global请求拦截器
| |____main                                 Main模块，整个界面的结构在此，包含了登录，导航栏，侧边栏，dashboard
| |____menu-setting                         菜单模块
| |____role-setting                         角色模块
| |____user-setting                         用户模块
| |____utils                                一些utils函数
| |____app.style.less                       全局样式
```

## 组件化
angularjs 1.5之后引入了MODULE.component，可以进行组件化开发了，项目中，一个标准的组件如下：
```javascript
// controller.js
import template from '...';
@Component({
    // 需要注入的service,会自动初始化到this上，如果service名是大写开头，会将开头字母转成小写
    inject: ['$timeout', 'UserSettingService', '$state', 'TemplateHelper', 'AlertToasterService'],
    // controllerAs，在template中的属性名
    as: 'users',
    //模板文件
    template: template
})
export class SampleController {

    afterInjectHook() {
        // 注入后钩子函数，注入完成后会调用该函数
    }
}
```
将Controller export到module，需要处理一下
```
// module.js
import { SampleController } from '...'
SAMPLE_MODULE.component('sample', componentFactory(SampleController));
```

## 模块化
一个标准的模块代码如下
```
//模块名
export const USER_SETTING_MODULE = angular.module('usersetting', [
    // 模块依赖
]);

/**
 * 注册该模块下的routes
 */
USER_SETTING_MODULE.config(['$uiRouterProvider', function($uiRouter) {
    // $uiRouter.trace.enable(1);

    const $urlService = $uiRouter.urlService;
    // $urlService.rules.otherwise({ state: 'users' });

    const $stateRegistry = $uiRouter.stateRegistry;
    $stateRegistry.register(usersState);
}]);

/**
 * 注册模块下的component
 */
USER_SETTING_MODULE.component('users', componentFactory(UsersController));

/**
 * 注册模块下的service
 */
USER_SETTING_MODULE.service('UserSettingService', UserSettingService);
```

## 修饰器
项目现有的修饰器如Component, StandardList, StandardCURD
Component修饰器，将Controller添加组件的一些行为
```
@Component({
    // 需要注入的service,会自动初始化到this上，如果service名是大写开头，会将开头字母转成小写
    inject: ['$timeout', 'UserSettingService', '$state', 'TemplateHelper', 'AlertToasterService'],
    // controllerAs，在template中的属性名
    as: 'users',
    //模板文件
    template: template
})
```
StandardList修饰器，添加标准列表视图的行为，同时添加了组件中某些控件的开关变量
```
@StandardList({
    // 需要调用的service，
    service: 'userSettingService',
    // 需要命名的列表model
    listModel: 'userList',
    // 需要调用service中的列表方法
    list: 'getUsers',
    // 需要调用service的删除方法
    delete: 'deleteUser'
})
```
StandardCURD修饰器，添加了标准增删改查的视图行为，同时添加了组件中某些控件的开关变量
```
@StandardCURD({
    // 新增页面路由
    addState: 'user.add',
    // 编辑页面路由
    editState: 'user.edit',
    // 查看页面路由
    viewState: 'user.view',
})
```

## 模板编译器

## 指令

## TODO-List
Server-Side-Rendering