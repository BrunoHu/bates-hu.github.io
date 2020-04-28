---
title: leetcode contest 186
date: 2020-04-27 21:04:07
tags: [leetcode, contest] 
---
这周我忘记参加比赛了，但是立得周更flag不能断，所以事后掐表补了一个。最后还是按时完成了，这一期的前三题出奇的简单，但是最后一题还是有点弯弯绕的。

## [1422. Maximum Score After Splitting a String](https://leetcode.com/problems/maximum-score-after-splitting-a-string/)

Easy

```
Given a string s of zeros and ones, return the maximum score after splitting the string into two non-empty substrings (i.e. left substring and right substring).

The score after splitting a string is the number of zeros in the left substring plus the number of ones in the right substring.

 

Example 1:

Input: s = "011101"
Output: 5 
Explanation: 
All possible ways of splitting s into two non-empty substrings are:
left = "0" and right = "11101", score = 1 + 4 = 5 
left = "01" and right = "1101", score = 1 + 3 = 4 
left = "011" and right = "101", score = 1 + 2 = 3 
left = "0111" and right = "01", score = 1 + 1 = 2 
left = "01110" and right = "1", score = 2 + 1 = 3
Example 2:

Input: s = "00111"
Output: 5
Explanation: When left = "00" and right = "111", we get the maximum score = 2 + 3 = 5
Example 3:

Input: s = "1111"
Output: 3
 

Constraints:

2 <= s.length <= 500
The string s consists of characters '0' and '1' only.
```

就是先计算总共多少个1，多少个0，然后再遍历一遍计算每个分割的情况，直接看代码
```
class Solution {
    public int maxScore(String s) {
        int ones = 0;
        int zeros = 0;
        for (char c : s.toCharArray()) {
            if (c == '1') {
                ones++;
            }else {
                zeros++;
            }
        }

        int max = -1;
        int leftOne = 0;
        int leftZero = 0;
        for (int i = 0; i < s.length() - 1; i ++) {
            char c = s.charAt(i);
            if (c == '1') {
                leftOne++;
            } else {
                leftZero++;
            }

            int sum = leftZero + (ones - leftOne);
            
            max = Math.max(max, sum);
        }
        
        return max;
    }
}
```


## [1423. Maximum Points You Can Obtain from Cards](https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/)

Medium
```
There are several cards arranged in a row, and each card has an associated number of points The points are given in the integer array cardPoints.

In one step, you can take one card from the beginning or from the end of the row. You have to take exactly k cards.

Your score is the sum of the points of the cards you have taken.

Given the integer array cardPoints and the integer k, return the maximum score you can obtain.

 

Example 1:

Input: cardPoints = [1,2,3,4,5,6,1], k = 3
Output: 12
Explanation: After the first step, your score will always be 1. However, choosing the rightmost card first will maximize your total score. The optimal strategy is to take the three cards on the right, giving a final score of 1 + 6 + 5 = 12.
Example 2:

Input: cardPoints = [2,2,2], k = 2
Output: 4
Explanation: Regardless of which two cards you take, your score will always be 4.
Example 3:

Input: cardPoints = [9,7,7,9,7,7,9], k = 7
Output: 55
Explanation: You have to take all the cards. Your score is the sum of points of all cards.
Example 4:

Input: cardPoints = [1,1000,1], k = 1
Output: 1
Explanation: You cannot take the card in the middle. Your best score is 1. 
Example 5:

Input: cardPoints = [1,79,80,1,1,1,200,1], k = 3
Output: 202
 

Constraints:

1 <= cardPoints.length <= 10^5
1 <= cardPoints[i] <= 10^4
1 <= k <= cardPoints.length
```

和上一题有点类似，简而言之就是取左边n个右边m个，n+m=k，找到一个取法使和最大。可以用一个简单的变异滑动窗口解决。

先计算数组中前k个和，这样左边数组的长度为k，右边长度为0.滑动方法就是每次去掉左边数组一位，右边数组增加一位，在遍历中的最大和就是答案

```
class Solution {
    public int maxScore(int[] cardPoints, int k) {
        int sum = 0;
        for (int i = 0; i<k; i++) {
            sum += cardPoints[i];
        }
         int max = sum;
        
        for (int i = 0; i < k; i++) {
            int cutIndex = k - 1 - i;
            int addIndex = cardPoints.length - 1 - i;
            
            sum -= cardPoints[cutIndex];
            sum += cardPoints[addIndex];
            
            max = Math.max(max, sum);
            
        }
        
        return max;
        
    }
}
```

## [1424. Diagonal Traverse II](https://leetcode.com/problems/diagonal-traverse-ii/)

Medium

Given a list of lists of integers, nums, return all elements of nums in diagonal order as shown in the below images.
 

Example 1:

![](https://assets.leetcode.com/uploads/2020/04/08/sample_1_1784.png)

```
Input: nums = [[1,2,3],[4,5,6],[7,8,9]]
Output: [1,4,2,7,5,3,8,6,9]
```
Example 2:

![](https://assets.leetcode.com/uploads/2020/04/08/sample_2_1784.png)

```
Input: nums = [[1,2,3,4,5],[6,7],[8],[9,10,11],[12,13,14,15,16]]
Output: [1,6,2,8,7,3,9,4,12,10,5,13,11,14,15,16]
```

Example 3:
```
Input: nums = [[1,2,3],[4],[5,6,7],[8],[9,10,11]]
Output: [1,4,2,5,3,8,6,9,7,10,11]
```
Example 4:
```
Input: nums = [[1,2,3,4,5,6]]
Output: [1,2,3,4,5,6]
 ```

Constraints:
```
1 <= nums.length <= 10^5
1 <= nums[i].length <= 10^5
1 <= nums[i][j] <= 10^9
There at most 10^5 elements in nums.
```

这个也没有算法，就是比细心
```
class Solution {
    public int[] findDiagonalOrder(List<List<Integer>> nums) {
        int len = -1;
        int number = 0;
        for (int i = 0; i < nums.size(); i++) {
            number += nums.get(i).size();
            len = Math.max(len, nums.get(i).size() + i);
        }
        LinkedList<Integer>[] mid = new LinkedList[len];

        for (int i = 0; i < nums.size(); i++) {
            List<Integer> l = nums.get(i);
            for (int j = 0; j < l.size(); j++) {
                int index = i + j;
                if (mid[index] == null) {
                    mid[index] = new LinkedList<>();
                }
                mid[index].addFirst(l.get(j));
            }
        }

        int[] ret = new int[number];
        int n = 0;
        for (LinkedList<Integer> l : mid) {
            for (int i : l) {
                ret[n] = i;
                n++;
            }
        }
        return ret;
    }
}
```


## [1425. Constrained Subset Sum](https://leetcode.com/problems/constrained-subset-sum/)

Hard

```
Given an integer array nums and an integer k, return the maximum sum of a non-empty subset of that array such that for every two consecutive integers in the subset, nums[i] and nums[j], where i < j, the condition j - i <= k is satisfied.

A subset of an array is obtained by deleting some number of elements (can be zero) from the array, leaving the remaining elements in their original order.

 

Example 1:

Input: nums = [10,2,-10,5,20], k = 2
Output: 37
Explanation: The subset is [10, 2, 5, 20].
Example 2:

Input: nums = [-1,-2,-3], k = 1
Output: -1
Explanation: The subset must be non-empty, so we choose the largest number.
Example 3:

Input: nums = [10,-2,-10,-5,20], k = 2
Output: 23
Explanation: The subset is [10, -2, -5, 20].
 

Constraints:

1 <= k <= nums.length <= 10^5
-10^4 <= nums[i] <= 10^4
```

这个题目就是找到一个子序列，能够随时开始，随时结束，但是序列中每两个点之间的距离不能超过k。这样我们其实很直接就是跑所有的可能，这就是一个图的遍历，但是每一个节点其实相当于k个节点连接，直接遍历复杂度很高，这样我们就应该想着用DP的方法，存储中间状态，加快速度。

这样，我们就可以自然的设定一个子问题Q(index),她的意思就是从对于一个从index开始的子序列，其可能的最大和是多少。这样，我们很自然就可以得到一个递推式

对于Q(i)

对于num[i],这是必须要取的，那么他如果要接上后面的序列的话，那么下一个数必然是 num[i+1] 到 num[i+k] 

我们记 maxV = Max(Q(i+1), Q(i+2), ..., Q(i+k))，表示如果后面可以接上的序列的最大和

那么Q(i) = 

num[i] if maxV <= 0  // 不用后面的序列

num[i] + maxV if maxV > 0 // 用后面最大的那个序列

这样一个DP的解决方案就出炉了

```
class Solution {
    public int constrainedSubsetSum(int[] nums, int k) {
        int[] m = new int[nums.length];
        int ret = Integer.MIN_VALUE;
        for (int i = nums.length - 1; i >= 0; i--) {
            int num = nums[i];
            int max = Integer.MIN_VALUE;
            for (int j = i + 1; j <= Math.min(nums.length - 1, i + k); j++) {
                max = Math.max(max, m[j]);
            }
            if (max > 0) {
                num += max;
            }
            m[i] = num;
            ret = Math.max(num, ret);
        }
        return ret;
    }

}
```

在面试中，这个解法实际上就够了。足够和面试官吹逼了。时间的复杂度就是O(nk)

但是却不能ac，我想了快半个小时，突然想到了问题的一个特性，就是只需要求最大值。所以在遍历的时候，我们实际上每次都比较k个值，里面有些值是可以直接舍弃的。举个栗子，同上面的代码，我们从后开始遍历，假设Q(i+2) = 10, Q(i+1) = 100，那么对于Q(k), k <= i 来说，Q(i+2)就没有存储和比较的必要了，因为所有Q(i+2)能接上的序列，Q(i+1)都能接上而且比他大。

我们可以构造一个单调序列来实现，这个数组中的元素有两个值，一个是index，一个是Q(index),数组中的元素按index的顺序排列，且保持单调递增。更新的方法是，求Q(i)时，我们去掉序列中index > i + k 的元素，然后末尾就是最大的可达元素。不需要和上面的方法一样比较k个。计算完之后，用Q(i)从单调序列头部依次比较，如果比序列中元素大，那么就清楚这个元素知道没有比他小的，再插入序列头。这样就保持了单调性。

因为不需要和dp方法一样每一位都要遍历之后k个，而且每个元素之多入栈与出栈一次，所以总的时间复杂度只有O(n)

```
class Solution {
    public int constrainedSubsetSum(int[] nums, int k) {
        // value, index
        LinkedList<Pair<Integer, Integer>> ascending = new LinkedList<>();
        int ret = Integer.MIN_VALUE;
        for (int i = nums.length - 1; i >= 0; i--) {
//            System.out.println(ascending);
            while (ascending.size() > 0 && ascending.getLast().getValue() > i + k) {
                ascending.removeLast();
            }
            int num = nums[i];
            if (ascending.size() > 0) {
                num += ascending.getLast().getKey();
            }

            // insert
            if (num > 0) {
                while (ascending.size() > 0 && ascending.getFirst().getKey() <= num) {
                    ascending.removeFirst();
                }
                ascending.addFirst(new Pair<>(num, i));
            }

            ret = Math.max(ret, num);
        }
        return ret;
    }
}
```