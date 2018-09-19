## gengular
To develop auto-generated webpages based on json instead of writing some boring CURD webpages.

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