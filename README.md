# 🚀 EmpDash — Employee & Task Management Dashboard

<div align="center">

![EmpDash Banner](https://img.shields.io/badge/EmpDash-MERN%20Stack%20Dashboard-6366f1?style=for-the-badge&logo=react)

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb)](https://mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=json-web-tokens)](https://jwt.io/)

A **professional, production-ready** full-stack MERN Employee & Task Management Dashboard inspired by Jira, GoodDay, and modern HRMS systems. Built to demonstrate strong MERN fundamentals, clean architecture, and professional coding standards.

</div>

---

## ✨ Features

### 🔐 Authentication System
- Secure JWT-based register & login
- Protected routes with automatic redirect
- Persistent sessions via localStorage
- Logout with full session cleanup

### 📊 Dashboard
- **4 live statistics cards** — Total/Active Employees, Pending/Completed Tasks
- **Task Status Pie Chart** using Recharts
- **Department Bar Chart** — employee distribution
- **Recent Activity Feed** — latest tasks and newly added employees

### 👥 Employee Management
- Add, edit, delete employees
- Search by name, email, or role
- Filter by department and status
- Paginated table (10/page)
- Status badges: Active · Inactive · On Leave

### 📋 Task Management (Kanban Board)
- **3-column Kanban** — Todo | In Progress | Done
- Create tasks with title, description, priority, due date
- Assign tasks to employees
- Inline status change from task cards
- Priority levels: Low · Medium · High (color-coded)
- Overdue date highlighting

### 🎨 UI/UX
- Collapsible sidebar navigation
- Mobile-responsive with hamburger drawer
- Toast notifications (react-hot-toast)
- Loading spinners & states
- Form validation with inline errors
- Smooth animations & hover transitions
- Glassmorphism auth pages

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS 3 |
| **Routing** | React Router v6 |
| **HTTP Client** | Axios (with JWT interceptors) |
| **Charts** | Recharts |
| **Icons** | React Icons (Remix Icons) |
| **Notifications** | React Hot Toast |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB + Mongoose |
| **Auth** | JWT + bcryptjs |
| **Dev Tools** | Nodemon, Morgan |

---

## 📁 Project Structure

```
mern-employee-dashboard/
├── client/                     # React frontend (Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Button, Input, Modal, Badge, Spinner, Avatar
│   │   │   ├── layout/         # Sidebar, Navbar
│   │   │   ├── dashboard/      # StatsCard, TaskChart, ActivityFeed
│   │   │   ├── employees/      # EmployeeTable, EmployeeForm
│   │   │   └── tasks/          # KanbanColumn, TaskCard, TaskForm
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Auth state, JWT persistence
│   │   ├── layouts/
│   │   │   ├── AuthLayout.jsx  # Login/Register wrapper
│   │   │   └── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Employees.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── NotFound.jsx
│   │   ├── services/           # Axios API service layer
│   │   └── utils/              # helpers.js (formatters, color utils)
│   └── package.json
│
└── server/                     # Node.js + Express backend
    ├── config/
    │   └── db.js               # MongoDB connection
    ├── controllers/
    │   ├── authController.js
    │   ├── employeeController.js
    │   ├── taskController.js
    │   └── dashboardController.js
    ├── middleware/
    │   ├── authMiddleware.js    # JWT protect + adminOnly
    │   └── errorMiddleware.js  # Global error handler
    ├── models/
    │   ├── User.js
    │   ├── Employee.js
    │   └── Task.js
    ├── routes/
    │   ├── authRoutes.js
    │   ├── employeeRoutes.js
    │   ├── taskRoutes.js
    │   └── dashboardRoutes.js
    ├── scripts/
    │   └── seedData.js         # Demo data seeder
    ├── server.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/kamleshkumaryadav5951-pixel/mern-employee-dashboard.git
cd mern-employee-dashboard
```

### 2. Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env` with your values:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/employee-dashboard?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Seed the database with demo data:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`

### 3. Frontend Setup

```bash
cd ../client
npm install
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 🔑 Demo Credentials

After running the seed script:

| Field | Value |
|---|---|
| Email | `admin@dashboard.com` |
| Password | `admin123` |

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new user |
| `POST` | `/api/auth/login` | Login + get JWT |
| `GET` | `/api/auth/me` | Get current user |

### Employees
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/employees` | List (search, filter, paginate) |
| `POST` | `/api/employees` | Create employee |
| `PUT` | `/api/employees/:id` | Update employee |
| `DELETE` | `/api/employees/:id` | Delete employee |

### Tasks
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/tasks` | List tasks (filterable) |
| `POST` | `/api/tasks` | Create task |
| `PUT` | `/api/tasks/:id` | Update task/status |
| `DELETE` | `/api/tasks/:id` | Delete task |

### Dashboard
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/dashboard/stats` | Stats, charts, activity |

---

## 🌐 Deployment

### Frontend → Vercel

1. Push to GitHub
2. Import project in [vercel.com](https://vercel.com)
3. Set root directory to `client`
4. Add env var: `VITE_API_URL=https://your-backend.onrender.com/api`
5. Deploy

### Backend → Render

1. Create new **Web Service** on [render.com](https://render.com)
2. Set root directory to `server`
3. Build command: `npm install`
4. Start command: `npm start`
5. Add all environment variables from `.env.example`

---

## 🧑‍💻 Author

**Kamlesh Kumar Yadav**
- GitHub: [@kamleshkumaryadav5951-pixel](https://github.com/kamleshkumaryadav5951-pixel)

---

## 📝 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
Made with ❤️ using the MERN Stack
</div>
