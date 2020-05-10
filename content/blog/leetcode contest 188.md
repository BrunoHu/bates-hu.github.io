---
title: leetcode contest 188
date: 2020-05-09 22:05:61
tags: [leetcode, contest] 
---

1441. Build an Array With Stack Operations
Easy

```
Given an array target and an integer n. In each iteration, you will read a number from  list = {1,2,3..., n}.

Build the target array using the following operations:

Push: Read a new element from the beginning list, and push it in the array.
Pop: delete the last element of the array.
If the target array is already built, stop reading more elements.
You are guaranteed that the target array is strictly increasing, only containing numbers between 1 to n inclusive.

Return the operations to build the target array.

You are guaranteed that the answer is unique.

 

Example 1:

Input: target = [1,3], n = 3
Output: ["Push","Push","Pop","Push"]
Explanation: 
Read number 1 and automatically push in the array -> [1]
Read number 2 and automatically push in the array then Pop it -> [1]
Read number 3 and automatically push in the array -> [1,3]
Example 2:

Input: target = [1,2,3], n = 3
Output: ["Push","Push","Push"]
Example 3:

Input: target = [1,2], n = 4
Output: ["Push","Push"]
Explanation: You only need to read the first 2 numbers and stop.
Example 4:

Input: target = [2,3,4], n = 4
Output: ["Push","Pop","Push","Push","Push"]
 

Constraints:

1 <= target.length <= 100
1 <= target[i] <= 100
1 <= n <= 100
target is strictly increasing.
```

没什么难度，就是如果在target里就push，不在的话就push & pop

```
class Solution {
    public List<String> buildArray(int[] target, int n) {
        List<String> ret = new ArrayList<>();
        int index = 0;
        for (int number = 1; number <= n; number++){
        
            if (index == target.length) {
                break;
            }
            if (number == target[index]) {
                ret.add("Push");
                index++;
            } else {
                ret.add("Push");
                ret.add("Pop");
            }
        }
        
        return ret;
    }
}
```

## [1442. Count Triplets That Can Form Two Arrays of Equal XOR](https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/submissions/)
Medium

```
Given an array of integers arr.

We want to select three indices i, j and k where (0 <= i < j <= k < arr.length).

Let's define a and b as follows:

a = arr[i] ^ arr[i + 1] ^ ... ^ arr[j - 1]
b = arr[j] ^ arr[j + 1] ^ ... ^ arr[k]
Note that ^ denotes the bitwise-xor operation.

Return the number of triplets (i, j and k) Where a == b.

 

Example 1:

Input: arr = [2,3,1,6,7]
Output: 4
Explanation: The triplets are (0,1,2), (0,2,2), (2,3,4) and (2,4,4)
Example 2:

Input: arr = [1,1,1,1,1]
Output: 10
Example 3:

Input: arr = [2,3]
Output: 0
Example 4:

Input: arr = [1,3,5,7,9]
Output: 3
Example 5:

Input: arr = [7,11,12,9,5,2,7,17,22]
Output: 8
 

Constraints:

1 <= arr.length <= 300
1 <= arr[i] <= 10^8
```

先做预计算，把所有区间的异或和都算好，然后再找对应的pair。通过map，记录所有异或和相同的区间，然后再这些区间里面找连在一起的

```
class Solution {
    public int countTriplets(int[] arr) {
        int count = 0;
        int[][] mem = new int[arr.length][arr.length];
        // pre sum
        Map<Integer, List<Pair<Integer, Integer>>> map = new HashMap<>();
        for (int end = 0; end < arr.length; end++) {
            go(map, mem, arr, 0, end);
        }
        // find pairs
        for (List<Pair<Integer, Integer>> list : map.values()){
            // start. num
            Map<Integer, Integer> right = new HashMap<>();
            for (Pair<Integer, Integer> pair : list) {
                right.put(pair.getKey(), right.getOrDefault(pair.getKey(), 0) + 1);
            }
            for (Pair<Integer, Integer> pair : list) {
                count += right.getOrDefault(pair.getValue() + 1, 0);
            }
        }
        
        return count;
    }
    // calculate value from start to end
    public void go(Map<Integer, List<Pair<Integer, Integer>>> map, int[][] mem, int[] arr, int start, int end) {
        if (start == end) {
            mem[start][end] = arr[end];

        } else {
            go(map, mem, arr, start + 1, end);
            mem[start][end] = arr[start] ^ mem[start+1][end];
        }
        map.putIfAbsent(mem[start][end], new ArrayList<>());
        map.get(mem[start][end]).add(new Pair<>(start, end));
    }

}
```


## [1443. Minimum Time to Collect All Apples in a Tree](https://leetcode.com/problems/minimum-time-to-collect-all-apples-in-a-tree/)
Medium

Given an undirected tree consisting of n vertices numbered from 0 to n-1, which has some apples in their vertices. You spend 1 second to walk over one edge of the tree. Return the minimum time in seconds you have to spend in order to collect all apples in the tree starting at vertex 0 and coming back to this vertex.

The edges of the undirected tree are given in the array edges, where edges[i] = [fromi, toi] means that exists an edge connecting the vertices fromi and toi. Additionally, there is a boolean array hasApple, where hasApple[i] = true means that vertex i has an apple, otherwise, it does not have any apple.


Example 1:

![](https://assets.leetcode.com/uploads/2020/04/23/min_time_collect_apple_1.png)

```
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,true,true,false]
Output: 8 
Explanation: The figure above represents the given tree where red vertices have an apple. One optimal path to collect all apples is shown by the green arrows.
```

Example 2:
![](https://assets.leetcode.com/uploads/2020/04/23/min_time_collect_apple_2.png)
```
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,true,false,false,true,false]
Output: 6
Explanation: The figure above represents the given tree where red vertices have an apple. One optimal path to collect all apples is shown by the green arrows.  
```

Example 3:
```
Input: n = 7, edges = [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], hasApple = [false,false,false,false,false,false,false]
Output: 0
```

```
Constraints:

1 <= n <= 10^5
edges.length == n-1
edges[i].length == 2
0 <= fromi, toi <= n-1
fromi < toi
hasApple.length == n
```

这个问题就是一个典型的递归问题，因为图形是树而且起点固定，所以简单了很多。简而言之就是找到左子树和右子树的对应值，根据子树是否有苹果递归。格外要注意的就是根节点略有特殊。

```
class Solution {
    public int minTime(int n, int[][] edges, List<Boolean> hasApple) {
        Map<Integer, List<Integer>> way = new HashMap<>();

        for (int[] edge : edges) {
            way.putIfAbsent(edge[0], new ArrayList<>());
            way.get(edge[0]).add(edge[1]);
        }
        System.out.println("way " + way);

        int ret = 0;
        for (int subnode : way.get(0)) {
            int r = steps(way, subnode, hasApple);
            ret += r;
        }
        return ret;
    }

    private int steps(Map<Integer, List<Integer>> way, int node, List<Boolean> hasApple) {
        // 边界条件，如果本身是苹果那么要走两步
        if (way.get(node) == null) {
            if (hasApple.get(node)) {
                return 2;
            } else {
                return 0;
            }
        }
        int ret = 0;
        for (int subnode : way.get(node)) {
            int r = steps(way, subnode, hasApple);
            ret += r;
        }

        // 如果子树有苹果，那么节点本身必然要遍历
        if (ret > 0) {
            return ret + 2;
        } else if (hasApple.get(node)) {
            return 2;
        } else {
            return 0;
        }
    }
}
```


## [1444. Number of Ways of Cutting a Pizza](https://leetcode.com/problems/number-of-ways-of-cutting-a-pizza/)
Hard

Given a rectangular pizza represented as a rows x cols matrix containing the following characters: 'A' (an apple) and '.' (empty cell) and given the integer k. You have to cut the pizza into k pieces using k-1 cuts. 

For each cut you choose the direction: vertical or horizontal, then you choose a cut position at the cell boundary and cut the pizza into two pieces. If you cut the pizza vertically, give the left part of the pizza to a person. If you cut the pizza horizontally, give the upper part of the pizza to a person. Give the last piece of pizza to the last person.

Return the number of ways of cutting the pizza such that each piece contains at least one apple. Since the answer can be a huge number, return this modulo 10^9 + 7.

 

Example 1:
![](https://assets.leetcode.com/uploads/2020/04/23/ways_to_cut_apple_1.png)

```
Input: pizza = ["A..","AAA","..."], k = 3
Output: 3 
Explanation: The figure above shows the three ways to cut the pizza. Note that pieces must contain at least one apple.
```

Example 2:
```
Input: pizza = ["A..","AA.","..."], k = 3
Output: 1
```

Example 3:
```
Input: pizza = ["A..","A..","..."], k = 1
Output: 1
 ```

```
Constraints:

1 <= rows, cols <= 50
rows == pizza.length
cols == pizza[i].length
1 <= k <= 10
pizza consists of characters 'A' and '.' only.
```

题目就是要保证每次切的时候两边都有苹果。但是这个判断我们不可能每次都遍历全图算一遍，所以我们必须要预计算减少时间复杂度。如果你直接计算的话，那么所有的区间是有$n^4$个，太大了。但是因为切割方式的特殊，我们每次只去掉左边或者上面的蛋糕，根据这个特性，我们计算的区间可以固定右下角的定点。即我们可以预计算apples[row][col],对于每个apples[i][j],其值的意义为以（i,j）为左上角，右下角为pizza的右下角的这个矩形中有多少个苹果。而且这个递推公式为apples[row][col] = apples[row+1][col] + apples[row][col+1] - apples[row+1][col+1] + {is pizza(i,j) has apple}。那么我们就可以开始切了。最直接粗暴的方式就是dfs，遍历每种可能的切法，并且让每次切的时候都必然能切完。这个要求就是如果现在还剩n刀要切，那么切完剩下的pizza必须要有n个apple。并且我们配上熟悉的DP，加个memory减少时间复杂度。mem[row][col][cut]表示对于左上定点为(row,col)的子pizza，还有n刀要切的时候有多少种切法。实测时间和空间都超过100%，代码如下

```
class Solution {
    public int ways(String[] pizza, int k) {
        int l1 = pizza.length;
        int l2 = pizza[0].length();
        int[][] apples = new int[pizza.length][pizza[0].length()];
        char c = pizza[l1 - 1].charAt(l2 - 1);
        apples[pizza.length-1][pizza[0].length() - 1] =  c == 'A' ? 1 : 0;
        // last row
        for (int i = l2 - 2; i >= 0; i-- ) {
            boolean isApple = pizza[l1 - 1].charAt(i) == 'A';
            int num = isApple ? 1 : 0;
            apples[l1-1][i] = num + apples[l1 - 1][i+1];
        }

        // last col
        for (int i = l1 - 2; i >= 0; i-- ) {
            boolean isApple = pizza[i].charAt(l2-1) == 'A';
            int num = isApple ? 1 : 0;
            apples[i][l2-1] = num + apples[i+1][l2-1];
        }

        for (int row = l1 - 2; row >= 0; row--) {
            for (int col = l2 - 2; col >=0; col--) {
                int num = pizza[row].charAt(col) == 'A' ? 1 : 0;
                int ret = apples[row+1][col] + apples[row][col+1] - apples[row+1][col+1];
                apples[row][col] = num + ret;
            }
        }

        Integer[][][] mem = new Integer[l1][l2][k+1];
        return cuts(apples, mem, 0, 0, k - 1);
    }

    // mem: row, col, cut
    private int cuts(int[][] apples, Integer[][][] mem, int row, int col, int cut) {
        if (cut == 0) {
            return 1;
        }
        if (mem[row][col][cut] != null) {
            return mem[row][col][cut];
        }
        int count = apples[row][col];

        int cutsChoice = 0;

        // test horizontal cut
        for (int i = col + 1; i < apples[0].length; i++) {
            int rightApples = apples[row][i];
            if (rightApples >= cut) {
                // 左边必须有apple
                if (rightApples == count) {
                    continue;
                }
                cutsChoice+= cuts(apples, mem, row, i, cut - 1);
                cutsChoice = cutsChoice % 1000000007;
            } else {
                // 右边apple已经不够，不用遍历了
                break;
            }
        }

        // test  cut row
        for (int i = row + 1; i < apples.length; i++) {
            int downApples = apples[i][col];
            if (downApples >= cut) {
                if (downApples == count) {
                    continue;
                }
                cutsChoice+= cuts(apples, mem, i, col, cut - 1);
                cutsChoice = cutsChoice % 1000000007;
            } else {
                break;
            }
        }
        mem[row][col][cut] = cutsChoice;

        return cutsChoice;
    }
}
```