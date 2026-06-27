🏥 Health Scheme Connect

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript"/>
  <img src="https://img.shields.io/badge/Express.js-Backend-black?logo=express"/>
  <img src="https://img.shields.io/badge/PostgreSQL-Amazon%20RDS-blue?logo=postgresql"/>
  <img src="https://img.shields.io/badge/Terraform-IaC-purple?logo=terraform"/>
  <img src="https://img.shields.io/badge/AWS-Cloud-orange?logo=amazonaws"/>
  <img src="https://img.shields.io/badge/Open%20Source-Contributions%20Welcome-brightgreen"/>
</p>

⸻

📌 OVERVIEW

Health Scheme Connect is a full-stack healthcare platform that helps citizens discover government health schemes, compare hospitals, estimate treatment costs, monitor bed availability, and access healthcare information through a single, user-friendly interface.

The project has been designed as a production-ready application that can be deployed on AWS using modern cloud-native architecture. It supports Amazon RDS, Infrastructure as Code with Terraform, and is structured to transition easily into a microservices architecture.

⸻

🎯 Problem Statement

Many citizens struggle to:

* Find hospitals accepting government health schemes
* Compare treatment costs across hospitals
* Check real-time bed availability
* Understand scheme eligibility
* Access verified healthcare information
* Navigate multiple government healthcare portals

Health Scheme Connect solves these challenges by providing one unified healthcare platform.

⸻

✨ Features

🏥 Hospital Management

* Browse hospitals
* Hospital profile pages
* Hospital search
* City-wise filtering
* Specialty filtering
* NABH/NABL accreditation information
* Contact details
* Hospital ratings

⸻

❤️ Government Health Schemes

Supports multiple Central and State Government schemes including:

* Ayushman Bharat (PM-JAY)
* Aarogyasri
* CGHS
* ESI
* MJPJAY
* BSKY
* State Health Schemes

Each scheme contains:

* Eligibility
* Coverage
* Required Documents
* Benefits
* Package Information

⸻

🩺 Treatment Cost Comparison

Users can compare treatment costs across multiple hospitals including:

* Estimated surgery cost
* Government package cost
* Scheme coverage
* Out-of-pocket expenses

⸻

🛏 Live Bed Availability

Tracks availability of

* ICU Beds
* General Beds
* Maternity Beds

Designed for real-time updates.

⸻

⭐ Patient Reviews

Verified users can:

* Submit Reviews
* Rate Hospitals
* Share Cashless Treatment Experience

⸻

🤖 AI Healthcare Assistant

Integrated AI Assistant helps users:

* Understand scheme eligibility
* Find hospitals
* Explain treatment procedures
* Navigate healthcare services

⸻

🔍 Smart Search

Search hospitals by

* Hospital Name
* City
* Treatment
* Government Scheme
* Specialty

⸻

📱 Responsive Design

* Desktop
* Tablet
* Mobile

⸻

🏗 System Architecture

                    Users
                      │
          React + TypeScript Frontend
                      │
          -----------------------------
                      │
               Express API Gateway
                      │
 ┌──────────┬──────────┬──────────┬─────────┐
 │          │          │          │
Hospitals  Schemes   Reviews    AI Service
 Service    Service    Service    Service
 │          │          │          │
 └──────────┴──────────┴──────────┘
                │
        Amazon RDS PostgreSQL

The backend is modular and can be deployed either as:

* Monolithic Express API
* Docker Containers
* AWS ECS (Fargate)
* AWS Lambda Microservices

⸻

🗄 Database Design

The project uses a fully relational SQL schema.

Core Tables

hospitals

Stores

* Hospital Information
* Contact Details
* Coordinates
* City
* Accreditation
* Bed Capacity

⸻

schemes

Stores

* Government Schemes
* Eligibility Rules
* Coverage Details
* Income Criteria

⸻

treatments

Stores

* Standard Treatment List
* Surgical Procedures

⸻

hospital_treatments

Many-to-Many relationship between hospitals and treatments.

Stores

* Estimated Cost
* Scheme Coverage
* Package Limit

⸻

bed_statuses

Tracks

* ICU Beds
* General Beds
* Maternity Beds

⸻

reviews

Stores

* Ratings
* User Reviews
* Feedback

⸻

The database schema is available at:

backend/schema.sql

This schema is fully compatible with:

* PostgreSQL
* Amazon RDS
* Aurora PostgreSQL

⸻

📂 Project Structure

HEALTH-SCHEME-CONNECT
├── backend
│   ├── routes
│   │    ├── hospitals.ts
│   │    ├── schemes.ts
│   │    ├── reviews.ts
│   │    └── ai.ts
│   │
│   ├── data
│   ├── schema.sql
│   └── server.ts
│
├── components
├── contexts
├── pages
├── services
├── hooks
├── infra
│    ├── main.tf
│    ├── variables.tf
│    └── outputs.tf
│
├── public
├── App.tsx
├── main.tsx
└── README.md

⸻

⚙ Tech Stack

Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* Motion

⸻

Backend

* Node.js
* Express.js
* TypeScript
* REST API

⸻

Database

* PostgreSQL
* Amazon RDS Compatible

⸻

Infrastructure

* AWS
* Terraform
* Docker Ready

⸻

Deployment

Supports deployment on

* AWS EC2
* AWS ECS
* AWS Fargate
* AWS Lambda
* Amazon RDS
* Application Load Balancer
* Amazon S3

⸻

🚀 Local Setup

Clone Repository

git clone https://github.com/yourusername/HEALTH-SCHEME-CONNECT.git
cd HEALTH-SCHEME-CONNECT

⸻

Install Frontend

npm install

⸻

Start Frontend

npm run dev

⸻

Install Backend

cd backend
npm install
npm run dev

⸻

Database

Create PostgreSQL Database

Run

backend/schema.sql

Update the environment variables.

⸻

☁ AWS Deployment

Production deployment supports:

* Amazon VPC
* Public & Private Subnets
* Internet Gateway
* NAT Gateway
* Application Load Balancer
* Auto Scaling
* ECS Fargate
* Amazon RDS PostgreSQL
* Amazon S3
* CloudWatch
* IAM
* Terraform

Deployment files are available under

infra/

⸻

🔄 Microservices Ready

The backend is already separated into feature-based routers.

/api/hospitals
/api/schemes
/api/reviews
/api/ai

Each router can be independently deployed as:

* ECS Service
* Docker Container
* AWS Lambda Function

without changing the frontend.

⸻

📈 Future Roadmap

* Appointment Booking
* Doctor Search
* Ambulance Tracking
* Medicine Availability
* Electronic Health Records
* Notification Service
* Authentication & Authorization
* Payment Integration
* Real-Time Bed Updates using WebSockets
* AI Eligibility Prediction
* Mobile Application

⸻

🤝 Contributing

We welcome contributions from the community.

Steps

1. Fork the repository
2. Clone your fork

git clone https://github.com/yourusername/HEALTH-SCHEME-CONNECT.git

3. Create a branch

git checkout -b feature-name

4. Make your changes
5. Commit

git commit -m "Added new feature"

6. Push

git push origin feature-name

7. Create a Pull Request

⸻

🐛 Reporting Issues

When creating an Issue include:

* Description
* Steps to Reproduce
* Expected Behaviour
* Screenshots (if available)

⸻

🌍 Open Source Contributions

We welcome contributions in:

* Bug Fixes
* UI Improvements
* Performance Optimization
* Documentation
* Accessibility
* AWS Deployment
* Database Optimization
* Testing
* New Government Schemes
* Hospital Data Improvements

⸻

📜 License

This project is licensed under the MIT License.

⸻

👨‍💻 Author

Sathvik Velapaka

If you found this project useful, consider giving it a ⭐ and contributing to make healthcare information more accessible.
