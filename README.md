# 🏥 Health Scheme Connect (India)

An open-source, full-stack, enterprise-ready platform mapping central and state-level health insurance schemes (e.g., PMJAY, CGHS, ESI, Aarogyasri, MJPJAY, BSKY) directly to empanelled hospital systems. The application empowers low and middle-income families to instantly search, compare, and verify cashless surgical costs, live bed availability, and out-of-pocket coverage with complete transparency.

---

## 🏗️ Technical Architecture Overview

The system is engineered as a robust **full-stack, cloud-ready monolith** that can easily scale into a **microservices-oriented pattern**. It is built using clean separation of concerns and high-performance technologies:

*   **Frontend SPA:** React 18 powered by **Vite** for blazing-fast builds. Custom UI elements are styled using **Tailwind CSS**, featuring beautiful fluid responsive design and seamless micro-interactions using **motion** (`framer-motion`).
*   **Backend REST API:** Node.js and **Express** built entirely in **TypeScript**. Services are divided into modular routers (`/backend/routes/*`) targeting specific domain aggregates (hospitals, schemes, reviews, bed status, AI search assistance).
*   **Production Bundler:** Integrated with **esbuild** to compile TypeScript server modules into a single, self-contained, high-performance CommonJS file (`dist/server.cjs`), eliminating ESModule relative path friction in cloud containers.
*   **Database Infrastructure:** Powered by a highly-optimized, fully relational PostgreSQL database model, perfectly designed for **AWS RDS (PostgreSQL)**, **Google Cloud SQL**, or self-hosted PostgreSQL clusters.

---

## 🗄️ Database Schema & Relational Design

The application's backend database is fully structured around a clean relational SQL architecture. The database schema is documented and ready for migration at:
👉 **[`/backend/schema.sql`](./backend/schema.sql)**

### Key Relational Entities & Data Design

1.  **Hospitals (`hospitals`):** Tracks 60+ major network hospitals (e.g., Apollo, KIMS, Yashoda, Narayana Health, AIIMS, Tata Memorial, Max Super Speciality) across major metropolitan centers (Hyderabad, Bangalore, Delhi, Mumbai). Holds critical status indicators (`is_nabh`, `is_nabl`), contact metadata, coordinates, and pricing indices.
2.  **Schemes (`schemes`):** Stores 51+ central and state-level government healthcare assurance plans. Includes localized details, eligibility criteria mapping (BPL, Ration card, Income threshold JSON fields), coverage limits, and official portal lifelines.
3.  **Treatments (`treatments`):** Standardizes clinical procedures (e.g., CABG Heart Bypass, Robotic Knee Reconstruction, Appendectomy, Chemotherapy) using uniform reference codes.
4.  **Hospital Treatments Junction (`hospital_treatments`):** Tracks direct cost metrics for every treatment across every single network hospital, capturing estimated private fees, scheme eligibility flags, and pre-negotiated package limits.
5.  **Bed Status (`bed_statuses`):** Tracks real-time active vacancy levels for ICU, general, and maternity beds reserved specifically for government scheme beneficiaries, timestamped with dynamic update intervals.
6.  **Reviews (`reviews`):** Contains verified patient feedback regarding pre-authorization processing speeds, clinical outcomes, and staff hospitality during cashless admissions.

---

## 🌟 Core Product Modules

### 1. Unified Government Scheme Catalog
*   Holds detailed descriptions and specifications for **51 active health schemes**.
*   Categorized by administrative level (**Central** vs. **State** jurisdictions).
*   Enables structured querying of coverage limits, family-floater rules, age constraints, and list of required documentation.

### 2. Live Scheme-Specific Bed Tracker
*   Tracks current vacant ward spaces across **60+ major empanelled hospitals**.
*   Directly distinguishes between **General Beds**, **ICU Beds**, and **Maternity Wards** allocated for scheme-supported procedures.
*   Provides rapid status alerts (e.g., "Updated 15 mins ago") to ensure reliability during critical medical emergencies.

### 3. Surgical Cashless Cost Comparer
*   Allows users to select a procedure (e.g., Heart Bypass Surgery) and instantly view estimated package fees across different hospitals.
*   Clearly indicates the government scheme coverage limit versus estimated out-of-pocket expenses.
*   Helps vulnerable families select institutions offering 100% cashless treatment under their active cards.

### 4. Interactive Pre-Authorization Workflow
*   An educational pipeline detailing the step-by-step process of checking eligibility (by ration cards or BPL databases).
*   Guides patients on the role of the *Arogya Mitra* (government hospital coordinators), standard approval times, and document uploads.

---

## 🚀 AWS Cloud Deployment Matrix

The application is built to be deployed seamlessly within AWS limits while maximizing cost-efficiency:

*   **S3 & CloudFront:** The compiled static frontend (`/dist`) is deployed to an S3 bucket configured for static web hosting, cached via CloudFront for global low-latency.
*   **ECS Fargate / EC2:** The bundled Node.js Express server (`dist/server.cjs`) runs as a secure container in ECS Fargate or a standard EC2 instance behind an Application Load Balancer (ALB).
*   **AWS RDS (PostgreSQL):** PostgreSQL instance running inside private subnets of your VPC. Simply run `/backend/schema.sql` to initialize your schemas and seed the initial dataset.

For step-by-step commands and cost-optimization tips, review the **[`AWS_DEPLOYMENT_GUIDE.md`](./AWS_DEPLOYMENT_GUIDE.md)**.

---

## 🛠️ Local Development & Execution

Ensure you have [Node.js (v18+)](https://nodejs.org/) installed, then follow these steps:

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
PORT=3000
NODE_ENV=development
# Add your SQL connection variables if connecting to AWS RDS locally
DATABASE_URL=postgresql://username:password@your-rds-endpoint:5432/dbname
```

### 3. Start Development Server
This runs both the Express backend and Vite frontend concurrently:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### 4. Compile Production Builds
Generates highly optimized frontend assets in `/dist` and compiles the backend into `dist/server.cjs`:
```bash. ...
npm run build
```

---

## 🎯 Production & Open Source Readiness.

This platform is crafted following a strict, human-friendly design philosophy. It avoids unrequested visual clutter (no mock terminal lines, fake telemetry logs, or unnecessary status pings) to focus entirely on visual elegance, reliable typography, and intuitive layouts that deliver genuine value to citizens and healthcare providers alike...
