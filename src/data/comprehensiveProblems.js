// Comprehensive problem database with proper topic mapping

export const comprehensiveProblems = [
  // ===== ARRAYS =====
  {
    _id: 'prob_arr001',
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.',
    topics: ['Arrays', 'Hash Table'],
    companyTags: ['Google', 'Amazon', 'Microsoft'],
    solution: 'function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n}',
    testCases: [
      { input: '[2,7,11,15], 9', output: '[0,1]' },
      { input: '[3,2,4], 6', output: '[1,2]' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_arr002',
    title: 'Best Time to Buy and Sell Stock',
    difficulty: 'Easy',
    description: 'Find the maximum profit from buying and selling stock once.',
    topics: ['Arrays', 'Dynamic Programming'],
    companyTags: ['Amazon', 'Facebook', 'Microsoft'],
    solution: 'function maxProfit(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  for (let price of prices) {\n    minPrice = Math.min(minPrice, price);\n    maxProfit = Math.max(maxProfit, price - minPrice);\n  }\n  return maxProfit;\n}',
    testCases: [
      { input: '[7,1,5,3,6,4]', output: '5' },
      { input: '[7,6,4,3,1]', output: '0' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_arr003',
    title: 'Contains Duplicate',
    difficulty: 'Easy',
    description: 'Return true if any value appears at least twice in the array.',
    topics: ['Arrays', 'Hash Table'],
    companyTags: ['Google', 'Apple'],
    solution: 'function containsDuplicate(nums) {\n  return new Set(nums).size !== nums.length;\n}',
    testCases: [
      { input: '[1,2,3,1]', output: 'true' },
      { input: '[1,2,3,4]', output: 'false' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_arr004',
    title: 'Maximum Subarray',
    difficulty: 'Medium',
    description: 'Find the contiguous subarray with the largest sum.',
    topics: ['Arrays', 'Dynamic Programming'],
    companyTags: ['Amazon', 'Microsoft', 'Apple'],
    solution: 'function maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}',
    testCases: [
      { input: '[-2,1,-3,4,-1,2,1,-5,4]', output: '6' },
      { input: '[1]', output: '1' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_arr005',
    title: 'Product of Array Except Self',
    difficulty: 'Medium',
    description: 'Return an array where each element is the product of all other elements.',
    topics: ['Arrays'],
    companyTags: ['Amazon', 'Facebook', 'Microsoft'],
    solution: 'function productExceptSelf(nums) {\n  const result = [];\n  let left = 1;\n  for (let i = 0; i < nums.length; i++) {\n    result[i] = left;\n    left *= nums[i];\n  }\n  let right = 1;\n  for (let i = nums.length - 1; i >= 0; i--) {\n    result[i] *= right;\n    right *= nums[i];\n  }\n  return result;\n}',
    testCases: [
      { input: '[1,2,3,4]', output: '[24,12,8,6]' }
    ],
    xpReward: 25
  },

  // ===== STRINGS =====
  {
    _id: 'prob_str001',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    description: 'Determine if two strings are anagrams of each other.',
    topics: ['Strings', 'Hash Table'],
    companyTags: ['Amazon', 'Google'],
    solution: 'function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (let char of s) count[char] = (count[char] || 0) + 1;\n  for (let char of t) {\n    if (!count[char]) return false;\n    count[char]--;\n  }\n  return true;\n}',
    testCases: [
      { input: '"anagram", "nagaram"', output: 'true' },
      { input: '"rat", "car"', output: 'false' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_str002',
    title: 'Valid Palindrome',
    difficulty: 'Easy',
    description: 'Check if a string is a palindrome, considering only alphanumeric characters.',
    topics: ['Strings', 'Two Pointers'],
    companyTags: ['Facebook', 'Microsoft'],
    solution: 'function isPalindrome(s) {\n  s = s.toLowerCase().replace(/[^a-z0-9]/g, "");\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    if (s[left] !== s[right]) return false;\n    left++;\n    right--;\n  }\n  return true;\n}',
    testCases: [
      { input: '"A man, a plan, a canal: Panama"', output: 'true' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_str003',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    description: 'Find the length of the longest substring without repeating characters.',
    topics: ['Strings', 'Sliding Window'],
    companyTags: ['Amazon', 'Google', 'Facebook'],
    solution: 'function lengthOfLongestSubstring(s) {\n  const seen = new Map();\n  let maxLen = 0, start = 0;\n  for (let i = 0; i < s.length; i++) {\n    if (seen.has(s[i])) start = Math.max(start, seen.get(s[i]) + 1);\n    seen.set(s[i], i);\n    maxLen = Math.max(maxLen, i - start + 1);\n  }\n  return maxLen;\n}',
    testCases: [
      { input: '"abcabcbb"', output: '3' },
      { input: '"bbbbb"', output: '1' }
    ],
    xpReward: 25
  },

  // ===== LINKED LISTS =====
  {
    _id: 'prob_ll001',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    description: 'Reverse a singly linked list.',
    topics: ['Linked Lists'],
    companyTags: ['Amazon', 'Microsoft', 'Apple'],
    solution: 'function reverseList(head) {\n  let prev = null;\n  let current = head;\n  while (current) {\n    const next = current.next;\n    current.next = prev;\n    prev = current;\n    current = next;\n  }\n  return prev;\n}',
    testCases: [
      { input: '[1,2,3,4,5]', output: '[5,4,3,2,1]' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_ll002',
    title: 'Merge Two Sorted Lists',
    difficulty: 'Easy',
    description: 'Merge two sorted linked lists into one sorted list.',
    topics: ['Linked Lists', 'Recursion'],
    companyTags: ['Amazon', 'Microsoft'],
    solution: 'function mergeTwoLists(l1, l2) {\n  if (!l1) return l2;\n  if (!l2) return l1;\n  if (l1.val < l2.val) {\n    l1.next = mergeTwoLists(l1.next, l2);\n    return l1;\n  } else {\n    l2.next = mergeTwoLists(l1, l2.next);\n    return l2;\n  }\n}',
    testCases: [
      { input: '[1,2,4], [1,3,4]', output: '[1,1,2,3,4,4]' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_ll003',
    title: 'Linked List Cycle',
    difficulty: 'Easy',
    description: 'Determine if a linked list has a cycle.',
    topics: ['Linked Lists', 'Two Pointers'],
    companyTags: ['Amazon', 'Microsoft', 'Facebook'],
    solution: 'function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}',
    testCases: [
      { input: '[3,2,0,-4], pos=1', output: 'true' }
    ],
    xpReward: 10
  },

  // ===== TREES =====
  {
    _id: 'prob_tree001',
    title: 'Maximum Depth of Binary Tree',
    difficulty: 'Easy',
    description: 'Find the maximum depth of a binary tree.',
    topics: ['Trees', 'Depth-First Search'],
    companyTags: ['Amazon', 'Microsoft'],
    solution: 'function maxDepth(root) {\n  if (!root) return 0;\n  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));\n}',
    testCases: [
      { input: '[3,9,20,null,null,15,7]', output: '3' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_tree002',
    title: 'Invert Binary Tree',
    difficulty: 'Easy',
    description: 'Invert a binary tree.',
    topics: ['Trees', 'Depth-First Search'],
    companyTags: ['Google', 'Amazon'],
    solution: 'function invertTree(root) {\n  if (!root) return null;\n  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];\n  return root;\n}',
    testCases: [
      { input: '[4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_tree003',
    title: 'Validate Binary Search Tree',
    difficulty: 'Medium',
    description: 'Determine if a binary tree is a valid BST.',
    topics: ['Trees', 'Depth-First Search'],
    companyTags: ['Amazon', 'Facebook', 'Microsoft'],
    solution: 'function isValidBST(root, min = -Infinity, max = Infinity) {\n  if (!root) return true;\n  if (root.val <= min || root.val >= max) return false;\n  return isValidBST(root.left, min, root.val) && isValidBST(root.right, root.val, max);\n}',
    testCases: [
      { input: '[2,1,3]', output: 'true' },
      { input: '[5,1,4,null,null,3,6]', output: 'false' }
    ],
    xpReward: 25
  },

  // ===== DYNAMIC PROGRAMMING =====
  {
    _id: 'prob_dp001',
    title: 'Climbing Stairs',
    difficulty: 'Easy',
    description: 'Count the number of ways to climb n stairs (1 or 2 steps at a time).',
    topics: ['Dynamic Programming'],
    companyTags: ['Amazon', 'Google'],
    solution: 'function climbStairs(n) {\n  if (n <= 2) return n;\n  let prev = 1, curr = 2;\n  for (let i = 3; i <= n; i++) {\n    [prev, curr] = [curr, prev + curr];\n  }\n  return curr;\n}',
    testCases: [
      { input: '2', output: '2' },
      { input: '3', output: '3' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_dp002',
    title: 'House Robber',
    difficulty: 'Medium',
    description: 'Maximize money robbed from houses without robbing adjacent houses.',
    topics: ['Dynamic Programming'],
    companyTags: ['Amazon', 'Microsoft'],
    solution: 'function rob(nums) {\n  let prev = 0, curr = 0;\n  for (let num of nums) {\n    [prev, curr] = [curr, Math.max(curr, prev + num)];\n  }\n  return curr;\n}',
    testCases: [
      { input: '[1,2,3,1]', output: '4' },
      { input: '[2,7,9,3,1]', output: '12' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_dp003',
    title: 'Coin Change',
    difficulty: 'Medium',
    description: 'Find the minimum number of coins needed to make a given amount.',
    topics: ['Dynamic Programming'],
    companyTags: ['Amazon', 'Facebook'],
    solution: 'function coinChange(coins, amount) {\n  const dp = Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let coin of coins) {\n    for (let i = coin; i <= amount; i++) {\n      dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}',
    testCases: [
      { input: '[1,2,5], 11', output: '3' }
    ],
    xpReward: 25
  },

  // ===== GRAPHS =====
  {
    _id: 'prob_graph001',
    title: 'Number of Islands',
    difficulty: 'Medium',
    description: 'Count the number of islands in a 2D grid.',
    topics: ['Graphs', 'Depth-First Search'],
    companyTags: ['Amazon', 'Facebook', 'Google'],
    solution: 'function numIslands(grid) {\n  let count = 0;\n  function dfs(i, j) {\n    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] === "0") return;\n    grid[i][j] = "0";\n    dfs(i+1, j); dfs(i-1, j); dfs(i, j+1); dfs(i, j-1);\n  }\n  for (let i = 0; i < grid.length; i++) {\n    for (let j = 0; j < grid[0].length; j++) {\n      if (grid[i][j] === "1") { count++; dfs(i, j); }\n    }\n  }\n  return count;\n}',
    testCases: [
      { input: '[["1","1","0"],["1","1","0"],["0","0","1"]]', output: '2' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_graph002',
    title: 'Clone Graph',
    difficulty: 'Medium',
    description: 'Clone an undirected graph.',
    topics: ['Graphs', 'Depth-First Search'],
    companyTags: ['Amazon', 'Facebook'],
    solution: 'function cloneGraph(node, visited = new Map()) {\n  if (!node) return null;\n  if (visited.has(node)) return visited.get(node);\n  const clone = new Node(node.val);\n  visited.set(node, clone);\n  clone.neighbors = node.neighbors.map(n => cloneGraph(n, visited));\n  return clone;\n}',
    testCases: [
      { input: '[[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' }
    ],
    xpReward: 25
  },

  // ===== HTML/CSS =====
  {
    _id: 'prob_html001',
    title: 'Create a Responsive Navigation Bar',
    difficulty: 'Easy',
    description: 'Build a responsive navigation bar using HTML and CSS with mobile menu.',
    topics: ['HTML/CSS'],
    companyTags: ['Frontend'],
    solution: '<nav>\n  <div class="logo">Logo</div>\n  <ul class="nav-links">\n    <li><a href="#home">Home</a></li>\n    <li><a href="#about">About</a></li>\n  </ul>\n</nav>\n\n<style>\nnav { display: flex; justify-content: space-between; }\n@media (max-width: 768px) {\n  .nav-links { flex-direction: column; }\n}\n</style>',
    testCases: [
      { input: 'Desktop view', output: 'Horizontal navigation' },
      { input: 'Mobile view', output: 'Vertical navigation' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_html002',
    title: 'CSS Flexbox Layout',
    difficulty: 'Easy',
    description: 'Create a card layout using CSS Flexbox.',
    topics: ['HTML/CSS'],
    companyTags: ['Frontend'],
    solution: '.container {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n}\n.card {\n  flex: 1 1 300px;\n  padding: 20px;\n  border: 1px solid #ddd;\n}',
    testCases: [
      { input: 'Multiple cards', output: 'Responsive flex layout' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_html003',
    title: 'CSS Grid Dashboard',
    difficulty: 'Medium',
    description: 'Build a dashboard layout using CSS Grid.',
    topics: ['HTML/CSS'],
    companyTags: ['Frontend'],
    solution: '.dashboard {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n}\n.widget {\n  background: white;\n  padding: 20px;\n  border-radius: 8px;\n}',
    testCases: [
      { input: 'Dashboard components', output: 'Grid layout' }
    ],
    xpReward: 20
  },

  // ===== JAVASCRIPT =====
  {
    _id: 'prob_js001',
    title: 'Implement Debounce Function',
    difficulty: 'Medium',
    description: 'Create a debounce function that delays execution.',
    topics: ['JavaScript'],
    companyTags: ['Google', 'Amazon'],
    solution: 'function debounce(func, delay) {\n  let timeoutId;\n  return function(...args) {\n    clearTimeout(timeoutId);\n    timeoutId = setTimeout(() => func.apply(this, args), delay);\n  };\n}',
    testCases: [
      { input: 'Multiple rapid calls', output: 'Only last call executes' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_js002',
    title: 'Deep Clone Object',
    difficulty: 'Medium',
    description: 'Implement a function to deep clone a JavaScript object.',
    topics: ['JavaScript'],
    companyTags: ['Facebook', 'Microsoft'],
    solution: 'function deepClone(obj) {\n  if (obj === null || typeof obj !== "object") return obj;\n  if (obj instanceof Date) return new Date(obj);\n  if (obj instanceof Array) return obj.map(item => deepClone(item));\n  const cloned = {};\n  for (let key in obj) {\n    if (obj.hasOwnProperty(key)) cloned[key] = deepClone(obj[key]);\n  }\n  return cloned;\n}',
    testCases: [
      { input: '{a: 1, b: {c: 2}}', output: 'Deep cloned object' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_js003',
    title: 'Promise.all Implementation',
    difficulty: 'Medium',
    description: 'Implement your own version of Promise.all().',
    topics: ['JavaScript'],
    companyTags: ['Amazon', 'Google'],
    solution: 'function promiseAll(promises) {\n  return new Promise((resolve, reject) => {\n    const results = [];\n    let completed = 0;\n    promises.forEach((promise, index) => {\n      Promise.resolve(promise)\n        .then(value => {\n          results[index] = value;\n          completed++;\n          if (completed === promises.length) resolve(results);\n        })\n        .catch(reject);\n    });\n  });\n}',
    testCases: [
      { input: '[Promise.resolve(1), Promise.resolve(2)]', output: '[1, 2]' }
    ],
    xpReward: 25
  },

  // ===== REACT =====
  {
    _id: 'prob_react001',
    title: 'Build a Todo List Component',
    difficulty: 'Easy',
    description: 'Create a React component that displays a todo list with add/delete functionality.',
    topics: ['React'],
    companyTags: ['Startup', 'Frontend'],
    solution: 'function TodoList() {\n  const [todos, setTodos] = useState([]);\n  const [input, setInput] = useState("");\n  const addTodo = () => {\n    setTodos([...todos, input]);\n    setInput("");\n  };\n  return (\n    <div>\n      <input value={input} onChange={e => setInput(e.target.value)} />\n      <button onClick={addTodo}>Add</button>\n      {todos.map((todo, i) => <div key={i}>{todo}</div>)}\n    </div>\n  );\n}',
    testCases: [
      { input: 'Component renders', output: 'Todo list displayed' }
    ],
    xpReward: 15
  },
  {
    _id: 'prob_react002',
    title: 'Custom Hook - useLocalStorage',
    difficulty: 'Medium',
    description: 'Create a custom hook to sync state with localStorage.',
    topics: ['React'],
    companyTags: ['Frontend'],
    solution: 'function useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    const item = localStorage.getItem(key);\n    return item ? JSON.parse(item) : initialValue;\n  });\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n  return [value, setValue];\n}',
    testCases: [
      { input: 'Set value', output: 'Persists in localStorage' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_react003',
    title: 'Implement Infinite Scroll',
    difficulty: 'Medium',
    description: 'Build a component with infinite scroll functionality.',
    topics: ['React'],
    companyTags: ['Facebook', 'Instagram'],
    solution: 'function InfiniteScroll() {\n  const [items, setItems] = useState([]);\n  const [page, setPage] = useState(1);\n  useEffect(() => {\n    const handleScroll = () => {\n      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {\n        setPage(p => p + 1);\n      }\n    };\n    window.addEventListener("scroll", handleScroll);\n    return () => window.removeEventListener("scroll", handleScroll);\n  }, []);\n  return <div>{items.map(item => <div key={item.id}>{item.name}</div>)}</div>;\n}',
    testCases: [
      { input: 'Scroll to bottom', output: 'Loads more items' }
    ],
    xpReward: 25
  },

  // ===== STATE MANAGEMENT =====
  {
    _id: 'prob_state001',
    title: 'Redux Store Setup',
    difficulty: 'Medium',
    description: 'Set up a Redux store with actions and reducers.',
    topics: ['State Management'],
    companyTags: ['Frontend'],
    solution: 'const initialState = { count: 0 };\nfunction counterReducer(state = initialState, action) {\n  switch (action.type) {\n    case "INCREMENT": return { count: state.count + 1 };\n    case "DECREMENT": return { count: state.count - 1 };\n    default: return state;\n  }\n}\nconst store = createStore(counterReducer);',
    testCases: [
      { input: 'Dispatch INCREMENT', output: 'Count increases' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_state002',
    title: 'Context API Implementation',
    difficulty: 'Easy',
    description: 'Create a theme context for dark/light mode.',
    topics: ['State Management', 'React'],
    companyTags: ['Frontend'],
    solution: 'const ThemeContext = createContext();\nfunction ThemeProvider({ children }) {\n  const [theme, setTheme] = useState("light");\n  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");\n  return (\n    <ThemeContext.Provider value={{ theme, toggleTheme }}>\n      {children}\n    </ThemeContext.Provider>\n  );\n}',
    testCases: [
      { input: 'Toggle theme', output: 'Theme changes globally' }
    ],
    xpReward: 20
  },

  // ===== UI/UX =====
  {
    _id: 'prob_uiux001',
    title: 'Accessible Form Design',
    difficulty: 'Easy',
    description: 'Create an accessible form with proper ARIA labels.',
    topics: ['UI/UX Principles'],
    companyTags: ['Accessibility'],
    solution: '<form>\n  <label htmlFor="email">Email</label>\n  <input\n    id="email"\n    type="email"\n    aria-required="true"\n    aria-describedby="email-error"\n  />\n  <span id="email-error" role="alert"></span>\n</form>',
    testCases: [
      { input: 'Screen reader', output: 'Properly announced' }
    ],
    xpReward: 15
  },
  {
    _id: 'prob_uiux002',
    title: 'Loading Skeleton Component',
    difficulty: 'Easy',
    description: 'Build a loading skeleton for better UX.',
    topics: ['UI/UX Principles'],
    companyTags: ['Frontend'],
    solution: '.skeleton {\n  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);\n  background-size: 200% 100%;\n  animation: loading 1.5s infinite;\n}\n@keyframes loading {\n  0% { background-position: 200% 0; }\n  100% { background-position: -200% 0; }\n}',
    testCases: [
      { input: 'Loading state', output: 'Animated skeleton' }
    ],
    xpReward: 15
  },

  // ===== NODE.JS =====
  {
    _id: 'prob_node001',
    title: 'Create HTTP Server',
    difficulty: 'Easy',
    description: 'Build a basic HTTP server using Node.js.',
    topics: ['Node.js'],
    companyTags: ['Backend'],
    solution: 'const http = require("http");\nconst server = http.createServer((req, res) => {\n  res.writeHead(200, { "Content-Type": "application/json" });\n  res.end(JSON.stringify({ message: "Hello World" }));\n});\nserver.listen(3000);',
    testCases: [
      { input: 'GET /', output: '{"message":"Hello World"}' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_node002',
    title: 'File System Operations',
    difficulty: 'Easy',
    description: 'Read and write files using Node.js fs module.',
    topics: ['Node.js'],
    companyTags: ['Backend'],
    solution: 'const fs = require("fs").promises;\nasync function readWriteFile() {\n  const data = await fs.readFile("input.txt", "utf8");\n  await fs.writeFile("output.txt", data.toUpperCase());\n}',
    testCases: [
      { input: 'input.txt content', output: 'Uppercase in output.txt' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_node003',
    title: 'Event Emitter Implementation',
    difficulty: 'Medium',
    description: 'Create a custom event emitter class.',
    topics: ['Node.js'],
    companyTags: ['Backend'],
    solution: 'class EventEmitter {\n  constructor() { this.events = {}; }\n  on(event, listener) {\n    if (!this.events[event]) this.events[event] = [];\n    this.events[event].push(listener);\n  }\n  emit(event, ...args) {\n    if (this.events[event]) {\n      this.events[event].forEach(listener => listener(...args));\n    }\n  }\n}',
    testCases: [
      { input: 'Emit event', output: 'Listeners called' }
    ],
    xpReward: 25
  },

  // ===== EXPRESS =====
  {
    _id: 'prob_express001',
    title: 'Build REST API Endpoint',
    difficulty: 'Easy',
    description: 'Create an Express endpoint that returns JSON data.',
    topics: ['Express'],
    companyTags: ['Backend', 'Startup'],
    solution: 'const express = require("express");\nconst app = express();\napp.get("/api/users", (req, res) => {\n  res.json({ users: [{ id: 1, name: "John" }] });\n});\napp.listen(3000);',
    testCases: [
      { input: 'GET /api/users', output: '{"users":[{"id":1,"name":"John"}]}' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_express002',
    title: 'Middleware Chain',
    difficulty: 'Medium',
    description: 'Create middleware for logging and error handling.',
    topics: ['Express'],
    companyTags: ['Backend'],
    solution: 'function logger(req, res, next) {\n  console.log(`${req.method} ${req.url}`);\n  next();\n}\nfunction errorHandler(err, req, res, next) {\n  res.status(500).json({ error: err.message });\n}\napp.use(logger);\napp.use(errorHandler);',
    testCases: [
      { input: 'Request', output: 'Logged and handled' }
    ],
    xpReward: 20
  },
  {
    _id: 'prob_express003',
    title: 'Route Parameters and Query',
    difficulty: 'Easy',
    description: 'Handle route parameters and query strings.',
    topics: ['Express'],
    companyTags: ['Backend'],
    solution: 'app.get("/api/users/:id", (req, res) => {\n  const { id } = req.params;\n  const { filter } = req.query;\n  res.json({ userId: id, filter });\n});',
    testCases: [
      { input: 'GET /api/users/123?filter=active', output: '{"userId":"123","filter":"active"}' }
    ],
    xpReward: 10
  },

  // ===== REST APIs =====
  {
    _id: 'prob_api001',
    title: 'CRUD Operations',
    difficulty: 'Medium',
    description: 'Implement full CRUD for a resource.',
    topics: ['REST APIs'],
    companyTags: ['Backend'],
    solution: 'const items = [];\napp.post("/api/items", (req, res) => {\n  const item = { id: Date.now(), ...req.body };\n  items.push(item);\n  res.status(201).json(item);\n});\napp.get("/api/items", (req, res) => res.json(items));\napp.put("/api/items/:id", (req, res) => {\n  const item = items.find(i => i.id == req.params.id);\n  Object.assign(item, req.body);\n  res.json(item);\n});\napp.delete("/api/items/:id", (req, res) => {\n  const index = items.findIndex(i => i.id == req.params.id);\n  items.splice(index, 1);\n  res.status(204).send();\n});',
    testCases: [
      { input: 'POST, GET, PUT, DELETE', output: 'All operations work' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_api002',
    title: 'API Pagination',
    difficulty: 'Medium',
    description: 'Implement pagination for API responses.',
    topics: ['REST APIs'],
    companyTags: ['Backend'],
    solution: 'app.get("/api/items", (req, res) => {\n  const page = parseInt(req.query.page) || 1;\n  const limit = parseInt(req.query.limit) || 10;\n  const startIndex = (page - 1) * limit;\n  const endIndex = page * limit;\n  const results = {\n    data: items.slice(startIndex, endIndex),\n    page,\n    totalPages: Math.ceil(items.length / limit)\n  };\n  res.json(results);\n});',
    testCases: [
      { input: 'GET /api/items?page=2&limit=10', output: 'Paginated results' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_api003',
    title: 'API Rate Limiting',
    difficulty: 'Medium',
    description: 'Implement rate limiting middleware.',
    topics: ['REST APIs'],
    companyTags: ['Backend', 'Security'],
    solution: 'const rateLimit = {};\nfunction rateLimiter(req, res, next) {\n  const ip = req.ip;\n  const now = Date.now();\n  if (!rateLimit[ip]) rateLimit[ip] = [];\n  rateLimit[ip] = rateLimit[ip].filter(time => now - time < 60000);\n  if (rateLimit[ip].length >= 100) {\n    return res.status(429).json({ error: "Too many requests" });\n  }\n  rateLimit[ip].push(now);\n  next();\n}',
    testCases: [
      { input: '100+ requests in 1 min', output: '429 Too Many Requests' }
    ],
    xpReward: 25
  },

  // ===== AUTHENTICATION =====
  {
    _id: 'prob_auth001',
    title: 'Password Hashing',
    difficulty: 'Easy',
    description: 'Hash passwords using bcrypt.',
    topics: ['Authentication'],
    companyTags: ['Backend', 'Security'],
    solution: 'const bcrypt = require("bcrypt");\nasync function hashPassword(password) {\n  const salt = await bcrypt.genSalt(10);\n  return await bcrypt.hash(password, salt);\n}\nasync function verifyPassword(password, hash) {\n  return await bcrypt.compare(password, hash);\n}',
    testCases: [
      { input: 'password123', output: 'Hashed and verified' }
    ],
    xpReward: 15
  },
  {
    _id: 'prob_auth002',
    title: 'JWT Token Generation',
    difficulty: 'Medium',
    description: 'Generate and verify JWT tokens.',
    topics: ['Authentication'],
    companyTags: ['Backend', 'Security'],
    solution: 'const jwt = require("jsonwebtoken");\nfunction generateToken(user) {\n  return jwt.sign(\n    { id: user.id, email: user.email },\n    process.env.JWT_SECRET,\n    { expiresIn: "7d" }\n  );\n}\nfunction verifyToken(token) {\n  return jwt.verify(token, process.env.JWT_SECRET);\n}',
    testCases: [
      { input: 'User object', output: 'Valid JWT token' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_auth003',
    title: 'Auth Middleware',
    difficulty: 'Medium',
    description: 'Create middleware to protect routes.',
    topics: ['Authentication'],
    companyTags: ['Backend', 'Security'],
    solution: 'function authMiddleware(req, res, next) {\n  const token = req.headers.authorization?.split(" ")[1];\n  if (!token) return res.status(401).json({ error: "No token" });\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch (err) {\n    res.status(401).json({ error: "Invalid token" });\n  }\n}',
    testCases: [
      { input: 'Protected route', output: 'Access granted with valid token' }
    ],
    xpReward: 25
  },

  // ===== DATABASES =====
  {
    _id: 'prob_db001',
    title: 'MongoDB CRUD Operations',
    difficulty: 'Easy',
    description: 'Perform basic CRUD with MongoDB.',
    topics: ['Databases'],
    companyTags: ['Backend', 'Database'],
    solution: 'const User = require("./models/User");\n// Create\nconst user = await User.create({ name: "John", email: "john@example.com" });\n// Read\nconst users = await User.find();\n// Update\nawait User.findByIdAndUpdate(id, { name: "Jane" });\n// Delete\nawait User.findByIdAndDelete(id);',
    testCases: [
      { input: 'Database operations', output: 'All CRUD works' }
    ],
    xpReward: 15
  },
  {
    _id: 'prob_db002',
    title: 'Database Indexing',
    difficulty: 'Medium',
    description: 'Create indexes for better query performance.',
    topics: ['Databases'],
    companyTags: ['Backend', 'Database'],
    solution: 'const userSchema = new Schema({\n  email: { type: String, unique: true, index: true },\n  username: { type: String, index: true },\n  createdAt: { type: Date, index: true }\n});\nuserSchema.index({ email: 1, username: 1 });',
    testCases: [
      { input: 'Query with index', output: 'Fast query execution' }
    ],
    xpReward: 25
  },
  {
    _id: 'prob_db003',
    title: 'Database Transactions',
    difficulty: 'Medium',
    description: 'Implement database transactions for data consistency.',
    topics: ['Databases'],
    companyTags: ['Backend', 'Database'],
    solution: 'const session = await mongoose.startSession();\nsession.startTransaction();\ntry {\n  await User.create([{ name: "John" }], { session });\n  await Order.create([{ userId: user.id }], { session });\n  await session.commitTransaction();\n} catch (error) {\n  await session.abortTransaction();\n  throw error;\n} finally {\n  session.endSession();\n}',
    testCases: [
      { input: 'Multiple operations', output: 'All or nothing' }
    ],
    xpReward: 25
  },

  // ===== SQL =====
  {
    _id: 'prob_sql001',
    title: 'Select All Customers',
    difficulty: 'Easy',
    description: 'Write a SQL query to select all customers from a table.',
    topics: ['SQL Basics'],
    companyTags: ['Database'],
    solution: 'SELECT * FROM customers;',
    testCases: [
      { input: 'customers table', output: 'All customer records' }
    ],
    xpReward: 10
  },
  {
    _id: 'prob_sql002',
    title: 'Join Two Tables',
    difficulty: 'Medium',
    description: 'Write a query to join orders with customers.',
    topics: ['Joins'],
    companyTags: ['Database'],
    solution: 'SELECT customers.name, orders.order_id\nFROM customers\nINNER JOIN orders ON customers.id = orders.customer_id;',
    testCases: [
      { input: 'customers and orders tables', output: 'Joined data' }
    ],
    xpReward: 20
  }
];
