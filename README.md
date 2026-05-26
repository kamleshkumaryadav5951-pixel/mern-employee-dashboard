# mern-employee-dashboard

A full stack employee and task management dashboard i built using the MERN stack. Basically think of it like a mini Jira/HR tool where you can manage employees, assign tasks and track progress with a kanban board.

I built this to practice MERN and also have something good to show in interviews. Took me a while to get everything working together especially the JWT part lol.

---
🟢Live Demo : https://mern-employee-dashboard-2fvl.vercel.app
## what it does

- login/register with JWT auth (passwords are hashed with bcrypt)
- dashboard with stats and charts (recharts)
- manage employees — add, edit, delete, search, filter
- task kanban board — todo, in progress, done
- assign tasks to employees with priority and due date
- mobile responsive, collapsible sidebar, toast notifications

---

## tech used

**Frontend**
- React + Vite
- Tailwind CSS
- React Router v6
- Axios
- Recharts (for the dashboard charts)
- React Icons
- React Hot Toast

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT for auth
- bcryptjs for hashing passwords

---

## folder structure

```
mern-employee-dashboard/
├── server/
│   ├── config/         → db connection
│   ├── controllers/    → auth, employee, task, dashboard logic
│   ├── middleware/     → jwt verify, error handler
│   ├── models/         → User, Employee, Task
│   ├── routes/         → all api routes
│   ├── scripts/        → seed script for demo data
│   └── server.js
│
└── client/
    └── src/
        ├── components/ → common/, layout/, dashboard/, employees/, tasks/
        ├── context/    → AuthContext
        ├── layouts/    → AuthLayout, DashboardLayout
        ├── pages/      → Login, Register, Dashboard, Employees, Tasks
        ├── services/   → api calls
        └── utils/      → helper functions
```

---

## how to run locally

### backend

```bash
cd server 
npm install
cp .env.example .env
```

fill in your `.env` (see `.env.example` for what's needed — basically mongo uri, jwt secret and port)

seed sample data:
```bash
npm run seed
```

start server:
```bash
npm run dev
```

### frontend

```bash
cd client
npm install
cp .env.example .env
```

set `VITE_API_URL` in `.env` to your backend url (e.g. `http://localhost:8000/api`)

```bash
npm run dev
```

open http://localhost:5173

**demo login:** `admin@dashboard.com` / `admin123`

---

## api endpoints

```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me

GET    /api/employees         → supports ?search= &department= &status= &page= &limit=
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id

GET    /api/tasks             → supports ?status= &priority= &assignedTo=
POST   /api/tasks
PUT    /api/tasks/:id
DELETE /api/tasks/:id

GET    /api/dashboard/stats
```

---

## deployment

**backend → Render**
- root dir: `server`
- build: `npm install`
- start: `npm start`
- add env vars from `.env.example`

**frontend → Vercel**
- root dir: `client`
- framework: Vite
- env var: `VITE_API_URL=https://your-api.onrender.com/api`

---

## things i want to add later

- drag and drop between kanban columns
- dark mode
- role based access (admin vs employee)
- export to csv
- profile page with avatar upload .

---

## screenshots
<img width="1470" height="840" alt="Screenshot 2026-05-23 at 5 05 35 PM" src="https://github.com/user-attachments/assets/c290bfb7-a015-4e3b-a90f-01456bc3a11f" />
<img width="1470" height="841" alt="Screenshot 2026-05-23 at 5 06 13 PM" src="https://github.com/user-attachments/assets/84ec6131-9d8b-4063-a950-512c594e7be3" />
<img width="1470" height="840" alt="Screenshot 2026-05-23 at 5 05 47 PM" src="https://github.com/user-attachments/assets/4340df0c-5210-4262-bbe2-42a51dc9e03f" />



---

made by **Kamlesh Kumar Yadav**
github: [@kamleshkumaryadav5951-pixel](https://github.com/kamleshkumaryadav5951-pixel)
email: kamleshkumaryadav970@gmail.com
