// Mock data for users
export const users = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '+1234567890',
    userType: 'Admin',
    username: 'admin',
    password: 'admin123'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567891',
    userType: 'Candidate',
    username: 'john',
    password: 'pass123',
    hallTicket: '2025J291234'
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567892',
    userType: 'Candidate',
    username: 'jane',
    password: 'pass123',
    hallTicket: '2025J291235'
  }
];

// Mock data for questions
export const questions = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
    category: 'General'
  },
  {
    id: 2,
    question: 'Which programming language is known as the "language of the web"?',
    options: ['Python', 'JavaScript', 'Java', 'C++'],
    correctAnswer: 'JavaScript',
    category: 'Technical'
  },
  {
    id: 3,
    question: 'What is 15 + 25?',
    options: ['30', '35', '40', '45'],
    correctAnswer: '40',
    category: 'Aptitude'
  },
  {
    id: 4,
    question: 'If all roses are flowers and some flowers are red, which statement is true?',
    options: ['All roses are red', 'Some roses might be red', 'No roses are red', 'All flowers are roses'],
    correctAnswer: 'Some roses might be red',
    category: 'Logical'
  },
  {
    id: 5,
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Jupiter',
    category: 'General'
  },
  {
    id: 6,
    question: 'Which data structure uses LIFO (Last In, First Out) principle?',
    options: ['Queue', 'Stack', 'Array', 'Tree'],
    correctAnswer: 'Stack',
    category: 'Technical'
  },
  {
    id: 7,
    question: 'What is 12 × 8?',
    options: ['84', '96', '104', '112'],
    correctAnswer: '96',
    category: 'Aptitude'
  },
  {
    id: 8,
    question: 'In a sequence: 2, 4, 8, 16, ?, what comes next?',
    options: ['24', '28', '32', '36'],
    correctAnswer: '32',
    category: 'Logical'
  },
  {
    id: 9,
    question: 'Who wrote "Romeo and Juliet"?',
    options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
    correctAnswer: 'William Shakespeare',
    category: 'General'
  },
  {
    id: 10,
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
    correctAnswer: 'Hyper Text Markup Language',
    category: 'Technical'
  },
  {
    id: 11,
    question: 'If a train travels 60 km in 45 minutes, what is its speed in km/h?',
    options: ['75', '80', '85', '90'],
    correctAnswer: '80',
    category: 'Aptitude'
  },
  {
    id: 12,
    question: 'All cats are animals. Some animals are pets. Therefore:',
    options: ['All cats are pets', 'Some cats are pets', 'No cats are pets', 'Some cats might be pets'],
    correctAnswer: 'Some cats might be pets',
    category: 'Logical'
  },
  {
    id: 13,
    question: 'What is the chemical symbol for gold?',
    options: ['Go', 'Gd', 'Au', 'Ag'],
    correctAnswer: 'Au',
    category: 'General'
  },
  {
    id: 14,
    question: 'Which of the following is not a programming paradigm?',
    options: ['Object-oriented', 'Functional', 'Procedural', 'Circular'],
    correctAnswer: 'Circular',
    category: 'Technical'
  },
  {
    id: 15,
    question: 'What is 25% of 80?',
    options: ['15', '20', '25', '30'],
    correctAnswer: '20',
    category: 'Aptitude'
  },
  {
    id: 16,
    question: 'If Monday is the 1st, what day is the 15th?',
    options: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    correctAnswer: 'Monday',
    category: 'Logical'
  },
  {
    id: 17,
    question: 'Which ocean is the largest?',
    options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
    correctAnswer: 'Pacific',
    category: 'General'
  },
  {
    id: 18,
    question: 'What does CSS stand for?',
    options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
    correctAnswer: 'Cascading Style Sheets',
    category: 'Technical'
  },
  {
    id: 19,
    question: 'A book costs $15. If you buy 3 books, how much do you save with a 10% discount?',
    options: ['$4.50', '$5.00', '$5.50', '$6.00'],
    correctAnswer: '$4.50',
    category: 'Aptitude'
  },
  {
    id: 20,
    question: 'Complete the pattern: A, C, E, G, ?',
    options: ['H', 'I', 'J', 'K'],
    correctAnswer: 'I',
    category: 'Logical'
  },
  {
    id: 21,
    question: 'What is the smallest country in the world?',
    options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
    correctAnswer: 'Vatican City',
    category: 'General'
  },
  {
    id: 22,
    question: 'Which sorting algorithm has the best average-case time complexity?',
    options: ['Bubble Sort', 'Selection Sort', 'Quick Sort', 'Insertion Sort'],
    correctAnswer: 'Quick Sort',
    category: 'Technical'
  },
  {
    id: 23,
    question: 'What is the square root of 144?',
    options: ['10', '11', '12', '13'],
    correctAnswer: '12',
    category: 'Aptitude'
  },
  {
    id: 24,
    question: 'If some doctors are teachers and all teachers are educated, then:',
    options: ['All doctors are educated', 'Some doctors are educated', 'No doctors are educated', 'All educated people are doctors'],
    correctAnswer: 'Some doctors are educated',
    category: 'Logical'
  },
  {
    id: 25,
    question: 'In which year did World War II end?',
    options: ['1944', '1945', '1946', '1947'],
    correctAnswer: '1945',
    category: 'General'
  },
  {
    id: 26,
    question: 'What is the time complexity of binary search?',
    options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
    correctAnswer: 'O(log n)',
    category: 'Technical'
  },
  {
    id: 27,
    question: 'If 3x + 5 = 20, what is the value of x?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '5',
    category: 'Aptitude'
  },
  {
    id: 28,
    question: 'What comes next in the sequence: 1, 1, 2, 3, 5, 8, ?',
    options: ['11', '12', '13', '14'],
    correctAnswer: '13',
    category: 'Logical'
  },
  {
    id: 29,
    question: 'What is the hardest natural substance on Earth?',
    options: ['Gold', 'Iron', 'Diamond', 'Platinum'],
    correctAnswer: 'Diamond',
    category: 'General'
  },
  {
    id: 30,
    question: 'Which protocol is used for secure web communication?',
    options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
    correctAnswer: 'HTTPS',
    category: 'Technical'
  },
  {
    id: 31,
    question: 'What is 15% of 200?',
    options: ['25', '30', '35', '40'],
    correctAnswer: '30',
    category: 'Aptitude'
  },
  {
    id: 32,
    question: 'If all birds can fly and penguins are birds, but penguins cannot fly, what is wrong?',
    options: ['Birds cannot fly', 'Penguins are not birds', 'The first statement is false', 'Nothing is wrong'],
    correctAnswer: 'The first statement is false',
    category: 'Logical'
  },
  {
    id: 33,
    question: 'What is the currency of Japan?',
    options: ['Yuan', 'Won', 'Yen', 'Ringgit'],
    correctAnswer: 'Yen',
    category: 'General'
  },
  {
    id: 34,
    question: 'What does API stand for?',
    options: ['Application Programming Interface', 'Advanced Programming Interface', 'Application Process Interface', 'Advanced Process Interface'],
    correctAnswer: 'Application Programming Interface',
    category: 'Technical'
  },
  {
    id: 35,
    question: 'A rectangle has length 8 cm and width 6 cm. What is its area?',
    options: ['42 cm²', '46 cm²', '48 cm²', '52 cm²'],
    correctAnswer: '48 cm²',
    category: 'Aptitude'
  },
  {
    id: 36,
    question: 'What is the missing number: 10, 20, ?, 40, 50',
    options: ['25', '30', '35', '45'],
    correctAnswer: '30',
    category: 'Logical'
  },
  {
    id: 37,
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    correctAnswer: 'Leonardo da Vinci',
    category: 'General'
  },
  {
    id: 38,
    question: 'Which database query language is most commonly used?',
    options: ['NoSQL', 'SQL', 'GraphQL', 'MongoDB'],
    correctAnswer: 'SQL',
    category: 'Technical'
  },
  {
    id: 39,
    question: 'If a car travels 120 km in 2 hours, what is its average speed?',
    options: ['50 km/h', '55 km/h', '60 km/h', '65 km/h'],
    correctAnswer: '60 km/h',
    category: 'Aptitude'
  },
  {
    id: 40,
    question: 'Which number should replace the question mark: 2, 6, 12, 20, ?',
    options: ['28', '30', '32', '34'],
    correctAnswer: '30',
    category: 'Logical'
  },
  {
    id: 41,
    question: 'What is the largest mammal in the world?',
    options: ['African Elephant', 'Blue Whale', 'Giraffe', 'Polar Bear'],
    correctAnswer: 'Blue Whale',
    category: 'General'
  },
  {
    id: 42,
    question: 'What is the default port number for HTTP?',
    options: ['21', '22', '80', '443'],
    correctAnswer: '80',
    category: 'Technical'
  },
  {
    id: 43,
    question: 'What is 7² + 3²?',
    options: ['52', '56', '58', '62'],
    correctAnswer: '58',
    category: 'Aptitude'
  },
  {
    id: 44,
    question: 'If today is Wednesday, what day will it be after 10 days?',
    options: ['Thursday', 'Friday', 'Saturday', 'Sunday'],
    correctAnswer: 'Saturday',
    category: 'Logical'
  },
  {
    id: 45,
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
    category: 'General'
  }
];