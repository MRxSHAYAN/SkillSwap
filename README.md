# SkillSwap - Peer-to-Peer Skill Exchange Platform

> **Swap Skills, Learn Together, Grow Faster.**  
> A modern, full-stack peer-to-peer skill exchange platform enabling creators, developers, designers, and lifelong learners to share expertise and trade knowledge without financial barriers.

---

## 🌟 Project Overview & Features

SkillSwap is an intuitive platform built to facilitate direct 1-on-1 skill trading. Users showcase the skills they can teach (`skillsOffered`) alongside the skills they want to master (`skillsWanted`). Through smart match suggestions, structured proposal workflows, session scheduling, dynamic credit rewards, community leaderboards, and real-time alerts, SkillSwap fosters a collaborative learning ecosystem.

### Core Features

- 🔒 **Auth & Security**
  - Secure authentication using JSON Web Tokens (JWT) and `bcryptjs` password hashing.
  - User registration, login, and profile authorization middleware.
  - 6-digit OTP password reset workflow delivered via email using Nodemailer (SMTP).

- 📊 **Dynamic Dashboard**
  - Personalized control panel displaying real-time user statistics (active swaps, completed sessions, credits balance).
  - Active skill exchange overviews, upcoming session trackers, and live activity feeds.

- 🔍 **Explore Skills**
  - Search and filter available skills across multiple categories (Development, Design, Business, Marketing, Languages, AI, and more).
  - Category-based skill breakdown with search filters and proficiency level badges.

- 🤖 **AI Suggested Matches**
  - Smart skill matching engine based on complementary user wishlists (comparing `skillsOffered` vs. `skillsWanted`).
  - Calculates dynamic match percentages (e.g. 95% Match) and generates personalized match rationale summaries.

- 🔄 **My Swaps Management & Automatic Credit Settlement**
  - Tabbed interface to manage:
    - **Received Proposals**: Incoming swap offers from other members.
    - **Sent Requests**: Outgoing proposal tracking with status updates (`pending`, `accepted`, `rejected`).
    - **Active Swaps**: Ongoing confirmed exchanges with direct session links.
  - **Completion Settlement**: Completing a swap transfers 10 Credits to the teacher and logs transaction history.

- 🏆 **Dynamic Community Leaderboard**
  - Real-time mentor rankings filterable by `weekly`, `monthly`, or `all time`.
  - Calculates teaching hours, completed swaps, average reviews, top skills, and dynamic mentor badges ("Master Mentor", "Level 4 Mentor", "Growth Guru", "Rising Star").

- 💳 **Credits & Rewards System**
  - Integrated credit wallet (`GET /api/credits`).
  - Live transaction history logging `EARNED` (+10) and `SPENT` (-10) credit events with partner details.

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
- **API Handling**: Custom `apiFetch` utility with safe text parsing and status error mapping.

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
│   │   │   ├── creditController.js
│   │   │   ├── dashboardController.js
│   │   │   ├── leaderboardController.js
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
│   │   │   ├── CreditTransaction.js
│   │   │   ├── NewsletterSubscriber.js
│   │   │   ├── Notification.js
│   │   │   ├── Review.js
│   │   │   ├── Swap.js
│   │   │   └── User.js
│   │   ├── routes/             # API endpoint declarations
│   │   │   ├── authRoutes.js
│   │   │   ├── contactRoutes.js
│   │   │   ├── creditRoutes.js
│   │   │   ├── dashboardRoutes.js
│   │   │   ├── leaderboardRoutes.js
│   │   │   ├── matchRoutes.js
│   │   │   ├── newsletterRoutes.js
│   │   │   ├── notificationRoutes.js
│   │   │   ├── reviewRoutes.js
│   │   │   ├── skillsRoutes.js
│   │   │   ├── swapRoutes.js
│   │   │   └── userRoutes.js
│   │   └── utils/              # Helper utilities & email senders
│   │       ├── emailService.js
│   │       └── jwt.js
│   ├── app.js                  # Express app setup & middleware configuration
│   ├── index.js                # HTTP Server listener & DB initializers
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/         # Global shared components (Navbar, Footer, Modals)
│   │   ├── dashboard/          # Protected dashboard environment
│   │   │   ├── components/     # Sidebar, Header, Activity Widgets
│   │   │   └── pages/          # Dashboard sub-views (MySwaps, Credits, SSPleaderboard, etc.)
│   │   ├── utils/              # API fetch utility (apiFetch.js)
│   │   ├── pages/              # Public pages (Landing, Auth, Explore, Profile)
│   │   ├── App.jsx             # Main Router & Route Guards
│   │   └── main.jsx            # Entry point
│   └── package.json
├── PROJECT_EXPLANATION.md     # Detailed architecture & workflow documentation
└── README.md
```

---

## ⚙️ Environment Variables

### Backend Setup (`backend/.env`)

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/skillswap?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173

# Nodemailer / SMTP Config (Optional for OTP Password Reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

---

## 🚀 Installation & Local Running

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MRxSHAYAN/SkillSwap.git
   cd SkillSwap
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   # Configure backend/.env
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

---

## 🌐 Live API Endpoints Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user account | No |
| `POST` | `/api/auth/login` | Authenticate user & return JWT | No |
| `GET` | `/api/user/profile` | Fetch logged-in user profile | Yes |
| `PUT` | `/api/user/profile` | Update profile details & skills | Yes |
| `GET` | `/api/dashboard/stats` | Retrieve user stats & upcoming sessions | Yes |
| `GET` | `/api/matches` | Get dynamic AI match recommendations | Yes |
| `GET` | `/api/swaps/my-requests` | Get active swaps, sent & received proposals | Yes |
| `POST` | `/api/swaps` | Create a new swap proposal | Yes |
| `PATCH` | `/api/swaps/:id/status` | Accept or decline a swap proposal | Yes |
| `PATCH` | `/api/swaps/:id/complete` | Complete swap & settle 10 credits transfer | Yes |
| `GET` | `/api/leaderboard` | Fetch mentor leaderboard (`?timeframe=weekly\|monthly\|all time`) | Yes |
| `GET` | `/api/credits` | Fetch user credit balance & transaction history | Yes |
| `GET` | `/api/notifications` | Fetch system notifications | Yes |

---

## Footer Reveal

SkillSwap features a modern, editorial reveal-footer effect (curtain unmasking) similar to high-end portfolio and digital agency websites.

### What the effect does
- **Layered Stacking**: Rather than appearing as a standard block after the final page section, the footer sits anchored underneath the website content.
- **Hidden While Browsing**: As the user scrolls through page content, the front layer's solid background covers the footer completely.
- **Smooth Curtain Reveal**: As the user reaches the bottom of the page, the front layer moves away upward, smoothly unmasking the footer underneath.
- **Full Interactivity**: When fully revealed, the footer rests naturally at the bottom of the viewport with all links, social icons, and the back-to-top button completely interactive.

### Where the implementation lives
The architecture is centrally contained inside [PublicLayout.jsx](file:///c:/Drive/WorkSpace/Development/Projects/mern%20stack%20projects/SkillSwap/frontend/src/layouts/PublicLayout.jsx), leaving the visual presentation and internal elements of [Footer.jsx](file:///c:/Drive/WorkSpace/Development/Projects/mern%20stack%20projects/SkillSwap/frontend/src/components/Footer.jsx) completely intact.

### Technologies used
A synergy of **Tailwind CSS + Framer Motion + React**:
- **Tailwind CSS**: Manages the positioning (`fixed bottom-0`, `relative`), stacking order (`z-10` vs `z-0`), shadows (`shadow-2xl`), and flex layout.
- **React (`ResizeObserver`)**: Dynamically measures the footer's true rendered height across all viewports (desktop multi-column vs mobile stacked columns) to size the reveal spacer with zero hardcoded pixel heights.
- **Framer Motion (`useScroll` & `useTransform`)**: Drives scroll-linked transitions (`y` parallax, `opacity`, and `scale`) as the user navigates through the reveal zone.

### Stacking & Layering Structure
```
Page Wrapper (relative min-h-screen bg-black)
│
├── Main Content Layer (relative z-10 bg-white min-h-screen shadow-2xl)
│   ├── <Navbar /> (fixed top-0, z-50)
│   └── <Outlet /> (Public pages: Home, About, ExploreSkills, etc.)
│
├── Reveal Spacer (relative w-full pointer-events-none, height = dynamic footerHeight)
│
└── Footer Layer (fixed bottom-0 left-0 w-full z-0, Framer Motion underlay)
    └── <Footer />
```

### How the scroll/reveal animation works
1. The transparent Reveal Spacer sits at the end of the page flow, creating a scroll canvas matching `footerHeight`.
2. Framer Motion tracks scroll progress across this spacer using `useScroll({ target: revealTriggerRef, offset: ["start end", "end end"] })`.
3. As `scrollYProgress` moves from `0` to `1`:
   - `y`: Transitions from `-40px` to `0px` (gentle parallax emergence).
   - `opacity`: Transitions from `0.6` to `1.0` (fades in from submerged depth).
   - `scale`: Transitions from `0.98` to `1.0` (smooth scale expansion).

### How to disable or modify the effect
To revert to a standard, static in-flow footer at any time, open [PublicLayout.jsx](file:///c:/Drive/WorkSpace/Development/Projects/mern%20stack%20projects/SkillSwap/frontend/src/layouts/PublicLayout.jsx) and replace its return statement with standard document flow:

```jsx
export default function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-white text-black">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
```

