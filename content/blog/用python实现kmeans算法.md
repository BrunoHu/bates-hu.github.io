---
title: 用python实现kmeans算法
date: 2015-09-20 02:30:57
toc: true
tags:
- python
- 数据挖掘
- 聚类
- 算法
---

最近准备找些东西练练手，就想着实现一下一些数据处理方面的算法，一方面是可以更深刻的理解算法，二也能锻炼一下编程水平。这一次编写kmeans算法的时候就出现了很多很神奇的bug，有一些还是python这种弱类型语言所特有的，很这么人也很有意思。

# K-means算法介绍
K-means算法是一种非常常用也很有效的聚类算法。这个算法能够把一个数据集以一个定义好的距离为度量划分成k个子集，而且其实简单，所以地一个用来练手。

具体的内容见[百度百科的k-means](http://baike.baidu.com/link?url=hFqIy4gnmEDas7Qg6ENbKhUPmU-cpe-RxMZdYgg4M6L6jvRoALZXaWZtwnf3uKDXKFDxSwJD5laYVMMgEcGuQK)。

# k-means算法流程
1. 选取k个初始点作为中心点，一般是在数据集中最忌选择k个。
2. 计算数据集中所有点到中心点的距离，并选择距离最短的那个中心点，这样就把所有的点分成了k个子集。
3. 在这k个子集中选出每个自己的中点作为新的中心点。
4. 然后再迭代进行步骤2,直到这k个中心点不发生变化。这样就得到了k个中心点和k个类。

# k-means算法的实现
下面给出k-means算法的主干部分，这个算法的[代码文件](https://github.com/Arnold-Hu/garage/blob/master/kmeans.py)在我的github的garage中。
目前功能非常简单，只能实现点集以欧式距离为度量聚类。
```
def kmeans(dataset, k=2, demension=2):
    # 初始化，dataset是要分类的数据集，demension是维度
    empty_set = []   #制造一个[[],[],...,[]]来方便其他列表的初始化
    for i in range(k):
        empty_set.append([])
    centers = []     #centers数组存放中心点
    residation = [10]*k    #residation数组存放两次中心点向量之差
    temp = [0] * k    #temp数组存放到每个中心点的距离
    for i in range(k):  #把数据集的前k个点作为初始中心点
        centers.append(dataset[i])
    # 开始正式迭代
    while(sum(residation)>0.0001):
        divide_set = copy.deepcopy(empty_set) #初始化子集列表
        for i in dataset: #遍历数据集的所有数据
            for j in range(k): #计算到每个中心点的距离
                temp[j] = distance(i, centers[j], demension)
            for j in range(k): #划分到所属的子类中
                if temp[j] == min(temp):
                    divide_set[j].append(i)
        for j in range(k): #得到新的中心点和新旧中心点之间的差
            residation[j] = distance(get_center(divide_set[j]), centers[j])
            centers[j] = copy.deepcopy(get_center(divide_set[j]))
    #算法完成，返回中心点和划分出的子类
    return [centers,divide_set]
 ```
算法的实现方法都在注释里说明了，剩下的辅助函数如下
* 计算子类的中心点
```
def get_center(dataset):
    dem = len(dataset[0])
    point = [0.0] * dem
    for i in dataset:
        for j in range(dem):
            point[j] += i[j]
    for j in range(dem):
        point[j] = point[j] / len(dataset)
    return tuple(point)
```
* 计算两个点之间的距离
```
def distance(point1, point2, demension=2):
    sum = 0
    for i in range(demension):
        sum = sum + (point1[i] - point2[i])*(point1[i] - point2[i])
    return sum
```
说了这个算法很简单。。。

# k-means效果
同样在github/garage中有一个测试这个算法的的测试文件[test_kmeans.py](https://github.com/Arnold-Hu/garage/blob/master/test_kmeans.py)，没有按照单元测试的写法那么严格，主要是为了作出效果图顺便练练做图。
效果图如下：
![](http://q60sj4uk2.bkt.clouddn.com/test_kmeans.png)

# 有关的bug
* 列表中的列表的复制

> python中的list变量是一个指针，如果单纯用a=b之恩那个让a和b同时指向一个list。

列表的内容复制有几种方法，比如`a=b[:]`,`a=copy.copy(b)`,其中使用copy需要加载copy模块`import copy`。但是这两种方法只能复制简单列表，即列表的元素只能是基本元素，而不能是类似列表这种元素，举个例子：
```
a=[1,2,[3,4]]
b=a[:]
a[2].append(5)
print b
```
结果输出是`[1,2,[3,4,5]]`
而要真正的复制所有内容，就需要用深拷贝。
`a=copy.deepcopy(b)`
这样能够迭代这把所有b中的元素拷贝到a中并且不会互相干涉。

* [ [ ] ]*k

在算法中我用的是
```
empty_set = []
    for i in range(k):
        empty_set.append([])
```
来制造一个空的list of list.

其实在一开始我用的是
`empty_set = [[]]*k`

虽然看起来很简便，但是之后我发现程序有个很逗逼的bug，就是无论我往emptyset里面的那个子listappend元素，里面每个子列表都会添加同一个元素。花了很久的时间我才发现这个问题。其实这个问题和上面那个差不多，只不过更加隐蔽。这也和python很灵活有很大关系，同时提醒自己要更深入的了解原理减少再出现这种难以发现的bug的机会。

虽然直接用乘法隐藏着隐患，但是用来初始化一些基本的元素里表还是很有用的，比如[0]*10就能够直接初始化一个长度为10元素值均为0的列表。



