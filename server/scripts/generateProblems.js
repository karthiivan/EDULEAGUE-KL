// Script to generate 500+ coding problems

const problems = [];

// Problem templates by category
const categories = {
  arrays: [
    'Find Maximum Element', 'Find Minimum Element', 'Reverse Array', 'Rotate Array',
    'Find Duplicates', 'Remove Duplicates', 'Merge Arrays', 'Array Intersection',
    'Subarray Sum', 'Kadane Algorithm', 'Sliding Window Maximum', 'Dutch National Flag'
  ],
  strings: [
    'Reverse String', 'Palindrome Check', 'Anagram Check', 'Longest Substring',
    'String Compression', 'Valid Parentheses', 'Longest Common Prefix', 'String Permutations',
    'Edit Distance', 'Pattern Matching', 'Regular Expression', 'String to Integer'
  ],
  linkedList: [
    'Reverse Linked List', 'Detect Cycle', 'Merge Lists', 'Remove Nth Node',
    'Find Middle', 'Palindrome List', 'Intersection Point', 'Clone List',
    'Sort List', 'Flatten List', 'Add Numbers', 'Rotate List'
  ],
  trees: [
    'Tree Traversal', 'Maximum Depth', 'Symmetric Tree', 'Path Sum',
    'Level Order', 'Invert Tree', 'Lowest Common Ancestor', 'Serialize Tree',
    'Binary Search Tree', 'Validate BST', 'Kth Smallest', 'Tree Diameter'
  ],
  graphs: [
    'DFS Traversal', 'BFS Traversal', 'Detect Cycle', 'Topological Sort',
    'Shortest Path', 'Connected Components', 'Clone Graph', 'Word Ladder',
    'Course Schedule', 'Network Delay', 'Minimum Spanning Tree', 'Dijkstra Algorithm'
  ],
  dynamicProgramming: [
    'Fibonacci', 'Climbing Stairs', 'Coin Change', 'Longest Increasing Subsequence',
    'Knapsack Problem', 'Edit Distance', 'Matrix Chain', 'Egg Drop',
    'Partition Problem', 'Word Break', 'Longest Palindrome', 'Stock Trading'
  ],
  sorting: [
    'Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort',
    'Quick Sort', 'Heap Sort', 'Counting Sort', 'Radix Sort',
    'Bucket Sort', 'Shell Sort', 'Cycle Sort', 'Pancake Sort'
  ],
  searching: [
    'Binary Search', 'Linear Search', 'Search Insert Position', 'Find Peak',
    'Search Range', 'Search Rotated Array', 'Find Minimum', 'Search 2D Matrix',
    'Median of Arrays', 'Kth Element', 'Square Root', 'First Bad Version'
  ]
};

const companies = ['Google', 'Amazon', 'Microsoft', 'Facebook', 'Apple', 'Netflix', 'Uber', 'Adobe'];
const difficulties = ['Easy', 'Medium', 'Hard'];

let problemId = 1;

// Generate problems for each category
Object.entries(categories).forEach(([category, templates]) => {
  templates.forEach((template, index) => {
    // Generate 3-5 variations per template
    const variations = Math.floor(Math.random() * 3) + 3;
    
    for (let v = 0; v < variations; v++) {
      const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
      const xpReward = difficulty === 'Easy' ? 10 : difficulty === 'Medium' ? 25 : 50;
      const selectedCompanies = companies
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 3) + 2);

      problems.push({
        _id: `prob${String(problemId).padStart(4, '0')}`,
        title: v === 0 ? template : `${template} ${['II', 'III', 'Advanced', 'Optimized', 'Variant'][v - 1]}`,
        difficulty,
        description: `Solve the ${template.toLowerCase()} problem. Given an input, return the expected output.`,
        topics: [category, difficulty === 'Hard' ? 'Advanced' : 'Basic'],
        companyTags: selectedCompanies,
        solution: `// Solution for ${template}\nfunction solve(input) {\n  // Implementation here\n  return result;\n}`,
        testCases: [
          { input: 'Test input 1', output: 'Expected output 1', isHidden: false },
          { input: 'Test input 2', output: 'Expected output 2', isHidden: false },
          { input: 'Test input 3', output: 'Expected output 3', isHidden: true }
        ],
        xpReward,
        acceptanceRate: Math.floor(Math.random() * 40) + 30,
        totalSubmissions: Math.floor(Math.random() * 1000) + 100,
        acceptedSubmissions: 0,
        isActive: true
      });

      problemId++;
      
      if (problemId > 500) break;
    }
    if (problemId > 500) return;
  });
  if (problemId > 500) return;
});

console.log(`Generated ${problems.length} problems`);

// Export for use
module.exports = problems;

// If run directly, write to file
if (require.main === module) {
  const fs = require('fs');
  const path = require('path');
  
  const outputPath = path.join(__dirname, '..', '..', 'src', 'data', 'generatedProblems.js');
  const content = `// Auto-generated problems database\nexport const generatedProblems = ${JSON.stringify(problems, null, 2)};\n`;
  
  fs.writeFileSync(outputPath, content);
  console.log(`✅ Written ${problems.length} problems to ${outputPath}`);
}
