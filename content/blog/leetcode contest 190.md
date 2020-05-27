---
title: leetcode contest 190
date: 2020-05-27 00:05:11
tags: [leetcode, contest] 
---

现在才发现那些定时更新的up主真的挺有毅力，我连这种周更都经常会犯懒拖更。这一次的contest也按时写完啦，而且第四题还是比较常规的dp哦。

## [1455. Check If a Word Occurs As a Prefix of Any Word in a Sentence](https://leetcode.com/problems/check-if-a-word-occurs-as-a-prefix-of-any-word-in-a-sentence/)
Easy

```
Given a sentence that consists of some words separated by a single space, and a searchWord.

You have to check if searchWord is a prefix of any word in sentence.

Return the index of the word in sentence where searchWord is a prefix of this word (1-indexed).

If searchWord is a prefix of more than one word, return the index of the first word (minimum index). If there is no such word return -1.

A prefix of a string S is any leading contiguous substring of S.

 

Example 1:

Input: sentence = "i love eating burger", searchWord = "burg"
Output: 4
Explanation: "burg" is prefix of "burger" which is the 4th word in the sentence.
Example 2:

Input: sentence = "this problem is an easy problem", searchWord = "pro"
Output: 2
Explanation: "pro" is prefix of "problem" which is the 2nd and the 6th word in the sentence, but we return 2 as it's the minimal index.
Example 3:

Input: sentence = "i am tired", searchWord = "you"
Output: -1
Explanation: "you" is not a prefix of any word in the sentence.
Example 4:

Input: sentence = "i use triple pillow", searchWord = "pill"
Output: 4
Example 5:

Input: sentence = "hello from the other side", searchWord = "they"
Output: -1
 

Constraints:

1 <= sentence.length <= 100
1 <= searchWord.length <= 10
sentence consists of lowercase English letters and spaces.
searchWord consists of lowercase English letters.
```

没什么难度，就是写。

```
class Solution {
    public int isPrefixOfWord(String sentence, String searchWord) {
        String[] strings = sentence.split(" ");
        for (int i = 0; i < strings.length; i++) {
            if (strings[i].length() >= searchWord.length() && strings[i].startsWith(searchWord)) {
                return i+1;
            }
        }
        return -1;
    }
}
```

## [1456. Maximum Number of Vowels in a Substring of Given Length](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/)
Medium

```
Given a string s and an integer k.

Return the maximum number of vowel letters in any substring of s with length k.

Vowel letters in English are (a, e, i, o, u).

 

Example 1:

Input: s = "abciiidef", k = 3
Output: 3
Explanation: The substring "iii" contains 3 vowel letters.
Example 2:

Input: s = "aeiou", k = 2
Output: 2
Explanation: Any substring of length 2 contains 2 vowels.
Example 3:

Input: s = "leetcode", k = 3
Output: 2
Explanation: "lee", "eet" and "ode" contain 2 vowels.
Example 4:

Input: s = "rhythms", k = 4
Output: 0
Explanation: We can see that s doesn't have any vowel letters.
Example 5:

Input: s = "tryhard", k = 4
Output: 1
 

Constraints:

1 <= s.length <= 10^5
s consists of lowercase English letters.
1 <= k <= s.length
```

典型的滑动窗口，双指针干就完了
```
class Solution {
    public int maxVowels(String s, int k) {
        int left = 0;
        int right = k;
        
        int now = 0;
        for (int i = left; i < k; i++) {
            if (isV(s.charAt(i))) {
                now++;
            }
        }
        int max = now;
        
        
        while (right < s.length()) {
            if (isV(s.charAt(right))) {
                now++;
            }
            right++;
            if (isV(s.charAt(left))) {
                now--;
            }
            left++;
            max = Math.max(now, max);
        }
        return max;
    }

    private boolean isV(char c) {
        return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
    }
}
```

## [1457. Pseudo-Palindromic Paths in a Binary Tree](https://leetcode.com/problems/pseudo-palindromic-paths-in-a-binary-tree/)

Medium

Given a binary tree where node values are digits from 1 to 9. A path in the binary tree is said to be pseudo-palindromic if at least one permutation of the node values in the path is a palindrome.

Return the number of pseudo-palindromic paths going from the root node to leaf nodes.

 
Example 1:

![](https://assets.leetcode.com/uploads/2020/05/06/palindromic_paths_1.png)
```
Input: root = [2,3,1,3,1,null,1]
Output: 2 
Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the red path [2,3,3], the green path [2,1,1], and the path [2,3,1]. Among these paths only red path and green path are pseudo-palindromic paths since the red path [2,3,3] can be rearranged in [3,2,3] (palindrome) and the green path [2,1,1] can be rearranged in [1,2,1] (palindrome).
```

Example 2:

![](https://assets.leetcode.com/uploads/2020/05/07/palindromic_paths_2.png)


```
Input: root = [2,1,1,1,3,null,null,null,null,null,1]
Output: 1 
Explanation: The figure above represents the given binary tree. There are three paths going from the root node to leaf nodes: the green path [2,1,1], the path [2,1,3,1], and the path [2,1]. Among these paths only the green path is pseudo-palindromic since [2,1,1] can be rearranged in [1,2,1] (palindrome).
```

Example 3:

```
Input: root = [9]
Output: 1
```

Constraints:
```
The given binary tree will have between 1 and 10^5 nodes.
Node values are digits from 1 to 9.
```

这个题目可以理解为DFS也可以看成是backtrace，就是遍历每一条路径，在遍历的时候记录路径中各个数值的量，只有路径有不超过一个值为奇数才是回文数。

```
class Solution {
    int lines = 0;
    int[] count = new int[10];
    
    public int pseudoPalindromicPaths (TreeNode root) {
        walk(root);
        return lines;
    }
    
    public void walk(TreeNode root) {
        count[root.val]++;
        if (root.left != null) {
            pseudoPalindromicPaths(root.left);
        }
        if (root.right != null) {
            pseudoPalindromicPaths(root.right);
        }
        if (root.left == null && root.right == null) {
            if (isPseudoP(count)) {
                lines++;
            }
        }
        count[root.val]--;
    }
    
    private boolean isPseudoP(int[] count) {
        int oddNum = 0;
        for (int i = 1; i < count.length; i++) {
            if (count[i] % 2 == 1) {
                oddNum++;
            }
        }
        return oddNum <= 1;
    }
}
```


## [1458. Max Dot Product of Two Subsequences](https://leetcode.com/problems/max-dot-product-of-two-subsequences/)
Hard

```
Given two arrays nums1 and nums2.

Return the maximum dot product between non-empty subsequences of nums1 and nums2 with the same length.

A subsequence of a array is a new array which is formed from the original array by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, [2,3,5] is a subsequence of [1,2,3,4,5] while [1,5,3] is not).

 

Example 1:

Input: nums1 = [2,1,-2,5], nums2 = [3,0,-6]
Output: 18
Explanation: Take subsequence [2,-2] from nums1 and subsequence [3,-6] from nums2.
Their dot product is (2*3 + (-2)*(-6)) = 18.
Example 2:

Input: nums1 = [3,-2], nums2 = [2,-6,7]
Output: 21
Explanation: Take subsequence [3] from nums1 and subsequence [7] from nums2.
Their dot product is (3*7) = 21.
Example 3:

Input: nums1 = [-1,-1], nums2 = [1,1]
Output: -1
Explanation: Take subsequence [-1] from nums1 and subsequence [1] from nums2.
Their dot product is -1.
 
Constraints:
1 <= nums1.length, nums2.length <= 500
-1000 <= nums1[i], nums2[i] <= 1000
```

真的题目做多了会有感觉的，这种subsequence很容易让人想到没有后效性，因为前后的元素关联不大。所以我们可以找找这个递推关系。很自然的，我们可以假设$m(i,j)$表示只用list1的前i+1个数，只用list2的前j+1个数，可以得到的最大结果是什么。很自然的，他的最直接的子问题就是$m(i-1,j)$和$m(i,j-1)$，那么我们就可以分情况了

* 情况1，不用list1(i),那么m(i,j) = m(i-1,j)
* 情况2，不用list2(j),那么m(i,j) = m(i,j-1)
* 情况3，都不用，那么m(i,j) = m(i-1, j-1)
* 情况4，配对list1(i) 和 list2（j）,那么m(i,j) = m(i-1,j-1) + l1(i) * l2(j)
求四个情况的最大值

公式如下

```
m(i,j) = max(
    m(i-1, j),
    m(i, j-1),
    m(i-1,j-1),
    m(i-1,j-1) + l1(i) * l2(j)
)
```
公式在手，dp我有，之后注意一下边界条件就行。代码如下。

```
class Solution {
    public int maxDotProduct(int[] nums1, int[] nums2) {
        dp[][] = new int[nums1.length][mnums2.length];
        for (int i = 0; i < nums1.length; i++) {
            for (int j = 0; j < nums2.length; j++) {
                dp[i][j] = A[i] * B[j];
                if (i > 0 && j > 0) dp[i][j] += Math.max(dp[i-1][j-1], 0);
                if (i > 0) dp[i][j] = Math.max(dp[i][j], dp[i-1][j]);
                if (j > 0) dp[i][j] = Math.max(dp[i][j], dp[i][j - 1]);
            }
        }
        return dp[n-1][m-1];
    }
}
```