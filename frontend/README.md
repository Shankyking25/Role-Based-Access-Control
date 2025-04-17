# 🔐 Role-Based Authentication App (React + Vite + Node.js + MongoDB)

A full-stack role-based authentication system with features like:

- User Registration & Login  
- Role-Based Protected Routes  
- Admin Panel to Create & Assign Roles  
- Secure JWT & Cookie-Based Authentication  

---

## 🚀 Tech Stack

**Frontend**:
- React 19 + Vite
- Material-UI (MUI)
- React Router v7
- Axios
- JWT-Decode

**Backend**:
- Node.js + Express
- MongoDB + Mongoose
- bcryptjs
- JWT
- cookie-parser, body-parser
- dotenv

---

## 📁 Project Structure

## 📦 NPM Packages to Install

### 🔧 Backend (Node.js)

Navigate to `backend/` and run:

```bash
npm install

"bcryptjs": "^3.0.2",
"body-parser": "^2.2.0",
"cookie-parser": "^1.4.7",
"cors": "^2.8.5",
"dotenv": "^16.5.0",
"express": "^5.1.0",
"jsonwebtoken": "^9.0.2",
"mongoose": "^8.13.2"

Run the server:

npm start

Make sure to configure your .env file:

PORT=5000
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret




 Frontend (React + Vite)
 npm install

 Dependencies:

"@emotion/react": "^11.14.0",
"@emotion/styled": "^11.14.0",
"@mui/icons-material": "^7.0.2",
"@mui/material": "^7.0.2",
"axios": "^1.8.4",
"bcryptjs": "^3.0.2",
"jwt-decode": "^4.0.0",
"react": "^19.0.0",
"react-dom": "^19.0.0",
"react-router-dom": "^7.5.0"


Run the frontend:

npm run dev



API Endpoints (Used)

Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get JWT cookie
POST	/api/roles/create	Create a new role (Admin)
POST	/api/roles/assign	Assign role to user (Admin)
GET	    /api/roles/allroles	Fetch all available roles
GET	    /api/users/allUser	Fetch all registered users

🛠️ Base URL: http://localhost:5000/api/

✅ Usage Instructions
1. Clone the Repo
git clone https://github.com/your-repo-name.git
cd your-repo-name


2. Setup Backend

cd backend
npm install
# create a .env file and configure it
npm start
Backend will run on: http://localhost:5000


Setup Frontend

cd frontend
npm install
npm run dev

Frontend will run on: http://localhost:5173



 App Flow

Open the frontend in your browser → http://localhost:5173

Register a user

Login to receive JWT cookie

Access /profile for normal user

Login as admin → visit /create-role or /assign-role

Use role-based access to navigate to protected routes

Protected Routes (React Router)
/login – Login Page

/register – Register Page

/profile – User Dashboard

/admin-profile – Admin Dashboard

/create-role – Create a Role (Admin Only)

/assign-role – Assign Role to Users (Admin Only)

Credits
Developed with ❤️ by [Shashank Singh]