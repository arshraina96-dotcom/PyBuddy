import { KnowledgeTopic } from '../types';

export const PYTHON_KNOWLEDGE_BASE: KnowledgeTopic[] = [
  // 1. Python Fundamentals
  {
    id: 'intro-to-python',
    category: 'Python Fundamentals',
    title: 'Introduction to Python',
    summary: 'Python is a high-level, interpreted, dynamically typed programming language known for readable syntax and vast standard library.',
    hinglishSummary: 'Python ek beginner-friendly aur powerful programming language hai jiska syntax English jaisa aasan aur clear hota hai.',
    syntax: '# Print statement\nprint("Hello, Python!")',
    exampleCode: `name = "Student"
age = 20
print(f"Welcome {name}! Ready to master Python at age {age}?")`,
    expectedOutput: 'Welcome Student! Ready to master Python at age 20?',
    explanation: 'Python uses clean indentation instead of curly braces. Variables are dynamically typed, meaning you do not declare types beforehand.',
    hinglishExplanation: 'Python me semicolon ya curly braces ki jaroorat nahi hoti. Indentation (spacing) se blocks define hote hain.',
    analogy: 'Writing Python is like writing a recipe in plain English that a computer executes step by step.',
    commonErrors: ['IndentationError: unexpected indent', 'SyntaxError: invalid syntax']
  },
  {
    id: 'variables-data-types',
    category: 'Python Fundamentals',
    title: 'Variables and Data Types',
    summary: 'Variables are containers for storing data values. Common data types include int, float, str, and bool.',
    hinglishSummary: 'Variables memory me bane huye labelled dabbe (containers) hote hain jinme alag-alag data types (number, text, boolean) store hote hain.',
    syntax: `x = 10         # integer
pi = 3.14      # float
name = "Py"    # string
is_valid = True # boolean`,
    exampleCode: `marks = 92
cgpa = 9.2
student = "Aarav"
has_passed = marks >= 40

print("Type of marks:", type(marks).__name__)
print("Type of cgpa:", type(cgpa).__name__)
print(f"{student} passed status: {has_passed}")`,
    expectedOutput: `Type of marks: int
Type of cgpa: float
Aarav passed status: True`,
    explanation: 'type() built-in function returns the data class of the object. Memory allocation happens automatically when assignment occurs.',
    hinglishExplanation: 'Jab aap `marks = 92` likhte ho, Python memory me 92 store karta hai aur "marks" label usse jod deta hai.',
    analogy: 'Think of variables as labelled jars in a kitchen — one jar labeled "Sugar" (str), one "Salt" (float), one "Biscuits count" (int).',
    commonErrors: ['TypeError: can only concatenate str to str, not "int"']
  },
  {
    id: 'conditional-statements',
    category: 'Python Fundamentals',
    title: 'Conditional Statements (if, elif, else)',
    summary: 'Conditional statements execute specific code blocks depending on whether a boolean expression evaluates to True or False.',
    hinglishSummary: 'Conditionals decision lene ke kaam aate hain — agar condition sach hai toh ye chalao, warna dusra raasta lo.',
    syntax: `if condition1:
    # executed if condition1 is True
elif condition2:
    # executed if condition2 is True
else:
    # executed if all conditions are False`,
    exampleCode: `score = 85

if score >= 90:
    grade = "A+"
elif score >= 80:
    grade = "A"
elif score >= 70:
    grade = "B"
else:
    grade = "Keep Practicing!"

print(f"For score {score}, assigned grade is: {grade}")`,
    expectedOutput: 'For score 85, assigned grade is: A',
    explanation: 'Python checks conditions from top to bottom. The moment one evaluates to True, its block executes and the rest are skipped.',
    hinglishExplanation: 'Jaise traffic signal pe: Red ho toh ruko, Yellow ho toh wait karo, Green ho toh jao. Python bhi ek condition match hote hi baaki skip kar deta hai.',
    analogy: 'Deciding whether to take an umbrella: If it rains, open umbrella; else if cloudy, carry it; else enjoy sunshine.',
    commonErrors: ['SyntaxError: expected ":"', 'IndentationError']
  },

  // 2. Loops
  {
    id: 'for-loop',
    category: 'Loops',
    title: 'For Loop and range()',
    summary: 'A for loop iterates over the items of any sequence (such as a list, string, or range) in sequential order.',
    hinglishSummary: 'For loop ka use tab hota hai jab hume kisi sequence ke elements par ek-ek karke perform karna hota hai ya fixed count repeat karna hota hai.',
    syntax: `for element in sequence:
    # body of loop

# range(start, stop, step)
for i in range(1, 6):
    print(i)`,
    exampleCode: `fruits = ["apple", "mango", "banana"]
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit.capitalize()}")`,
    expectedOutput: `1. Apple
2. Mango
3. Banana`,
    explanation: 'range(start, stop, step) generates numbers from start up to stop-1. enumerate() provides both the index and value.',
    hinglishExplanation: 'Socho class me teacher attendance le rahe hain: Ek-ek roll number ko call karke attendance mark ki ja rahi hai.',
    analogy: 'A conveyor belt in a factory where each item passes through an inspection point one after another.',
    commonErrors: ['IndexError when confusing item value with index', 'Stop boundary is exclusive: range(1, 5) stops at 4']
  },
  {
    id: 'while-loop',
    category: 'Loops',
    title: 'While Loop & Loop Controls',
    summary: 'A while loop repeatedly executes a target statement as long as a given condition is True. break terminates, continue skips.',
    hinglishSummary: 'While loop tab tak chalta rehta hai jab tak di gayi condition True rehti hai. break se loop turant band hota hai, continue se agla round shuru hota hai.',
    syntax: `while condition:
    # statements
    # update counter or condition`,
    exampleCode: `count = 5
while count > 0:
    if count == 3:
        print(f"Skipping checkpoint {count}!")
        count -= 1
        continue
    print(f"Countdown: {count}")
    count -= 1
print("Liftoff! 🚀")`,
    expectedOutput: `Countdown: 5
Countdown: 4
Skipping checkpoint 3!
Countdown: 2
Countdown: 1
Liftoff! 🚀`,
    explanation: 'Always ensure the loop variable is modified inside the body to prevent an infinite loop.',
    hinglishExplanation: 'Jab tak phone ki battery 0% na ho, gaana bajte rahega. Jaise hi charge khatam, gaana band.',
    analogy: 'Filling water in a bucket: while bucket is not full, keep pouring water.',
    commonErrors: ['Infinite loop: forgetting to increment or decrement the condition variable']
  },

  // 3. Data Structures
  {
    id: 'lists-comprehension',
    category: 'Data Structures',
    title: 'Lists and List Comprehension',
    summary: 'Lists are ordered, mutable collections of items. List comprehension provides a concise syntax to create lists based on existing iterables.',
    hinglishSummary: 'List ek dynamic, order-wise list hoti hai jisme items add, remove aur change ho sakte hain. List comprehension ise 1 line me banane ka fast tareeka hai.',
    syntax: `my_list = [1, 2, 3]
my_list.append(4)
# Comprehension: [expression for item in iterable if condition]
evens = [x for x in range(10) if x % 2 == 0]`,
    exampleCode: `numbers = [1, 2, 3, 4, 5, 6]
squares = [n ** 2 for n in numbers if n % 2 == 0]
print("Original:", numbers)
print("Even squares:", squares)`,
    expectedOutput: `Original: [1, 2, 3, 4, 5, 6]
Even squares: [4, 16, 36]`,
    explanation: 'Lists support indexing (starts at 0), negative indexing (from back), and slicing [start:stop:step].',
    hinglishExplanation: 'Ghar ke ration ki list — aap naye items add kar sakte ho (append), purane kaat sakte ho (remove), aur sequence yaad rehta hai.',
    analogy: 'A modular train where you can attach new wagons, uncouple wagons, or reorder them at any station.',
    commonErrors: ['IndexError: list index out of range', 'Modifying a list while iterating over it']
  },
  {
    id: 'dictionaries',
    category: 'Data Structures',
    title: 'Dictionaries (Hash Maps)',
    summary: 'Dictionaries store data values in key:value pairs. They are ordered, changeable, and do not allow duplicate keys.',
    hinglishSummary: 'Dictionary real life dictionary jaisi hoti hai jahan har Word (Key) ka ek Meaning (Value) hota hai. O(1) time me lookup milta hai.',
    syntax: `student = {"name": "Priya", "roll": 101, "course": "Python"}
# Access safely with .get()
val = student.get("age", "Not Found")`,
    exampleCode: `scores = {"Math": 95, "Physics": 88, "CS": 99}
scores["Chemistry"] = 92  # Add key-value

for subject, mark in scores.items():
    print(f"{subject}: {mark}")`,
    expectedOutput: `Math: 95
Physics: 88
CS: 99
Chemistry: 92`,
    explanation: 'Keys must be immutable types (strings, numbers, tuples). Values can be any data type.',
    hinglishExplanation: 'Phonebook me contact ka naam "Key" hai aur uska phone number "Value" hai. Naam dial karte hi number mil jata hai.',
    analogy: 'A locker room where each locker number (key) uniquely opens a compartment holding belongings (value).',
    commonErrors: ['KeyError when accessing a non-existent key with dict[key] instead of dict.get(key)']
  },

  // 4. Functions
  {
    id: 'functions-recursion',
    category: 'Functions',
    title: 'Functions & Recursion',
    summary: 'A function is a reusable block of code. A recursive function solves a problem by calling itself with smaller sub-problems until reaching a base case.',
    hinglishSummary: 'Function ek reusable machine hai jisme inputs (arguments) daalo aur result (return) lo. Recursion wo function hai jo khud ko tab tak call karta hai jab tak base condition na aa jaye.',
    syntax: `def function_name(param1, param2=default):
    return result

def factorial(n):
    if n <= 1: return 1  # Base case
    return n * factorial(n - 1)  # Recursive step`,
    exampleCode: `def calc_factorial(n):
    if n <= 1:
        return 1
    return n * calc_factorial(n - 1)

val = 5
print(f"Factorial of {val} is: {calc_factorial(val)}")`,
    expectedOutput: 'Factorial of 5 is: 120',
    explanation: 'Every recursive function needs a base case to stop execution; otherwise, Python raises RecursionError: maximum recursion depth exceeded.',
    hinglishExplanation: 'Russian Matryoshka dolls: Ek badi gudiya ke andar choti gudiya, fir uske andar aur choti, jab tak sabse choti (base case) na mil jaye.',
    analogy: 'A coffee vending machine: press button (call function with parameter), beans grind, hot coffee pours out (return value).',
    commonErrors: ['RecursionError: maximum recursion depth exceeded (missing base case)', 'Returning None because of missing return keyword']
  },

  // 5. Problem Solving
  {
    id: 'palindrome-check',
    category: 'Problem Solving',
    title: 'Palindrome Checking',
    summary: 'A palindrome is a word, phrase, or number that reads the same backward as forward (e.g., radar, 121).',
    hinglishSummary: 'Palindrome wo word ya number hota hai jo ulta padhne par bhi bilkul wahi hota hai, jaise "MADAM" ya 121.',
    syntax: `# Slicing trick
is_palindrome = text == text[::-1]`,
    exampleCode: `def check_palindrome(s):
    cleaned = "".join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]

test_word = "A man, a plan, a canal: Panama"
print(f"'{test_word}' is palindrome? -> {check_palindrome(test_word)}")`,
    expectedOutput: "'A man, a plan, a canal: Panama' is palindrome? -> True",
    explanation: 'Using Python slicing [::-1] creates a reversed copy of the string in O(n) time. Case normalization ensures robust comparison.',
    hinglishExplanation: 'String slicing [::-1] se string seedha ulti ho jati hai. Dono ko compare karo aur True/False return karo.',
    analogy: 'Looking into a flat mirror: symmetric objects look identical from both sides.',
    commonErrors: ['Not ignoring punctuation or uppercase vs lowercase letters']
  },
  {
    id: 'fibonacci-series',
    category: 'Problem Solving',
    title: 'Fibonacci Series (Iterative vs Recursive)',
    summary: 'The Fibonacci sequence is a series of numbers where each number is the sum of the two preceding ones: 0, 1, 1, 2, 3, 5, 8, 13...',
    hinglishSummary: 'Fibonacci series me har agla number apne pichle do numbers ka sum hota hai: 0, 1, 1, 2, 3, 5, 8, 13...',
    syntax: `a, b = 0, 1
for _ in range(n):
    print(a)
    a, b = b, a + b`,
    exampleCode: `def generate_fibonacci(count):
    series = []
    a, b = 0, 1
    for _ in range(count):
        series.append(a)
        a, b = b, a + b
    return series

print("First 8 Fibonacci numbers:", generate_fibonacci(8))`,
    expectedOutput: 'First 8 Fibonacci numbers: [0, 1, 1, 2, 3, 5, 8, 13]',
    explanation: 'Iterative approach runs in O(n) time and O(n) space. Multiple assignment `a, b = b, a + b` evaluates right-hand side first.',
    hinglishExplanation: 'Pythagorean rabbit population growth ya spiral shells ki mathematics. Python me `a, b = b, a + b` ek hi line me swap aur sum kar deta hai.',
    analogy: 'Climbing stairs taking steps formed by combining the count of preceding positions.',
    commonErrors: ['Using naive recursive fib(n) without memoization causes O(2^n) exponential lag']
  },

  // 6. Advanced Concepts
  {
    id: 'oop-classes-objects',
    category: 'Advanced Concepts',
    title: 'Object-Oriented Programming (OOP)',
    summary: 'OOP organizes code into classes (blueprints) and objects (instances). Core pillars include Inheritance, Encapsulation, and Polymorphism.',
    hinglishSummary: 'OOP code ko real-world objects jaise structure karta hai. Class ek naksha (blueprint) hoti hai aur Object uska actual bana hua ghar.',
    syntax: `class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def drive(self):
        return f"{self.brand} {self.model} is zooming!"`,
    exampleCode: `class Student:
    def __init__(self, name, roll_no):
        self.name = name
        self.roll_no = roll_no
        self.skills = []

    def add_skill(self, skill):
        self.skills.append(skill)
        return f"Added {skill} for {self.name}!"

s1 = Student("Rohan", 42)
s1.add_skill("Python")
s1.add_skill("Machine Learning")
print(f"Student: {s1.name}, Skills: {', '.join(s1.skills)}")`,
    expectedOutput: 'Student: Rohan, Skills: Python, Machine Learning',
    explanation: '__init__ is the initializer method. `self` represents the specific instance being operated upon.',
    hinglishExplanation: 'Architecture blueprint (Class) se chahe jitne flats (Objects) bana lo. Har flat ka furniture aur resident (Attributes) alag ho sakte hain.',
    analogy: 'Car manufacturing blueprint vs the actual car parked in your garage.',
    commonErrors: ['Forgetting "self" as the first parameter in class methods', 'Misspelling __init__ as _init_']
  },
  {
    id: 'exception-handling',
    category: 'Advanced Concepts',
    title: 'Exception Handling (try-except-finally)',
    summary: 'Exception handling allows graceful recovery from runtime errors without crashing the application.',
    hinglishSummary: 'Jab program me achanak koi galti aaye, toh app crash hone ke bajaye safely handle ho sake, iske liye try-except use hota hai.',
    syntax: `try:
    # risky code
except ValueError as e:
    # handle error
else:
    # runs if no exception occurred
finally:
    # always runs`,
    exampleCode: `def safe_divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        return "Error: Cannot divide by zero!"
    except TypeError:
        return "Error: Both arguments must be numbers!"
    else:
        return f"Result: {result}"
    finally:
        pass # Cleanups go here

print(safe_divide(10, 2))
print(safe_divide(10, 0))
print(safe_divide(10, "two"))`,
    expectedOutput: `Result: 5.0
Error: Cannot divide by zero!
Error: Both arguments must be numbers!`,
    explanation: 'try catches any runtime exception. You can catch specific error classes and handle resources in finally.',
    hinglishExplanation: 'Circuits me fuse wire ki tarah — excessive current aane par pura house wiring jalne ke bajaye fuse disconnect ho jata hai.',
    analogy: 'Wearing a helmet while riding — if a bump occurs, you are protected instead of crashing.',
    commonErrors: ['Bare "except:" clause catching KeyboardInterrupt and SystemExit unintentionally']
  }
];

export const CATEGORIES = [
  'Python Fundamentals',
  'Loops',
  'Data Structures',
  'Functions',
  'Problem Solving',
  'Advanced Concepts',
];
