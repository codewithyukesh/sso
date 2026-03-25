# 🔐 SSO — Single Sign-On Authentication System

> A Single Sign-On (SSO) system that allows users to authenticate once and access multiple applications seamlessly — built during internship at IDEA BREED IT SOLUTION PVT. LTD.

🔗 **Repo:** [github.com/codewithyukesh/sso](https://github.com/codewithyukesh/sso)

---

## 🧩 What It Does

SSO (Single Sign-On) eliminates the need for users to log in separately to each application. Authenticate once — access everywhere. This system implements a centralized authentication server that issues tokens used across connected client applications.

---

## ✨ Features

- 🔐 **Centralized Authentication** — One login for multiple apps
- 🎫 **Token-based Auth** — JWT issued by the auth server
- 👤 **User Registration & Login** — Secure credential management
- 🔄 **Session Management** — Persistent sessions across services
- 🚪 **Single Logout** — Log out from all connected apps at once
- 🛡️ **Protected Routes** — Middleware-level route protection on client apps

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js |
| Backend | Node.js + Express.js |
| Auth | JWT (JSON Web Tokens) |
| Database | MongoDB |
| Styling | CSS3 |

---

## 📁 Project Structure

```
sso/
├── auth-server/        # Central authentication server
│   ├── routes/         # Auth routes (login, register, token)
│   ├── models/         # User schema
│   ├── middleware/     # Token validation
│   └── controllers/    # Auth logic
├── client-app/         # Example client consuming SSO
│   ├── src/
│   │   ├── components/ # UI components
│   │   └── pages/      # Protected and public pages
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/codewithyukesh/sso.git
cd sso
```

**Start Auth Server**
```bash
cd auth-server
npm install
npm run dev
```

**Start Client App**
```bash
cd client-app
npm install
npm start
```

### Environment Setup

Create `.env` in `/auth-server`:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
```

---

## 🔄 How SSO Flow Works

```
User visits Client App
        ↓
Not authenticated → Redirect to Auth Server
        ↓
User logs in → Auth Server issues JWT
        ↓
Token returned to Client App
        ↓
Client validates token → User is logged in ✅
```

---

## 🎯 What I Learned

- Designing centralized authentication architecture
- JWT token issuance, validation, and refresh strategies
- Implementing protected routes in React with auth context
- Cross-application session management
- Industry workflow at a professional software company

---

## 🏢 Built During

**Internship @ IDEA BREED IT SOLUTION PVT. LTD., Kathmandu**
*(Dec 2023 – Mar 2024)*

---

## 👨‍💻 Developer

**Yukesh Chaudhary** — Full Stack Developer | System Analyst at KMC, Nepal

🌐 [yukesh.info.np](https://www.yukesh.info.np) · 💼 [LinkedIn](https://www.linkedin.com/in/yukeshc) · 📧 Link2yukesh@gmail.com

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
