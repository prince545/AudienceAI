# 🚢 AudienceAI Deployment Guide

Because AudienceAI uses **WebSockets (`Socket.IO`)** for real-time interaction, it requires a **persistent Node.js server**. Standard serverless platforms like Vercel (default) will not work for the real-time functionality.

We recommend using a **Platform-as-a-Service (PaaS)** like **Railway** or **Render**, which handles the server infrastructure for you.

---

## 🌩️ Recommended Platform: Railway (Easiest)

1.  **Create an Account**: Sign up at [Railway.app](https://railway.app/).
2.  **Connect Repo**: Connect your GitHub repository.
3.  **Add Database**: Click "Add Service" → "PostgreSQL". Railway will automatically provide a `DATABASE_URL`.
4.  **Configure Environment**: Add the following variables in the "Variables" tab:
    -   `DATABASE_URL`: (Automatically provided by Railway Postgres)
    -   `CLERK_SECRET_KEY`: Your secret key from Clerk Dashboard.
    -   `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your publishable key from Clerk Dashboard.
    -   `GROQ_API_KEY`: Your API key for Llama 3.3 access.
    -   `NODE_ENV`: `production`
5.  **Build & Start Commands**: Railway will detect your `package.json`. Ensure it uses:
    -   **Build Command**: `npm run build`
    -   **Start Command**: `npm run start`

---

## 🌥️ Alternative Platform: Render

1.  **New Web Service**: Create a new Web Service on [Render.com](https://render.com/).
2.  **Environment**: Select `Node`.
3.  **Build Command**: `npm install && npm run build`
4.  **Start Command**: `npm run start`
5.  **Environment Variables**: Add your `.env` variables (Clerk, Database, Groq) in the Render dashboard.

---

## ⚡ Hybrid Deployment (Vercel + Render)

For the best performance, you can deploy the **Frontend to Vercel** and the **Backend to Render**.

### 1. Configure the Render Backend
Deploy your repo to Render as described above. Once live, you will have a URL like `https://audience-ai-backend.onrender.com`.

### 2. Configure the Vercel Frontend
When deploying to Vercel, set these **Environment Variables**:
- **`NEXT_PUBLIC_SOCKET_URL`**: Set this to your **Render URL** (e.g., `https://audience-ai-backend.onrender.com`).
- **`DATABASE_URL`**, **`CLERK_SECRET_KEY`**, etc.: (Must be the same as Render).

### 3. How it Works
- **UI**: Served fast by Vercel’s edge network.
- **API**: Vercel will automatically proxy all `/api/*` calls to your Render backend via the `next.config.ts` rewrites.
- **Real-time**: The `useSocket` hook will connect directly to the Render URL for live updates.

---

## 🛠 Manual Deployment (VPS / Docker)

If you are using a VPS (DigitalOcean, AWS), you can run the app using **PM2**:

1.  **Build the app**: `npm run build`
2.  **Start with PM2**:
    ```bash
    pm2 start "npm run start" --name audience-ai
    ```

---

## 📝 Important Notes

-   **Database Migration**: On your first deploy, you must run the database migration to set up the tables:
    ```bash
    npx prisma db push
    ```
    (Most PaaS allow you to add this to your build command: `npx prisma db push && next build`)
-   **WebSocket Port**: The app is configured to listen on `process.env.PORT`. Most platforms will assign this automatically.

---

<div align="center">
  <p>Need help? Open an issue or contact the developer.</p>
</div>
