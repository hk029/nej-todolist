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

### 模块化开发

