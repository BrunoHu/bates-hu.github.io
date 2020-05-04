---
title: leetcode contest 187
date: 2020-05-03 20:05:10
tags: [leetcode, contest] 
---

按时周更

## [1436. Destination City](https://leetcode.com/problems/destination-city/)
Easy

```
You are given the array paths, where paths[i] = [cityAi, cityBi] means there exists a direct path going from cityAi to cityBi. Return the destination city, that is, the city without any path outgoing to another city.

It is guaranteed that the graph of paths forms a line without any loop, therefore, there will be exactly one destination city.

 

Example 1:

Input: paths = [["London","New York"],["New York","Lima"],["Lima","Sao Paulo"]]
Output: "Sao Paulo" 
Explanation: Starting at "London" city you will reach "Sao Paulo" city which is the destination city. Your trip consist of: "London" -> "New York" -> "Lima" -> "Sao Paulo".
Example 2:

Input: paths = [["B","C"],["D","B"],["C","A"]]
Output: "A"
Explanation: All possible trips are: 
"D" -> "B" -> "C" -> "A". 
"B" -> "C" -> "A". 
"C" -> "A". 
"A". 
Clearly the destination city is "A".
Example 3:

Input: paths = [["A","Z"]]
Output: "Z"
 

Constraints:

1 <= paths.length <= 100
paths[i].length == 2
1 <= cityAi.length, cityBi.length <= 10
cityAi != cityBi
All strings consist of lowercase and uppercase English letters and the space character.
```

没什么可说的，只需要找到出度为0的点就可以了。

```
class Solution {
    public String destCity(List<List<String>> paths) {
        Set<String> set = new HashSet<>();
        
        for (List<String> path : paths){
            set.add(path.get(1));
        }

        for (List<String> path : paths){
            set.remove(path.get(0));
        }
        
        List<String> r = new ArrayList<>(set);
        
        return r.get(0);
        
    }
}
```

## [1437. Check If All 1's Are at Least Length K Places Away](https://leetcode.com/problems/check-if-all-1s-are-at-least-length-k-places-away/)

Medium

Given an array nums of 0s and 1s and an integer k, return True if all 1's are at least k places away from each other, otherwise return False.

 

Example 1:

![](https://assets.leetcode.com/uploads/2020/04/15/sample_1_1791.png)
```
Input: nums = [1,0,0,0,1,0,0,1], k = 2
Output: true
Explanation: Each of the 1s are at least 2 places away from each other.
```
Example 2:

![](https://assets.leetcode.com/uploads/2020/04/15/sample_2_1791.png)
```
Input: nums = [1,0,0,1,0,1], k = 2
Output: false
Explanation: The second 1 and third 1 are only one apart from each other.
```

```
Example 3:
Input: nums = [1,1,1,1,1], k = 0
Output: true
```

```
Example 4:
Input: nums = [0,1,0,1], k = 1
Output: true
 ```

```
Constraints:

1 <= nums.length <= 10^5
0 <= k <= nums.length
nums[i] is 0 or 1
```

这个直接遍历一遍记录最后一个1所在的位置就可以

```
class Solution {
    public boolean kLengthApart(int[] nums, int k) {
        Integer lastIndex = null;
        
        for (int i = 0; i < nums.length; i++) {
            int num = nums[i];
            if (num == 1) {
                if (lastIndex != null) {
                    if (i - lastIndex <= k) {
                        return false;
                    }
                }
                lastIndex = i;
            }
        }
        
        return true;
    }
}
```

## [1438. Longest Continuous Subarray With Absolute Diff Less Than or Equal to Limit](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/)

Medium

```
Given an array of integers nums and an integer limit, return the size of the longest continuous subarray such that the absolute difference between any two elements is less than or equal to limit.

In case there is no subarray satisfying the given condition return 0.

 

Example 1:

Input: nums = [8,2,4,7], limit = 4
Output: 2 
Explanation: All subarrays are: 
[8] with maximum absolute diff |8-8| = 0 <= 4.
[8,2] with maximum absolute diff |8-2| = 6 > 4. 
[8,2,4] with maximum absolute diff |8-2| = 6 > 4.
[8,2,4,7] with maximum absolute diff |8-2| = 6 > 4.
[2] with maximum absolute diff |2-2| = 0 <= 4.
[2,4] with maximum absolute diff |2-4| = 2 <= 4.
[2,4,7] with maximum absolute diff |2-7| = 5 > 4.
[4] with maximum absolute diff |4-4| = 0 <= 4.
[4,7] with maximum absolute diff |4-7| = 3 <= 4.
[7] with maximum absolute diff |7-7| = 0 <= 4. 
Therefore, the size of the longest subarray is 2.
Example 2:

Input: nums = [10,1,2,4,7,2], limit = 5
Output: 4 
Explanation: The subarray [2,4,7,2] is the longest since the maximum absolute diff is |2-7| = 5 <= 5.
Example 3:

Input: nums = [4,2,2,2,4,4,2,2], limit = 0
Output: 3
 

Constraints:

1 <= nums.length <= 10^5
1 <= nums[i] <= 10^9
0 <= limit <= 10^9
```

这个最直接的思路是可以直接用滑动窗口，使得窗口内的子序列满足要求然后滑到末尾得到答案，这个复杂度就是O(nm),n是数组长度，m是字符的种类。

```
class Solution {
    public int longestSubarray(int[] nums, int limit) {
        Map<Integer, Integer> map = new HashMap<>();
        
        int left = 0;
        int right = 1;
        int maxlen = 1;
        map.put(nums[left], 1);
        
        while (right < nums.length) {
            int num = nums[right];
            map.put(num, map.getOrDefault(num, 0) + 1);
            
            while (getDiff(map) > limit) {
                map.put(nums[left], map.get(nums[left]) - 1);
                if (map.get(nums[left]) == 0) {
                    map.remove(nums[left]);
                }
                left++;
            }
            maxlen = Math.max(maxlen, right - left + 1 );
            right++;
        }
        
        return maxlen;
    }
    
    private int getDiff(Map<Integer, Integer> map) {
        if (map.size() <= 1) {
            return -1;
        }
        
        int max = Integer.MIN_VALUE;
        int min = Integer.MAX_VALUE;
        
        for (int i : map.keySet()) {
            max = Math.max(max, i);
            min = Math.min(min, i);
        }
        
        return Math.abs(max - min);
    }
}
```


## [1439. Find the Kth Smallest Sum of a Matrix With Sorted Rows](https://leetcode.com/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows/)
Hard

```
You are given an m * n matrix, mat, and an integer k, which has its rows sorted in non-decreasing order.

You are allowed to choose exactly 1 element from each row to form an array. Return the Kth smallest array sum among all possible arrays.

 

Example 1:

Input: mat = [[1,3,11],[2,4,6]], k = 5
Output: 7
Explanation: Choosing one element from each row, the first k smallest sum are:
[1,2], [1,4], [3,2], [3,4], [1,6]. Where the 5th sum is 7.  
Example 2:

Input: mat = [[1,3,11],[2,4,6]], k = 9
Output: 17
Example 3:

Input: mat = [[1,10,10],[1,4,5],[2,3,6]], k = 7
Output: 9
Explanation: Choosing one element from each row, the first k smallest sum are:
[1,1,2], [1,1,3], [1,4,2], [1,4,3], [1,1,6], [1,5,2], [1,5,3]. Where the 7th sum is 9.  
Example 4:

Input: mat = [[1,1,10],[2,2,9]], k = 7
Output: 12
 

Constraints:

m == mat.length
n == mat.length[i]
1 <= m, n <= 40
1 <= k <= min(200, n ^ m)
1 <= mat[i][j] <= 5000
mat[i] is a non decreasing array.
```

比较直观粗暴的方式，就是直接用优先队列。我们可以这么理解这个题，因为每个row都是单调增加的，所以一旦某个row中的位置往后移了一位，那么必然是sum增大或者不变，那么我们记对于一个array1来说，对任意一个row中的元素往右移一格我们得到一个arrayb，他们之间就有建立起一个arraya -> arrayb的一个有向连接，这个路径的长度就是右移所带来的sum增量，也是那两个的变化的位置之间的差值。同时因为只会往右移动，也就保证了没有环的存在。这样，问题就变得和最短路径相似了，找到离初始点第k短的点。我们就直接用dijistra就行。也就是，从初始点开始，遍历所能到的所有点，放入一个最小堆，这个堆里比较的就是路径距离，每次取出堆顶，然后循环。

还有一个要注意的就是怎么唯一确定一个点，因为这里的一个节点其实是一个排列方式，是一个array，所以对于java来说我们要重写hashcode和equals方法来使用hashset。

```
class Solution {
    public int kthSmallest(int[][] mat, int k) {
        PriorityQueue<Pair<Wrap, Integer>> queue = new PriorityQueue<>(Comparator.comparingInt(Pair::getValue));
        Set<Wrap> set = new HashSet<>();
        int[] x = new int[mat.length];
        Arrays.fill(x, 0);
        int base = 0;
        for (int[] ints: mat) {
            base += ints[0];
        }
        queue.add(new Pair<>(new Wrap(x), base));
        set.add(new Wrap(x));
        int maxLen = mat[0].length;
        while (k >= 1) {
            if (k == 1) {
                return queue.peek().getValue();
            }

            Pair<Wrap, Integer> top = queue.poll();


            int[] line = top.getKey().getData();
            for (int row = 0; row < mat.length; row++) {
                if (line[row] + 1 >= maxLen) {
                    continue;
                } else {
                        int[] copy = Arrays.copyOf(line, line.length);
                        int newSum = top.getValue() - mat[row][copy[row]] + mat[row][copy[row] + 1];
                        copy[row]++;
                        Wrap newLine = new Wrap(copy);
                        if (set.contains(newLine)) {
                            continue;
                        }
                        queue.add(new Pair<>(newLine, newSum));
                        set.add(newLine);

                }
            }
            k--;
        }
        return queue.peek().getValue();
    }
}

class Wrap {
    int[] data;

    public Wrap(int[] data) {
        this.data = data;
    }

    public int[] getData() {
        return data;
    }

    @Override
    public int hashCode() {
        int digit = 1;
        int sum = 0;
        for (int num : data) {
            sum += digit * num;
            sum = sum % 10000007;
            digit *= 10;
        }
        return sum;
    }

    @Override
    public String toString() {
        return "Wrap{" +
                "data=" + Arrays.toString(data) +
                '}';
    }

    @Override
    public boolean equals(Object obj) {
        Wrap to = (Wrap) obj;
        for (int i = 0; i < to.getData().length; i++) {
            if (this.data[i] != to.getData()[i]) {
                return false;
            }
        }
        return true;
    }
}

```


我在看这个题的disscuss的时候发现了一个更简单的解法，用的就是分治法，把这个问题可以简化成两个row，找到第k大的pair sum。每次合并两个row。这个问题就是
[leetcode 373](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/). 同样用priorityqueue解决，但是写起来不要简单太多。