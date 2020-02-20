---
title: python和数据库的接口简介
date: 2016-01-30 11:02:12
toc: true
tags:
- python
- 数据库
- code
---
刚好最近在自学数据库，就特地写出来数据库和python连接的接口出来权当复习。现在比较流行的数据库一个是关系型数据库**MySQL**以及非关系型数据库，另外一个就是所谓的noSQL类型的文档数据库**Mongodb**。这两个都是这两方面开源软件的佼佼者，社区丰富资源多。我是不会告诉你们我只看了这俩的。

### python-MySQL接口
首先，要安装这个接口。
> `$sudo pip install python-mysql`

然后，介绍一个典型的接口实现。
```
import MySQLdb
conn = MySQLdb.connect(
            db = 'dbname',
            user = 'root',
            passwd = 'your-password',
            host = 'localhost',
            charset = 'utf8',
            use_unicode = True)
cursor = conn.cursor()
cursor.execute("truncate table xiaomihr;")
conn.commit()
cursor.execute("""INSERT INTO xiaomihr(item_id, work, worktype, location, hr_way)
                        VALUES (%s, %s, %s, %s, %s)""",
                        (
                            item['item_id'],
                            item['work'][0],
                            item['worktype'][0],
                            item['location'][0],
                            item['hr_way'][0]
                        )
        )
conn.commit()
```
这个程序是摘取自一个爬虫程序最后吧数据存入数据库的阶段。总的来说，这个接口就是这么几个东西：
1. 建立到数据库的连接。`conn = MySQLdb.connect(...)`
2. 获取数据库的游标。 `cursor = conn.cursor()`
3. 给出指令。 `cursor.exxcute("truncate table xiaomihr;")`,双引号括住的是要执行的SQL语句，这个SQL语句就属于另外一个方面了，这个语句的意思是把`xiaomihr`这个表清空。另外一个语句则是典型的插入数据到数据库的语句`cursor.execute("""INSERT INTO xiaomihr(...))`,把相应的值插入对应的字段中。
4. 提交到数据库。 `conn.commit()`,我觉得接触过ORM的人应该了解这个，就是把指令提交，通过连接传输到数据库执行，所有的操作后面一定要加这个，不然不会执行。

这就是一个python-MySQL接口的典型实现。

###  python-Mongodb接口
同样，第一步安装pymongo
> `$sudo pip install pymongo`

第二步也是介绍一个典型实现。
```
from pymongo import MongoClient

client = MongoClient('localhost',27017)
db = client['xiaomihr']
collection = db['hr_imfomation']
collection.remove()

data = {
'item_id' : item['item_id'],
'work' : item['work'][0],
'worktype' : item['worktype'][0],
'location' : item['location'][0],
'hr_way' : item['hr_way'][0]}
collection.insert(data)
```
这个是同样上面那个程序在Mongodb接口下是实现。
1. 建立连接 `client = MongoClient()`
2. 选取数据库 `db = cliet['xiaomihr']`,xiaomihr是数据库的名字。
3. 选取集合 `collection = db['hr_imfomation']`,hr_imformation是集合的名字（类似于MySQL里的表）。
4. 然后就几乎和mongodb本身的操作一样，不需要和MySQL接口一样把指令包装成字符串再处理，pymongo直接就和在mongodb里操作一样，清空数据库就是`collection.remove()`，典型的插入数据就是`collection.insert(data)`。

> 值得注意的是，在pymongo的早期版本中和现在网上的教程中，有很多给出的实现是这样的
>
```
connection = pymongo.Connection('localhost',27017)
db = connection.test_database
collection = db.test_collection
```
> 这个在最新的版本中已经用不了了，官方给出的最佳实现是上面那个。

