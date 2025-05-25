# Bluedit

**Bluedit** is a Community Forum and Q&A platform inspired by Reddit. It allows users to sign up, log in, join communities, and interact by sharing and discussing posts.

---

## 🌐 Live Application

-   **Frontend**: [https://cneblobstorage.z28.web.core.windows.net/](https://cneblobstorage.z28.web.core.windows.net/)
-   **Backend**: [https://cne-functions.azurewebsites.net](https://cne-functions.azurewebsites.net)

---

## 🛠 Tech Stack

-   **Frontend**: TypeScript (React)
-   **Backend**: TypeScript (Azure Functions v3)
-   **Database**: PostgreSQL (hosted on Azure)
-   **Hosting**:
    -   Frontend on Azure Blob Storage
    -   Backend on Azure Functions
-   **CI/CD**: GitHub Actions

---

## 🔐 Features

-   User signup and JWT-based login authentication
-   Post creation and threaded discussion
-   Join and browse community spaces
-   Seamless frontend-backend communication via Azure

---

## 🚀 Deployment

Bluedit uses GitHub Actions for CI/CD.

### Automatic Deployment

Push to the `main` branch to trigger automatic deployment.

### Manual Deployment

You can also manually trigger the GitHub Actions workflow via the Actions tab in the GitHub repo.

---

## 🧪 Running Locally

### Backend

1. Create a `.env` file inside the `functions/` folder with the following:

###

DATABASE_URL=your_postgres_connection_string

###

JWT_SECRET=your_jwt_secret

###

JWT_EXPIRES_HOURS=24

###

2. Then run the backend:

```bash
cd functions
npm install
npm run clean
npm run build
npm run start


```

2. Then run the frontend:

```bash
npm install
npm run build
npm run dev
```
