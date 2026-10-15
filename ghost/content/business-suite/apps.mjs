// Business Suite apps: icons (24x24 line, stroke=currentColor) and subpage content.
export const ICONS = {
  erp: '<path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z"/><path d="m3 12 9 4.5 9-4.5"/><path d="m3 16.5 9 4.5 9-4.5"/>',
  hr: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.3c3 .1 5.5 2.6 5.5 5.7"/>',
  learning: '<path d="m2 9 10-5 10 5-10 5L2 9Z"/><path d="M6 11v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/><path d="M22 9v6"/>',
  insights: '<path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6" rx=".5"/><rect x="12" y="8" width="3" height="10" rx=".5"/><rect x="17" y="5" width="3" height="13" rx=".5"/>',
  crm: '<rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2.3"/><path d="M5.5 16.5c.6-1.9 2-3 3.5-3s2.9 1.1 3.5 3"/><path d="M15 9h3M15 13h3"/>',
  helpdesk: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13" width="4" height="6" rx="1.5"/><rect x="17.5" y="13" width="4" height="6" rx="1.5"/><path d="M19.5 19v.5a2.5 2.5 0 0 1-2.5 2.5h-3"/>',
  lending: '<path d="M3 10 12 4l9 6"/><path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8"/><path d="M3 21h18"/>',
  chat: '<path d="M4 5h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"/><path d="M19 9h1a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v3l-4-3h-3"/>',
  drive: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/><path d="M12 11v5M9.5 13.5 12 11l2.5 2.5"/>',
  framework: '<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  builder: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 9v12"/>',
  ui: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><circle cx="17.5" cy="17.5" r="3.5"/>',
  press: '<rect x="3" y="4" width="18" height="7" rx="1.5"/><rect x="3" y="13" width="18" height="7" rx="1.5"/><path d="M7 7.5h.01M7 16.5h.01M11 7.5h6M11 16.5h6"/>',
  bench: '<rect x="2.5" y="4" width="19" height="16" rx="2"/><path d="m6.5 9 3 3-3 3M12 15h5"/>',
  datatable: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M3 14h18M9 9v11M15 9v11"/>',
  charts: '<path d="M12 3a9 9 0 1 0 9 9h-9V3Z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15V3.5Z"/>',
  gantt: '<path d="M3 4v16"/><rect x="5" y="6" width="8" height="3" rx="1"/><rect x="9" y="11" width="9" height="3" rx="1"/><rect x="7" y="16" width="6" height="3" rx="1"/>',
};

export const svg = (k, cls = "suite-icon") =>
  `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[k]}</svg>`;

const DEPLOY = "Run it as managed SaaS hosted by Zenphry, in your own cloud account or on-premises in your own data center.";

export const APPS = [
  {
    key: "erp", path: "erp", name: "ERP and Accounting", base: "ERPNext",
    blurb: "Accounting, inventory, purchasing, sales and operations in one system.",
    intro: "Run finance and operations from one system. Accounting, invoicing, purchasing, inventory, sales and projects share the same customers, suppliers, items and accounts, so every transaction updates the books as it happens.",
    features: [
      ["Accounting", "General ledger, invoices, payments, bank reconciliation, budgets and financial statements."],
      ["Inventory", "Items, warehouses, stock movements, batches and serial numbers, with stock levels updated as goods move."],
      ["Purchasing", "Supplier quotations, purchase orders, receipts and supplier invoices, matched against what arrived."],
      ["Sales", "Quotations, sales orders, deliveries and invoices from the same customer and item records."],
      ["Projects", "Projects, tasks, timesheets and project billing linked to costs and invoices."],
      ["Reports", "Profit and loss, balance sheet, cash flow, aging and stock reports, ready to filter and export."],
    ],
    pairs: "CRM for won deals, HR and Payroll for salary costs, Helpdesk for customer issues, and Insights for dashboards",
    faq: [
      ["Can we move from QuickBooks or Zoho Books?", "Yes. We bring over opening balances and current-year transactions, then reconcile totals against your old system before it is retired."],
      ["Can we start with accounting only?", "Yes. Many teams start with accounting and invoicing, then add inventory, purchasing or projects when they are ready."],
    ],
  },
  {
    key: "hr", path: "hr", name: "HR and Payroll", base: "Frappe HR",
    blurb: "Employees, attendance, leave, expenses, payroll and HR processes.",
    intro: "Keep every employee record, request and approval in one place. Managers approve leave and expenses in the same system that holds employee details and payroll records.",
    features: [
      ["Employee records", "Personal details, roles, departments, reporting lines and documents for every employee."],
      ["Attendance and shifts", "Track attendance, shifts and check-ins, with clear rules for each team."],
      ["Leave", "Leave types, balances, requests and approvals, visible to employees and managers."],
      ["Expense claims", "Submit, approve and record expense claims against the right accounts."],
      ["Payroll records", "Salary structures, components and salary slips linked to employees and accounting."],
      ["Recruiting and reviews", "Job openings, applicants and performance appraisals in the same HR system."],
    ],
    pairs: "ERP and Accounting for salary and expense postings, Learning for training, and Team Chat for announcements",
    faq: [
      ["Does it calculate and file US payroll taxes?", "The app holds payroll records and salary slips. US payroll tax calculation and filing usually stay with your payroll provider or accountant. We confirm the right setup during discovery."],
      ["Can employees use it themselves?", "Yes. Employees can see their own records, request leave and submit expenses, based on the permissions you set."],
    ],
  },
  {
    key: "learning", path: "learning", name: "Learning", base: "Frappe Learning",
    blurb: "Create, manage and deliver structured online courses.",
    intro: "Train employees, onboard new hires and teach customers with structured online courses you own. Build courses once and track who completed what.",
    features: [
      ["Courses and lessons", "Organize content into courses, chapters and lessons with text, video and files."],
      ["Quizzes and assignments", "Check understanding with quizzes and assignments, and review the results."],
      ["Batches", "Run cohorts with start dates, instructors and a shared schedule."],
      ["Progress tracking", "See enrollment, progress and completion for every learner."],
      ["Certificates", "Issue certificates when a learner completes a course."],
    ],
    pairs: "HR and Payroll for employee onboarding and Team Chat for cohort discussion",
    faq: [
      ["Can we use it for customer training?", "Yes. Courses can be offered to employees, partners or customers, with access controlled per course or batch."],
      ["Do we need to build the content?", "You provide the subject matter. Zenphry can help you structure courses and set up the first programs."],
    ],
  },
  {
    key: "insights", path: "insights", name: "Insights and Dashboards", base: "Frappe Insights",
    blurb: "Analyze data and build interactive dashboards and reports.",
    intro: "Turn the data in your business systems into dashboards leadership actually uses. Build queries, charts and reports without exporting to spreadsheets every week.",
    features: [
      ["Visual queries", "Build questions from your data with a visual query builder, or use SQL when you need it."],
      ["Charts", "Bar, line, pie, number and table views for the metrics that matter."],
      ["Dashboards", "Combine charts into dashboards for sales, finance, operations or support."],
      ["Shared reports", "Share dashboards with the right people instead of emailing spreadsheets."],
    ],
    pairs: "ERP and Accounting, CRM and Helpdesk, which supply the data for financial, sales and support dashboards",
    faq: [
      ["Can it report on data outside the suite?", "It can connect to supported databases as well as the suite's own data. We confirm your sources during discovery."],
      ["Who builds the first dashboards?", "Zenphry builds your first leadership dashboards with you, then your team can adjust them."],
    ],
  },
  {
    key: "crm", path: "crm", name: "CRM", base: "Frappe CRM",
    blurb: "Track leads, contacts, deals and customer interactions.",
    intro: "Own your customer records and sales pipeline in a CRM you control. Track every lead, deal and conversation, and keep the history when you change prospecting or email tools.",
    features: [
      ["Leads and deals", "Capture leads, qualify them and move deals through a clear pipeline."],
      ["Contacts and organizations", "One record per person and company, with the full history of activity."],
      ["Activities", "Notes, tasks, calls and emails on the record they belong to."],
      ["Pipeline views", "Kanban and list views for the team, with filters for each stage and owner."],
      ["Quotation handoff", "Turn a won deal into a quotation and invoice when used with ERP and Accounting."],
    ],
    pairs: "ERP and Accounting for quotations and invoices, Helpdesk for support history, and Insights for pipeline dashboards",
    faq: [
      ["Can AI prospecting tools feed it?", "Yes. Prospecting and email tools can send leads and activity into the CRM, so the records stay with you if you change tools."],
      ["Can we import our existing contacts?", "Yes. We import contacts, companies and open deals from your current CRM or spreadsheets."],
    ],
  },
  {
    key: "helpdesk", path: "helpdesk", name: "Helpdesk", base: "Frappe Helpdesk",
    blurb: "Customer support through tickets, workflows and service targets.",
    intro: "Move customer requests out of scattered inboxes into one shared queue. Every issue has an owner, a priority and a history, so your team can work through support without interrupting each other.",
    features: [
      ["Tickets", "Every request becomes a ticket with a status, priority and owner."],
      ["Service-level targets", "Response and resolution targets, with tickets that need attention clearly flagged."],
      ["Customer portal", "Customers raise and follow their own tickets instead of chasing by email."],
      ["Knowledge base", "Publish answers to common questions so customers can help themselves."],
      ["Canned responses", "Reuse approved replies for routine questions."],
    ],
    pairs: "CRM and ERP and Accounting, so agents see the customer's deals, orders and invoices next to the ticket",
    faq: [
      ["Can tickets come from email?", "Yes. A support email address can create tickets automatically."],
      ["Is it suitable for a small team?", "Yes. It works for a few agents sharing one queue and grows with teams and rules as you add people."],
    ],
  },
  {
    key: "lending", path: "lending", name: "Lending", base: "Frappe Lending",
    blurb: "Manage loans, repayments and borrower accounts.",
    intro: "Manage loan products from application to final repayment in one system, with every disbursement, schedule and payment recorded against the borrower and posted to the books.",
    features: [
      ["Loan applications", "Capture applications, borrower details and approvals."],
      ["Loan products", "Define loan types, interest rates and repayment terms."],
      ["Disbursements", "Record disbursements and generate repayment schedules."],
      ["Repayments", "Track repayments, interest and outstanding balances per borrower."],
      ["Collateral", "Record securities and collateral linked to each loan."],
    ],
    pairs: "ERP and Accounting for postings and reports, and CRM for borrower relationships",
    faq: [
      ["Does this cover lending licenses and compliance?", "No. The software manages loans and records. Licensing and regulatory compliance remain your responsibility, and we configure the system around your requirements."],
      ["Who is it for?", "Lenders, credit cooperatives and businesses that offer financing to customers or staff."],
    ],
  },
  {
    key: "chat", path: "team-chat", name: "Team Chat", base: "Raven",
    blurb: "Chat and collaborate with your team in channels and threads.",
    intro: "Give your team a private chat space that runs alongside your business systems. Discuss work in channels and threads, and keep conversations inside a platform you control.",
    features: [
      ["Channels", "Public and private channels for teams, projects and topics."],
      ["Direct messages", "One-to-one and group conversations."],
      ["Threads", "Keep discussions organized by replying in threads."],
      ["Files", "Share files and images in the conversation."],
      ["Mobile access", "Stay in touch from a phone as well as the browser."],
    ],
    pairs: "every app in the suite, so updates and discussions sit next to the work",
    faq: [
      ["Does it replace email?", "It replaces internal back-and-forth. Email stays for customers and outside contacts."],
      ["Where are messages stored?", "On your own deployment, whether that is managed SaaS, your cloud or on-premises."],
    ],
  },
  {
    key: "drive", path: "drive", name: "Drive", base: "Frappe Drive",
    blurb: "Store, share and collaborate on documents.",
    intro: "Keep company files in one place with clear folders and permissions, instead of spread across personal accounts.",
    features: [
      ["File storage", "Upload and organize files and folders for teams and projects."],
      ["Sharing and permissions", "Share with the right people and control who can view or edit."],
      ["Previews", "Preview common file types in the browser."],
      ["Search", "Find files by name across the folders you can access."],
    ],
    pairs: "the rest of the suite, so documents live next to the customers, projects and employees they relate to",
    faq: [
      ["Can we move files from our current storage?", "Yes. We plan the folder structure with you and move files across."],
      ["Who can see our files?", "Only the people you grant access to, on your own deployment."],
    ],
  },
];

export const TOOLS = [
  ["framework", "Framework", "Build and customize full-stack web applications."],
  ["builder", "Builder", "Create websites and pages visually without writing code."],
  ["ui", "Frappe UI", "Components and utilities for fast, consistent interfaces."],
  ["press", "Press", "Full-service hosting for the Frappe stack."],
  ["bench", "Bench", "Command-line management of multi-tenant deployments."],
  ["datatable", "Datatable", "Interactive data tables inside your apps."],
  ["charts", "Charts", "Interactive charts and visualizations."],
  ["gantt", "Gantt", "Interactive project timelines."],
];

export const DEPLOY_TEXT = DEPLOY;
