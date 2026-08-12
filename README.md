# JobHub — Full Stack Job Portal

A full-stack job portal built with the **MERN stack** that connects candidates, recruiters, and administrators through a complete job-management and application platform.

## 🚀 Live Demo

**Frontend:**
https://jobhub-frontend-sable.vercel.app/

**Backend API:**
https://jobhub-backend-46sj.onrender.com/

## 📂 GitHub Repositories

**Frontend:**
https://github.com/sadulakarthikeyreddy/Jobhub-frontend

**Backend:**
https://github.com/sadulakarthikeyreddy/Jobhub-backend

---

## ✨ Features

### 👤 Candidate

* User registration and login
* JWT-based authentication
* Candidate profile management
* Resume upload
* Browse available jobs
* View detailed job information
* Apply for jobs
* Track submitted applications
* Protected candidate routes

### 🏢 Recruiter

* Recruiter authentication
* Create and manage companies
* Create job postings
* Edit and manage jobs
* View posted jobs
* View job applicants
* Review candidate applications and resumes
* Protected recruiter routes

### 👑 Admin

* Admin authentication
* Admin dashboard
* Manage users
* Manage jobs
* Manage applications
* Administrative controls and protected routes

### 📄 Resume & Image Upload

* Resume upload using Cloudinary
* Profile/company image upload
* PDF resume support
* Cloudinary-based media storage

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Multer
* Cloudinary

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas
* **File Storage:** Cloudinary

---

## 🏗️ Project Structure

### Frontend

```text
jobhub-frontend/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

### Backend

```text
jobhub-backend/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── server.js
├── package.json
└── README.md
```

---

## 🔐 Authentication

The application uses **JWT-based authentication**.

Authentication is used to protect:

* Candidate routes
* Recruiter routes
* Admin routes
* Profile operations
* Job management
* Application management

---

## 🔄 Application Flow

```text
Candidate
    │
    ├── Register / Login
    │
    ├── Create Profile
    │
    ├── Upload Resume
    │
    ├── Browse Jobs
    │
    └── Apply for Job
              │
              ▼
        Job Application
              │
              ▼
          Recruiter
              │
              └── Review Applicants
```

---

## ⚙️ Local Installation

### 1. Clone the frontend

```bash
git clone https://github.com/sadulakarthikeyreddy/Jobhub-frontend.git
cd Jobhub-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start frontend

```bash
npm start
```

The frontend runs on:

```text
http://localhost:3000
```

---

### Backend Installation

```bash
git clone https://github.com/sadulakarthikeyreddy/Jobhub-backend.git
cd Jobhub-backend
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
node server.js
```

The backend runs locally on:

```text
http://localhost:5000
```

---

## 🔑 Environment Variables

The backend requires environment variables for:

```text
PORT
MONGO_URI
JWT_SECRET
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

Create a `.env` file in the backend project.

**Never commit `.env` to GitHub.**

---

## 📡 API

The backend provides APIs for:

* Authentication
* Users
* Companies
* Jobs
* Applications
* Admin operations
* Resume uploads

The deployed backend is available at:

https://jobhub-backend-46sj.onrender.com/

---

## 📱 Responsive Application

The application is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

---

## 🎯 Project Goals

JobHub was developed to demonstrate practical full-stack development skills including:

* REST API development
* Database design
* Authentication and authorization
* Role-based access control
* File uploads
* Cloud storage
* Frontend/backend integration
* Deployment
* Git and GitHub workflow

---

## 👨‍💻 Developer

**Karthik Reddy**

Full Stack Developer | MERN Stack

### Links

* GitHub: https://github.com/sadulakarthikeyreddy
* JobHub Live Demo: https://jobhub-frontend-sable.vercel.app/

---

## ⭐ If you find this project useful

Feel free to explore the repository and try the live application.
