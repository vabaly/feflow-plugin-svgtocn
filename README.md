# feflow-plugin-svgtocn

## 简介

termtosvg 录制的 svg 文件对中文显示不太友好，本插件会让中文正常显示

## 安装

这是一款 [Feflow](https://github.com/feflow/feflow) 的插件，需要先安装 [Feflow](https://github.com/feflow/feflow)：

```sh
npm i feflow-cli -g
```

然后再用 Feflow 安装本插件

```sh
feflow install feflow-plugin-svgtocn
```

## 使用

```sh
feflow svgtocn <filename> [<filename> ...]
```

## 效果

例如 termtosvg 录制屏幕如下：

![feflow](https://pub.idqqimg.com/0364c0997c0e46c19d9f34bc1653e161.svg)

经过该插件处理后的如下：

![convert-feflow](https://pub.idqqimg.com/3321a46b34c249ba945fb73749026bbb.svg)