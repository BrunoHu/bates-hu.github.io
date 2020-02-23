---
title: logistic分类器
date: 2016-06-17 16:26:47
tags:
- math
- machine learning
- algorithm
---

###  准备
现在我们来到了分类器，首先我们考虑一个最简单的二元分类器，抽象成只判断对错。那么，换句话说我们希望我们得到的结果是离散的，但是我们前面的函数都是线性的，显然不能很好的处理这一类问题，所以，我们得新引进一个函数来把连续的结果处理成离散的效果，轮到logistic函数（又称sigmoid函数）登场了

$$g(x)=\frac{1}{1+e^{-x}}$$

图像如下，很明显可以看出越靠近零点斜率变化越大，函数在0点附近急剧的变化到0和1，这正是两个非常适于数学处理的离散值。
![logistic_1.png](https://raw.githubusercontent.com/bates-hu/Images/master/blog/logistic_1.png)

而基于线性回归，我们可以用一条线（或者说是超平面）来分割点集来得到分类的效果，那么我们可以通过刚才介绍的logistic函数来的到离散化的反馈结果来进行优化。那么我们的预测函数$h_\theta (x)$如下

$$h_\theta (x)=g(\theta^T x) = \frac{1}{1+e^{-\theta^T x}}$$

那我们怎么来对$\theta$进行迭代优化呢？线性回归可以通过极大似然估计，这个自然也是ok的，那么，我们也来估计一下。

### 概率意义
根据$h_\theta (x)$的意义，我们能够得到下面的等式
$$P(y=1|x;\theta)=h_\theta(x)$$
$$P(y=0|x;\theta)=1-h_\theta(x)$$
那么，综合一下得到一个适合数学分析的等式
$$P(y|x;\theta) = h_\theta(x)^y (1-h(x))^{1-y}$$

同样，我们求极大似然估计
$$L(\theta) = \prod_{i=1}^m h_\theta (x^{(i)})^{y^{(i)}} (1-h(x^{(i)}))^{1-y^{(i)}}$$
$$l(\theta) = log(L(\theta)) = \sum_{i=1}^m y^{(i)}log(h_\theta(x^{(i)})) + (1-y^{(i)})log(1-h_\theta(x^{(i)}))$$

我们要使$l(\theta)$最大，那么自然而然我们可以用到梯度上升法，那么，每次的迭代就是这样

$$\theta := \theta + \alpha \nabla_\theta l(\theta)$$

现在的问题就是怎么求$l(\theta)$关于$\theta$的梯度

首先，我们先求
$$
\begin{aligned}
\frac{\partial h_\theta (x^{(i)})}{\partial \theta_j} &= -(\frac{1}{1+e^{-\theta^T x^{(i)}}})^2 \bullet e^{-\theta^T x^{(i)}} \bullet (-x_j^{(i)}) \\
&= \frac{1}{1+e^{-\theta^T x^{(i)}}} \bullet \frac{e^{-\theta^T x^{(i)}}}{1+e^{-\theta^T x^{(i)}}} \bullet x_j^{(i)} \\
&= h_\theta (x^{(i)})(1-h_\theta (x^{(i)})) x_j^{(i)} \\
\end{aligned}
$$

那么，我们带入可以求得
$$
\begin{aligned}
& \frac{\partial}{\partial \theta_j} \sum_{i=1}^m y^{(i)}logh_\theta(x^{(i)}) + (1-y^{(i)})log(1- h_\theta(x^{(i)})) \\
&= \sum_{i=1}^m \frac{1}{h_\theta (x^{(i)})} \bullet \frac{\partial h_\theta (x^{(i)})}{\partial \theta_j} +
(1-y^{(i)}) \bullet \frac{1}{1-h_\theta (x^{(i)})} \bullet \frac{\partial (1-h_\theta (x^{(i)}))}{\partial \theta_j} \\
&= \sum_{i=1}^m y^{(i)}(1-h_\theta(x^{(i)}))x_j^{(i)} - (1-y^{(i)})h_\theta(x^{(i)})x_j^{(i)} \\
&= \sum_{i=1}^m (y^{(i)} - h_\theta(x^{(i)}))x_j^{(i)}
\end{aligned}
$$

### 结果

最终我们得到了$\theta$迭代式
$$\theta_j := \theta_j - \alpha \sum_{i=1}^m \left[ h_\theta (x^{(i)}) - y^{(i)}\right] x_j^{(i)}$$

自然，我们也可以和线性回归的方法一样用随机梯度法

$$ \theta_j := \theta_j - \alpha \left[h_\theta (x^{(i)}) - y^{(i)} \right] x_j^{(i)}$$


### 有图有真相
左上图是不停迭代的分类器，右上是原始的分类数据，下方是每次生成的分类器的误差，数据经过了规整。

突然发现两类数据有超平面可以完全分开的时候，$\alpha$取多少都无所谓，原因不明，待思考~
$$\alpha = 1$$
![logistic_2.png](https://raw.githubusercontent.com/bates-hu/Images/master/blog/logistic_2.png)
$$\alpha = 20$$
![logistic_3.png](https://raw.githubusercontent.com/bates-hu/Images/master/blog/logistic_3.png)
$$\alpha = 100$$
![logistic_4.png](https://raw.githubusercontent.com/bates-hu/Images/master/blog/logistic_4.png)

但是当不能完全分开的时候，取得alpha过大的话会在极值处徘徊无法收敛~

$\alpha=1,\alpha=10$的时候效果还不错，都能收敛
$$\alpha = 1$$
![logistic_5.png](https://raw.githubusercontent.com/bates-hu/Images/master/blog/logistic_5.png)
$$\alpha = 10$$
![logistic_10.png](https://raw.githubusercontent.com/bates-hu/Images/master/blog/logistic_10.png)
$\alpha=100$的时候就已经无法收敛了
$$\alpha=100$$
![logistic_7.png](https://raw.githubusercontent.com/bates-hu/Images/master/blog/logistic_7.png)

还送上一个彩蛋，$\alpha=1$,迭代10000次的情况，最后误差反而上升了！
![logistic_8.png](https://raw.githubusercontent.com/bates-hu/Images/master/blog/logistic_8.png)








