# PPW Financial Planning Portal

## Executive Proposal

- **Prepared for:** Edmond Ade, CEO - Premier Private Wealth (PPW)
- **Presented by:** Marvellous Chuyuoh, CEO & Founder - ZENPHRY (zenphry.com)
- **Date:** 25 January 2026
- **Delivery:** 18-25 weeks (includes buffer)
- **Exchange Rate:** 1 USD = 1,447.27 RWF

---

## What We're Building

A financial planning platform built for African markets with dual business models:

**B2C (Business-to-Consumer):**

- Clients use it directly to manage their money
- Personal financial planning tools
- Direct subscription model

**B2B (Business-to-Business):**

- Financial planners use it to serve multiple clients
- Planner portal with multi-client management
- Commission tracking and client onboarding tools

The platform works offline, handles local currencies, and follows local tax rules.

Six core features:

- Personal finance tracking (income, expenses, assets, debts)
- Risk planning (what happens if income drops)
- Investment planning (how money grows over time)
- Retirement planning (am I saving enough)
- Goal tracking (car, house, education)
- User management (clients, planners, admins)

---

## Why We Win

| What Matters        | Competitor               | Zenphry                                                         |
| ------------------- | ------------------------ | --------------------------------------------------------------- |
| Business model      | Not mentioned            | B2C (clients) + B2B (financial planners serve multiple clients) |
| Timeline            | 12 weeks (will run over) | 8-10 weeks web, 8-10 weeks mobile (buffer included)             |
| Works offline       | No                       | Yes (critical for Africa)                                       |
| Local currency      | Added later              | Built-in from day one                                           |
| Mobile strategy     | Build everything at once | Validate web first, then mobile                                 |
| Cost transparency   | Incomplete breakdown     | Every hour accounted for                                        |
| Tax rules           | Generic                  | Choose any 3 African countries (more countries in Phase 3)      |
| Planner tools       | Vague                    | Multi-client dashboard, commission tracking                     |
| Testing             | Not specified            | 95% test coverage, 1,000 user load test                         |
| Post-launch support | Unclear                  | 2-5 weeks included                                              |

---

## Delivery Timeline

**Phase 1 (8-10 weeks): Web Platform**

- All 6 features working
- Client portal, planner portal, admin console
- Payment processing (Stripe, Flutterwave)
- Production deployment on AWS
- Buffer for testing and refinement

**Phase 2 (8-10 weeks): Mobile Apps**

- iOS and Android apps
- Offline mode with automatic sync
- All features from web version
- App store submission
- Beta testing period

**Support (2-5 weeks): Post-Launch**

- Bug fixes
- Performance tuning
- Staff training
- Extended warranty period

**Total Timeline: 18-25 weeks**

---

## Pricing Breakdown

Costs based on 8-week core delivery. Buffer weeks (2-3 per phase) included for risk mitigation at no extra cost.

### Development Costs

**Phase 1: Web Platform (8-10 weeks)**

| Category             | USD         | RWF                |
| -------------------- | ----------- | ------------------ |
| Backend development  | $13,000     | 18,814,510 RWF     |
| Frontend development | $9,750      | 14,110,883 RWF     |
| Testing & QA         | $7,250      | 10,492,708 RWF     |
| Infrastructure       | $2,500      | 3,618,175 RWF      |
| Documentation        | $1,500      | 2,170,905 RWF      |
| Project management   | $8,000      | 11,578,160 RWF     |
| **Phase 1 Total**    | **$41,000** | **59,335,070 RWF** |

**Phase 2: Mobile Apps (8-10 weeks)**

| Category           | USD         | RWF                |
| ------------------ | ----------- | ------------------ |
| Mobile development | $11,500     | 16,643,605 RWF     |
| Testing            | $5,750      | 8,321,803 RWF      |
| App store setup    | $1,250      | 1,809,088 RWF      |
| Project management | $8,000      | 11,578,160 RWF     |
| **Phase 2 Total**  | **$26,500** | **38,352,655 RWF** |

**Post-Launch Support (2-5 weeks)**

| Category          | USD        | RWF               |
| ----------------- | ---------- | ----------------- |
| Bug fixes         | $2,000     | 2,894,540 RWF     |
| Training          | $1,500     | 2,170,905 RWF     |
| **Support Total** | **$3,500** | **5,065,445 RWF** |

---

### Project Total

| Item              | USD         | RWF                 |
| ----------------- | ----------- | ------------------- |
| Phase 1 (Web)     | $41,000     | 59,335,070 RWF      |
| Phase 2 (Mobile)  | $26,500     | 38,352,655 RWF      |
| Support           | $3,500      | 5,065,445 RWF       |
| **Total Project** | **$71,000** | **102,753,170 RWF** |

---

### Year 1 Infrastructure Estimate

**IMPORTANT:** This is a rough estimate. Actual costs require detailed infrastructure analysis based on real usage patterns.

**Includes:** Development, Staging, and Production environments

| Service            | USD/month (range)    | RWF/month (range)               |
| ------------------ | -------------------- | ------------------------------- |
| AWS hosting (ECS)  | $500 - $800          | 723,635 - 1,157,816 RWF         |
| Database (RDS)     | $200 - $350          | 289,454 - 506,545 RWF           |
| Monitoring         | $40 - $80            | 57,891 - 115,782 RWF            |
| Payment processing | $80 - $150           | 115,782 - 217,091 RWF           |
| **Monthly Total**  | **$820 - $1,380**    | **1,186,762 - 1,997,234 RWF**   |
| **Annual Total**   | **$9,840 - $16,560** | **14,241,144 - 23,966,832 RWF** |

---

### Year 1 Total Cost Estimate

| Item                       | USD (range)           | RWF (range)                       |
| -------------------------- | --------------------- | --------------------------------- |
| Development (fixed)        | $71,000               | 102,753,170 RWF                   |
| Infrastructure (12 months) | $9,840 - $16,560      | 14,241,144 - 23,966,832 RWF       |
| **Year 1 Total**           | **$80,840 - $87,560** | **116,994,314 - 126,719,902 RWF** |

**Disclaimer:** Infrastructure costs are estimates only. Final costs depend on actual user traffic, data storage, and feature usage. We recommend a detailed infrastructure audit after Phase 1 completion to optimize costs.

---

## Technology Stack

We use proven, enterprise-grade technologies optimized for African markets.

### Frontend (What Users See)

- **Web:** Modern JavaScript framework with server-side rendering
- **Mobile:** Cross-platform framework (single codebase for iOS and Android)
- **Why:** Fast performance, lower development cost, easier maintenance

### Backend (The Engine)

- **Server:** Node.js runtime with TypeScript
- **Database:** PostgreSQL (industry-standard for financial data)
- **Cache:** Redis (speeds up calculations and user sessions)
- **Why:** Handles financial calculations reliably, scales to thousands of users

### Infrastructure (Where It Runs)

- **Hosting:** AWS Africa (Cape Town region)
- **Why:** Sub-100ms response times across East Africa, 99.9% uptime guarantee
- **Security:** Bank-level encryption, automatic backups, disaster recovery
- **Why:** Your client financial data stays safe and compliant

### Offline Technology

- **Mobile Database:** Local storage with automatic cloud sync
- **Conflict Resolution:** Smart merging when users work offline
- **Why:** Works even when internet drops, syncs when connection returns

### Key Advantages

- **Proven Stack:** Used by companies like Uber, Airbnb, Netflix
- **Africa-Optimized:** AWS Cape Town gives better speed than US/Europe servers
- **Cost-Effective:** Open-source core technologies reduce licensing fees
- **Maintainable:** Large developer community means easy future updates

---

## What Makes This Different

**Dual business model (B2C + B2B):**

- B2C: Clients manage their own finances directly
- B2B: Financial planners serve multiple clients from one platform
- Revenue from both individual subscriptions and planner fees
- Competitor proposal did not mention this advantage

**Built for Africa, not copied from America:**

- Works when internet drops (offline mode)
- Handles Rwandan Francs, Kenyan Shillings, US Dollars natively
- Follows local tax rules (you pick any 3 African countries: suggested defaults are South Africa, Nigeria, Rwanda)
- Additional countries available in Phase 3
- Priced for African markets

**Real timelines, not promises:**

- 8-10 weeks to working web platform
- Validate with real users before building mobile
- Built-in buffer for surprises (18-25 weeks total)

**Financial planners get real tools:**

- Manage multiple clients from one dashboard
- Track commissions automatically
- Onboard new clients with guided workflows
- Monitor client progress

**Security and compliance:**

- Bank-level encryption
- Audit trails for every change
- GDPR compliant
- Regular backups

---

## Success Metrics

**Phase 1 Complete (8-10 weeks):**

- All 6 modules working
- Handles 1,000 users at once
- Response time under 200 milliseconds
- Payment processing active
- 100+ automated tests passing

**Phase 2 Complete (16-20 weeks):**

- iOS and Android apps live
- Offline sync working
- Apps submitted to app stores
- Feature parity with web

**Project Complete (18-25 weeks):**

- Staff trained
- Documentation delivered
- System handed over
- Extended warranty support complete

---

## What We're Not Building

To keep the timeline realistic, these are future features:

- Bank account linking (Plaid integration)
- AI predictions
- Voice commands
- White-label reselling
- Advanced tax optimization tools
- Tax rules for additional countries beyond your initial 3

These can be added in Phase 3 after the core platform proves itself.

---

## Risk Mitigation

| Risk                    | How We Handle It                         |
| ----------------------- | ---------------------------------------- |
| Payment provider delays | Start integration week 1, not week 7     |
| Scope creep             | New requests go to Phase 3, not Phase 1  |
| Team changes            | Documentation and paired work throughout |
| Slow calculations       | Test with real data by week 5            |
| Currency rate changes   | Cache rates daily, not real-time         |

---

## Next Steps

1. Review this proposal
2. Approve budget and timeline
3. Confirm start date
4. Begin Phase 1 (8-10 weeks to working platform)

---

**Prepared by ZENPHRY**
Website: zenphry.com
Contact: Marvellous Chuyuoh, CEO & Founder

**Rate:** $25/hour (36,181.75 RWF/hour at 1 USD = 1,447.27 RWF)
**Team Size:** 11 people (10 developers + 1 project manager)
**Timeline:** 18-25 weeks with built-in buffers
