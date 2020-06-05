---
title: leetcode contest 191
date: 2020-06-05 00:06:58
tags: [leetcode, contest] 
---
## [1464. Maximum Product of Two Elements in an Array](https://leetcode.com/problems/maximum-product-of-two-elements-in-an-array/)
Easy

Given the array of integers nums, you will choose two different indices i and j of that array. Return the maximum value of (nums[i]-1)*(nums[j]-1).
 

Example 1:
```
Input: nums = [3,4,5,2]
Output: 12 
Explanation: If you choose the indices i=1 and j=2 (indexed from 0), you will get the maximum value, that is, (nums[1]-1)*(nums[2]-1) = (4-1)*(5-1) = 3*4 = 12. 
```
Example 2:
```
Input: nums = [1,5,4,5]
Output: 16
Explanation: Choosing the indices i=1 and j=3 (indexed from 0), you will get the maximum value of (5-1)*(5-1) = 16.
```
Example 3:
```
Input: nums = [3,7]
Output: 12
```

Constraints:
```
2 <= nums.length <= 500
1 <= nums[i] <= 10^3
```
没啥说的
```
class Solution {
    public int maxProduct(int[] nums) {
        int max = Math.max(nums[0], nums[1]);
        int max2 = Math.min(nums[0], nums[1]);
        
        for (int i = 2; i < nums.length; i++) {
            max2 = Math.max(nums[i], max2);
            if (max2 > max) {
                int temp = max;
                max = max2;
                max2 = temp;
            }
        }
        
        return (max - 1) * (max2 - 1);
    }
}
```

## [1465. Maximum Area of a Piece of Cake After Horizontal and Vertical Cuts](https://leetcode.com/problems/maximum-area-of-a-piece-of-cake-after-horizontal-and-vertical-cuts/)

Medium

Given a rectangular cake with height h and width w, and two arrays of integers horizontalCuts and verticalCuts where horizontalCuts[i] is the distance from the top of the rectangular cake to the ith horizontal cut and similarly, verticalCuts[j] is the distance from the left of the rectangular cake to the jth vertical cut.

Return the maximum area of a piece of cake after you cut at each horizontal and vertical position provided in the arrays horizontalCuts and verticalCuts. Since the answer can be a huge number, return this modulo 10^9 + 7.


Example 1:
![](https://assets.leetcode.com/uploads/2020/05/14/leetcode_max_area_2.png)

```
Input: h = 5, w = 4, horizontalCuts = [1,2,4], verticalCuts = [1,3]
Output: 4 
Explanation: The figure above represents the given rectangular cake. Red lines are the horizontal and vertical cuts. After you cut the cake, the green piece of cake has the maximum area.
```


Example 2:
![](https://assets.leetcode.com/uploads/2020/05/14/leetcode_max_area_3.png)

```
Input: h = 5, w = 4, horizontalCuts = [3,1], verticalCuts = [1]
Output: 6
Explanation: The figure above represents the given rectangular cake. Red lines are the horizontal and vertical cuts. After you cut the cake, the green and yellow pieces of cake have the maximum area.
```

Example 3:
```
Input: h = 5, w = 4, horizontalCuts = [3], verticalCuts = [3]
Output: 9
```
 

Constraints:
```
2 <= h, w <= 10^9
1 <= horizontalCuts.length < min(h, 10^5)
1 <= verticalCuts.length < min(w, 10^5)
1 <= horizontalCuts[i] < h
1 <= verticalCuts[i] < w
It is guaranteed that all elements in horizontalCuts are distinct.
It is guaranteed that all elements in verticalCuts are distinct.
```

也没什么好说的就是找到每个list的最大gap，就是注意一下一开始要sort
```
class Solution {
public int maxArea(int h, int w, int[] horizontalCuts, int[] verticalCuts) {

        Arrays.sort(horizontalCuts);
        Arrays.sort(verticalCuts);

        long maxHor = 0;
        for (int i = 0; i < horizontalCuts.length - 1; i++) {
            maxHor = Math.max(maxHor, horizontalCuts[i+1] - horizontalCuts[i]);
        }
        maxHor = Math.max(maxHor, horizontalCuts[0]);
        maxHor = Math.max(maxHor, h - horizontalCuts[horizontalCuts.length-1]);

        long maxVer = 0;
        for (int i = 0; i < verticalCuts.length - 1; i++) {
            maxVer = Math.max(maxVer, verticalCuts[i+1] - verticalCuts[i]);
        }
        maxVer = Math.max(maxVer, verticalCuts[0]);
        maxVer = Math.max(maxVer, w - verticalCuts[verticalCuts.length-1]);
        int ret = (int) ((maxHor * maxVer) % (Math.pow(10, 9) + 7));
        return ret;
    }
}
```

## [1466. Reorder Routes to Make All Paths Lead to the City Zero](https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/)

Medium

There are n cities numbered from 0 to n-1 and n-1 roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.

Roads are represented by connections where connections[i] = [a, b] represents a road from city a to b.

This year, there will be a big event in the capital (city 0), and many people want to travel to this city.

Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.

It's guaranteed that each city can reach the city 0 after reorder.

 

Example 1:
![](https://assets.leetcode.com/uploads/2020/05/13/sample_1_1819.png)

```
Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
Output: 3
Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
```

Example 2:
![](https://assets.leetcode.com/uploads/2020/05/13/sample_2_1819.png)
```
Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
Output: 2
Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
```

Example 3:
```
Input: n = 3, connections = [[1,0],[2,0]]
Output: 0
```
 

Constraints:
```
2 <= n <= 5 * 10^4
connections.length == n-1
connections[i].length == 2
0 <= connections[i][0], connections[i][1] <= n-1
connections[i][0] != connections[i][1]
```

我的解法就是建立两个map，一个存正向的边，一个存逆向的边。从入口开始bfs。对任意一个点，从正向和负向两个map中找到对应的边，根据边方向确定是否要调转。并同时从两个map中删去这条边。

```
class Solution {
    public int minReorder(int n, int[][] connections) {
        Map<Integer, HashSet<Integer>> main = new HashMap<>();
        Map<Integer, HashSet<Integer>> reverse = new HashMap<>();


        for (int[] edge : connections) {
            int from = edge[0];
            int to = edge[1];

            main.putIfAbsent(from, new HashSet<>());
            reverse.putIfAbsent(to, new HashSet<>());

            main.get(from).add(to);
            reverse.get(to).add(from);
        }
        int ret = 0;

        List<Integer> ordered = new ArrayList<>();
        ordered.add(0);
        int index = 0;
        while (ordered.size() < n) {
            int node = ordered.get(index);
            for (int nd : reverse.getOrDefault(node, new HashSet<>())) {
                ordered.add(nd);
                main.get(nd).remove(node);
            }
            for (int nd : main.getOrDefault(node, new HashSet<>())) {
                ordered.add(nd);
                reverse.get(nd).remove(node);
                ret++;
            }
            index++;
        }
        
        return ret;
    }
}
```

## [1467. Probability of a Two Boxes Having The Same Number of Distinct Balls](https://leetcode.com/problems/probability-of-a-two-boxes-having-the-same-number-of-distinct-balls/)

Hard

Given 2n balls of k distinct colors. You will be given an integer array balls of size k where balls[i] is the number of balls of color i. 

All the balls will be shuffled uniformly at random, then we will distribute the first n balls to the first box and the remaining n balls to the other box (Please read the explanation of the second example carefully).

Please note that the two boxes are considered different. For example, if we have two balls of colors a and b, and two boxes [] and (), then the distribution [a] (b) is considered different than the distribution [b] (a) (Please read the explanation of the first example carefully).

We want to calculate the probability that the two boxes have the same number of distinct balls.

 

Example 1:
```
Input: balls = [1,1]
Output: 1.00000
Explanation: Only 2 ways to divide the balls equally:
- A ball of color 1 to box 1 and a ball of color 2 to box 2
- A ball of color 2 to box 1 and a ball of color 1 to box 2
In both ways, the number of distinct colors in each box is equal. The probability is 2/2 = 1
```

Example 2:
```
Input: balls = [2,1,1]
Output: 0.66667
Explanation: We have the set of balls [1, 1, 2, 3]
This set of balls will be shuffled randomly and we may have one of the 12 distinct shuffles with equale probability (i.e. 1/12):
[1,1 / 2,3], [1,1 / 3,2], [1,2 / 1,3], [1,2 / 3,1], [1,3 / 1,2], [1,3 / 2,1], [2,1 / 1,3], [2,1 / 3,1], [2,3 / 1,1], [3,1 / 1,2], [3,1 / 2,1], [3,2 / 1,1]
After that we add the first two balls to the first box and the second two balls to the second box.
We can see that 8 of these 12 possible random distributions have the same number of distinct colors of balls in each box.
Probability is 8/12 = 0.66667
```

Example 3:
```
Input: balls = [1,2,1,2]
Output: 0.60000
Explanation: The set of balls is [1, 2, 2, 3, 4, 4]. It is hard to display all the 180 possible random shuffles of this set but it is easy to check that 108 of them will have the same number of distinct colors in each box.
Probability = 108 / 180 = 0.6
```

Example 4:
```
Input: balls = [3,2,1]
Output: 0.30000
Explanation: The set of balls is [1, 1, 1, 2, 2, 3]. It is hard to display all the 60 possible random shuffles of this set but it is easy to check that 18 of them will have the same number of distinct colors in each box.
Probability = 18 / 60 = 0.3
```

Example 5:
```
Input: balls = [6,6,6,6,6,6]
Output: 0.90327
```
 

Constraints:
```
1 <= balls.length <= 8
1 <= balls[i] <= 6
sum(balls) is even.
Answers within 10^-5 of the actual value will be accepted as correct.
```

首先我们可以得到一个公式来计算组合数(distributions)

$$D(balls) = sum(balls)! / (boss[0]! * boss[1]! * ... * boss[-1]!)$$

对于这个问题，因为只有两堆，所以一旦左边确定了，右边也就确定了。既然如此，我们能穷尽所有左边的组合。而我们已经知道了怎么算组合数，那么我们就能简化为穷尽左边的所有颜色数量组合而已。假设左边的颜色组合为left，那么我们就可以算出对应的right，对比一下left和right拥有的不用颜色数量是不是一致，如果一致的话，这个颜色组合所代表的排列数量为D(left) * D(right).

所以我们只需要用DFS遍历所有的左边一半球的所有颜色组合就行。

```
class Solution {
    double solution = 0;

    public double getProbability(int[] balls) {
        int allNum = 0;
        for (int c : balls) {
            allNum += c;
        }
        int half = allNum / 2;
        int[] chosen = new int[balls.length];
        dfs(balls, chosen, 0, 0, half);
        double all = cal(balls);
        return solution  / all;
    }


    private void dfs(int[] balls, int[] chosen, int nowColor, int chosenNum, int half) {
        if (chosenNum == half) {
            if (isFit(balls, chosen)) {
                double so =  getSolution(balls, chosen);
                solution += so;
            }
            return;
        }
        if (nowColor >= balls.length) {
            return;
        }

        int thisColorNums = balls[nowColor];
        for (int chooseThisColorNum = 0; chooseThisColorNum <= thisColorNums; chooseThisColorNum++) {
            if (chosenNum + chooseThisColorNum > half) {
                break;
            }
            chosen[nowColor] = chooseThisColorNum;
            dfs(balls, chosen, nowColor + 1, chosenNum + chooseThisColorNum, half);
            chosen[nowColor] = 0;
        }
    }

    private boolean isFit(int[] balls, int[] chosen) {
        int chosenColors = 0;
        int unChosenColors = 0;
        for (int i = 0; i < balls.length; i++) {
            if (chosen[i] > 0) {
                chosenColors++;
            }
            if (balls[i] - chosen[i] > 0) {
                unChosenColors++;
            }
        }
        return chosenColors == unChosenColors;
    }

    private double getSolution(int[] balls, int[] chosen) {
        int[] unchosen = new int[balls.length];
        for (int i = 0; i < balls.length; i++) {
            unchosen[i] = balls[i] - chosen[i];
        }
        double ret = cal(chosen) * cal(unchosen);
        return ret;
    }

    private double cal(int[] balls) {
        double dup = 1;
        long counts = 0;
        for (int i=0; i < balls.length; i++) {
            int num = balls[i];
            if (num == 0) {
                continue;
            }
            counts += num;
            dup *= frac(num);
        }
        return frac(counts) / dup;
    }

    private double frac(long num) {
        double ret = 1;
        for (int i = 2; i <= num; i++) {
            ret *= i;
        }
        return ret;
    }

}
```
