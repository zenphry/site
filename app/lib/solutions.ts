export type Solution = {
  slug: string;
  category: "industry" | "capability";
  label: string;
  title: string;
  summary: string;
  description: string;
  outcomes: Array<{ title: string; body: string }>;
  useCases: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const solutions: Solution[] = [
  {
    slug: "education-private-cloud",
    category: "industry",
    label: "Education",
    title: "Open-Source Private Cloud for Education",
    summary:
      "Move beyond VMware with a managed private cloud built on Apache CloudStack or OpenStack.",
    description:
      "Zenphry helps schools, colleges, universities, and education providers replace expensive or restrictive virtualization estates with a private cloud they control. We assess the existing environment, select the right open-source foundation, migrate workloads in stages, and provide the operating model for the platform after cutover.",
    outcomes: [
      {
        title: "A practical VMware exit plan",
        body: "Inventory virtual machines, dependencies, storage, networks, backup needs, and migration windows before the first workload moves.",
      },
      {
        title: "The right cloud foundation",
        body: "Use Apache CloudStack for a focused IaaS platform with streamlined operations, or OpenStack where the institution needs deeper customization and integration control.",
      },
      {
        title: "Controlled data and operations",
        body: "Design compute, storage, networking, identity, backup, monitoring, and access around the institution's policy and operating requirements.",
      },
      {
        title: "A Team Ready to Operate It",
        body: "Provide runbooks, administrator training, and managed operations options so the platform remains supportable after launch.",
      },
    ],
    useCases: [
      {
        title: "VMware and vSphere migration",
        body: "Move Linux and Windows server workloads out of vSphere and into KVM-based private cloud infrastructure through staged testing, cutover planning, and rollback preparation.",
      },
      {
        title: "Learning platforms",
        body: "Host learning management systems, student portals, online assessment tools, and their supporting databases on isolated virtual infrastructure.",
      },
      {
        title: "Administrative systems",
        body: "Run finance, HR, scheduling, procurement, and student administration systems with defined access controls, backups, and monitoring.",
      },
      {
        title: "Research and lab environments",
        body: "Provide self-service virtual machines and controlled network segments for research projects, computer labs, and short-lived course environments.",
      },
      {
        title: "Remote desktop labs",
        body: "Deliver centrally managed Windows or Linux desktop environments for students and staff who need access to licensed applications from off campus.",
      },
      {
        title: "Backup and recovery",
        body: "Build backup, restore, snapshot, and disaster-recovery procedures around critical academic and administrative workloads.",
      },
    ],
    faqs: [
      {
        question:
          "Which platform is right for our institution, Apache CloudStack or OpenStack?",
        answer:
          "Apache CloudStack is often the stronger fit for institutions seeking a focused virtual-machine platform with a simpler operating model. OpenStack suits environments requiring extensive customization, complex integrations, or a broader cloud engineering program. Zenphry assesses both options before recommending a design.",
      },
      {
        question: "Will existing VMware workloads move to the new platform?",
        answer:
          "Many Linux and Windows virtual machines are good migration candidates. Zenphry validates guest operating systems, drivers, storage, networking, licensing, and application dependencies during discovery, then groups workloads into safe migration waves.",
      },
      {
        question: "Will we need to operate the platform ourselves?",
        answer:
          "Zenphry supports several operating models, including administrator training, runbook handoff, and ongoing managed operations. The model is defined during architecture and planning.",
      },
      {
        question: "Will the private cloud support student data requirements?",
        answer:
          "The architecture is designed around your chosen hosting location, access controls, audit needs, backup policies, and institutional privacy requirements. Your legal and privacy teams remain responsible for confirming regulatory obligations.",
      },
    ],
  },
  {
    slug: "legal-workspace",
    category: "industry",
    label: "Legal",
    title: "Secure Legal Workspace and Cloud VDI",
    summary:
      "Centralize files and Windows workspaces so legal staff work securely from any approved location.",
    description:
      "Zenphry designs cloud workspaces for law firms needing a central place for matter files and a consistent Windows desktop for lawyers, paralegals, secretaries, and operations staff. Team members sign in from an approved laptop, establish a secure VPN connection, and use their cloud desktop. Client files and core applications stay in the managed environment instead of becoming scattered across endpoint devices.",
    outcomes: [
      {
        title: "Centralized matter files",
        body: "Deploy a controlled file-sharing platform with matter-based permissions, collaboration workflows, retention planning, backup, and audit support.",
      },
      {
        title: "Windows desktops in the cloud",
        body: "Provide role-appropriate virtual Windows desktops for lawyers, paralegals, secretaries, finance, and operations teams.",
      },
      {
        title: "Low-data endpoint design",
        body: "Configure approved laptops as access devices while work takes place in the virtual desktop. Device, clipboard, download, and printing policies are defined by the firm.",
      },
      {
        title: "Secure remote access",
        body: "Connect staff through a managed VPN and access controls, with separate administrative paths for the firm's supporting systems.",
      },
    ],
    useCases: [
      {
        title: "Matter document management",
        body: "Organize pleadings, correspondence, evidence, contracts, and research in a central workspace with access based on role, matter, or practice group.",
      },
      {
        title: "Remote legal desktops",
        body: "Give staff a familiar Windows workspace for practice-management, accounting, document-production, and research applications without placing the primary working copy on their laptop.",
      },
      {
        title: "Branch and hybrid work",
        body: "Use the same controlled desktop and file environment from offices, court locations, home offices, and approved mobile work locations.",
      },
      {
        title: "Secure onboarding and offboarding",
        body: "Provision access by role, then remove it quickly when staff, contractors, or co-counsel relationships change.",
      },
      {
        title: "Business continuity",
        body: "Keep key applications, files, and staff workspaces available when an office, workstation, or local file server is unavailable.",
      },
      {
        title: "Client collaboration",
        body: "Provide controlled client portals or external sharing areas where the firm needs a documented way to exchange files outside the internal workspace.",
      },
    ],
    faqs: [
      {
        question: "Does this mean no client data ever reaches a laptop?",
        answer:
          "The design keeps primary work and files in the managed environment. The firm decides with Zenphry if downloads, clipboard transfer, printing, or local synchronization are allowed. No technical design removes the need for endpoint security and staff training.",
      },
      {
        question:
          "Will our existing Windows legal applications run in cloud VDI?",
        answer:
          "Many desktop applications work well in a virtual desktop environment. Zenphry validates application compatibility, performance, peripheral needs, and licensing before deployment. Windows and application licensing remain subject to the relevant vendor terms.",
      },
      {
        question: "How do staff connect from home or court?",
        answer:
          "Staff authenticate to the firm's managed VPN from an approved device, then open their virtual desktop. The exact identity, device-management, and multi-factor authentication requirements are defined with the firm.",
      },
      {
        question: "Does Zenphry provide legal compliance advice?",
        answer:
          "No. Zenphry designs and operates technology controls. The firm should have its legal, privacy, and professional-responsibility advisers confirm obligations for client data, records, and remote work.",
      },
    ],
  },
  {
    slug: "private-ai-hr-assistant",
    category: "capability",
    label: "Private AI",
    title: "Private AI HR Assistant",
    summary:
      "Automate routine HR questions with an AI assistant grounded in your current policies and workflows.",
    description:
      "Zenphry builds private AI assistants to help employees find answers about benefits, leave, onboarding, policies, and internal processes. The assistant uses an approved knowledge base, follows instructions set by your organization, and routes issues requiring human judgment into your existing support process. HR teams spend less time repeating policy answers and more time on employee support requiring their expertise.",
    outcomes: [
      {
        title: "A Knowledge Base with Current Content",
        body: "Connect approved HR policies, handbooks, benefits material, onboarding guides, and process documentation so answers reflect the latest published guidance.",
      },
      {
        title: "Private AI controls",
        body: "Deploy the assistant with access boundaries, approved instructions, logging, and data-handling rules appropriate for employee information.",
      },
      {
        title: "Escalation when judgment is needed",
        body: "Create help-desk tickets or notify the right HR team when a request is sensitive, incomplete, outside policy, or requires a human decision.",
      },
      {
        title: "Integration with the way work happens",
        body: "Connect the assistant to approved internal tools and workflows for current information retrieval and clear next steps.",
      },
    ],
    useCases: [
      {
        title: "Benefits and leave questions",
        body: "Answer common questions about benefits enrollment, paid time off, leave procedures, and deadlines using the organization's approved HR documentation.",
      },
      {
        title: "Employee onboarding",
        body: "Guide new employees through required steps, policies, training, equipment requests, and internal contacts during their first weeks.",
      },
      {
        title: "Policy lookup",
        body: "Help employees locate the relevant policy and explain its published guidance without requiring HR to repeat the same answer throughout the day.",
      },
      {
        title: "HR service desk triage",
        body: "Collect the details required for a request, answer straightforward questions, and create a ticket for matters requiring human review.",
      },
      {
        title: "Manager support",
        body: "Give managers a consistent first stop for performance-process, onboarding, policy, and people-operations guidance.",
      },
      {
        title: "Internal communications",
        body: "Draft policy reminders, onboarding summaries, and employee-facing explanations from approved source material for HR review.",
      },
    ],
    faqs: [
      {
        question: "What is an AI HR assistant?",
        answer:
          "It is a secure internal assistant for routine employee questions, grounded in your approved HR information. It uses retrieval-augmented generation with the documents and systems you choose.",
      },
      {
        question: "Which documents should the assistant use?",
        answer:
          "Yes. Zenphry defines the approved knowledge sources, update process, permissions, and instructions before deployment. HR remains responsible for the accuracy of the underlying policies and documentation.",
      },
      {
        question: "How are sensitive questions handled?",
        answer:
          "The assistant is configured to recognize categories requiring human review and route them to the correct team or ticket queue. It should not make employment decisions, provide legal advice, or replace HR judgment.",
      },
      {
        question: "Does the assistant connect to our existing tools?",
        answer:
          "Yes, where the required APIs, permissions, and security review are available. Zenphry scopes integrations for your HRIS, help desk, identity system, or internal portal based on the workflow you need.",
      },
    ],
  },
  {
    slug: "managed-vpn",
    category: "capability",
    label: "Secure Connectivity",
    title: "Managed VPN for Growing Teams",
    summary:
      "Give small and mid-sized organizations secure, manageable access to systems without enterprise VPN complexity.",
    description:
      "Zenphry designs and operates practical VPN solutions for growing teams using modern WireGuard-based networking such as Headscale or NetBird. Staff, contractors, offices, cloud workloads, and managed devices connect through encrypted access with clear policies. The result is a simpler way to reach approved business systems without exposing every service to the public internet.",
    outcomes: [
      {
        title: "A right-sized network",
        body: "Start with the users, sites, applications, and support needs you have now, then add capacity and controls as the organization grows.",
      },
      {
        title: "Central policy management",
        body: "Define who reaches which systems, segment sensitive resources, and manage access changes from a central control plane.",
      },
      {
        title: "Modern encrypted connectivity",
        body: "Use WireGuard-based encrypted connections for staff devices, servers, cloud infrastructure, offices, and approved third parties.",
      },
      {
        title: "Operational ownership",
        body: "Document access rules, onboard and offboard users, monitor the service, and provide ongoing support appropriate for your team.",
      },
    ],
    useCases: [
      {
        title: "Remote staff access",
        body: "Give remote and hybrid employees access to approved internal applications, cloud VDI, file services, and administration tools.",
      },
      {
        title: "Cloud administration",
        body: "Place private cloud, public cloud, and managed server administration behind a controlled private network instead of public management ports.",
      },
      {
        title: "Multi-site connectivity",
        body: "Connect offices, home offices, field teams, and cloud environments through a consistent encrypted network design.",
      },
      {
        title: "Third-party access",
        body: "Give contractors, managed service partners, auditors, or suppliers narrowly scoped access with an expiry and review process.",
      },
      {
        title: "Secure application access",
        body: "Reach internal web applications, databases, file servers, and administrative consoles without exposing them directly to the internet.",
      },
      {
        title: "Business continuity access",
        body: "Maintain a controlled path to critical systems when staff work away from a primary office or during an interruption.",
      },
    ],
    faqs: [
      {
        question: "Why use Headscale or NetBird?",
        answer:
          "Both support modern WireGuard-based connectivity. Headscale is a self-hosted control server for organizations seeking a lightweight, open-source approach. NetBird provides a broader management layer. Zenphry selects the fit based on your identity, device, policy, and support needs.",
      },
      {
        question: "Is this suitable for a small business?",
        answer:
          "Yes. The service is designed for organizations needing stronger access control than a consumer VPN without a large in-house network team. Scope and support are sized to the number of users, sites, devices, and applications.",
      },
      {
        question: "Is access limited by role or device?",
        answer:
          "Yes. Zenphry defines access rules based on roles, groups, devices, networks, and applications. Where available, the design includes identity-provider and multi-factor authentication requirements.",
      },
      {
        question: "Does a VPN replace endpoint security?",
        answer:
          "No. A VPN protects network transport and controls access paths. It works alongside device management, patching, endpoint protection, identity controls, backups, and staff security practices.",
      },
    ],
  },
];

export function getSolution(slug: string | undefined) {
  return solutions.find((solution) => solution.slug === slug);
}
