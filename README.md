# NEJ-Easy.To.Do

## 体验
可以手机访问（PC端请打开手机模拟）：[点此跳转](http://easyread.top:5050/#/today/)

或者扫二维码体验一下：

![](./photos/1524713508.png)

## 预览

![image-20180425103750007](./photos/preview1.jpg)
![image-20180425103750007](./photos/preview2.jpg)

## 介绍

这是一款基于网易[NEJ](https://github.com/genify/nej)框架构建的ToDo应用Demo，该应用主要运行在手机端，电脑端运行请打开调试模式，使用手机端模拟。

主要功能：

- 每日事务管理（增加，修改，删除，标记完成）
- 待办事项本地存储
- 自动生成历史完成情况（当日完成情况过期后会自动进入历史完成情况）
- 待办事务查询（待做)
- 提醒事项（待做）



主要特点：

- 基于NEJ（方便熟悉NEJ）
- 数据本地存储
- 简化操作流程
- 使用模块化开发（方便了解NEJ模块加载）
- 使用了JST模板
- 按需加载（反正都是NEJ提供的）
- 有较多注释（在学习阶段还是多看注释的好，赞一下NEJ的API源代码中的详细注释）
- 未使用现成控件（我也不知道这算不算特点，本来功能就简单）
- 没了



## 使用方法
直接运行命令：
```
npm install
npm start
```
如果要进行发布构建运行命令：（前提已经安装的nej,如果没有安装nej请使用命令npm install nej安装）
```
npm run build
```
会自动在pro目录下生成构建完成的文件，文件可以直接丢到服务器上运行

## 项目说明

目录结构如下：

```
├── deploy ：部署相关的配置文件
├── node_modules 
├── photos
├── pro ：部署后生成文件
├── res
│   └── img
└── webapp ：源文件目录
    ├── css
    ├── javascript
    │   └── lib
    │       └── nej ：nej框架
    ├── module ：模块文件
    │   ├── m-btm
    │   ├── m-historylist
    │   ├── m-layout
    │   ├── m-profile
    │   ├── m-reminder
    │   └── m-todaylist
    ├── index.html ：项目入口
    └── res
        └── img
```

所有的修改都在webapp下，可以修改index.html增加模块，模块内容全在module文件夹下，模块的相关说明参考[NEJ相关学习](#nej相关学习)

## NEJ相关学习

### define
`NEJ.define()`是NEJ定义的异步加载模块的方式，和传统的[AMD](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)方式类似，它可以方便的管理模块和它们之间的依赖关系，由于NEJ相关的模块都是得通过这种方式加载的，因此**这个define.js文件是最重要**的，需要最先引入。

相关介绍可以参考[NEJ依赖管理系统](https://github.com/genify/nej/blob/master/doc/DEPENDENCY.md)

另可以看[nej/define.js](https://github.com/genify/nej/blob/master/src/define.js) 源文件，上面有较多的注释，其中有几个关键的的点：

#### 使用方法
引入nej.js或者define.js
```
<script src="/path/to/nej/define.js"></script>
或
<script src="/path/to/nej/nes.js"></script>
```
然后通过NEJ.define使用,其中第一个参数是需要引入的模块**数组**, 第二个参数是回调函数，参数依次是引入的模块对象，后面4个`p,o,f,r`是四个额外变量,文档中有提及，其中**最重要的是p**，这个参数在自己定义模块的时候，用来扩展自己的模块。
```
NEJ.define([
   'base/klass',
   'base/element'
],function(_k,_e,_p,_o,_f,_r){

})
```

#### 模块路径
模块路径除了使用相对路径，绝对路径外，还可以配置指定前缀在引入define.js文件的时候可以制定参数路径。如下就是配置了变量A前缀指向../web/js/
```
<script src="/path/to/nej/define.js?A=../web/js/"></script>
```
则文件定义时可以直接使用A或者”{A}”来表示A指定的路径前缀,**其中使用`{}`方式，末尾要标名文件类型**
```
NEJ.definAe([
    'A/api/util',
    '{A}api/util.js'
……
```

#### 常用模块
如果是控件，可以根据名字去`util/`目录下翻

#### 自定义模块
每个模块文件只能定义一个模块，使用一次NEJ.define，源代码中说明了下面三种方式：
```javascript
 // 依赖base/global和base/util
 NEJ.define([
    'base/global',
    'base/util'
 ],function(NEJ,u,p,o,f,r){
     return p;
 });
```
```javascript
 // 不依赖其他文件，等价于直接执行
 NEJ.define(function(p,o,f,r){
     // TODO something
     return p;
 });
```
```javascript
 // 仅用于引入依赖文件列表而不执行业务逻辑
 NEJ.define(['base/global']);
```
需要在模块中添加的方法，就直接添加在p上就行了
```javascript
NEJ.define(function(p,o,f,r){
     p._doSth = function(){
     }
     return p;
 });
```

#### 模块依赖
- 避免出现强依赖
- 基本如果是使用NEJ.define方式定义的模块（如下）都需要额外通过配置定义依赖关系
- 如果是非AMD规范的第三方库如需引入依赖管理，通过NEJ.deps()定义依赖关系，详细看[NEJ依赖管理系统](https://github.com/genify/nej/blob/master/doc/DEPENDENCY.md)


### 模块化开发

关于这一方面，文档写的很长，看着有点绕，要深入了解可以仔细阅读，一般来说使用模块无外乎需要知道以下几点：
- 模块如何定义
- 模块如何渲染使用
- 模块间如何通信



