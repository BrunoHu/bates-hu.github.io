---
title: leetcode contest 185
date: 2020-04-18 21:04:89
tags: [leetcode, contest] 
---

弄个周更督促我保持刷题。这次没有做完，多用了10分钟，倒数第二题理解错了之后花了挺久，最后一道题被同余坑了15分钟，感觉自己是傻逼。而且写的过程中我还发现我的ctrl+c和ctrl+v不灵了，这是在diss我抄代码抄太多了么。。。

## [1417. Reformat The String](https://leetcode.com/problems/reformat-the-string)

```
Difficulty:Easy
Given alphanumeric string s. (Alphanumeric string is a string consisting of lowercase English letters and digits).

You have to find a permutation of the string where no letter is followed by another letter and no digit is followed by another digit. That is, no two adjacent characters have the same type.

Return the reformatted string or return an empty string if it is impossible to reformat the string.

Example 1:

Input: s = "a0b1c2"
Output: "0a1b2c"
Explanation: No two adjacent characters have the same type in "0a1b2c". "a0b1c2", "0a1b2c", "0c2a1b" are also valid permutations.
Example 2:

Input: s = "leetcode"
Output: ""
Explanation: "leetcode" has only characters so we cannot separate them by digits.
Example 3:

Input: s = "1229857369"
Output: ""
Explanation: "1229857369" has only digits so we cannot separate them by characters.
Example 4:

Input: s = "covid2019"
Output: "c2o0v1i9d"
Example 5:

Input: s = "ab123"
Output: "1a2b3"
 

Constraints:

1 <= s.length <= 500
s consists of only lowercase English letters and/or digits.
```

easy不想说啥，就是把数字和字母分成两个list，如果长度差不超过1就可以组。

```
class Solution {
    public String reformat(String s) {
         List<Character> characters = new ArrayList<>();
        List<Character> digits = new ArrayList<>();
        
        for (char c : s.toCharArray()) {
            if (c >= '0' && c <= '9') {
                digits.add(c);
            } else {
                characters.add(c);
            }
        }
        
        if (Math.abs(characters.size() - digits.size()) > 1) {
            return "";
        }

        List<Character> first;
        List<Character> second;
        
        if (characters.size() > digits.size()) {
            first = characters;
            second = digits;
        } else {
            second = characters;
            first = digits;
        }
        StringBuffer sb = new StringBuffer();
        for (int i = 0; i < second.size(); i++) {
            sb.append(first.get(i));
            sb.append(second.get(i));
        }
        
        if (first.size() > second.size()) {
            sb.append(first.get(first.size() - 1));
        }
        
        return sb.toString();
    }
}
```

## [1418. Display Table of Food Orders in a Restaurant](https://leetcode.com/problems/display-table-of-food-orders-in-a-restaurant/)

```
Difficulty:Medium
Given the array orders, which represents the orders that customers have done in a restaurant. More specifically orders[i]=[customerNamei,tableNumberi,foodItemi] where customerNamei is the name of the customer, tableNumberi is the table customer sit at, and foodItemi is the item customer orders.

Return the restaurant's “display table”. The “display table” is a table whose row entries denote how many of each food item each table ordered. The first column is the table number and the remaining columns correspond to each food item in alphabetical order. The first row should be a header whose first column is “Table”, followed by the names of the food items. Note that the customer names are not part of the table. Additionally, the rows should be sorted in numerically increasing order.

 

Example 1:

Input: orders = [["David","3","Ceviche"],["Corina","10","Beef Burrito"],["David","3","Fried Chicken"],["Carla","5","Water"],["Carla","5","Ceviche"],["Rous","3","Ceviche"]]
Output: [["Table","Beef Burrito","Ceviche","Fried Chicken","Water"],["3","0","2","1","0"],["5","0","1","0","1"],["10","1","0","0","0"]] 
Explanation:
The displaying table looks like:
Table,Beef Burrito,Ceviche,Fried Chicken,Water
3    ,0           ,2      ,1            ,0
5    ,0           ,1      ,0            ,1
10   ,1           ,0      ,0            ,0
For the table 3: David orders "Ceviche" and "Fried Chicken", and Rous orders "Ceviche".
For the table 5: Carla orders "Water" and "Ceviche".
For the table 10: Corina orders "Beef Burrito". 
Example 2:

Input: orders = [["James","12","Fried Chicken"],["Ratesh","12","Fried Chicken"],["Amadeus","12","Fried Chicken"],["Adam","1","Canadian Waffles"],["Brianna","1","Canadian Waffles"]]
Output: [["Table","Canadian Waffles","Fried Chicken"],["1","2","0"],["12","0","3"]] 
Explanation: 
For the table 1: Adam and Brianna order "Canadian Waffles".
For the table 12: James, Ratesh and Amadeus order "Fried Chicken".
Example 3:

Input: orders = [["Laura","2","Bean Burrito"],["Jhon","2","Beef Burrito"],["Melissa","2","Soda"]]
Output: [["Table","Bean Burrito","Beef Burrito","Soda"],["2","1","1","1"]]
 

Constraints:

1 <= orders.length <= 5 * 10^4
orders[i].length == 3
1 <= customerNamei.length, foodItemi.length <= 20
customerNamei and foodItemi consist of lowercase and uppercase English letters and the space character.
tableNumberi is a valid integer between 1 and 500.
```

这个没有任何算法，不想解释，就是按照逻辑写就可以，唯一注意的就是排序的时候桌号要用转化成数字排序
```
class Solution {
    public List<List<String>> displayTable(List<List<String>> orders) {
        Set<String> dishes = new HashSet<>();
        Set<String> tables = new HashSet<>();
        Map<Pair<String, String>, Integer> map = new HashMap<>();
        
        
        for (List<String> order : orders) {
            dishes.add(order.get(2));
            tables.add(order.get(1));
            Pair<String, String> pair = new Pair<>(order.get(1), order.get(2));
            map.put(pair, map.getOrDefault(pair, 0) + 1);
        }
        
        List<String> t = new ArrayList<>(tables);
        List<String> d = new ArrayList<>(dishes);

        t.sort(Comparator.comparing(Integer::valueOf));
        Collections.sort(d);
        
        List<List<String>> ret = new ArrayList<>();
        List<String> dd = new ArrayList<>();
        dd.add("Table");
        dd.addAll(d);
        
        System.out.println(t);
        
        ret.add(dd);
        for (String num : t) {
            List<String> l = new ArrayList<>();
            l.add(num);
            for (String dish : d) {
                l.add(String.valueOf(map.getOrDefault(new Pair<>(num, dish), 0)));
            }
            ret.add(l);
        }
        
        return ret;
    }
}
```

## [1419. Minimum Number of Frogs Croaking](https://leetcode.com/problems/minimum-number-of-frogs-croaking/)
```
Difficulty:Medium
Given the string croakOfFrogs, which represents a combination of the string "croak" from different frogs, that is, multiple frogs can croak at the same time, so multiple “croak” are mixed. Return the minimum number of different frogs to finish all the croak in the given string.

A valid "croak" means a frog is printing 5 letters ‘c’, ’r’, ’o’, ’a’, ’k’ sequentially. The frogs have to print all five letters to finish a croak. If the given string is not a combination of valid "croak" return -1.

 

Example 1:

Input: croakOfFrogs = "croakcroak"
Output: 1 
Explanation: One frog yelling "croak" twice.
Example 2:

Input: croakOfFrogs = "crcoakroak"
Output: 2 
Explanation: The minimum number of frogs is two. 
The first frog could yell "crcoakroak".
The second frog could yell later "crcoakroak".
Example 3:

Input: croakOfFrogs = "croakcrook"
Output: -1
Explanation: The given string is an invalid combination of "croak" from different frogs.
Example 4:

Input: croakOfFrogs = "croakcroa"
Output: -1
 

Constraints:

1 <= croakOfFrogs.length <= 10^5
All characters in the string are: 'c', 'r', 'o', 'a' or 'k'.
```

这个题目我一开始还理解错题目了，这不是求有多少个序列，而是要求同时有多少个青蛙在呱。总体思路就是在每个k的位置，找到他对应的c，看看在这段时间中有多少个青蛙呱完了。其实和meeting room有点像，但是不同的地方是开头和结尾是严格有序的，所以更简单点。我的解答因为一开始理解错了题意，所以写的有点奇怪。

```
class Solution {
    public int minNumberOfFrogs(String croakOfFrogs) {
        int[] count = new int[6];

        // 记录呱开始的位置
        ArrayList<Integer> start = new ArrayList<>();
        // 记录结尾的位置
        ArrayList<Integer> end = new ArrayList<>();
        // 记录还没有呱完的开始位置
        LinkedList<Integer> starts = new LinkedList<>();
        
        
        int finished = 0;
        
        int ret = -1;
        int lastEndIndex = 0;

        for (int i = 0; i< croakOfFrogs.length(); i++) {
            char c = croakOfFrogs.charAt(i);
            if (c == 'c') {
                start.add(i);
                starts.add(i);
                count[1]++;
            } else if (c == 'r') {
                if (count[1] > 0) {
                    count[1]--;
                    count[2]++;
                }
            } else if (c == 'o') {
                if (count[2] > 0) {
                    count[2]--;
                    count[3]++;
                }
            } else if (c == 'a') {
                if (count[3] > 0) {
                    count[3]--;
                    count[4]++;
                }
            }else if (c == 'k') {
                 if (count[4] > 0) {
                    count[4]--;
                    count[5]++;
                    end.add(i);
                // 找到这个呱对应的开始位置
                int startIndex = starts.getFirst();
                starts.removeFirst();
                
                // 找到对应开始之后第一个呱结束的序号
                while (end.get(lastEndIndex) <= startIndex) {
                    lastEndIndex++;
                }
                // 计算中间有多少个青蛙同时呱
                int num = end.size() - lastEndIndex;
                ret = Math.max(ret, num);
                }
                
            }
        }
        // 判断是否都呱完了
        for (int i = 1; i < count.length - 1; i++) {
            if (count[i] != 0) {
                return -1;
            }
        }
        return ret;
    }
}
```

## [1420. Build Array Where You Can Find The Maximum Exactly K Comparisons](https://leetcode.com/problems/build-array-where-you-can-find-the-maximum-exactly-k-comparisons/)

![](https://assets.leetcode.com/uploads/2020/04/02/e.png)
```
Difficulty:Hard
Given three integers n, m and k. Consider the following algorithm to find the maximum element of an array of positive integers:


You should build the array arr which has the following properties:

arr has exactly n integers.
1 <= arr[i] <= m where (0 <= i < n).
After applying the mentioned algorithm to arr, the value search_cost is equal to k.
Return the number of ways to build the array arr under the mentioned conditions. As the answer may grow large, the answer must be computed modulo 10^9 + 7.

 

Example 1:

Input: n = 2, m = 3, k = 1
Output: 6
Explanation: The possible arrays are [1, 1], [2, 1], [2, 2], [3, 1], [3, 2] [3, 3]
Example 2:

Input: n = 5, m = 2, k = 3
Output: 0
Explanation: There are no possible arrays that satisify the mentioned conditions.
Example 3:

Input: n = 9, m = 1, k = 1
Output: 1
Explanation: The only possible array is [1, 1, 1, 1, 1, 1, 1, 1, 1]
Example 4:

Input: n = 50, m = 100, k = 25
Output: 34549172
Explanation: Don't forget to compute the answer modulo 1000000007
Example 5:

Input: n = 37, m = 17, k = 7
Output: 418930126
 

Constraints:

1 <= n <= 50
1 <= m <= 100
0 <= k <= n
```

这个题目也挺有意思的，代码表达的意思就是遍历数组，如果这个数比之前的所有数都大，那么cost+1。然后让我们求给定的n，m，cost，有多少种排列组合。其实鸡贼点看到限制条件就知道这个是一个复杂度很爆炸的题目。结果还需要求模。综上，凭直觉应该能判断这是一个DP问题，所以我们需要找到表达式。而且maximum_value是一个非常关键的无后效性的值，更坚定了是DP。

我们先发掘一下有哪些变量。一个肯定是数组长度l。一个是剩余的cost，记为c。另外一个肯定和当时的maxium_value有关，记为v。

那么初始的状态S(v,c,l)就是S(-1,k,n),那么怎么往后走呢。最直接的就是让数组最左边的位置从1->m遍历所有值，然后l就减小了，假设数组最左边的值为x，那么根据v的大小，我们就有两种子情况:
* S(v, c, l - 1)            -> x <= v 
* S(x, c - 1, l - 1)        -> x > v

再判断边界条件，当l=0时，如果c=0，那么是ok的，如果c！=0，那么表示这个方案不对。

推导式出来我们就可以写代码了
```
class Solution {
    // 存中间结果
  Integer[][][] mem;


    public int numOfArrays(int n, int m, int k) {
        mem = new Integer[m + 1][n + 1][k + 1];
        // 因为不能用-1，数字一定大于0，所以用相同的0替代
        return dothing(m, 0, n, k);
    }

    // v 表示此时的maximun_value， n表示剩下的数组长，c表示剩余的cost 
    private int dothing(int m, int v, int n, int c) {
        if (mem[v][n][c] != null) {
            return mem[v][n][c];
        }

        if (n == 0) {
            if (c == 0) {
                mem[v][n][c] = 1;
                return mem[v][n][c];
            } else {
                mem[v][n][c] = 0;
                return mem[v][n][c];
            }
        }
        int ret = 0;
        if (v > 0) {
            int temp = dothing(m, v, n - 1, c);
            // 这里不能直接 temp * v，取模会出问题，我在这里被坑了15分钟，感觉自己是太二真人
            for (int i = 1; i <= v; i++) {
                ret += temp;
                ret = ret % 1000000007;
            }
        }
        if (c > 0) {
            for (int i = Math.max(v + 1, 1); i <= m; i++) {
                ret += dothing(m, i, n -1, c - 1);
                ret = ret % 1000000007;
                
            }
        }
    
        mem[v][n][c] = ret;
        return ret;

    }
}
```



