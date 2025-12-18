---
description: How to deploy the School Management System to Vercel
---

# Deployment Guide (Docker to Cloud)

### 1. Database Setup (Neon)
1. Go to [Neon.tech](https://neon.tech) and create a PostgreSQL instance.
2. Copy the **Connection String**.

### 2. Vercel Configuration
1. Connect your GitHub repository to Vercel.
2. Add Environment Variables:
   - `DATABASE_URL`: [Your Neon String]
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: [From Clerk]
   - `CLERK_SECRET_KEY`: [From Clerk]
3. Set Build Command: `npx prisma generate && npx prisma db push && next build`

### 3. Clerk Production
1. In Clerk Dashboard, switch to Production mode.
2. Set the authorized domain to your Vercel URL.

### 4. Database Seeding
To populate the cloud DB with initial data, run this locally after updating your .env with the Neon URL:
`npx prisma db seed`
