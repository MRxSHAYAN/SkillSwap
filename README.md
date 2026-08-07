# SkillSwap - Peer-to-Peer Skill Exchange Platform

**SkillSwap** is a modern, full-stack web application designed for direct peer-to-peer skill exchanges. It connects creators, developers, designers, and learners to trade knowledge without financial transactions. Users can post skill offers, receive AI-powered match recommendations, propose custom swaps, schedule 1-on-1 video sessions, and manage real-time notifications.

---

## 🚀 Core Features

- **Auth & Security**: Secure authentication featuring JWT tokens, bcrypt password hashing, login, registration, and 6-digit OTP password resets delivered via Nodemailer SMTP.
- **Dynamic Dashboard**: Personalized user dashboard displaying real-time swap statistics, active exchanges, upcoming sessions, and recent community activity feed.
- **Explore Skills**: Interactive catalog to search, filter, and discover skills across 13+ domains (Development, Design, Marketing, Business, AI, Languages, etc.).
- **AI Suggested Matches**: Intelligent match engine comparing user profiles (`skillsOffered` vs. `skillsWanted`), returning dynamic match scores (e.g. 95% Match) and personalized rationale strings.
- **My Swaps Management**: Tabbed interface to manage Received proposals, Sent requests, and Active confirmed skill exchanges.
- **Session Scheduler & Live Room**: Track upcoming and past 1-on-1 learning sessions with WebRTC browser video call support.
- **Real-Time Notifications**: Automated system notifications triggered for new swap proposals, proposal status updates (accepted/declined), and session updates.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + Vite 8
- **Routing**: React Router DOM v7
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React & React Icons
- **Animations & 3D**: Framer Motion & Spline 3D

### Backend
- **Runtime**: Node.js
- **Server Framework**: Express.js (v5)
- **Database**: MongoDB & Mongoose ORM
- **Authentication**: JSON Web Tokens (JWT) & bcryptjs
- **Validation & File Handling**: express-validator & Multer
- **Email Service**: Nodemailer (SMTP / Gmail)

---

## 📁 Folder Structure

```
SkillSwapp/
├── backend/
│   ├── src/
│   │   ├── config/             # Database & server configurations
│   │   ├── controllers/        # Express route controllers
│   │   │   ├── authController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── matchController.js
│   │   │   ├── notificationController.js
│   │   │   ├── reviewController.js
│   │   │   ├── swapController.js
│   │   │   └── userController.js
│   │   ├── middleware/         # Auth JWT verification & validators
│   │   ├── models/             # Mongoose schemas
│   │   │   ├── ContactMessage.js
│   │   │   ├── NewsletterSubscriber.js
│   │   │   ├── Notification.js
│   │   │   ├── Review.js
│   │   │   ├── Swap.js
│   │   │   └── User.js
│   │   ├── routes/             # API route declarations
│   │   │   ├── authRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── matchRoutes.js
│   │   │   ├── notificationRoutes.js
│   │   │   ├── reviewRoutes.js
│   │   │   ├── swapRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── utils/              # Email transporter & helper functions
│   │   └── app.js              # Express app setup & CORS configuration
│   ├── server.js               # Entry point for backend server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/             # Static images, icons, and logos
│   │   ├── components/         # Reusable UI components (Navbar, Footer, Modals)
│   │   ├── dashboard/          # Dashboard layout & pages
│   │   │   ├── components/     # Dashboard Navbar, Sidebar, Stats
│   │   │   └── pages/          # Dashboard views
│   │   │       ├── DashboardExploreSkills.jsx
│   │   │       ├── LiveRoom.jsx
│   │   │       ├── Matches.jsx
│   │   │       ├── Messages.jsx
│   │   │       ├── MySwaps.jsx
│   │   │       ├── NewSwap.jsx
│   │   │       ├── ProfileSettings.jsx
│   │   │       ├── PublicProfile.jsx
│   │   │       ├── Settings.jsx
│   │   │       ├── SwapDetails.jsx
│   │   │       └── ViewAllNotifications.jsx
│   │   ├── pages/              # Public marketing pages
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ExploreSkills.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Reviews.jsx
│   │   │   └── Auth/           # Login, Register, ForgotPassword
│   │   ├── App.jsx             # Main Router configuration
│   │   └── main.jsx            # React root mount
│   ├── package.json
│   └── vite.config.js
│
├── README.md                   # Project documentation
└── package.json
```

---

## ⚙️ Setup & Installation Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017/skillswap`) or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster.

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/MRxSHAYAN/SkillSwap.git
cd SkillSwapp
```

---

### Step 2: Install Dependencies

#### Install Backend Dependencies
```bash
cd backend
npm install
```

#### Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

### Step 3: Configure Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
# Server Configuration
PORT=5000
FRONTEND_URL=http://localhost:5173

# Database
MONGO_URI=mongodb://localhost:27017/skillswap

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Email Transporter (Nodemailer / Gmail SMTP)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
EMAIL_FROM=SkillSwapp <your_email@gmail.com>
```

---

### Step 4: Run Development Servers

#### Terminal 1 — Start Backend Server
```bash
cd backend
npm run dev
```
*(Server will start on `http://localhost:5000`)*

#### Terminal 2 — Start Frontend Application
```bash
cd frontend
npm run dev
```
*(Client will start on `http://localhost:5173`)*

---

## 📡 API Routes Reference Table

| Category | Method | Endpoint | Access | Description |
|---|---|---|---|---|
| **Auth** | `POST` | `/api/auth/register` | Public | Register a new user account |
| **Auth** | `POST` | `/api/auth/login` | Public | Authenticate user & receive JWT token |
| **Auth** | `POST` | `/api/auth/forgot-password` | Public | Send 6-digit OTP code to user email |
| **Auth** | `POST` | `/api/auth/reset-password` | Public | Verify OTP & set new password |
| **User Profile** | `GET` | `/api/user/settings/me` | Private | Get authenticated user profile |
| **User Profile** | `PUT` | `/api/user/settings/me` | Private | Update profile details / avatar |
| **User Profile** | `PUT` | `/api/user/settings/me/password` | Private | Change password |
| **User Profile** | `PUT` | `/api/user/settings/me/prefs` | Private | Update notification & swap preferences |
| **User Profile** | `DELETE` | `/api/user/settings/me` | Private | Permanently delete account |
| **Dashboard** | `GET` | `/api/dashboard/stats` | Private | Fetch user dashboard metrics |
| **Dashboard** | `GET` | `/api/dashboard/activity` | Private | Fetch recent swap activity feed |
| **Matches** | `GET` | `/api/matches/ai-suggestions` | Private | Fetch AI match suggestions & scores |
| **Swaps** | `POST` | `/api/swaps/propose` | Private | Propose a skill swap to a candidate |
| **Swaps** | `POST` | `/api/swaps/create` | Private | Create an open skill swap offer |
| **Swaps** | `GET` | `/api/swaps/mine` | Private | Fetch all user swaps |
| **Swaps** | `GET` | `/api/swaps/my-requests` | Private | Fetch Received, Sent, and Active swaps |
| **Swaps** | `PATCH` | `/api/swaps/:id/status` | Private | Accept or decline a swap proposal |
| **Swaps** | `PATCH` | `/api/swaps/:id/complete` | Private | Mark an active swap as completed |
| **Notifications**| `GET` | `/api/notifications` | Private | Fetch user notifications & unread count |
| **Notifications**| `PATCH` | `/api/notifications/read-all` | Private | Mark all notifications as read |
| **Notifications**| `PATCH` | `/api/notifications/:id/read` | Private | Mark single notification as read |
| **Reviews** | `GET` | `/api/reviews` | Public | Fetch all community reviews |
| **Reviews** | `POST` | `/api/reviews` | Private | Submit a review for a swap partner |
| **Skills** | `GET` | `/api/skills` | Public | List available skill categories |
| **Contact** | `POST` | `/api/contact` | Public | Submit contact support message |
| **Newsletter** | `POST` | `/api/newsletter/subscribe` | Public | Subscribe email to newsletter |

---

## 📜 License

This project is licensed under the MIT License.
