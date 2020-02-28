---
title: gatsby建站详细教程及避坑攻略
date: 2020-02-27 16:02:35
tags: [教程,react,gatsby]
---

这篇文章算是对这段时间折腾的一个东西的技术总结，在之前文章[博客迁移](http://hubingcheng.com/blog/博客迁移)中，我已经总结了项目的背景，技术选型等形而上的内容，这篇文章主要是技术总结，并且帮助大家能从我的视角了解gatsby，并且快速的上手实践。

## Gatsby是什么，为什么要用Gatsby
Gatsby实际上是是一个react的静态化框架。React本身实际上能完成所有gatsby的功能。但是有一个问题就是，react是一个单页应用（SPA - single page application）,本身实际上是在前端动态的生成页面。这样就会有两个问题，一个是首屏加载时间很长。第二个因为页面是动态生成，所以搜索引擎不知道每个页面的内容，对SEO很不友好。对于这些问题，react的服务端渲染框架（SSR - server side render）应运而生。而SSR本身也有很多不同的实现方案，有些是直接搭一个渲染服务器多一个中间层，而有一些就比较极端，比如gatsby，直接在编译的时候就把整个网站静态化。这样上面的问题就迎刃而解了。

## gatsby如何工作

react吸引人的特点之一就是她的动态特性，如果在编译的时候就把整个网站静态化，那么这些动态的特性该如何保证呢？Gatsby给出的方案就是程序化生成页面。具体的说，gatsby的页面生成有两种方式，一个是直接把react组件写在`/src/pages`目录下，比如`/src/pages/tags.js`对应的页面就是`/tags`。第二种就是通过gatsby的api动态的构建页面了，官方的说明文档在[这里](https://www.gatsbyjs.cn/tutorial/part-seven/).简而言之就是
1. 创建页面模板
2. 通过graphQL获取用于生成页面的数据
3. 在gatsby-node.js中通过`createPage`和`onCreateNode`两个API生成页面

## 实战

实战部分手把手教你创建一个和我一样的博客

## 创建项目

首先你需要安装gatsby及其依赖

然后通过博客模板创建项目

`$ gatsby new my-blog-starter https://github.com/gatsbyjs/gatsby-starter-blog`

然后

`$ cd my-blog-stater && npm start`
就可以打开浏览器输入`localhost:8000`看到主页了

![20200227175924.png](https://bates-hu-blog-1256120017.cos.ap-shanghai.myqcloud.com/undefined20200227175924.png)

## 增加tags相关页面
如果你想像我的[主页](http://hubingcheng.com)一样拥有[tags页面](http://hubingcheng.com/tags)的话。可以通过以下操作

#### 增加tag标签
要增加tags界面，首先得有tags。要做的很简单，就是在你的markdown文章中增加tags标签如图
![20200227191105.png](https://bates-hu-blog-1256120017.cos.ap-shanghai.myqcloud.com/undefined20200227191105.png)
![20200227191128.png](https://bates-hu-blog-1256120017.cos.ap-shanghai.myqcloud.com/undefined20200227191128.png)
文章在`/content/blog/{title}`这个路径中

#### 生成网页
tags相关的页面有两个，一个是`/tags`,另一个是`/tag/{tag}`，前一个用于展示所有的tag，其中点击任意一个tag就是跳转到对应tag的文章列表，也就是后面的页面。

因为`/tags`依赖`/tag/{tag}`，所以我们首先我们生成`/tag/{tag}`,根据前面介绍gatsby如何工作

首先我们需要创建一个页面模板`/src/templates/tag-posts.js`
```
import React from "react"
import { graphql, Link } from "gatsby"

const TagPost = ({data, pageContext}) => {
  const posts = data.allMarkdownRemark.edges

  return (
    
      <div>
      <h1>Posts for tag: {pageContext.targetTag}</h1>
      <p>{posts.length + " posts"}</p>
      <hr />
      <ul>
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <li><Link to={node.fields.slug}>{title}</Link></li> 
        )
      })}
      </ul>
      </div>

      
  )
}

export default TagPost

export const pageQuery = graphql`
  query($targetTag: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: {frontmatter: {tags: {eq: $targetTag}}}, sort: {fields: frontmatter___date, order: DESC}) {
      edges {
        node {
          excerpt(truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`

```
然后按照第二部，在`gatsby-node.js`中生成页面，添加如下代码
```
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  /*
  此处省略生成blog-post的代码
  */

  // start generate tag posts
  const tagPost = path.resolve(`./src/templates/tag-posts.js`)
  const tagPostResult = await graphql(
    `
    {
      allMarkdownRemark {
        nodes {
          frontmatter {
            tags
          }
        }
      }
    }
    `
  )

  if (tagPostResult.errors) {
    throw tagPostResult.errors
  }

  const nodes = tagPostResult.data.allMarkdownRemark.nodes

  //extract distict tags of all posts
  var tagSet = new Set()
  nodes.forEach(node => node.frontmatter.tags.forEach(tag => tagSet.add(tag)))

  // gen page for each tag
  tagSet.forEach( tag => createPage({
    path: "tag/" + tag,
    component: tagPost,
    context: {
      targetTag : tag
    },
  }))

}
```
之后你重新`npm start`,然后输入网址`http://localhost:8000/tag/tag2`，你就能看到下面的页面
![20200227191308.png](https://bates-hu-blog-1256120017.cos.ap-shanghai.myqcloud.com/undefined20200227191308.png)

现在我们要生成`/tags`的页面，这个不是一个动态路径，所以我们在`/src/pages`添加一个js文件就可以了`/src/pages/tags.js`，里面的代码如下
```
import React from "react"
import { Link, graphql } from "gatsby"


const Tags = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
  var tagMap = new Map()


  for (const post of posts) {
    for (const tag of post.node.frontmatter.tags) {
      if (tagMap.has(tag)) {
        tagMap.set(tag, tagMap.get(tag) + 1)
      } else {
        tagMap.set(tag, 1)
      }
    }
  }
  var tagPair = Array.from(tagMap)
  tagPair.sort((left, right) => right[1] - left[1])

  console.log(tagPair)

  return (
    <div>
      <h1>All Tags</h1>
      <p>Click the tag to read related articles</p>
      <hr />
      <ul>
        {tagPair.map(([tag, count]) => {
          return (
                <li><Link to={"tag/" + tag} className="tag">{tag + " | " + count + " posts"}</Link></li>
          )
        })}
      </ul>
    </div>
  )
}

export default Tags

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`

```
然后再浏览器输入`http://localhost:8000/tags`，就可以看到下面的页面
![20200227195057.png](https://bates-hu-blog-1256120017.cos.ap-shanghai.myqcloud.com/undefined20200227195057.png)

这两类页面就覆盖了两种页面的生成方式，其他的页面就靠大伙举一反三了

## 优化

#### 增加css效果
刚才生成的页面中，都是光秃秃的文字，为了页面更美观，需要加上css效果使其更美观，博客本身的css框架我并不是很喜欢，所以我换了一个我比较喜欢另一个轻便的css框架[BULMA](http://bulma.io)

这个框架的特点就是简单轻巧，只有css，没有js，不容易和其他的组件产生冲突。而且非常的易用。

官方有介绍如何接入的[文档](https://www.gatsbyjs.cn/docs/bulma/#using-bulma)

具体如何使用，或者想直接抄作业可以直接看我的[源码](https://github.com/bates-hu/bates-hu.github.io/tree/source)

#### 组件化
组件就是很多页面需要公用的模块就会抽象成组件，这样会使代码变得优雅易懂。

比如每个页面都要页眉页脚，这些就可以抽象出Layout组件。每个页面又要不同的元信息做SEO，这就抽象出了SEO组件。比如我觉得展示文章需要用统一的卡片样式，我自己就抽象出了PostCard组件。还有每个页面可能都需要的Comment组件。

因为gatsby本身就是从react扩展出来的框架，自然也可以使用组件来优雅的开发界面。组件所在的路径是`/src/components/`。里面已经有了`Layout`和`SEO`等组件。相关的语法需要查阅一下react的文档。依葫芦画瓢写还是比较简单的。

具体的怎么写可以直接看我的[源码](https://github.com/bates-hu/bates-hu.github.io/tree/source)

#### 第三方评论
之前我的hexo博客用的是国内的多说，但是多说已经不运营了。但是我又不想自己额外维护一个评论数据库。所以我调研了一圈，对比了一番发现几个可能可用的

* Disqus - 这个是世界上最大也是最成熟的，但是在中国被墙了。pass
* gitcomment - 这个是通过github issue来实现的，强制用github登录。对于非码农的评论者不友好，而且github在中国api的效率也存疑。pass
* levere(来必力) - 这个是韩国的一个第三方模块，对中国的本地化支持的很好，支持简单回复和包括微信在内的各种第三方账号登录。看他的客户也不像会倒的样子，所以就用他了。

levere有个问题就是在移动端打开的时候无法微信登录，这个我咨询了他们的客服，他们回复这个就是这样，因为微信得扫码，所以无法移动端登录。无解。而且在集成的时候还碰到了一些坑，见下文。

#### 托管

整个网页托管到了github page上，具体怎么托管，请翻阅[文档](https://www.gatsbyjs.cn/docs/how-gatsby-works-with-github-pages/)

#### 自动化
因为gatsby出色的架构，整个网站现在只需要增加markdown文章，其他的任何内容都不需要更改就会自动的构建并发布新网站。但是我简直懒到了家，为了实现hexo一样，只要hexo new就可以写新文章的便捷，我写了一个脚本[\gen-new-post.js](https://github.com/bates-hu/bates-hu.github.io/blob/source/gen-new-post.js)，然后再`/package.json`的`script`中增加一条命令
```
"new": "node gen-new-post.js $*",
```
这样，我们就可以用`npm run new {newtitle}`自动生成markdown文件啦。

## 踩坑

#### graphQL相关
你的每个md文件都要加上`tags:[]`, 不然graphQL读出来的话这个属性就是null而不会是空的array，那样的话`tags.foreach` 和 `tags.map()`就会报错。

#### Link 和 a，两种不同的跳转
官方介绍说`Link`是用来跳转到应用内的页面的，而`a`则是用来跳转到外链的。但是这样其实是有一个问题，一开始我的评论模块时通过`helmet`模块把第三方评论的脚本写到每个post的页面的header里面。第一次点击文章没有问题，但是从一篇文章通过点击下一篇文章的链接跳转的时候，评论模块就消失了。在网上查了一下，里面有一个解决方案是吧Link改成a。确实有效。但是我进一步探究了一下为什么。

查了很多资料后我知道了原因，gatsby的Link实际上和react的Route类似，会做优化做预加载，加快跳转速度。通过Link跳转的话，其实用的是react特有的diff渲染，这种渲染只会渲染两个页面不同的部分。因为两篇post的header部分几乎完全相同，所以在渲染的时候评论模块的script是不会重新生成的，而评论模块时script脚本动态生成的，所以就消失了。

使用a的话，会强制整个页面进行更新，这个自然是可行的，但是就没有了预加载的优势。页面的跳转就不会快如闪电，不够优雅。

其实这个可以通过一个优雅的方式解决。就是react的`hook`。在Comment组件中增加一个hook - useEffect。
```
const Comment = () => {
    useEffect(() => {
        var j, e = document.getElementsByTagName("script")[0];

       if (typeof LivereTower === 'function') { return; }

       j = document.createElement("script");
       j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
       j.async = true;

       e.parentNode.insertBefore(j, e);
    });
  return (
    <div id="lv-container" data-id="city" data-uid="xxxxx">
    </div>
  )
}
```
`useEffect` 的作用是每次在组件加载和更新的时候，会调用一次这个方法。而comment组件又是嵌在tag-post中的，所以每次切换文章，tag-post肯定需要重新加载，所以comment也需要重新加载，而useEffect就会动态的插入一个script，这个新插入的script就会动态生成一个第三方评论框，问题解决。








