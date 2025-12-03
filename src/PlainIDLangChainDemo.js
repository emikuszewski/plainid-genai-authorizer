import React, { useState, useEffect } from 'react';
import { Shield, Send, User, Filter, Database, Eye, Check, AlertTriangle, Lock, ChevronRight, Calendar, Download, MapPin, Users, Layers, Menu, Plus, MessageSquare, ArrowRight, Unlock, Paperclip, Camera, X, FileText, Image as ImageIcon, FileSpreadsheet, File, Building2, Cpu, HeartPulse, DollarSign } from 'lucide-react';

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
  const [showFollowUps, setShowFollowUps] = useState(false);
  const messagesEndRef = React.useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

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
        'compliance_data', 'healthcare_analytics'
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
    
    // Simulate file upload
    const newFile = {
      id: Date.now(),
      name: type === 'document' ? `Document_${attachedFiles.length + 1}.pdf` : `Screenshot_${attachedFiles.length + 1}.png`,
      size: Math.floor(Math.random() * 2000000) + 100000,
      type: type === 'document' ? 'pdf' : 'png'
    };
    
    setAttachedFiles([...attachedFiles, newFile]);
  };

  const removeFile = (fileId) => {
    setAttachedFiles(attachedFiles.filter(f => f.id !== fileId));
  };

  // Check authorization for current query and role
  const isAuthorized = () => {
    const query = sampleQueries[queryIndex];
    const role = rolePermissions[userRole];
    return role.categories.includes(query.category);
  };

  // Get classification result
  const getClassificationResult = () => {
    const query = sampleQueries[queryIndex];
    return {
      category: query.category,
      confidence: 0.87 + Math.random() * 0.1,
      topics: query.topics,
      authorized: isAuthorized()
    };
  };

  // Get document filtering results
  const getDocumentResults = () => {
    const role = rolePermissions[userRole];
    const query = sampleQueries[queryIndex];
    
    if (!isAuthorized()) {
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
    
    const allDocs = docsByCategory[query.category] || [
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
  const getRedactedResponse = () => {
    const query = sampleQueries[queryIndex];
    const role = rolePermissions[userRole];
    
    if (!isAuthorized()) {
      return {
        response: `Access Denied: You don't have permission to access ${query.category.replace(/_/g, ' ')} based on your current role and context.`,
        redactionLevel: "complete"
      };
    }
    
    // Comprehensive responses by category and role
    const responses = {
      // === GENERAL ENTERPRISE ===
      'financial_data': {
        executive: "Q4 financial results: Revenue $2.3M (+12% QoQ), Profit margin 23.4% (+2.1%), EBITDA $540K (+15%). Strong performance in enterprise segment with $890K ARR. Cash position remains healthy at $4.2M.",
        manager: "Q4 showed positive growth trends. Revenue increased 12% quarter-over-quarter. Profit margins improved by [REDACTED - Executive Only]. Enterprise segment performed well with [REDACTED] in annual recurring revenue. Overall financial health is strong.",
        employee: "Access Denied: Financial data requires manager-level clearance or higher."
      },
      'customer_analytics': {
        executive: "EU customer satisfaction: 87.3% (+4.2 pts), NPS score 52 (+8), retention rate 94.1%. Top satisfaction drivers: product reliability (8.9/10), support quality (8.7/10). Churn risk identified in 3 enterprise accounts worth $340K ARR.",
        manager: "EU customer satisfaction improved to 87.3% (+4.2 points). NPS score increased to 52. Customer retention remains strong at 94.1%. Key satisfaction drivers include product reliability and support quality. Some accounts flagged for retention review.",
        employee: "EU customer satisfaction trends show improvement. Overall satisfaction increased this quarter. Product reliability and support quality are key positive factors. Detailed metrics available upon request from your manager."
      },
      'hr_records': {
        executive: "Engineering dept: 3 employees below expectations (2 missed deadlines, 1 communication). PIPs active for J. Smith and M. Johnson. Retention risk: medium for 2 individuals. Recommended actions: coaching and workload review.",
        manager: "Your department has 3 employees with performance concerns: 2 related to deadline management, 1 communication-related. Performance improvement plans are in progress. Individual names available in HR portal.",
        employee: "Access Denied: Employee performance data requires manager-level clearance."
      },
      'technical_documentation': {
        executive: "Security architecture uses zero-trust model with quantum-resistant encryption (AES-256-GCM), real-time threat detection (<0.001% false positive rate). Multi-cloud: AWS, Azure, GCP. SOC2 Type II and ISO 27001 certified. Penetration test: 0 critical findings.",
        manager: "Product uses zero-trust security model with quantum-resistant encryption standards. Real-time threat detection system maintains industry-leading accuracy. Supports multi-cloud deployment across major providers. Full compliance certifications maintained.",
        employee: "Product implements zero-trust security architecture with modern encryption standards. Threat detection capabilities are integrated. Multi-cloud deployment is supported. Contact security team for detailed specifications."
      },
      'compensation_data': {
        executive: "Senior Engineer salary range: €75K-€110K (median €89K). Total comp with equity: €95K-€140K. Market positioning: 75th percentile for EU tech. Equity refresh grants averaging €15K/year for top performers.",
        manager: "Senior Engineer compensation is competitive with market standards. Total compensation packages include base salary plus equity components. We are positioned competitively in the EU tech market. [SALARY RANGES REDACTED - Executive Only]",
        employee: "Access Denied: Compensation data requires executive-level clearance."
      },

      // === ASSET MANAGEMENT ===
      'mnpi_data': {
        executive: "MNPI Alert - Confidential: Q4 earnings expected at $1.42 EPS (vs $1.28 consensus). M&A target: TechCorp acquisition at $45/share (~$2.1B). Insider Form 4 filings pending for 3 executives. Trading window closes Dec 15.",
        manager: "Access Denied: MNPI data requires executive clearance and compliance approval. Please contact the compliance team if you believe you need access for a legitimate business purpose.",
        employee: "Access Denied: Material Non-Public Information is restricted to authorized personnel only."
      },
      'compliance_data': {
        executive: "MNPI Compliance Status: 98.2% training completion. 2 pending violations under review (both administrative). Restricted list updated with 47 securities. Next audit: Q1 2025. No material findings from last SEC examination.",
        manager: "Compliance training completion is at 98.2% for your department. Some administrative items pending review. Restricted securities list has been updated. Please ensure your team completes outstanding training by end of quarter.",
        employee: "Access Denied: Detailed compliance data requires manager-level access."
      },

      // === TECHNOLOGY / ISVs ===
      'product_roadmap': {
        executive: "2025 Roadmap: Q1 - AI Assistant launch (revenue impact: +$500K MRR), Q2 - Enterprise SSO (3 customers waiting), Q3 - API v3 with GraphQL, Q4 - Mobile app. Total investment: $2.1M. Competitive response to Competitor X's announcement.",
        manager: "2025 roadmap includes AI capabilities in Q1, enterprise security features in Q2, API improvements in Q3, and mobile expansion in Q4. [REVENUE PROJECTIONS REDACTED]. Timeline subject to resource availability.",
        employee: "Access Denied: Product roadmap details require manager-level clearance."
      },
      'strategic_partnerships': {
        executive: "Active negotiations: CloudProvider Inc (revenue share deal, $1.2M potential), TechGiant Corp (OEM agreement, $3M+), StartupXYZ (acquisition target, $15M valuation). NDAs signed. Expected close: Q1 2025.",
        manager: "Access Denied: Partnership negotiations are confidential and require executive clearance.",
        employee: "Access Denied: Strategic partnership information is restricted."
      },
      'intellectual_property': {
        executive: "Patent portfolio: 23 granted, 8 pending. Q4 filings: 3 new applications (AI/ML methods). Prior art risk: low for 2 pending patents. Competitor patent watch: 5 new filings relevant to our space. Legal budget: on track.",
        manager: "Access Denied: IP and patent information requires executive and legal clearance.",
        employee: "Access Denied: Intellectual property information is restricted."
      },
      'security_data': {
        executive: "Current vulnerabilities: 2 medium (patched in next release), 0 critical. Last pen test: Nov 2024, all findings remediated. Bug bounty: 12 reports this quarter, $45K paid. No customer data exposure incidents.",
        manager: "Access Denied: Security vulnerability data requires security team and executive clearance.",
        employee: "Access Denied: Security assessment data is restricted."
      },

      // === HEALTHCARE ===
      'clinical_data': {
        executive: "Phase 3 Trial Results (CONFIDENTIAL): Primary endpoint met with p<0.001. Efficacy: 73% vs 45% placebo. Adverse events: 12% (vs 8% placebo), mostly mild. FDA submission planned for March 2025. Stock impact analysis prepared.",
        manager: "Access Denied: Clinical trial results are MNPI and require executive and medical affairs clearance.",
        employee: "Access Denied: Clinical data is restricted to authorized research personnel."
      },
      'payer_contracts': {
        executive: "Active negotiations: BlueCross (targeting 15% rate increase), Aetna (renewal at current rates + quality bonus), Medicare Advantage (3 new plan partnerships). Total contract value at risk: $12M. Expected outcomes: +$2.1M net.",
        manager: "Access Denied: Payer contract negotiations are confidential and require executive clearance.",
        employee: "Access Denied: Contract information is restricted."
      },
      'phi_data': {
        executive: "Access requires additional HIPAA authorization. 847 patients currently eligible for new protocol. Demographics: 62% female, mean age 54. Enrollment rate: 23% (target: 40%). Contact clinical ops for patient-level access with proper authorization.",
        manager: "Access Denied: PHI requires HIPAA authorization and clinical operations approval.",
        employee: "Access Denied: Patient data is protected under HIPAA regulations."
      },
      'regulatory_data': {
        executive: "FDA Status: Drug A - PDUFA date March 15, 2025 (90% approval probability). Drug B - Complete Response Letter received, resubmission Q2. Drug C - Phase 2 complete, IND amendment pending. No warning letters or Form 483s outstanding.",
        manager: "Access Denied: Regulatory filing status is MNPI and requires executive clearance.",
        employee: "Access Denied: Regulatory information is restricted."
      },
      'healthcare_analytics': {
        executive: "Utilization patterns: Top 5 DRGs account for 45% of costs. Cost per episode: $12,340 (vs $14,200 benchmark). High-utilization providers identified in 3 regions. Savings opportunity: $3.2M through care pathway optimization.",
        manager: "Utilization analysis shows concentration in key diagnosis categories. Cost per episode is below benchmark. Optimization opportunities identified. Detailed provider-level data available in analytics dashboard.",
        employee: "General utilization trends are available in the analytics portal. Cost metrics show favorable performance versus benchmarks. Contact your manager for detailed analysis."
      }
    };
    
    const categoryResponses = responses[query.category];
    if (categoryResponses) {
      return {
        response: categoryResponses[userRole] || categoryResponses.employee || "Information not available for this query.",
        redactionLevel: userRole === 'executive' ? 'none' : userRole === 'manager' ? 'partial' : 'high'
      };
    }
    
    // Default response for unmapped categories
    return {
      response: "Information retrieved based on your access level. Some details may be redacted based on your role permissions.",
      redactionLevel: userRole === 'executive' ? 'none' : 'partial'
    };
  };

  // Get unsecured response - always returns full data regardless of permissions
  const getUnsecuredResponse = () => {
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

  // Handle follow-up question click
  const handleFollowUpClick = (followUpText) => {
    // Find a matching query or use the follow-up text as-is
    const matchingQueryIndex = sampleQueries.findIndex(q => 
      q.text.toLowerCase().includes(followUpText.toLowerCase().split(' ').slice(0, 3).join(' '))
    );
    
    if (matchingQueryIndex !== -1) {
      setQueryIndex(matchingQueryIndex);
      setInputText(sampleQueries[matchingQueryIndex].text);
    } else {
      setInputText(followUpText);
    }
    setShowFollowUps(false);
  };

  const handleSendMessage = () => {
    const query = sampleQueries[queryIndex];
    
    // Add user message
    const userMessage = {
      type: 'user',
      text: query.text,
      files: [...attachedFiles],
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

    // Guardrail 2: Retriever
    setTimeout(() => {
      const docResults = getDocumentResults();
      setMessages(prev => [...prev, {
        type: 'guardrail',
        guardrail: 'retriever',
        docResults: docResults,
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
        followUps: query.followUps,
        timestamp: new Date()
      }]);
      setIsProcessing(false);
      setCurrentGuardrail(0);
      setShowFollowUps(true);
      
      // Show CTA modal
      setTimeout(() => setShowCTAModal(true), 2000);
    }, 8000);
  };

  const selectQuery = (index) => {
    // Find the actual index in the full sampleQueries array
    const actualIndex = sampleQueries.findIndex(q => q.text === filteredQueries[index].text);
    setQueryIndex(actualIndex);
    setInputText(sampleQueries[actualIndex].text);
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
  const classification = getClassificationResult();
  const docResults = getDocumentResults();
  const response = getRedactedResponse();

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
            }}
            className="w-full flex items-center justify-center px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Plus size={16} className="mr-2" />
            <span className="text-sm font-medium">New Demo</span>
          </button>
        </div>

        {/* Industry Filter */}
        <div className="p-3 border-b border-gray-700">
          <div className="text-xs text-gray-400 mb-2 px-2">Filter by Industry</div>
          <div className="space-y-1">
            {industries.map((industry) => {
              const IconComponent = industry.icon;
              return (
                <button
                  key={industry.id}
                  onClick={() => setSelectedIndustry(industry.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedIndustry === industry.id 
                      ? 'bg-teal-500 text-white' 
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <IconComponent size={16} className="mr-2 flex-shrink-0" />
                  <span className="truncate">{industry.name}</span>
                </button>
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
                        <p className="text-sm text-gray-900">{sampleQueries[queryIndex].text}</p>
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
                        <p className="text-sm text-gray-900 mb-3">{getUnsecuredResponse()}</p>
                        {!isAuthorized() && (
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
                        <p className="text-sm text-gray-900">{sampleQueries[queryIndex].text}</p>
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
                        <p className="text-sm text-gray-900 mb-3">{response.response}</p>
                        <div className="mt-3 p-2 bg-teal-100 border border-teal-300 rounded">
                          <p className="text-teal-700 text-xs flex items-center">
                            <Shield size={14} className="mr-2" />
                            Policy-compliant response with {response.redactionLevel} redaction
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
                        <p className="text-sm font-medium text-gray-700">Output Redaction</p>
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
                      <p>5. <strong>Try follow-up questions</strong> to continue the conversation</p>
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
                              {msg.docResults.filteredDocs.length > 0 ? (
                                <div>
                                  <p className="text-gray-700 mb-3 text-sm">{msg.docResults.message}</p>
                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
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
                                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                                    <p className="text-xs text-blue-900">
                                      <strong>Filter Applied:</strong> region="{currentRole.context.region}" AND clearance_level>="{currentRole.context.clearance}"
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
                                Guardrail 3: Output Redaction
                              </h4>
                              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-4">
                                <p className="text-sm text-gray-900 leading-relaxed">{msg.response.response}</p>
                              </div>
                              <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-xs font-medium text-gray-800">Redaction Level: {msg.response.redactionLevel}</p>
                                    <p className="text-xs text-gray-600">Policy applied based on {currentRole.name} role permissions</p>
                                  </div>
                                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    msg.response.redactionLevel === 'none' ? 'bg-green-100 text-green-800' :
                                    msg.response.redactionLevel === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                  }`}>
                                    {msg.response.redactionLevel === 'none' ? 'Full Access' :
                                     msg.response.redactionLevel === 'partial' ? 'Partial Redaction' :
                                     'High Redaction'}
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
                                <p className="text-sm text-gray-800 leading-relaxed mb-3">{msg.text}</p>
                                <div className="pt-3 border-t border-gray-200">
                                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                                    <div className="flex items-center">
                                      <Check size={12} className="text-green-600 mr-1" />
                                      <span>All guardrails passed</span>
                                    </div>
                                    <div className="flex items-center">
                                      <Lock size={12} className="text-teal-600 mr-1" />
                                      <span>Policy-compliant</span>
                                    </div>
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
                                        className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-teal-50 hover:text-teal-700 text-gray-700 rounded-full border border-gray-200 hover:border-teal-300 transition-colors flex items-center"
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
