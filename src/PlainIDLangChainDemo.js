import React, { useState, useEffect } from 'react';
import { Shield, Send, User, Filter, Database, Eye, Check, AlertTriangle, Lock, ChevronRight, Calendar, Download, MapPin, Users, Layers, Menu, Plus, MessageSquare, ArrowRight, Unlock, Paperclip, Camera, X, FileText, Image as ImageIcon, FileSpreadsheet, File, Building2, Cpu, HeartPulse, DollarSign, Upload, Sparkles } from 'lucide-react';

export default function PlainIDChatFullContent() {
  const [userRole, setUserRole] = useState('manager');
  const [queryIndex, setQueryIndex] = useState(0);
  const [currentGuardrail, setCurrentGuardrail] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [showCTAModal, setShowCTAModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showComparison, setShowComparison] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [hoveredIndustry, setHoveredIndustry] = useState(null);
  const [showFollowUps, setShowFollowUps] = useState(false);
  const [activeFollowUp, setActiveFollowUp] = useState(null); // Track active follow-up question
  const messagesEndRef = React.useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  // Context-aware file names based on industry
  const contextAwareFileNames = {
    healthcare: {
      document: ['Clinical_Trial_Summary.pdf', 'Patient_Demographics_Report.pdf', 'Treatment_Protocol_Draft.docx', 'Insurance_Claims_Analysis.xlsx', 'Diagnosis_Code_Reference.pdf'],
      screenshot: ['Lab_Results_Screenshot.png', 'Medical_Dashboard.png', 'Patient_Portal_Capture.png', 'Clinical_Workflow_Diagram.png', 'EHR_Interface.png']
    },
    asset_management: {
      document: ['Portfolio_Holdings_Q4.xlsx', 'Fund_Performance_Draft.pdf', 'Trade_Confirmation_Report.pdf', 'Investment_Strategy_Memo.docx', 'Risk_Assessment_Analysis.xlsx'],
      screenshot: ['Trading_Dashboard.png', 'Market_Analysis_Chart.png', 'Portfolio_Allocation.png', 'Performance_Graph.png', 'Compliance_Alert_Capture.png']
    },
    technology: {
      document: ['Product_Roadmap_2025.pdf', 'Technical_Architecture.docx', 'API_Documentation_Draft.pdf', 'Security_Audit_Report.xlsx', 'Feature_Specs_v2.pdf'],
      screenshot: ['UI_Mockup_v2.png', 'Dashboard_Wireframe.png', 'System_Architecture_Diagram.png', 'Error_Log_Capture.png', 'Analytics_Dashboard.png']
    },
    general: {
      document: ['Q4_Revenue_Analysis.xlsx', 'Strategic_Plan_Draft.pdf', 'Employee_Performance_Summary.docx', 'Budget_Forecast_2025.xlsx', 'Meeting_Notes_Executive.pdf'],
      screenshot: ['Org_Chart_Update.png', 'Sales_Dashboard.png', 'KPI_Metrics_Capture.png', 'Project_Timeline.png', 'Presentation_Slide.png']
    }
  };

  // Industry categories for filtering
  const industries = [
    { id: 'all', name: 'All Prompts', icon: Layers },
    { id: 'asset_management', name: 'Asset Management', icon: DollarSign },
    { id: 'technology', name: 'Technology / ISVs', icon: Cpu },
    { id: 'healthcare', name: 'Healthcare Payer-Providers', icon: HeartPulse },
    { id: 'general', name: 'General Enterprise', icon: Building2 }
  ];

  // Enhanced sample queries with categories and industry verticals
  const sampleQueries = [
    // === GENERAL ENTERPRISE ===
    { 
      text: 'What were our Q4 financial results?', 
      category: 'financial_data',
      topics: ['revenue', 'profit', 'financial_performance'],
      industry: 'general',
      followUps: [
        'How does this compare to Q3?',
        'What drove the revenue growth?',
        'Show me the regional breakdown'
      ]
    },
    { 
      text: 'Show me customer satisfaction trends in Europe', 
      category: 'customer_analytics',
      topics: ['customer_data', 'analytics', 'regional_data'],
      industry: 'general',
      followUps: [
        'What about North America trends?',
        'Which products have the lowest satisfaction?',
        'Show me the support ticket volume'
      ]
    },
    { 
      text: 'List employees with performance concerns in my department', 
      category: 'hr_records',
      topics: ['employee_data', 'performance', 'hr_sensitive'],
      industry: 'general',
      followUps: [
        'What improvement plans are in place?',
        'Show retention risk analysis',
        'Compare to company-wide metrics'
      ]
    },
    { 
      text: 'Explain the security architecture of our new product', 
      category: 'technical_documentation',
      topics: ['security', 'architecture', 'product_specs'],
      industry: 'general',
      followUps: [
        'What compliance certifications do we have?',
        'How does encryption work?',
        'Show me the deployment options'
      ]
    },
    { 
      text: 'What are the salary ranges for senior engineers?', 
      category: 'compensation_data',
      topics: ['salary', 'compensation', 'hr_confidential'],
      industry: 'general',
      followUps: [
        'How does this compare to market rates?',
        'What about equity compensation?',
        'Show me the bonus structure'
      ]
    },

    // === ASSET MANAGEMENT / FINANCE ===
    { 
      text: 'What are the unreleased fund performance numbers?', 
      category: 'mnpi_data',
      topics: ['mnpi', 'fund_performance', 'pre_release'],
      industry: 'asset_management',
      followUps: [
        'When is the official release date?',
        'How does this compare to benchmark?',
        'Show me the top holdings changes'
      ]
    },
    { 
      text: 'Show pending M&A targets in our pipeline', 
      category: 'mnpi_data',
      topics: ['mnpi', 'mergers', 'acquisitions', 'deal_pipeline'],
      industry: 'asset_management',
      followUps: [
        'What is the valuation range?',
        'Who are the advisors involved?',
        'What is the expected timeline?'
      ]
    },
    { 
      text: 'List material non-public information compliance status', 
      category: 'compliance_data',
      topics: ['mnpi', 'compliance', 'regulatory'],
      industry: 'asset_management',
      followUps: [
        'Show me recent violations',
        'Who needs compliance training?',
        'What are the restricted securities?'
      ]
    },
    { 
      text: 'What insider transactions are pending disclosure?', 
      category: 'mnpi_data',
      topics: ['insider_trading', 'disclosure', 'mnpi'],
      industry: 'asset_management',
      followUps: [
        'When are the filing deadlines?',
        'Show Form 4 preparation status',
        'List executives with open trading windows'
      ]
    },
    { 
      text: 'Show pre-announcement earnings projections', 
      category: 'mnpi_data',
      topics: ['earnings', 'projections', 'mnpi', 'pre_release'],
      industry: 'asset_management',
      followUps: [
        'What assumptions drive the forecast?',
        'How does this compare to analyst consensus?',
        'Show me the quarterly breakdown'
      ]
    },

    // === TECHNOLOGY / ISVs ===
    { 
      text: 'What features are in our unreleased product roadmap?', 
      category: 'product_roadmap',
      topics: ['roadmap', 'features', 'pre_release', 'strategy'],
      industry: 'technology',
      followUps: [
        'What is the release timeline?',
        'Which customers requested these features?',
        'Show competitive analysis'
      ]
    },
    { 
      text: 'Show confidential partnership negotiations in progress', 
      category: 'strategic_partnerships',
      topics: ['partnerships', 'negotiations', 'confidential'],
      industry: 'technology',
      followUps: [
        'What are the deal terms?',
        'Who is leading the negotiations?',
        'What is the strategic rationale?'
      ]
    },
    { 
      text: 'List pending patent filings and IP status', 
      category: 'intellectual_property',
      topics: ['patents', 'ip', 'legal', 'confidential'],
      industry: 'technology',
      followUps: [
        'What is the filing timeline?',
        'Show prior art analysis',
        'Which competitors have similar patents?'
      ]
    },
    { 
      text: 'What are our cloud infrastructure costs by customer?', 
      category: 'financial_data',
      topics: ['costs', 'infrastructure', 'customer_data'],
      industry: 'technology',
      followUps: [
        'Which customers are most profitable?',
        'Show margin analysis by tier',
        'What cost optimization opportunities exist?'
      ]
    },
    { 
      text: 'Show security vulnerabilities in our current release', 
      category: 'security_data',
      topics: ['security', 'vulnerabilities', 'confidential'],
      industry: 'technology',
      followUps: [
        'What is the severity classification?',
        'When will patches be released?',
        'Which customers are affected?'
      ]
    },

    // === HEALTHCARE PAYER-PROVIDERS ===
    { 
      text: 'Show pre-announcement clinical trial results', 
      category: 'clinical_data',
      topics: ['clinical_trials', 'pre_release', 'mnpi', 'research'],
      industry: 'healthcare',
      followUps: [
        'What is the efficacy data?',
        'Show adverse event summary',
        'When is FDA submission planned?'
      ]
    },
    { 
      text: 'What are our confidential reimbursement rate negotiations?', 
      category: 'payer_contracts',
      topics: ['reimbursement', 'contracts', 'negotiations', 'confidential'],
      industry: 'healthcare',
      followUps: [
        'Which payers are we negotiating with?',
        'What rates are we targeting?',
        'Show historical rate trends'
      ]
    },
    { 
      text: 'List patients eligible for our new treatment protocol', 
      category: 'phi_data',
      topics: ['patient_data', 'phi', 'treatment', 'hipaa'],
      industry: 'healthcare',
      followUps: [
        'What are the eligibility criteria?',
        'Show patient demographics',
        'What is the enrollment status?'
      ]
    },
    { 
      text: 'Show pending FDA approval status for our drugs', 
      category: 'regulatory_data',
      topics: ['fda', 'regulatory', 'drug_approval', 'mnpi'],
      industry: 'healthcare',
      followUps: [
        'What is the PDUFA date?',
        'Are there any FDA concerns?',
        'Show competitive landscape'
      ]
    },
    { 
      text: 'What are the utilization patterns by diagnosis code?', 
      category: 'healthcare_analytics',
      topics: ['utilization', 'analytics', 'diagnosis', 'claims'],
      industry: 'healthcare',
      followUps: [
        'Show cost per episode of care',
        'Which providers have highest utilization?',
        'Compare to benchmark data'
      ]
    }
  ];

  // Follow-up responses - contextual responses for each follow-up question
  const followUpResponses = {
    // === Q4 Financial Results Follow-ups ===
    'How does this compare to Q3?': {
      category: 'financial_data',
      topics: ['revenue', 'profit', 'quarterly_comparison'],
      responses: {
        executive: {
          text: "Q4 vs Q3 comparison: Revenue +12% ($2.3M vs $2.05M), Profit margin +2.1% (23.4% vs 21.3%), EBITDA +15% ($540K vs $470K). Key driver: Enterprise segment growth accelerated from 8% to 15% QoQ. Operating expenses remained flat.",
          generalized: false
        },
        manager: {
          text: "Q4 vs Q3 comparison: Revenue increased ████████████████ quarter-over-quarter. Profit margin improved by ████████████████. EBITDA grew ████████████████. Enterprise segment was the primary growth driver with accelerated performance. Operating expenses remained stable.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      followUps: ['What about year-over-year trends?', 'Show Q1 and Q2 data', 'What is the forecast for Q1 next year?']
    },
    'What drove the revenue growth?': {
      category: 'financial_data',
      topics: ['revenue', 'growth_drivers', 'analysis'],
      responses: {
        executive: {
          text: "Revenue growth drivers: 1) Enterprise segment expansion (+$180K, 3 new Fortune 500 clients), 2) Upsells to existing customers (+$95K, 23% attach rate), 3) Price optimization (+$45K, 5% average increase), 4) Reduced churn (-$30K saved). Pipeline remains strong at $1.2M qualified opportunities.",
          generalized: false
        },
        manager: {
          text: "Revenue growth drivers: 1) Enterprise segment expansion with ████████████████ new clients contributing ████████████████, 2) Upsells to existing customers adding ████████████████, 3) Price optimization contributing ████████████████, 4) Reduced churn saving ████████████████. Pipeline remains healthy.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      followUps: ['Which products drove the most growth?', 'Show customer acquisition details', 'What is the churn rate?']
    },
    'Show me the regional breakdown': {
      category: 'financial_data',
      topics: ['revenue', 'regional', 'geography'],
      responses: {
        executive: {
          text: "Regional breakdown: North America $1.38M (60%, +15% QoQ), EMEA $690K (30%, +8% QoQ), APAC $230K (10%, +18% QoQ). Strongest growth in APAC driven by Japan expansion. EMEA impacted by EUR/USD headwinds (-3% constant currency adjustment).",
          generalized: false
        },
        manager: {
          text: "Regional breakdown: North America leads at ████████████████ of revenue with ████████████████ QoQ growth. EMEA represents ████████████████ with moderate growth. APAC showing highest percentage growth at ████████████████ driven by expansion initiatives.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      followUps: ['Show country-level details', 'What is driving APAC growth?', 'How do margins vary by region?']
    },

    // === Customer Satisfaction Follow-ups ===
    'What about North America trends?': {
      category: 'customer_analytics',
      topics: ['customer_data', 'analytics', 'north_america'],
      responses: {
        executive: {
          text: "North America satisfaction: 89.1% (+3.8 pts), NPS 58 (+6). Top performers: Product uptime (9.2/10), Feature completeness (8.8/10). Areas for improvement: Onboarding speed (7.1/10), Documentation (7.4/10). 2 enterprise accounts flagged for executive attention ($520K ARR at risk).",
          generalized: false
        },
        manager: {
          text: "North America satisfaction: ████████████████ with ████████████████ point improvement. NPS increased to ████████████████. Top performers: Product uptime and feature completeness rated highly. Areas for improvement: Onboarding speed and documentation. Some accounts flagged for attention with ████████████████ ARR at risk.",
          generalized: true
        },
        employee: {
          text: "North America satisfaction trends are positive with ████████████████ improvement this quarter. NPS also improved by ████████████████. Product uptime and features rated as strengths. Some process improvements identified for ████████████████ and ████████████████.",
          generalized: true
        }
      },
      followUps: ['Compare all regions side by side', 'Show at-risk accounts', 'What actions are planned for improvements?']
    },
    'Which products have the lowest satisfaction?': {
      category: 'customer_analytics',
      topics: ['customer_data', 'product_satisfaction', 'analytics'],
      responses: {
        executive: {
          text: "Lowest satisfaction by product: 1) Legacy API v1 - 72% (end-of-life Q2, migration support needed), 2) Mobile App - 78% (v2.0 launching next month), 3) Reporting Module - 81% (UX refresh in progress). Action plans in place for all three with expected +10pt improvement within 2 quarters.",
          generalized: false
        },
        manager: {
          text: "Lowest satisfaction by product: 1) Legacy API v1 at ████████████████ (end-of-life ████████████████, migration support needed), 2) Mobile App at ████████████████ (new version launching ████████████████), 3) Reporting Module at ████████████████ (UX refresh in progress). Action plans in place with expected improvement of ████████████████ within 2 quarters.",
          generalized: true
        },
        employee: {
          text: "Products with lower satisfaction: Legacy API (migration recommended), Mobile App (new version coming ████████████████), and Reporting Module (improvements underway). Expected improvement of ████████████████ planned. Contact product team for specific feedback channels.",
          generalized: true
        }
      },
      followUps: ['What is the migration plan for legacy API?', 'When does Mobile App v2 launch?', 'Show the UX refresh timeline']
    },
    'Show me the support ticket volume': {
      category: 'customer_analytics',
      topics: ['support', 'tickets', 'analytics'],
      responses: {
        executive: {
          text: "Support metrics Q4: 2,847 tickets (+5% QoQ), Avg resolution 4.2 hrs (-18%), First response 12 min (-25%), CSAT 94.2% (+1.8pts). Top categories: Integration questions (32%), Feature requests (24%), Bug reports (18%). Headcount efficiency improved 15%.",
          generalized: false
        },
        manager: {
          text: "Support metrics Q4: ████████████████ tickets with ████████████████ QoQ change. Avg resolution ████████████████ with ████████████████ improvement. First response ████████████████ with ████████████████ improvement. CSAT ████████████████. Top categories: Integration questions, feature requests, bug reports. Headcount efficiency improved ████████████████.",
          generalized: true
        },
        employee: {
          text: "Support metrics show improvement in response times this quarter. Average resolution improved by ████████████████. Customer satisfaction with support remains high at ████████████████. Top ticket category is ████████████████. Integration documentation being enhanced.",
          generalized: true
        }
      },
      followUps: ['Show ticket trends by category', 'What are the most common issues?', 'How does this compare to last year?']
    },

    // === HR Records Follow-ups ===
    'What improvement plans are in place?': {
      category: 'hr_records',
      topics: ['performance', 'improvement_plans', 'hr_sensitive'],
      responses: {
        executive: {
          text: "Active PIPs: J. Smith (deadline management, 60-day plan, mentor assigned), M. Johnson (deadline management, 90-day plan, workload reduced 20%), K. Lee (communication, coaching sessions 2x/week). Success rate historical: 65% return to good standing. HR review scheduled for Jan 15.",
          generalized: false
        },
        manager: {
          text: "Active PIPs: ████████████████ (deadline management, ████████████████ plan, mentor assigned), ████████████████ (deadline management, ████████████████ plan, workload reduced ████████████████), ████████████████ (communication, coaching sessions ████████████████). Historical success rate: ████████████████. HR review scheduled for ████████████████.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      followUps: ['What is the success rate of PIPs?', 'Show the review schedule', 'What support resources are available?']
    },
    'Show retention risk analysis': {
      category: 'hr_records',
      topics: ['retention', 'risk', 'hr_sensitive'],
      responses: {
        executive: {
          text: "Retention risk analysis: High risk - 2 employees (both receiving competing offers, combined $180K salary), Medium risk - 4 employees (career growth concerns), Low risk - remainder. Recommended actions: Retention bonuses for high-risk ($25K each), career pathing discussions for medium-risk. Flight risk cost estimate: $340K if all high-risk depart.",
          generalized: false
        },
        manager: {
          text: "Retention risk analysis: High risk - ████████████████ employees (receiving competing offers, combined ████████████████ salary), Medium risk - ████████████████ employees (career growth concerns). Recommended actions: Retention bonuses of ████████████████ each for high-risk, career pathing discussions for medium-risk. Flight risk cost estimate: ████████████████.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      followUps: ['What retention actions are recommended?', 'Show historical turnover data', 'What is the cost of turnover?']
    },
    'Compare to company-wide metrics': {
      category: 'hr_records',
      topics: ['performance', 'benchmarks', 'comparison'],
      responses: {
        executive: {
          text: "Department vs Company comparison: Performance concerns 4.2% vs 3.8% company avg (+0.4%), Turnover 8% vs 11% company avg (-3%), Engagement score 7.8 vs 7.5 company avg (+0.3). Your department outperforms on retention and engagement despite slightly higher performance concerns.",
          generalized: false
        },
        manager: {
          text: "Department vs Company comparison: Performance concerns ████████████████ vs ████████████████ company avg, Turnover ████████████████ vs ████████████████ company avg, Engagement score ████████████████ vs ████████████████ company avg. Your department outperforms on retention and engagement despite slightly higher performance concerns.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      followUps: ['Show department ranking', 'What drives engagement scores?', 'How do we compare to industry?']
    },

    // === Technical Documentation Follow-ups ===
    'What compliance certifications do we have?': {
      category: 'technical_documentation',
      topics: ['compliance', 'certifications', 'security'],
      responses: {
        executive: {
          text: "Current certifications: SOC2 Type II (renewed Oct 2024), ISO 27001 (valid through 2026), HIPAA BAA available, GDPR compliant, FedRAMP Moderate (in progress, expected Q2 2025). Audit findings: 0 critical, 2 minor (remediated). Investment in FedRAMP: $180K.",
          generalized: false
        },
        manager: {
          text: "Current certifications: SOC2 Type II (renewed ████████████████), ISO 27001 (valid through ████████████████), HIPAA BAA available, GDPR compliant, FedRAMP Moderate (in progress, expected ████████████████). Audit findings: ████████████████ critical, ████████████████ minor (remediated). Investment in FedRAMP: ████████████████.",
          generalized: true
        },
        employee: {
          text: "Current certifications: SOC2 Type II (renewed ████████████████), ISO 27001 (valid through ████████████████), HIPAA and GDPR compliance supported. FedRAMP certification ████████████████. Audit status: ████████████████ critical findings. Contact security team for customer-specific requirements.",
          generalized: true
        }
      },
      followUps: ['When is the next SOC2 audit?', 'What is FedRAMP status?', 'Show compliance roadmap']
    },
    'How does encryption work?': {
      category: 'technical_documentation',
      topics: ['encryption', 'security', 'technical'],
      responses: {
        executive: {
          text: "Encryption architecture: Data at rest - AES-256-GCM with customer-managed keys option, Data in transit - TLS 1.3 with perfect forward secrecy, Key management - AWS KMS with HSM backing, Rotation - automatic 90-day rotation. Quantum-resistant algorithms (CRYSTALS-Kyber) in beta testing.",
          generalized: false
        },
        manager: {
          text: "Encryption architecture: Data at rest - AES-256-GCM with customer-managed keys option, Data in transit - TLS 1.3 with perfect forward secrecy, Key management - AWS KMS with HSM backing, Rotation - automatic ████████████████ rotation. Quantum-resistant algorithms in ████████████████ testing.",
          generalized: true
        },
        employee: {
          text: "Encryption architecture: Data at rest uses ████████████████ encryption standard. Data in transit uses ████████████████. Key management via ████████████████. Rotation schedule: ████████████████. Quantum-resistant encryption ████████████████. See security whitepaper for details.",
          generalized: true
        }
      },
      followUps: ['What is the key management process?', 'Show quantum-resistant roadmap', 'How do we handle key rotation?']
    },
    'Show me the deployment options': {
      category: 'technical_documentation',
      topics: ['deployment', 'infrastructure', 'technical'],
      responses: {
        executive: {
          text: "Deployment options: 1) Multi-tenant SaaS (default, $0 infrastructure), 2) Dedicated instance ($2K/mo, isolated compute), 3) Private cloud (AWS/Azure/GCP, $5K/mo minimum), 4) On-premise (Enterprise only, $50K setup + $8K/mo). Current mix: 78% SaaS, 15% dedicated, 5% private cloud, 2% on-premise.",
          generalized: false
        },
        manager: {
          text: "Deployment options: 1) Multi-tenant SaaS (default, ████████████████ infrastructure), 2) Dedicated instance (████████████████/mo, isolated compute), 3) Private cloud (AWS/Azure/GCP, ████████████████/mo minimum), 4) On-premise (Enterprise only, ████████████████ setup + ████████████████/mo). Current mix: ████████████████ SaaS, ████████████████ dedicated, ████████████████ private cloud, ████████████████ on-premise.",
          generalized: true
        },
        employee: {
          text: "Deployment options: Multi-tenant SaaS (default), dedicated instances (████████████████/mo), private cloud (████████████████/mo minimum), and on-premise (████████████████ setup). Current customer mix: majority on ████████████████. See documentation for technical specifications.",
          generalized: true
        }
      },
      followUps: ['What are the SLAs for each option?', 'Show pricing comparison', 'What is the migration process?']
    },

    // === Compensation Follow-ups ===
    'How does this compare to market rates?': {
      category: 'compensation_data',
      topics: ['compensation', 'market', 'benchmarks'],
      responses: {
        executive: {
          text: "Market comparison (Radford data): Our senior engineer median €89K vs market €85K (105% of market). Total comp €117K vs market €108K (108%). We're positioned at 75th percentile intentionally to attract top talent. Recommendation: Maintain current positioning, review annually.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },
      followUps: ['Show all level comparisons', 'What is our compensation philosophy?', 'When is the next market adjustment?']
    },
    'What about equity compensation?': {
      category: 'compensation_data',
      topics: ['equity', 'compensation', 'stock'],
      responses: {
        executive: {
          text: "Equity structure: Senior engineers receive €15K-€30K initial grant (4-year vest, 1-year cliff). Refresh grants: €10K-€20K annually for top performers. Current 409A valuation: $12.50/share (+25% YoY). Dilution budget: 3% annually. Total equity pool: 12% of fully diluted shares.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },
      followUps: ['What is the vesting schedule?', 'How are refresh grants determined?', 'Show equity band guidelines']
    },
    'Show me the bonus structure': {
      category: 'compensation_data',
      topics: ['bonus', 'compensation', 'incentives'],
      responses: {
        executive: {
          text: "Bonus structure for senior engineers: Target 15% of base salary (€11K-€16K). Components: Company performance 50% (threshold 80%, target 100%, max 150%), Individual performance 50% (rating-based multiplier 0-150%). Q4 payout forecast: 112% of target based on current projections.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },
      followUps: ['When are bonuses paid?', 'How is company performance measured?', 'What determines individual multiplier?']
    },

    // === MNPI Follow-ups ===
    'When is the official release date?': {
      category: 'mnpi_data',
      topics: ['mnpi', 'release_date', 'timing'],
      responses: {
        executive: {
          text: "Official release schedule: Fund performance - Jan 15 (10 days), Earnings - Jan 28 after market close, M&A announcement - pending board approval (expected Feb). Quiet period begins Jan 5. All employees reminded of trading restrictions via compliance memo.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },
      followUps: ['What are the quiet period rules?', 'Who needs to be notified?', 'Show the IR calendar']
    },
    'How does this compare to benchmark?': {
      category: 'mnpi_data',
      topics: ['mnpi', 'benchmark', 'performance'],
      responses: {
        executive: {
          text: "Benchmark comparison (CONFIDENTIAL): Fund A vs S&P 500 - outperformed by 340bps, Fund B vs Russell 2000 - underperformed by 120bps, Fund C vs MSCI EM - outperformed by 520bps. Attribution: Security selection +280bps, Sector allocation +60bps. Top contributor: Tech overweight.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },
      followUps: ['Show attribution analysis', 'What drove outperformance?', 'Compare to peer funds']
    },
    'Show me the top holdings changes': {
      category: 'mnpi_data',
      topics: ['mnpi', 'holdings', 'portfolio'],
      responses: {
        executive: {
          text: "Holdings changes (CONFIDENTIAL - pre-13F): New positions - NVDA (+$12M), MSFT (+$8M). Increased - AAPL (+$5M, now 4.2% of fund). Decreased - TSLA (-$15M, reduced to 1.1%). Exited - META (sold entire $20M position). Changes reflect AI thesis and valuation discipline.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },
      followUps: ['What is the investment thesis?', 'When is the 13F filing?', 'Show sector allocation changes']
    },

    // === Compliance Follow-ups ===
    'Show me recent violations': {
      category: 'compliance_data',
      topics: ['compliance', 'violations', 'regulatory'],
      responses: {
        executive: {
          text: "Recent violations: 2 pending review. 1) Late trade pre-clearance (J. Martinez, $12K personal trade, 2 days late, administrative), 2) Incomplete attestation (M. Thompson, annual compliance form, 5 days overdue). Both non-material, remediation in progress. No SEC referrals.",
          generalized: false
        },
        manager: {
          text: "Recent violations: ████████████████ pending review. 1) Late trade pre-clearance (████████████████, ████████████████ trade, ████████████████ late, administrative), 2) Incomplete attestation (████████████████, annual compliance form, ████████████████ overdue). Both non-material, remediation in progress.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      followUps: ['What is the remediation timeline?', 'Show historical violation trends', 'What training is required?']
    },
    'Who needs compliance training?': {
      category: 'compliance_data',
      topics: ['compliance', 'training', 'employees'],
      responses: {
        executive: {
          text: "Training status: 98.2% complete. Outstanding: 4 employees (3 new hires in grace period, 1 on leave). Overdue: R. Chen (MNPI certification, due Dec 1), reminder sent. Next quarterly training: Jan 15 (insider trading refresh). Auto-enrollment triggered for all.",
          generalized: false
        },
        manager: {
          text: "Training status: ████████████████ complete. Outstanding: ████████████████ employees (████████████████ new hires in grace period, ████████████████ on leave). Overdue: ████████████████ (████████████████ certification, due ████████████████). Next quarterly training: ████████████████.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      followUps: ['What is the training curriculum?', 'Show completion by department', 'What are the consequences for non-completion?']
    },
    'What are the restricted securities?': {
      category: 'compliance_data',
      topics: ['compliance', 'restricted', 'securities'],
      responses: {
        executive: {
          text: "Restricted list: 47 securities. Categories: Active research (23), Client holdings >5% (12), Pending transactions (8), Material relationships (4). Notable additions this month: ACME Corp (M&A advisory), TechStart Inc (>5% position). Full list available in compliance portal.",
          generalized: false
        },
        manager: {
          text: "Restricted list: ████████████████ securities. Categories: Active research (████████████████), Client holdings >5% (████████████████), Pending transactions (████████████████), Material relationships (████████████████). Notable additions this month: ████████████████. Full list available in compliance portal.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      followUps: ['How often is the list updated?', 'What triggers a restriction?', 'Show removal criteria']
    },

    // === Product Roadmap Follow-ups ===
    'What is the release timeline?': {
      category: 'product_roadmap',
      topics: ['roadmap', 'timeline', 'releases'],
      responses: {
        executive: {
          text: "Release timeline: Q1 - AI Assistant (beta Jan, GA March, $500K MRR impact), Q2 - Enterprise SSO (April, 3 customers waiting, $200K pipeline), Q3 - API v3 with GraphQL (July), Q4 - Mobile App v2 (Oct). Total engineering investment: $2.1M. Dependencies: AI team hire (in progress).",
          generalized: false
        },
        manager: {
          text: "Release timeline: Q1 - AI Assistant (beta ████████████████, GA ████████████████, ████████████████ MRR impact), Q2 - Enterprise SSO (████████████████, ████████████████ customers waiting, ████████████████ pipeline), Q3 - API v3 with GraphQL (████████████████), Q4 - Mobile App v2 (████████████████). Total engineering investment: ████████████████.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      followUps: ['What are the key dependencies?', 'Show the resource allocation', 'What are the risks?']
    },
    'Which customers requested these features?': {
      category: 'product_roadmap',
      topics: ['roadmap', 'customers', 'requests'],
      responses: {
        executive: {
          text: "Feature requests by customer: AI Assistant - Acme Corp ($150K ARR), GlobalTech ($200K ARR), MegaCorp ($180K ARR). Enterprise SSO - specifically requested by FinanceFirst (blocked deal, $300K). API v3 - Developer community (120 requests), plus TechStart (expansion contingent).",
          generalized: false
        },
        manager: {
          text: "Feature requests by customer: AI Assistant - ████████████████ (████████████████ ARR), ████████████████ (████████████████ ARR), ████████████████ (████████████████ ARR). Enterprise SSO - specifically requested by ████████████████ (blocked deal, ████████████████). API v3 - Developer community (████████████████ requests).",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      followUps: ['Show the request prioritization', 'What is at risk if delayed?', 'How do we communicate timelines?']
    },
    'Show competitive analysis': {
      category: 'product_roadmap',
      topics: ['competitive', 'analysis', 'market'],
      responses: {
        executive: {
          text: "Competitive landscape: Competitor A launched AI features (6 months ahead), but limited to chat. Our AI Assistant includes workflow automation (differentiated). Competitor B announced SSO but delayed to Q3. Our API v3 will have feature parity with Competitor C. Market window: 6-9 months to establish leadership.",
          generalized: false
        },
        manager: {
          text: "Competitive landscape: Competitor A launched AI features (████████████████ ahead), but limited to chat. Our AI Assistant includes workflow automation (differentiated). Competitor B announced SSO but delayed to ████████████████. Market window: ████████████████ to establish leadership.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      followUps: ['How do we differentiate?', 'What is our win rate?', 'Show feature comparison matrix']
    },

    // === Healthcare Follow-ups ===
    'What is the efficacy data?': {
      category: 'clinical_data',
      topics: ['clinical_trials', 'efficacy', 'mnpi'],
      responses: {
        executive: {
          text: "Efficacy data (CONFIDENTIAL): Primary endpoint - 73% response rate vs 45% placebo (p<0.001). Secondary endpoints - Duration of response 8.2 months vs 4.1 months, Quality of life improvement +18 points vs +5 points. Subgroup analysis shows strongest response in treatment-naive patients (81%).",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },
      followUps: ['Show subgroup analysis', 'What is the safety profile?', 'Compare to competitor drugs']
    },
    'Show adverse event summary': {
      category: 'clinical_data',
      topics: ['clinical_trials', 'safety', 'adverse_events'],
      responses: {
        executive: {
          text: "Adverse event summary (CONFIDENTIAL): Overall AE rate 12% vs 8% placebo. Most common: fatigue (5%), nausea (3%), headache (2%). Serious AEs: 1.2% vs 0.8% placebo (not statistically significant). No treatment-related deaths. Discontinuation rate: 4% vs 3% placebo. Safety profile supports approval.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },
      followUps: ['What are the serious AEs?', 'How does this compare to approved drugs?', 'What is the discontinuation rate?']
    },
    'When is FDA submission planned?': {
      category: 'clinical_data',
      topics: ['regulatory', 'fda', 'submission'],
      responses: {
        executive: {
          text: "FDA submission timeline (CONFIDENTIAL): NDA submission planned March 15, 2025. Pre-NDA meeting completed (positive feedback). PDUFA target date expected January 2026 (standard review). Priority review request under consideration (would accelerate to September 2025). Manufacturing validation on track.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },
      followUps: ['What feedback did FDA provide?', 'Are we pursuing priority review?', 'What are the approval odds?']
    },

    // === Healthcare Analytics Follow-ups ===
    'Show cost per episode of care': {
      category: 'healthcare_analytics',
      topics: ['cost', 'episode', 'analytics'],
      responses: {
        executive: {
          text: "Cost per episode: Overall $12,340 (vs $14,200 benchmark, -13%). By service line: Cardiac $18,500 (-8% vs benchmark), Orthopedic $15,200 (-15%), General Medicine $8,400 (-11%). Top cost drivers: Length of stay (42%), Supplies (28%), Pharmacy (18%). Savings opportunity: $3.2M through pathway optimization.",
          generalized: false
        },
        manager: {
          text: "Cost per episode: Overall ████████████████ (vs ████████████████ benchmark, ████████████████ variance). By service line: Cardiac ████████████████, Orthopedic ████████████████, General Medicine ████████████████. Top cost drivers: Length of stay, supplies, pharmacy. Savings opportunity: ████████████████ through pathway optimization.",
          generalized: true
        },
        employee: {
          text: "Cost per episode metrics show performance ████████████████ benchmark. Service line breakdown available. Top cost drivers identified as ████████████████, ████████████████, and ████████████████. Savings opportunities identified totaling ████████████████.",
          generalized: true
        }
      },
      followUps: ['Which pathways have highest savings potential?', 'Show length of stay analysis', 'Compare to peer organizations']
    },
    'Which providers have highest utilization?': {
      category: 'healthcare_analytics',
      topics: ['utilization', 'providers', 'analytics'],
      responses: {
        executive: {
          text: "High utilization providers: Dr. Smith (Cardiology) - 145% of peer avg ($2.1M annual), Dr. Johnson (Orthopedics) - 132% of peer avg ($1.8M), Dr. Williams (Internal Medicine) - 128% of peer avg ($1.2M). Root causes: Higher acuity case mix (40%), Defensive medicine patterns (35%), Care variation (25%). Peer review initiated for top 3.",
          generalized: false
        },
        manager: {
          text: "High utilization providers: ████████████████ (Cardiology) - ████████████████ of peer avg (████████████████ annual), ████████████████ (Orthopedics) - ████████████████ of peer avg, ████████████████ (Internal Medicine) - ████████████████ of peer avg. Root causes: Higher acuity case mix, defensive medicine patterns, care variation. Peer review initiated.",
          generalized: true
        },
        employee: {
          text: "High utilization providers identified across ████████████████ specialties. Utilization ranges from ████████████████ to ████████████████ of peer average. Root cause analysis attributes variation to case mix, practice patterns, and care variation. Contact analytics team for detailed reports.",
          generalized: true
        }
      },
      followUps: ['What interventions are planned?', 'Show specialty benchmarks', 'What is the peer review process?']
    },
    'Compare to benchmark data': {
      category: 'healthcare_analytics',
      topics: ['benchmark', 'comparison', 'analytics'],
      responses: {
        executive: {
          text: "Benchmark comparison: Overall performance 92nd percentile. Strengths: Readmission rate 8.2% vs 12.1% national (top decile), Patient satisfaction 4.2/5 vs 3.8 national. Opportunities: ED wait time 42 min vs 35 min benchmark, OR utilization 68% vs 75% benchmark. Value-based contract performance: 108% of quality targets.",
          generalized: false
        },
        manager: {
          text: "Benchmark comparison: Overall performance ████████████████ percentile. Strengths: Readmission rate ████████████████ vs ████████████████ national, Patient satisfaction ████████████████ vs ████████████████ national. Opportunities: ED wait time ████████████████ vs ████████████████ benchmark, OR utilization ████████████████ vs ████████████████ benchmark.",
          generalized: true
        },
        employee: {
          text: "Benchmark comparison shows overall performance at ████████████████ percentile. Key strengths in readmission rates and patient satisfaction (both ████████████████ national average). Improvement opportunities in ED wait times and OR utilization. Contact analytics for detailed breakdowns.",
          generalized: true
        }
      },
      followUps: ['Show trend over time', 'What initiatives improved readmissions?', 'How do we compare to regional peers?']
    },

    // === Generic follow-ups for unmapped questions ===
    'default': {
      category: 'general',
      topics: ['general'],
      responses: {
        executive: {
          text: "I can provide additional details on this topic. Based on your executive access, you have full visibility into the relevant data and analysis. Would you like me to focus on a specific aspect?",
          generalized: false
        },
        manager: {
          text: "I can provide more information on this topic within your access level. Some details may be restricted to executive clearance. What specific aspect would you like to explore?",
          generalized: true
        },
        employee: {
          text: "I can help with general information on this topic. Detailed data may require additional clearance. Please let me know what specific information you're looking for.",
          generalized: true
        }
      },
      followUps: []
    }
  };
  
  // Enhanced role-based permissions with context - FIXED: Manager now has financial_data access
  const rolePermissions = {
    'executive': {
      name: 'Executive',
      access: 'Full Access',
      categories: [
        'financial_data', 'customer_analytics', 'hr_records', 'technical_documentation', 
        'compensation_data', 'mnpi_data', 'compliance_data', 'product_roadmap', 
        'strategic_partnerships', 'intellectual_property', 'security_data',
        'clinical_data', 'payer_contracts', 'phi_data', 'regulatory_data', 'healthcare_analytics'
      ],
      context: { region: 'global', clearance: 'executive', department: 'all' }
    },
    'manager': {
      name: 'Department Manager', 
      access: 'Limited Access',
      // UPDATED: Added financial_data so manager gets PARTIAL access (redacted) instead of full block
      categories: [
        'customer_analytics', 'technical_documentation', 'hr_records', 'financial_data',
        'compliance_data', 'healthcare_analytics', 'product_roadmap'
      ],
      context: { region: 'eu-central', clearance: 'manager', department: 'engineering' }
    },
    'employee': {
      name: 'Employee',
      access: 'Basic Access', 
      categories: ['technical_documentation', 'customer_analytics'],
      context: { region: 'eu-central', clearance: 'standard', department: 'engineering' }
    }
  };

  // Filter queries by selected industry
  const filteredQueries = selectedIndustry === 'all' 
    ? sampleQueries 
    : sampleQueries.filter(q => q.industry === selectedIndustry);

  // File helper functions
  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const iconMap = {
      pdf: { Icon: FileText, color: 'text-red-600', bg: 'bg-red-50' },
      doc: { Icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
      docx: { Icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
      txt: { Icon: FileText, color: 'text-gray-600', bg: 'bg-gray-50' },
      xlsx: { Icon: FileSpreadsheet, color: 'text-green-600', bg: 'bg-green-50' },
      csv: { Icon: FileSpreadsheet, color: 'text-green-600', bg: 'bg-green-50' },
      png: { Icon: ImageIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
      jpg: { Icon: ImageIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
      jpeg: { Icon: ImageIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
      gif: { Icon: ImageIcon, color: 'text-purple-600', bg: 'bg-purple-50' },
      webp: { Icon: ImageIcon, color: 'text-blue-600', bg: 'bg-blue-50' },
    };
    return iconMap[ext] || { Icon: File, color: 'text-gray-600', bg: 'bg-gray-50' };
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleFileUpload = (type) => {
    if (isProcessing || attachedFiles.length >= 5) return;
    
    // Get current query's industry for context-aware file names
    const currentIndustry = sampleQueries[queryIndex].industry;
    const fileNames = contextAwareFileNames[currentIndustry] || contextAwareFileNames.general;
    
    // Pick a file name based on type
    const typeKey = type === 'document' ? 'document' : 'screenshot';
    const availableNames = fileNames[typeKey].filter(name => 
      !attachedFiles.some(f => f.name === name)
    );
    
    // Get a random available name or generate a fallback
    const fileName = availableNames.length > 0 
      ? availableNames[Math.floor(Math.random() * availableNames.length)]
      : `${typeKey === 'document' ? 'Document' : 'Screenshot'}_${attachedFiles.length + 1}.${type === 'document' ? 'pdf' : 'png'}`;
    
    const newFile = {
      id: Date.now(),
      name: fileName,
      size: Math.floor(Math.random() * 2000000) + 100000,
      type: type === 'document' ? fileName.split('.').pop().toLowerCase() : 'png',
      isUploaded: true // Mark as user-uploaded for Guardrail 2
    };
    
    setAttachedFiles([...attachedFiles, newFile]);
  };

  const removeFile = (fileId) => {
    setAttachedFiles(attachedFiles.filter(f => f.id !== fileId));
  };

  // Check authorization for current query and role
  const isAuthorized = (followUpText = null) => {
    if (followUpText && followUpResponses[followUpText]) {
      const followUp = followUpResponses[followUpText];
      const role = rolePermissions[userRole];
      return role.categories.includes(followUp.category);
    }
    const query = sampleQueries[queryIndex];
    const role = rolePermissions[userRole];
    return role.categories.includes(query.category);
  };

  // Get classification result
  const getClassificationResult = (followUpText = null) => {
    if (followUpText && followUpResponses[followUpText]) {
      const followUp = followUpResponses[followUpText];
      return {
        category: followUp.category,
        confidence: 0.87 + Math.random() * 0.1,
        topics: followUp.topics,
        authorized: isAuthorized(followUpText)
      };
    }
    const query = sampleQueries[queryIndex];
    return {
      category: query.category,
      confidence: 0.87 + Math.random() * 0.1,
      topics: query.topics,
      authorized: isAuthorized()
    };
  };

  // Get document filtering results
  const getDocumentResults = (followUpText = null) => {
    const role = rolePermissions[userRole];
    const category = followUpText && followUpResponses[followUpText] 
      ? followUpResponses[followUpText].category 
      : sampleQueries[queryIndex].category;
    
    if (!isAuthorized(followUpText)) {
      return {
        totalDocs: 0,
        filteredDocs: [],
        message: "No documents retrieved - insufficient permissions"
      };
    }
    
    // Dynamic document generation based on query category
    const docsByCategory = {
      'financial_data': [
        { name: "Q4_Financial_Report.pdf", metadata: { region: "global", classification: "confidential", department: "finance" }},
        { name: "Revenue_Analysis_2024.xlsx", metadata: { region: "global", classification: "confidential", department: "finance" }},
        { name: "Profit_Margin_Dashboard.pdf", metadata: { region: "global", classification: "internal", department: "finance" }}
      ],
      'customer_analytics': [
        { name: "EU_Customer_Analytics.pdf", metadata: { region: "eu-central", classification: "internal", department: "marketing" }},
        { name: "NPS_Survey_Results.xlsx", metadata: { region: "global", classification: "internal", department: "marketing" }},
        { name: "Customer_Feedback_Q4.pdf", metadata: { region: "eu-central", classification: "internal", department: "support" }}
      ],
      'hr_records': [
        { name: "Employee_Performance_Q4.xlsx", metadata: { region: "eu-central", classification: "restricted", department: "hr" }},
        { name: "Performance_Review_Summary.pdf", metadata: { region: "global", classification: "restricted", department: "hr" }},
        { name: "Retention_Risk_Analysis.xlsx", metadata: { region: "eu-central", classification: "restricted", department: "hr" }}
      ],
      'technical_documentation': [
        { name: "Product_Security_Architecture.md", metadata: { region: "global", classification: "internal", department: "engineering" }},
        { name: "API_Documentation.pdf", metadata: { region: "global", classification: "internal", department: "engineering" }},
        { name: "Deployment_Guide.md", metadata: { region: "global", classification: "internal", department: "engineering" }}
      ],
      'compensation_data': [
        { name: "Salary_Benchmarks_2024.xlsx", metadata: { region: "global", classification: "confidential", department: "hr" }},
        { name: "Equity_Compensation_Guide.pdf", metadata: { region: "global", classification: "confidential", department: "hr" }},
        { name: "Bonus_Structure_FY24.xlsx", metadata: { region: "global", classification: "confidential", department: "hr" }}
      ],
      'mnpi_data': [
        { name: "Unreleased_Earnings_Forecast.xlsx", metadata: { region: "global", classification: "mnpi", department: "finance" }},
        { name: "M&A_Pipeline_Confidential.pdf", metadata: { region: "global", classification: "mnpi", department: "corporate_dev" }},
        { name: "Insider_Trading_Log.xlsx", metadata: { region: "global", classification: "mnpi", department: "legal" }}
      ],
      'compliance_data': [
        { name: "MNPI_Compliance_Report.pdf", metadata: { region: "global", classification: "confidential", department: "compliance" }},
        { name: "Restricted_Securities_List.xlsx", metadata: { region: "global", classification: "confidential", department: "compliance" }},
        { name: "Training_Completion_Status.pdf", metadata: { region: "global", classification: "internal", department: "compliance" }}
      ],
      'product_roadmap': [
        { name: "Product_Roadmap_2025.pdf", metadata: { region: "global", classification: "confidential", department: "product" }},
        { name: "Feature_Prioritization.xlsx", metadata: { region: "global", classification: "confidential", department: "product" }},
        { name: "Customer_Feature_Requests.pdf", metadata: { region: "global", classification: "internal", department: "product" }}
      ],
      'strategic_partnerships': [
        { name: "Partnership_NDA_Templates.pdf", metadata: { region: "global", classification: "confidential", department: "legal" }},
        { name: "Deal_Pipeline_Active.xlsx", metadata: { region: "global", classification: "confidential", department: "corporate_dev" }},
        { name: "Partner_Evaluation_Matrix.pdf", metadata: { region: "global", classification: "confidential", department: "corporate_dev" }}
      ],
      'intellectual_property': [
        { name: "Patent_Portfolio_Status.xlsx", metadata: { region: "global", classification: "confidential", department: "legal" }},
        { name: "Pending_Filings_Q4.pdf", metadata: { region: "global", classification: "confidential", department: "legal" }},
        { name: "Prior_Art_Analysis.pdf", metadata: { region: "global", classification: "confidential", department: "legal" }}
      ],
      'security_data': [
        { name: "Vulnerability_Assessment.pdf", metadata: { region: "global", classification: "confidential", department: "security" }},
        { name: "Penetration_Test_Results.pdf", metadata: { region: "global", classification: "confidential", department: "security" }},
        { name: "Security_Patch_Schedule.xlsx", metadata: { region: "global", classification: "internal", department: "security" }}
      ],
      'clinical_data': [
        { name: "Clinical_Trial_Phase3_Results.pdf", metadata: { region: "global", classification: "mnpi", department: "research" }},
        { name: "Adverse_Event_Summary.xlsx", metadata: { region: "global", classification: "confidential", department: "research" }},
        { name: "FDA_Submission_Draft.pdf", metadata: { region: "global", classification: "mnpi", department: "regulatory" }}
      ],
      'payer_contracts': [
        { name: "Payer_Rate_Negotiations.xlsx", metadata: { region: "global", classification: "confidential", department: "contracting" }},
        { name: "Contract_Terms_Confidential.pdf", metadata: { region: "global", classification: "confidential", department: "contracting" }},
        { name: "Historical_Rate_Analysis.xlsx", metadata: { region: "global", classification: "internal", department: "finance" }}
      ],
      'phi_data': [
        { name: "Patient_Eligibility_List.xlsx", metadata: { region: "hipaa_zone", classification: "phi", department: "clinical" }},
        { name: "Treatment_Protocol_Patients.pdf", metadata: { region: "hipaa_zone", classification: "phi", department: "clinical" }},
        { name: "Enrollment_Status_Report.pdf", metadata: { region: "hipaa_zone", classification: "phi", department: "clinical" }}
      ],
      'regulatory_data': [
        { name: "FDA_Approval_Timeline.pdf", metadata: { region: "global", classification: "mnpi", department: "regulatory" }},
        { name: "PDUFA_Calendar.xlsx", metadata: { region: "global", classification: "confidential", department: "regulatory" }},
        { name: "Regulatory_Response_Letters.pdf", metadata: { region: "global", classification: "confidential", department: "regulatory" }}
      ],
      'healthcare_analytics': [
        { name: "Utilization_By_Diagnosis.xlsx", metadata: { region: "global", classification: "internal", department: "analytics" }},
        { name: "Cost_Per_Episode_Report.pdf", metadata: { region: "global", classification: "internal", department: "analytics" }},
        { name: "Provider_Benchmarks.xlsx", metadata: { region: "global", classification: "internal", department: "analytics" }}
      ]
    };
    
    const allDocs = docsByCategory[category] || [
      { name: "General_Document.pdf", metadata: { region: "global", classification: "internal", department: "general" }}
    ];
    
    // Filter based on role context
    const filteredDocs = allDocs.filter(doc => {
      if (userRole === 'executive') return true;
      if (userRole === 'manager') {
        return doc.metadata.classification !== 'mnpi' && doc.metadata.classification !== 'phi';
      }
      return doc.metadata.classification === 'internal';
    });
    
    return {
      totalDocs: allDocs.length,
      filteredDocs: filteredDocs.slice(0, 3),
      message: `Retrieved ${filteredDocs.length} of ${allDocs.length} documents based on permissions`
    };
  };

  // Get redacted response based on role and query
  const getRedactedResponse = (followUpText = null) => {
    // If this is a follow-up question, get response from followUpResponses
    if (followUpText && followUpResponses[followUpText]) {
      const followUp = followUpResponses[followUpText];
      const role = rolePermissions[userRole];
      
      if (!role.categories.includes(followUp.category)) {
        return {
          response: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires appropriate clearance for " + followUp.category.replace(/_/g, ' '),
          redactionLevel: "complete",
          generalized: false,
          followUps: []
        };
      }
      
      const responseData = followUp.responses[userRole] || followUp.responses.employee;
      return {
        response: responseData.text || responseData,
        redactionLevel: userRole === 'executive' ? 'none' : userRole === 'manager' ? 'partial' : 'high',
        generalized: responseData.generalized || false,
        followUps: followUp.followUps || []
      };
    }
    
    // Otherwise, use original query responses
    const query = sampleQueries[queryIndex];
    const role = rolePermissions[userRole];
    
    if (!isAuthorized()) {
      return {
        response: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires appropriate clearance for " + query.category.replace(/_/g, ' '),
        redactionLevel: "complete",
        generalized: false,
        followUps: []
      };
    }
    
    // Comprehensive responses by category and role with generalized flag
    const responses = {
      // === GENERAL ENTERPRISE ===
      'financial_data': {
        executive: {
          text: "Q4 financial results: Revenue $2.3M (+12% QoQ), Profit margin 23.4% (+2.1%), EBITDA $540K (+15%). Strong performance in enterprise segment with $890K ARR. Cash position remains healthy at $4.2M.",
          generalized: false
        },
        manager: {
          text: "Q4 financial results: Revenue ████████████████ with ████████████████ QoQ growth. Profit margin ████████████████ with ████████████████ improvement. EBITDA ████████████████ with ████████████████ growth. Strong performance in enterprise segment with ████████████████ ARR. Cash position remains healthy.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      'customer_analytics': {
        executive: {
          text: "EU customer satisfaction: 87.3% (+4.2 pts), NPS score 52 (+8), retention rate 94.1%. Top satisfaction drivers: product reliability (8.9/10), support quality (8.7/10). Churn risk identified in 3 enterprise accounts worth $340K ARR.",
          generalized: false
        },
        manager: {
          text: "EU customer satisfaction: ████████████████ with ████████████████ point improvement. NPS score ████████████████ with ████████████████ increase. Retention rate ████████████████. Top satisfaction drivers: product reliability (████████████████), support quality (████████████████). Churn risk identified in ████████████████ enterprise accounts worth ████████████████ ARR.",
          generalized: true
        },
        employee: {
          text: "EU customer satisfaction trends show improvement with ████████████████ point increase. NPS score improved by ████████████████. Retention remains strong. Top drivers: product reliability and support quality rated ████████████████. Some accounts flagged for ████████████████ review.",
          generalized: true
        }
      },
      'hr_records': {
        executive: {
          text: "Engineering dept: 3 employees below expectations (2 missed deadlines, 1 communication). PIPs active for J. Smith and M. Johnson. Retention risk: medium for 2 individuals. Recommended actions: coaching and workload review.",
          generalized: false
        },
        manager: {
          text: "Engineering dept: ████████████████ employees below expectations (████████████████ missed deadlines, ████████████████ communication). PIPs active for ████████████████ and ████████████████. Retention risk: ████████████████ for ████████████████ individuals. Recommended actions: coaching and workload review.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      'technical_documentation': {
        executive: {
          text: "Security architecture uses zero-trust model with quantum-resistant encryption (AES-256-GCM), real-time threat detection (<0.001% false positive rate). Multi-cloud: AWS, Azure, GCP. SOC2 Type II and ISO 27001 certified. Penetration test: 0 critical findings.",
          generalized: false
        },
        manager: {
          text: "Security architecture uses zero-trust model with quantum-resistant encryption (AES-256-GCM), real-time threat detection (████████████████ false positive rate). Multi-cloud: AWS, Azure, GCP. SOC2 Type II and ISO 27001 certified. Penetration test: ████████████████ critical findings.",
          generalized: true
        },
        employee: {
          text: "Security architecture uses zero-trust model with ████████████████ encryption standard. Real-time threat detection with ████████████████ accuracy. Multi-cloud deployment supported. Certifications: ████████████████. Penetration test status: ████████████████. Contact security team for detailed specifications.",
          generalized: true
        }
      },
      'compensation_data': {
        executive: {
          text: "Senior Engineer salary range: €75K-€110K (median €89K). Total comp with equity: €95K-€140K. Market positioning: 75th percentile for EU tech. Equity refresh grants averaging €15K/year for top performers.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },

      // === ASSET MANAGEMENT ===
      'mnpi_data': {
        executive: {
          text: "MNPI Alert - Confidential: Q4 earnings expected at $1.42 EPS (vs $1.28 consensus). M&A target: TechCorp acquisition at $45/share (~$2.1B). Insider Form 4 filings pending for 3 executives. Trading window closes Dec 15.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance and compliance approval",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — MNPI requires authorized personnel only",
          generalized: false
        }
      },
      'compliance_data': {
        executive: {
          text: "MNPI Compliance Status: 98.2% training completion. 2 pending violations under review (both administrative). Restricted list updated with 47 securities. Next audit: Q1 2025. No material findings from last SEC examination.",
          generalized: false
        },
        manager: {
          text: "MNPI Compliance Status: ████████████████ training completion. ████████████████ pending violations under review (both administrative). Restricted list updated with ████████████████ securities. Next audit: ████████████████. ████████████████ material findings from last SEC examination.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },

      // === TECHNOLOGY / ISVs ===
      'product_roadmap': {
        executive: {
          text: "2025 Roadmap: Q1 - AI Assistant launch (revenue impact: +$500K MRR), Q2 - Enterprise SSO (3 customers waiting), Q3 - API v3 with GraphQL, Q4 - Mobile app. Total investment: $2.1M. Competitive response to Competitor X's announcement.",
          generalized: false
        },
        manager: {
          text: "2025 Roadmap: Q1 - AI Assistant launch (revenue impact: ████████████████ MRR), Q2 - Enterprise SSO (████████████████ customers waiting), Q3 - API v3 with GraphQL, Q4 - Mobile app. Total investment: ████████████████. Competitive response to ████████████████ announcement.",
          generalized: true
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires manager-level clearance",
          generalized: false
        }
      },
      'strategic_partnerships': {
        executive: {
          text: "Active negotiations: CloudProvider Inc (revenue share deal, $1.2M potential), TechGiant Corp (OEM agreement, $3M+), StartupXYZ (acquisition target, $15M valuation). NDAs signed. Expected close: Q1 2025.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },
      'intellectual_property': {
        executive: {
          text: "Patent portfolio: 23 granted, 8 pending. Q4 filings: 3 new applications (AI/ML methods). Prior art risk: low for 2 pending patents. Competitor patent watch: 5 new filings relevant to our space. Legal budget: on track.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive and legal clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },
      'security_data': {
        executive: {
          text: "Current vulnerabilities: 2 medium (patched in next release), 0 critical. Last pen test: Nov 2024, all findings remediated. Bug bounty: 12 reports this quarter, $45K paid. No customer data exposure incidents.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires security team and executive clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },

      // === HEALTHCARE ===
      'clinical_data': {
        executive: {
          text: "Phase 3 Trial Results (CONFIDENTIAL): Primary endpoint met with p<0.001. Efficacy: 73% vs 45% placebo. Adverse events: 12% (vs 8% placebo), mostly mild. FDA submission planned for March 2025. Stock impact analysis prepared.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive and medical affairs clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires authorized research personnel",
          generalized: false
        }
      },
      'payer_contracts': {
        executive: {
          text: "Active negotiations: BlueCross (targeting 15% rate increase), Aetna (renewal at current rates + quality bonus), Medicare Advantage (3 new plan partnerships). Total contract value at risk: $12M. Expected outcomes: +$2.1M net.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },
      'phi_data': {
        executive: {
          text: "Access requires additional HIPAA authorization. 847 patients currently eligible for new protocol. Demographics: 62% female, mean age 54. Enrollment rate: 23% (target: 40%). Contact clinical ops for patient-level access with proper authorization.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires HIPAA authorization",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — protected under HIPAA regulations",
          generalized: false
        }
      },
      'regulatory_data': {
        executive: {
          text: "FDA Status: Drug A - PDUFA date March 15, 2025 (90% approval probability). Drug B - Complete Response Letter received, resubmission Q2. Drug C - Phase 2 complete, IND amendment pending. No warning letters or Form 483s outstanding.",
          generalized: false
        },
        manager: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        },
        employee: {
          text: "████████████████████████████████████████████████\n████████████████████████████████\n████████████████████████████████████████\n\nAccess restricted — requires executive-level clearance",
          generalized: false
        }
      },
      'healthcare_analytics': {
        executive: {
          text: "Utilization patterns: Top 5 DRGs account for 45% of costs. Cost per episode: $12,340 (vs $14,200 benchmark). High-utilization providers identified in 3 regions. Savings opportunity: $3.2M through care pathway optimization.",
          generalized: false
        },
        manager: {
          text: "Utilization patterns: Top 5 DRGs account for ████████████████ of costs. Cost per episode: ████████████████ (vs ████████████████ benchmark). High-utilization providers identified in ████████████████ regions. Savings opportunity: ████████████████ through care pathway optimization.",
          generalized: true
        },
        employee: {
          text: "Utilization patterns show concentration in top DRGs accounting for ████████████████ of costs. Cost per episode is ████████████████ benchmark. High-utilization providers identified in ████████████████ regions. Savings opportunity: ████████████████. Contact analytics team for details.",
          generalized: true
        }
      }
    };
    
    const categoryResponses = responses[query.category];
    if (categoryResponses) {
      const responseData = categoryResponses[userRole] || categoryResponses.employee;
      return {
        response: responseData.text || responseData,
        redactionLevel: userRole === 'executive' ? 'none' : userRole === 'manager' ? 'partial' : 'high',
        generalized: responseData.generalized || false,
        followUps: query.followUps || []
      };
    }
    
    // Default response for unmapped categories
    return {
      response: "Information retrieved based on your access level. Some details may be redacted based on your role permissions.",
      redactionLevel: userRole === 'executive' ? 'none' : 'partial',
      generalized: userRole !== 'executive',
      followUps: query.followUps || []
    };
  };

  // Get unsecured response - always returns full data regardless of permissions
  const getUnsecuredResponse = (followUpText = null) => {
    // If this is a follow-up, return the executive-level response (full data)
    if (followUpText && followUpResponses[followUpText]) {
      const execResponse = followUpResponses[followUpText].responses.executive;
      return execResponse.text || execResponse;
    }
    
    const query = sampleQueries[queryIndex];
    
    const unsecuredResponses = {
      'financial_data': "Q4 financial results: Revenue $2.3M (+12% QoQ), Profit margin 23.4% (+2.1%), EBITDA $540K (+15%). Strong performance in enterprise segment with $890K ARR. Cash position: $4.2M.",
      'customer_analytics': "EU customer satisfaction: 87.3% (+4.2 pts), NPS score 52 (+8), retention rate 94.1%. Top satisfaction drivers: product reliability (8.9/10), support quality (8.7/10). Churn risk: 3 accounts worth $340K.",
      'hr_records': "Engineering dept: 3 employees below expectations - J. Smith (missed deadlines), M. Johnson (missed deadlines), K. Lee (communication). PIPs active. Retention risk: medium.",
      'technical_documentation': "Security architecture uses zero-trust model, quantum-resistant encryption (AES-256), real-time threat detection with <0.001% false positive rate. Multi-cloud deployment: AWS, Azure, GCP.",
      'compensation_data': "Senior Engineer salary range: €75K-€110K (median €89K). Total comp with equity: €95K-€140K. Market positioning: 75th percentile for EU tech.",
      'mnpi_data': "CONFIDENTIAL: Q4 earnings expected at $1.42 EPS (vs $1.28 consensus). M&A target: TechCorp at $45/share (~$2.1B). Trading window closes Dec 15. Form 4 filings pending for CEO, CFO, COO.",
      'compliance_data': "MNPI Compliance: 98.2% training complete. 2 violations pending. Restricted list: 47 securities. Next audit: Q1 2025.",
      'product_roadmap': "2025 Roadmap: Q1 - AI Assistant (+$500K MRR), Q2 - Enterprise SSO, Q3 - API v3, Q4 - Mobile. Investment: $2.1M.",
      'strategic_partnerships': "Active deals: CloudProvider ($1.2M), TechGiant OEM ($3M+), StartupXYZ acquisition ($15M). Close expected Q1 2025.",
      'intellectual_property': "Patents: 23 granted, 8 pending. 3 new AI/ML filings. Competitor watch: 5 relevant filings.",
      'security_data': "Vulnerabilities: 2 medium (patch pending), 0 critical. Pen test clean. Bug bounty: $45K paid, 12 reports.",
      'clinical_data': "Phase 3 Results: Primary endpoint met (p<0.001). Efficacy: 73% vs 45% placebo. AEs: 12%. FDA submission: March 2025.",
      'payer_contracts': "Negotiations: BlueCross (+15% rates), Aetna (renewal + bonus), Medicare Advantage (3 new plans). Value: $12M.",
      'phi_data': "Eligible patients: 847. Demographics: 62% female, mean age 54, enrollment 23%. Patient list available for download.",
      'regulatory_data': "Drug A: PDUFA March 15, 90% approval odds. Drug B: CRL received, resubmit Q2. Drug C: Phase 2 complete.",
      'healthcare_analytics': "Top 5 DRGs: 45% of costs. Cost/episode: $12,340 (benchmark $14,200). Savings opportunity: $3.2M."
    };
    
    return unsecuredResponses[query.category] || "Full data access without authorization controls - all sensitive information exposed.";
  };

  // Handle follow-up question click - starts a new chat with the follow-up
  const handleFollowUpClick = (followUpText) => {
    // Clear messages and start fresh
    setMessages([]);
    setShowFollowUps(false);
    setActiveFollowUp(followUpText);
    setInputText(followUpText);
    
    // Trigger the send flow after a brief delay to allow state to update
    setTimeout(() => {
      handleSendFollowUp(followUpText);
    }, 100);
  };

  // Handle sending a follow-up question
  const handleSendFollowUp = (followUpText) => {
    // Store current files before clearing (for Guardrail 2)
    const currentFiles = [...attachedFiles];
    
    // Add user message
    const userMessage = {
      type: 'user',
      text: followUpText,
      files: currentFiles,
      timestamp: new Date()
    };
    setMessages([userMessage]);
    setAttachedFiles([]);
    setCurrentGuardrail(1);
    setIsProcessing(true);

    // Guardrail 1: Categorizer
    setTimeout(() => {
      const classification = getClassificationResult(followUpText);
      setMessages(prev => [...prev, {
        type: 'guardrail',
        guardrail: 'categorizer',
        classification: classification,
        timestamp: new Date()
      }]);
      setCurrentGuardrail(2);
    }, 2000);

    // Guardrail 2: Retriever - now includes uploaded files
    setTimeout(() => {
      const docResults = getDocumentResults(followUpText);
      setMessages(prev => [...prev, {
        type: 'guardrail',
        guardrail: 'retriever',
        docResults: docResults,
        uploadedFiles: currentFiles, // Include uploaded files
        timestamp: new Date()
      }]);
      setCurrentGuardrail(3);
    }, 4000);

    // Guardrail 3: Anonymizer
    setTimeout(() => {
      const response = getRedactedResponse(followUpText);
      setMessages(prev => [...prev, {
        type: 'guardrail',
        guardrail: 'anonymizer',
        response: response,
        timestamp: new Date()
      }]);
      setCurrentGuardrail(4);
    }, 6000);

    // Final response
    setTimeout(() => {
      const finalResponse = getRedactedResponse(followUpText);
      setMessages(prev => [...prev, {
        type: 'assistant',
        text: finalResponse.response,
        redactionLevel: finalResponse.redactionLevel,
        generalized: finalResponse.generalized,
        followUps: finalResponse.followUps,
        timestamp: new Date()
      }]);
      setIsProcessing(false);
      setCurrentGuardrail(0);
      setActiveFollowUp(null);
      setShowFollowUps(true);
      
      // Show CTA modal
      // setTimeout(() => setShowCTAModal(true), 2000);
    }, 8000);
  };

  const handleSendMessage = () => {
    const query = sampleQueries[queryIndex];
    
    // Reset follow-up state
    setActiveFollowUp(null);
    
    // Store current files before clearing (for Guardrail 2)
    const currentFiles = [...attachedFiles];
    
    // Add user message
    const userMessage = {
      type: 'user',
      text: query.text,
      files: currentFiles,
      timestamp: new Date()
    };
    setMessages([userMessage]);
    setAttachedFiles([]);
    setCurrentGuardrail(1);
    setIsProcessing(true);
    setShowFollowUps(false);

    // Guardrail 1: Categorizer
    setTimeout(() => {
      const classification = getClassificationResult();
      setMessages(prev => [...prev, {
        type: 'guardrail',
        guardrail: 'categorizer',
        classification: classification,
        timestamp: new Date()
      }]);
      setCurrentGuardrail(2);
    }, 2000);

    // Guardrail 2: Retriever - now includes uploaded files
    setTimeout(() => {
      const docResults = getDocumentResults();
      setMessages(prev => [...prev, {
        type: 'guardrail',
        guardrail: 'retriever',
        docResults: docResults,
        uploadedFiles: currentFiles, // Include uploaded files
        timestamp: new Date()
      }]);
      setCurrentGuardrail(3);
    }, 4000);

    // Guardrail 3: Anonymizer
    setTimeout(() => {
      const response = getRedactedResponse();
      setMessages(prev => [...prev, {
        type: 'guardrail',
        guardrail: 'anonymizer',
        response: response,
        timestamp: new Date()
      }]);
      setCurrentGuardrail(4);
    }, 6000);

    // Final response
    setTimeout(() => {
      const finalResponse = getRedactedResponse();
      setMessages(prev => [...prev, {
        type: 'assistant',
        text: finalResponse.response,
        redactionLevel: finalResponse.redactionLevel,
        generalized: finalResponse.generalized,
        followUps: finalResponse.followUps,
        timestamp: new Date()
      }]);
      setIsProcessing(false);
      setCurrentGuardrail(0);
      setShowFollowUps(true);
      
      // Show CTA modal
      // setTimeout(() => setShowCTAModal(true), 2000);
    }, 8000);
  };

  const selectQuery = (index) => {
    // Find the actual index in the full sampleQueries array
    const actualIndex = sampleQueries.findIndex(q => q.text === filteredQueries[index].text);
    setQueryIndex(actualIndex);
    setInputText(sampleQueries[actualIndex].text);
    setActiveFollowUp(null);
  };

  const BetaTag = () => (
    <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded uppercase">Beta</span>
  );

  const CTAModal = () => {
    if (!showCTAModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4">
          <div className="p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <Shield size={32} className="text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-4">
              Ready to Secure Your LangChain Apps?
            </h3>
            
            <p className="text-center text-gray-600 mb-8">
              Add enterprise authorization to your RAG pipeline with the <code className="bg-gray-100 px-2 py-1 rounded">langchain-plainid</code> library.
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={() => {
                  window.open('https://www.plainid.com/contact/', '_blank');
                  setShowCTAModal(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:shadow-lg transition-all"
              >
                <Calendar size={18} />
                <span>Schedule Live Demo</span>
              </button>
              
              <button 
                onClick={() => {
                  window.open('https://docs.plainid.io/docs/langchain-authorizer', '_blank');
                  setShowCTAModal(false);
                }}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
              >
                <Download size={18} />
                <span>View Documentation</span>
              </button>
              
              <button
                onClick={() => setShowCTAModal(false)}
                className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors py-2"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const currentRole = rolePermissions[userRole];
  const classification = getClassificationResult(activeFollowUp);
  const docResults = getDocumentResults(activeFollowUp);
  const response = getRedactedResponse(activeFollowUp);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-72' : 'w-0'} transition-all duration-300 bg-gray-900 text-white flex flex-col overflow-hidden`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-lg mr-3">
              <Shield size={20} />
            </div>
            <div>
              <div className="font-semibold text-sm">PlainID</div>
              <div className="text-xs text-gray-400">LangChain Authorizer</div>
            </div>
          </div>
          <button 
            onClick={() => {
              setMessages([]);
              setCurrentGuardrail(0);
              setIsProcessing(false);
              setAttachedFiles([]);
              setShowFollowUps(false);
              setActiveFollowUp(null);
            }}
            className="w-full flex items-center justify-center px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Plus size={16} className="mr-2" />
            <span className="text-sm font-medium">New Chat</span>
          </button>
        </div>

        {/* Industry Filter - Icon Grid Design */}
        <div className="p-3 border-b border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div className="text-xs text-gray-400">Industry</div>
            <div className="text-xs text-teal-400 font-medium truncate max-w-[120px]">
              {industries.find(i => i.id === selectedIndustry)?.name}
            </div>
          </div>
          <div className="flex justify-between relative">
            {industries.map((industry) => {
              const IconComponent = industry.icon;
              const isSelected = selectedIndustry === industry.id;
              const isHovered = hoveredIndustry === industry.id;
              
              return (
                <div key={industry.id} className="relative">
                  <button
                    onClick={() => setSelectedIndustry(industry.id)}
                    onMouseEnter={() => setHoveredIndustry(industry.id)}
                    onMouseLeave={() => setHoveredIndustry(null)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 ${
                      isSelected 
                        ? 'bg-teal-500 text-white ring-2 ring-teal-400 ring-offset-2 ring-offset-gray-900' 
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <IconComponent size={18} />
                  </button>
                  
                  {/* Tooltip */}
                  {isHovered && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-700 text-white text-xs rounded whitespace-nowrap z-10 shadow-lg">
                      {industry.name}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-700"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Available Prompts */}
        <div className="flex-grow overflow-y-auto p-3">
          <div className="text-xs text-gray-400 mb-2 px-2">
            Available Prompts ({filteredQueries.length})
          </div>
          <div className="space-y-1">
            {filteredQueries.map((query, i) => {
              const actualIndex = sampleQueries.findIndex(q => q.text === query.text);
              const isSelected = queryIndex === actualIndex;
              return (
                <button
                  key={i}
                  onClick={() => selectQuery(i)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    isSelected ? 'bg-teal-500 text-white' : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <div className="truncate">{query.text}</div>
                  <div className={`text-xs mt-1 ${isSelected ? 'text-teal-100' : 'text-gray-500'}`}>
                    {query.category.replace(/_/g, ' ')}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Role Selection */}
        <div className="p-4 border-t border-gray-700">
          <div className="text-xs text-gray-400 mb-2">Select Your Role</div>
          <div className="space-y-2">
            {Object.entries(rolePermissions).map(([role, config]) => (
              <button
                key={role}
                onClick={() => setUserRole(role)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  userRole === role 
                    ? 'bg-teal-500 text-white font-medium' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div>{config.name}</div>
                    <div className="text-xs opacity-75">{config.access}</div>
                  </div>
                  {userRole === role && <Check size={14} />}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
              <Menu size={20} />
            </button>
            <div className="flex items-center">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-2 rounded-lg mr-3">
                <Shield size={20} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900 flex items-center">
                  PlainID LangChain Authorizer
                  <BetaTag />
                </h1>
                <p className="text-xs text-gray-500">Enterprise Authorization for LangChain and AI Applications</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {/* Role Badge */}
            <div className="flex items-center space-x-3 bg-gradient-to-r from-teal-50 to-blue-50 px-4 py-2 rounded-lg border border-teal-200">
              <div className="text-xs">
                <div className="text-gray-600">Current Role:</div>
                <div className="font-semibold text-gray-900">{currentRole.name}</div>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="text-xs space-y-0.5">
                <div className="flex items-center text-gray-600">
                  <MapPin size={12} className="mr-1" />
                  {currentRole.context.region}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users size={12} className="mr-1" />
                  {currentRole.context.department}
                </div>
              </div>
            </div>

            {/* Compare Button */}
            <button
              onClick={() => setShowComparison(!showComparison)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all"
            >
              <ArrowRight size={16} />
              <span className="text-sm">{showComparison ? 'Show AI Chat' : 'Compare AI Chat Approaches'}</span>
            </button>
          </div>
        </div>

        {/* Content Area - Either Comparison or Chat */}
        {showComparison ? (
          // Comparison View
          <div className="flex-grow overflow-y-auto p-6 bg-gray-50">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Compare AI Chat Approaches</h2>
                <p className="text-gray-600">See the difference between secured and unsecured AI responses</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Standard RAG - Unsecured */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <div className="rounded-full bg-red-50 p-2 mr-3">
                      <AlertTriangle className="text-red-500" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">AI Chat</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 text-sm">Query</h4>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-900">{activeFollowUp || sampleQueries[queryIndex].text}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 text-sm">Query Processing</h4>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2">
                        <p className="text-sm text-gray-600 flex items-center">
                          <span className="text-red-500 mr-2">❌</span>
                          No prompt classification
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <span className="text-red-500 mr-2">❌</span>
                          No authorization checks
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 text-sm">Document Retrieval</h4>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-2">
                        <p className="text-sm text-gray-600 flex items-center">
                          <span className="text-red-500 mr-2">❌</span>
                          All documents accessible
                        </p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <span className="text-red-500 mr-2">❌</span>
                          No metadata filtering
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 text-sm">Response</h4>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <p className="text-sm text-gray-900 mb-3">{getUnsecuredResponse(activeFollowUp)}</p>
                        {!isAuthorized(activeFollowUp) && (
                          <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded">
                            <p className="text-red-700 text-xs flex items-center">
                              <AlertTriangle size={14} className="mr-2" />
                              Security Risk: Unauthorized data exposure to {currentRole.name} role
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* PlainID Secured RAG */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <div className="flex items-center mb-6">
                    <div className="rounded-full bg-teal-50 p-2 mr-3">
                      <Shield className="text-teal-500" size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                      PlainID Secured AI Chat
                      <BetaTag />
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 text-sm">Query</h4>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-900">{activeFollowUp || sampleQueries[queryIndex].text}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 text-sm">Guardrail 1: Categorizer</h4>
                      <div className="bg-teal-50 p-3 rounded-lg border border-teal-200 space-y-2">
                        <p className="text-sm text-gray-700 flex items-center">
                          <span className="text-green-600 mr-2">✓</span>
                          LLM classifies prompt as '{classification.category.replace(/_/g, ' ')}'
                        </p>
                        <p className="text-sm text-gray-700 flex items-center">
                          <span className="text-green-600 mr-2">✓</span>
                          Authorization: {classification.authorized ? 'Granted' : 'Denied'}
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 text-sm">Guardrail 2: Retriever</h4>
                      <div className="bg-teal-50 p-3 rounded-lg border border-teal-200 space-y-2">
                        <p className="text-sm text-gray-700 flex items-center">
                          <span className="text-green-600 mr-2">✓</span>
                          Metadata filtering applied
                        </p>
                        <p className="text-sm text-gray-700 flex items-center">
                          <span className="text-green-600 mr-2">✓</span>
                          {docResults.message}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 mb-2 text-sm">Guardrail 3: Anonymizer</h4>
                      <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                        <p className="text-sm text-gray-900 mb-3 whitespace-pre-line">{response.response}</p>
                        <div className="mt-3 p-2 bg-teal-100 border border-teal-300 rounded">
                          <p className="text-teal-700 text-xs flex items-center">
                            <Shield size={14} className="mr-2" />
                            Policy-compliant response
                            {response.generalized && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-xs">
                                <Sparkles size={10} className="mr-1" />
                                Generalized
                              </span>
                            )}
                            {response.redactionLevel !== 'none' && !response.generalized && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded bg-red-100 text-red-800 text-xs">
                                Redacted
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Chat View
          <>
            <div className="flex-grow overflow-y-auto px-6 py-8 bg-gray-50">
              {messages.length === 0 ? (
                <div className="max-w-4xl mx-auto">
                  {/* Hero Section */}
                  <div className="text-center mb-12 pt-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl mb-6 shadow-xl">
                      <Shield size={40} className="text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                      Secure Your LangChain & AI Pipeline
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                      Add enterprise-grade authorization with three security guardrails
                    </p>
                    <div className="flex justify-center space-x-8">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Filter size={24} className="text-teal-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Prompt Classification</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Database size={24} className="text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Document Filtering</p>
                      </div>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Eye size={24} className="text-purple-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700">Output Anonymization</p>
                      </div>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">How It Works</h3>
                    <div className="space-y-3 text-sm text-gray-700">
                      <p>1. <strong>Filter by industry</strong> to see relevant prompts (Asset Management, Technology, Healthcare)</p>
                      <p>2. <strong>Select your role</strong> from the sidebar (Executive, Manager, or Employee)</p>
                      <p>3. <strong>Choose a query</strong> from the sidebar or type your own</p>
                      <p>4. <strong>Send the message</strong> to see the three-layer authorization process in action</p>
                      <p>5. <strong>Try follow-up questions</strong> to continue the conversation with new contextual responses</p>
                    </div>
                  </div>

                  {/* Current Configuration */}
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Configuration</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/80 rounded-lg p-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Selected Query</div>
                        <div className="text-sm text-gray-900 mb-2">{sampleQueries[queryIndex].text}</div>
                        <div className="text-xs text-gray-500">
                          Category: {sampleQueries[queryIndex].category.replace(/_/g, ' ')} | 
                          Industry: {sampleQueries[queryIndex].industry.replace(/_/g, ' ')}
                        </div>
                      </div>
                      <div className="bg-white/80 rounded-lg p-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">User Context</div>
                        <div className="text-xs space-y-1 text-gray-600">
                          <div>Role: {currentRole.name}</div>
                          <div>Access: {currentRole.access}</div>
                          <div>Region: {currentRole.context.region}</div>
                          <div>Department: {currentRole.context.department}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto space-y-6">
                  {messages.map((msg, i) => (
                    <div key={i} className="animate-fadeIn">
                      {msg.type === 'user' && (
                        <div className="flex justify-end">
                          <div className="flex items-start space-x-3 flex-row-reverse">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                              <User size={20} className="text-white" />
                            </div>
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-5 py-3 rounded-2xl rounded-tr-md max-w-lg shadow-lg">
                              <p className="text-sm mb-2">{msg.text}</p>
                              {msg.files && msg.files.length > 0 && (
                                <div className="space-y-2 pt-3 border-t border-blue-400">
                                  {msg.files.map((file) => {
                                    const iconData = getFileIcon(file.name);
                                    const IconComponent = iconData.Icon;
                                    return (
                                      <div key={file.id} className="flex items-center space-x-2 bg-white/20 rounded-lg px-3 py-2">
                                        <div className="flex-shrink-0">
                                          <IconComponent size={16} className="text-white" />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                          <div className="text-xs font-medium truncate">{file.name}</div>
                                          <div className="text-xs opacity-75">{formatFileSize(file.size)}</div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {msg.type === 'guardrail' && msg.guardrail === 'categorizer' && (
                        <div className="bg-white rounded-xl border-l-4 border-teal-500 p-6 shadow-sm">
                          <div className="flex items-start">
                            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-3 rounded-xl mr-4 flex-shrink-0">
                              <Filter size={24} className="text-white" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                Guardrail 1: Prompt Categorization
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <h5 className="font-medium text-gray-800 mb-2 text-sm">LLM Classification</h5>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Category:</span>
                                      <span className="font-medium">{msg.classification.category.replace(/_/g, ' ')}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-gray-600">Confidence:</span>
                                      <span className="font-medium">{(msg.classification.confidence * 100).toFixed(1)}%</span>
                                    </div>
                                    <div className="text-xs text-gray-500 mt-2">
                                      Topics: {msg.classification.topics.join(', ')}
                                    </div>
                                  </div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <h5 className="font-medium text-gray-800 mb-2 text-sm">Authorization Check</h5>
                                  <div className={`p-3 rounded-lg ${
                                    msg.classification.authorized 
                                      ? 'bg-green-50 border border-green-200' 
                                      : 'bg-red-50 border border-red-200'
                                  }`}>
                                    <div className="flex items-center mb-2">
                                      {msg.classification.authorized ? (
                                        <Check size={16} className="text-green-600 mr-2" />
                                      ) : (
                                        <Lock size={16} className="text-red-600 mr-2" />
                                      )}
                                      <span className={`font-medium text-sm ${
                                        msg.classification.authorized ? 'text-green-800' : 'text-red-800'
                                      }`}>
                                        {msg.classification.authorized ? 'Access Granted' : 'Access Denied'}
                                      </span>
                                    </div>
                                    <p className={`text-xs ${
                                      msg.classification.authorized ? 'text-green-700' : 'text-red-700'
                                    }`}>
                                      {msg.classification.authorized 
                                        ? `${currentRole.name} can access ${msg.classification.category.replace(/_/g, ' ')} data`
                                        : `${currentRole.name} cannot access ${msg.classification.category.replace(/_/g, ' ')} data`
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {msg.type === 'guardrail' && msg.guardrail === 'retriever' && (
                        <div className="bg-white rounded-xl border-l-4 border-blue-500 p-6 shadow-sm">
                          <div className="flex items-start">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl mr-4 flex-shrink-0">
                              <Database size={24} className="text-white" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                Guardrail 2: Document Filtering
                              </h4>
                              {msg.docResults.filteredDocs.length > 0 || (msg.uploadedFiles && msg.uploadedFiles.length > 0) ? (
                                <div>
                                  <p className="text-gray-700 mb-3 text-sm">
                                    {msg.docResults.message}
                                    {msg.uploadedFiles && msg.uploadedFiles.length > 0 && (
                                      <span> + {msg.uploadedFiles.length} user uploaded file{msg.uploadedFiles.length > 1 ? 's' : ''}</span>
                                    )}
                                  </p>
                                  
                                  {/* Retrieved Documents */}
                                  {msg.docResults.filteredDocs.length > 0 && (
                                    <div className="mb-4">
                                      <p className="text-xs font-medium text-gray-500 mb-2">Retrieved Documents</p>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {msg.docResults.filteredDocs.map((doc, idx) => (
                                          <div key={idx} className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                                            <div className="flex items-center mb-2">
                                              <div className="text-xs font-medium text-gray-900 truncate">{doc.name}</div>
                                            </div>
                                            <div className="text-xs text-gray-600 space-y-0.5">
                                              <div>Region: {doc.metadata.region}</div>
                                              <div>Class: {doc.metadata.classification}</div>
                                              <div>Dept: {doc.metadata.department}</div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  
                                  {/* User Uploaded Files */}
                                  {msg.uploadedFiles && msg.uploadedFiles.length > 0 && (
                                    <div className="mb-4">
                                      <p className="text-xs font-medium text-gray-500 mb-2">User Uploaded Files</p>
                                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {msg.uploadedFiles.map((file, idx) => {
                                          const iconData = getFileIcon(file.name);
                                          const IconComponent = iconData.Icon;
                                          return (
                                            <div key={idx} className="bg-amber-50 p-3 rounded-lg border-2 border-amber-300 border-dashed relative">
                                              {/* Uploaded Badge */}
                                              <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-medium px-2 py-0.5 rounded-full flex items-center">
                                                <Upload size={10} className="mr-1" />
                                                Uploaded
                                              </div>
                                              <div className="flex items-center mb-2">
                                                <div className={`${iconData.bg} p-1 rounded mr-2`}>
                                                  <IconComponent size={14} className={iconData.color} />
                                                </div>
                                                <div className="text-xs font-medium text-gray-900 truncate">{file.name}</div>
                                              </div>
                                              <div className="text-xs text-gray-600 space-y-0.5">
                                                <div>Source: User Uploaded</div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                  
                                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                    <p className="text-xs text-blue-900">
                                      <strong>Filter Applied:</strong> region="{currentRole.context.region}" AND clearance_level="{currentRole.context.clearance}"
                                    </p>
                                  </div>
                                </div>
                              ) : (
                                <div>
                                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center mb-3">
                                    <AlertTriangle size={20} className="text-red-500 mr-3 flex-shrink-0" />
                                    <p className="text-red-700 font-medium text-sm">{msg.docResults.message}</p>
                                  </div>
                                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                                    PlainID's authorization controls prevent retrieval of restricted documents, protecting sensitive information from unauthorized access.
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {msg.type === 'guardrail' && msg.guardrail === 'anonymizer' && (
                        <div className="bg-white rounded-xl border-l-4 border-purple-500 p-6 shadow-sm">
                          <div className="flex items-start">
                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-xl mr-4 flex-shrink-0">
                              <Eye size={24} className="text-white" />
                            </div>
                            <div className="flex-grow">
                              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                                Guardrail 3: Output Anonymization
                              </h4>
                              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                                <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-line">{msg.response.response}</p>
                              </div>
                              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  <div>
                                    <p className="text-xs font-medium text-gray-800">
                                      Techniques Applied:
                                    </p>
                                    <p className="text-xs text-gray-600">Policy applied based on {currentRole.name} role permissions</p>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    {/* Generalization Badge */}
                                    {msg.response.generalized && (
                                      <div className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex items-center">
                                        <Sparkles size={12} className="mr-1" />
                                        Generalized
                                      </div>
                                    )}
                                    {/* Redaction Badge */}
                                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                      msg.response.redactionLevel === 'none' ? 'bg-green-100 text-green-800' :
                                      msg.response.redactionLevel === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                                      'bg-red-100 text-red-800'
                                    }`}>
                                      {msg.response.redactionLevel === 'none' ? 'Full Access' :
                                       msg.response.redactionLevel === 'partial' ? 'Partial Access' :
                                       'Redacted'}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {msg.type === 'assistant' && (
                        <div className="flex justify-start">
                          <div className="flex items-start space-x-3 max-w-3xl">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                              <Shield size={20} className="text-white" />
                            </div>
                            <div>
                              <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-md border border-gray-200 shadow-sm">
                                <div className="flex items-center mb-2">
                                  <Shield size={16} className="text-teal-600 mr-2" />
                                  <span className="text-sm font-semibold text-gray-900">PlainID LangChain Authorizer</span>
                                  <BetaTag />
                                </div>
                                <p className="text-sm text-gray-800 leading-relaxed mb-3 whitespace-pre-line">{msg.text}</p>
                                <div className="pt-3 border-t border-gray-200">
                                  <div className="flex items-center flex-wrap gap-3 text-xs text-gray-500">
                                    <div className="flex items-center">
                                      <Check size={12} className="text-green-600 mr-1" />
                                      <span>All guardrails passed</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Lock size={12} className="text-teal-600 mr-1" />
                                      <span>Policy-compliant</span>
                                    </div>
                                    {/* Technique indicators */}
                                    {msg.generalized && (
                                      <div className="flex items-center px-2 py-0.5 bg-blue-50 rounded-full">
                                        <Sparkles size={10} className="text-blue-600 mr-1" />
                                        <span className="text-blue-700">Generalized</span>
                                      </div>
                                    )}
                                    {msg.redactionLevel !== 'none' && !msg.generalized && (
                                      <div className="flex items-center px-2 py-0.5 bg-red-50 rounded-full">
                                        <Eye size={10} className="text-red-600 mr-1" />
                                        <span className="text-red-700">Redacted</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {/* Follow-up Questions */}
                              {msg.followUps && msg.followUps.length > 0 && showFollowUps && (
                                <div className="mt-3 space-y-2">
                                  <p className="text-xs text-gray-500 font-medium">Suggested follow-ups:</p>
                                  <div className="flex flex-wrap gap-2">
                                    {msg.followUps.map((followUp, idx) => (
                                      <button
                                        key={idx}
                                        onClick={() => handleFollowUpClick(followUp)}
                                        disabled={isProcessing}
                                        className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-teal-50 hover:text-teal-700 text-gray-700 rounded-full border border-gray-200 hover:border-teal-300 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                                      >
                                        <ChevronRight size={12} className="mr-1" />
                                        {followUp}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isProcessing && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                          <Shield size={20} className="text-white" />
                        </div>
                        <div className="bg-white px-5 py-4 rounded-2xl rounded-tl-md border border-gray-200">
                          <div className="flex items-center space-x-2">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                            <span className="text-sm text-gray-600">Processing through guardrails...</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* File Preview Area */}
            {attachedFiles.length > 0 && (
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 border-t border-gray-200 px-6 py-4">
                <div className="max-w-4xl mx-auto">
                  <div className="text-sm font-medium text-gray-700 mb-3">Selected Files:</div>
                  <div className="flex flex-wrap gap-3">
                    {attachedFiles.map((file) => {
                      const iconData = getFileIcon(file.name);
                      const IconComponent = iconData.Icon;
                      return (
                        <div key={file.id} className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-shadow">
                          <div className={`${iconData.bg} p-2 rounded flex-shrink-0`}>
                            <IconComponent size={16} className={iconData.color} />
                          </div>
                          <div className="flex-grow min-w-0">
                            <div className="text-sm font-medium text-gray-900 truncate" title={file.name}>{file.name}</div>
                            <div className="text-xs text-gray-500">{formatFileSize(file.size)}</div>
                          </div>
                          <button 
                            onClick={() => removeFile(file.id)} 
                            className="flex-shrink-0 w-6 h-6 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors flex items-center justify-center"
                            title="Remove file"
                            disabled={isProcessing}
                          >
                            <X size={14} />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 px-6 py-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-end space-x-3">
                  {/* Upload Files Button */}
                  <button
                    onClick={() => handleFileUpload('document')}
                    disabled={isProcessing || attachedFiles.length >= 5}
                    className="flex-shrink-0 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                    title="Upload files"
                  >
                    <Paperclip size={20} />
                  </button>

                  {/* Upload Screenshot Button */}
                  <button
                    onClick={() => handleFileUpload('screenshot')}
                    disabled={isProcessing || attachedFiles.length >= 5}
                    className="flex-shrink-0 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                    title="Upload screenshot"
                  >
                    <Camera size={20} />
                  </button>

                  {/* Text Input */}
                  <div className="flex-grow relative">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Ask a question to see the three-layer authorization in action..."
                      disabled={isProcessing}
                      className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isProcessing}
                    className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={20} />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Protected by PlainID Authorization • {currentRole.name} • {currentRole.access}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* CTA Modal */}
      <CTAModal />

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
