# 📝 Blog App (React + Appwrite)

A full-featured blog application built with React, Appwrite, and modern frontend tools.
Users can authenticate, create posts, and manage content with a clean and responsive UI.

---

## 🚀 Features

* 🔐 User Authentication (Signup / Login / Logout)
* 📝 Create, Update, Delete Blog Posts
* 🖼️ Upload & Preview Images
* 📦 State Management using Redux Toolkit
* ⚡ Form Handling with React Hook Form
* 🎨 Responsive UI with Tailwind CSS
* 🔄 Real-time UI updates based on auth state
* 🛡️ Protected Routes for secure pages

---

## 🛠️ Tech Stack

**Frontend:**

* React (Vite)
* Redux Toolkit
* React Router DOM
* React Hook Form
* Tailwind CSS
* TinyMCE

**Backend / Services:**

* Appwrite (Auth, Database, Storage)

---

## 📁 Project Structure

```
src/
│
├── appwrite/        # Appwrite services (auth, database, storage)
├── components/      # Reusable UI components
├── pages/           # Route pages (Login, Signup, Home, etc.)
├── store/           # Redux slices and store
├── config/          # Environment configuration
└── App.jsx          # Main layout (Header + Footer + Outlet)
```

---

## ⚙️ Environment Variables

Create a `.env` file in root:

```
VITE_APPWRITE_URL=your_appwrite_url
VITE_APPWRITE_PROJECT_ID=your_project_id
VITE_APPWRITE_DATABASE_ID=your_database_id
VITE_APPWRITE_COLLECTION_ID=your_collection_id
VITE_APPWRITE_BUCKET_ID=your_bucket_id
```

---

## 📦 Installation & Setup

```bash
# Clone repo
git clone https://github.com/your-username/blog-app.git

# Go into project
cd blog-app

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🔐 Authentication Flow

```
User submits form
   ↓
Appwrite Auth (create/login)
   ↓
Get current user
   ↓
Store in Redux
   ↓
UI updates automatically
```

---

## 🧠 Key Concepts Used

* Centralized state management (Redux)
* Separation of concerns (Services vs UI)
* Protected routing
* Form validation without re-renders
* Async handling with async/await

---

## 🐛 Debugging & Edge Cases Handled

* Invalid credentials handling
* Empty states (no posts)
* Loading states
* API error handling
* Route protection

---

## 📌 Future Improvements

* 🔎 Search & filter posts
* ❤️ Like / Comment system
* 🌐 Deployment (Vercel / Netlify)
* 🧾 Pagination
* 🧠 Rich text improvements

---

## 👨‍💻 Author

Chirag Bansal

---

## ⭐ Acknowledgement

Built as a frontend (along with some backend services to make it useful) learning project to understand modern React architecture and backend integration.

---

## 📄 License

This project is open-source and free to use.
