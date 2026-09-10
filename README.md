# Markopolo 🌌
### Authentic Insights & Professional Discovery Circle

Markopolo is a high-fidelity, community-driven discovery platform designed to surface authentic industry insights, verified reviews, and hidden gems through a modern full-stack web architecture.

---

## 🏛️ System Architecture

```text
                       ┌─────────────────────────────────────────┐
                       │             Client Browser              │
                       └────────────────────┬────────────────────┘
                                            │
                       ┌────────────────────▼────────────────────┐
                       │       Frontend (React 19 + Vite)        │
                       │   • Tailwind CSS Design System          │
                       │   • Redux Toolkit State Management      │
                       │   • 3D Cover Flow & Journey Timeline    │
                       │   • Marko AI Assistant Floating Suite   │
                       │   • Port: 5173                          │
                       └────────────────────┬────────────────────┘
                                            │  HTTPS / REST / Cookies
                       ┌────────────────────▼────────────────────┐
                       │       Backend API (Express 5 / Node)    │
                       │   • Modular Architecture (Auth, Reviews)│
                       │   • JWT Rotation & Secure Cookies       │
                       │   • Zod Validation & Pino Logging       │
                       │   • Swagger UI: /api-docs               │
                       │   • Port: 5000                          │
                       └─────────────┬───────────────────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 │                                       │
      ┌──────────▼──────────┐                 ┌──────────▼──────────┐
      │   MongoDB (Atlas)   │                 │     Cloudinary      │
      │   • Document Store  │                 │  • Media Streaming  │
      │   • Mongoose Schemas│                 │  • Content Hashing  │
      └─────────────────────┘                 └─────────────────────┘
```

---

## 📂 Repository Structure

```text
Markopolo/
├── backend/                  # Node.js / Express REST API & Database Models
│   ├── src/
│   │   ├── config/           # Database, Cloudinary & App configurations
│   │   ├── docs/             # Swagger/OpenAPI documentation
│   │   ├── loaders/          # Express route loaders & app initialization
│   │   ├── modules/          # Feature domains (auth, reviews, users, notifications)
│   │   ├── shared/           # Common middleware, error classes, utilities
│   │   ├── app.js            # Express app assembly & global middleware
│   │   └── server.js         # HTTP server entry point & database connection
│   ├── .env.example          # Sample environment variables for backend
│   ├── package.json          # Backend dependencies & npm scripts
│   └── README.md             # Backend-specific documentation
│
├── frontend/                 # React 19 / Vite Single-Page Application
│   ├── src/
│   │   ├── components/       # Reusable UI components (Chatbot, ScrollToTop, etc.)
│   │   ├── features/         # Feature views (Landing, How It Works, Auth, Categories)
│   │   ├── routes/           # React Router route definitions & layouts
│   │   └── store/            # Redux Toolkit store slices & hooks
│   ├── index.html            # HTML entry point with Content Security Policy
│   ├── package.json          # Frontend dependencies & build scripts
│   └── README.md             # Frontend-specific documentation
│
└── README.md                 # Global project overview & workspace guide
```

---

## ✨ Features & Capabilities

### 🎨 Frontend Highlights
- **3D Cover Flow Carousel**: Smooth, mathematically-seamless 3D carousel for verified community testimonials.
- **Interactive Journey Timeline**: Guided "How It Works" visual exploration line with precision vertical anchoring.
- **Marko AI Assistant Suite**: Floating action interface integrating AI assistance with quick navigation.
- **Production Security Posture**: Hardened Content Security Policy (CSP) mitigating XSS and injection vectors.
- **Modern Responsive Design**: Tailwind CSS utility design system with custom brand color palette.

### 🛡️ Backend Highlights
- **Modular Feature Architecture**: Domain-driven folder layout separating `auth`, `users`, `reviews`, and `notifications`.
- **Advanced Authentication**:
  - Refresh Token Rotation with reuse detection and breach invalidation.
  - HttpOnly, Secure, and SameSite cookie transport for token safety.
  - Bcrypt password hashing and role-based access control.
- **Zero-Disk Media Streaming**: Cloudinary integration for streaming uploads with MD5 deduplication.
- **Comprehensive API Docs**: Interactive Swagger/OpenAPI UI hosted at `/api-docs`.
- **Production Observability**: High-throughput structured logging using Pino and request tracing.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Redux Toolkit, React Router v7, Lucide React, AOS |
| **Backend** | Node.js (ESM), Express 5, Mongoose, Zod, Pino, Helmet, CORS, Swagger UI |
| **Database** | MongoDB (Atlas / Community) |
| **Storage** | Cloudinary Media Storage |

---

## 🚀 Quick Start

### 1. Prerequisites
- **Node.js**: v18.0 or higher
- **npm**: v9.0 or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas cluster connection URI
- **Cloudinary Account**: Cloud name, API key, and API secret for media uploads

---

### 2. Setup Backend

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Configure the following keys in `backend/.env`:
   - `PORT=5000`
   - `NODE_ENV=development`
   - `MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/markopolo`
   - `JWT_SECRET=your_super_secret_jwt_key`
   - `JWT_REFRESH_SECRET=your_super_secret_refresh_key`
   - `CLOUDINARY_CLOUD_NAME=your_cloud_name`
   - `CLOUDINARY_API_KEY=your_api_key`
   - `CLOUDINARY_API_SECRET=your_api_secret`
   - `FRONTEND_URL=http://localhost:5173`

4. Start the backend development server:
   ```bash
   npm run dev
   ```
   The backend API will run at `http://localhost:5000`.  
   Interactive API documentation will be available at [http://localhost:5000/api-docs](http://localhost:5000/api-docs).

---

### 3. Setup Frontend

1. In a new terminal, navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend application will be live at [http://localhost:5173](http://localhost:5173).

---

## 📡 API Overview

| Module | Endpoint | Method | Description | Access |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `/api/auth/register` | `POST` | Register a new user | Public |
| **Auth** | `/api/auth/login` | `POST` | Authenticate user & set secure cookies | Public |
| **Auth** | `/api/auth/refresh` | `POST` | Rotate access & refresh tokens | Public |
| **Reviews** | `/api/reviews` | `POST` | Create a review submission | Protected |
| **Reviews** | `/api/reviews/upload` | `POST` | Upload review attachments to Cloudinary | Protected |
| **Users** | `/api/users/me` | `GET` | Retrieve authenticated user profile | Protected |
| **Admin** | `/api/users/:id/suspend` | `PATCH` | Suspend user account | Admin |

For the interactive schema explorer, visit `/api-docs` on the backend server.

---

## 🔒 Security Best Practices

- **Strict Content Security Policy**: Configured in frontend HTML to prevent unauthorized script evaluation and clickjacking.
- **Secure Token Handling**: Sensitive auth tokens are stored in `HttpOnly`, `SameSite` cookies to neutralize XSS theft.
- **Input Sanitization & Validation**: Every incoming request payload is strictly validated via Zod schemas before reaching business logic.
- **Rate Limiting**: Protects authentication and upload routes against brute-force and credential-stuffing attacks.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](file:///d:/Markopolo/LICENSE) file for full details.

Copyright © 2026 Markopolo Consumer Advocacy Platform.
