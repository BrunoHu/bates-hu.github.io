---
title: 基于scrapy的爬虫的快速上手教程----以内推网为例
date: 2015-08-22 01:21:16
toc: true
tags:
- python
- scrapy
- 教程
- 数据
- 爬虫
---
本篇文章是一篇快速构造爬虫的教程。目的是尽量在最短的时间内构建一个能满足大部分需求的爬虫。目标人群是想通过爬虫自动一些网站上的信息以助于完成工作但是并不想深入了解爬虫的朋友。而且如果能快速的通过自己学到的东西作出成果，我相信大家会对学习保持充足的热情与兴趣。
本文的爬虫可以去我的github的[neitui_spider](https://github.com/Arnold-Hu/neitui_spider)项目上看。

# 为什么要写这个教程

现在大数据这么时髦对吧，我们也应该赶一下潮流啊，说出去也很有范对不对，别人分分钟以为你是一个Data Scientist，倍儿有面子。但是,问题来了，搞这个大数据从哪里下手呢？

*   先弄到数据，用人工，用爬虫，问朋友，派间谍，随意。
*   整理数据或者说清洗数据
> Data is dirty
> 
>         ----   by all data scientist

*   把数据存入数据库

*   分析数据 得出结论
*   可视化

上面是我草率的步骤分类，每一个方面都有很多值得研究。
你看，最上游的就是得到数据，而得到数据里面最有意思的就是用爬虫了~这样写爬虫的时候顿时就有一种当产业大佬的感觉，会大大加快你的码代码效率的～

# 安装scrapy

这是[scrapy的中文安装文档](http://scrapy-chs.readthedocs.org/zh_CN/1.0/intro/install.html)，按照文档上的方法装一般是能够装好的。
然后还需要[安装ipython](http://ipython.org/install.html)来方便进行调试。
因为我的ubuntu系统已经安装过了python的环境所以只需要
`$ sudo easy_install pip`
`$ pip install scrapy`
`$ pip install ipython`
就行了。其他的系统把pip安装好可以一样很方便的安装。

# clone项目

如果你还没有安装git并且注册github的话，请先[安装git](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137396287703354d8c6c01c904c7d9ff056ae23da865a000)并且[注册github](github.com)
然后你之需要把我的项目clone一下就可以了
`$ git clone https://github.com/Arnold-Hu/neitui_spider.git`
这就会在目录下生成一个[内推网](www.neitui.me)的爬虫项目，然后我再通过这个项目介绍一些写爬虫最关键的部分。

# 爬虫的配置

## item.py文件

item.py文件的位置在neitui_spider/neituiwang/neituiwang/item.py的位置。
item.py文件的主要作用就是告诉scrapy框架你要爬的内容。
比如在我的item.py中，部分内容是这样的。
```
import scrapy

class NeituiwangItem(scrapy.Item):
    page_id = scrapy.Field()
    person = scrapy.Field()
    date = scrapy.Field()
    work = scrapy.Field()
    salary = scrapy.Field()
    experience = scrapy.Field()
    company = scrapy.Field()
    address = scrapy.Field()
    tag = scrapy.Field()
    # requirement = scrapy.Field()
    name = scrapy.Field()
    company_link = scrapy.Field()
    city = scrapy.Field()
    homepage = scrapy.Field()
    company_size = scrapy.Field()
    company_field = scrapy.Field()
    company_finance = scrapy.Field()
    company_hope = scrapy.Field()
```
我在内推网中想要爬的就是页面id、发布人、发布时间、招聘职位、薪水等内容。其中requirement被我注释掉了，因为职位需求内容比较多，得到的数据不好分析，需要的话可以去掉注释。
你如果有什么想爬的内容，都需要先在item.py文件中”备案“。格式是
`content = scrapy.Field()`

## 锁定目标网页

除了item.py之外剩下的配置都在neitui_spider/neituiwang/neituiwang/spiders/neituiwangspider.py中。
我们来看锁定目标网页的部分
```
name = "neituiwang"
    allowed_domains = ["neitui.me"]
    start_urls = ["http://www.neitui.me/neitui/type=all.html"]

    rules = [
        Rule(LinkExtractor(allow=('\?name=job&handle=detail&id=\d{6}&from=index')), follow=False, callback='parse_item'),
        Rule(LinkExtractor(allow=('/neitui/type=all&page=\d+\.html',)), follow=True)
    ]
```
*   **name**是你的爬虫的名字，启动爬虫的时候输入的就是这个。
*   **allowed_domains**是限定的域名，让你的爬虫只能在这个域名中工作，比如这个爬虫就只能在内推网中工作，如果爬取到了指向其他网页比如招聘公司的主页则不会跟进。
> 注意，限制域名中不要在前面加www之类的二级域名前缀。

*   **start_urls**则是你的爬虫开始的网页，怎么方便怎么来，前提是要在allowed_domain中。比如在内推网中，可以在最新职位那个页面比较方便的解析得到所有的招聘职位信息，那么我就用这个网址。
如果你要找的网址比较分散，可以加入多个start_url，比如
`start_url = ["www.baidu.com", "www.google.com", "migdal-bavel.in"]`
其实在allowed_domain中同样，加入多个限制域名后只要满足其中一个都进行跟进解析。

*   **rules**告诉框架如何选择那些网址需要跟进，哪些网址需要解析，具体的见[官方文档](http://scrapy-chs.readthedocs.org/zh_CN/1.0/topics/spiders.html#crawling-rules)。
scrapy会把所在的页面的所有链接都识别出来然后再根据这些rules进行操作。
最常用rules的就是上面两种

1.  rule1 ——`Rule(LinkExtractor(allow=('\?name=job&handle=detail&id=\d{6}&from=index';)), follow=False, callback='parse_item')`
负责解析页面，其中

    *   `LinkExtractor(allow=('\?name=job&handle=detail&id=\d{6}&from=index))`表示把满足allow中的正则表达式的网页提取出来。这个正则表达式中`\d{6}`表示匹配任意6个数字，其他则是原本的意思，比如这个表达式会匹配网址为`http://www.neitui.me/?name=job&handle=detail&id=404937&from=index`这样的页面。
    *   `follow = false` 表示对提取出来的网页不跟进，也就是不再对提取出来的网页中的链接通过rules进行处理，换句话说，爬虫在这里到头了。
    *   `callback = 'parse_item'` 表示把解析出来的网页传回给 parse_item 函数进行处理，也就是要在这个页面提取我们要的信息。

2.  rule2 ——`Rule(LinkExtractor(allow=('/neitui/type=all&page=\d+\.html',)), follow=True)`
负责跟进页面，其中

    *   `LinkExtractor(allow=('/neitui/type=all&page=\d+.html',))`  和上面那个一样，同样是正则表达式来过滤链接。其中`\d+`指的是贪心匹配至少一个数字，`\.`表示匹配’.’。例子：`http://www.neitui.me/neitui/type=all&page=1.html`。
    *   `follow=True` 表示会过滤提取出来的网页中的所有链接再次通过rules解析，换句话说，爬虫还会继续往下走。
而这里因为没有我们需要的信息，所以我们没有用callback参数，如果你需要在这个页面中提取一些信息的话，可以再加上这个。比如如果你在下面还有一个解析页面的parse_page函数的话，可以再加上`callback = 'parse_page'`。

## 提取信息

我们来看看提取信息的部分
```
def parse_item(self, response):
        base = response.xpath('//div[@class="cont"]')
        company_part = response.xpath('//div[@class="plate company_information"]')
        item = NeituiwangItem()
        item['page_id'] = response.xpath('//div[@class="handlerbar clearfix"]/a[1]/@href').re('\d{6}')
        item['person'] = base.xpath('div[1]/a[1]/text()').extract()  
        item['date'] = base.xpath('div[1]/text()').re('\d{2}.\d{2}.')
        item['work'] = base.xpath('div[2]/strong/text()').extract()
        item['salary'] = base.xpath('div[2]/span[1]/text()').extract()
        item['experience'] = base.xpath('div[2]/span[2]/text()').extract()
        item['company'] = base.xpath('div[3]/span[1]/text()').extract()
        item['address'] = base.xpath('div[3]/span[2]/text()').extract()
        item['tag'] = base.xpath('div[4]//ul/li/span[1]/text()').extract()
        # item['requirement'] = base.xpath('div[6]/text()').extract()
        item['name'] = company_part.xpath('div[1]/div[2]/a/text()').extract()
        item['company_link'] = "www.neitui.me" + company_part.xpath('div[1]/div[2]/a/@href').extract()[0]
        item['city'] = company_part.xpath('dl[1]/dd[1]/text()').extract()
        item['homepage'] = company_part.xpath('dl[1]/dd[2]/a/@href').extract()
        item['company_size'] = company_part.xpath('dl[2]/dd[1]/text()').extract()    
        item['company_field'] = company_part.xpath('dl[2]/dd[2]/text()').extract()
        item['company_finance'] = company_part.xpath('dl[2]/dd[3]/text()').extract()
        item['company_hope'] = company_part.xpath('dl[3]/dd/text()').extract()
        yield item
```
在这里，我们就需要把一个个在item.py那里挖的坑填进去了。
因为我们之需要对一种页面进行解析，所以我们只写了一种解析函数．在解析函数中，我们通过**选择器**来提取我们需要的信息，而使用选择器最关键的就是要会用Xpath和正则表达式．
简而言之，Xpath是通过html中的标签进行对信息的过滤。**这个一定要自己学会才能熟练的使用爬虫**。
[Xpath教程](http://www.w3school.com.cn/xpath/)
[简介scrapy中的提取方法](http://scrapy-chs.readthedocs.org/zh_CN/1.0/intro/tutorial.html#id5)
[选择器的正式文档](http://scrapy-chs.readthedocs.org/zh_CN/1.0/topics/selectors.html)
光是看这个教程肯定很枯燥，但是因为我们已经安装过了ipython，所以我们可以交互式的来验证我们所学的内容，我们需要打开scrapy shell
`scrapy shell url`
其中url是你需要解析的网站，比如我们想解析内推网第一页的招聘信息只需要
`scrapy shell "http://www.neitui.me/neitui/type=all&page=1.html"`

> 注意！url要加引号，不然url中的一些符号会错误解析。

然后我们就可以愉快的玩耍了，我相信平时使用Matlab和R的同学会很喜欢这种界面的。
举一个例子
```
base = response.xpath('//div[@class="cont"]')
item['person'] = base.xpath('div[1]/a[1]/text()').extract()
item['date'] = base.xpath('div[1]/text()').re('\d{2}.\d{2}.')

```
base是作为一个通用的路径表示所有属性class=”cont”的div标签中的内容
item[‘person’] 表示在base路径下第一个div标签中的第一个a标签中的文本内容(若text()改为@href则表示是a中的href链接)
item[‘date’] 表示在base路径下地一个div标签中的文本内容中符合正则表达式的部分(\d{2}表示匹配两个数字，.表示匹配任意一个字符，和起来是为了匹配如同08月03日这种内容)

至此，爬虫就搭建完了。

## 运行爬虫

然后输入
`scrapy crawl spidername -o filename.csv`
必须在爬虫的目录里(neitui_spider/neituiwang/)运行这个命令，建议在爬虫的根目录中运行。

*   spidername是你爬虫的名字，在这里是neituiwang
*   filename是你要存放数据的文件的名字，存放数据可以有几种文件格式，比如csv，json。按照我们的目标人群，建议用csv，方便excel处理。

## 等爬虫

爬虫是需要时间爬的，我运行的时候差不多用了一个小时，爬出来了30000+条记录。可以直接在[这里](https://github.com/Arnold-Hu/neitui_spider/blob/master/neituiwang/data.csv)查看我爬出来的记录，因为过了一段时间，可能和最新的有所不同。

## 总结

爬虫的工作方法就是从一个网页开始，根据特定的规则通过一个个链接探索网页，然后提取出每个页面中我们需要的信息。
那么，从这个思路我，我们回顾一下我们要配置的那些基本内容。

*   **从一个网页开始**
我们提供start_urls来提供初始页面，通过allowed_domain给出整张网的大小。
*   **根据特定的规则探索**
我们在rules里面配置规则告诉爬虫应该怎么探索网络。
*   **提取页面**
我们通过选择器配合Xpath来告诉爬虫应该提取那些信息。
*   **我们需要的信息**
我们通过item.py里的项目告诉爬虫这些信息是什么或者说该填入那个坑里面。

# 大功告成