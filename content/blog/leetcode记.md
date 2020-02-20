---
title: leetcode记（持续更新中）
date: 2016-02-29 17:45:58
description:
tags:
- 算法
- python
---

This is a personal answers of leetcode problem. My aim is to find the fast way to solve the problems by python. In some cases, the time or space complexity may be sacrificed. All the problems sorted by AC rate.

# No.292 [Nim game](https://leetcode.com/problems/nim-game/)

> You are playing the following Nim Game with your friend: There is a heap of stones on the table, each time one of you take turns to remove 1 to 3 stones. The one who removes the last stone will be the winner. You will take the first turn to remove the stones.
Both of you are very clever and have optimal strategies for the game. Write a function to determine whether you can win the game given the number of stones in the heap.
For example, if there are 4 stones in the heap, then you will never win the game: no matter 1, 2, or 3 stones you remove, the last stone will always be removed by your friend.

The introduction leaks the most important hint that if there are 4 stones left and you are the first, you will never win. So, our aim is to let the opponent to face this situation. Obviously, if you are the first and can not make the number of left stones as 4n, you must lose. This is a math problem and code is nonsence.

```
class Solution(object):
    def canWinNim(self, n):
        """
        :type n: int
        :rtype: bool
        """
        if n%4 == 0:
            return False
        else:
            return True
```

# No.136 [Single Number](https://leetcode.com/problems/single-number/)

> Given an array of integers, every element appears twice except for one. Find that single one.

Very common problem, set function is a very simple solution of these kind of problem.

```
class Solution(object):
    def singleNumber(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        return sum(set(nums))*2-sum(nums)
```

# No.258 [Add Digits](https://leetcode.com/problems/add-digits/)

> Given a non-negative integer num, repeatedly add all its digits until the result has only one digit.

Python flexible str and list function will solve the problem　concisely.

```
class Solution(object):
    def addDigits(self, num):
        """
        :type num: int
        :rtype: int
        """
        if len(list(str(num))) == 1:
            return sum(map(int,list(str(num))))
        else:
            return self.addDigits(sum(map(int,list(str(num)))))
```

# No.104 [Maximun Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

> Given a binary tree, find its maximum depth.

> The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Basic algorithm problem. Recursion is the simplist solution.

```
class Solution(object):
    def maxDepth(self, root):
        """
        :type root: TreeNode
        :rtype: int
        """
        if root == None:
            return 0
        else:
            return max(self.maxDepth(root.left),self.maxDepth(root.right)) + 1
```

# No.226 [Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)

> Invert a binary tree.
> ```
     4
   /   \
  2     7
 / \   / \
1   3 6   9
```
> to
> ```
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

Tuple equation is the simplist way to solve switch problems.

```
class Solution(object):
    def invertTree(self, root):
        """
        :type root: TreeNode
        :rtype: TreeNode
        """
        if root != None:
            root.left, root.right = root.right, root.left
            self.invertTree(root.left)
            self.invertTree(root.right)
        return root
```

# No.237 [Delete Node in a Linked List](https://leetcode.com/problems/delete-node-in-a-linked-list/)

> Write a function to delete a node (except the tail) in a singly linked list, given only access to that node.

> Supposed the linked list is `1 -> 2 -> 3 -> 4` and you are given the third node with value 3, the linked list should become `1 -> 2 -> 4` after calling your function.

Unlike normal link node problems, the head node is unavailable. So we can not solve the front node's next link. But this problem does not limit the node value such that we can replace the value of node by next node as a bypass solution.

```
class Solution(object):
    def deleteNode(self, node):
        """
        :type node: ListNode
        :rtype: void Do not return anything, modify node in-place instead.
        """

        node.val = node.next.val
        node.next = node.next.next
```

# No.283 [Move Zeros](https://leetcode.com/problems/move-zeroes/)

> Given an array nums, write a function to move all 0's to the end of it while maintaining the relative order of the non-zero elements.

> For example, given nums = [0, 1, 0, 3, 12], after calling your function, nums should be [1, 3, 12, 0, 0].

A simple solution is obvious and speed is not the best in this solution.

```
class Solution(object):
    def moveZeroes(self, nums):
        """
        :type nums: List[int]
        :rtype: void Do not return anything, modify nums in-place instead.
        """
        n = nums.count(0)
        for i in range(n):
            nums.remove(0)
        nums.extend([0]*n)
```
The normal fast way is use two pointers. One points and one points last to find non-zero position to switch.

# No.100 [Same Tree](https://leetcode.com/problems/same-tree/)

> Given two binary trees, write a function to check if they are equal or not.

> Two binary trees are considered equal if they are structurally identical and the nodes have the same value.

A simple recursion problem.

```
class Solution(object):
    def isSameTree(self, p, q):
        """
        :type p: TreeNode
        :type q: TreeNode
        :rtype: bool
        """
        if p == None and q != None:
            return False
        elif p != None and q == None:
            return False
        elif p == None and q == None:
            return True
        elif p.val != q.val:
            return False
        else:
            return self.isSameTree(p.left, q.left) and self.isSameTree(q.right,p.right)
```

# No.260 [Single Number 3](https://leetcode.com/problems/single-number-iii/)

> Given an array of numbers nums, in which exactly two elements appear only once and all the other elements appear exactly twice. Find the two elements that appear only once.

> For example:

> Given `nums = [1, 2, 1, 3, 2, 5]`, return `[3, 5]`.

A common way is establish a dict to count so that the time complexity could be liinear runtime. But obviously the number set is big and the space sonsumption is not good. Anyway, it is fast solution~

```
class Solution(object):
    def singleNumber(self, nums):
        """
        :type nums: List[int]
        :rtype: List[int]
        """
        d = dict(zip(set(nums),[0]*len(set(nums))))
        for i in nums:
            if i in d:
                d[i] += 1
        result = []
        for i in d:
            if d[i] == 1:
                result.append(i)
        return result
```

# No.238 [Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/)

> Given an array of n integers where n > 1, nums, return an array output such that output[i] is equal to the product of all the elements of nums except nums[i].

> Solve it **without division** and in O(n).

> For example, given [1,2,3,4], return [24,12,8,6].

In this problem, we could only use multiply operation. A concise and common idea is establsh two support list. One of them save the left result of multiplying and another save the right. For example, the original list is `[1,2,3,4]` so the left multiplying result is [1,1,2,6] and the right is [24,12,4,1]. The time complexity is O(n) of these operation. Next procedure is obvious. Just do vector multiply and get the result.

```
class Solution(object):
    def productExceptSelf(self, nums):
        """
        :type nums: List[int]
        :rtype: List[int]
        """
        length = len(nums)
        left = [1]*length
        right = [1]*length
        for i in range(1,length):
            left[i] = left[i-1]*nums[i-1]
        for i in range(1,length):
            right[length-i-1] = right[length-i]*nums[length-i]
        result = [x*y for x,y in zip(left,right)]
        return result
```

# No.242 [Valid Anagram](https://leetcode.com/problems/valid-anagram/)

> Given two strings s and t, write a function to determine if t is an anagram of s.

> For example,
> s = "anagram", t = "nagaram", return true.
> s = "rat", t = "car", return false.

> Note:
> You may assume the string contains only lowercase alphabets.

Using python power inside function is a concise solution.

```
class Solution(object):
    def isAnagram(self, s, t):
        """
        :type s: str
        :type t: str
        :rtype: bool
        """
        s1 = list(s)
        s2 = list(t)
        s1.sort()
        s2.sort()
        if ''.join(s1) == ''.join(s2):
            return True
        else:
            return False
```

# No.171 [Excel Sheet Column Number](https://leetcode.com/problems/excel-sheet-column-number/)

> Related to question Excel Sheet Column Title

> Given a column title as appear in an Excel sheet, return its corresponding column number.

> For example:
> ```
    A -> 1
    B -> 2
    C -> 3
    ...
    Z -> 26
    AA -> 27
    AB -> 28
```

The only important thing is the `ord` function.

```
class Solution(object):
    def titleToNumber(self, s):
        """
        :type s: str
        :rtype: int
        """
        sum = 0
        for i in s:
            sum = sum * 26 + ord(i) - 64
        return sum
```

# No.217 [Contains Duplicate](https://leetcode.com/problems/contains-duplicate/)

> Given an array of integers, find if the array contains any duplicates. Your function should return true if any value appears at least twice in the array, and it should return false if every element is distinct.

Just use `set` and all things gone. Let us recite loudly -- **Python is almighty!**

```
class Solution(object):
    def containsDuplicate(self, nums):
        """
        :type nums: List[int]
        :rtype: bool
        """
        return len(set(nums)) < len(nums)
```

# No.169 [Majority Element](https://leetcode.com/problems/majority-element/)

>　Given an array of size n, find the majority element. The majority element is the element that appears more than ⌊ n/2 ⌋ times.

> You may assume that the array is non-empty and the majority element always exist in the array.

Because of the condition, a straight solution is sort the list and return the middle one.

```
class Solution(object):
    def majorityElement(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        nums.sort()
        return nums[len(nums)//2]
```

# No.268 [Missing Number](https://leetcode.com/problems/missing-number/)

> Given an array containing n distinct numbers taken from 0, 1, 2, ..., n, find the one that is missing from the array.

> For example,
> Given nums = [0, 1, 3] return 2.

No difficulty. Just be causious of boundary conditions.

```
class Solution(object):
    def missingNumber(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        nums.sort()
        if nums[0] != 0:
            return 0
        elif len(nums) == 1:
            return 1
        for i in range(len(nums)-1):
            if nums[i]+1 != nums[i+1]:
                return nums[i]+1
        return nums[-1]+1
```

# No.144 [Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/)

> Given a binary tree, return the preorder traversal of its nodes' values.

Basic algorithm.

```
class Solution(object):
    def preorderTraversal(self, root):
        """
        :type root: TreeNode
        :rtype: List[int]
        """
        if root == None:
            return []
        result = [root.val]
        if root.left != None:
            result.extend(self.preorderTraversal(root.left))
        if root.right != None:
            result.extend(self.preorderTraversal(root.right))
        return result
```

Iterable version is also easy. Stack construction can solve it perfectly.

# No.94 [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)

> Given a binary tree, return the inorder traversal of its nodes' values.

Also a basic problem like the upper one.

```
class Solution(object):
    def inorderTraversal(self, root):
        """
        :type root: TreeNode
        :rtype: List[int]
        """
        if root == None:
            return []
        if root.left != None:
            result = self.inorderTraversal(root.left)
        else:
            result = []
        result.append(root.val)
        if root.right != None:
            result.extend(self.inorderTraversal(root.right))
        return result
```

Iterable version is also simple structure of stack. Postorder one will be a little difficult which given below.

# No.145 [Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/)

> Given a binary tree, return the postorder traversal of its nodes' values.

Now the last one of basic binary tree series. Unlike the former recursion solution, following is Iterable one.

In postorder, simple stack structure can not work, so we need to add a flag to represent whether the child nodes in stack. Suppose `False` flag means child node had enter in stack and `True` flag is opposite.

Obviously, if we have the flag, once we pop a node from stack, if flag is `True`, we can push it back and set False, and then push its left and right child node with True. Do it loop and problem solved.

```
class Solution(object):
    def postorderTraversal(self, root):
        """
        :type root: TreeNode
        :rtype: List[int]
        """
        q = []
        result = []
        if not root:
            return []
        q.append((root,True))
        while q:
            x,y = q.pop()
            l = x.left
            r = x.right
            if y:
                q.append((x,False))
                if r:
                    q.append((r,True))
                if l:
                    q.append((l,True))
            else:
                result.append(x.val)
        return result
```

# No.206 [Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/)

> Reverse a singly linked list.

Establish a new head pointer. We could cut the old chain one by one and stick to the front of new chain.

```
class Solution(object):
    def reverseList(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """
        if not head:
            return None
        else:
            new_head, p = head, head.next
            new_head.next = None
        while p:
            tmp, p = p, p.next
            new_head, tmp.next = tmp, new_head
        return new_head
```

# No.235 [Lowest Common Ancestor of a Binary Search Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)

> Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

> According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes v and w as the lowest node in T that has both v and w as descendants (where we allow a node to be a descendant of itself).”
> ```
        _______6______
       /              \
    ___2__          ___8__
   /      \        /      \
   0      _4       7       9
         /  \
         3   5
```

> For example, the lowest common ancestor (LCA) of nodes 2 and 8 is 6. Another example is LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.

Like decision tree. First, if one of them is root, done. Else, if root value between them, they must divided in different chile tree, so the root is the lowest common ancestor. In other word, if the root is not the middle one, they must in the same child tree, so we can use recursion to solve.

```
class Solution(object):
    def lowestCommonAncestor(self, root, p, q):
        """
        :type root: TreeNode
        :type p: TreeNode
        :type q: TreeNode
        :rtype: TreeNode
        """
        if not root:
            return None

        if root is p or root is q:
            return root

        if p.val < root.val < q.val or q.val < root.val < p.val:
            return root

        if p.val < root.val:
            return self.lowestCommonAncestor(root.left, p, q)
        else:
            return self.lowestCommonAncestor(root.right, p, q)
```

# No.191 [Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/)

> Write a function that takes an unsigned integer and returns the number of ’1' bits it has (also known as the Hamming weight).

> For example, the 32-bit integer ’11' has binary representation `00000000000000000000000000001011`, so the function should return `3`.

Bsic problem. We can use `>>` operation. `bin`　it and change to char list to solve is also good way.

```
class Solution(object):
    def hammingWeight(self, n):
        """
        :type n: int
        :rtype: int
        """
        count = 0
        while n > 0:
            tail = n % 2
            if tail == 1:
                count += 1
            n = n >> 1
        return count
```

# No.328 [Odd Even Linked List](https://leetcode.com/problems/odd-even-linked-list/)

> Given a singly linked list, group all odd nodes together followed by the even nodes. Please note here we are talking about the node number and not the value in the nodes.

> You should try to do it in place. The program should run in O(1) space complexity and O(nodes) time complexity.

> Example:
> Given `1->2->3->4->5->NULL`,
> return `1->3->5->2->4->NULL`.

> Note:
> The relative order inside both the even and odd groups should remain as it was in the input.
The first node is considered odd, the second node even and so on ...

Inplace produce more difficuty, but the algorithm is not complex.

```
class Solution(object):
    def oddEvenList(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """
        if head:
            odd = head
            even_head = even = head.next

            while even:
                odd.next = even.next
                if not odd.next:
                    break

                odd = odd.next
                even.next = odd.next
                even = even.next

            odd.next = even_head
        return head
```

# No.137 [Single Number 2](https://leetcode.com/problems/single-number-ii/)

> Given an array of integers, every element appears three times except for one. Find that single one.

> Note:
> Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

Also use `set`.

```
class Solution(object):
    def singleNumber(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        return (sum(set(nums))*3 - sum(nums))/2
```

# No.96 [Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/)

> Given n, how many structurally unique BST's (binary search trees) that store values 1...n?

Recursion is a typical solution. But it actually a mathematical problem.

```
class Solution(object):
    def numTrees(self, n):
        """
        :type n: int
        :rtype: int
        """
        return math.factorial(2*n)/(math.factorial(n)*math.factorial(n+1))
```

# No.141 [Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/)

> Given a linked list, determine if it has a cycle in it.

> Follow up:
> Can you solve it without using extra space?

A very interesting problem. The solution is even more amazing. We establsh two pointers, a pointer move one pace each time and another is two. If there is a cycle, they must meet again.

```
class Solution(object):
    def hasCycle(self, head):
        """
        :type head: ListNode
        :rtype: bool
        """
        try:
            head1 = head
            head2 = head.next
            while not head1 is head2:
                head1 = head1.next
                head2 = head2.next.next
            return True
        except:
            return False
```

# No.35 [Search Insert Position](https://leetcode.com/problems/search-insert-position/)

> Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

> You may assume no duplicates in the array.

An easy problem, `enumerate` is useful.

```
class Solution(object):
    def searchInsert(self, nums, target):
        """
        :type nums: List[int]
        :type target: int
        :rtype: int
        """
        for index, i in enumerate(nums):
            if i >= target:
                return index
        return len(nums)
```

# No.108 [Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)

> Given an array where elements are sorted in ascending order, convert it to a height balanced BST.

recursion is perfect.

```
class Solution(object):
    def sortedArrayToBST(self, nums):
        """
        :type nums: List[int]
        :rtype: TreeNode
        """
        if not nums:
            return None
        if len(nums) == 1:
            return TreeNode(nums[0])
        m = len(nums) >> 1
        root = TreeNode(nums[m])
        root.left = self.sortedArrayToBST(nums[:m])
        root.right = self.sortedArrayToBST(nums[m+1:])
        return root
```

# No.116 [Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/)

> Given a binary tree
> ```
    struct TreeLinkNode {
      TreeLinkNode *left;
      TreeLinkNode *right;
      TreeLinkNode *next;
    }
```

> Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

> Initially, all next pointers are set to NULL.

For this situation, we could use BFS algorithm which also named scan strategy.

```
class Solution(object):
    def connect(self, root):
        """
        :type root: TreeLinkNode
        :rtype: nothing
        """
        if root is None:
            return None
        else:
            array = []
            new_array = []
            array.append(root)
            while True:
                if array[0].left is None:
                    break
                for item in array:
                    new_array.append(item.left)
                    new_array.append(item.right)
                for i in range(len(new_array)-1):
                    new_array[i].next = new_array[i+1]
                array = new_array
                new_array = []
```

# No.230 [Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

> Given a binary search tree, write a function kthSmallest to find the kth smallest element in it.

> Note:
> You may assume k is always valid, 1 ≤ k ≤ BST's total elements.

> Follow up:
> What if the BST is modified (insert/delete operations) often and you need to find the kth smallest frequently? How would you optimize the kthSmallest routine?

We could use inorder search to get the kth number. The follwing is a Iterable solution using stack. Recursion is also a typical way.

```
class Solution(object):
    def kthSmallest(self, root, k):
        """
        :type root: TreeNode
        :type k: int
        :rtype: int
        """
        l = []

        while root:
            l.append(root)
            root = root.left
        while l:
            pop_num = l.pop()
            if k == 1:
                return pop_num.val
            else:
                k -= 1
                tmp = pop_num.right
                while tmp:
                    l.append(tmp)
                    tmp = tmp.left
```

For answer the follw up problem, we should modify the raw structure of BST. We could modify the original one to inorder clue tree to get the next node easily and do not waste space. A inorde head need a extra room.

# No.83 [Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/)

> Given a sorted linked list, delete all duplicates such that each element appear only once.

A easy problem. Just take care the bounary condition.

```
class Solution(object):
    def deleteDuplicates(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """
        if not head:
            return None
        else:
            cursor = head
            while cursor.next:
                if cursor.val == cursor.next.val:
                    cursor.next = cursor.next.next
                else:
                    cursor = cursor.next
            return head
```

# No.70 [Climbing Stairs](https://leetcode.com/problems/climbing-stairs/)

> You are climbing a stair case. It takes n steps to reach to the top.

> Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

Recursion is the first idea in my brain. It is avalaible theoretically, but the reply is error message of recurion depth limit. So, we must using iterable way.

The solution is like Fibonacci array.

```
class Solution(object):
    def climbStairs(self, n):
        """
        :type n: int
        :rtype: int
        """
        first = 1
        second = 2
        start = 2
        if n == 1:
            return 1
        elif n == 2:
            return 2
        else:
            for i in range(2,n):
                first, second = second, first+second
        return second
```

# No.53 [Maximum Subarray](https://leetcode.com/problems/maximum-subarray/)

> Find the contiguous subarray within an array (containing at least one number) which has the largest sum.

> For example, given the array `[−2,1,−3,4,−1,2,1,−5,4]`,
> the contiguous subarray `[4,−1,2,1]` has the largest sum = `6`.

A typical DP(dynamic programming) problem. Just Google it.

```
class Solution(object):
    def maxSubArray(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        max_num = max(nums)
        if max_num <= 0:
            return max_num
        max_of_all = max_of_tail = nums[0]
        for i in range(1,len(nums)):
            max_of_tail = max(nums[i],nums[i]+max_of_tail)
            max_of_all = max(max_of_all, max_of_tail)
        return max_of_all
```

# No.263 [Ugly Number](https://leetcode.com/problems/ugly-number/)

> Write a program to check whether a given number is an ugly number.

> Ugly numbers are positive numbers whose prime factors only include 2, 3, 5. For example, 6, 8 are ugly while 14 is not ugly since it includes another prime factor 7.

> Note that 1 is typically treated as an ugly number.

A easy problem and also be cautious of Boundary condition.

```
class Solution(object):
    def isUgly(self, num):
        """
        :type num: int
        :rtype: bool
        """
        if num <= 0:
            return False
        elif num in [1,2,3,5]:
            return True
        elif num%2 == 0:
            return self.isUgly(num/2)
        elif num%3 == 0:
            return self.isUgly(num/3)
        elif num%5 == 0:
            return self.isUgly(num/5)
        else:
            return False
```

# No.202 [Happy Number](https://leetcode.com/problems/happy-number/)

> Write an algorithm to determine if a number is "happy".

> A happy number is a number defined by the following process: Starting with any positive integer, replace the number by the sum of the squares of its digits, and repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1. Those numbers for which this process ends in 1 are happy numbers.

Python inside functions `list` and `str` can easily solve the problem while they are conbined.

```
class Solution(object):
    def isHappy(self, n):
        """
        :type n: int
        :rtype: bool
        """
        nums = []
        while n not in nums:
            if n == 1:
                return True
            nums.append(n)
            l = list(str(n))
            n = 0
            for i in l:
                n += (ord(i)-48)**2
        return False
```

# No.326 [Power of Three](https://leetcode.com/problems/power-of-three/)

> Given an integer, write a function to determine if it is a power of three.

> Follow up:
> Could you do it without using any loop / recursion?

If you use loop, everything goes well.

```
class Solution(object):
    def isPowerOfThree(self, n):
        """
        :type n: int
        :rtype: bool
        """
        if n in [1,3]:
            return True
        i = 3
        while i < n:
            i *= 3
            if i == n:
                return True
        return False
```

There is a very tricky way to solve the problem without loop or recursion. We must face the fact that the problem is in computer rather than in math. The biggest number which is the power of 3 is specific. so if `biggest_3_power % target == 0`, then the target number is the ture answer.

No matter what is your thought, mine is WTF.

# No.89 [Gray Code](https://leetcode.com/problems/gray-code/)

> The gray code is a binary numeral system where two successive values differ in only one bit.

> Given a non-negative integer n representing the total number of bits in the code, print the sequence of gray code. A gray code sequence must begin with 0.

> For example, given n = 2, return [0,1,3,2]. Its gray code sequence is:

> ```
00 - 0
01 - 1
11 - 3
10 - 2
```

The key idea of this Algorithm is reduce. Once k size problem solved, we could add bit code 1 at the front of every number in the list and get a new array. Then reverse it and stick together. The new array fit Gray rule and it is the k+1 size answer.

```
class Solution(object):
    def grayCode(self, n):
        """
        :type n: int
        :rtype: List[int]
        """
        if n == 0:
            return [0]
        r = self.grayCode(n-1)
        result = [x + (1 << (n-1)) for x in r]
        result.reverse()
        r.extend(result)
        return r
```

# No.62 [Unique Paths](https://leetcode.com/problems/unique-paths/)

> A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

> The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

> How many possible unique paths are there?

Actually a math problem. A transfomation of pascal triangle. Math solution is perfect.

```
class Solution(object):
    def uniquePaths(self, m, n):
        """
        :type m: int
        :type n: int
        :rtype: int
        """
        return math.factorial(m+n-2)/(math.factorial(m-1)*math.factorial(n-1))
```

# No.153 [Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/)

> Suppose a sorted array is rotated at some pivot unknown to you beforehand.

> (i.e., `0 1 2 4 5 6 7` might become `4 5 6 7 0 1 2`).

> Find the minimum element.

> You may assume no duplicate exists in the array.

A search problem. Dichoctomizing search is the key.

```
class Solution(object):
    def findMin(self, nums):
        """
        :type nums: List[int]
        :rtype: int
        """
        if len(nums) == 1:
            return nums[0]
        l = 0
        r = len(nums)-1
        while l < r:
            m = (l+r)/2
            if nums[m]>nums[m+1]:
                return nums[m+1]
            elif nums[m] > nums[l]:
                l = m
            else:
                r = m
        return nums[0]
```

# No.21 [Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

> Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

A NodeList typical problem.

```
class Solution(object):
    def mergeTwoLists(self, l1, l2):
        """
        :type l1: ListNode
        :type l2: ListNode
        :rtype: ListNode
        """
        head = ListNode(0)
        p = head
        while l1 and l2:
            if l1.val > l2.val:
                p.next = l2
                p = p.next
                l2 = l2.next
            else:
                p.next = l1
                p = p.next
                l1 = l1.next
        if l1:
            p.next = l1
            return head.next
        else:
            p.next = l2
            return head.next
```

# No.46 [Permutations](https://leetcode.com/problems/permutations/)

> Given a collection of distinct numbers, return all possible permutations.

> For example,
> `[1,2,3]` have the following permutations:
> `[1,2,3]`, `[1,3,2]`, `[2,1,3]`, `[2,3,1]`, `[3,1,2]`, and `[3,2,1]`.

Another recursion.

```
class Solution(object):
    def permute(self, nums):
        """
        :type nums: List[int]
        :rtype: List[List[int]]
            """
        return self.sub(nums)


    def sub(self, nums):
        if len(nums) == 0: return [[]]
        if len(nums) == 1: return [nums]
        pattern = self.sub(nums[1:])
        c = []
        for i in xrange(len(nums)):
            for p in pattern:
                c.append(p[:i] + [nums[0]] + p[i:])
        return c
```

# No.24 [Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/)

> Given a linked list, swap every two adjacent nodes and return its head.

> For example,
> Given `1->2->3->4`, you should return the list as `2->1->4->3`.

> Your algorithm should use only constant space. You may not modify the values in the list, only nodes itself can be changed.

Take care of Boundary condition and other is only NodeList.

```
class Solution(object):
    def swapPairs(self, head):
        """
        :type head: ListNode
        :rtype: ListNode
        """
        if not head or not head.next:
            return head

        first,second = head, head.next
        third = second.next
        head = second
        second.next = first
        first.next = self.swapPairs(third)

        return head
```

# No.216 [Combination Sum 3](https://leetcode.com/problems/combination-sum-iii/)

> Find all possible combinations of k numbers that add up to a number n, given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.

> Ensure that numbers within the set are sorted in ascending order.

DFS problem.

```
class Solution(object):
    def combinationSum3(self, k, n):
        """
        :type k: int
        :type n: int
        :rtype: List[List[int]]
        """
        def dfs(k,n,index,path,result):
            if not n and not k:result.append(path)
            if n>0 and k>0:
                for i in range(index,10):
                    dfs(k-1,n-i,i+1,path+[i],result)
        result=[]
        dfs(k,n,1,[],result)
        return result
```
