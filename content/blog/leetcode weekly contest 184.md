---
title: leetcode weekly contest 184 
date: 2020-04-11 22:04:24
tags: [leetcode, contest] 
---
本来想喝着小酒写作业的，刚好看到今天星期六，就顺手做了一下leetcode contest，没想到drunk code如此给力，就趁热打铁把思路写出来了。因为四个题加起来只用了不到一小时，勉强可以认为符合实际的做题时间，算是一种实际面试的模拟吧。

## [1 String Matching in an Array](https://leetcode.com/problems/string-matching-in-an-array/)

Difficulty:Easy 

Given an array of string words. Return all strings in words which is substring of another word in any order. 

String words[i] is substring of words[j], if can be obtained removing some characters to left and/or right side of words[j].
```
Example 1:

Input: words = ["mass","as","hero","superhero"]
Output: ["as","hero"]
Explanation: "as" is substring of "mass" and "hero" is substring of "superhero".
["hero","as"] is also a valid answer.

Example 2:
Input: words = ["leetcode","et","code"]
Output: ["et","code"]
Explanation: "et", "code" are substring of "leetcode".

Example 3:
Input: words = ["blue","green","bu"]
Output: []
```

题目的难度是easy，实际也很简单，最直观的就是两次遍历一个个判断，然后简单优化一下就是按长度从长到短排序，因为短的只能是长的的substring，而且如果a是b的substring，b是c的substring，那么a必定是c的substring。而且题目说没有重复的string，所以可以分成两个集合，一个集合存substrings，一个存nonsubstrings。虽然都是$n^2$，但是优化之后比较次数会少很多。至于nlogn的暂时没有什么想法，也没有面试官给我hint，所以直接就写了。

答案：
```
class Solution {
    public List<String> stringMatching(String[] words) {
        Set<String> set = new HashSet<>();
        
        List<String> ret = new LinkedList<>();

        Arrays.sort(words, (x, y) -> y.length() - x.length());
        
        for (String word : words) {
            if (set.stream().anyMatch(ele -> ele.contains(word))) {
                ret.add(word);
            } else {
                set.add(word);
            }
        }
        return ret;
    }
}
```


## [2. Queries on a Permutation With Key](https://leetcode.com/problems/queries-on-a-permutation-with-key/)

Difficulty:Medium

Given the array queries of positive integers between 1 and m, you have to process all queries[i] (from i=0 to i=queries.length-1) according to the following rules:

In the beginning, you have the permutation P=[1,2,3,...,m].
For the current i, find the position of queries[i] in the permutation P (indexing from 0) and then move this at the beginning of the permutation P. Notice that the position of queries[i] in P is the result for queries[i].
Return an array containing the result for the given queries.

```
Example 1:

Input: queries = [3,1,2,1], m = 5
Output: [2,1,2,1] 
Explanation: The queries are processed as follow: 
For i=0: queries[i]=3, P=[1,2,3,4,5], position of 3 in P is 2, then we move 3 to the beginning of P resulting in P=[3,1,2,4,5]. 
For i=1: queries[i]=1, P=[3,1,2,4,5], position of 1 in P is 1, then we move 1 to the beginning of P resulting in P=[1,3,2,4,5]. 
For i=2: queries[i]=2, P=[1,3,2,4,5], position of 2 in P is 2, then we move 2 to the beginning of P resulting in P=[2,1,3,4,5]. 
For i=3: queries[i]=1, P=[2,1,3,4,5], position of 1 in P is 1, then we move 1 to the beginning of P resulting in P=[1,2,3,4,5]. 
Therefore, the array containing the result is [2,1,2,1].  

Example 2:

Input: queries = [4,1,2,2], m = 4
Output: [3,1,2,0]

Example 3:

Input: queries = [7,5,5,8,3], m = 8
Output: [6,5,0,7,5]
```

题目本身有点绕，但是实际上理解了之后还是比较简单的。如果不考虑优化，就是数组操作而已。理论上重拍如果rangecopy的话，时间复杂度是o(1)，如果能找到一个合适的查找算法让每次查找都是o(1)或者o(lgn)的话，那么会更快，但是时间有限，没想到，所以就用最之间的o(n)的查找，那么总的时间复杂度就是o(nlgn)。

答案：
```
class Solution {
    public int[] processQueries(int[] queries, int m) {
        int[] r = new int[queries.length];
        int[] ret = new int[m];
        for (int i = 0; i< ret.length; i++) {
            ret[i] = i+1;
        }

        for (int i = 0; i < queries.length; i++) {
            int target = queries[i];
            int index = -1;
            for (int j = 0; j < ret.length; j++) {
                if (ret[j] == target) {
                    index = j;
                    r[i] = index;
                    break;
                }
            }
            // 最好是用rangecopy效率高，但是懒得翻api了就直接怼
            int[] newret = new int[m];
            newret[0] = target;
            for (int i1 = 0; i1 < index; i1++) {
                newret[i1+1] = ret[i1];
            }
            for (int i2 = index + 1; i2 < ret.length; i2++) {
                newret[i2] = ret[i2];
            }
            ret = newret;
        }
        return r;
    }
}
```



## [3. HTML Entity Parser](https://leetcode.com/problems/html-entity-parser/)

Difficulty:Medium
HTML entity parser is the parser that takes HTML code as input and replace all the entities of the special characters by the characters itself.

The special characters and their entities for HTML are:

Quotation Mark: the entity is &quot; and symbol character is ".
Single Quote Mark: the entity is &apos; and symbol character is '.
Ampersand: the entity is &amp; and symbol character is &.
Greater Than Sign: the entity is &gt; and symbol character is >.
Less Than Sign: the entity is &lt; and symbol character is <.
Slash: the entity is &frasl; and symbol character is /.
Given the input text string to the HTML parser, you have to implement the entity parser.

Return the text after replacing the entities by the special characters.

```
Example 1:

Input: text = "&amp; is an HTML entity but &ambassador; is not."
Output: "& is an HTML entity but &ambassador; is not."
Explanation: The parser will replace the &amp; entity by &

Example 2:

Input: text = "and I quote: &quot;...&quot;"
Output: "and I quote: \"...\""

Example 3:

Input: text = "Stay home! Practice on Leetcode :)"
Output: "Stay home! Practice on Leetcode :)"

Example 4:

Input: text = "x &gt; y &amp;&amp; x &lt; y is always false"
Output: "x > y && x < y is always false"

Example 5:

Input: text = "leetcode.com&frasl;problemset&frasl;all"
Output: "leetcode.com/problemset/all"
```

这个其实也没有什么难度，就是字符串操作。但是实际上我写的时候喝多了点，脑子有点短路，是用最后的`;`做判断是否进入对比的流程。实际上用开始的`&`会更方便些。总的来说就是一个个扫描，如果碰到了`&`，那么就进行对比，符合的话就转换。

答案：
```
class Solution {
    public String entityParser(String text) {
        StringBuffer sb = new StringBuffer();
        int cursor = text.length() - 1;
        while (cursor >= 0) {
            if (text.charAt(cursor) != ';') {
                sb.insert(0, text.charAt(cursor));
                cursor--;
            } else {
                if (cursor >= 3 &&"&lt".equals(text.substring(cursor - 3, cursor))) {
                    sb.insert(0, "<");
                    cursor = cursor - 4;
                } else if (cursor >= 3 && "&gt".equals(text.substring(cursor - 3, cursor))) {
                    sb.insert(0, ">");
                    cursor = cursor - 4;
                } else if (cursor >= 4 && "&amp".equals(text.substring(cursor - 4, cursor))) {
                    sb.insert(0, "&");
                    cursor = cursor - 5;
                } else if (cursor >= 5 && "&apos".equals(text.substring(cursor - 5, cursor))) {
                    sb.insert(0, "'");
                    cursor = cursor - 6;
                } else if (cursor >= 5 && "&quot".equals(text.substring(cursor - 5, cursor))) {
                    sb.insert(0, "\"");
                    cursor = cursor - 6;
                } else if (cursor >= 6 && "&frasl".equals(text.substring(cursor - 6, cursor))) {
                    sb.insert(0, "/");
                    cursor = cursor - 7;
                } else {
                    sb.insert(0, text.charAt(cursor));
                    cursor--;
                }
            }
        }
        return sb.toString();
    }
}
```

## [4. Number of Ways to Paint N × 3 Grid](https://leetcode.com/problems/number-of-ways-to-paint-n-3-grid/)
Difficulty:Hard
You have a grid of size n x 3 and you want to paint each cell of the grid with exactly one of the three colours: Red, Yellow or Green while making sure that no two adjacent cells have the same colour (i.e no two cells that share vertical or horizontal sides have the same colour).

You are given n the number of rows of the grid.

Return the number of ways you can paint this grid. As the answer may grow large, the answer must be computed modulo 10^9 + 7.


```
Example 1:

Input: n = 1
Output: 12
Explanation: There are 12 possible way to paint the grid as shown:

Example 2:

Input: n = 2
Output: 54

Example 3:

Input: n = 3
Output: 246

Example 4:

Input: n = 7
Output: 106494

Example 5:

Input: n = 5000
Output: 30228214
```

这个题目有点意思，一看就是一个数学题。本来着色问题是很难的，但是因为他有两个限制，一个是宽度只有3，第二个是颜色只有3个，所以简单了非常多。也是我运气比较好，一开始就想到了一个思路。因为他是3*n的形状，那么填第i行的时候，只需要收到第i-1行的限制。而example告诉我们，一行只有12种可能，那么直接找出12个可能中每个可能所对应的所有下一行的可能就可以以此类推了。

而且，我们可以进一步简化，因为颜色其实是对等的，所以我们可以直接撇去颜色，思考一个更简化的模型。就是一行着色中只有两种可能，一种是有两种颜色，简称为A模式，一种是有三种颜色，称为B模式。

假设有XYZ三种颜色。XYZ只代表他们颜色不同，不代表具体的颜色。

A模式的色彩分布必定为XYX，X和Y为任意不同颜色。其对应的下一行必定为 YXY，YZY，YZX，ZXZ，ZXY，下一行有5中可能，3中是A模式，2种是B模式

同理，B模式的色彩分布必定是XYZ，其对应的下一行必然为 YXY，YZY，YZX，ZXY。2中A模式，2种B模式。

那么我们就可以开始递推了。假如涂色涂到了第i行，其中有n中可能为A模式，m种可能为B模式，那么第i+1行有(3n+2m)种可能为A模式，(2n+2m)种可能为B模式。

所以代码很简单

```
class Solution {
    public int numOfWays(int n) {
        long a = 6;
        long b = 6;
        for (int i = 1; i < n; i++) {
            long aa = (3 * a + 2 * b) % 1000000007;
            long bb = (2 * a + 2 * b) % 1000000007;
            a = aa;
            b = bb;
        }
        return (int)((a+b) % 1000000007) ;
    }
}
```