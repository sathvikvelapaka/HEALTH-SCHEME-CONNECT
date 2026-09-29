# 🏥 Health Scheme Connect (India)

An open‑source, full‑stack platform that lets Indian families discover and compare government health‑insurance schemes (PMJAY, CGHS, ESI, Aarogyasri, etc.) across 60+ empanelled hospitals. Users can instantly see cash‑less surgery costs, real‑time bed availability, and scheme coverage.

---

## ✨ Key Features
- **Scheme Catalog** – 51+ central & state health schemes with eligibility, coverage limits, and required documents.
- **Live Bed Tracker** – Real‑time ICU, general & maternity bed status for all partner hospitals.
- **Cashless Cost Comparator** – Compare procedure fees across hospitals and see out‑of‑pocket estimates.
- **Pre‑Authorization Guide** – Step‑by‑step workflow to check eligibility and submit documents.

---

## 🏗️ Architecture Overview
The application is built as a **cloud‑ready monolith** that can evolve into micro‑services. It consists of:
- **Frontend SPA** – React 18 + Vite, styled with Tailwind CSS and Framer Motion for smooth interactions.
- **Backend API** – Node.js + Express written in TypeScript, compiled with esbuild to a single `dist/server.cjs` bundle.
- **Database** – PostgreSQL (managed by AWS RDS) with a clean relational schema.

---

```mermaid
flowchart LR
    subgraph Frontend
        FE[React SPA]
    end
    subgraph Backend
        BE[Node.js Express API]
    end
    subgraph DB[PostgreSQL (RDS)]
        DB
    end
    subgraph Infra
        S3[Amazon S3] --> FE
        EC2[Amazon EC2] --> BE
        ALB[ALB] --> EC2
        VPC[VPC]
        Route53[Route53] --> ALB
        IAM[IAM Role] --> EC2
        ASG[Auto Scaling Group] --> EC2
        CW[CloudWatch] --> EC2
    end
    FE --> BE
    BE --> DB
```

## 🛠️ Tech Stack
| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion |
| Backend | Node.js v18+, Express, TypeScript, esbuild |
| Database | PostgreSQL (AWS RDS) |
| Containerisation | Docker (local & production) |
| Orchestration | Docker‑Compose for local dev |
| Cloud Infra | Terraform provisioning on AWS |
| CI/CD | npm scripts, GitHub Actions (optional) |

---

## 🚀 AWS Deployment (Current Services)
- **Amazon S3** – Hosts the compiled static frontend (`/dist`).
- **Amazon EC2** – Runs the Docker container with the Express backend.
- **Application Load Balancer (ALB)** – Public entry point routing traffic to EC2.
- **Amazon RDS (PostgreSQL)** – Managed relational database in private subnets.
- **VPC** – Public & private subnets, NAT gateway, route tables.
- **Route 53** – DNS zone for the ALB endpoint.
- **IAM** – Least‑privilege role for EC2 (S3 access, CloudWatch logs).
- **Auto Scaling Group** – Scales EC2 instances based on load.
- **Amazon CloudWatch** – Logs, metrics, and alarm notifications.

*Note: CloudFront and AWS Systems Manager have been removed from the project.*

---

## 💻 Local Development & Execution
1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Configure environment** – copy `.env.example` to `.env` and set your DB connection if you have a local PostgreSQL instance.
3. **Run services** (Docker‑Compose starts DB + backend + frontend)
   ```bash
   docker-compose up --build
   ```
4. **Access the app** – Open `http://localhost:3000` in your browser.
5. **Build for production**
   ```bash
   npm run build   # creates /dist and compiles server.cjs
   ```

---

## 🤝 Contributing
Contributions are welcome! Please fork the repo, create a feature branch, and submit a pull request. Follow the code‑style guidelines and ensure all tests pass.

---

## 📜 License
This project is licensed under the MIT License.
