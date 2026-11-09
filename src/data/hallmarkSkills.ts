import { HallmarkSkill } from '../types';

export const HALLMARK_SKILLS: HallmarkSkill[] = [
  {
    id: 'python-code-assistant',
    name: 'Python Code Assistant',
    category: 'code',
    tagline: 'Natural Language to Production Python',
    description: 'Generates idiomatic, PEP-8 compliant Python programs from natural language problem statements with type annotations and docstrings.',
    iconName: 'Code2',
    popular: true,
    inputPlaceholder: 'e.g., Write a function that finds the longest palindromic substring in O(n^2)...',
    presetQueries: [
      'Write a Python program to find duplicates in an array without extra space',
      'Create a password generator with letters, numbers, and symbols',
      'Implement binary search on a sorted list with edge case handling',
      'Write a function to merge two sorted dictionaries'
    ]
  },
  {
    id: 'code-debugger',
    name: 'Code Debugger',
    category: 'debugging',
    tagline: 'Deep Python Error Diagnosis & Instant Fixes',
    description: 'Diagnoses tricky runtime exceptions, syntax errors, off-by-one index faults, and mutability pitfalls with side-by-side patch diffs.',
    iconName: 'Bug',
    popular: true,
    inputPlaceholder: 'Paste your buggy code here...',
    presetQueries: [
      'Fix IndexError: list index out of range when iterating backwards',
      'Fix TypeError: unsupported operand type(s) for +: int and str',
      'Debug mutable default argument problem in function definition'
    ],
    samplePresetCode: `def append_to_list(val, my_list=[]):
    my_list.append(val)
    return my_list

print(append_to_list(1))
print(append_to_list(2)) # Why does this have [1, 2] instead of [2]?`
  },
  {
    id: 'code-explainer',
    name: 'Code Explainer',
    category: 'learning',
    tagline: 'Conceptual & Algorithmic Code Deconstruction',
    description: 'Translates convoluted Python snippets, decorators, generators, and algorithms into crystal-clear mental models with time/space complexity analysis.',
    iconName: 'BookOpen',
    popular: true,
    inputPlaceholder: 'Paste Python snippet to explain...',
    presetQueries: [
      'Explain how list comprehension works internally compared to map/filter',
      'Explain Python *args and **kwargs with practical examples',
      'Explain Python generator functions and yield keyword'
    ],
    samplePresetCode: `def fib_generator(limit):
    a, b = 0, 1
    while a < limit:
        yield a
        a, b = b, a + b

for val in fib_generator(50):
    print(val, end=" ")`
  },
  {
    id: 'logic-builder',
    name: 'Logic Builder',
    category: 'learning',
    tagline: 'From Problem Description to Algorithmic Blueprint',
    description: 'Structures programming problems into logical pseudo-code, mathematical invariance, and step-by-step reasoning before jumping to code.',
    iconName: 'Workflow',
    popular: false,
    inputPlaceholder: 'e.g., How should I approach checking if two strings are anagrams without sorting?',
    presetQueries: [
      'How to design a two-pointer approach to reverse vowels in a string',
      'Explain the logic behind Kadane’s algorithm for maximum subarray sum',
      'How to build logic for an LRU Cache in Python using OrderedDict'
    ]
  },
  {
    id: 'dry-run-assistant',
    name: 'Dry Run Assistant',
    category: 'debugging',
    tagline: 'Line-by-Line Execution & Memory Visualizer',
    description: 'Traces execution flow, variable stack frames, memory allocations, and loop state changes at each step of program execution.',
    iconName: 'PlayCircle',
    popular: true,
    inputPlaceholder: 'Enter code to dry run line by line...',
    presetQueries: [
      'Dry run recursive factorial of 4 step by step',
      'Dry run bubble sort on [5, 1, 4, 2] for pass 1',
      'Trace nested loop star pattern execution'
    ],
    samplePresetCode: `def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)

result = factorial(4)
print("Factorial:", result)`
  },
  {
    id: 'quiz-generator',
    name: 'Quiz Generator',
    category: 'learning',
    tagline: 'Dynamic Knowledge Checks & Diagnostics',
    description: 'Generates targeted multiple-choice diagnostic questions to test your Python comprehension on any topic with instant feedback.',
    iconName: 'HelpCircle',
    popular: false,
    inputPlaceholder: 'Enter a topic for quiz: e.g., Python Slicing or Decorators...',
    presetQueries: [
      'Generate a 3-question quiz on Python Slicing tricks',
      'Quiz me on Python Dictionary methods and hash map lookups',
      'Test my understanding of Scope and Global vs Local variables'
    ]
  },
  {
    id: 'hinglish-tutor',
    name: 'Hinglish Tutor',
    category: 'learning',
    tagline: 'Desi Andaaz me Python Coding Mastery',
    description: 'Explains complex programming abstractions in relatable, everyday Hinglish using daily life analogies while keeping syntax strictly in English.',
    iconName: 'Languages',
    popular: true,
    inputPlaceholder: 'Puchiye Python ka koi bhi sawaal Hinglish me...',
    presetQueries: [
      'Object Oriented Programming ko real life example se samjhao Hinglish me',
      'Python me List aur Tuple me kya antar hota hai simple shabdon me batao',
      'Recursion ko Russian doll ya Chai banane ke example se explain karo'
    ]
  },
  {
    id: 'project-assistant',
    name: 'Project Assistant',
    category: 'projects',
    tagline: 'Real-World Python Project Architecture & Roadmaps',
    description: 'Assists college students in architecting, structuring, and coding complete mini-projects from scratch (CLI apps, scrapers, trackers, games).',
    iconName: 'Rocket',
    popular: true,
    inputPlaceholder: 'e.g., Student Management System with File Handling...',
    presetQueries: [
      'Step-by-step roadmap for a Student Grade Management System using JSON storage',
      'How to build a Command-Line Expense Tracker with summary statistics',
      'Build a simple Text-Based Adventure RPG game using OOP in Python'
    ]
  }
];
