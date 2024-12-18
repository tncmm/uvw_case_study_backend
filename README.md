### **Tech Stack**
- **Framework**: Node.js (express.js) with TypeScript
- **Database**: MongoDB (with Prisma ORM)
- **Authentication**: JWT-based authentication
- **Others**:
  - REST API for communication
  - Nodemon for development environment

---

### **Project Structure**
```
src/
├── business/        # Handles request/response logic for API routes
├── database/           # Database models and ORM queries
├── domain/             # DTOs and business error classes
├── helper/             # Utility classes like hashing and JWT helpers
├── middleware/         # Middleware for authentication and validation
├── routes/             # API route definitions
├── startup/            # Server initialization          
```

---

### **Key Features**
1. **User Management**
   - User registration and login with email, phone, and password.
   - User roles and statuses (e.g., `USER`, `ADMIN`).
   - Password hashing for security.

2. **Post Management**
   - Create, update, delete, and list posts.
   - Associate posts with authors (users).
   - Tag support for categorizing posts.

3. **Authentication**
   - JWT-based login and protected routes.
   - Middleware ensures authentication and role validation.

4. **Database**
   - Prisma ORM for MongoDB.
   - Relation between `User` and `Post`.

---

### **Setup Instructions**
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up environment variables:
   Create a `.env` file with:
   ```
   JWT_PRIVATE_KEY= UVW_CASE_STUDY_BACKEND_JWT_KEY
    JWT_EXPIREDURATIN_IN_MINUTE=10080
    PORT=3001
    DATABASE_URL="mongodb+srv://tncmmustafa:PyZ6Gi6L.zK-DT8@uvwcasestudy.mmci1.mongodb.net/uvwCaseStudy?retryWrites=true&w=majority&appName=uvwCaseStudy"

   ```
3. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. API Documentation:
   - Base URL: `http://localhost:3001`
   - Example Endpoints:
     - `POST /auth/login` - Login
     - `GET /users/me` - Get user profile
     - `GET /posts` - List posts
     - `POST /posts` - Create a post
