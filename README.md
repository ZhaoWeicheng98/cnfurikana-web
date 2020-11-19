# cnfurikana-web

## Credit

感谢Khadaaa在NGA的帖子[给中文标注日语假名-CNfurikana](https://ngabbs.com/read.php?tid=24124817)提供的想法和其项目[Gleiphir/cnfurikana](https://github.com/Gleiphir/cnfurikana)中提供的拼音转假名json数据文件。

vue.js, element-ui, pinyin.js, cnchar.js, speak-tts.js

## Introduction

[工具] 给中文标注日语假名和拼音 CNfurikana Web版本

有什么功能特性？

+ 为输入或上传的文本中的汉字注音，可以标注假名或者拼音，并可选择是否标注声调。
+ 基于HTML5 ruby特性，注音位置更加准确。
+ 基于web，使用更加方便。
+ PWA支持，可以在任意支持的平台将其安装到本地使用。
+ TTS支持，可以直接朗读输入的文本的中文发音。
+ 多语言支持，支持简体中文、繁体中文、英语和日语。

以后再也不用担心不会念舰长DD的名字了

## Pages

在Github Pages和Gitee Pages上均有托管。
[Github CNFurikana](https://cnfurikana.github.io/)
[Gitee CNFurikana](https://cnfurikana.gitee.io/)

## Known Issues

从上传文件中读取文本后需要刷新页面才能上传文件。

## License



## For Developer

### Project setup
```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```

#### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
