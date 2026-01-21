# Velden OS – Enterprise Healthcare RCM Platform

## Project Overview

**Velden OS** is a full-stack, HIPAA-compliant Revenue Cycle Management (RCM) operating system designed for healthcare providers. The platform automates claims tracking, denial management, and financial analytics to recover lost revenue and improve operational efficiency.

---

## 🎯 Key Achievements

| Metric | Value |
|--------|-------|
| API Endpoints Built | 25+ RESTful APIs |
| File Formats Supported | X12 835 ERA, CSV |
| Security Compliance | HIPAA-ready with PHI redaction |
| Architecture | Multi-tenant SaaS |
| Frontend | Custom Desktop-like UI with glassmorphism |

---

## 🛠 Technical Stack

### Backend
- **Framework**: Python 3.11, FastAPI
- **Database**: PostgreSQL with Row-Level Security (RLS)
- **Authentication**: JWT + RBAC (Role-Based Access Control)
- **Queue**: Redis for async job processing
- **Storage**: MinIO (S3-compatible) / Google Cloud Storage

### Frontend
- **Framework**: Vanilla JavaScript with modular architecture
- **UI/UX**: Custom desktop environment with windowed applications
- **Design**: Glassmorphism aesthetic with dark theme

### DevOps & Infrastructure
- **Containerization**: Docker + Docker Compose
- **Cloud**: Google Cloud Platform (Cloud Run, Cloud SQL, Pub/Sub)
- **IaC**: Terraform for infrastructure provisioning
- **CI/CD**: GitHub Actions

---

## 📋 Implementation Phases

### Phase 0: Local Development Platform ✅
- Configured Docker Compose with PostgreSQL, MinIO, Redis
- Created Makefile for development automation (dev, test, migrate, seed)
- Implemented Nginx reverse proxy with security headers
- Set up FastAPI skeleton with Pydantic settings management

### Phase 1: Core Backend & Authentication ✅
- Built JWT authentication with token refresh and logout
- Implemented RBAC with 6 role types (Platform Admin → Client Staff)
- Created Claims API (list, detail, timeline, update)
- Created Denials API (queue, assign, analytics by CARC code)
- Developed audit logging middleware for compliance

### Phase 2: File Ingestion & Parsing ✅
- Built X12 835 ERA parser extracting claims and denials
- Created CSV parser with flexible column mapping
- Implemented upload endpoints with pre-signed URLs
- Added job queue management for async processing
- Created demo data endpoints for testing

### Phase 3: Analytics & Reporting ✅
- **KPI Dashboard**: Total A/R, collection rate, denial rate, claims at risk
- **A/R Aging Report**: 5 aging buckets with amounts and percentages
- **Denial Trend Analysis**: 6-month trends with top CARC codes
- **Payer Performance**: Claims count, denial rate, days to payment
- **Collection Forecast**: Predictive collections with confidence scores
- **Recovery Potential**: Categorized by Velden Fixable, Rescue Candidate, etc.
- **Executive Summary**: Highlights + actionable recommendations

### Phase 4: Cloud Deployment & Hardening 🔄 (In Progress)
- Terraform configuration for GCP (VPC, Cloud SQL, Cloud Run, Pub/Sub)
- Cloud Armor WAF rules for API protection
- Secret Manager integration for credentials
- CI/CD pipeline with GitHub Actions
- Production monitoring with Cloud Logging and Metrics
- Multi-region failover setup

---

## 🔐 Security Features

| Feature | Implementation |
|---------|---------------|
| **PHI Redaction** | Automatic masking of SSN, DOB, Member IDs in logs |
| **Row-Level Security** | PostgreSQL RLS policies for tenant isolation |
| **JWT Authentication** | Short-lived access tokens + refresh tokens |
| **RBAC** | 6 roles with granular permissions |
| **Audit Logging** | All actions tracked with user, timestamp, resource |
| **Security Headers** | CSP, XSS protection, clickjacking prevention |
| **Rate Limiting** | Configurable per-endpoint limits |

---

## 📊 Sample Metrics (Demo Data)

```
Total Claims: 1,247
Total A/R: $847,325
Collection Rate: 92.4% (↑ +1.8%)
Denial Rate: 8.7% (↓ -2.1%)
Avg Days to Payment: 31 days

Top Denial Codes:
- CO-45: Charges exceed fee schedule ($44,500)
- CO-4: Procedure code inconsistent with modifier ($33,500)
- CO-16: Claim lacks information ($27,000)
```

---

## 🖥 Desktop Applications

The VeldenOS frontend provides a unique desktop-like experience:

1. **Claims Tracker** – Real-time claims monitoring with status filtering
2. **Denial Analyzer** – AI-powered denial categorization and recommendations
3. **Velden Vault** – Secure file upload and parsing
4. **Settings** – User and tenant configuration
5. **Terminal** – Developer console for API testing
6. **Code Editor** – Query builder for custom reports

---

## 📁 Project Structure

```
VeldenOS/
├── backend/
│   ├── app/
│   │   ├── auth/          # JWT authentication
│   │   ├── claims/        # Claims API
│   │   ├── denials/       # Denials API
│   │   ├── ingestion/     # 835/CSV parsers
│   │   ├── analytics/     # Dashboard & reports
│   │   └── middleware/    # Security, audit, redaction
│   ├── tests/             # RLS, auth, integration tests
│   └── fixtures/          # Sample 835, CSV files
├── enterprise/
│   ├── terraform/         # GCP infrastructure
│   ├── openapi.yaml       # API specification
│   └── database-schema.sql
├── js/                    # Frontend JavaScript
├── css/                   # Styling
└── docker-compose.yml     # Local development
```

---

## 🚀 Running the Project

```bash
# Start all services
docker-compose up -d

# Or using Makefile
make dev

# Access
- API Docs: http://localhost:8000/docs
- VeldenOS UI: http://localhost:3000

# Demo Login
Email: admin@demo.velden.com
Password: demo123
```

---

## 👨‍💻 Role & Responsibilities

- Designed and implemented multi-tenant backend architecture
- Built secure REST APIs with FastAPI and JWT authentication
- Developed X12 835 ERA parser for healthcare claims processing
- Created analytics dashboard with KPIs and forecasting
- Implemented HIPAA-compliant security measures (PHI redaction, audit logs)
- Configured cloud infrastructure using Terraform on GCP
- Built custom desktop-style frontend with JavaScript

---

## 📞 Contact

**Project Type**: Enterprise Healthcare SaaS  
**Duration**: 4 weeks (16-week production roadmap)  
**Team Size**: Solo developer  
**Status**: MVP Complete, GCP Deployment in Progress
