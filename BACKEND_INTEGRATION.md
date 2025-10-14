# 🔗 Backend API Integration Guide

## ✅ Integration Complete!

Your React frontend is now fully integrated with the Node.js backend API.

---

## 🚀 **Quick Start**

### **1. Ensure Backend is Running**

In terminal 1:
```bash
cd ../exam_backend
npm run dev
```

✅ Backend should run on: `http://localhost:5001`

### **2. Ensure Database is Seeded**

If you haven't seeded the database yet:
```bash
cd ../exam_backend
npm run seed -i
```

### **3. Start Frontend**

In terminal 2:
```bash
cd exam2
npm run dev
```

✅ Frontend should run on: `http://localhost:5173`

---

## 📡 **API Configuration**

The API base URL is configured in:
```
exam2/config/api.js
```

Current setting:
```javascript
export const API_BASE_URL = 'http://localhost:5001/api';
```

**To change the backend URL**, edit this file.

---

## 🔐 **Authentication Flow**

1. **User logs in** → `LoginPage.jsx`
   - Calls: `POST /api/auth/login`
   - Stores JWT token in `localStorage`
   - Stores user data

2. **All subsequent requests** include the token
   - Automatic via axios interceptor in `config/api.js`
   - Header: `Authorization: Bearer <token>`

3. **Token expiration** (auto-handled)
   - If token expires (401 error)
   - User is automatically redirected to login
   - localStorage is cleared

---

## 📚 **Integrated Components**

### ✅ **LoginPage** (`components/LoginPage.jsx`)
- Uses `authService.login()`
- Supports Admin & Candidate login
- Stores JWT token
- Auto-navigates based on user type

### ✅ **ExamInterface** (`components/ExamInterface.jsx`)
- Fetches 45 random questions from backend
- Submits exam with answers and time taken
- Shows loading state while fetching
- Handles errors gracefully

### ✅ **ResultPage** (`components/ResultPage.jsx`)
- Fetches result from backend by ID
- Shows detailed statistics:
  - Correct answers
  - Wrong answers  
  - Unattempted questions
  - Percentage
  - Pass/Fail status

### ✅ **AdminDashboard** (`components/AdminDashboard.jsx`)
- Manages navigation between tabs
- Clears token on logout

### ✅ **UserManagement** (`components/UserManagement.jsx`)
- Fetch all users
- Create new users (Admin/Candidate)
- Update existing users
- Delete users
- Conditional fields (Username/Password for Admin, Hall Ticket for Candidate)

### ✅ **QuestionManagement** (`components/QuestionManagement.jsx`)
- Fetch all questions
- Create new questions
- Update questions
- Delete questions
- Shows difficulty level badges

---

## 🛠️ **API Services**

All API calls are organized in the `services/` folder:

### **authService.js**
- `login(credentials)` - Login user
- `getCurrentUser()` - Get current user info
- `logout()` - Clear session
- `isAuthenticated()` - Check if logged in
- `getStoredUser()` - Get user from localStorage

### **userService.js** (Admin only)
- `getAllUsers(params)` - List users
- `getUser(id)` - Get single user
- `createUser(data)` - Create user
- `updateUser(id, data)` - Update user
- `deleteUser(id)` - Delete user

### **questionService.js**
- `getAllQuestions(params)` - List all (Admin)
- `getRandomQuestions()` - Get 45 random (Candidate)
- `createQuestion(data)` - Create (Admin)
- `updateQuestion(id, data)` - Update (Admin)
- `deleteQuestion(id)` - Delete (Admin)
- `bulkCreateQuestions(questions)` - Bulk create (Admin)

### **examService.js**
- `submitExam(data)` - Submit exam (Candidate)
- `getMyResults()` - Get my results (Candidate)
- `getAllResults(params)` - List all results (Admin)
- `getResultById(id)` - Get specific result
- `deleteResult(id)` - Delete result (Admin)
- `getStatistics()` - Get statistics (Admin)

---

## 🔧 **Axios Configuration** (`config/api.js`)

### **Request Interceptor**
- Automatically adds JWT token to all requests
- Sets `Authorization: Bearer <token>` header

### **Response Interceptor**
- Handles 401 errors (token expired)
- Auto-redirects to login
- Clears localStorage

### **Base Configuration**
```javascript
baseURL: 'http://localhost:5001/api'
headers: { 'Content-Type': 'application/json' }
```

---

## 🎯 **Data Flow Example**

### **Candidate Takes Exam:**

1. **Login** → `LoginPage`
   ```
   POST /api/auth/login
   → Stores token
   → Navigate to /candidate
   ```

2. **View Instructions** → `CandidateDashboard`
   ```
   Shows exam rules
   → Click "Start Examination"
   → Navigate to /exam
   ```

3. **Take Exam** → `ExamInterface`
   ```
   GET /api/questions/random
   → Load 45 questions
   → Answer questions
   → Click "Submit Exam"
   POST /api/exams/submit
   → Navigate to /result
   ```

4. **View Results** → `ResultPage`
   ```
   GET /api/exams/results/:id
   → Display score, stats
   → Show pass/fail status
   ```

### **Admin Manages System:**

1. **Login** → `LoginPage`
   ```
   POST /api/auth/login
   → Navigate to /admin
   ```

2. **Manage Users** → `UserManagement`
   ```
   GET /api/users → List users
   POST /api/users → Add user
   PUT /api/users/:id → Update user
   DELETE /api/users/:id → Delete user
   ```

3. **Manage Questions** → `QuestionManagement`
   ```
   GET /api/questions → List questions
   POST /api/questions → Add question
   PUT /api/questions/:id → Update question
   DELETE /api/questions/:id → Delete question
   ```

---

## 🐛 **Troubleshooting**

### **CORS Error**
If you see CORS errors in console:

1. Check backend `.env`:
   ```env
   CLIENT_URL=http://localhost:5173
   ```

2. Restart backend server

### **Network Error**
- Ensure backend is running on port 5001
- Check `config/api.js` has correct URL

### **401 Unauthorized**
- Token might be expired
- Try logging out and logging in again
- Check if backend is running

### **Questions Not Loading**
1. Ensure backend is seeded:
   ```bash
   cd exam_backend
   npm run seed -i
   ```
2. Check browser console for errors
3. Verify token in localStorage

---

## 📝 **Testing the Integration**

### **Test Login:**
1. Open `http://localhost:5173`
2. Try candidate login: `2025J291234`
3. Should redirect to candidate dashboard
4. Check localStorage for `token` and `currentUser`

### **Test Exam Flow:**
1. Login as candidate
2. Click "Start Examination" (after agreeing to terms)
3. Should load 45 questions from backend
4. Answer some questions
5. Click "Submit Exam"
6. Should show results from backend

### **Test Admin Panel:**
1. Login as admin: `admin / admin123`
2. Go to User Management
3. Try adding a new candidate
4. Go to Question Management
5. Try adding a new question

---

## 🎉 **Integration Checklist**

- ✅ Axios installed
- ✅ API configuration created (`config/api.js`)
- ✅ All service files created
- ✅ LoginPage uses backend
- ✅ ExamInterface fetches questions from backend
- ✅ Exam submission posts to backend
- ✅ ResultPage fetches from backend
- ✅ UserManagement integrated
- ✅ QuestionManagement integrated
- ✅ JWT token handling
- ✅ Auto-logout on token expiry
- ✅ Loading states added
- ✅ Error handling implemented

---

## 📊 **Features**

### **Frontend → Backend Integration:**
- ✅ JWT Authentication
- ✅ Secure API calls
- ✅ Real-time data sync
- ✅ User management (CRUD)
- ✅ Question management (CRUD)
- ✅ Exam submission & scoring
- ✅ Result viewing
- ✅ Auto token refresh handling

---

## 🎯 **Next Steps**

1. **Test all features** end-to-end
2. **Add more candidates/questions** via admin panel
3. **Monitor API responses** in browser DevTools
4. **Check backend logs** for any errors

---

**Everything is connected! 🎉**

Backend (`http://localhost:5001`) ←→ Frontend (`http://localhost:5173`)

