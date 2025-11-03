// Problems Collection
import { comprehensiveProblems } from './comprehensiveProblems';

export const problems = [
  ...comprehensiveProblems,
  {
    _id: 'prob001',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    topics: ['Array', 'Hash Table'],
    companyTags: ['Google', 'Amazon', 'Microsoft'],
    solution: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}',
    testCases: [
      { input: '[2,7,11,15], 9', output: '[0,1]' },
      { input: '[3,2,4], 6', output: '[1,2]' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob002',
    title: 'Valid Parentheses',
    difficulty: 'Easy',
    description: 'Given a string s containing just the characters "(", ")", "{", "}", "[" and "]", determine if the input string is valid.',
    topics: ['String', 'Stack'],
    companyTags: ['Amazon', 'Facebook', 'Microsoft'],
    solution: 'function isValid(s) {\n  const stack = [];\n  const map = { ")": "(", "}": "{", "]": "[" };\n  for (let char of s) {\n    if (char === "(" || char === "{" || char === "[") {\n      stack.push(char);\n    } else {\n      if (stack.pop() !== map[char]) return false;\n    }\n  }\n  return stack.length === 0;\n}',
    testCases: [
      { input: '"()"', output: 'true' },
      { input: '"()[]{}"', output: 'true' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob003',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    description: 'Merge two sorted linked lists and return it as a sorted list.',
    topics: ['Linked List', 'Recursion'],
    companyTags: ['Amazon', 'Microsoft', 'Apple'],
    solution: 'function mergeTwoLists(l1, l2) {\n  if (!l1) return l2;\n  if (!l2) return l1;\n  if (l1.val < l2.val) {\n    l1.next = mergeTwoLists(l1.next, l2);\n    return l1;\n  } else {\n    l2.next = mergeTwoLists(l1, l2.next);\n    return l2;\n  }\n}',
    testCases: [
      { input: '[1,2,4], [1,3,4]', output: '[1,1,2,3,4,4]' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob004',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    topics: ['String', 'Sliding Window', 'Hash Table'],
    companyTags: ['Amazon', 'Google', 'Facebook'],
    solution: 'function lengthOfLongestSubstring(s) {\n  const map = new Map();\n  let maxLen = 0, left = 0;\n  for (let right = 0; right < s.length; right++) {\n    if (map.has(s[right])) {\n      left = Math.max(map.get(s[right]) + 1, left);\n    }\n    map.set(s[right], right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}',
    testCases: [
      { input: '"abcabcbb"', output: '3' },
      { input: '"bbbbb"', output: '1' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob005',
    title: 'Add Two Numbers',
    difficulty: 'Medium',
    description: 'You are given two non-empty linked lists representing two non-negative integers. Add the two numbers and return the sum as a linked list.',
    topics: ['Linked List', 'Math'],
    companyTags: ['Amazon', 'Microsoft', 'Apple'],
    solution: 'function addTwoNumbers(l1, l2) {\n  let dummy = new ListNode(0);\n  let curr = dummy;\n  let carry = 0;\n  while (l1 || l2 || carry) {\n    let sum = (l1?.val || 0) + (l2?.val || 0) + carry;\n    carry = Math.floor(sum / 10);\n    curr.next = new ListNode(sum % 10);\n    curr = curr.next;\n    l1 = l1?.next;\n    l2 = l2?.next;\n  }\n  return dummy.next;\n}',
    testCases: [
      { input: '[2,4,3], [5,6,4]', output: '[7,0,8]' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob006',
    title: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    description: 'Given two sorted arrays nums1 and nums2, return the median of the two sorted arrays.',
    topics: ['Array', 'Binary Search', 'Divide and Conquer'],
    companyTags: ['Google', 'Amazon', 'Microsoft'],
    solution: 'function findMedianSortedArrays(nums1, nums2) {\n  if (nums1.length > nums2.length) {\n    [nums1, nums2] = [nums2, nums1];\n  }\n  const m = nums1.length, n = nums2.length;\n  let left = 0, right = m;\n  // Binary search implementation\n  return median;\n}',
    testCases: [
      { input: '[1,3], [2]', output: '2.0' },
      { input: '[1,2], [3,4]', output: '2.5' }
    ],
    xpReward: 50
  },
  // Competitive Programming Problems
  {
    _id: 'prob_cp001',
    title: 'Maximum Subarray Sum (Kadane\'s Algorithm)',
    difficulty: 'Medium',
    description: 'Find the contiguous subarray within an array which has the largest sum. This is a classic competitive programming problem.',
    topics: ['Array', 'Dynamic Programming', 'Greedy'],
    companyTags: ['Google', 'Amazon', 'Microsoft'],
    solution: 'function maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}',
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', output: '6' },
      { input: '[1]', output: '1' },
      { input: '[5,4,-1,7,8]', output: '23' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_cp002',
    title: 'Longest Increasing Subsequence',
    difficulty: 'Medium',
    description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence. A classic DP problem in competitive programming.',
    topics: ['Dynamic Programming', 'Binary Search'],
    companyTags: ['Google', 'Facebook', 'Amazon'],
    solution: 'function lengthOfLIS(nums) {\n  const dp = new Array(nums.length).fill(1);\n  for (let i = 1; i < nums.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (nums[i] > nums[j]) {\n        dp[i] = Math.max(dp[i], dp[j] + 1);\n      }\n    }\n  }\n  return Math.max(...dp);\n}',
    testCases: [
      { input: '[10,9,2,5,3,7,101,18]', output: '4' },
      { input: '[0,1,0,3,2,3]', output: '4' },
      { input: '[7,7,7,7,7,7,7]', output: '1' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_cp003',
    title: 'Coin Change Problem',
    difficulty: 'Medium',
    description: 'Given coins of different denominations and a total amount, compute the minimum number of coins needed to make up that amount.',
    topics: ['Dynamic Programming', 'Greedy'],
    companyTags: ['Amazon', 'Microsoft', 'Apple'],
    solution: 'function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (let coin of coins) {\n      if (i >= coin) {\n        dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n      }\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}',
    testCases: [
      { input: '[1,2,5], 11', output: '3' },
      { input: '[2], 3', output: '-1' },
      { input: '[1], 0', output: '0' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_cp004',
    title: 'Next Permutation',
    difficulty: 'Medium',
    description: 'Find the next lexicographically greater permutation of an array. A common problem in competitive programming contests.',
    topics: ['Array', 'Two Pointers', 'Math'],
    companyTags: ['Google', 'Amazon', 'Facebook'],
    solution: 'function nextPermutation(nums) {\n  let i = nums.length - 2;\n  while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n  if (i >= 0) {\n    let j = nums.length - 1;\n    while (nums[j] <= nums[i]) j--;\n    [nums[i], nums[j]] = [nums[j], nums[i]];\n  }\n  reverse(nums, i + 1);\n}',
    testCases: [
      { input: '[1,2,3]', output: '[1,3,2]' },
      { input: '[3,2,1]', output: '[1,2,3]' },
      { input: '[1,1,5]', output: '[1,5,1]' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_cp005',
    title: 'Knapsack Problem (0/1)',
    difficulty: 'Medium',
    description: 'Given weights and values of items, put items in a knapsack of capacity W to get maximum total value. Classic DP problem.',
    topics: ['Dynamic Programming', 'Backtracking'],
    companyTags: ['Amazon', 'Microsoft', 'Google'],
    solution: 'function knapsack(weights, values, capacity) {\n  const n = weights.length;\n  const dp = Array(n + 1).fill(0).map(() => Array(capacity + 1).fill(0));\n  for (let i = 1; i <= n; i++) {\n    for (let w = 1; w <= capacity; w++) {\n      if (weights[i-1] <= w) {\n        dp[i][w] = Math.max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w]);\n      } else {\n        dp[i][w] = dp[i-1][w];\n      }\n    }\n  }\n  return dp[n][capacity];\n}',
    testCases: [
      { input: '[1,3,4,5], [1,4,5,7], 7', output: '9' },
      { input: '[2,3,4], [3,4,5], 5', output: '7' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_cp006',
    title: 'Merge Intervals',
    difficulty: 'Medium',
    description: 'Given a collection of intervals, merge all overlapping intervals. Common in competitive programming.',
    topics: ['Array', 'Sorting', 'Greedy'],
    companyTags: ['Google', 'Facebook', 'Amazon'],
    solution: 'function merge(intervals) {\n  if (!intervals.length) return [];\n  intervals.sort((a, b) => a[0] - b[0]);\n  const result = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = result[result.length - 1];\n    if (intervals[i][0] <= last[1]) {\n      last[1] = Math.max(last[1], intervals[i][1]);\n    } else {\n      result.push(intervals[i]);\n    }\n  }\n  return result;\n}',
    testCases: [
      { input: '[[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]' },
      { input: '[[1,4],[4,5]]', output: '[[1,5]]' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_cp007',
    title: 'Number of Islands',
    difficulty: 'Medium',
    description: 'Count the number of islands in a 2D grid. An island is surrounded by water and formed by connecting adjacent lands.',
    topics: ['Graph', 'DFS', 'BFS', 'Union Find'],
    companyTags: ['Amazon', 'Google', 'Microsoft'],
    solution: 'function numIslands(grid) {\n  if (!grid.length) return 0;\n  let count = 0;\n  const dfs = (i, j) => {\n    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === "0") return;\n    grid[i][j] = "0";\n    dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1);\n  };\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[0].length; j++) {\n      if (grid[i][j] === "1") {\n        count++;\n        dfs(i, j);\n      }\n    }\n  }\n  return count;\n}',
    testCases: [
      { input: '[["1","1","0"],["1","1","0"],["0","0","1"]]', output: '2' },
      { input: '[["1","1","1"],["0","1","0"],["1","1","1"]]', output: '1' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_cp008',
    title: 'Longest Common Subsequence',
    difficulty: 'Medium',
    description: 'Find the length of the longest common subsequence between two strings. Classic DP problem in competitive programming.',
    topics: ['Dynamic Programming', 'String'],
    companyTags: ['Google', 'Amazon', 'Facebook'],
    solution: 'function longestCommonSubsequence(text1, text2) {\n  const m = text1.length, n = text2.length;\n  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (text1[i-1] === text2[j-1]) {\n        dp[i][j] = dp[i-1][j-1] + 1;\n      } else {\n        dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n      }\n    }\n  }\n  return dp[m][n];\n}',
    testCases: [
      { input: '"abcde", "ace"', output: '3' },
      { input: '"abc", "abc"', output: '3' },
      { input: '"abc", "def"', output: '0' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_cp009',
    title: 'Trapping Rain Water',
    difficulty: 'Hard',
    description: 'Given elevation map, compute how much water can be trapped after raining. Famous competitive programming problem.',
    topics: ['Array', 'Two Pointers', 'Stack', 'Dynamic Programming'],
    companyTags: ['Google', 'Amazon', 'Facebook'],
    solution: 'function trap(height) {\n  let left = 0, right = height.length - 1;\n  let leftMax = 0, rightMax = 0, water = 0;\n  while (left < right) {\n    if (height[left] < height[right]) {\n      if (height[left] >= leftMax) leftMax = height[left];\n      else water += leftMax - height[left];\n      left++;\n    } else {\n      if (height[right] >= rightMax) rightMax = height[right];\n      else water += rightMax - height[right];\n      right--;\n    }\n  }\n  return water;\n}',
    testCases: [
      { input: '[0,1,0,2,1,0,1,3,2,1,2,1]', output: '6' },
      { input: '[4,2,0,3,2,5]', output: '9' }
    ],
    xpReward: 50
  },
  {
    _id: 'prob_cp010',
    title: 'Edit Distance (Levenshtein Distance)',
    difficulty: 'Hard',
    description: 'Find minimum number of operations to convert one string to another. Operations: insert, delete, replace.',
    topics: ['Dynamic Programming', 'String'],
    companyTags: ['Google', 'Amazon', 'Microsoft'],
    solution: 'function minDistance(word1, word2) {\n  const m = word1.length, n = word2.length;\n  const dp = Array(m + 1).fill(0).map(() => Array(n + 1).fill(0));\n  for (let i = 0; i <= m; i++) dp[i][0] = i;\n  for (let j = 0; j <= n; j++) dp[0][j] = j;\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (word1[i-1] === word2[j-1]) {\n        dp[i][j] = dp[i-1][j-1];\n      } else {\n        dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]) + 1;\n      }\n    }\n  }\n  return dp[m][n];\n}',
    testCases: [
      { input: '"horse", "ros"', output: '3' },
      { input: '"intention", "execution"', output: '5' }
    ],
    xpReward: 50
  },
  {
    _id: 'prob_cp011',
    title: 'N-Queens Problem',
    difficulty: 'Hard',
    description: 'Place N queens on N×N chessboard so no two queens attack each other. Classic backtracking problem.',
    topics: ['Backtracking', 'Recursion'],
    companyTags: ['Google', 'Amazon', 'Microsoft'],
    solution: 'function solveNQueens(n) {\n  const result = [];\n  const board = Array(n).fill(0).map(() => Array(n).fill("."));\n  const isValid = (row, col) => {\n    for (let i = 0; i < row; i++) {\n      if (board[i][col] === "Q") return false;\n      if (col - (row - i) >= 0 && board[i][col - (row - i)] === "Q") return false;\n      if (col + (row - i) < n && board[i][col + (row - i)] === "Q") return false;\n    }\n    return true;\n  };\n  const backtrack = (row) => {\n    if (row === n) {\n      result.push(board.map(r => r.join("")));\n      return;\n    }\n    for (let col = 0; col < n; col++) {\n      if (isValid(row, col)) {\n        board[row][col] = "Q";\n        backtrack(row + 1);\n        board[row][col] = ".";\n      }\n    }\n  };\n  backtrack(0);\n  return result;\n}',
    testCases: [
      { input: '4', output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]' },
      { input: '1', output: '[["Q"]]' }
    ],
    xpReward: 50
  },
  {
    _id: 'prob_cp012',
    title: 'Word Break',
    difficulty: 'Medium',
    description: 'Given a string and dictionary, determine if string can be segmented into space-separated dictionary words.',
    topics: ['Dynamic Programming', 'String', 'Backtracking'],
    companyTags: ['Google', 'Amazon', 'Facebook'],
    solution: 'function wordBreak(s, wordDict) {\n  const wordSet = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[0] = true;\n  for (let i = 1; i <= s.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (dp[j] && wordSet.has(s.substring(j, i))) {\n        dp[i] = true;\n        break;\n      }\n    }\n  }\n  return dp[s.length];\n}',
    testCases: [
      { input: '"leetcode", ["leet","code"]', output: 'true' },
      { input: '"applepenapple", ["apple","pen"]', output: 'true' },
      { input: '"catsandog", ["cats","dog","sand","and","cat"]', output: 'false' }
    ],
    xpReward: 25
  }
];

// Generate more problems
const difficulties = ['Easy', 'Medium', 'Hard'];
const topicSets = [
  ['Array', 'Hash Table'],
  ['String', 'Dynamic Programming'],
  ['Tree', 'DFS', 'BFS'],
  ['Graph', 'Backtracking'],
  ['Linked List', 'Two Pointers'],
  ['Stack', 'Queue'],
  ['Binary Search', 'Sorting'],
  ['Greedy', 'Math'],
  ['Bit Manipulation', 'Recursion']
];
const companySets = [
  ['Google', 'Amazon'],
  ['Microsoft', 'Facebook'],
  ['Apple', 'Netflix'],
  ['Adobe', 'Uber'],
  ['LinkedIn', 'Twitter']
];

for (let i = 7; i <= 50; i++) {
  const difficulty = difficulties[i % 3];
  const xpRewards = { Easy: 10, Medium: 25, Hard: 50 };
  
  problems.push({
    _id: `prob${String(i).padStart(3, '0')}`,
    title: `Problem ${i}: ${topicSets[i % topicSets.length][0]} Challenge`,
    difficulty: difficulty,
    description: `This is a ${difficulty.toLowerCase()} level problem focusing on ${topicSets[i % topicSets.length].join(', ')}.`,
    topics: topicSets[i % topicSets.length],
    companyTags: companySets[i % companySets.length],
    solution: `// Solution for problem ${i}\nfunction solve() {\n  // Implementation here\n  return result;\n}`,
    testCases: [
      { input: 'test input 1', output: 'expected output 1' },
      { input: 'test input 2', output: 'expected output 2' }
    ],
    xpReward: xpRewards[difficulty]
  });
}
