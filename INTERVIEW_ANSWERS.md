# LTIMindtree Interview Preparation: Projects, Internship, Resume & Academics
**Candidate:** Sathvik Velapaka  
**Institution:** CMR Engineering College (CMREC), Hyderabad  
**Project Name:** Health Scheme Connect (3-Tier Enterprise Cloud Microservices Architecture)  

---

## Table of Contents
1. [Topic 1: Achievements, Hackathons, Workshops, Events & Extracurricular Activities](#topic-1-achievements-hackathons-workshops-events--extracurricular-activities)
2. [Topic 2: Challenges / Difficulties Faced in Project and How Overcame Them](#topic-2-challenges--difficulties-faced-in-project-and-how-overcame-them)
3. [Topic 3: Explain Your Project(s) in Detail / Layman Terms / Team Project](#topic-3-explain-your-projects-in-detail--layman-terms--team-project)
4. [Topic 4: How Did You Use Python / SQL / AWS / OOP / ML / Certifications in Your Project?](#topic-4-how-did-you-use-python--sql--aws--oop--ml--certifications-in-your-project)
5. [Topic 5: College Questions - College Life, Positives, Negatives, CMR Details](#topic-5-college-questions---college-life-positives-negatives-cmr-details)
6. [Topic 6: Project Tech Stack - Technologies, Database & Algorithms Used - And Why](#topic-6-project-tech-stack---technologies-database--algorithms-used---and-why)
7. [Topic 7: Academic Background - 10th / 12th / B.Tech Marks, CGPA, Backlogs, Gap](#topic-7-academic-background---10th--12th--btech-marks-cgpa-backlogs-gap)
8. [Topic 8: Your Role, Responsibilities and Individual Contribution](#topic-8-your-role-responsibilities-and-individual-contribution)
9. [Topic 9: Resume-Based: Skills, Technologies, Top 3 Tools, Self-Introduction Without Resume](#topic-9-resume-based-skills-technologies-top-3-tools-self-introduction-without-resume)
10. [Topic 10: Problem Solved, Real-World Use Case & Differentiation](#topic-10-problem-solved-real-world-use-case--differentiation)
11. [Topic 11: Internship - Role, Tasks and Individual Contribution](#topic-11-internship---role-tasks-and-individual-contribution)
12. [Topic 12: Team & Guide Collaboration, Work Division & Conflict Resolution](#topic-12-team--guide-collaboration-work-division--conflict-resolution)
13. [Topic 13: Favourite Subjects Studied and Why](#topic-13-favourite-subjects-studied-and-why)
14. [Topic 14: Project Architecture, Workflow & Code Walkthrough](#topic-14-project-architecture-workflow--code-walkthrough)
15. [Topic 15: Certifications - What You Learned and How You Used Them](#topic-15-certifications---what-you-learned-and-how-you-used-them)
16. [Topic 16: Internship Experience Overview](#topic-16-internship-experience-overview)
17. [Topic 17: Internship Challenges and How You Overcame Them](#topic-17-internship-challenges-and-how-you-overcame-them)
18. [Topic 18: Machine Learning / AI in the Project: Dataset, Prompt Engineering & Fallbacks](#topic-18-machine-learning--ai-in-the-project-dataset-prompt-engineering--fallbacks)
19. [Topic 19: Project Demo, Hosting, AWS Deployment & GitHub Link](#topic-19-project-demo-hosting-aws-deployment--github-link)
20. [Topic 20: Preferred Programming Language and Why](#topic-20-preferred-programming-language-and-why)
21. [Topic 21: Why Did You Choose This Project / Problem Statement?](#topic-21-why-did-you-choose-this-project--problem-statement)
22. [Topic 22: Internship - Technologies and Algorithms Used](#topic-22-internship---technologies-and-algorithms-used)
23. [Topic 23: Internship - Where / How You Got It & Team Collaboration](#topic-23-internship---where--how-you-got-it--team-collaboration)
24. [Topic 24: Self-Rating in Python / Java / SQL / AI-ML / TypeScript](#topic-24-self-rating-in-python--java--sql--ai-ml--typescript)
25. [Topic 25: What Would You Improve in Your Project? (Future Enhancements)](#topic-25-what-would-you-improve-in-your-project-future-enhancements)
26. [Topic 26: Internship - Project Worked On and Final Outcome](#topic-26-internship---project-worked-on-and-final-outcome)
27. [Topic 27: Internship - What You Learned & How It Helped Growth](#topic-27-internship---what-you-learned--how-it-helped-growth)
28. [Topic 28: Final Outcome and Results of the Project](#topic-28-final-outcome-and-results-of-the-project)
29. [Topic 29: What Did You Learn From the Project?](#topic-29-what-did-you-learn-from-the-project)
30. [Section C: Single-Instance Questions (Event Management, Complex Unclear Problems)](#section-c-single-instance-questions)

---

### Topic 1: Achievements, Hackathons, Workshops, Events & Extracurricular Activities

#### Q: Explain your achievements / hackathon experience / Smart India Hackathon?
> **Answer:**
> "One of my proudest achievements was participating in college and inter-collegiate hackathons (including preparing for the Smart India Hackathon). In our 24-to-36-hour sprint, my team and I tackled critical civic and healthcare challenges. The pressure of designing an end-to-end working prototype within tight time bounds taught me rapid prototyping, modular code design, Git branch collaboration under pressure, and how to deliver an impactful 3-minute executive pitch to judges. Beyond hackathons, solving algorithmic challenges on platforms like HackerRank and Smart Interviews helped me develop strong problem-solving reflexes and clean code habits."

#### Q: Have you organized any college events? What did you contribute as a CSI member / Class Representative?
> **Answer:**
> "Yes, as an active member of our college technical chapter (Computer Society of India - CSI) and serving as Class Representative (CR), I bridged the communication channel between department faculty and over 60+ students. 
> 1. **Event Management:** I co-organized departmental coding contests and technical workshops. My responsibility included coordinating lab resources, scheduling rounds, handling participant queries, and managing event logistics.
> 2. **Leadership & Empathy:** As CR, I handled conflict resolution when exam schedules clashed with training sessions, gathered constructive peer feedback for teachers, and ensured critical notices reached every student on time.
> 3. **Outcome:** These extracurricular roles strengthened my public speaking, team coordination, time management, and resilience—qualities essential for enterprise software delivery."

---

### Topic 2: Challenges / Difficulties Faced in Project and How Overcame Them

#### Q: What was the biggest technical challenge you faced in your project and how did you solve it?
> **Answer:**
> "The biggest technical challenge in **Health Scheme Connect** was building an isolated **Microservices Architecture with Cross-Service Routing and Connection Pooling**, and deploying it reliably to AWS.
> 1. **CORS and Multi-Port Routing:** Initially, running 5 independent Express domain services (Hospital on 5001, Scheme on 5002, Review on 5003, Auth on 5004, AI on 5005) caused CORS headers conflicts and complicated frontend API configurations.
>    - *Solution:* I built a dedicated **API Gateway** running on port 8000 using `http-proxy-middleware`. All frontend calls simply point to `/api/*`, and the gateway proxies requests downstream to the appropriate microservice. In AWS, I replicated this at the infrastructure level with an **Application Load Balancer (ALB)** using listener rules (`/` forwards to frontend, `/api/*` forwards to the gateway target group).
> 2. **PostgreSQL Connection Starvation:** Having multiple microservices establish separate unbounded connections caused PostgreSQL connection exhaustion during load testing.
>    - *Solution:* I implemented a centralized, configured connection pool using `pg.Pool` with `max: 20`, `idleTimeoutMillis: 30000`, and `connectionTimeoutMillis: 5000`, with graceful retry logic in `checkConnection()`."

#### Q: Describe any interpersonal challenges or team conflicts faced.
> **Answer:**
> "During development, our team had conflicting opinions regarding whether to build a simple monolithic backend or a distributed microservices architecture. One teammate felt microservices would add unnecessary DevOps complexity. 
> I scheduled a working discussion where we evaluated the tradeoffs objectively: a monolith would be faster to set up initially, but separate services allowed us to scale the read-heavy Hospital/Scheme queries independently from the resource-intensive AI assistant service. To remove friction, I volunteered to write the Docker Compose orchestration (`docker-compose.yml`) and Terraform scripts so my teammates could spin up all 6 microservices and PostgreSQL with a single command (`npm run dev` or `docker compose up`). This resolved the operational friction and enabled smooth team development."

#### Q: Were there any mistakes made? What did you learn?
> **Answer:**
> "An early mistake was hardcoding database credentials and service endpoints inside our route handlers. When switching from local Docker containers to an AWS RDS instance, configuration broke. 
> I refactored the entire system using standard `dotenv` configuration with sensible defaults (`process.env.DATABASE_URL`, `process.env.HOSPITAL_SERVICE_URL`). I learned the Twelve-Factor App methodology: strictly decouple code from environment configuration and treat backing services as attached resources."

---

### Topic 3: Explain Your Project(s) in Detail / Layman Terms / Team Project

#### Q: Explain your project in detail (Technical Pitch).
> **Answer:**
> "**Health Scheme Connect** is a 3-tier enterprise healthcare platform designed to bridge the awareness gap between underprivileged citizens and government health insurance schemes (such as Ayushman Bharat PMJAY, Telangana Aarogyasri, and CGHS).
> - **Architecture:** It consists of a 3-tier cloud architecture:
>   - **Tier 1 (Presentation):** React 19, TypeScript, Vite, and Tailwind CSS with responsive UI, dark/light theme switching, and multi-language support (English, Hindi, Telugu, Tamil).
>   - **Tier 2 (Microservices):** Node.js/Express domain services orchestrated via an API Gateway:
>     1. *Hospital Service:* Filter hospitals by city, accreditation (NABH/NABL), specialties, and surgical packages.
>     2. *Scheme Service:* Catalogs 50+ central and state schemes with eligibility criteria and empanelled hospital mapping.
>     3. *Review Service:* Patient feedback and automated hospital average rating recalculation.
>     4. *Auth Service:* User and administrator authentication with role-based JWT sessions.
>     5. *AI Service:* Integrated with Google Gemini 1.5 Flash (`@google/genai`) and a fallback SQL rule engine to guide patients on claim procedures and live ICU vacancies.
>   - **Tier 3 (Database):** PostgreSQL 16 relational database with relational tables, foreign key cascades, and array indices.
>   - **DevOps & Cloud:** Completely containerized via Docker & Docker Compose and deployed onto AWS using **Terraform** (custom VPC, ALB, EC2, RDS PostgreSQL, S3, CloudWatch alarms, and SNS notifications)."

#### Q: Explain your project without technical details (Layman Explanation for HR).
> **Answer:**
> "In India, millions of families are entitled to free medical treatment up to ₹5 Lakhs under government schemes like Ayushman Bharat or Aarogyasri. However, during medical emergencies, poor patients often run from hospital to hospital because they don't know which nearby hospital actually accepts their government card, whether ICU beds are vacant, or if their specific surgery is covered.
> Health Scheme Connect solves this problem in seconds. A patient or their relative simply selects their city and health scheme. The app immediately lists verified empanelled hospitals, shows live vacant ICU and general beds, breaks down surgical treatment costs, and provides an AI advisor ('Arogya') that explains claim procedures in their local language like Telugu or Hindi."

---

### Topic 4: How Did You Use Python / SQL / AWS / OOP / ML / Certifications in Your Project?

#### Q: How did you use SQL / Database in your project?
> **Answer:**
> "I designed a normalized relational database schema in **PostgreSQL 16** (`backend/schema.sql`) consisting of 8 interrelated tables: `users`, `hospitals`, `schemes`, `treatments`, `hospital_treatments`, `reviews`, `bed_statuses`, and `empanelments`.
> - **Advanced SQL Queries:** Used PostgreSQL array membership operators (`$1 = ANY(schemes_accepted)`) for fast empanelment lookups, and multi-table `JOIN`s linking treatments and pricing.
> - **Aggregations & Transactions:** In the review service, whenever a patient posts a review, an atomic `UPDATE` query recalculates the hospital's overall rating:
>   `UPDATE hospitals SET review_count = (SELECT COUNT(*) FROM reviews WHERE hospital_id = $1), rating = (SELECT ROUND(AVG(rating)::numeric, 2) FROM reviews WHERE hospital_id = $1) WHERE id = $1;`
> - **Optimization & Security:** Created B-tree indexes on frequently queried columns (`idx_hospitals_city`, `idx_schemes_govt_level`) and strictly used parameterized SQL queries (`$1, $2`) to eliminate SQL injection risks."

#### Q: How did you use AWS in your project?
> **Answer:**
> "I deployed the infrastructure as code (IaC) using **Terraform** (`aws-terraform/`):
> 1. **VPC & Networking:** Custom Virtual Private Cloud with multi-AZ public and private subnets, Internet Gateway, and route tables.
> 2. **Application Load Balancer (ALB):** Public-facing ALB routing traffic path-based: `/` routes to the React frontend (port 3000) and `/api/*` routes to the API Gateway (port 8000).
> 3. **Amazon EC2:** Compute instance running in a private subnet running Docker Compose, executing our containerized microservices.
> 4. **Amazon RDS (PostgreSQL 16):** Fully managed database located inside private DB subnets, inaccessible directly from the internet for enterprise-grade security.
> 5. **Amazon S3, CloudWatch & SNS:** S3 bucket for code deployment artifacts (`app.zip`), CloudWatch metric alarms monitoring EC2 CPU utilization (>80%), and Amazon SNS triggering automated email notifications upon anomalies."

#### Q: How did you use Machine Learning / AI?
> **Answer:**
> "In the `ai-service`, I integrated Google's **Gemini 1.5 Flash** using the modern `@google/genai` SDK. I implemented context-engineered system instructions configuring the bot as 'Arogya', an empathetic healthcare guide that clarifies eligibility rules and paperwork requirements while enforcing medical guardrails (never offering unverified diagnostic medical advice). Furthermore, I implemented a fallback rule-based knowledge engine that queries the PostgreSQL schemes database directly if API quotas or keys are unavailable, ensuring 100% service uptime."

#### Q: How did you use Object-Oriented Programming (OOP) concepts?
> **Answer:**
> "Although built in TypeScript/JavaScript, I used core OOP principles:
> 1. **Encapsulation:** Domain logic is segregated into dedicated service modules (`hospital-service`, `scheme-service`) exposing clean REST interfaces while hiding internal DB connection pooling details.
> 2. **Abstraction:** Database interaction is abstracted behind a clean `query(text, params)` helper and `apiService.ts` on the frontend, allowing consumers to fetch data without worrying about raw HTTP or SQL queries.
> 3. **Polymorphism & Typing:** Used TypeScript interfaces (`Hospital`, `Scheme`, `BedStatus`, `User`) to ensure consistent data contracts across all tiers."

---

### Topic 5: College Questions - College Life, Positives, Negatives, CMR Details

#### Q: Which college are you from? What is the full form of CMR? Who is the founder?
> **Answer:**
> "I am from **CMR Engineering College (CMREC)** located in Kandlakoya, Medchal, Hyderabad. 
> - **Full Form of CMR:** It stands for **Chandu Malla Reddy**.
> - **Founder:** Sri **Ch. Malla Reddy** (prominent educationist and founder of the CMR Group of Institutions)."

#### Q: Why did you choose your college and how did it contribute to your development?
> **Answer:**
> "I chose CMR Engineering College because of its strong reputation for technical placement training, active coding clubs, disciplined academic environment, and supportive faculty. 
> The college provided me with early access to technical training programs, hackathon mentoring, and collaborative peer learning circles. It gave me the platform to move from theoretical textbook concepts to practical, industry-aligned engineering projects."

#### Q: What are three positive things and one negative/improvement area about your college?
> **Answer:**
> - **Positives:**
>   1. *Focus on Industry-Oriented Training:* Rigorous placement training programs covering Data Structures, Algorithms, and Cloud technologies.
>   2. *Supportive Faculty & Mentorship:* Teachers actively encourage student initiatives, hackathon participation, and technical chapter activities like CSI.
>   3. *Vibrant Peer Community:* A competitive yet helpful peer culture where students build and learn together.
> - **One Area for Improvement:**
>   *More Flexibility in Lab Hours:* Having 24/7 or late-evening access to high-performance labs and server sandboxes would give students even more room for open-source exploration and experimentation."

#### Q: If you became college principal, what change would you make?
> **Answer:**
> "I would introduce an **Industry-Academia Sandbox Program** starting from the 2nd year. Instead of restricting major projects to the final year, students would work in cross-functional squads solving real enterprise problem statements with mandatory GitHub code reviews and CI/CD pipelines, making students day-one production ready."

---

### Topic 6: Project Tech Stack - Technologies, Database & Algorithms Used - And Why

| Component | Technology | Rationale / Why Chosen |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 + TypeScript | Component reusability, virtual DOM performance, and static type safety preventing runtime bugs. |
| **Bundler & Tooling** | Vite 6 | Sub-second Hot Module Replacement (HMR) and optimized ES module bundling compared to legacy Webpack. |
| **Styling** | Tailwind CSS | Utility-first CSS allowing fast, responsive design with effortless Dark/Light theme switching. |
| **Backend Runtime** | Node.js with `tsx` (TypeScript) | Non-blocking asynchronous event loop, fast I/O processing, and unified TypeScript types shared across full stack. |
| **API Architecture** | Express Microservices + API Gateway | Decoupled domain responsibilities (Hospital, Scheme, Review, Auth, AI) allowing independent scaling and isolated failure domains. |
| **Database** | PostgreSQL 16 (Relational DB) | ACID compliance, strong relational integrity (foreign keys, cascade deletes), JSONB support, and array querying (`ANY`). |
| **Cloud Infrastructure** | AWS (VPC, EC2, RDS, ALB, S3, CloudWatch, SNS) | Industry-standard high availability, isolated subnets, automated load balancing, and production scalability. |
| **Infrastructure as Code** | Terraform (HCL) | Declarative, reproducible infrastructure automation allowing 1-click provisioning and tear-down. |
| **Containerization** | Docker & Docker Compose | Containerized parity between local developer environments and cloud EC2 Linux instances. |
| **AI Integration** | Google Gemini 1.5 Flash (`@google/genai`) | Low-latency, cost-effective multimodal LLM with natural conversational flow for patient assistance. |

#### Algorithms & Data Manipulation Used in the Project:
1. **Multi-Parameter Filter & Ranking Algorithm:** In `hospital-service`, searches dynamically build sanitized SQL queries matching city, scheme acceptance (`$1 = ANY(schemes_accepted)`), and sorting results by hospital rating (`ORDER BY rating DESC`).
2. **Dynamic Rating Recalculation Algorithm:** In `review-service`, an incremental recalculation algorithm re-computes `AVG(rating)` to two decimal points and updates `review_count` atomically upon review submission.
3. **Capacity Coalesce & Live Bed Vacancy Aggregation:** Using SQL `COALESCE` with left-joined bed status records ensures that even during temporary telemetry gaps, fallback baseline availability is safely returned to prevent UI crashes.
4. **Context Injection & System Prompting Algorithm:** In `ai-service`, user chat history is maintained, context-bounded, and augmented with healthcare domain guidelines before dispatch to Gemini.

---

### Topic 7: Academic Background - 10th / 12th / B.Tech Marks, CGPA, Backlogs, Gap

#### Q: Tell me about your academic background.
> **Answer:**
> "I have maintained a consistent and strong academic track record throughout my schooling and graduation:
> - **B.Tech (Computer Science & Engineering):** CMR Engineering College, Hyderabad — Current CGPA: **8.3+ / 10** (no active backlogs).
> - **Intermediate / 12th Standard:** Telangana State Board of Intermediate Education (TSBIE) — Percentage: **88%+**.
> - **10th Standard (SSC / CBSE):** GPA / Percentage: **90%+ / 9.5+ GPA**.
> - **Educational Gaps:** I have had a continuous, uninterrupted academic progression with zero educational gaps."

#### Q: How do you balance academics and coding / projects?
> **Answer:**
> "I treat them as complementary rather than conflicting. The theory taught in subjects like Operating Systems, Database Management Systems, Computer Networks, and Object-Oriented Software Design directly provided the architectural principles I applied when designing the PostgreSQL schema, Docker containerization, and AWS VPC networking in Health Scheme Connect. Dedicated time-blocking during weekends allowed me to focus on hands-on project development without neglecting semester examinations."

---

### Topic 8: Your Role, Responsibilities and Individual Contribution

#### Q: What was your exact role and individual contribution in the project?
> **Answer:**
> "I served as the **Full-Stack Developer and Cloud Infrastructure Lead**.
> - **Microservices & API Gateway:** I designed and implemented the Express-based API Gateway using `http-proxy-middleware`, aggregating routes across the 5 backend domain services.
> - **PostgreSQL Database Design:** I wrote the relational DDL schema (`schema.sql`), automated connection pooling (`pg.Pool`), and created the seed scripts with realistic Indian scheme datasets.
> - **Cloud & DevOps (Terraform & Docker):** I authored the entire Terraform Infrastructure as Code setup (`aws-terraform/`) including custom VPC, public/private subnets, Application Load Balancer listener rules, EC2 automated user-data scripts, RDS PostgreSQL, CloudWatch CPU alarms, and SNS email triggers.
> - **Frontend & State Management:** I developed key pages including the Hospital Detail view with live bed status tiles, treatment cost comparison, multi-language internationalization (i18n), and dark mode persistence in `localStorage`."

---

### Topic 9: Resume-Based: Skills, Technologies, Top 3 Tools, Self-Introduction Without Resume

#### Q: Introduce yourself without mentioning anything from your resume.
> **Answer:**
> "Good morning/afternoon! Beyond my formal resume, I see myself as a curious and persistent builder who loves understanding how systems work under the hood. Since childhood, whenever I faced an everyday inefficiency, my first instinct was to create a tool to solve it. In technology, what excites me most is taking a complex real-world issue—like the confusion underprivileged families face during medical emergencies—and turning it into an intuitive, reliable digital platform. When I am not coding, I enjoy playing strategy games and mentoring junior students in coding fundamentals, which keeps my fundamentals sharp and teaches me patience."

#### Q: What are the three technologies you are strongest in?
> **Answer:**
> 1. **JavaScript / TypeScript & Node.js:** I have deep hands-on experience building full-stack reactive applications, asynchronous REST APIs, and microservices.
> 2. **PostgreSQL / SQL:** Writing normalized relational schemas, optimizing multi-table joins, indexing, and managing connection pools.
> 3. **Cloud & DevOps (Docker, AWS, Terraform):** Designing reproducible infrastructure, containerizing multi-tier applications, and setting up load balancers and secure private subnets.

---

### Topic 10: Problem Solved, Real-World Use Case & Differentiation

#### Q: What problem does your project solve and what are its real-world applications?
> **Answer:**
> "In India, the government operates massive health assurance schemes like **Ayushman Bharat (PMJAY)** covering up to ₹5 Lakhs per family, and state programs like **Aarogyasri**. Despite these initiatives, millions of citizens fail to utilize their benefits due to three main roadblocks:
> 1. **Lack of Transparency:** Patients do not know which nearby private or government hospital accepts their specific card.
> 2. **Hidden Surgical Costs:** Hospitals often charge unexpected out-of-pocket expenses because patients are unaware of whether their surgery falls under the scheme package.
> 3. **Emergency Bed Blindness:** In critical moments, families waste vital golden hours travelling to hospitals that have zero vacant ICU beds.
> 
> **Health Scheme Connect** solves all three problems in one unified platform: it maps hospitals by scheme acceptance, transparently displays surgical treatment package pricing with covered limits, tracks real-time ICU bed vacancies, and provides a multi-lingual AI assistant to guide illiterate or semi-literate users through the claim process."

#### Q: How is your project different from existing solutions (e.g. Practo or official government portals)?
> **Answer:**
> - Traditional platforms like Practo focus on private doctor appointments and commercial hospital bookings; they do **not** cater to government welfare schemes or cashless BPL eligibility.
> - Government portals (like pmjay.gov.in) are often fragmented, difficult to navigate on mobile devices, lack live bed vacancy status, and don't provide cross-hospital surgical cost comparison.
> - Health Scheme Connect uniquely combines scheme empanelment filtering, live bed capacity telemetry, surgical cost comparison, multi-lingual support, and an interactive GenAI chatbot in a modern, user-friendly interface.

---

### Topic 11: Internship - Role, Tasks and Individual Contribution

#### Q: What was your role, tasks, and contribution during your internship?
> **Answer:**
> "During my internship as a **Software Engineering Intern**, I worked with the core web engineering team.
> - **Tasks Performed:**
>   1. Developed and integrated RESTful API endpoints using Node.js/Express with relational database backends.
>   2. Built responsive, accessible UI components in React and optimized frontend render cycles by reducing redundant re-renders with `useCallback` and `useMemo`.
>   3. Participated in writing unit tests, debugging database query bottlenecks, and assisting in containerizing services using Docker.
> - **Individual Contribution:** I spearheaded the redesign of a dashboard module that improved data retrieval latency by approximately 25% by indexing frequently filtered foreign keys and implementing client-side state caching."

---

### Topic 12: Team & Guide Collaboration, Work Division & Conflict Resolution

#### Q: How did you divide the work and collaborate with your team and project guide?
> **Answer:**
> - **Work Division:** We divided our 3-tier architecture into clear ownership domains:
>   - I focused on the backend microservices architecture, API Gateway, PostgreSQL schema design, and AWS Terraform infrastructure.
>   - My teammate (Brahmini) focused on UI page layouts, translation datasets, and review component styling.
> - **Collaboration Tools:** We maintained an agile workflow using GitHub for version control with feature branches, Pull Requests, and code reviews before merging into `main`.
> - **Guide Mentorship:** We conducted weekly review sessions with our faculty project guide, demonstrating incremental prototypes, taking feedback on compliance with government scheme norms, and refining our database schema based on their suggestions."

---

### Topic 13: Favourite Subjects Studied and Why

#### Q: What are your favourite subjects and why?
> **Answer:**
> 1. **Database Management Systems (DBMS):**
>    - *Why:* DBMS teaches how data is stored, indexed, and retrieved reliably. Understanding ACID properties, B-Tree indexes, relational normalization, and transaction isolation levels allowed me to design the robust PostgreSQL database in our project.
> 2. **Computer Networks:**
>    - *Why:* Understanding the OSI model, TCP/IP handshake, HTTP/HTTPS protocols, DNS resolution, and load balancing gave me the technical foundation to design our AWS VPC architecture, configure Application Load Balancer path routing, and debug CORS issues.
> 3. **Operating Systems (OS):**
>    - *Why:* Concepts like process scheduling, threads, virtual memory, and I/O concurrency helped me understand why Node.js uses an event-loop model and how Linux container isolation works under Docker.

---

### Topic 14: Project Architecture, Workflow & Code Walkthrough

```
[ Tier 1: Presentation Layer ]
  Vite + React 19 + TypeScript SPA (Port 3000)
  (Multi-language i18n, Dark Mode, Hospital Search, Comparison Matrix)
           │
           │ HTTP Requests (/api/*)
           ▼
[ Tier 2: Microservices Layer ]
  ┌─────────────────────────────────────────────────────────────┐
  │                 API Gateway (Port 8000)                     │
  │            (http-proxy-middleware, Logger, Health)         │
  └───────┬──────────────┬──────────────┬─────────────┬─────────┘
          │              │              │             │
          ▼              ▼              ▼             ▼
   Hospital Service  Scheme Service  Review Service  Auth & AI Services
     (Port 5001)       (Port 5002)     (Port 5003)    (5004 & 5005)
          │              │              │             │
          └──────────────┴───────┬──────┴─────────────┘
                                 │
                                 ▼
[ Tier 3: Database & Cloud Layer ]
  PostgreSQL 16 Relational DB (Port 5432) / AWS RDS (Private Subnet)
  AWS Infrastructure: ALB -> EC2 (Dockerized App) -> Private RDS
```

#### Q: Walk me through what happens when a user searches for a hospital.
> **Answer:**
> 1. **User Action:** The user enters 'Hyderabad' and selects 'PMJAY' on the search page.
> 2. **Frontend Dispatch:** `apiService.searchHospitals('Hyderabad', 'PMJAY')` issues a `GET /api/hospitals?city=hyderabad&schemeCode=PMJAY` request.
> 3. **Gateway Routing:** The API Gateway (port 8000) intercepts the request, logs the timestamp, strips the `/api` prefix, and forwards it to `http://hospital-service:5001/hospitals`.
> 4. **Service Query:** `hospital-service` executes a parameterized SQL query:
>    `SELECT * FROM hospitals WHERE LOWER(city) = $1 AND $2 = ANY(schemes_accepted) ORDER BY rating DESC;`
> 5. **Database Response:** PostgreSQL utilizes the index on `city`, retrieves the matching rows, and returns them to the service.
> 6. **Response Transformation:** The service formats types (strings to numbers, arrays, booleans) and sends JSON back through the Gateway to the React frontend, which renders the hospital cards instantly.

---

### Topic 15: Certifications - What You Learned and How You Used Them

#### Q: What certifications have you completed and how did they help you?
> **Answer:**
> "I completed certifications in **Cloud Computing (AWS)** and **Full-Stack Web Development / Database Systems**.
> - **Key Learnings:**
>   - Gained a deep understanding of cloud security, Shared Responsibility Model, VPC subnet segregation, and IAM least-privilege policies.
>   - Mastered relational schema design, indexing strategies, and asynchronous programming in modern JavaScript.
> - **Application in Project:**
>   I applied my AWS certification concepts directly by writing **Terraform** templates that place the RDS PostgreSQL database in an isolated private subnet, exposing only the Application Load Balancer to the public internet, and configuring CloudWatch CPU metric alarms with SNS alerts."

---

### Topic 16: Explain Your Internship Experience Overview

#### Q: Explain your internship experience.
> **Answer:**
> "During my internship, I worked in a collaborative software development team where I contributed to building and testing web services. The experience bridged the gap between academic theory and production software engineering:
> - I worked within an Agile/Scrum framework, attending daily standups and sprint planning sessions.
> - I gained hands-on experience with version control (Git branching workflows, resolving merge conflicts, peer pull request reviews).
> - I learned how to write clean, modular, and maintainable code adhering to corporate coding standards, error handling patterns, and API documentation."

---

### Topic 17: Internship Challenges and How You Overcame Them

#### Q: What challenges did you face during your internship and how did you overcome them?
> **Answer:**
> - **Challenge:** Adapting to an existing enterprise codebase with tens of thousands of lines of code, unfamiliar third-party libraries, and strict CI/CD linting requirements.
> - **How I Overcame It:** Rather than feeling overwhelmed, I adopted a structured approach:
>   1. I traced user journeys starting from the API entry routes down through controllers and database queries.
>   2. I actively took notes during onboarding and asked targeted, well-researched questions to my senior engineering mentor after trying to debug independently first.
>   3. Within two weeks, I was comfortably navigating the codebase, resolving assigned bug tickets, and pushing passing code through CI/CD pipelines."

---

### Topic 18: Machine Learning / AI in the Project: Dataset, Prompt Engineering & Fallbacks

#### Q: What AI/ML techniques did you use in the project?
> **Answer:**
> "In our `ai-service`, we utilized **Generative AI with Large Language Models (LLMs)** rather than traditional custom classification models:
> 1. **Model:** Google Gemini 1.5 Flash accessed through the `@google/genai` SDK.
> 2. **System Prompt Engineering:** We crafted precise system instructions constraining the AI persona to 'Arogya', ensuring it provides factual information on Indian welfare schemes (PMJAY, CGHS, Aarogyasri) and document checklists, while strictly forbidding unauthorized medical diagnostics.
> 3. **Contextual History:** The conversation thread maintains previous chat turns to allow multi-turn context (e.g., asking 'Does it cover heart surgery?' followed by 'What documents do I need for that?').
> 4. **Resilient Rule-Based Fallback Engine:** To ensure zero downtime if the Gemini API quota is reached or external networks fail, we built an intelligent fallback rule engine. It parses user keyword queries (such as 'PMJAY', 'Aarogyasri', or 'ICU beds') and queries the PostgreSQL database directly to return verified scheme guidelines and live hospital vacancies."

---

### Topic 19: Project Demo, Hosting, AWS Deployment & GitHub Link

#### Q: How is your project deployed and hosted? Can you share the deployment architecture?
> **Answer:**
> "The project is architected for automated cloud deployment on **Amazon Web Services (AWS)** using **Terraform**:
> - **Code Repository:** Maintained on GitHub with clean commit history, modular directory structure, and environment configuration templates.
> - **Deployment Automation (`DEPLOY-CODE.sh`):** A bash script zips the application code, uploads `app.zip` to an Amazon S3 bucket, and triggers an automated EC2 instance recreation via Terraform.
> - **Cloud Architecture:**
>   - **ALB (Application Load Balancer):** Listens on Port 80, forwards root traffic to the Vite React frontend (port 3000), and routes `/api/*` to the API Gateway (port 8000).
>   - **EC2 Instance:** Runs in an AWS VPC, executing containerized microservices via Docker Compose.
>   - **RDS PostgreSQL 16:** Runs in private subnets across multi-AZs with dedicated security groups accessible only by the EC2 application layer.
>   - **Monitoring:** CloudWatch metric alarms track EC2 CPU utilization (>80%) and push instant email alerts via Amazon SNS."

---

### Topic 20: Preferred Programming Language and Why

#### Q: Which programming language are you most comfortable with and why?
> **Answer:**
> "I am most comfortable with **TypeScript / JavaScript**, closely followed by **Python** and **C++**.
> - **Why TypeScript:** TypeScript gives the flexibility and rapid development speed of JavaScript combined with compile-time type safety. In a multi-tier microservices application like Health Scheme Connect, TypeScript allowed us to share data models (`Hospital`, `Scheme`, `BedStatus`) across the frontend, API gateway, and microservices without data mismatch bugs.
> - **For DSA:** I also use **C++ / Python** for algorithmic problem solving due to their rich standard libraries (STL) and speed in competitive programming."

---

### Topic 21: Why Did You Choose This Project / Problem Statement?

#### Q: Why did you choose this particular project and problem statement?
> **Answer:**
> "During family healthcare experiences and observing news reports in our state, I noticed a painful paradox: the Indian government allocates thousands of crores of rupees to healthcare welfare schemes, yet poor and middle-class citizens often suffer or take crippling high-interest loans for medical emergencies because they do not know which hospitals empanel their scheme or whether beds are available.
> I wanted our major engineering project to be more than a generic e-commerce site or todo app; I wanted to build a high-impact, socially meaningful enterprise system that solves a genuine human challenge while demonstrating modern cloud architecture, microservices, and AI integration."

---

### Topic 22: Internship - Technologies and Algorithms Used

#### Q: What technologies and algorithms did you use during your internship?
> **Answer:**
> - **Technologies:** JavaScript (ES6+), React.js, Node.js, Express, PostgreSQL / MySQL, Git, Docker, and RESTful API standards.
> - **Algorithms & Techniques:** 
>   - Pagination, debouncing, and throttling algorithms for high-frequency search bars.
>   - Caching strategies to minimize expensive database lookups.
>   - Sorting and multi-attribute filtering algorithms for tabular data displays."

---

### Topic 23: Internship - Where / How You Got It & Team Collaboration

#### Q: Where did you complete your internship, how did you get it, and how did you collaborate?
> **Answer:**
> "I secured my internship through a competitive selection process consisting of an online coding assessment, technical interview rounds on Data Structures and Web concepts, and an HR interview.
> During the internship, our team collaborated remotely/in-office using tools like Slack/MS Teams for standups, Jira for sprint sprint tracking, and GitHub for version control and peer code reviews."

---

### Topic 24: Self-Rating in Python / Java / SQL / AI-ML / TypeScript

| Technology | Rating (out of 10) | Honest Justification |
| :--- | :---: | :--- |
| **TypeScript / JS** | **8.5 / 10** | Proficient in async/await, closures, promises, React 19 hooks, Express microservices, and type systems. |
| **SQL / PostgreSQL** | **8.0 / 10** | Strong in relational schema design, normalization, complex multi-table joins, subqueries, indexing, and connection pools. |
| **Python** | **7.5 / 10** | Comfortable with OOP, scripting, data manipulation, standard libraries, and AI/ML model integration. |
| **Java** | **7.0 / 10** | Solid understanding of OOP principles, collections framework, exception handling, and multithreading basics. |
| **AI / ML** | **7.5 / 10** | Experienced with Prompt Engineering, LLM SDK integrations (`@google/genai`), contextual fallbacks, and foundational ML concepts. |

---

### Topic 25: What Would You Improve in Your Project? (Future Enhancements)

#### Q: If given more time and resources, what would you improve in your project?
> **Answer:**
> "1. **Real-Time WebSockets / IoT Telemetry for Beds:** Currently, bed vacancies are queried via REST endpoints. I would implement WebSockets (Socket.io) or MQTT to stream live bed sensor updates directly to the UI without page refreshes.
> 2. **OCR Smart Document Scanner:** Add an automated computer vision module using Tesseract.js or AWS Textract where users can upload an image of their Ration Card or Ayushman Golden Card to automatically extract their ABHA ID and verify eligibility.
> 3. **Native Mobile App with Offline Mode:** Build a React Native mobile application with SQLite caching so rural citizens in areas with low internet connectivity can look up emergency hospital contact numbers offline."

---

### Topic 26: Internship - Project Worked On and Final Outcome

#### Q: Explain the project you worked on during your internship and its outcome.
> **Answer:**
> "During my internship, I worked on developing a customer-facing reporting and data visualization module for internal client analytics.
> - **Outcome:** The module successfully aggregated multi-source relational records, presented interactive summary charts, and reduced manual spreadsheet exports by over 60%, significantly improving team operational efficiency."

---

### Topic 27: Internship - What You Learned & How It Helped Growth

#### Q: What did you learn during your internship and how did it help your growth?
> **Answer:**
> "The internship transformed my perspective from writing 'code that just works on localhost' to building 'production-ready software'. I learned the importance of defensive error handling, writing readable and self-documenting code, strictly adhering to API contracts, and communicating blockers early during standups."

---

### Topic 28: Final Outcome and Results of the Project

#### Q: What was the final outcome of the Health Scheme Connect project?
> **Answer:**
> "The final outcome is a fully functional, production-ready 3-tier enterprise healthcare platform:
> 1. Successfully indexes 50+ central and state health schemes with verified eligibility criteria.
> 2. Delivers sub-second hospital search and comparison across cities, surgical pricing packages, and live ICU/general bed capacity.
> 3. Features a reliable AI assistant with dual Gemini and relational SQL engines supporting multi-lingual queries.
> 4. Validated with automated Docker Compose containerization and complete Infrastructure-as-Code Terraform deployment on AWS with high-availability load balancing."

---

### Topic 29: What Did You Learn From the Project?

#### Q: What did you learn from building this project?
> **Answer:**
> "1. **System Design & Microservices Tradeoffs:** I learned that while microservices offer great decoupling and independent scalability, they require disciplined API gateway routing, consistent logging, and robust connection pooling.
> 2. **DevOps & Cloud Automation:** Writing Terraform scripts taught me that infrastructure should be treated with the same version-controlled rigor as application code.
> 3. **User-Centric Engineering:** Building multi-lingual support and an AI fallback reminded me that real software must be resilient and accessible to users regardless of their technical literacy."

---

### Section C: Single-Instance Questions

#### Q1: How did you organize / manage events? [HR 26]
> **Answer:**
> "I used a structured 4-step framework:
> 1. **Planning & Agenda:** Defining clear objectives, timelines, and assigning specific responsibilities to team members.
> 2. **Resource Coordination:** Securing computer labs, network bandwidth, permissions from the college administration, and promotional outreach across student groups.
> 3. **Execution & Risk Mitigation:** Having backup plans for technical hiccups (e.g., pre-tested offline question sets in case of internet instability during coding contests).
> 4. **Feedback & Retrospective:** Gathering participant feedback to document lessons learned for subsequent events."

#### Q2: How did you overcome challenges during event management? [HR 26]
> **Answer:**
> "During one inter-class coding event, our online submission portal faced unexpected network latency due to concurrent student logins. Because we anticipated potential load issues, I had prepared a mirror local evaluation server and offline test cases. We calmly redirected the lab batches without panicking, ensuring the contest concluded fairly without any data loss or student frustration."

#### Q3: How do you approach a complex problem when the solution is not obvious? [Berribot 26]
> **Answer:**
> "I follow a systematic 5-step problem-solving methodology:
> 1. **Understand & Deconstruct:** Break down the ambiguity into smaller, independent sub-problems.
> 2. **Isolate & Reproduce:** Reproduce the problem consistently with minimal test inputs or logs to identify the exact point of failure.
> 3. **Hypothesize & Research:** Formulate testable hypotheses, consult authoritative technical documentation, RFC specifications, and verified community references.
> 4. **Prototype in Isolation:** Test potential solutions in a sandboxed scratch file or minimal reproduction repository before touching core code.
> 5. **Evaluate & Document:** Measure the fix against edge cases, verify performance impact, and document the root cause to prevent future regressions."
