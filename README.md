# SkillSwap - Peer-to-Peer Skill Exchange Platform

> **Swap Skills, Learn Together, Grow Faster.**  
> A modern, full-stack peer-to-peer skill exchange platform enabling creators, developers, designers, and lifelong learners to share expertise and trade knowledge without financial barriers.

---

## 🌟 Project Overview & Features

SkillSwap is an intuitive platform built to facilitate direct 1-on-1 skill trading. Users showcase the skills they can teach (`skillsOffered`) alongside the skills they want to master (`skillsWanted`). Through smart match suggestions, structured proposal workflows, session scheduling, and real-time alerts, SkillSwap fosters a collaborative learning ecosystem.

### Core Features Summary

- 🔒 **Auth & Security**
  - Secure authentication using JSON Web Tokens (JWT) and `bcryptjs` password hashing.
  - User registration, login, and profile authorization middleware.
  - 6-digit OTP password reset workflow delivered via email using Nodemailer (SMTP).

- 📊 **Dynamic Dashboard**
  - Personalized control panel displaying real-time user statistics (active swaps, completed sessions, credits/SSP).
  - Active skill exchange overviews, upcoming session trackers, and live activity feeds.

- 🔍 **Explore Skills**
  - Search and filter available skills across multiple categories (Development, Design, Business, Marketing, Languages, AI, and more).
  - Category-based skill breakdown with search filters and proficiency level badges.

- 🤖 **AI Suggested Matches**
  - Smart skill matching engine based on complementary user wishlists (comparing `skillsOffered` vs. `skillsWanted`).
  - Calculates dynamic match percentages (e.g. 95% Match) and generates personalized match rationale summaries.

- 🔄 **My Swaps Management**
  - Tabbed interface to manage:
    - **Received Proposals**: Incoming swap offers from other members.
    - **Sent Requests**: Outgoing proposal tracking with status updates (`pending`, `accepted`, `rejected`).
    - **Active Swaps**: Ongoing confirmed exchanges with direct session links.

- 📅 **Session Scheduler & Live Room**
  - Track upcoming and past 1-on-1 learning sessions with date/time scheduling.
  - Integrated **Live Room** web video call interface for real-time peer sessions.

- 🔔 **Real-Time System Notifications**
  - System alerts triggered for new swap proposals, status changes (accepted/declined), and session reminders.
  - Unread badge counters, quick action popovers, and dedicated notification management page.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React.js](https://react.dev/) (v19) with [Vite](https://vitejs.dev/) (v8)
- **Routing**: [React Router DOM](https://reactrouter.com/) (v7)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
- **Icons & UI Assets**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Animations & 3D**: [Framer Motion](https://www.framer.com/motion/) & Spline 3D (`@splinetool/react-spline`)

### Backend
- **Runtime**: [Node.js](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/) (v5)
- **Database & ORM**: [MongoDB](https://www.mongodb.com/) & [Mongoose](https://mongoosejs.com/)
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **Validation & File Uploads**: `express-validator` & `multer`
- **Email Service**: [Nodemailer](https://nodemailer.com/) (SMTP / Gmail Integration)

---

## 📁 Folder Structure Overview

```
SkillSwap/
├── backend/
│   ├── src/
│   │   ├── config/             # DB connection & environment setup
│   │   │   └── db.js
│   │   ├── controllers/        # Route logic & controller handlers
│   │   │   ├── authController.js
│   │   │   ├── contactController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── matchController.js
│   │   │   ├── newsletterController.js
│   │   │   ├── notificationController.js
│   │   │   ├── reviewController.js
│   │   │   ├── skillsController.js
│   │   │   ├── swapController.js
│   │   │   └── userController.js
│   │   ├── middleware/         # JWT verification, validators & Multer upload
│   │   │   ├── authMiddleware.js
│   │   │   ├── upload.js
│   │   │   └── validators.js
│   │   ├── models/             # Mongoose database models
│   │   │   ├── ContactMessage.js
│   │   │   ├── NewsletterSubscriber.js
│   │   │   ├── Notification.js
│   │   │   ├── Review.js
│   │   │   ├── Swap.js
│   │   │   └── User.js
│   │   ├── routes/             # API endpoint declarations
│   │   │   ├── authRoutes.js
│   │   │   ├── contactRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── matchRoutes.js
│   │   │   ├── newsletterRoutes.js
│   │   │   ├── notificationRoutes.js
│   │   │   ├── reviewRoutes.js
│   │   │   ├── skillsRoutes.js
│   │   │   ├── swapRoutes.js
│   │   │   └── userRoutes.js
│   │   ├── utils/              # Email transporter & helper utilities
│   │   │   └── emailService.js
│   │   └── app.js              # Express application setup & CORS
│   ├── .env                    # Backend environment configuration
│   ├── server.js               # Entry point for backend HTTP server
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/             # Graphics, logos, and static assets
│   │   ├── components/         # Reusable public components (Navbar, Footer, Modals)
│   │   │   ├── Footer.jsx
│   │   │   ├── GuestRoute.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ScrollToTop.jsx
│   │   ├── dashboard/          # Authenticated user dashboard section
│   │   │   ├── components/     # Dashboard Navigation & Sidebar
│   │   │   │   ├── DashboardFooter.jsx
│   │   │   │   ├── DashboardNavbar.jsx
│   │   │   │   └── DashboardSidebar.jsx
│   │   │   ├── pages/          # Dashboard features & session views
│   │   │   │   ├── Credits.jsx
│   │   │   │   ├── DashboardExploreSkills.jsx
│   │   │   │   ├── LiveRoom.jsx
│   │   │   │   ├── Matches.jsx
│   │   │   │   ├── Messages.jsx
│   │   │   │   ├── MySwaps.jsx
│   │   │   │   ├── NewSwap.jsx
│   │   │   │   ├── ProfileSettings.jsx
│   │   │   │   ├── PublicProfile.jsx
│   │   │   │   ├── SSPleaderboard.jsx
│   │   │   │   ├── Settings.jsx
│   │   │   │   ├── SwapDetails.jsx
│   │   │   │   └── ViewAllNotifications.jsx
│   │   │   └── DashboardHome.jsx
│   │   ├── layouts/            # Page layout wrappers
│   │   │   ├── DashboardLayout.jsx
│   │   │   └── PublicLayout.jsx
│   │   ├── pages/              # Public marketing pages & auth forms
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── ExploreSkills.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Reviews.jsx
│   │   │   └── Auth/
│   │   │       ├── ForgotPassword.jsx
│   │   │       ├── Login.jsx
│   │   │       └── Register.jsx
│   │   ├── App.jsx             # Client route definitions
│   │   └── main.jsx            # Application DOM mount
│   ├── package.json
│   └── vite.config.js
│
├── README.md                   # Comprehensive project documentation
└── package.json                # Root monorepo script runner
```

---

## ⚙️ Setup & Installation Instructions

Follow these step-by-step instructions to get a local development instance of **SkillSwap** running on your machine.

### Prerequisites

Ensure you have the following installed on your local machine:
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher
- **MongoDB**: Local MongoDB instance (`mongodb://localhost:27017/skillswap`) or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) connection string.

---

### Step 1: Clone the Repository

```bash
git clone https://github.com/MRxSHAYAN/SkillSwap.git
cd SkillSwap
```

---

### Step 2: Install Dependencies

#### Root Directory Dependencies (Concurrently Script Runner)
```bash
npm install
```

#### Backend Dependencies
```bash
cd backend
npm install
```

#### Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

### Step 3: Set Up Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server Port & CORS Frontend URL
PORT=5000
FRONTEND_URL=http://localhost:5173

# MongoDB Connection String
MONGO_URI=mongodb://localhost:27017/skillswap

# JWT Secret Key & Expiration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=7d

# Nodemailer / Gmail SMTP Settings (For Forgot Password OTP Emails)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_character_app_password
EMAIL_FROM=SkillSwap <your_email@gmail.com>
```

> 💡 **Note on Gmail SMTP Setup**:
> 1. Enable 2-Step Verification on your Google Account: [Google Security Settings](https://myaccount.google.com/security).
> 2. Generate an App Password: [Google App Passwords](https://myaccount.google.com/apppasswords).
> 3. Enter your Gmail address in `SMTP_USER` and the generated 16-character code in `SMTP_PASS`.

---

### Step 4: Run Development Servers

You can start both frontend and backend servers simultaneously from the root directory, or start them individually.

#### Option A: Concurrent Start (Root Directory)
```bash
# Run from project root
npm run dev
```

#### Option B: Individual Terminal Start

**Terminal 1 — Backend Server**
```bash
cd backend
npm run dev
# Server will listen on http://localhost:5000
```

**Terminal 2 — Frontend App**
```bash
cd frontend
npm run dev
# Vite client will run on http://localhost:5173
```

---

## 📡 API Routes Reference Table

| Category | Method | Endpoint | Access | Description |
|---|---|---|---|---|
| **Auth** | `POST` | `/api/auth/register` | Public | Register a new user account |
| **Auth** | `POST` | `/api/auth/login` | Public | Authenticate credentials & return JWT token |
| **Auth** | `POST` | `/api/auth/forgot-password` | Public | Send 6-digit OTP code to user's registered email |
| **Auth** | `POST` | `/api/auth/reset-password` | Public | Verify OTP code & reset password |
| **Dashboard** | `GET` | `/api/dashboard/overview` | Private | Fetch user stats, active swaps, & activity feed |
| **Matches** | `GET` | `/api/matches/ai-suggestions` | Private | Get AI-suggested complementary skill matches |
| **Swaps & Proposals** | `POST` | `/api/swaps/propose` | Private | Propose a skill exchange to a target user |
| **Swaps & Proposals** | `POST` | `/api/swaps/create` | Private | Create an open skill swap listing |
| **Swaps & Proposals** | `GET` | `/api/swaps/mine` | Private | Fetch all swap listings created by authenticated user |
| **Swaps & Proposals** | `GET` | `/api/swaps/my-requests` | Private | Retrieve Received, Sent, and Active swaps |
| **Swaps & Proposals** | `PATCH` | `/api/swaps/:id/status` | Private | Accept or decline an incoming swap proposal |
| **Swaps & Proposals** | `PATCH` | `/api/swaps/:id/complete` | Private | Mark an active skill swap as completed |
| **Sessions** | `GET` | `/api/swaps/my-requests` | Private | Retrieve upcoming scheduled 1-on-1 sessions |
| **Sessions** | `PATCH` | `/api/swaps/:id/status` | Private | Confirm session schedule & activate Live Room |
| **Notifications** | `GET` | `/api/notifications` | Private | Fetch notifications list & unread count |
| **Notifications** | `PATCH` | `/api/notifications/read-all` | Private | Mark all user notifications as read |
| **Notifications** | `PATCH` | `/api/notifications/:id/read` | Private | Mark a specific notification as read |
| **User Profile** | `GET` | `/api/user/settings/me` | Private | Fetch current user profile details |
| **User Profile** | `PUT` | `/api/user/settings/me` | Private | Update profile bio, skills, & avatar image |
| **User Profile** | `PUT` | `/api/user/settings/me/password` | Private | Change user account password |
| **User Profile** | `PUT` | `/api/user/settings/me/prefs` | Private | Update notification & swap preferences |
| **User Profile** | `DELETE` | `/api/user/settings/me` | Private | Permanently delete user account |
| **Explore Skills** | `GET` | `/api/skills` | Private | Search and filter skills by name or category |
| **Reviews** | `GET` | `/api/reviews` | Public | Get all community reviews |
| **Reviews** | `POST` | `/api/reviews` | Private | Post a rating and review for a swap partner |
| **Contact** | `POST` | `/api/contact` | Public | Submit support inquiry message |
| **Newsletter** | `POST` | `/api/newsletter/subscribe` | Public | Subscribe email address to platform newsletter |

---

## 📜 License

This project is open-source under the [MIT License](LICENSE).
