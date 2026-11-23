# 🏥 Health Scheme Connect — Complete Project Information

> **Last Updated:** October 2026 | **Version:** 1.0.0-production

---

## 📌 Table of Contents

1. [What Is This Project?](#1-what-is-this-project)
2. [The Problem Being Solved](#2-the-problem-being-solved)
3. [Architecture Overview (3-Tier)](#3-architecture-overview-3-tier)
4. [Tech Stack](#4-tech-stack)
5. [What Has Been Fully Implemented](#5-what-has-been-fully-implemented)
   - [Tier 1 — Frontend SPA](#tier-1--frontend-spa-react--vite)
   - [Tier 2 — Microservices Backend](#tier-2--microservices-backend-nodejs--express)
   - [Tier 3 — Database Layer](#tier-3--database-layer-postgresql)
   - [Infrastructure — AWS + Terraform](#infrastructure--aws--terraform)
   - [DevOps — Docker](#devops--docker)
6. [What Still Needs to Be Implemented](#6-what-still-needs-to-be-implemented)
7. [Running the Project Locally](#7-running-the-project-locally)
8. [Environment Variables](#8-environment-variables)
9. [API Reference](#9-api-reference)
10. [File-by-File Directory Guide](#10-file-by-file-directory-guide)

---

## 1. What Is This Project?

**Health Scheme Connect** is a full-stack, cloud-native web platform that helps Indian citizens — especially BPL (Below Poverty Line) families — navigate, discover, and utilize government health insurance schemes such as:

- **Ayushman Bharat PMJAY** — Up to ₹5 Lakhs / family / year (Central)
- **Aarogyasri** — Telangana & Andhra Pradesh State Scheme
- **CGHS** — Central Government Health Scheme for employees
- **ESI** — Employee State Insurance
- And 47+ more Central & State schemes

The platform lets patients:
- Find empanelled hospitals nearby that accept their health card
- Check **real-time ICU & bed availability** before travelling
- Compare **surgical package costs** across hospitals
- Understand claim and pre-authorization process step-by-step
- Chat with **"Arogya" — an AI assistant** powered by Google Gemini

---

## 2. The Problem Being Solved

Despite India's massive government health coverage programs, millions fail to benefit due to 3 core issues:

| Problem | Description |
|---|---|
| 🏥 **Hospital Opacity** | Patients don't know which private hospitals accept their specific scheme card |
| 💰 **Hidden Costs** | Unexpected out-of-pocket bills because surgery may not be covered by the scheme package |
| 🛏️ **Emergency Bed Blindness** | Families waste golden hours driving to hospitals with zero ICU vacancies |

**Health Scheme Connect** solves all 3 in one unified platform.

---

## 3. Architecture Overview (3-Tier)

The application is deliberately built as a **3-Tier Architecture** — a standard enterprise cloud pattern:

```
┌──────────────────────────────────────────────────────┐
│  TIER 1 — PRESENTATION (React SPA : port 3000)       │
│  React 19 + Vite + Tailwind CSS + Lucide Icons       │
│  Pages: Home, Search, Hospital Detail, Compare,      │
│         Scheme Explorer, Login, Signup               │
└───────────────────┬──────────────────────────────────┘
                    │  HTTP via Vite Proxy → /api/*
┌───────────────────▼──────────────────────────────────┐
│  TIER 2 — APPLICATION (Microservices : port 8000)    │
│                                                      │
│  ┌─────────┐  Gateway (8000) → Proxy routes to:      │
│  │ Gateway │──► Hospital Service  (5001)             │
│  │ (8000)  │──► Scheme Service   (5002)              │
│  └─────────┘──► Review Service   (5003)              │
│               ──► Auth Service    (5004)              │
│               ──► AI Service      (5005)              │
└───────────────────┬──────────────────────────────────┘
                    │  PostgreSQL Driver (pg)
┌───────────────────▼──────────────────────────────────┐
│  TIER 3 — DATA (PostgreSQL : port 5432)              │
│                                                      │
│  Tables: users, hospitals, schemes, treatments,      │
│          hospital_treatments, reviews, bed_statuses, │
│          empanelments                                │
└──────────────────────────────────────────────────────┘
```

> **Why 3-Tier?** It's the industry standard for cloud apps. Each tier can scale, deploy, and fail independently. On AWS, Tier 1 can go to S3/CloudFront, Tier 2 to EC2/ECS, and Tier 3 to RDS — each with separate auto-scaling and security policies.

---

## 4. Tech Stack

| Layer | Technology | Why Chosen |
|---|---|---|
| **Frontend** | React 19, Vite 6, TypeScript | Component-based SPA, fast HMR, modern ecosystem |
| **Styling** | Tailwind CSS 3, Lucide React icons | Utility-first, dark mode, responsive out of the box |
| **Backend** | Node.js 20 + Express 5 + TypeScript | Async-first, typed, widely understood |
| **Runtime** | `tsx` (TypeScript execute) | Runs `.ts` files directly without compile step |
| **Database** | PostgreSQL 16 | Relational, supports arrays/JSONB, ACID compliance |
| **DB Driver** | `pg` (node-postgres) | Production-grade, connection pooling |
| **AI** | Google Gemini 1.5 Flash (`@google/genai`) | Multimodal, fast, free-tier available |
| **Container** | Docker + Docker Compose | Reproducible local + cloud environment |
| **IaC** | Terraform (AWS Provider v5) | Version-controlled cloud infra |
| **Cloud** | AWS (EC2, RDS, ALB, S3, Route53, CloudWatch, SNS, IAM) | Production-grade, widely deployed |

---

## 5. What Has Been Fully Implemented

### Tier 1 — Frontend SPA (React + Vite)

#### ✅ Pages

| Page | File | What It Does |
|---|---|---|
| **Home Page** | `pages/HomePage.tsx` | Hero slider, search widget (city + scheme + specialty), quick-access bento cards, speciality grid, schemes catalogue strip, CTA section |
| **Search Results** | `pages/SearchResultsPage.tsx` | Filters & displays hospitals from API; shows bed availability badges |
| **Hospital Detail** | `pages/HospitalDetailPage.tsx` | Full hospital profile — beds, treatments/costs, reviews, schemes, location |
| **Scheme Explorer** | `pages/SchemeExplorerPage.tsx` | Lists all 51+ schemes with search filter; shows coverage, eligibility, helpline |
| **Compare Page** | `pages/ComparePage.tsx` | Side-by-side scheme-vs-scheme OR hospital-vs-hospital comparison tool |
| **Login Page** | `pages/LoginPage.tsx` | Email/password login form connected to Auth Service API |
| **Signup Page** | `pages/SignupPage.tsx` | User registration form connected to Auth Service API |

#### ✅ Components

| Component | File | Purpose |
|---|---|---|
| **Header** | `components/Header.tsx` | Sticky nav with links, language switcher, dark mode toggle, user avatar/logout |
| **Chatbot** | `components/Chatbot.tsx` | Floating AI chat bubble — "Arogya"; requires user's Gemini API key at runtime |
| **HospitalCard** | `components/HospitalCard.tsx` | Card preview for hospital in search results |
| **SchemeCard** | `components/SchemeCard.tsx` | Card for scheme listing with coverage & eligibility |
| **ReviewCard** | `components/ReviewCard.tsx` | Patient review display with star rating |
| **HospitalSidebar** | `components/HospitalSidebar.tsx` | Sidebar/detail panel for selected hospital |
| **BedStatusTile** | `components/BedStatusTile.tsx` | Live bed availability display (ICU, General, Maternity) |
| **Icons** | `components/icons.tsx` | Custom SVG icon wrappers (ExternalLink, Star, Bed, etc.) |

#### ✅ State & Context

| Context | File | What It Manages |
|---|---|---|
| **LanguageContext** | `contexts/LanguageContext.tsx` | Global i18n — English, Hindi, Telugu, Tamil; persists to localStorage |
| **AuthContext** | `contexts/AuthContext.tsx` | User login state, token, login/signup/logout/loginAsGuest methods |

#### ✅ Frontend Services (API Clients)

| Service | File | Calls |
|---|---|---|
| **apiService** | `services/apiService.ts` | `/api/hospitals`, `/api/schemes`, `/api/reviews`, `/api/beds`, `/api/treatments` |
| **authService** | `services/authService.ts` | `/api/auth/login`, `/api/auth/signup`; manages `localStorage` token |
| **geminiService** | `services/geminiService.ts` | `POST /api/ai/chat` — forwards conversation history + API key to backend |

#### ✅ Data Layer (Frontend)

| File | Content |
|---|---|
| `data/mockData.ts` | Complete mock data for 51+ schemes and 60+ hospitals (used as DB seed source) |
| `data/translations.ts` | All 4 languages (en, hi, te, ta) with 100+ translation keys |
| `data/imageAssets.ts` | Centralized image URL constants (hero slides, hospital photos) |

#### ✅ Features Implemented in Frontend

- **Dark mode** with localStorage persistence and system preference detection
- **Multi-language** support (English, Hindi, Telugu, Tamil) with instant switching
- **Client-side SPA routing** — no URL changes, single-page app (no React Router; uses state machine)
- **Responsive design** — mobile-first Tailwind CSS grid
- **Auto-slideshow hero** with smooth fade transitions every 8 seconds
- **AI Chatbot ("Arogya")** with API key gate, suggested prompts, conversation history, typing indicator
- **Scheme comparison** — 2 schemes side-by-side with coverage, eligibility, website link
- **Hospital comparison** — 2 hospitals from same city side-by-side with ratings, fees, schemes
- **Live bed status tiles** — color-coded ICU/General/Maternity vacancy badges

---

### Tier 2 — Microservices Backend (Node.js + Express)

The backend uses a **microservices pattern** where each domain has its own isolated Express server. An API Gateway aggregates all traffic.

#### ✅ Microservices

| Service | Port | File | Endpoints |
|---|---|---|---|
| **API Gateway** | 8000 | `backend/services/gateway/server.ts` | Proxies all `/api/*` routes; aggregated health check |
| **Hospital Service** | 5001 | `backend/services/hospital-service/server.ts` | `GET /hospitals`, `GET /hospitals/:id`, `GET /hospitals/:id/beds`, `GET /hospitals/:id/treatments` |
| **Scheme Service** | 5002 | `backend/services/scheme-service/server.ts` | `GET /schemes`, `GET /schemes/:id`, `GET /schemes/:id/hospitals` |
| **Review Service** | 5003 | `backend/services/review-service/server.ts` | `GET /reviews/:hospitalId`, `POST /reviews` |
| **Auth Service** | 5004 | `backend/services/auth-service/server.ts` | `POST /auth/login`, `POST /auth/signup` |
| **AI Service** | 5005 | `backend/services/ai-service/server.ts` | `POST /ai/chat` |

#### ✅ What Each Service Does

**Hospital Service (`5001`)**
- Queries `hospitals` + `bed_statuses` + `hospital_treatments` tables
- Filters hospitals by `city` and `schemeCode` (via `$1 = ANY(h.schemes_accepted)`)
- Returns formatted typed objects with bed counts as integers, ratings as floats
- Supports detailed view per hospital ID including treatments with costs

**Scheme Service (`5002`)**
- Returns all schemes or filtered by `government_level` or `state`
- `GET /schemes/:id/hospitals` — finds all hospitals with a scheme code in their `schemes_accepted[]` array, optionally filtered by city

**Review Service (`5003`)**
- Reads reviews ordered by `created_at DESC` per hospital
- On new review `POST`: inserts row, then recalculates hospital's `rating` (AVG) and `review_count` in a single UPDATE

**Auth Service (`5004`)**
- `POST /auth/login`: looks up user by email; if not found, **auto-provisions** a new user (demo-friendly)
- `POST /auth/signup`: validates uniqueness by email before insert
- Returns a mock JWT token string (format: `jwt_token_{userId}_{timestamp}`)

> ⚠️ **Note:** No real JWT cryptography — token is a plain string. Real JWT with `jsonwebtoken` library is needed for production.

**AI Service (`5005`)**
- Accepts Gemini API key from the client at runtime (user pastes their own key)
- Uses `@google/genai` SDK with model `gemini-1.5-flash`
- System prompt: "You are 'Arogya', an expert AI advisor for Health Scheme Connect..."
- Fallback rule-based responses when no API key — queries DB directly for scheme/bed info

**API Gateway (`8000`)**
- Proxies `/api/hospitals` → `:5001`
- Proxies `/api/schemes` → `:5002`
- Proxies `/api/reviews` → `:5003`
- Proxies `/api/auth` → `:5004`
- Proxies `/api/ai` → `:5005`
- Aggregated health check at `GET /api/health` — pings all 5 services and returns combined status

#### ✅ Startup Orchestrator

`scripts/start-all.ts` — single bootstrap script that:
1. Seeds the PostgreSQL DB (schema + data)
2. Starts all 5 microservices
3. Starts the Vite dev server on port 3000 (or next available)
4. Registers graceful SIGINT/SIGTERM shutdown for all servers

---

### Tier 3 — Database Layer (PostgreSQL)

#### ✅ Schema (`backend/schema.sql`)

9 tables implemented with proper relational design:

| Table | Purpose | Key Columns |
|---|---|---|
| `users` | User accounts | id, name, email, role (`user`/`admin`), avatar |
| `hospitals` | Hospital master data | id, name, city, state, specialties[], schemes_accepted[], is_nabh, rating |
| `schemes` | Government health schemes | id, code, name, coverage_limit, government_level, eligibility, claim_process[], documents_required[] |
| `treatments` | Medical procedures catalog | id, code, name |
| `hospital_treatments` | Surgical cost per hospital | hospital_id, treatment_id, estimated_cost, scheme_covered, scheme_coverage_limit |
| `reviews` | Patient reviews | id, hospital_id, rating (1-5), title, body, verified |
| `bed_statuses` | Real-time bed counts | hospital_id (PK), available_icu, available_general, available_maternity, last_updated |
| `empanelments` | Hospital ↔ Scheme mapping | hospital_id, scheme_id (composite PK) |

#### ✅ Database Features
- **UUID extension** enabled
- **Indexes** on `hospitals.city` and `schemes.government_level` for fast filtering
- **Foreign keys** with `ON DELETE CASCADE` for referential integrity
- **JSONB columns** for `eligibility_criteria`, `name_local`, `description_local` (multilingual)
- **PostgreSQL Arrays** for `specialties[]`, `facilities[]`, `schemes_accepted[]`
- **Connection pooling** via `pg.Pool` with max 20 connections, 5-second timeout, 5-retry logic

#### ✅ Seed Data (`backend/database/seed.ts`)

Auto-seeds on first boot from `backend/data/db.ts`:
- 2 demo users (admin + patient)
- 51+ government health schemes
- 60+ hospitals across Hyderabad, Bangalore, Delhi, Mumbai
- Treatments catalog with cost mapping per hospital
- Bed status per hospital
- Patient reviews per hospital

---

### Infrastructure — AWS + Terraform

All cloud infrastructure is **code-defined** in `aws-terraform/` using Terraform:

#### ✅ Networking (`vpc.tf`)
- Custom VPC with CIDR `10.0.0.0/16`
- **2 Public Subnets** (for ALB) across 2 Availability Zones
- **2 Private Subnets** (for EC2 + RDS) across 2 AZs
- Internet Gateway for public subnets
- NAT Gateway (Elastic IP) for private subnet outbound traffic
- Public and Private Route Tables with associations

#### ✅ Compute (`ec2.tf`)
- Single EC2 instance (`t3.micro`) — Amazon Linux 2023
- Placed in **private subnet** for security
- **User Data script** auto-installs Docker, Docker Compose, pulls app from S3, starts containers
- Attached to ALB Target Groups (port 3000 for frontend, 8000 for API)

#### ✅ Database (`rds.tf`)
- AWS RDS PostgreSQL 16 (`db.t4g.micro`)
- 20 GB `gp3` storage
- Placed in **private subnets** — not publicly accessible
- DB Subnet Group spanning 2 AZs

#### ✅ Load Balancer (`loadbalancer.tf`)
- Application Load Balancer (ALB) in public subnets
- **Dual target groups**: frontend (3000) and API gateway (8000)
- Listener rule: `/api/*` → API target group; all others → frontend target group

#### ✅ DNS (`route53.tf`)
- Route 53 Hosted Zone for domain `healthschemeconnect.online`
- A-record alias pointing `healthschemeconnect.online` → ALB
- A-record alias for `www.healthschemeconnect.online` → ALB
- Outputs: ALB DNS name, application URL, AWS nameservers (to configure in Hostinger)

#### ✅ Security (`security-groups.tf`)
- **ALB SG**: inbound 80/443 from internet
- **App SG**: inbound 3000, 8000 from ALB SG only
- **RDS SG**: inbound 5432 from App SG only

#### ✅ IAM (`iam.tf`)
- EC2 IAM Role with least-privilege policies
- CloudWatch Agent policy attached
- Custom S3 policy (PutObject, GetObject, ListBucket) for app bucket
- Instance Profile attached to EC2

#### ✅ Monitoring & Alerts (`s3-sns-cloudwatch.tf`)
- S3 Bucket (private, force-destroy) for app assets/backups
- **SNS Topic** `health-scheme-alerts` with email subscription
- **CloudWatch Log Group** `/aws/health-scheme/app-logs` (30-day retention)
- **CloudWatch Alarm** for EC2 CPU > 80% → triggers SNS email

---

### DevOps — Docker

#### ✅ Dockerfile
- Base: `node:20-alpine`
- Installs dependencies, copies all code
- Exposes all ports: 3000, 5001, 5002, 5003, 5004, 5005, 8000
- Default CMD: `npm run dev` (starts everything via orchestrator)

#### ✅ Docker Compose (`docker-compose.yml`)
Full multi-service compose with:
- `postgres` — PostgreSQL 16 Alpine with health check
- `hospital-service` — depends on postgres healthy
- `scheme-service` — depends on postgres healthy
- `review-service` — depends on postgres healthy
- `auth-service` — depends on postgres healthy
- `ai-service` — depends on postgres healthy, accepts `GEMINI_API_KEY`
- `gateway` — depends on all 5 services
- `frontend` — depends on gateway, runs `vite --host`

---

## 6. What Still Needs to Be Implemented

### 🔴 Critical (Required for Production)

| # | What | Why It's Missing | Effort |
|---|---|---|---|
| 1 | **Real JWT Authentication** | Auth service issues fake string tokens. No signature/expiry/verification. `jsonwebtoken` library needed. | Medium |
| 2 | **Password Hashing** | Passwords are stored/compared as plain text. `bcrypt` needed for security. | Small |
| 3 | **HTTPS / SSL Certificate** | ALB only listens on port 80 (HTTP). AWS ACM certificate + HTTPS listener at 443 needed. | Small |
| 4 | **Auth Middleware** | No route protection. Any unauthenticated user can POST reviews. Middleware to verify JWT on protected endpoints needed. | Medium |
| 5 | **Secrets Management** | DB password is hardcoded in `rds.tf` and `docker-compose.yml`. AWS Secrets Manager + `.env` files needed. | Medium |

### 🟡 Important (Feature Gaps)

| # | What | Details | Effort |
|---|---|---|---|
| 6 | **Real-Time Bed Updates** | Bed status is seeded once and never changes. A WebSocket or polling endpoint for hospitals to push updates is needed. | Large |
| 7 | **Hospital Admin Portal** | No UI for hospitals to update their own bed counts, treatments, or schemes. "Partner With Us" link currently shows a coming-soon alert. | Large |
| 8 | **Scheme Eligibility Engine** | "Eligibility Checker" card on home page currently shows a static `alert()`. Should be a proper form that checks ration card type, income, state, etc. | Medium |
| 9 | **Pre-Authorization Workflow** | "Cashless Pre-Auth" card shows a static `alert()`. Should be a guided multi-step form. | Medium |
| 10 | **Search by Speciality** | The "Speciality Department" dropdown in the search form is UI-only — the value is not passed to the backend API. | Small |
| 11 | **Pagination** | `/api/hospitals` and `/api/schemes` return all rows. Needs `LIMIT` + `OFFSET` pagination for large datasets. | Small |
| 12 | **Map Integration** | Hospital detail page links to Google Maps via lat/lng. Full embedded map (Leaflet.js or Google Maps API) would greatly improve UX. | Medium |
| 13 | **Image Upload for Reviews** | Reviews can only contain text. Photo uploads via S3 presigned URLs would make reviews more trustworthy. | Medium |
| 14 | **Auto Scaling Group** | Currently uses a single EC2 instance. ASG with min/max instances needs to be added in Terraform for real load handling. | Medium |

### 🟢 Nice to Have (Quality Improvements)

| # | What | Details | Effort |
|---|---|---|---|
| 15 | **CI/CD Pipeline** | GitHub Actions workflow for auto-build + push to ECR + deploy on merge to `main`. | Medium |
| 16 | **E2E Tests** | Playwright or Cypress tests for critical flows (search → detail → review). | Large |
| 17 | **Gemini API Key in Backend** | Currently the user must paste their own API key in the chatbot every session. A single server-side key from env var would be cleaner. | Small |
| 18 | **Rate Limiting** | No rate limiting on API endpoints — open to abuse. `express-rate-limit` package. | Small |
| 19 | **Input Validation** | Backend services have minimal validation. `zod` or `joi` schemas needed for all request bodies. | Medium |
| 20 | **CDN for Static Assets** | CloudFront distribution for the Vite build `/dist` to reduce latency globally. | Small |
| 21 | **Database Migrations** | Schema changes require manual SQL. Proper migration tool (`flyway`, `db-migrate`, `drizzle`) needed. | Medium |
| 22 | **Multi-AZ RDS** | `multi_az = false` in `rds.tf`. Set to `true` + enable automated backups for production. | Small |
| 23 | **Help Center / Policy Pages** | Footer links (Help Center, Privacy Policy, Terms of Service) all show "coming soon" alert. | Medium |
| 24 | **Admin Dashboard** | No admin UI for managing hospitals, schemes, or reviewing flagged content. | Large |

---

## 7. Running the Project Locally

### Option A — With Docker (Recommended)

```bash
# 1. Clone and enter the project
cd HEALTH-SCHEME-CONNECT

# 2. (Optional) Create a .env file
echo "GEMINI_API_KEY=your_key_here" > .env

# 3. Start all services
docker-compose up --build

# 4. Open the app
open http://localhost:3000
```

### Option B — Direct (requires local PostgreSQL)

```bash
# 1. Install dependencies
npm install

# 2. Start a PostgreSQL container
docker run --name health-scheme-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=health_scheme \
  -p 5432:5432 -d postgres:16-alpine

# 3. Run the all-in-one dev server
npm run dev
# This seeds the DB, starts 5 microservices + gateway + Vite frontend

# App: http://localhost:3000
# API: http://localhost:8000
```

---

## 8. Environment Variables

| Variable | Default | Where Used | Description |
|---|---|---|---|
| `DATABASE_URL` | `postgresql://postgres:postgres@localhost:5432/health_scheme` | All backend services | Full PostgreSQL connection string |
| `HOSPITAL_SERVICE_PORT` | `5001` | Hospital Service | Port override |
| `SCHEME_SERVICE_PORT` | `5002` | Scheme Service | Port override |
| `REVIEW_SERVICE_PORT` | `5003` | Review Service | Port override |
| `AUTH_SERVICE_PORT` | `5004` | Auth Service | Port override |
| `AI_SERVICE_PORT` | `5005` | AI Service | Port override |
| `GATEWAY_PORT` | `8000` | Gateway | Port override |
| `GEMINI_API_KEY` | _(empty)_ | AI Service | Google Gemini API key (user provides at runtime if not set server-side) |
| `GATEWAY_URL` | `http://localhost:8000` | Frontend (Vite proxy) | Where the Vite dev server proxies `/api/*` |
| `DEBUG_SQL` | `false` | DB Client | Set `true` to log all SQL queries with execution time |

---

## 9. API Reference

All routes go through the API Gateway at `http://localhost:8000`.

### Hospitals

```
GET  /api/hospitals?city=Hyderabad&schemeCode=PMJAY
GET  /api/hospitals/:id
GET  /api/hospitals/:id/beds
GET  /api/hospitals/:id/treatments
```

### Schemes

```
GET  /api/schemes?government_level=Central&state=Telangana
GET  /api/schemes/:id
GET  /api/schemes/:id/hospitals?city=Hyderabad
```

### Reviews

```
GET  /api/reviews/:hospitalId
POST /api/reviews
     Body: { hospital_id, rating, title, body, user_id? }
```

### Auth

```
POST /api/auth/login
     Body: { email, password }
POST /api/auth/signup
     Body: { name, email, password }
```

### AI Chat

```
POST /api/ai/chat
     Body: { message, history: [], apiKey }
```

### Health Check

```
GET  /api/health     → Aggregated status of all 5 services
GET  /health         → Same as above
```

---

## 10. File-by-File Directory Guide

```
HEALTH-SCHEME-CONNECT/
│
├── 📄 server.ts               → Entry point → imports scripts/start-all.ts
├── 📄 package.json            → Scripts: dev, build, preview, db:seed, service:*
├── 📄 vite.config.ts          → Vite config with /api proxy to :8000
├── 📄 tsconfig.json           → TypeScript config
├── 📄 Dockerfile              → Single image: node:20-alpine, all services
├── 📄 docker-compose.yml      → Full 3-tier stack: postgres + 5 services + gateway + frontend
├── 📄 index.html              → Root HTML shell for React SPA
├── 📄 index.tsx               → ReactDOM.render(<App />)
│
├── 📄 App.tsx                 → Root component: routing state machine, Header, Footer, Chatbot
├── 📄 types.ts                → All TypeScript interfaces: Hospital, Scheme, Review, BedStatus, etc.
│
├── 📁 pages/
│   ├── HomePage.tsx           → Full marketing landing page with search
│   ├── SearchResultsPage.tsx  → Filtered hospital list results
│   ├── HospitalDetailPage.tsx → Full hospital profile with beds/reviews/treatments
│   ├── SchemeExplorerPage.tsx → Browse & search all 51+ schemes
│   ├── ComparePage.tsx        → Side-by-side scheme or hospital comparison
│   ├── LoginPage.tsx          → Email/password login form
│   └── SignupPage.tsx         → New account registration
│
├── 📁 components/
│   ├── Header.tsx             → Sticky nav: links, language, dark mode, user menu
│   ├── Chatbot.tsx            → Floating AI chatbot "Arogya" with API key gate
│   ├── HospitalCard.tsx       → Hospital preview card for search results
│   ├── SchemeCard.tsx         → Scheme card with coverage + eligibility
│   ├── ReviewCard.tsx         → Patient review with star rating
│   ├── HospitalSidebar.tsx    → Hospital detail sidebar/panel
│   ├── BedStatusTile.tsx      → ICU/General/Maternity live bed tile
│   └── icons.tsx              → Custom SVG icons (ExternalLink, Star, Bed, Certificate)
│
├── 📁 contexts/
│   ├── LanguageContext.tsx    → i18n provider (en/hi/te/ta), persists to localStorage
│   └── AuthContext.tsx        → Auth state provider (login, signup, logout, guest)
│
├── 📁 services/               → Frontend API client functions
│   ├── apiService.ts          → All hospital, scheme, review, bed API calls
│   ├── authService.ts         → Login/signup/logout, localStorage token management
│   └── geminiService.ts       → POST to /api/ai/chat with history + API key
│
├── 📁 data/
│   ├── mockData.ts            → 51+ schemes + 60+ hospitals (used for seeding)
│   ├── translations.ts        → 100+ translation keys in 4 languages
│   └── imageAssets.ts         → Image URL constants
│
├── 📁 backend/
│   ├── schema.sql             → PostgreSQL DDL: 9 tables + indexes + extensions
│   ├── 📁 database/
│   │   ├── client.ts          → pg.Pool setup, query(), checkConnection() with retry
│   │   └── seed.ts            → Reads schema.sql + seeds all tables from mock data
│   ├── 📁 data/
│   │   └── db.ts              → Server-side version of mock data for seeding
│   ├── 📁 routes/             → (Legacy) older route handlers — superseded by microservices
│   │   ├── hospitals.ts
│   │   ├── schemes.ts
│   │   ├── reviews.ts
│   │   ├── ai.ts
│   │   └── auth.ts
│   └── 📁 services/
│       ├── gateway/server.ts      → API Gateway + HTTP proxy middleware
│       ├── hospital-service/server.ts → Hospital CRUD microservice
│       ├── scheme-service/server.ts   → Scheme catalog microservice
│       ├── review-service/server.ts   → Patient reviews microservice
│       ├── auth-service/server.ts     → Login/signup microservice
│       └── ai-service/server.ts       → Gemini AI chat microservice
│
├── 📁 scripts/
│   └── start-all.ts           → Bootstrap: seed DB → start all services → start Vite
│
├── 📁 aws-terraform/          → All Terraform IaC for AWS
│   ├── provider.tf            → AWS provider, region (ap-south-2 / Hyderabad), variables
│   ├── vpc.tf                 → VPC, 2 public + 2 private subnets, IGW, NAT, route tables
│   ├── security-groups.tf     → ALB, App, RDS security groups
│   ├── ec2.tf                 → EC2 t3.micro instance with user_data Docker setup
│   ├── rds.tf                 → RDS PostgreSQL 16 in private subnet
│   ├── loadbalancer.tf        → ALB + 2 target groups + listener + routing rule
│   ├── iam.tf                 → EC2 role + CloudWatch + S3 policies + instance profile
│   ├── s3-sns-cloudwatch.tf   → S3 bucket + SNS topic + CloudWatch logs + CPU alarm
│   ├── route53.tf             → Hosted zone + A records + outputs (nameservers)
│   ├── 1-CLICK-START.sh       → terraform init + apply convenience script
│   └── 1-CLICK-STOP.sh        → terraform destroy convenience script
│
├── 📁 public/
│   ├── aws-architecture.jpg       → AWS architecture diagram image
│   ├── full-stack-architecture.jpg → Full-stack architecture image
│   └── images/                    → Hero images (hospital-building, hero-doctor, ambulance)
│
├── 📄 ARCHITECTURE.md         → Detailed architecture documentation
├── 📄 AWS_DEPLOYMENT_GUIDE.md → Step-by-step AWS deployment guide
├── 📄 INTERVIEW_ANSWERS.md    → Comprehensive Q&A for project interviews
├── 📄 README.md               → Quick-start overview
└── 📄 PROJECT_INFO.md         → ← THIS FILE
```

---

## Summary Table — What's Done vs What's Needed

| Area | Status | Notes |
|---|---|---|
| React SPA with 7 pages | ✅ Done | Fully functional |
| Dark mode + i18n (4 languages) | ✅ Done | Persisted to localStorage |
| AI Chatbot (Arogya) | ✅ Done | Needs user's Gemini API key |
| Microservices backend (5 services + gateway) | ✅ Done | All endpoints functional |
| PostgreSQL schema (9 tables) | ✅ Done | Proper FK + index design |
| Auto-seed with 60+ hospitals, 51+ schemes | ✅ Done | Seeds on first boot |
| Docker + Docker Compose | ✅ Done | Full 3-tier compose |
| Terraform for all AWS infra | ✅ Done | VPC, EC2, RDS, ALB, Route53, IAM, CloudWatch |
| Real JWT Auth | ❌ Missing | Plain string tokens only |
| Password hashing (bcrypt) | ❌ Missing | Plain text passwords |
| HTTPS / SSL | ❌ Missing | HTTP only (port 80) |
| Real-time bed updates (WebSocket) | ❌ Missing | Static seed data only |
| Speciality filter in search | ❌ Missing | UI-only, not wired to API |
| Hospital admin portal | ❌ Missing | Coming Soon placeholders |
| Eligibility checker (real form) | ❌ Missing | Static alert() |
| Pre-auth workflow (real form) | ❌ Missing | Static alert() |
| CI/CD pipeline | ❌ Missing | Not created |
| Auto Scaling Group | ❌ Missing | Single EC2 instance |
| Map embed | ❌ Missing | Links to Google Maps only |
| Rate limiting + Input validation | ❌ Missing | No protection |

---

*Built with ❤️ to connect Indian families with the healthcare they deserve.*

