# SkillSwap

**Trade skills, not money.** SkillSwap is a modern peer-to-peer skill exchange platform where creators and developers swap what they know for what they want to learn — no subscriptions, no paywalls, just direct 1-on-1 value exchange.

---

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-19.x-61dafb?logo=react)
![Express](https://img.shields.io/badge/express-5.x-black?logo=express)
![MongoDB](https://img.shields.io/badge/mongodb-mongoose%208.x-47a248?logo=mongodb)
![Tailwind](https://img.shields.io/badge/tailwindcss-4.x-38bdf8?logo=tailwindcss)
![Deployed on Vercel](https://img.shields.io/badge/deploy-vercel-black?logo=vercel)

---

## Preview

> **Screenshot / Demo**
> _(Add a screenshot or screen recording of the live platform here)_
>
> ```
> [ Hero Page ]    [ Dashboard Home ]    [ Explore Skills ]    [ Settings ]
> ```

---

## Key Features

- **Peer-to-Peer Skill Matching** — Browse and propose direct skill swaps with verified community members across 13+ domains including Development, Design, AI, Music, and more.
- **Full User Dashboard** — Manage active swaps, sessions, matches, messages, credits, and a community leaderboard from a single interface.
- **Live Session Room** — Browser-based video and screen sharing using the native WebRTC / MediaDevices API for real-time 1-on-1 sessions.
- **JWT Authentication** — Secure register, login, and protected routes with JSON Web Tokens and bcrypt password hashing.
- **Profile & Settings API** — Full account management: avatar upload (base64), username, bio, timezone, notification preferences, swap preferences, password change, and account deletion with IDOR protection.
- **Community Reviews** — Submit peer ratings to MongoDB with a graceful demo-data fallback when the API is offline.
- **Newsletter & Contact APIs** — Backend-integrated subscription and contact message endpoints with idempotency checks.
- **Serverless-Ready Backend** — Express app wrapped as a Vercel serverless function with a mongoose connection cache for cold-start safety.
- **Responsive Design** — Mobile-first layout with animated sidebar, Framer Motion page transitions, and a sticky category filter bar.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 + Vite 8 |
| **Routing** | React Router DOM v7 |
| **Styling** | Tailwind CSS v4 |
| **Animations** | Framer Motion v12 |
| **Icons** | Lucide React, React Icons |
| **3D / Interactive** | Spline React |
| **Backend** | Node.js + Express 5 |
| **Database** | MongoDB via Mongoose 8 |
| **Auth** | JSON Web Token + bcryptjs |
| **Validation** | express-validator |
| **File Uploads** | Multer (memory storage) |
| **Deployment** | Vercel (frontend + backend serverless) |
| **Linting** | oxlint |

---

## Getting Started

### Prerequisites

- Node.js **v18+**
- npm, pnpm, or yarn
- A MongoDB connection string (local or [MongoDB Atlas](https://www.mongodb.com/atlas))

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd SkillSwapp

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend
npm install
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/skillswap
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Running Locally

Open two terminals:

```bash
# Terminal 1 — Backend (from /backend)
npm run dev

# Terminal 2 — Frontend (from /frontend)
npm run dev
```

The frontend dev server proxies `/api/*` requests to the backend. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
SkillSwapp/
├── backend/
│   ├── index.js                  # Vercel serverless entry point
│   ├── server.js                 # Local dev server
│   ├── vercel.json               # Vercel deployment config
│   └── src/
│       ├── app.js                # Express app (CORS, routes, error handling)
│       ├── config/
│       │   └── db.js             # Mongoose connection with serverless cache
│       ├── controllers/
│       │   ├── authController.js
│       │   ├── userController.js
│       │   ├── reviewController.js
│       │   ├── contactController.js
│       │   └── newsletterController.js
│       ├── middleware/
│       │   ├── authMiddleware.js  # JWT protect + role restriction
│       │   ├── upload.js          # Multer memory storage
│       │   └── validators.js      # express-validator rule sets
│       ├── models/
│       │   ├── User.js
│       │   ├── Review.js
│       │   ├── ContactMessage.js
│       │   └── NewsletterSubscriber.js
│       └── routes/
│           ├── authRoutes.js
│           ├── userRoutes.js
│           ├── reviewRoutes.js
│           ├── contactRoutes.js
│           └── newsletterRoutes.js
│
└── frontend/
    ├── index.html
    └── src/
        ├── App.jsx                # Route definitions
        ├── components/            # Navbar, Footer, ProtectedRoute, GuestRoute, ScrollToTop
        ├── layouts/               # PublicLayout, DashboardLayout
        ├── pages/
        │   ├── Home.jsx
        │   ├── About.jsx
        │   ├── ExploreSkills.jsx
        │   ├── Reviews.jsx
        │   ├── Contact.jsx
        │   └── Auth/              # Login, Register, ForgotPassword
        └── dashboard/
            ├── DashboardHome.jsx
            ├── components/        # DashboardNavbar, DashboardSidebar, DashboardFooter
            └── pages/             # 14 dashboard pages (Swaps, Sessions, LiveRoom, Settings, etc.)
```

---

## API Endpoints

All API routes are prefixed with `/api`. Protected routes require an `Authorization: Bearer <token>` header.

### Auth

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login and receive a JWT |

### User / Settings

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/user/settings/me` | Private | Get authenticated user profile |
| `PUT` | `/api/user/settings/me` | Private | Update profile (supports avatar upload via `multipart/form-data`) |
| `PUT` | `/api/user/settings/me/password` | Private | Change password |
| `PUT` | `/api/user/settings/me/prefs` | Private | Update notification and swap preferences |
| `DELETE` | `/api/user/settings/me` | Private | Delete account (requires password confirmation) |

### Reviews

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/reviews` | Public | Get all reviews with summary stats |
| `POST` | `/api/reviews` | Private | Submit a new peer review |
| `GET` | `/api/reviews/:id` | Public | Get a single review by ID |
| `GET` | `/api/reviews/given/:userId` | Public | Get all reviews written by a user |
| `PUT` | `/api/reviews/:id` | Private (owner) | Update a review |
| `DELETE` | `/api/reviews/:id` | Private (owner/admin) | Delete a review |

### Newsletter & Contact

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/newsletter/subscribe` | Public | Subscribe an email to the newsletter |
| `POST` | `/api/contact` | Public | Submit a contact message |

### Health Check

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | Verify the API is online |

---

## Deployment

The project is configured for [Vercel](https://vercel.com) out of the box.

- **Frontend** — Deploy the `frontend/` directory as a Vite static site. Set the build command to `npm run build` and the output directory to `dist`.
- **Backend** — Deploy the `backend/` directory as a serverless Node function. `vercel.json` is already configured to route all traffic through `index.js`.

Set all environment variables from the [Environment Variables](#environment-variables) section in your Vercel project dashboard.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request against `main`

Please keep PRs focused and scoped to a single feature or fix. Follow the existing code style — no new dependencies without discussion.

---

## Known Limitations

- **ForgotPassword flow** is UI-only (OTP simulation). A real backend route for OTP generation and email delivery has not been implemented yet.
- **Avatar storage** uses base64 data URLs stored in MongoDB. For production scale, replace with S3 or Cloudinary.
- **Dashboard data** (swaps, sessions, matches, messages, credits, leaderboard) uses static mock data. Full backend routes for these features are planned.

---

## License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2025 SkillSwap

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```
