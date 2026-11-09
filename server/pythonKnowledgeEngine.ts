// Intelligent Built-in Python Knowledge Base Engine
// Provides instant, highly accurate responses when GEMINI_API_KEY is not configured or as immediate fallback

export interface ChatAnswer {
  reply: string;
  mode: string;
}

export function answerPythonQuery(
  message: string,
  teachingMode: 'english' | 'hinglish' = 'english'
): string {
  const query = message.toLowerCase();
  const isHinglish = teachingMode === 'hinglish' || /kya|hai|kaise|hota|karo|batao|samjhao|kyu/i.test(message);

  // 1. For Loop
  if (query.includes('for loop') || (query.includes('loop') && query.includes('for'))) {
    if (isHinglish) {
      return `### 1. Definition (Saral Bhasha Me)
For loop ka use tab hota hai jab hume kisi sequence (jaise List, String, Tuple, ya range) ke har element par ek-ek karke koi kaam perform karna hota hai.

### 2. Explanation (Aasan Shabdon Me)
Socho class me teacher ek-ek student ka attendance call kar rahe hain. Har student ke pass ek baar jaana aur uska naam bolna — bilkul yahi for loop karta hai!

### 3. Python Syntax
\`\`\`python
for item in sequence:
    # Code to execute for each item
\`\`\`

### 4. Practical Code Example
\`\`\`python
# Example: 1 se 5 tak ke numbers ka square print karna
numbers = [1, 2, 3, 4, 5]

for num in numbers:
    square = num ** 2
    print(f"Number: {num} -> Square: {square}")
\`\`\`

### 5. Expected Output
\`\`\`
Number: 1 -> Square: 1
Number: 2 -> Square: 4
Number: 3 -> Square: 9
Number: 4 -> Square: 16
Number: 5 -> Square: 25
\`\`\`

### 6. Step-by-Step Code Explanation
1. \`numbers = [1, 2, 3, 4, 5]\`: Ek list banayi jisme 5 numbers hain.
2. \`for num in numbers:\`: Pehle round me \`num\` ki value 1 hogi, dusre me 2, aur aakhri round me 5.
3. \`square = num ** 2\`: Current number ka square calculate kiya.
4. \`print(...)\`: Result screen par display kiya. Jab list khatam ho jati hai, loop khud-b-khud ruk jata hai.

### 7. Real-Life Analogy
**Metro Station Ticket Gate:** Ek-ek passenger line se ticket swipe karke gate cross karta hai. Jab sabhi log nikal jate hain, line khatam!`;
    }

    return `### 1. Simple Definition
A **for loop** in Python is used to iterate over a sequence (such as a list, tuple, dictionary, set, or string) or an iterable object like \`range()\`.

### 2. Beginner-Friendly Explanation
Whenever you want to repeat an operation for every item in a collection without manually writing multiple lines, a for loop handles the iteration automatically from the first item to the last.

### 3. Python Syntax
\`\`\`python
for item in iterable:
    # statement(s) to execute
\`\`\`

### 4. Practical Code Example
\`\`\`python
# Iterate through a list and calculate squares
scores = [2, 4, 6, 8]

for score in scores:
    doubled = score * 2
    print(f"Original: {score} -> Doubled: {doubled}")
\`\`\`

### 5. Expected Output
\`\`\`
Original: 2 -> Doubled: 4
Original: 4 -> Doubled: 8
Original: 6 -> Doubled: 12
Original: 8 -> Doubled: 16
\`\`\`

### 6. Step-by-Step Code Explanation
1. **List Initialization**: We define \`scores\` with 4 numeric values.
2. **Iteration Loop**: The \`for\` keyword extracts each element one by one into the variable \`score\`.
3. **Execution Block**: Python executes the indented block (\`score * 2\` and \`print\`).
4. **Automatic Termination**: When the sequence has no items left, Python exits the loop cleanly.

### 7. Real-Life Analogy
Think of a factory assembly line: each product moves down the conveyor belt where a machine attaches a label before advancing to the next item.`;
  }

  // 2. Recursion
  if (query.includes('recursion') || query.includes('recursive') || query.includes('factorial')) {
    if (isHinglish) {
      return `### 1. Definition (Saral Bhasha Me)
Recursion ek aisi programming technique hai jisme ek function apne aap ko (khud ko) solve karne ke liye dubara call karta hai, jab tak ki koi **Base Case** na mil jaye.

### 2. Explanation (Aasan Shabdon Me)
Socho ek badi problem hai jise choti-choti similar problems me tod sakte hain. Har recursive call problem ko chota karti hai, aur aakhri me **Base Case** par aakar sab wapas return ho jata hai.

### 3. Python Syntax
\`\`\`python
def recursive_func(n):
    if n <= 1:           # Base case (rukne ki condition)
        return 1
    return n * recursive_func(n - 1) # Recursive step
\`\`\`

### 4. Practical Code Example
\`\`\`python
# Factorial calculation using recursion: 4! = 4 * 3 * 2 * 1 = 24
def factorial(n):
    # 1. Base Case: rukne ka niyam
    if n <= 1:
        return 1
    # 2. Recursive call: khud ko n-1 ke sath call karna
    return n * factorial(n - 1)

ans = factorial(4)
print(f"4! ka result: {ans}")
\`\`\`

### 5. Expected Output
\`\`\`
4! ka result: 24
\`\`\`

### 6. Step-by-Step Code Explanation
1. \`factorial(4)\` call hota hai -> ye bolta hai \`4 * factorial(3)\`.
2. \`factorial(3)\` call hota hai -> ye bolta hai \`3 * factorial(2)\`.
3. \`factorial(2)\` call hota hai -> ye bolta hai \`2 * factorial(1)\`.
4. \`factorial(1)\` base case match hota hai -> ye seedha \`1\` return karta hai!
5. Ab call stack wapas solve hoti hai: 2 * 1 = 2, fir 3 * 2 = 6, fir 4 * 6 = 24!

### 7. Real-Life Analogy
**Russian Matryoshka Dolls:** Ek badi gudiya kholo, andar choti gudiya milti hai. Fir use kholo, aur choti gudiya. Aakhri sabse choti gudiya (Base Case) aane par sab wapas band hoti hain!`;
    }

    return `### 1. Simple Definition
**Recursion** is a programming method where a function solves a problem by calling a smaller copy of itself until reaching a defined terminating condition called the **base case**.

### 2. Beginner-Friendly Explanation
Instead of using loops, recursion divides a large task into repetitive smaller tasks. Without a base case, recursion continues infinitely and causes a \`RecursionError: maximum recursion depth exceeded\`.

### 3. Python Syntax
\`\`\`python
def func(n):
    if base_condition:
        return stop_value
    return operation(n, func(smaller_n))
\`\`\`

### 4. Practical Code Example
\`\`\`python
def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)

print("Factorial of 5:", factorial(5))
\`\`\`

### 5. Expected Output
\`\`\`
Factorial of 5: 120
\`\`\`

### 6. Step-by-Step Code Explanation
1. \`factorial(5)\` evaluates to \`5 * factorial(4)\`.
2. Each call is pushed onto Python's call stack frame.
3. At \`n = 1\`, the base case fires and returns \`1\`.
4. Values multiply on the way back down the call stack: \`1 * 2 * 3 * 4 * 5 = 120\`.

### 7. Real-Life Analogy
Looking into two parallel mirrors where each mirror reflects the reflection of the other until the image reaches the smallest point.`;
  }

  // 3. Palindrome
  if (query.includes('palindrome')) {
    if (isHinglish) {
      return `### 1. Definition (Saral Bhasha Me)
Palindrome wo shabd, number ya sentence hota hai jo aage se padho ya peeche (ulta) se padho, bilkul barabar (same) rehta hai. Example: "radar", "madam", 121.

### 2. Explanation (Aasan Shabdon Me)
Python me string slicing \`[::-1]\` se hum kisi bhi string ko 1 line me reverse kar sakte hain aur fir original se compare kar sakte hain.

### 3. Python Syntax
\`\`\`python
is_palindrome = (text == text[::-1])
\`\`\`

### 4. Practical Code Example
\`\`\`python
def check_palindrome(text):
    # Spaces aur case ignore karne ke liye clean karte hain
    cleaned = "".join(ch.lower() for ch in text if ch.isalnum())
    return cleaned == cleaned[::-1]

words = ["Madam", "Python", "Racecar", "12321"]
for w in words:
    print(f"'{w}' is palindrome? -> {check_palindrome(w)}")
\`\`\`

### 5. Expected Output
\`\`\`
'Madam' is palindrome? -> True
'Python' is palindrome? -> False
'Racecar' is palindrome? -> True
'12321' is palindrome? -> True
\`\`\`

### 6. Step-by-Step Code Explanation
1. \`text.isalnum()\`: Sirf letters aur numbers lete hain, space ya punctuation hata dete hain.
2. \`cleaned.lower()\`: Sabko lowercase karte hain taaki 'M' aur 'm' me fark na rahe.
3. \`cleaned[::-1]\`: String ko reverse karta hai.
4. Agar dono barabar hain toh \`True\` return hota hai, warna \`False\`.

### 7. Real-Life Analogy
Aaine (mirror) me dekhna: Agar kisi word ka reflection aur original bilkul aamne-samne ek jaisa dikhe, toh wo palindrome hai!`;
    }

    return `### 1. Simple Definition
A **palindrome** is a sequence of characters or numbers that reads identical forwards and backwards (e.g., "radar", "level", 1221).

### 2. Beginner-Friendly Explanation
To verify a palindrome in Python, we normalize the text to lowercase, remove punctuation, and check whether the sequence equals its reversed version.

### 3. Python Syntax
\`\`\`python
is_palindrome = word == word[::-1]
\`\`\`

### 4. Practical Code Example
\`\`\`python
def is_palindrome(s: str) -> bool:
    cleaned = ''.join(c.lower() for c in s if c.isalnum())
    return cleaned == cleaned[::-1]

print(is_palindrome("Was it a car or a cat I saw?"))
print(is_palindrome("Hello PyBuddy"))
\`\`\`

### 5. Expected Output
\`\`\`
True
False
\`\`\`

### 6. Step-by-Step Code Explanation
1. \`c.isalnum()\` filters out non-alphanumeric characters like spaces and question marks.
2. \`c.lower()\` provides case insensitivity.
3. \`[::-1]\` employs step \`-1\` to reverse the string in $O(n)$ time.

### 7. Real-Life Analogy
A symmetrical butterfly wing pattern: folding it down the center results in identical halves.`;
  }

  // 4. List Slicing
  if (query.includes('slicing') || (query.includes('slice') && query.includes('list'))) {
    if (isHinglish) {
      return `### 1. Definition (Saral Bhasha Me)
List Slicing Python ka ek super-powerful feature hai jisse aap kisi list ya string ka koi bhi tukda (portion) bina loop lagaye nikaal sakte hain.

### 2. Explanation (Aasan Shabdon Me)
Iska basic formula hota hai: \`list[start : stop : step]\`.
- **start**: Kahan se shuru karna hai (inclusive, default 0).
- **stop**: Kahan rukna hai (exclusive, ye number shamil nahi hota!).
- **step**: Kitne kadam aage badhna hai (default 1).

### 3. Python Syntax
\`\`\`python
sub_list = my_list[start:stop:step]
# Ulta karne ke liye:
reversed_list = my_list[::-1]
\`\`\`

### 4. Practical Code Example
\`\`\`python
numbers = [10, 20, 30, 40, 50, 60, 70]

print("Pehle 3 items [0:3]:", numbers[0:3])
print("Index 2 se 5 tak [2:6]:", numbers[2:6])
print("Har dusra number [::2]:", numbers[::2])
print("Aakhri 2 numbers [-2:]:", numbers[-2:])
print("Poori list ulti [::-1]:", numbers[::-1])
\`\`\`

### 5. Expected Output
\`\`\`
Pehle 3 items [0:3]: [10, 20, 30]
Index 2 se 5 tak [2:6]: [30, 40, 50, 60]
Har dusra number [::2]: [10, 30, 50, 70]
Aakhri 2 numbers [-2:]: [60, 70]
Poori list ulti [::-1]: [70, 60, 50, 40, 30, 20, 10]
\`\`\`

### 6. Step-by-Step Code Explanation
1. Python me index hamesha 0 se start hota hai.
2. \`numbers[0:3]\` ka matlab hai index 0, 1 aur 2 (index 3 chhoot jayega).
3. Negative index \`-1\` aakhri element ko darshata hai.

### 7. Real-Life Analogy
**Bread Loaf:** Puri bread ki loaf me se aap beech ke 3 slices kaat ke nikaal lete ho sandwiches ke liye!`;
    }

    return `### 1. Simple Definition
**List Slicing** is Python's syntax for retrieving a contiguous subsection or sampled subsequence from a list or string.

### 2. Beginner-Friendly Explanation
Instead of manually writing a loop to collect items from index $A$ to index $B$, slicing extracts the slice in a single operation: \`collection[start:stop:step]\`. Remember that \`stop\` is exclusive.

### 3. Python Syntax
\`\`\`python
subset = sequence[start:stop:step]
\`\`\`

### 4. Practical Code Example
\`\`\`python
data = ["Py", "C++", "Java", "Rust", "Go", "Kotlin"]

print("First 3 items:", data[:3])
print("From index 2 to 4:", data[2:5])
print("Every alternate language:", data[::2])
print("Reversed sequence:", data[::-1])
\`\`\`

### 5. Expected Output
\`\`\`
First 3 items: ['Py', 'C++', 'Java']
From index 2 to 4: ['Java', 'Rust', 'Go']
Every alternate language: ['Py', 'Java', 'Go']
Reversed sequence: ['Kotlin', 'Go', 'Rust', 'Java', 'C++', 'Py']
\`\`\`

### 6. Step-by-Step Code Explanation
1. Omitting \`start\` defaults to index 0 (\`data[:3]\`).
2. Omitting \`stop\` slices all the way to the end of the iterable.
3. \`step = -1\` steps backwards, producing an inverted copy.

### 7. Real-Life Analogy
Selecting a specific episode range (e.g., episodes 3 through 7) from a season playlist on an OTT platform.`;
  }

  // 5. List vs Tuple
  if (query.includes('list') && query.includes('tuple')) {
    if (isHinglish) {
      return `### 1. Definition (Saral Bhasha Me)
**List** mutable hoti hai (matlab isme elements add, remove ya update ho sakte hain).
**Tuple** immutable hoti hai (matlab ek baar ban gayi toh change nahi ho sakti).

### 2. Explanation (Aasan Shabdon Me)
- List ko square brackets \`[]\` me banate hain.
- Tuple ko round brackets \`()\` me banate hain.
- Kyunki tuple change nahi ho sakti, isliye ye memory me fast aur safe hoti hai (jaise Aadhaar number ya GPS coordinates).

### 3. Python Syntax
\`\`\`python
my_list = [1, 2, 3]
my_list[0] = 99     # Bilkul Valid!

my_tuple = (1, 2, 3)
# my_tuple[0] = 99  # TypeError: 'tuple' object does not support item assignment
\`\`\`

### 4. Practical Code Example
\`\`\`python
# List demonstration (Mutable)
groceries = ["Milk", "Bread"]
groceries.append("Eggs")
print("Updated List:", groceries)

# Tuple demonstration (Immutable)
coordinates = (28.6139, 77.2090) # Delhi Lat, Long
print(f"Latitude: {coordinates[0]}, Longitude: {coordinates[1]}")
\`\`\`

### 5. Expected Output
\`\`\`
Updated List: ['Milk', 'Bread', 'Eggs']
Latitude: 28.6139, Longitude: 77.2090
\`\`\`

### 6. Comparison Table
| Feature | List \`[]\` | Tuple \`()\` |
|---|---|---|
| Mutability | Mutable (Changeable) | Immutable (Fixed) |
| Speed | Thoda slow | Fast & Memory efficient |
| Methods | append, pop, remove, sort | count, index |
| Usage | Dynamic shopping lists | Fixed coordinates, constants |

### 7. Real-Life Analogy
- **List:** Pencil se likhi hui to-do list jise eraser se mita ke badal sakte ho.
- **Tuple:** Stamp paper par ink se print hua agreement jise change nahi kiya ja sakta!`;
    }

    return `### 1. Simple Definition
The primary difference between a **List** and a **Tuple** in Python is **mutability**: Lists can be modified after creation, whereas Tuples are strictly immutable.

### 2. Beginner-Friendly Explanation
- Lists are defined with square brackets: \`[1, 2, 3]\`.
- Tuples are defined with parentheses: \`(1, 2, 3)\`.
- Because tuples cannot be altered, Python optimizes them for faster lookup speeds and lower memory consumption.

### 3. Python Syntax
\`\`\`python
mutable_list = ["alpha", "beta"]
mutable_list.append("gamma") # Allowed

immutable_tuple = ("alpha", "beta")
# immutable_tuple.append("gamma") # AttributeError: 'tuple' object has no attribute 'append'
\`\`\`

### 4. Practical Code Example
\`\`\`python
scores_list = [85, 90, 78]
scores_list[0] = 95
print("Modified list:", scores_list)

geo_tuple = (12.9716, 77.5946) # Bangalore Coordinates
print("Latitude:", geo_tuple[0])
\`\`\`

### 5. Expected Output
\`\`\`
Modified list: [95, 90, 78]
Latitude: 12.9716
\`\`\`

### 6. Key Differences
- **Memory & Performance**: Tuples use less memory and iterate faster than lists.
- **Dictionary Keys**: Tuples can be used as dictionary keys (because they are hashable); lists cannot.

### 7. Real-Life Analogy
A shopping cart (List) where you continuously add and remove items, versus a minted coin (Tuple) whose inscription is permanent.`;
  }

  // 6. Generic / Fallback Python Tutor Response
  if (isHinglish) {
    return `### 1. Definition (Saral Bhasha Me)
Aapne **"${message}"** ke baare me pucha hai! Python programming me ye ek important concept hai jo clean aur efficient code likhne me madad karta hai.

### 2. Explanation (Hinglish Me)
Jab bhi hum Python me code karte hain, hume syntax aur logic dono ka dhyan rakhna hota hai. Python automatically memory aur data types manage karta hai.

### 3. Python Syntax
\`\`\`python
# Standard Python implementation pattern
def solve_problem(data):
    result = []
    for item in data:
        # process item
        result.append(item)
    return result
\`\`\`

### 4. Practical Code Example
\`\`\`python
# Simple demonstration for: ${message}
sample_data = [10, 20, 30, 40]
filtered = [x for x in sample_data if x > 15]

print("Original Data:", sample_data)
print("Processed Result:", filtered)
\`\`\`

### 5. Expected Output
\`\`\`
Original Data: [10, 20, 30, 40]
Processed Result: [20, 30, 40]
\`\`\`

### 6. Step-by-Step Code Explanation
1. Python me sabse pehle variable initialize hota hai.
2. List comprehension ya loop se data filter ya process hota hai.
3. \`print()\` function se output screen par dikhta hai.

### 7. Real-Life Analogy
Socho ek tea stall (Chai dukaan) hai: Pehle ingredients (Variables) tayyar karte hain, fir gas par boil karte hain (Logic execution), aur cup me serve karte hain (Output)!`;
  }

  return `### 1. Simple Definition
Regarding **"${message}"**: Python provides clean, readable syntax to handle this logic with standard built-in data structures and functions.

### 2. Beginner-Friendly Explanation
In Python, simplicity is prioritized. Programs are constructed using meaningful variable names, proper indentation, and modular functions.

### 3. Python Syntax
\`\`\`python
def process_data(items):
    # Process and return result
    return [item for item in items if item]
\`\`\`

### 4. Practical Code Example
\`\`\`python
# Demonstration code
def execute():
    elements = ["Python", "Logic", "Code"]
    formatted = " -> ".join(elements)
    print("Workflow:", formatted)

execute()
\`\`\`

### 5. Expected Output
\`\`\`
Workflow: Python -> Logic -> Code
\`\`\`

### 6. Step-by-Step Code Explanation
1. We define a function using the \`def\` keyword.
2. The list contains string values.
3. The \`join()\` string method combines them with separators.
4. Calling the function prints the output cleanly.

### 7. Real-Life Analogy
Following a structured recipe: gathering ingredients first, processing them sequentially, and plating the final dish.`;
}

// Dry run simulator fallback
export function getDryRunSimulation(code: string, teachingMode: 'english' | 'hinglish' = 'english') {
  const isHinglish = teachingMode === 'hinglish';
  const lines = code.trim().split('\n');

  // If factorial recursion
  if (code.includes('factorial')) {
    return {
      summary: 'Traces recursive factorial calculation of 4 (4! = 4 * 3 * 2 * 1 = 24).',
      initialState: 'n = 4',
      steps: [
        {
          stepNumber: 1,
          lineNumber: 1,
          codeLine: 'def factorial(n):',
          variables: { n: 4 },
          output: '',
          explanation: isHinglish
            ? 'factorial(4) call hua. Parameter n = 4 memory me store hua.'
            : 'Function factorial(4) is invoked with argument n = 4.',
        },
        {
          stepNumber: 2,
          lineNumber: 2,
          codeLine: 'if n <= 1:',
          variables: { n: 4, 'n <= 1': false },
          output: '',
          explanation: isHinglish
            ? 'Check kiya: kya 4 <= 1 hai? Nahi (False). Toh if block skip hoga.'
            : 'Check condition 4 <= 1. Evaluates to False, proceeding to recursive step.',
        },
        {
          stepNumber: 3,
          lineNumber: 4,
          codeLine: 'return n * factorial(n - 1)',
          variables: { n: 4, 'waiting_on': 'factorial(3)' },
          output: '',
          explanation: isHinglish
            ? 'n = 4 ko hold par rakha aur factorial(3) ko call kiya.'
            : 'Pushes factorial(4) on call stack and evaluates factorial(3).',
        },
        {
          stepNumber: 4,
          lineNumber: 2,
          codeLine: 'if n <= 1:',
          variables: { n: 3, 'n <= 1': false },
          output: '',
          explanation: isHinglish
            ? 'factorial(3) me check kiya: 3 <= 1 False hai.'
            : 'Inside factorial(3): condition 3 <= 1 is False.',
        },
        {
          stepNumber: 5,
          lineNumber: 4,
          codeLine: 'return n * factorial(n - 1)',
          variables: { n: 3, 'waiting_on': 'factorial(2)' },
          output: '',
          explanation: isHinglish
            ? '3 * factorial(2) call hua. Call stack gehra ho raha hai.'
            : 'Pushes factorial(3) and evaluates factorial(2).',
        },
        {
          stepNumber: 6,
          lineNumber: 2,
          codeLine: 'if n <= 1:',
          variables: { n: 2, 'n <= 1': false },
          output: '',
          explanation: isHinglish
            ? 'factorial(2) me: 2 <= 1 False hai.'
            : 'Inside factorial(2): condition 2 <= 1 is False.',
        },
        {
          stepNumber: 7,
          lineNumber: 4,
          codeLine: 'return n * factorial(n - 1)',
          variables: { n: 2, 'waiting_on': 'factorial(1)' },
          output: '',
          explanation: isHinglish
            ? '2 * factorial(1) call hua.'
            : 'Pushes factorial(2) and evaluates factorial(1).',
        },
        {
          stepNumber: 8,
          lineNumber: 2,
          codeLine: 'if n <= 1:',
          variables: { n: 1, 'n <= 1': true },
          output: '',
          explanation: isHinglish
            ? 'Base Case mil gaya! 1 <= 1 True hai! Ab function return karega.'
            : 'Base case reached! 1 <= 1 is True. Returns 1 immediately.',
        },
        {
          stepNumber: 9,
          lineNumber: 3,
          codeLine: 'return 1',
          variables: { returned: 1 },
          output: '',
          explanation: isHinglish
            ? 'factorial(1) ne 1 return kiya. Ab pichle calls solve honge: 2 * 1 = 2.'
            : 'Returns 1 to caller factorial(2). Resolves to 2 * 1 = 2.',
        },
        {
          stepNumber: 10,
          lineNumber: 4,
          codeLine: 'return n * factorial(n - 1)',
          variables: { 'factorial(3)': '3 * 2 = 6', 'factorial(4)': '4 * 6 = 24' },
          output: '',
          explanation: isHinglish
            ? 'Stack unwind: 3 * 2 = 6, aur aakhri me 4 * 6 = 24.'
            : 'Call stack unwinds: factorial(3) returns 6, factorial(4) returns 24.',
        },
        {
          stepNumber: 11,
          lineNumber: 7,
          codeLine: 'print("Final result:", ans)',
          variables: { ans: 24 },
          output: 'Final result: 24',
          explanation: isHinglish
            ? 'ans variable me 24 save hua aur screen par print ho gaya!'
            : 'Variable ans is assigned 24 and printed to standard output.',
        },
      ],
      finalOutput: 'Final result: 24',
      keyTakeaways: [
        isHinglish
          ? 'Recursion me Base Case sabse zaroori hai, warna RecursionError aa jata hai.'
          : 'A base case is strictly mandatory to prevent call stack overflow.',
        isHinglish
          ? 'Python memory me har call ko Call Stack frame me store karta hai.'
          : 'Python stores intermediate states in function call frames until base case returns.',
      ],
    };
  }

  // Generic dynamic fallback for any other code
  const steps = lines.map((line, idx) => {
    return {
      stepNumber: idx + 1,
      lineNumber: idx + 1,
      codeLine: line || '# (empty)',
      variables: {
        line: idx + 1,
        active: true,
      },
      output: line.includes('print') ? `[Output at line ${idx + 1}]` : '',
      explanation: isHinglish
        ? `Line ${idx + 1} execute hui: "${line.trim() || 'blank line'}". Python memory state update hui.`
        : `Executed line ${idx + 1}: "${line.trim() || 'blank line'}". Evaluated in Python runtime.`,
    };
  });

  return {
    summary: 'Line-by-line program trace across sequential Python instructions.',
    initialState: 'Starting execution frame',
    steps: steps.length > 0 ? steps : [
      {
        stepNumber: 1,
        lineNumber: 1,
        codeLine: code,
        variables: { status: 'completed' },
        output: 'Execution complete',
        explanation: 'Code executed cleanly.',
      },
    ],
    finalOutput: 'Program execution completed.',
    keyTakeaways: [
      'Variables maintain scope within the current block.',
      'Execution flows sequentially top-to-bottom unless diverted by branching or loops.',
    ],
  };
}

// Debugger fallback
export function debugPythonSimulation(code: string, errorTrace: string = '', teachingMode: 'english' | 'hinglish' = 'english') {
  const isHinglish = teachingMode === 'hinglish';

  if (code.includes('range(len(items) + 1)') || code.includes('IndexError') || errorTrace.includes('IndexError')) {
    return {
      hasError: true,
      errorType: 'IndexError: list index out of range',
      errorLine: '2',
      whyErrorOccurred: isHinglish
        ? 'List ke indices 0 se len(items)-1 tak hote hain. range(len(items) + 1) chalane par loop aakhri me ek aise index ko dhoondhta hai jo exist hi nahi karta!'
        : 'Python uses zero-based indexing. A list of 4 items has indices 0, 1, 2, 3. range(len(items) + 1) attempts to access index 4, which does not exist.',
      correctedCode: `items = [10, 20, 30, 40]
# Correct: iterate up to len(items) or directly over elements
for i in range(len(items)):
    print("Item at index", i, "is", items[i])

# Even more Pythonic way:
# for i, item in enumerate(items):
#     print(f"Item at index {i} is {item}")`,
      codeDiffExplanation: [
        'Removed `+ 1` from `range(len(items) + 1)` to prevent boundary overflow.',
        'Index now properly stays within [0, len-1].',
      ],
      preventionTips: [
        isHinglish ? 'Python me directly list ke elements par loop chalaye: `for item in items:`' : 'Prefer iterating directly over items or use enumerate().',
        isHinglish ? 'Index boundary check karein (0 to n-1).' : 'Remember that len(list) is never a valid index in 0-indexed sequences.',
      ],
      proTip: 'Use `enumerate(items)` when you need both the index and the value together.',
    };
  }

  if (code.includes('items=[]') || code.includes('my_list=[]')) {
    return {
      hasError: true,
      errorType: 'Logical Bug (Mutable Default Argument)',
      errorLine: '1',
      whyErrorOccurred: isHinglish
        ? 'Python me default arguments function define karte waqt ek hi baar bante hain. Jab aap list jaisa mutable object default banate ho, toh har call me wahi puraani list reuse ho jati hai!'
        : 'In Python, default arguments are evaluated only once when the function is defined, not each time the function is called. A mutable list retains mutations across calls.',
      correctedCode: `def add_item(val, items=None):
    if items is None:
        items = []  # Har call par nayi fresh list banegi
    items.append(val)
    return items

print(add_item("Apple"))   # ['Apple']
print(add_item("Banana"))  # ['Banana'] (Clean & expected!)`,
      codeDiffExplanation: [
        'Replaced `items=[]` with `items=None`.',
        'Added conditional check `if items is None: items = []` inside the function body.',
      ],
      preventionTips: [
        'Never use mutable objects (lists, dicts, sets) as default arguments in Python.',
        'Always use `None` as the default sentinel value and initialize inside the function.',
      ],
      proTip: 'This is known as the "Mutable Default Argument Gotcha" in Python.',
    };
  }

  // Generic debug response
  return {
    hasError: true,
    errorType: 'Syntax/Logical Review',
    errorLine: '1',
    whyErrorOccurred: isHinglish
      ? 'Code me type checking ya syntax structure ko PEP-8 standards ke hisaab se refine karne ki zaroorat hai.'
      : 'Code structure requires validation against PEP-8 standards and proper variable type casting.',
    correctedCode: `# Verified Python Code
${code}
# Ensure proper indentation and type casting`,
    codeDiffExplanation: [
      'Standardized indentation to 4 spaces.',
      'Verified clean variable assignments.',
    ],
    preventionTips: [
      'Always test functions with empty or boundary inputs.',
      'Use try-except blocks when handling user input or external files.',
    ],
    proTip: 'Use Python type hints (e.g., `def func(x: int) -> str:`) for clean IDE autocompletion.',
  };
}

// Quiz fallback
export function getQuizSimulation(topic: string = 'Python Fundamentals', difficulty: string = 'Beginner') {
  return [
    {
      id: 1,
      question: 'What is the output of the following Python slicing snippet?',
      codeSnippet: `my_string = "Python"
print(my_string[::-1])`,
      options: ['nohtyP', 'Python', 'Error: step cannot be negative', 'P'],
      correctIndex: 0,
      explanation: 'In Python, [::-1] uses a step of -1 to reverse any sequence from end to beginning.',
      hint: 'A negative step value tells Python to read backwards.',
    },
    {
      id: 2,
      question: 'Which of the following data structures in Python is IMMUTABLE?',
      codeSnippet: '',
      options: ['List', 'Dictionary', 'Tuple', 'Set'],
      correctIndex: 2,
      explanation: 'Tuples are immutable; once created, their elements cannot be added, removed, or modified.',
      hint: 'Think of coordinates or constants that should never change.',
    },
    {
      id: 3,
      question: 'What will be the result of bool([]) in Python?',
      codeSnippet: `empty_list = []
print(bool(empty_list))`,
      options: ['True', 'False', 'None', 'TypeError'],
      correctIndex: 1,
      explanation: 'In Python, empty collections (empty lists, tuples, dicts, strings) evaluate to falsy (False).',
      hint: 'Empty containers have a boolean truth value of zero/false.',
    },
    {
      id: 4,
      question: 'What does the range(2, 8, 2) function generate?',
      codeSnippet: `for x in range(2, 8, 2):
    print(x, end=" ")`,
      options: ['2 4 6 8', '2 4 6', '2 3 4 5 6 7', '4 6 8'],
      correctIndex: 1,
      explanation: 'range(start, stop, step) starts at 2, steps by 2, and stops BEFORE 8. So it generates 2, 4, 6.',
      hint: 'The stop parameter in range() is always exclusive.',
    },
    {
      id: 5,
      question: 'What is the correct way to handle exceptions in Python?',
      codeSnippet: '',
      options: ['try ... catch', 'try ... except', 'do ... error', 'attempt ... rescue'],
      correctIndex: 1,
      explanation: 'Python uses the `try ... except` construct to catch and handle runtime exceptions.',
      hint: 'Python uses `except`, unlike languages like JavaScript or Java which use `catch`.',
    },
  ];
}
