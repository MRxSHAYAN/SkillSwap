# SkillSwap Codebase Architecture & Technical Guide

This document provides an end-to-end technical explanation of the **SkillSwap** codebase architecture, data models, backend controllers, middleware layer, and frontend client application. It is written for developers to understand how system components interact, how state is managed, and how data flows through the application.

---

## 1. System Architecture Overview

SkillSwap is built as a client-server web application utilizing the MERN stack (MongoDB, Express.js, React.js, Node.js).

```
┌─────────────────────────────────────────────────────────┐
│                    React Client (Vite)                  │
│   (Pages, Protected Routes, Dashboard Layouts, Tailwind) │
└────────────────────────────┬────────────────────────────┘
                             │ HTTP Requests (Bearer JWT)
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   Express.js Server                     │
│   (CORS, JSON Parser, Auth & Custom Middleware)         │
└──────┬─────────────────────┬─────────────────────┬──────┘
       │                     │                     │
       ▼                     ▼                     ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│  Auth & User │     │ Swaps &      │     │ Leaderboard  │
│  Controllers │     │ Credits      │     │ & Stats      │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                    │
       └────────────────────┼────────────────────┘
                            │ Mongoose ORM
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   MongoDB Database                      │
│   (Users, Swaps, CreditTransactions, Reviews, etc.)     │
└─────────────────────────────────────────────────────────┘
```

---

## 2. Database Models (`/backend/src/models`)

### 2.1 User Model (`User.js`)
Stores authentication credentials, profile data, offered/wanted skill sets, notification preferences, and credit balance.
- **Fields**:
  - `fullName` (String, required): Display name.
  - `email` (String, required, unique, lowercase): Primary contact & login credential.
  - `password` (String, required, selected: false): Hashed via `bcryptjs` (salt factor 12).
  - `skillsTeach` / `skillsOffered` ([String]): List of skills user can mentor.
  - `skillsLearn` / `skillsWanted` ([String]): List of skills user wants to master.
  - `credits` (Number, default: 100): Credit token balance used for session transactions.
  - `role` (String, enum: `['user', 'admin']`): User authorization level.
  - `resetOtp` / `resetOtpExpire`: Temporary OTP details for password recovery.

### 2.2 Swap Model (`Swap.js`)
Represents a skill exchange proposal and session lifecycle between two members.
- **Fields**:
  - `creator` (ObjectId, ref: `User`): The user posting the swap offer.
  - `partner` (ObjectId, ref: `User`, default: null): The matched partner user.
  - `offeredSkill` (String): Skill being taught by creator.
  - `wantedSkill` (String): Skill being requested in return.
  - `preferredDuration` (String, enum: `['30 Mins', '1 Hour', '2 Hours']`).
  - `status` (String, enum: `['open', 'pending', 'accepted', 'rejected', 'matched', 'completed', 'cancelled']`).
  - `nextSession` (Date, default: null): Scheduled timestamp for session meeting.

### 2.3 CreditTransaction Model (`CreditTransaction.js`)
Tracks audit records of all credit earnings and expenditures.
- **Fields**:
  - `userId` (ObjectId, ref: `User`): Account receiving or spending credits.
  - `type` (String, enum: `['EARNED', 'SPENT']`): Direction of credit movement.
  - `amount` (Number): Quantity of credits transferred.
  - `description` (String): Human-readable summary (e.g., "Taught React.js").
  - `partnerName` (String): Name of counterparty in the swap session.

### 2.4 Notification Model (`Notification.js`)
Stores in-app alerts triggered by application lifecycle events.
- **Fields**: `recipient`, `sender`, `type`, `message`, `read`, `link`, `createdAt`.

### 2.5 Review Model (`Review.js`)
Stores peer feedback ratings and written commentary after completed swap sessions.

---

## 3. Backend Controllers & API Routes

### 3.1 Authentication Controller (`authController.js` & `authRoutes.js`)
- `POST /api/auth/register`: Validates inputs, hashes password, inserts new user with 100 default credits, issues JWT token.
- `POST /api/auth/login`: Verifies email and password hash, returns JWT payload.
- `POST /api/auth/forgot-password` & `POST /api/auth/verify-otp`: Handles 6-digit OTP generation and email dispatch via Nodemailer.

### 3.2 Swap Controller (`swapController.js` & `swapRoutes.js`)
- `GET /api/swaps/my-requests`: Fetches active, received, and sent swap proposals for logged-in user.
- `POST /api/swaps`: Creates new swap proposal card.
- `PATCH /api/swaps/:id/status`: Updates status (`accepted`, `rejected`).
- `PATCH /api/swaps/:id/complete`: Marks swap session as `completed`, executes credit settlement:
  - Teacher (`creator`): `credits += 10`, logs `EARNED` transaction.
  - Student (`partner`): `credits -= 10`, logs `SPENT` transaction.
  - Triggers in-app completion notification.

### 3.3 Credits Controller (`creditController.js` & `creditRoutes.js`)
- `GET /api/credits`: Returns logged-in user's credit balance and sorted transaction history (`GET /api/credits`).

### 3.4 Leaderboard Controller (`leaderboardController.js` & `leaderboardRoutes.js`)
- `GET /api/leaderboard`: Aggregates completed swaps and reviews per user for timeframe `weekly`, `monthly`, or `all time`.
- Computes `hoursTaught`, `swapsCompleted`, `rating`, `topSkill`, and dynamic mentor badges (`Master Mentor` > 40h, `Level 4 Mentor` > 30h, `Growth Guru` > 20h, `Rising Star` default).

### 3.5 Match Controller (`matchController.js` & `matchRoutes.js`)
- `GET /api/matches`: Computes overlap between user's `skillsWanted` and potential partners' `skillsOffered` to generate match percentages and summaries.

---

## 4. Middleware & Utilities

### 4.1 Authentication Middleware (`authMiddleware.js`)
Extracts `Authorization: Bearer <token>` from HTTP request headers, verifies JWT signature using `JWT_SECRET`, attaches decoded user object to `req.user`, or returns 401 Unauthorized error.

### 4.2 Frontend Fetch Utility (`apiFetch.js`)
Located in `frontend/src/utils/apiFetch.js`. Standardizes client API communication:
1. Automatically attaches `Authorization: Bearer <token>` from `localStorage`.
2. Reads response text using `res.text()` before JSON parsing to avoid JSON parse crashes on empty responses.
3. Checks HTTP status codes (400, 401, 403, 404, 500) and maps them to clean user error messages.
4. Logs detailed technical errors to `console.error` while passing clean error objects to React state banners.

---

## 5. End-to-End Data Flows

### 5.1 Registration & Authentication Flow
```
User -> Register Form -> POST /api/auth/register -> Hash Password -> Save to DB (100 Credits) -> Issue JWT -> Client Stores Token in localStorage -> Redirect to /dashboard
```

### 5.2 Swap Creation & Acceptance Flow
```
Creator -> New Offer Form -> POST /api/swaps -> Status: "open"
Partner -> Explores Skills -> Propose Swap -> Status: "pending" -> Notification Sent
Creator -> My Swaps -> Accept Proposal -> Status: "accepted" -> Moved to Active Swaps
```

### 5.3 Swap Completion & Credit Settlement Flow
```
Participant -> Click "Mark Completed" -> PATCH /api/swaps/:id/complete
                              │
     ┌────────────────────────┴────────────────────────┐
     ▼                                                 ▼
Teacher Account                                  Student Account
- Credits += 10                                  - Credits -= 10
- CreditTransaction ('EARNED', +10)              - CreditTransaction ('SPENT', -10)
- Notification: Review Ready                     - Notification: Review Ready
```

### 5.4 Leaderboard Aggregation Flow
```
Client -> GET /api/leaderboard?timeframe=weekly -> Controller queries completed Swaps within timeframe -> Aggregates teaching hours & ratings per user -> Assigns dynamic badges -> Returns sorted JSON array -> Client renders Top 3 Podium & Rankings list
```

---

## 6. Directory Structure & Key Files

- `backend/src/app.js`: Central Express app configuration, CORS setup, middleware pipeline, route registration.
- `backend/src/index.js`: Server startup script and MongoDB database connection initializer.
- `frontend/src/App.jsx`: Main router defining public pages, dashboard routes, and route guards (`ProtectedRoute`).
- `frontend/src/dashboard/pages/MySwaps.jsx`: Proposal and active swap session management.
- `frontend/src/dashboard/pages/Credits.jsx`: Credit wallet and transaction log display.
- `frontend/src/dashboard/pages/SSPleaderboard.jsx`: Community mentor leaderboard page.
- `frontend/src/utils/apiFetch.js`: Standardized HTTP client utility.
