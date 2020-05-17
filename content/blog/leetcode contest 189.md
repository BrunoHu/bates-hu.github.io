---
title: leetcode contest 189
date: 2020-05-16 21:05:64
tags: [leetcode, contest] 
---

## [1450. Number of Students Doing Homework at a Given Time](https://leetcode.com/problems/number-of-students-doing-homework-at-a-given-time/)

Difficulty:Easy
```
Given two integer arrays startTime and endTime and given an integer queryTime.

The ith student started doing their homework at the time startTime[i] and finished it at time endTime[i].

Return the number of students doing their homework at time queryTime. More formally, return the number of students where queryTime lays in the interval [startTime[i], endTime[i]] inclusive.

 

Example 1:

Input: startTime = [1,2,3], endTime = [3,2,7], queryTime = 4
Output: 1
Explanation: We have 3 students where:
The first student started doing homework at time 1 and finished at time 3 and wasn't doing anything at time 4.
The second student started doing homework at time 2 and finished at time 2 and also wasn't doing anything at time 4.
The third student started doing homework at time 3 and finished at time 7 and was the only student doing homework at time 4.
Example 2:

Input: startTime = [4], endTime = [4], queryTime = 4
Output: 1
Explanation: The only student was doing their homework at the queryTime.
Example 3:

Input: startTime = [4], endTime = [4], queryTime = 5
Output: 0
Example 4:

Input: startTime = [1,1,1,1], endTime = [1,3,2,4], queryTime = 7
Output: 0
Example 5:

Input: startTime = [9,8,7,6,5,4,3,2,1], endTime = [10,10,10,10,10,10,10,10,10], queryTime = 5
Output: 5
 

Constraints:

startTime.length == endTime.length
1 <= startTime.length <= 100
1 <= startTime[i] <= endTime[i] <= 1000
1 <= queryTime <= 1000
```
没什么好说的，就是遍历
```
class Solution {
    public int busyStudent(int[] startTime, int[] endTime, int queryTime) {
        int cnt = 0;
        for (int i = 0; i < startTime.length; i++) {
            if (startTime[i] <= queryTime && endTime[i] >= queryTime) {
                cnt++;
            }
        }
        return cnt;
    }
}
```


## [1451. Rearrange Words in a Sentence](https://leetcode.com/problems/rearrange-words-in-a-sentence/)
Medium

```
Given a sentence text (A sentence is a string of space-separated words) in the following format:

First letter is in upper case.
Each word in text are separated by a single space.
Your task is to rearrange the words in text such that all words are rearranged in an increasing order of their lengths. If two words have the same length, arrange them in their original order.

Return the new text following the format shown above.

 

Example 1:

Input: text = "Leetcode is cool"
Output: "Is cool leetcode"
Explanation: There are 3 words, "Leetcode" of length 8, "is" of length 2 and "cool" of length 4.
Output is ordered by length and the new first word starts with capital letter.
Example 2:

Input: text = "Keep calm and code on"
Output: "On and keep calm code"
Explanation: Output is ordered as follows:
"On" 2 letters.
"and" 3 letters.
"keep" 4 letters in case of tie order by position in original text.
"calm" 4 letters.
"code" 4 letters.
Example 3:

Input: text = "To be or not to be"
Output: "To be or to be not"
 

Constraints:

text begins with a capital letter and then contains lowercase letters and single space between words.
1 <= text.length <= 10^5
```
这个也没有什么算法的问题，就是重新排序。注意一下第一位就可以，用map来辅助或者一个记录位置的map来辅助sort也可以。

```
class Solution {
    public String arrangeWords(String text) {
        String[] words = text.split(" ");
        Map<Integer, List<String>> map = new HashMap<>();
        for (String word : words) {
            map.putIfAbsent(word.length(), new ArrayList<>());
            map.get(word.length()).add(word.toLowerCase());
        }
        List<Integer> lens = new ArrayList<>(map.keySet());
        lens.sort(Comparator.comparingInt(x->x));
        List<String> ret = new ArrayList<>();
        for (int len : lens) {
            ret.addAll(map.get(len));
        }
        String first = ret.get(0);
        char newFirst = (char) (first.charAt(0) + ('A' - 'a'));
        StringBuffer newS = new StringBuffer(first);
        newS.setCharAt(0, newFirst);
        ret.set(0, newS.toString());
        return String.join(" ", ret);
    }
}
```

## [1452. People Whose List of Favorite Companies Is Not a Subset of Another List](https://leetcode.com/problems/people-whose-list-of-favorite-companies-is-not-a-subset-of-another-list/)
Medium
```
Given the array favoriteCompanies where favoriteCompanies[i] is the list of favorites companies for the ith person (indexed from 0).

Return the indices of people whose list of favorite companies is not a subset of any other list of favorites companies. You must return the indices in increasing order.

 

Example 1:

Input: favoriteCompanies = [["leetcode","google","facebook"],["google","microsoft"],["google","facebook"],["google"],["amazon"]]
Output: [0,1,4] 
Explanation: 
Person with index=2 has favoriteCompanies[2]=["google","facebook"] which is a subset of favoriteCompanies[0]=["leetcode","google","facebook"] corresponding to the person with index 0. 
Person with index=3 has favoriteCompanies[3]=["google"] which is a subset of favoriteCompanies[0]=["leetcode","google","facebook"] and favoriteCompanies[1]=["google","microsoft"]. 
Other lists of favorite companies are not a subset of another list, therefore, the answer is [0,1,4].
Example 2:

Input: favoriteCompanies = [["leetcode","google","facebook"],["leetcode","amazon"],["facebook","google"]]
Output: [0,1] 
Explanation: In this case favoriteCompanies[2]=["facebook","google"] is a subset of favoriteCompanies[0]=["leetcode","google","facebook"], therefore, the answer is [0,1].
Example 3:

Input: favoriteCompanies = [["leetcode"],["google"],["facebook"],["amazon"]]
Output: [0,1,2,3]
 

Constraints:

1 <= favoriteCompanies.length <= 100
1 <= favoriteCompanies[i].length <= 500
1 <= favoriteCompanies[i][j].length <= 20
All strings in favoriteCompanies[i] are distinct.
All lists of favorite companies are distinct, that is, If we sort alphabetically each list then favoriteCompanies[i] != favoriteCompanies[j].
All strings consist of lowercase English letters only.
```

一开始我还想着用什么算法能跳过暴力求解，后面想了十分钟想不到就直接暴力解了。发现也可以accept，唯一一个优化就是如果确定了一个人喜欢的公司是另外一个人的子集，那么这个人就不需要被比较了。暴力解法如下，就是直接一次次遍历。

```
class Solution {
     public List<Integer> peopleIndexes(List<List<String>> favoriteCompanies) {
        List<Integer> indexs = new ArrayList<>();
        List<Set<String>> r = new ArrayList<>();
        for (List<String> comps : favoriteCompanies) {
            r.add(new HashSet<>(comps));
        }
        Set<Integer> shouldPass = new HashSet<>();

        for (int i = 0; i < favoriteCompanies.size(); i++) {
            for (int j = 0; j < favoriteCompanies.size(); j++) {
                if (j == i || shouldPass.contains(j)) {
                    continue;
                }
                if (isSub(r.get(i), r.get(j))) {
                    shouldPass.add(i);
                    break;
                }
            }
            if (!shouldPass.contains(i)) {
                indexs.add(i);
            }   
        }
        return indexs;
    }
    
    private boolean isSub(Set<String> l1, Set<String> l2) {
        for (String comp : l1) {
            if (!l2.contains(comp)) {
                return false;
            }
        }
        return true;
    }
}
```

## [1453. Maximum Number of Darts Inside of a Circular Dartboard](https://leetcode.com/problems/maximum-number-of-darts-inside-of-a-circular-dartboard/)
Hard

You have a very large square wall and a circular dartboard placed on the wall. You have been challenged to throw darts into the board blindfolded. Darts thrown at the wall are represented as an array of points on a 2D plane. 

Return the maximum number of points that are within or lie on any circular dartboard of radius r.

 

Example 1:

![](https://assets.leetcode.com/uploads/2020/04/29/sample_1_1806.png)

```
Input: points = [[-2,0],[2,0],[0,2],[0,-2]], r = 2
Output: 4
Explanation: Circle dartboard with center in (0,0) and radius = 2 contain all points.
```

Example 2:

![](https://assets.leetcode.com/uploads/2020/04/29/sample_2_1806.png)

```
Input: points = [[-3,0],[3,0],[2,6],[5,4],[0,9],[7,8]], r = 5
Output: 5
Explanation: Circle dartboard with center in (0,4) and radius = 5 contain all points except the point (7,8).
```

Example 3:

```
Input: points = [[-2,0],[2,0],[0,2],[0,-2]], r = 1
Output: 1
```

Example 4:

```
Input: points = [[1,2],[3,5],[1,-1],[2,3],[4,1],[1,3]], r = 2
Output: 4
```

Constraints:
```
1 <= points.length <= 100
points[i].length == 2
-10^4 <= points[i][0], points[i][1] <= 10^4
1 <= r <= 5000
```

这个题目其实挺有意思的，真的是很好的将算法和数学结合起来了。一开始是按题目的思路想着怎么用圆去覆盖他们。但是因为圆心的位置是float的，不可能全部遍历，所以只能换一种思路。后面想到了，最小覆盖圆的方法。y原理是这样的，如果有一个半径为r的圆能最多覆盖n个点，那么必然存在一个子圆，同样覆盖n个相同的点，且有至少两个点在子圆的边界上。两个点可以用直径确定一个圆，而三个点可以唯一确定一个圆。那么整个计算的过程就是这样的，遍历两个点和三个点的组合，确定其对应的圆，如果半径比r小，那么计算有多少个其他点在圆中，如此得到那个能包含最多点的子圆。然后其中注意一下double的计算判断是否包含要留一些buffer。

```
class Solution {
    public int numPoints(int[][] points, int r) {
        int maxCount = 1;

        for (int i = 0; i < points.length; i++) {
            for (int j = i + 1; j < points.length; j++) {
                List<Double> twoPointCir = decideCircle(points[i], points[j]);
                int cc = 2;
                if (twoPointCir.get(2) > r * 1.0001) {
                    continue;
                }
                for (int m = 0; m < points.length; m++) {
                    if (m == i || m == j) {
                        continue;
                    }
                    if (isIn(twoPointCir, points[m])){
                        cc++;
                    }
                }
                maxCount = Math.max(maxCount, cc);
                
                
                for (int k = j + 1; k < points.length; k++) {
                    List<Double> cir = decideCircle(points[i], points[j], points[k]);
                    if (cir == null) {
                        continue;
                    }
                    if (cir.get(2) > r) {
                        continue;
                    }
                    int cnt = 3;
                    for (int m = 0; m < points.length; m++) {
                        if (m == i || m == j || m == k) {
                            continue;
                        }
                        if (isIn(cir, points[m])){
                            cnt++;
                        }
                    }
                    maxCount = Math.max(maxCount, cnt);
                }
            }
        }
        return maxCount;
    }
    private double distance(int[] d1, int[] d2) {
        double x = d1[0] - d2[0];
        double y = d1[1] - d2[1];
        return Math.sqrt(x * x + y * y);
    }
    private List<Double> decideCircle(int[] d1, int[] d2) {
        double dis = distance(d1, d2);
        double x0 = (d1[0] + d2[0]) / 2.0;
        double y0 = (d1[1] + d2[1]) / 2.0;
        return Arrays.asList(x0, y0, dis / 2.0);
    }
    
    // x0, y0, r
    private List<Double> decideCircle(int[] d1, int[] d2, int[] d3) {
        double a = d1[0] - d2[0];
        double b = d1[1] - d2[1];
        double c = d1[0] - d3[0];
        double d = d1[1] - d3[1];
        double a1 = ((d1[0] * d1[0] - d2[0] * d2[0]) + (d1[1] * d1[1] - d2[1] * d2[1])) / 2.0;
        double a2 = ((d1[0] * d1[0] - d3[0] * d3[0]) + (d1[1] * d1[1] - d3[1] * d3[1])) / 2.0;
        double theta = b * c - a * d;
        if (Math.abs(theta) < 0.00001) {
            return null;
        }
        double x0 = (b * a2 - d * a1) / theta;
        double y0 = (c * a1 - a * a2) / theta;
        double r = Math.sqrt((d1[0] - x0) * (d1[0] - x0) + (d1[1] - y0) * (d1[1] - y0));
        return Arrays.asList(x0, y0, r);
    }

    private boolean isIn(List<Double> circle, int[] dot) {
        double x0 = circle.get(0);
        double y0 = circle.get(1);
        double r = circle.get(2);
        double disSquare = (x0 - dot[0]) * (x0 - dot[0]) + (y0 - dot[1]) * (y0 - dot[1]);
        return disSquare < r * r * 1.0001;
    }
}
```