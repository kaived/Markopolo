# Markopolo Backend 🚀

The scalable, secure, and modular backend API for the Markopolo application. Built with **Node.js**, **Express**, and **MongoDB**.

## ✨ Key Features

- **Modular Architecture**: Feature-based folder structure (`Auth`, `Users`, `Reviews`, `Notifications`) for clean scalability.
- **Advanced Security**:
    - **Refresh Token Rotation**: Automatic token rotation with reuse detection and global revocation on breach.
    - **Secure Cookies**: HttpOnly, Secure, and SameSite cookies for sensitive tokens.
    - **Global Rate Limiting**: Protection against brute-force and DDoS attacks.
    - **Helmet**: Hardened HTTP security headers.
    - **Input Validation**: Strict request schema validation using **Zod**.
- **Media Management**:
    - **Cloudinary Integration**: Direct-to-cloud media streaming (Zero-disk) for images, videos, and documents.
    - **Content Hashing**: MD5-based file hashing to prevent duplicate uploads and optimize storage.
    - **User-Specific Organization**: Automatic folder generation per user in the cloud.
- **Robust Error Handling**: Standardized global error handler for Zod, Mongoose, and Cloudinary errors.
- **Structured Logging**: High-performance logging with **Pino** and request tracing.
- **Auto-Generated Docs**: Interactive **Swagger/OpenAPI** documentation.

## 🛠️ Tech Stack

- **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
- **Framework**: [Express](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Atlas)
- **ODM**: [Mongoose](https://mongoosejs.com/)
- **Auth**: JWT & Bcrypt
- **Cloud Storage**: [Cloudinary](https://cloudinary.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Logging**: [Pino](https://getpino.io/)
- **Documentation**: [Swagger UI](https://swagger.io/)

## 📂 Project Structure

```text
src/
├── config/         # App, Database, Cloudinary & Redis config
├── docs/           # Swagger UI setup & global docs
├── loaders/        # Initialization (Express, Module Routes)
├── modules/        # Feature Modules (Model-Service-Controller)
│   ├── auth/       # Registration, Login, Token Rotation
│   ├── reviews/    # Review creation, Moderation, Media Uploads
│   ├── users/      # Profile management, Role-based access
│   └── notifications/ # User activity notifications
├── shared/         # Common Middleware, Error Classes, Utilities
├── app.js          # App assembly & Global Middleware
└── server.js       # Entry point & Service connection
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas (or local instance)
- Cloudinary Account

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/markopolo-backend.git
   cd Markopolo-Backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Copy the example environment file and fill in your keys:
   ```bash
   cp .env.example .env
   ```
   *Required keys include `MONGO_URI`, `JWT_SECRET`, and `CLOUDINARY_*`.*

### Running the App

- **Development Mode** (Hot-reload):
  ```bash
  npm run dev
  ```

- **Production Mode**:
  ```bash
  npm start
  ```

*The server will start at `http://localhost:5000` with live service connection status.*

## 📚 API Documentation

Interactive documentation is available at:
👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

## 🛡️ API Endpoints Summary

| Module | Endpoint | Method | Description |
| :--- | :--- | :--- | :--- |
| **Auth** | `/api/auth/register` | `POST` | Create a new user account |
| **Auth** | `/api/auth/login` | `POST` | Login & get HttpOnly cookies |
| **Auth** | `/api/auth/refresh` | `POST` | Rotate access/refresh tokens |
| **Reviews**| `/api/reviews` | `POST` | Post a review (Protected) |
| **Reviews**| `/api/reviews/upload`| `POST` | Upload media to Cloudinary |
| **Users**  | `/api/users/me` | `GET` | Get own profile |
| **Admin**  | `/api/users/:id/suspend`| `PATCH`| Suspend a user (Admin only) |

---
*Created with ❤️ for the Markopolo Community.*
