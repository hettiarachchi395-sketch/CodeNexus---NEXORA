export const INITIAL_ORDERS = [
  {
    id: "NXR-2026-4101",
    course: "robotics",
    kit: "Arduino Starter Kit",
    status: "Confirmed",
    amount: 8500,
  },
  {
    id: "NXR-2026-4103",
    course: "circuits",
    kit: "Electronics Explorer Kit",
    status: "In transit",
    amount: 6900,
  },
];

export const ASSIGNMENTS = [
  {
    id: "arduino",
    title: "Arduino LED Blink Challenge",
    course: "Robotics & Arduino",
    due: "2026-11-02",
    tasks: [
      "Connect an LED to Arduino pin 13 through a 220ÃƒÅ½Ã‚Â© resistor.",
      "Write code using pinMode(), digitalWrite() and delay().",
      "Explain how HIGH and LOW control the LED.",
      "Attach code and circuit evidence.",
    ],
  },
  {
    id: "loops",
    title: "Python Loops Practice",
    course: "Python Programming",
    due: "2026-11-06",
    tasks: [
      "Use a for loop to print numbers 1 to 10.",
      "Calculate the sum of the first 10 positive integers.",
      "Explain range() in your own words.",
    ],
  },
];

export const QUIZ = [
  {
    q: "What does range(5) generate?",
    options: ["0, 1, 2, 3, 4", "1, 2, 3, 4, 5", "0, 1, 2, 3, 4, 5"],
    correct: 0,
    topic: "Loops",
  },
  {
    q: "Which loop syntax is valid Python?",
    options: ["for i in range(5):", "for(i=0;i<5;i++)", "loop i in range(5)"],
    correct: 0,
    topic: "Loops",
  },
  {
    q: "Which keyword defines a function?",
    options: ["function", "def", "func"],
    correct: 1,
    topic: "Functions",
  },
];

export const DEFAULT_CODES = {
  Python:
    'print("Hello NEXORA!")\nfor i in range(1, 6):\n    print("Lesson", i)',
  "C++":
    '#include <iostream>\nusing namespace std;\nint main() {\n  for (int i=1;i<=5;i++) cout << "Lesson " << i << endl;\n  return 0;\n}',
  Blockly: 'REPEAT 5 TIMES\n  PRINT "Hello NEXORA"',
};

export const VIDEOS = [
  ["Arduino Basics Ãƒâ€šÃ‚Â· Getting Started", "Robotics Fundamentals", "18:42"],
  ["Python Loops Explained", "Python Programming", "24:15"],
  ["Building Your First LED Circuit", "Circuit Design", "32:08"],
  ["Sensors & Ultrasonic Distance", "Robotics Fundamentals", "29:55"],
];
