---
title: 利用github page以及hexo模板建立个人独立博客
date: 2015-08-22 01:07:17
toc: true
tags:
- HEXO
- 建博客
- 教程
- Github Pages
---
折腾了几天终于把这个个人博客建立起来了，因为不会前端技术所以就利用别人的模板来偷懒做个主页。趁着现在还没有忘掉把这个过程记录下来，中间走了不少弯路大家可以借鉴一下。
# 准备工作
> 所有的工具的使用方法一律以官方文档为主
> 所有的工具的使用方法一律以官方文档为主
> 所有的工具的使用方法一律以官方文档为主

重要的事情说三遍，因为我建博客的时候被坑了好几次了。当时找到的教程用的hexo和其他的依赖版本都和现在不一样，有些过程发生了变化，完全按照教程会发生很多意想不到的错误，所以**一定要先看官方文档**，再按照教程的思路操作，其他的教程也是类似，更何况大多数官方文档都写的蛮直接友好的。

在搭建过程中出现问题也可以在其github页面中的issue查看有没有类似问题，大多数能解决而且效果比较好，相对于在搜索引擎上找解决办法更高效。我会在最后列出我碰到的一些问题。

本人是在**ubuntu14.04LTS系统**上搭建的，MacOS以及Win上我并没有试过，Win我不敢说，不过MacOS上大体相同。具体见对应的官方文档。

# 安装HEXO

[HEXO的官方文档](https://hexo.io/docs/)
按照这个安装肯定不会出错，不过我还是稍微翻译一下。

## 安装hexo的依赖

在安装HEXO之前，首先要安装下面两个：

*   Node.js
*   Git

如果已经安装过了，可以直接进入最后安装HEXO那一步，否则按照下面继续。

> 对于苹果用户而言首先要在应用商店里安装Xcode，然后再打开Xcode，前往**Preferences -&gt; Download -&gt; Command Line Tools -&gt; Install**去安装**command line tools**(其实很多东西需要这个，早安了早解脱)。

## 安装Git

[Git安装官方文档](http://git-scm.com/book/zh/v1/%E8%B5%B7%E6%AD%A5-%E5%AE%89%E8%A3%85-Git)
[比较好的git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137396287703354d8c6c01c904c7d9ff056ae23da865a000)
如果你使用的也是Ubuntu，那么安装Git非常方便，只要

> $ sudo apt-get install git

万事大吉。

## 安装Node.js

Node.js其实我也不清楚，大家可以同理。
最好的办法是用[nvm](https://github.com/creationix/nvm)安装Node.js.
先安装nvm
cURL:

> $ curl [http://raw.github.com/creationix/nvm/master/install.sh](http://raw.github.com/creationix/nvm/master/install.sh) | sh

Wget:

> $ wget -qO- [https://raw.github.com/creationix/nvm/master/install.sh](https://raw.github.com/creationix/nvm/master/install.sh) | sh

nvm安装好了之后再安装Node.js

> $ nvm install 0.12

## 安装HEXO

上面的依赖都安装好了的话安装HEXO就很快了,只需要

> $ npm install -g hexo-cli

## 参考内容

[nvm的官方文档(readme.md)](https://github.com/creationix/nvm)
[node.js的官方文档](https://nodejs.org/documentation/)

# Github Page的配置

HEXO准备好之后就要把Github Page这部分搞定了。

## 注册Github

Github主页: [github.com](github.com)
注册就不多说了，大家都会。

## 配置SSH keys

为了让Github与本地的Git有安全稳定的连接，需要先配置SSHkeys。
[SSH配置官方文档](https://help.github.com/articles/generating-ssh-keys/)
或者参考[寥雪峰的Git教程](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001374385852170d9c7adf13c30429b9660d0eb689dd43a000)，里面介绍的比较详细。
这一部分比较琐碎，而且相关的文档很详细而且没什么变化，大家可以自己解决。

## 建立GitHub Pages

[Github Pages的官方文档](https://help.github.com/categories/github-pages-basics/)
Github Pages分两种，一种是个人的，建立如同username.github.io这样的个人页面或者组织页面，另一种是项目页面。我们用的是第一种页面。
首先我们要建立一个Github仓库(respository)，登录github之后在页面的右上角有个加号，点击之后选择create new respository就可以建立一个新的个人仓库了。
![](http://7xl294.com1.z0.glb.clouddn.com/2015-08-13%2013%3A33%3A47屏幕截图.png)
在Repository name中填写项目名称，形式是username.github.io。

> 注意！username一定要和Owner里的名字相同，比如我只能写Arnold-Hu.github.io，githab不支持其他的写法作为github pages.
Description中写有关项目的描述，看着写，可选项。

到这里，github pages也搞定了，可以开始进行搭建了。

# 搭建个人主页

## HEXO指令

HEXO非常的简单，只有下面几个重要的指令

> $ hexo init
> 初始化hexo项目 
> 
> $ hexo new
> 新建一篇文章
> 
> $ hexo generator
> 生成页面文件(因为hexo只是一个框架，每次有所修改必须要通过这个命令生成页面文件才行)
> 
> $ hexo clean
> 清除页面文件
> 
> $ hexo deploy
> 上传页面文件
> 
> $ hexo server
> 生成一个本地服务器

详细用法见[官方文档指令部分](https://hexo.io/docs/commands.html)

## 部署HEXO

在你的电脑中创建一个空文件夹，可以起名为“HEXO”或者“personal-web”等随你喜欢，但是之后我以“HEXO”代之这个文件夹。进入这个文件夹，然后输入

> $ git init
> 
> $ hexo init

HEXO会初始化这个文件夹，并在里面部署好搭建网站需要的文件。
HEXO已经有一个缺省的页面，你可以先看看效果
相对于老版本的HEXO，新版本要先启动本地服务器的功能

> $ npm install hexo-server –save

然后再生成页面文件并且生成本地服务器

> $ hexo generator
> 
> $ hexo server

然后打开浏览器，在地址栏输入localhost:4000就可以看到一个自带的页面了

## 更换主题

HEXO有很多的主题，选一个你喜欢的用就可以
先挑选一个主题：[zhihu:有那些好看的hexo主题？](http://www.zhihu.com/question/24422335)
然后根据相应主题的readme进行操作，我用的是[yilia的主题](https://github.com/litten/hexo-theme-yilia),那么我就以此位例子简单介绍一下。
首先进入HEXO文件夹，然后

> $ git clone [https://github.com/litten/hexo-theme-yilia.git](https://github.com/litten/hexo-theme-yilia.git) themes/yilia

然后修改HEXO文件夹的**_config.yml**，把**theme: landscape**改成**theme: yilia**
接着进行更新

> $ cd themes/yilia
> 
> $ git pull

有关yilia的配置(HEXO/themes/yilia/_config.yml)见yilia的官方文档，在issues里面有很多人提出了对yilia的疑问，大部分问题在里面可以得到解决，如果无法解决再上网查或者直接提交issue问开发者本人。在后文中我汇介绍一些比较常用的插件配置和注意事项。
完成之后我们可以在本地服务器看看效果

> $ hexo clean
> 
> $ hexo generator
> 
> $ hexo server

然后去localhost:4000查看。

## 部署到github

首先我们要先配置好HEXO文件夹（根目录）中的**_config.yml**文件。
```
deploy:
   type: git
   repository: https://github.com/username/username.github.io.git
   branch: master
```
在新的HEXO中，type改成了git而不是原来的github，里面的repository就是你在前面建立的那个github仓库，把username改成你的名字就可以了。现在就可以把生成的页面文件上传到github上了。

> $ hexo clean
> 
> $ hexo generator
> 
> $ hexo deploy

完成之后可以在地址栏输入username.github.io，就可以看到你的自己的个人网站了。

# 绑定独立域名

你可能觉得这个网站虽然看起来很不错，但是也许你会觉得这个域名比较low，像我这样的有逼格的人应该用一个有逼格的域名。那么你就需要一个独立域名了。

## 买买买！

推荐在godaddy上买域名，因为是国外的域名提供商，不像中国的域名提供商一样需要备案，方便快捷，而且现在支持支付宝，非常方便。
只要先查找好你要的域名，然后买买买就行了，我觉得没什么问题，如果实在感觉这个也搞不定，那么可以参考一下这篇文章，在我文章的时候这个教程还是合适的。
[在godaddy上买域名的详细步骤](http://www.admin5.com/article/20131014/527495.shtml)

## 设置GitHub Pages

进入HEXO/source目录，在里面新建一个名为CNAME的文件，里面只需要填写一行，就是你的域名，比如我的CNAME文件中只写了一行 migdal-bavel.in
然后提交改动

> $ hexo generator
> 
> $ hexo deploy
> 
> 注意:之后操作几乎之需要这两个命令，一个生成页面文件，一个提交给github

## 设置DNS

推荐使用DNSpod，稳定，在中国，效果好，快，免费。
先注册DNSpod，然后添加域名，把你的买来的域名输入进之后按下图进行添加记录
![](http://7xl294.com1.z0.glb.clouddn.com/dns.png)
其中A的两条记录是指向github pages的服务器，我写文章的时候ip地址是这两个，但他可能会发生更改，一旦发现你博客上不去了，就可以取[这里](https://help.github.com/articles/tips-for-configuring-an-a-record-with-your-dns-provider/)看看github pages的ip地址有没有换过。
然后www那个是你在github注册的仓库，照着我的格式写就行了，仓库换成你的。

## 去godaddy修改DNS地址

这一部分直接看[DNSpod提供的帮助](https://support.dnspod.cn/Kb/showarticle/tsid/42/)
改完DNS之后要等一段时间让全球的DNS服务器刷新。

到这里，博客就搭建完了。

# 个性化

## 填写网站信息

搭建完了博客之后那么就需要添加内容了，首先我们就要对HEXO文件夹下的**_config.yml**进行设置，只要把头部的内容填写一下就行，下面给出我的文件内容
```
# Hexo Configuration
## Docs: http://hexo.io/docs/configuration.html
## Source: https://github.com/Arnold-Hu/hexo/

# Site
title: 巴别塔
subtitle: 每天搭块砖～ 每天向上爬～
description: 学习 感悟 精炼 内化
author: Arnold-Hu
language: zh-CN
timezone: 

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/> > child/'
url: http://migdal-bavel.in
root: /
permalink: :year/:month/:day/:title/
permalink_defaults:
```
详细的见[官方文档的设置部分](https://hexo.io/docs/configuration.html)

## 写文章

建立博客干什么呢，当然是写文章拉～
在HEXO框架中写文章非常简单，只需要

> $ hexo n “文章标题”

就行了，文章标题是你文章的标题，不要忘记双引号，不然会对你标题里的空格和一些特殊符号错误的识别。
通过这个指令会在 HEXO/source/_post中生成一个**文章标题.md**文件，你可以打开这个文件写文章或者以后想改文章也可以来这里改，不过记得要generator并且deploy.
自动生成的文章都有一个头，类似于这样
```
title: 利用github page以及hexo模板建立个人独立博客
date: 2015-08-13 12:35:17
tags:
---
```
基本上不用改，只要添加几个tags就行了。
tips：你写出的文章会全部显示在主页上，如果不想全部显示，只显示标题和一部分内容的话，可以在那一部分内容下面插入一行代码
 `<!--more-->`

这样就可以不在首页显示后面的内容。
写文章一般采用markdown语法，非常简单，而且写出来很好看很方便，5分钟学会。
[新手markdown指南](http://www.jianshu.com/p/q81RER)

## 增加多说评论

yilia作为一个华人开发的主题对多说的支持非常友好。
首先在多说先注册一个账户
![](http://7xl294.com1.z0.glb.clouddn.com/多说.png)
如图，这是我的相应信息.
只需要把 HEXO/theme/yilia/_config.yml中的duoshuo:设置为
`duoshuo: shortname`

其中的shortname是图片中域名项除去.duoshuo.com的那部分，比如说我的就是migdal-bavel
然后就ok了。

## 图床

markdown语法中图片是通过链接使用的，可以把图片放在本地文件中，也可以把图片放在网上。放在网上的话，推荐使用[七牛](http://www.qiniu.com/)，非常的快而且方便。

## 404界面

[github上对404界面的指引](https://help.github.com/articles/custom-404-pages/)
当然，如果你想作一个比较简单的404界面，直接在HEXO/source下新建一个404.md就行了。
比如[我的404界面](http://migdal-bavel.in/nothing)
**注意：在HEXO中每次用deploy上传都会覆盖掉原来在github上的文件，所以当你想在框架之外额外加入页面的话，必须把页面放在HEXO/source文件夹中，不然都会被覆盖掉。**
**并且，这里面的所有文件都会都会被hexo框架解析并且更改，如果不想让页面采用hexo的格式，那么就必须在文件最开始加入**
```
layout: false
---
```
**以表示不采用hexo框架的模板。**
之后加入自己的页面或者readme.md文件或者加入谷歌百度的验证页面都要注意这些。

## 加载sitemap和rss

**首先要回到根目录HEXO/**
然后安装

> $ npm install hexo-generator-feed
> 
> $ npm install hexo-generator-sitemap

再编辑HEXO/_config.yml，在其中的plugins里加入下面的代码
```
plugins:
- hexo-generator-feed
- hexo-generator-sitemap
```
## yilia的一些格式问题

yilia中的subnav如下类似设置，**不要用短域名**
```
subnav:
  github: "https://github.com/Arnold-Hu"
 #weibo: "http://weibo.com/2112831602"
  rss: "atom.xml"
  zhihu: "http://www.zhihu.com/people/hu-cheng-cheng-66"
  #douban: "#"
  mail: "mailto:hbc0204@foxmail.com"
  #facebook: "#"
  #google: "#"
  #twitter: "#"
  #linkedin: "#"
  ```
  前面加了#号的项在主页左下角不会出现，并且把rss设置为rss:”atom.xml”就行了。

# 大功告成！
