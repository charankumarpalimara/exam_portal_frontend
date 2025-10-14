# 🧪 Testing Guide - Exam Portal

## ✅ **Issues Fixed:**

1. ✅ **Removed duplicate `src/` folder** causing import conflicts
2. ✅ **Database seeded** with admin, candidates, and questions
3. ✅ **Auto Hall Ticket Generation** implemented
4. ✅ **Backend running** on port 8080
5. ✅ **Frontend configured** to use port 8080

---

## 🚀 **Quick Test Steps:**

### **Test 1: Admin Login**

1. **Open browser:** `http://localhost:5173`
2. **Click "Admin" tab** (should show Username/Password fields)
3. **Enter credentials:**
   - Username: `admin`
   - Password: `admin123`
4. **Click "Login"**
5. **Open Browser Console (F12)** to see detailed logs:
   ```
   Attempting login with: {userType: "Admin", username: "admin"}
   Login response: {success: true, ...}
   Login successful! User type: Admin
   Navigating to /admin
   ```
6. ✅ **Should redirect to Admin Dashboard**

---

### **Test 2: Candidate Login**

1. **Click "Candidate" tab**
2. **Enter hall ticket:** `2025J291234`
3. **Click "Login"**
4. ✅ **Should redirect to Candidate Dashboard**

---

### **Test 3: Auto Hall Ticket Generation**

1. **Login as Admin**
2. **Go to User Management tab**
3. **Click "Add User"**
4. **Fill in:**
   - Name: Test Candidate
   - Email: test@example.com
   - Phone: +1234567890
   - User Type: Candidate
   - **Leave Hall Ticket blank** ← Important!
5. **Click "Add User"**
6. ✅ **Should show alert:** "User created with auto-generated hall ticket: 2025J140001"
7. **Check the user list** - hall ticket should be auto-generated

---

## 📋 **Hall Ticket Format**

### **Format:** `YYYYMDD####` (12 characters)

| Part | Description | Example |
|------|-------------|---------|
| YYYY | Current Year | 2025 |
| M | Month Letter (A-L) | J (October) |
| DD | Day (2 digits) | 14 |
| #### | Sequence (4 digits) | 0001 |

**Month Letters:**
- A = January
- B = February  
- C = March
- D = April
- E = May
- F = June
- G = July
- H = August
- I = September
- **J = October** ← Current
- K = November
- L = December

### **Example Hall Tickets:**
- `2025J140001` = October 14, 2025, Sequence #1
- `2025J140002` = October 14, 2025, Sequence #2
- `2025J150001` = October 15, 2025, Sequence #1

---

## 🔧 **Browser Console Debugging**

### **How to View Console:**
1. Press **F12** (or Right-click → Inspect)
2. Click **"Console"** tab
3. Try logging in
4. You'll see detailed logs showing:
   - What credentials were sent
   - What response was received
   - Which page it's navigating to
   - Any errors

---

## 🐛 **Common Issues & Solutions**

### **Issue 1: "Invalid credentials"**
**Solution:** Database wasn't seeded
```bash
cd exam_backend
npm run seed -i
```

### **Issue 2: Login goes to wrong dashboard**
**Solution:** Check browser console logs to see what `userType` is returned

### **Issue 3: "Backend connection failed"**
**Solution:** Ensure backend is running
```bash
cd exam_backend
npm run dev
```
Should show: "🚀 Server is running on port 8080"

### **Issue 4: CORS Error**
**Solution:** Backend `.env` should have:
```
CLIENT_URL=http://localhost:5173
```

---

## 📊 **Test All Features:**

### ✅ **Admin Features:**
- [ ] Login with username/password
- [ ] View all users
- [ ] Add new candidate (auto hall ticket)
- [ ] Add new candidate (manual hall ticket)
- [ ] Edit user
- [ ] Delete user
- [ ] View all questions
- [ ] Add new question
- [ ] Edit question
- [ ] Delete question

### ✅ **Candidate Features:**
- [ ] Login with hall ticket
- [ ] View exam instructions
- [ ] Start exam
- [ ] See 45 randomized questions
- [ ] Answer questions
- [ ] Save & Next
- [ ] Skip questions
- [ ] Submit exam
- [ ] View results with statistics

---

## 🎯 **Expected Behavior:**

### **Admin Login:**
```
Click Admin Tab → Enter admin/admin123 → Login
→ Should go to /admin (Admin Dashboard)
→ See "User Management" and "Question Management" tabs
```

### **Candidate Login:**
```
Click Candidate Tab → Enter 2025J291234 → Login
→ Should go to /candidate (Candidate Dashboard)
→ See exam instructions
→ Agree to terms → Start Examination
→ See 45 questions → Answer → Submit
→ See results
```

---

## 🔍 **Verify Integration:**

### **Check 1: Services Loading**
Open browser console and type:
```javascript
localStorage.getItem('token')
```
After successful login, should show JWT token.

### **Check 2: User Data**
```javascript
JSON.parse(localStorage.getItem('currentUser'))
```
Should show user object with correct `userType`.

### **Check 3: API Connection**
```javascript
fetch('http://localhost:8080/api/health').then(r => r.json()).then(console.log)
```
Should show: `{success: true, message: "Exam Portal API is running"}`

---

## 📝 **Current Status:**

✅ Backend: Running on port 8080  
✅ Frontend: Running on port 5173  
✅ Database: Seeded with data  
✅ Admin User: Created  
✅ API Integration: Complete  
✅ Auto Hall Ticket: Implemented  
✅ Console Logging: Added for debugging  

---

**Try logging in now! Check the browser console (F12) to see what's happening.** 🎉

If you still see issues, share the console logs with me!

