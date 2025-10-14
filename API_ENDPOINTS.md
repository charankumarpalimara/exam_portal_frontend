# 📡 API Endpoints Reference

## Base URL
```
http://localhost:5001/api
```

---

## 🔐 Authentication Endpoints

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "userType": "Admin" | "Candidate",
  "username": "admin",        // For Admin only
  "password": "admin123",     // For Admin only
  "hallTicket": "2025J291234" // For Candidate only
}

Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "name": "...",
    "email": "...",
    "userType": "Admin" | "Candidate",
    "hallTicket": "..." // For Candidate
  }
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": { user object }
}
```

---

## 👥 User Management (Admin Only)

### Get All Users
```http
GET /users
Authorization: Bearer <token>

Query Parameters:
?userType=Candidate
?search=john

Response:
{
  "success": true,
  "count": 3,
  "data": [...]
}
```

### Create User
```http
POST /users
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "userType": "Candidate",
  "hallTicket": "2025J291234"
}

// Or for Admin:
{
  "name": "Admin User",
  "email": "admin@example.com",
  "phone": "+1234567890",
  "userType": "Admin",
  "username": "admin",
  "password": "admin123"
}
```

### Update User
```http
PUT /users/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name",
  "email": "updated@example.com"
}
```

### Delete User
```http
DELETE /users/:id
Authorization: Bearer <token>
```

---

## 📝 Question Management

### Get All Questions (Admin)
```http
GET /questions
Authorization: Bearer <token>

Query Parameters:
?category=Technical
?difficulty=Medium
?isActive=true

Response:
{
  "success": true,
  "count": 45,
  "data": [
    {
      "_id": "...",
      "question": "What is the capital of France?",
      "options": ["London", "Paris", "Berlin", "Madrid"],
      "correctAnswer": "Paris",
      "category": "General",
      "difficulty": "Easy"
    }
  ]
}
```

### Get Random Questions for Exam (Candidate)
```http
GET /questions/random
Authorization: Bearer <token>

Response:
{
  "success": true,
  "count": 45,
  "data": [
    {
      "id": "...",
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "category": "General"
      // Note: correctAnswer is NOT included for candidates
    }
  ]
}
```

### Create Question (Admin)
```http
POST /questions
Authorization: Bearer <token>
Content-Type: application/json

{
  "question": "What is 2 + 2?",
  "options": ["3", "4", "5", "6"],
  "correctAnswer": "4",
  "category": "Aptitude",
  "difficulty": "Easy"
}
```

### Update Question (Admin)
```http
PUT /questions/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "question": "Updated question?",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": "B"
}
```

### Delete Question (Admin)
```http
DELETE /questions/:id
Authorization: Bearer <token>
```

### Bulk Create Questions (Admin)
```http
POST /questions/bulk
Authorization: Bearer <token>
Content-Type: application/json

{
  "questions": [
    {
      "question": "...",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "A",
      "category": "General"
    },
    { ... }
  ]
}
```

---

## 🎯 Exam & Results

### Submit Exam (Candidate)
```http
POST /exams/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "answers": {
    "questionId1": "Paris",
    "questionId2": "JavaScript",
    "questionId3": "40"
  },
  "timeTaken": 3600  // in seconds
}

Response:
{
  "success": true,
  "data": {
    "_id": "result_id",
    "score": 35,
    "percentage": 77.78,
    "correctAnswers": 38,
    "wrongAnswers": 3,
    "attemptedQuestions": 41,
    "totalQuestions": 45
  }
}
```

### Get My Results (Candidate)
```http
GET /exams/results/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "count": 1,
  "data": [
    {
      "score": 35,
      "percentage": 77.78,
      "submittedAt": "2025-10-14T..."
    }
  ]
}
```

### Get All Results (Admin)
```http
GET /exams/results
Authorization: Bearer <token>

Query Parameters:
?hallTicket=2025J291234
?candidateName=John

Response:
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

### Get Result by ID
```http
GET /exams/results/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "candidate": {...},
    "score": 35,
    "questions": [
      {
        "question": "...",
        "userAnswer": "...",
        "correctAnswer": "...",
        "isCorrect": true
      }
    ]
  }
}
```

### Get Statistics (Admin)
```http
GET /exams/statistics
Authorization: Bearer <token>

Response:
{
  "success": true,
  "data": {
    "totalResults": 10,
    "totalCandidates": 2,
    "totalQuestions": 45,
    "statistics": {
      "averageScore": 32.5,
      "averagePercentage": 72.22,
      "maxScore": 40,
      "minScore": 25
    }
  }
}
```

### Delete Result (Admin)
```http
DELETE /exams/results/:id
Authorization: Bearer <token>
```

---

## 🏥 Health Check

```http
GET /health

Response:
{
  "success": true,
  "message": "Exam Portal API is running",
  "timestamp": "2025-10-14T..."
}
```

---

## 🔑 Authorization

All protected endpoints require JWT token in header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Token is automatically included by axios interceptor when you use the service functions.

---

## ❌ Error Responses

All errors follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

Common status codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (no token / invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

---

## 🧪 Testing with cURL

### Test Login
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "userType": "Candidate",
    "hallTicket": "2025J291234"
  }'
```

### Test Get Questions (with token)
```bash
TOKEN="your_token_here"

curl -X GET http://localhost:5001/api/questions/random \
  -H "Authorization: Bearer $TOKEN"
```

### Test Submit Exam
```bash
TOKEN="your_token_here"

curl -X POST http://localhost:5001/api/exams/submit \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "answers": {
      "questionId1": "answer1"
    },
    "timeTaken": 1800
  }'
```

---

## 📚 Related Documentation

- **Backend API:** `../exam_backend/README.md`
- **Backend Setup:** `../exam_backend/SETUP_GUIDE.md`
- **Integration Guide:** `./BACKEND_INTEGRATION.md`
- **Full Setup:** `../FULL_SETUP_GUIDE.md`

---

**All endpoints are working and integrated! 🎉**

