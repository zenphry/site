# PPW Financial Planning Portal - Technical Proposal

## Africa-First Edition | Production-Ready Architecture

**Prepared for:** [Client Name]  
**Date:** January 2026  
**Duration:** 16 weeks (Phase 1: 8 weeks web + Phase 2: 8 weeks mobile + post-launch support)  
**Team:** Backend-led, Full-stack delivery

---

## EXECUTIVE SUMMARY (Technical)

We're building **production-grade financial planning software optimized for African markets**, not a US-centric clone. Key differentiators:

- **Offline-First Architecture** (critical for Africa's connectivity gaps)
- **Multi-Currency Native** (RWF, USD, ZAR, KES, UGX native support, not bolted-on)
- **Local Tax Compliance** (Rwanda, Kenya, Uganda, Nigeria tax rules built-in)
- **Planner-Client Portal** (B2B2C adoption engine)
- **Real Performance** (sub-200ms calculations even with 50K+ scenarios)
- **Realistic Timeline** (8 weeks Phase 1 web = proven execution vs competitor's 12-week lie)

**This is not aspirational. This is buildable.**

---

## PHASE BREAKDOWN & TIMELINE

```
PHASE 1: WEB PLATFORM (Weeks 1-8)
└─ Client Portal, Planner Portal, Admin Console
└─ All 6 core features (PFM, Risk, Investment, Retirement, Lifestyle, User Mgmt)
└─ Subscription engine (working, not "future")
└─ Production deployment (AWS + RDS)

PHASE 2: MOBILE (Weeks 9-16)
└─ Flutter iOS + Android (data reuse from Phase 1 APIs)
└─ Offline sync (CRDTs + event log)
└─ Feature parity with web (read + write)

SUPPORT: Weeks 17-18 (Post-launch warranty)
└─ Bug fixes, performance tuning, client onboarding
```

---

## ARCHITECTURE OVERVIEW

### Technology Stack (Proven, Not Experimental)

#### Frontend (Next.js 15)

- Server-side rendering (better SEO for financial tool discovery)
- API routes (minimal backend boilerplate for simple CRUD)
- Built-in auth (NextAuth.js integration)
- Deployment simplicity (Vercel one-click, or self-hosted Docker)
- Performance: Sub-1s FCP (First Contentful Paint)
- Monorepo: TurboRepo (frontend + docs in one repo)
- UI Framework: Shadcn/ui + TailwindCSS
- State Management: TanStack Query (server state) + Zustand (client state)
- Charts: Recharts (performance tested up to 50K data points)
- Forms: React Hook Form + Zod (validation)

#### Backend (Express.js + Node.js)

- Runtime: Node.js 22 LTS (6-year support window)
- Language: TypeScript (compile-time safety for financial code)
- Web Framework: Express.js + TypeBox (OpenAPI generation)
- API: REST (not GraphQL = simpler for clients)
- Async: Bull + Redis (background jobs for calculations)
- Proven at scale (Uber, Airbnb, Netflix use it)

#### Database (PostgreSQL + Redis)

- PostgreSQL: ACID compliance, JSON support, full-text search, Row-level security
- Redis: Session storage, calculation cache, job queue
- Search: PostgreSQL FTS (don't over-engineer with Elasticsearch)

#### Infrastructure (AWS Africa Region)

- Region: AWS Africa (Cape Town) for sub-100ms latency
- Compute: ECS (Elastic Container Service) on EC2
- Database: RDS PostgreSQL Multi-AZ (automatic failover)
- Cache: ElastiCache Redis
- CDN: CloudFront (fast asset delivery across Africa)
- Storage: S3 (document upload, audit logs)
- Monitoring: CloudWatch + Datadog (dashboards, alerts)

---

## DETAILED FEATURE ARCHITECTURE

### 1. PERSONAL FINANCIAL MANAGEMENT (PFM) MODULE

**Core Entities:**

- Income Sources (salary, business, commission, bonus, rental, pension)
- Expenses (housing, utilities, food, transport, insurance, debt, entertainment, education, health, miscellaneous)
- Assets (cash, investments, real estate, business, vehicles, retirement accounts)
- Liabilities (mortgages, loans, credit cards, student loans, business loans)

**Key Calculations:**

- Monthly Income: amount × frequency_multiplier
- Total Annual Income: totalMonthlyIncome × 12
- Net Worth: totalAssets - totalLiabilities
- Monthly Surplus: totalMonthlyIncome - totalMonthlyExpenses
- Savings Rate: (monthlySurplus / totalMonthlyIncome) × 100
- Debt-to-Income Ratio: (totalMonthlyDebtPayments / totalMonthlyIncome) × 100

**Features:**

- Multi-currency support (RWF, USD, ZAR, KES, UGX)
- Exchange rate caching (daily updates)
- Audit trails (all changes logged with timestamps)
- Soft deletes (data recoverable)
- Real-time recalculation on data changes

**API Endpoints:**

- POST /api/v1/users/:userId/income
- GET /api/v1/users/:userId/pfm/summary
- PUT /api/v1/users/:userId/income/:incomeId
- DELETE /api/v1/users/:userId/income/:incomeId
- GET /api/v1/users/:userId/pfm/history

---

### 2. RISK PLANNING MODULE

**Two Scenario Types:**

**Regular Income Drop:**

- Input: Expected drop percentage, emergency savings amount
- Output: Monthly shortfall, survival months, verdict (SAFE/AT_RISK)
- Formula: survivalMonths = emergencySavingsAmount / monthlyShortfall

**Lump-Sum Income:**

- Input: Lump sum amount, monthly usage amount
- Output: Survival months, verdict (COMFORTABLE/MODERATE/TIGHT)
- Formula: survivalMonths = lumpSumAmount / monthlyUsage

**Real Example:**

- Current income: $1,035.00
- Drop: 50%
- New income: $517.50
- Monthly expenses: $621.00
- Shortfall: $103.50
- Savings: $828.00
- Survival months: 8 months

---

### 3. INVESTMENT PLANNING MODULE

**Two Calculation Methods:**

**Deterministic (Fast):**

- Lump-Sum FV: futureValue = initialAmount × (1 + r)^t
- Recurring FV: futureValue = P × [((1 + r)^t - 1) / r]
- Combined: futureValue_total = FV_lumpSum + FV_recurring
- Response: <200ms (immediate)

**Monte Carlo Simulation (Accurate):**

- 1,000 trials (competitor-level accuracy)
- Random returns from normal distribution
- Calculates percentiles (P10, P50, P90)
- CPU-intensive, runs async in background job
- Response: 3-5 seconds

**Features:**

- Supports lump-sum, recurring, or combined investments
- Inflation adjustment
- Tax rate consideration
- Risk level modeling
- Historical backtesting reference

---

### 4. RETIREMENT PLANNING MODULE

**Core Calculation:**

- Years to Retirement: retirementAge - currentAge
- Total Needed: expectedMonthlyRetirementExpenses × 12 × yearsOfRetirement
- FV Current Savings: currentRetirementSavings × (1 + r)^t
- FV Contributions: using standard annuity formula
- Retirement Total: FV_currentSavings + FV_contributions
- Gap/Surplus: totalNeeded - retirementTotal

**Real Example:**

- Current age: 30, Retire at: 60
- Years of retirement: 25
- Monthly expenses: $414.00
- Current savings: $3,450.00
- Monthly contribution: $69.00
- Expected return: 8%
- Money needed: $124,200.00
- Total at retirement: $137,456.97
- **Result: ON TRACK ($13,110.00 surplus)**

---

### 5. LIFESTYLE/HOLISTIC GOALS MODULE

**Goal Tracking:**

- Goal categories: Housing, Education, Travel, Business, Car, Emergency Fund, Lifestyle
- Status tracking: Not Started, In Progress, Achieved, On Hold
- Priority levels: High, Medium, Low

**Calculations:**

- Months to Goal: Days until targetDate ÷ 30
- Remaining Amount: targetAmount - currentSavings
- Required Monthly Saving: remainingAmount / monthsToGoal
- Progress Percentage: (currentSavings / targetAmount) × 100

**Real Example:**

- Goal: "New Car"
- Target: $8,280.00
- Time: 3 years (36 months)
- Current savings: $1,380.00
- Remaining: $6,900.00
- Required monthly saving: $191.82

**Portfolio Dashboard:**

- Total target amount (sum of all goals)
- Total saved across all goals
- Overall progress percentage
- Goals by priority level

---

### 6. USER MANAGEMENT & SUBSCRIPTION

**User Roles:**

- **CLIENT**: Uses all 6 planning modules, subscribes to planners or platform
- **PLANNER**: Manages clients, creates plans, gets paid via subscriptions
- **ADMIN**: System-wide user management, verification, reporting

**Planner Portal Features:**

- Multi-client dashboard (capacity management)
- Client onboarding workflows
- Financial plan creation interface
- Automated commission calculations
- Subscription management
- Client activity tracking

**Subscription Engine:**

- Trial period support (14-day free trial default)
- Multiple billing cycles (monthly, yearly)
- Feature tiers (Basic, Premium, Professional)
- Stripe/Flutterwave payment integration
- Dunning management (retry failed payments)
- Automatic billing cycle updates

**API Endpoints:**

- POST /api/v1/auth/register
- POST /api/v1/auth/login
- GET /api/v1/users/:userId/profile
- POST /api/v1/subscriptions
- GET /api/v1/subscriptions/:subscriptionId
- PUT /api/v1/subscriptions/:subscriptionId/cancel

---

## OFFLINE-FIRST ARCHITECTURE (Africa-Critical)

### Why Offline-First?

- Connectivity gaps: Internet works 30 min/hour in some areas
- Mobile data cost: Expensive, minimize sync
- User experience: Don't freeze when internet drops

### Implementation Strategy

**Frontend (Mobile):**

- Local database: SQLite + WatermelonDB
- All data synced locally first
- Automatic sync when online (NetInfo listener)
- Track sync status and timestamps
- Queue unsynchronized records

**Backend:**

- Event sourcing: All changes = immutable events
- Conflict resolution: Server-wins or merge strategy
- Causal ordering: Parent event IDs for ordering
- Timestamp tracking: Client timestamp vs server timestamp

**Conflict Handling:**

- When mobile syncs after 2+ hours offline
- Check for server-side changes in same time period
- If conflict exists: Notify user, show version differences
- User chooses which version wins
- Continue with non-conflicting changes

---

## DEPLOYMENT & INFRASTRUCTURE

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
├──────────────────────┬──────────────────────────────────────┤
│  Next.js Web         │  Flutter Mobile (iOS/Android)         │
│  (Vercel/Self-host)  │  (App Store/Play Store)              │
└──────────────────────┴──────────────────────────────────────┘
           │                              │
           └──────────────┬───────────────┘
                          │ REST API + WebSockets
           ┌──────────────┴───────────────┐
           │                              │
    ┌──────▼─────────┐          ┌────────▼────────┐
    │  CloudFront    │          │   API Gateway   │
    │  (CDN)         │          │   (Rate limit)  │
    └──────┬─────────┘          └────────┬────────┘
           │                             │
           │          ┌────────────────┬─┴─────────────────┐
           │          │                │                   │
    ┌──────▼──────────▼──┐      ┌──────▼─────┐      ┌─────▼──────┐
    │  ECS Cluster       │      │   S3       │      │   SQS      │
    │  (App Servers)     │      │  (Storage) │      │ (Job Queue)│
    │  - Express.js      │      │            │      │            │
    │  - Calculation     │      │            │      │  Bull +    │
    │    Microservice    │      │            │      │  Redis     │
    └────────┬──────────┘       └────────────┘      └─────┬──────┘
             │                                             │
             │    ┌────────────────────────────────────────┘
             │    │
    ┌────────▼────▼──────────────┐
    │  RDS PostgreSQL            │
    │  (Multi-AZ, encrypted)     │
    │  - Users                   │
    │  - Financial data          │
    │  - Subscriptions           │
    │  - Audit logs              │
    └────────────────────────────┘
             │
    ┌────────▼────────┐
    │  ElastiCache    │
    │  (Redis)        │
    │  - Session cache│
    │  - Calc cache   │
    └─────────────────┘
```

### AWS Configuration

**ECS Task Definition:**

- Container: ppw-api (Express.js)
- Memory: 512 MB
- CPU: 256 units
- Port: 3000
- Health check: /health endpoint (30s interval)
- Logging: CloudWatch logs with stream prefix

**CI/CD Pipeline (GitHub Actions):**

- Trigger: Push to main branch
- Steps:
  1. Run tests (Jest, Supertest)
  2. Run linting
  3. Build Docker image
  4. Push to ECR
  5. Update ECS service (force new deployment)

**Database Migration (Flyway):**

- Version control all schema changes
- Automated migrations on deployment
- Rollback strategy defined
- Test migrations on staging first

---

## PERFORMANCE & SCALABILITY

### Response Time Targets (SLA)

| Endpoint                                    | Target | Status            |
| ------------------------------------------- | ------ | ----------------- |
| GET /api/v1/users/:userId/pfm/summary       | <50ms  | Cached            |
| POST /api/v1/users/:userId/income           | <200ms | Write + recalc    |
| GET /api/v1/users/:userId/investment-goals  | <100ms | Deterministic     |
| POST /api/v1/users/:userId/investment-goals | <5s    | Async Monte Carlo |
| GET /api/v1/users/:userId/retirement        | <100ms | Cached            |
| POST /api/v1/auth/login                     | <300ms | JWT generation    |

### Caching Strategy

- PFM summary: 5-minute cache (invalidate on data change)
- Investment calculations: 1-hour cache
- Retirement calculations: 1-hour cache
- Exchange rates: Daily cache
- User session: Redis (24-hour TTL)

### Load Testing

Target: 1,000 concurrent users with <200ms response times

- Phase 1 (2 min): Ramp-up to 100 users
- Phase 2 (5 min): Ramp-up to 500 users
- Phase 3 (5 min): Hold at 500 users
- Phase 4 (2 min): Ramp-down to 0

---

## SECURITY & COMPLIANCE

### Data Encryption

**At Rest:**

- AES-256-GCM for sensitive fields (passwords, PII)
- Encrypted backups in S3
- KMS key rotation (annual)

**In Transit:**

- TLS 1.3 for all API calls
- HSTS headers (force HTTPS)
- No HTTP fallback

### Authentication & Authorization

- JWT tokens (HS256 algorithm)
- NextAuth for frontend session management
- Role-Based Access Control (RBAC) middleware
- MFA support (optional, for admin/planner)

### Audit Logging

All changes logged with:

- User ID
- Action type (CREATE, UPDATE, DELETE)
- Entity type and ID
- Old values and new values
- Timestamp
- IP address (for security analysis)

Logs stored in separate encrypted table, separate retention policy (7 years for financial audit)

### GDPR Compliance

- User data export: Complete JSON dump
- Right to be forgotten: Full deletion of user data
- Data processing agreements signed
- Privacy policy accessible
- Consent management built-in

---

## COST BREAKDOWN (Detailed)

### Phase 1: Web Platform (8 weeks)

| Item                                              | Rate (USD/hr) | Hours | Cost (USD)     |
| ------------------------------------------------- | ------------- | ----- | -------------- |
| **Backend Development**                           |               |       |
| Express.js API setup, user auth                   | $17.25/hr     | 80    | $1,380.00      |
| PFM module (income/expenses/assets/liabilities)   | $17.25/hr     | 60    | $1,035.00      |
| Risk Planning module                              | $17.25/hr     | 40    | $690.00        |
| Investment Planning (deterministic + Monte Carlo) | $17.25/hr     | 60    | $1,035.00      |
| Retirement Planning module                        | $17.25/hr     | 50    | $862.50        |
| Lifestyle Goals module                            | $17.25/hr     | 40    | $690.00        |
| User Management & RBAC                            | $17.25/hr     | 50    | $862.50        |
| Subscription & Billing (Stripe/Flutterwave)       | $17.25/hr     | 60    | $1,035.00      |
| Background job processing (Bull + Redis)          | $17.25/hr     | 30    | $517.50        |
| API testing & documentation                       | $17.25/hr     | 40    | $690.00        |
| **Backend Subtotal**                              |               |       | **$9,487.50**  |
| **Frontend Development**                          |               |       |
| Next.js setup, auth, layouts                      | $17.25/hr     | 40    | $690.00        |
| PFM dashboard & forms                             | $17.25/hr     | 60    | $1,035.00      |
| Risk Planning UI                                  | $17.25/hr     | 30    | $517.50        |
| Investment Planning UI + charts                   | $17.25/hr     | 50    | $862.50        |
| Retirement Planning UI                            | $17.25/hr     | 40    | $690.00        |
| Lifestyle Goals UI                                | $17.25/hr     | 30    | $517.50        |
| Admin Portal                                      | $17.25/hr     | 50    | $862.50        |
| Planner Portal                                    | $17.25/hr     | 60    | $1,035.00      |
| Authentication & session management               | $17.25/hr     | 30    | $517.50        |
| Responsive design & mobile web                    | $17.25/hr     | 40    | $690.00        |
| **Frontend Subtotal**                             |               |       | **$6,727.50**  |
| **QA & Testing**                                  |               |       |
| Unit tests (backend)                              | $13.80/hr     | 60    | $828.00        |
| Integration tests                                 | $13.80/hr     | 50    | $690.00        |
| E2E tests (Cypress)                               | $13.80/hr     | 40    | $552.00        |
| Manual QA & bug fixes                             | $13.80/hr     | 80    | $1,104.00      |
| Performance testing                               | $13.80/hr     | 40    | $552.00        |
| Security testing                                  | $13.80/hr     | 30    | $414.00        |
| **QA Subtotal**                                   |               |       | **$4,140.00**  |
| **DevOps & Infrastructure**                       |               |       |
| AWS setup (ECS, RDS, ElastiCache)                 | $20.70/hr     | 30    | $621.00        |
| CI/CD pipeline (GitHub Actions)                   | $17.25/hr     | 20    | $345.00        |
| Docker containerization                           | $17.25/hr     | 15    | $258.75        |
| Monitoring & logging setup                        | $17.25/hr     | 20    | $345.00        |
| Database backup & disaster recovery               | $17.25/hr     | 15    | $258.75        |
| **DevOps Subtotal**                               |               |       | **$1,828.50**  |
| **Documentation & Handover**                      |               |       |
| API documentation                                 | $13.80/hr     | 20    | $276.00        |
| Architecture documentation                        | $13.80/hr     | 15    | $207.00        |
| Deployment runbook                                | $13.80/hr     | 10    | $138.00        |
| Staff training                                    | $13.80/hr     | 15    | $207.00        |
| **Documentation Subtotal**                        |               |       | **$828.00**    |
| **Project Management**                            |               |       |
| Project lead (8 weeks @ 40 hrs/week)              | $24.15/hr     | 320   | $7,728.00      |
| **PM Subtotal**                                   |               |       | **$7,728.00**  |
| **Contingency (10% buffer)**                      |               |       | **$3,073.95**  |
|                                                   |               |       |
| **PHASE 1 TOTAL**                                 |               |       | **$33,813.45** |

### Phase 2: Flutter Mobile App (8 weeks)

| Item                                                       | Rate (USD/hr) | Hours | Cost (USD)     |
| ---------------------------------------------------------- | ------------- | ----- | -------------- |
| Flutter project setup & state management                   | $17.25/hr     | 40    | $690.00        |
| Mobile authentication & session                            | $17.25/hr     | 30    | $517.50        |
| Offline-first database (SQLite + WatermelonDB)             | $17.25/hr     | 50    | $862.50        |
| Data sync & conflict resolution                            | $17.25/hr     | 60    | $1,035.00      |
| Personal Finance dashboard (mobile)                        | $17.25/hr     | 50    | $862.50        |
| Planning modules (Risk, Investment, Retirement, Lifestyle) | $17.25/hr     | 80    | $1,380.00      |
| Notification system (push, local)                          | $17.25/hr     | 30    | $517.50        |
| Charts & visualizations (mobile)                           | $17.25/hr     | 40    | $690.00        |
| Unit tests (Dart)                                          | $13.80/hr     | 40    | $552.00        |
| Widget & integration tests                                 | $13.80/hr     | 50    | $690.00        |
| Manual testing (iOS + Android)                             | $13.80/hr     | 60    | $828.00        |
| iOS app signing & provisioning                             | $10.35/hr     | 10    | $103.50        |
| Android signing & keystore                                 | $10.35/hr     | 10    | $103.50        |
| App Store submission & review                              | $10.35/hr     | 15    | $155.25        |
| Play Store submission                                      | $10.35/hr     | 10    | $103.50        |
| Beta testing setup                                         | $13.80/hr     | 20    | $276.00        |
| Mobile lead / PM (8 weeks)                                 | $20.70/hr     | 320   | $6,624.00      |
| Contingency (10%)                                          |               |       | **$1,654.28**  |
|                                                            |               |       |
| **PHASE 2 TOTAL**                                          |               |       | **$18,197.03** |

### Post-Launch Support (Weeks 17-18)

| Item                        | Cost (USD)    |
| --------------------------- | ------------- |
| Bug fixes & critical issues | $1,380.00     |
| Performance optimization    | $1,035.00     |
| Client onboarding & support | $1,035.00     |
| **Support Subtotal**        | **$3,450.00** |

### Infrastructure Costs (Monthly, Ongoing)

| Service                             | Monthly Cost (USD) |
| ----------------------------------- | ------------------ |
| AWS ECS (2 t3.medium instances)     | $276.00            |
| RDS PostgreSQL (Multi-AZ)           | $241.50            |
| ElastiCache Redis                   | $103.50            |
| CloudFront CDN                      | $34.50             |
| S3 storage                          | $6.90              |
| CloudWatch & Monitoring             | $13.80             |
| Stripe/Flutterwave fees (estimated) | $138.00            |
| **Total Monthly**                   | **$814.20**        |

---

## GRAND TOTAL: END-TO-END PROJECT COST

```
Phase 1 (Web Platform):        $33,813.45
Phase 2 (Mobile App):          $18,197.03
Post-Launch Support:            $3,450.00
───────────────────────────────────────────
PROJECT TOTAL:                 $55,460.48

Infrastructure (Year 1):          $9,770.40
───────────────────────────────────────────
YEAR 1 TOTAL COST:             $65,230.88

(Converted at 1 RWF = $0.00069 USD)
```

---

## DELIVERY TIMELINE (Gantt Chart)

```
Week 1-2:   Backend Foundation + Frontend Setup
  ✓ Express.js, PostgreSQL schema, user auth
  ✓ Next.js scaffolding, login flow
  ✓ GitHub, CI/CD pipeline ready

Week 3-4:   Personal Finance Management Module
  ✓ Income, expenses, assets, liabilities CRUD
  ✓ PFM calculation engine
  ✓ PFM dashboard UI

Week 5:     Risk Planning Module
  ✓ Regular income risk, lump-sum scenarios
  ✓ Risk calculation backend
  ✓ Risk UI components

Week 6:     Investment Planning Module
  ✓ Deterministic calculations
  ✓ Monte Carlo (async)
  ✓ Investment UI + charts

Week 7:     Retirement Planning + Lifestyle Goals
  ✓ Retirement gap calculation
  ✓ Lifestyle goals tracking
  ✓ Combined UI

Week 8:     User Management, Subscriptions, Admin Portal
  ✓ RBAC implementation
  ✓ Subscription engine (Stripe/Flutterwave)
  ✓ Admin console
  ✓ End-to-end testing

Week 9-10:  Flutter Mobile Setup + Sync Strategy
  ✓ Flutter project, auth
  ✓ Offline-first database
  ✓ Event sourcing setup

Week 11-14: Flutter Feature Implementation
  ✓ All 6 modules (mobile UI)
  ✓ Data sync & conflict resolution
  ✓ Notifications

Week 15-16: Mobile Testing + App Store Submission
  ✓ Full QA cycle
  ✓ iOS/Android signing
  ✓ App Store/Play Store submission
  ✓ Beta testing

Week 17-18: Post-Launch Support
  ✓ Bug fixes
  ✓ Performance tuning
  ✓ Client training
```

---

## REALISTIC CAVEATS & ASSUMPTIONS

### What We're NOT Doing (To Keep Timeline Realistic)

❌ **Account Linking (Plaid integration):** Adds 4-6 weeks + $2-3M cost. Phase 2 future feature.
❌ **Advanced AI/ML:** Predictive spending, personalized recommendations. Future roadmap.
❌ **White-label SaaS:** Multi-tenant architecture. Not in scope.
❌ **Advanced Tax Planning:** Roth conversions, tax-loss harvesting. Phase 2 module.
❌ **International Fund Manager Integration:** ETrade, Interactive Brokers APIs. Phase 2.
❌ **Voice Transactions:** "Hey, log my income." Too risky for financial data.

### What Success Looks Like (Week 8)

✅ All 6 core modules working in production
✅ 100+ test cases passing
✅ Sub-200ms API response times
✅ Can handle 1,000 concurrent users
✅ Planner can onboard and manage 5+ clients
✅ Subscription system billing correctly
✅ Audit logs tracking all financial changes
✅ Mobile (Phase 2) API-compatible for Phase 2 build

### What Could Go Wrong (Risk Mitigation)

| Risk                               | Probability | Impact | Mitigation                                      |
| ---------------------------------- | ----------- | ------ | ----------------------------------------------- |
| Stripe/Flutterwave approval delays | Medium      | High   | Start integration Week 1, not Week 7            |
| Monte Carlo calculations too slow  | Low         | High   | Test with 1,000 scenarios early (Week 5)        |
| Database schema changes late-stage | Medium      | High   | Freeze schema by Week 3 (architecture review)   |
| Team member leaves                 | Low         | Medium | Document all code, pair programming             |
| Currency conversion rates unstable | Low         | Medium | Cache rates daily, not real-time                |
| Exchange rates wrong               | Medium      | High   | Hire finance consultant for validation (Week 1) |
| User feedback demands scope change | High        | High   | Monthly feature request = Phase 2, not Phase 1  |

---

## SUCCESS CRITERIA & ACCEPTANCE

### Before Going Live (Phase 1)

- [ ] All 6 modules functional and tested
- [ ] 95%+ unit test coverage
- [ ] Load test: 1,000 concurrent users, <200ms response
- [ ] Security audit complete (encryption, RBAC, audit logs)
- [ ] Backup & recovery tested (RTO <4 hours)
- [ ] GDPR compliance checklist signed off
- [ ] Client sign-off on Phase 1 features
- [ ] Planner onboarding workflow tested with 3+ planners
- [ ] Subscription engine end-to-end tested (trial → paid → cancellation)

### Mobile Launch Criteria (Phase 2)

- [ ] iOS + Android both submitted to app stores
- [ ] Feature parity with web (read + write)
- [ ] Offline sync working (tested with 2-hour offline scenario)
- [ ] Battery performance tested (not draining in background)
- [ ] Push notifications working
- [ ] App store compliance (privacy policy, permissions)

---

## COMPETITIVE POSITIONING

### Why We Win

| Aspect            | Competitor                 | You                                | Winner |
| ----------------- | -------------------------- | ---------------------------------- | ------ |
| Timeline          | 12 weeks (waterfall lie)   | 8 weeks web + 8 weeks mobile       | YOU    |
| Offline-First     | No                         | YES (critical for Africa)          | YOU    |
| Multi-Currency    | Bolted-on                  | Native (RWF, USD, ZAR, KES)        | YOU    |
| Planner Adoption  | Vague                      | Clear workflow + commission engine | YOU    |
| Cost Transparency | Hidden ($13.5M incomplete) | Transparent (~$55k = everything)   | YOU    |
| Tax Compliance    | Not specified              | Rwanda/Kenya/Uganda rules          | YOU    |
| Mobile Strategy   | Phase 1 risky              | Phase 2 after web validation       | YOU    |
| Test Coverage     | Not mentioned              | 95%+ with load testing             | YOU    |
| DevOps            | "Cloud hosting" (vague)    | AWS ECS Multi-AZ details           | YOU    |
| Support           | Post-launch unclear        | 30 days warranty included          | YOU    |

---

## FINAL CLOSING STATEMENT

Your competitor is promising everything in 12 weeks with no buffer. They'll miss the deadline, blame "scope creep," and you'll negotiate cost overruns in month 4.

We're delivering a production-grade web platform in **8 weeks** that works offline, handles your currency, and complies with African tax rules. **You'll have working software in 2 months, not promises in 3 months.**

Then Phase 2 (mobile) happens because we've validated what works, not built in the dark for 12 weeks hoping it's right.

---

**Team:** 10 engineers + 1 PM = 11 people, 16 weeks  
**Total Cost:** ~$55,476 (project) + ~$9,798/year (infrastructure)  
**Start Date:** [Date]  
**Go-Live:** Week 8 (Phase 1 web) + Week 16 (Phase 2 mobile)
