# 🏥 Health Scheme Connect — Complete Architecture

> **Domain:** `healthschemeconnect.online` | **Tech:** React 19 + Node.js + PostgreSQL + AWS

---

## 📋 Table of Contents
1. [Full System Overview](#-full-system-overview)
2. [Frontend (What the User Sees)](#-tier-1--frontend--presentation-layer)
3. [Backend (The Brain)](#-tier-2--backend--microservices-layer)
4. [Database (Where Data Lives)](#-tier-3--database--data-layer)
5. [AWS Deployment (How It Goes Live)](#-aws-deployment--how-it-goes-live)
6. [Security (How It Stays Safe)](#-security--how-it-stays-safe)
7. [Complete Request Flow](#-complete-request-flow)

---

## 🗺️ Full System Overview

```mermaid
flowchart TB
    User(("🧑‍💻 User"))

    subgraph TIER1["🖥️ TIER 1 — FRONTEND (What User Sees)"]
        direction LR
        React["⚛️ React 19 App<br/>(Built with Vite)"]
        Pages["📄 7 Pages:<br/>Home, Search, Hospital Detail,<br/>Scheme Explorer, Compare,<br/>Login, Signup"]
        Components["🧩 8 Components:<br/>Header, Chatbot, HospitalCard,<br/>SchemeCard, BedStatus,<br/>ReviewCard, Sidebar, Icons"]
        Services["🔌 3 Frontend Services:<br/>apiService, authService,<br/>geminiService"]
    end

    subgraph TIER2["⚙️ TIER 2 — BACKEND (The Brain)"]
        direction LR
        Gateway["🌐 API Gateway<br/>Port 8000<br/>Routes all /api/* requests"]
        H_SVC["🏥 Hospital Service<br/>Port 5001"]
        S_SVC["📋 Scheme Service<br/>Port 5002"]
        R_SVC["⭐ Review Service<br/>Port 5003"]
        A_SVC["🔐 Auth Service<br/>Port 5004"]
        AI_SVC["🤖 AI Service<br/>Port 5005"]
    end

    subgraph TIER3["🗄️ TIER 3 — DATABASE (Where Data Lives)"]
        direction LR
        PG["🐘 PostgreSQL<br/>Port 5432"]
        Tables["📊 7 SQL Tables:<br/>users, hospitals, schemes,<br/>treatments, hospital_treatments,<br/>reviews, bed_statuses"]
    end

    User -->|"Visits website"| React
    React --> Pages
    React --> Components
    Pages -->|"Makes API calls"| Services
    Services -->|"HTTP requests to /api/*"| Gateway
    Gateway -->|"/api/hospitals/*"| H_SVC
    Gateway -->|"/api/schemes/*"| S_SVC
    Gateway -->|"/api/reviews/*"| R_SVC
    Gateway -->|"/api/auth/*"| A_SVC
    Gateway -->|"/api/ai/*"| AI_SVC
    H_SVC -->|"SQL queries"| PG
    S_SVC -->|"SQL queries"| PG
    R_SVC -->|"SQL queries"| PG
    A_SVC -->|"SQL queries"| PG
    AI_SVC -->|"SQL queries"| PG
    PG --- Tables
```

---

## 🖥️ TIER 1 — Frontend (Presentation Layer)

> **Tech:** React 19 + TypeScript + Tailwind CSS + Vite  
> **Runs on:** Port 3000 locally → Amazon S3 in production

### Pages (What Users Navigate To)

| Page | File | What It Does |
|------|------|-------------|
| 🏠 Home | `HomePage.tsx` | Landing page with search bar, featured hospitals, scheme stats |
| 🔍 Search Results | `SearchResultsPage.tsx` | Shows filtered hospitals by city + scheme |
| 🏥 Hospital Detail | `HospitalDetailPage.tsx` | Full hospital info: beds, treatments, reviews, schemes |
| 📋 Scheme Explorer | `SchemeExplorerPage.tsx` | Browse all government health schemes |
| ⚖️ Compare | `ComparePage.tsx` | Side-by-side hospital comparison |
| 🔐 Login | `LoginPage.tsx` | User login with email/password |
| 📝 Signup | `SignupPage.tsx` | New user registration |

### Components (Reusable UI Pieces)

| Component | What It Does |
|-----------|-------------|
| `Header.tsx` | Navigation bar, theme toggle, language switcher |
| `Chatbot.tsx` | AI-powered health assistant (uses Gemini) |
| `HospitalCard.tsx` | Hospital preview card in search results |
| `SchemeCard.tsx` | Government scheme info card with details |
| `BedStatusTile.tsx` | Real-time ICU/General/Maternity bed availability |
| `ReviewCard.tsx` | Patient review display with star ratings |
| `HospitalSidebar.tsx` | Quick info sidebar on hospital detail page |
| `icons.tsx` | Custom SVG icon library |

### Frontend Services (How Frontend Talks to Backend)

| Service | What It Does |
|---------|-------------|
| `apiService.ts` | Calls backend APIs for hospitals, schemes, reviews, beds, treatments |
| `authService.ts` | Handles login, signup, logout, guest login + stores tokens |
| `geminiService.ts` | Sends chat messages to the AI service |

---

## ⚙️ TIER 2 — Backend (Microservices Layer)

> **Tech:** Node.js + Express + TypeScript  
> **Pattern:** Microservices Architecture with API Gateway

```mermaid
flowchart LR
    FE["🖥️ Frontend<br/>React App"]

    FE -->|"All API requests go to<br/>/api/*"| GW

    subgraph Backend["⚙️ Backend Microservices"]
        GW["🌐 API Gateway<br/>Port 8000<br/>Routes requests to<br/>the right service"]

        GW -->|"/api/hospitals/*"| HS["🏥 Hospital Service<br/>Port 5001<br/>• Search hospitals<br/>• Get hospital details<br/>• Bed availability<br/>• Treatment costs"]

        GW -->|"/api/schemes/*"| SS["📋 Scheme Service<br/>Port 5002<br/>• List all schemes<br/>• Get scheme details<br/>• Find hospitals by scheme"]

        GW -->|"/api/reviews/*"| RS["⭐ Review Service<br/>Port 5003<br/>• Get hospital reviews<br/>• Submit new review"]

        GW -->|"/api/auth/*"| AS["🔐 Auth Service<br/>Port 5004<br/>• Login<br/>• Signup<br/>• Token management"]

        GW -->|"/api/ai/*"| AI["🤖 AI Service<br/>Port 5005<br/>• Chat with AI assistant<br/>• Uses Google Gemini API"]
    end

    DB[("🗄️ PostgreSQL<br/>Database")]

    HS --> DB
    SS --> DB
    RS --> DB
    AS --> DB
    AI --> DB
```

### API Endpoints Summary

| Service | Endpoint | Method | What It Does |
|---------|----------|--------|-------------|
| Hospital | `/api/hospitals` | GET | Search hospitals (filter by city, scheme) |
| Hospital | `/api/hospitals/:id` | GET | Get one hospital's full details |
| Hospital | `/api/hospitals/:id/beds` | GET | Get real-time bed availability |
| Hospital | `/api/hospitals/:id/treatments` | GET | Get treatment costs + scheme coverage |
| Scheme | `/api/schemes` | GET | List all government health schemes |
| Scheme | `/api/schemes/:id/hospitals` | GET | Find hospitals that accept a scheme |
| Review | `/api/reviews/:hospitalId` | GET | Get reviews for a hospital |
| Review | `/api/reviews` | POST | Submit a new review |
| Auth | `/api/auth/login` | POST | Login with email + password |
| Auth | `/api/auth/signup` | POST | Register new user |
| AI | `/api/ai/chat` | POST | Send message to AI chatbot |

---

## 🗄️ TIER 3 — Database (Data Layer)

> **Tech:** PostgreSQL 16  
> **Runs on:** Port 5432 locally (Docker) → Amazon RDS in production

```mermaid
erDiagram
    users {
        VARCHAR id PK
        VARCHAR name
        VARCHAR email UK
        VARCHAR role
        TEXT avatar
    }

    hospitals {
        VARCHAR id PK
        VARCHAR name
        VARCHAR city
        VARCHAR state
        DECIMAL rating
        INT total_beds
        INT icu_beds
        BOOLEAN is_nabh
        TEXT_ARRAY schemes_accepted
        TEXT_ARRAY specialties
    }

    schemes {
        VARCHAR id PK
        VARCHAR code UK
        VARCHAR name
        INT coverage_limit
        VARCHAR government_level
        TEXT description
        BOOLEAN cashless
    }

    treatments {
        VARCHAR id PK
        VARCHAR code UK
        VARCHAR name
    }

    hospital_treatments {
        VARCHAR hospital_id FK
        VARCHAR treatment_id FK
        INT estimated_cost
        BOOLEAN scheme_covered
        INT scheme_coverage_limit
    }

    reviews {
        VARCHAR id PK
        VARCHAR hospital_id FK
        VARCHAR user_id
        INT rating
        VARCHAR title
        TEXT body
        BOOLEAN verified
    }

    bed_statuses {
        VARCHAR hospital_id PK
        INT available_icu
        INT available_general
        INT available_maternity
        TIMESTAMP last_updated
    }

    hospitals ||--o{ reviews : "has many"
    hospitals ||--o| bed_statuses : "has one"
    hospitals ||--o{ hospital_treatments : "offers"
    treatments ||--o{ hospital_treatments : "available at"
    hospitals }o--o{ schemes : "accepts (via schemes_accepted array)"
```

### Database Tables Summary

| Table | Rows (Seeded) | Purpose |
|-------|:---:|---------|
| `users` | 2 | Admin and regular user accounts |
| `hospitals` | 10+ | Hospital info: name, city, beds, ratings, schemes accepted |
| `schemes` | 8+ | Government health schemes (PMJAY, CGHS, etc.) |
| `treatments` | 15+ | List of medical treatments (CABG, Dialysis, etc.) |
| `hospital_treatments` | 50+ | Maps treatment → hospital with costs + scheme coverage |
| `reviews` | 20+ | Patient reviews with star ratings |
| `bed_statuses` | 10+ | Real-time ICU, General, Maternity bed counts |

---

## ☁️ AWS Deployment — How It Goes Live

```mermaid
flowchart TB
    User(("🧑‍💻 User visits<br/>healthschemeconnect.online"))

    User -->|"① Types domain in browser"| R53

    subgraph DNS["① DNS — Amazon Route 53"]
        R53["🧭 Route 53<br/>Translates healthschemeconnect.online<br/>into server addresses"]
    end

    R53 -->|"② Serves website files<br/>(HTML, CSS, JS)"| S3
    R53 -->|"③ Sends API requests<br/>(/api/*)"| ALB

    subgraph CDN["② Frontend — Amazon S3"]
        S3["🪣 S3 Bucket<br/>Stores the compiled React app<br/>Static files only, no server needed"]
    end

    subgraph VPC["④ Virtual Private Cloud (Your Private Network on AWS)"]
        subgraph PUB["🌐 PUBLIC SUBNETS (Connected to Internet)"]
            ALB["⚖️ Application Load Balancer<br/>Accepts HTTP/HTTPS traffic<br/>Distributes to healthy servers"]
            NAT["🚪 NAT Gateway<br/>Lets private servers<br/>download updates safely"]
            IGW["🌍 Internet Gateway<br/>Connects VPC to Internet"]
        end

        subgraph PRIV["🛡️ PRIVATE SUBNETS (NO Internet Access)"]
            EC2_1["🖥️ EC2 Instance 1<br/>(Availability Zone A)<br/>Runs: Gateway + 5 Microservices<br/>+ Frontend via Docker Compose"]
            EC2_2["🖥️ EC2 Instance 2<br/>(Availability Zone B)<br/>Identical backup copy"]
            ASG["⚙️ Auto Scaling Group<br/>Min: 2 servers | Max: 4 servers<br/>Adds more when CPU > 80%<br/>Removes when CPU < 30%"]
            RDS["🗄️ Amazon RDS<br/>PostgreSQL 16 Database<br/>db.t4g.micro instance<br/>20 GB Storage<br/>Publicly accessible: ❌ NO"]
        end

        IGW -.-> ALB
        ALB -->|"⑤ Routes / to port 3000"| EC2_1
        ALB -->|"⑤ Routes /api/* to port 8000"| EC2_2
        ASG -.->|"Manages"| EC2_1
        ASG -.->|"Manages"| EC2_2
        EC2_1 -->|"⑥ SQL queries on port 5432"| RDS
        EC2_2 -->|"⑥ SQL queries on port 5432"| RDS
        EC2_1 -.->|"Downloads via"| NAT
        EC2_2 -.->|"Downloads via"| NAT
    end

    subgraph MON["⑦ Monitoring & Alerts"]
        CW["📈 CloudWatch<br/>Tracks CPU, Memory, Errors<br/>Logs kept for 30 days"]
        SNS["📧 SNS Topic<br/>Sends email alerts"]
    end

    subgraph IAM_SEC["⑧ Security & Permissions"]
        IAM["🔑 IAM Roles<br/>EC2 can access S3 + CloudWatch<br/>No hardcoded passwords"]
        SG1["🚧 ALB Firewall<br/>✅ Port 80, 443 from anywhere<br/>❌ Everything else blocked"]
        SG2["🚧 EC2 Firewall<br/>✅ Traffic ONLY from ALB<br/>❌ No direct internet"]
        SG3["🚧 RDS Firewall<br/>✅ Port 5432 ONLY from EC2<br/>❌ Everything else blocked"]
    end

    EC2_1 -.-> CW
    CW -.->|"CPU > 80% alert"| SNS
    SNS -.->|"Email to"| EMAIL["📬 sathvikvelapaka2005@gmail.com"]

    SG1 -.->|"Protects"| ALB
    SG2 -.->|"Protects"| EC2_1
    SG2 -.->|"Protects"| EC2_2
    SG3 -.->|"Protects"| RDS
```

### All 12 AWS Services Used

| # | AWS Service | What It Does | Layer |
|:-:|------------|-------------|-------|
| 1 | **Route 53** | DNS — maps `healthschemeconnect.online` to your servers | Domain |
| 2 | **S3 Bucket** | Hosts static React frontend (HTML/CSS/JS) | Frontend |
| 3 | **VPC** | Creates your own private network in the cloud | Network |
| 4 | **Public Subnets (x2)** | Internet-facing zone for ALB + NAT | Network |
| 5 | **Private Subnets (x2)** | Hidden zone for EC2 + RDS (no internet) | Network |
| 6 | **Internet Gateway** | Connects VPC to the internet | Network |
| 7 | **NAT Gateway** | Lets private servers download updates safely | Network |
| 8 | **Application Load Balancer** | Distributes traffic across EC2 instances | Routing |
| 9 | **EC2 + Auto Scaling Group** | Runs your Docker containers (2–4 servers) | Compute |
| 10 | **RDS (PostgreSQL 16)** | Managed SQL database, auto-backups | Database |
| 11 | **CloudWatch** | Monitors CPU, logs errors, triggers alarms | Monitoring |
| 12 | **SNS** | Sends email alerts when something breaks | Alerts |
| 13 | **IAM** | Secure permissions (no hardcoded passwords) | Security |
| 14 | **Security Groups (x3)** | Firewall rules for ALB, EC2, and RDS | Security |

### Terraform Files (Infrastructure as Code)

| File | What It Creates |
|------|----------------|
| `provider.tf` | Sets AWS region to `us-east-1`, environment to `production` |
| `vpc.tf` | VPC + 2 Public Subnets + 2 Private Subnets + IGW + NAT |
| `security-groups.tf` | 3 firewalls (ALB, EC2, RDS) |
| `loadbalancer.tf` | ALB + Target Groups + Listener Rules (`/` → port 3000, `/api/*` → port 8000) |
| `autoscaling.tf` | EC2 Launch Template + Auto Scaling Group (2–4 instances) |
| `rds.tf` | PostgreSQL 16 database in private subnet |
| `iam.tf` | IAM roles so EC2 can access S3 + CloudWatch |
| `s3-sns-cloudwatch.tf` | S3 bucket + SNS alerts + CloudWatch alarms |
| `route53.tf` | DNS records for `healthschemeconnect.online` + `www` |

---

## 🔐 Security — How It Stays Safe

```
Internet
    │
    ▼
┌─────────────────────────────────────┐
│  🚧 ALB Security Group             │
│  ✅ Allows: Port 80, 443 (HTTP/S)  │
│  ❌ Blocks: Everything else         │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  🚧 EC2 Security Group             │
│  ✅ Allows: Traffic ONLY from ALB   │
│  ❌ Blocks: Direct internet access  │
│  ✅ Allows: EC2-to-EC2 (internal)   │
└──────────────┬──────────────────────┘
               │
               ▼
┌─────────────────────────────────────┐
│  🚧 RDS Security Group             │
│  ✅ Allows: Port 5432 from EC2 only │
│  ❌ Blocks: Everything else         │
│  ❌ Publicly accessible: NO         │
└─────────────────────────────────────┘
```

> **Key Point:** A hacker on the internet can ONLY reach the Load Balancer. They cannot directly access your servers or database. Each layer only trusts the layer directly above it.

---

## 🔄 Complete Request Flow

Here's what happens when a user opens `healthschemeconnect.online` and searches for hospitals:

```
 STEP 1: User types healthschemeconnect.online in browser
           │
           ▼
 STEP 2: Route 53 DNS resolves the domain name
           │
           ├──→ Static files? → S3 serves React app (HTML/CSS/JS)
           │
           ▼
 STEP 3: React app loads in the user's browser
           │
           ▼
 STEP 4: User searches "Hospitals in Hyderabad with PMJAY"
           │
           ▼
 STEP 5: React calls → /api/hospitals?city=Hyderabad&schemeCode=PMJAY
           │
           ▼
 STEP 6: Route 53 sends API request to ALB (Load Balancer)
           │
           ▼
 STEP 7: ALB sees /api/* → forwards to EC2 port 8000 (Gateway)
           │
           ▼
 STEP 8: Gateway sees /api/hospitals → forwards to Hospital Service (port 5001)
           │
           ▼
 STEP 9: Hospital Service runs SQL query:
          SELECT * FROM hospitals
          WHERE LOWER(city) = 'hyderabad'
          AND 'PMJAY' = ANY(schemes_accepted)
          ORDER BY rating DESC
           │
           ▼
 STEP 10: PostgreSQL returns matching hospital rows
           │
           ▼
 STEP 11: Response travels back:
           RDS → Hospital Service → Gateway → ALB → User's Browser
           │
           ▼
 STEP 12: React renders beautiful hospital cards on screen! ✅
```
