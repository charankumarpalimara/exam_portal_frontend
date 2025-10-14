# 📝 Exam Portal Frontend

Modern, responsive React-based examination portal with real-time features and seamless backend integration.

## 🚀 Features

- ✅ **Role-based Authentication** (Admin & Candidate)
- ✅ **Responsive Design** (Mobile, Tablet, Desktop)
- ✅ **Real-time Exam Timer** (90 minutes)
- ✅ **45 Randomized Questions** (3 sections × 15 questions)
- ✅ **Auto-scoring System** (+1/-1 marking)
- ✅ **Admin Dashboard** (User & Question Management)
- ✅ **Candidate Dashboard** (Exam instructions & rules)
- ✅ **Result Analysis** (Detailed statistics)
- ✅ **Backend Integration** (REST API with JWT)

## 🛠️ Tech Stack

- **Framework:** React 18 with Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **State Management:** React Hooks

## ⚙️ Installation

```bash
npm install
```

## 🏃 Running the App

**Development mode:**
```bash
npm run dev
```

Frontend runs on: `http://localhost:5173`

## 🔗 Backend Integration

This frontend requires the backend API to be running:
- **Backend Repository:** https://github.com/charankumarpalimara/examportal_backend
- **Backend URL:** `http://localhost:8080/api`

Configuration file: `config/api.js`

## 🔑 Demo Credentials

### Admin:
```
Username: admin
Password: admin123
```

### Candidates:
```
Hall Ticket 1: 2025J291234
Hall Ticket 2: 2025J291235
```

## 📁 Project Structure

```
exam2/
├── components/          # React components
│   ├── LoginPage.jsx
│   ├── AdminDashboard.jsx
│   ├── UserManagement.jsx
│   ├── QuestionManagement.jsx
│   ├── CandidateDashboard.jsx
│   ├── ExamInterface.jsx
│   └── ResultPage.jsx
├── config/             # API configuration
│   └── api.js
├── services/           # API service layer
│   ├── authService.js
│   ├── userService.js
│   ├── questionService.js
│   └── examService.js
├── utils/             # Utility functions
│   ├── motion.js
│   └── examData.js
├── App.jsx
├── main.jsx
└── index.css
```

## 🎯 Features

### For Candidates:
- Login with Hall Ticket
- View exam instructions & rules
- 45 randomized questions in 3 sections
- Real-time countdown timer
- Save, Skip, and Submit options
- Instant results with detailed breakdown

### For Admins:
- Secure login with username/password
- User Management (Add/Edit/Delete users)
- Auto Hall Ticket Generation
- Question Bank Management
- View all exam results
- Statistics dashboard

## 🎨 UI/UX

- Modern gradient backgrounds
- Smooth page transitions
- Loading states
- Error handling
- Responsive navigation
- Touch-friendly buttons
- Mobile-optimized layout

## 📊 Exam Flow

1. **Login** → Authenticate with backend
2. **Instructions** → Read exam rules and agree to terms
3. **Take Exam** → Answer 45 questions with timer
4. **Submit** → Auto-score and save to database
5. **View Results** → See detailed performance analysis

## 🎫 Hall Ticket Format

Auto-generated format: `YYYYMDD####`
- Year (4 digits) + Month Letter (A-L) + Day (2 digits) + Sequence (4 digits)
- Example: `2025J140001` = October 14, 2025, #0001

## 📝 Scoring System

- **Correct Answer:** +1 mark
- **Wrong Answer:** -1 mark (negative marking)
- **Unattempted:** 0 marks
- **Total Questions:** 45
- **Passing Criteria:** 40% (18 marks)

## 🔐 Security

- JWT token-based authentication
- Automatic token expiration handling
- Protected routes
- Role-based access control
- Secure API communication

## 📚 Documentation

- `BACKEND_INTEGRATION.md` - API integration guide
- `TESTING_GUIDE.md` - Testing instructions
- `API_ENDPOINTS.md` - API reference

## 🤝 Backend Repository

https://github.com/charankumarpalimara/examportal_backend

## 📄 License

ISC

---

**Built with ❤️ using React + Vite + Tailwind CSS**

