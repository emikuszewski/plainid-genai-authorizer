import React, { useState, useEffect } from 'react';
import { Shield, Check, AlertTriangle, Lock, Unlock, Server, Database, User, Bot, FileText, Filter, Eye, EyeOff, ArrowRight, ChevronRight, Calendar, Download, Layers, Users, Globe, Clock, MapPin } from 'lucide-react';

export default function PlainIDLangChainDemo() {
  // Demo state
  const [userRole, setUserRole] = useState('manager');
  const [queryIndex, setQueryIndex] = useState(0);
  const [currentGuardrail, setCurrentGuardrail] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [showCTAModal, setShowCTAModal] = useState(false);
  
  // Animation helper and auto-scroll to each guardrail as it becomes active
  useEffect(() => {
    setAnimateIn(true);
    
    // Auto-scroll to specific guardrail heading as it becomes active
    if (currentGuardrail >= 1 && currentGuardrail <= 4) {
      const delay = currentGuardrail === 1 ? 1200 : 800;
      
      setTimeout(() => {
        if (currentGuardrail === 1) {
          // For guardrail 1, use manual calculation to ensure entire card is visible
          const guardrailElement = document.getElementById('guardrail-1');
          console.log('Guardrail 1: Manual scroll calculation:', guardrailElement);
          
          if (guardrailElement) {
            const elementRect = guardrailElement.getBoundingClientRect();
            const absoluteTop = window.pageYOffset + elementRect.top;
            // Scroll to a position well above the card to ensure entire card is visible
            const scrollTarget = absoluteTop - 350; // Much larger offset for guardrail 1
            
            console.log('Guardrail 1: Scrolling to position:', scrollTarget, 'Element top:', absoluteTop);
            
            window.scrollTo({
              top: Math.max(0, scrollTarget),
              behavior: 'smooth'
            });
          }
        } else {
          // For other guardrails, use normal scroll behavior
          const guardrailElement = document.getElementById(`guardrail-${currentGuardrail}`);
          console.log(`Looking for guardrail-${currentGuardrail}:`, guardrailElement);
          
          if (guardrailElement) {
            console.log(`Scrolling to show entire guardrail-${currentGuardrail} box`);
            
            guardrailElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
          } else {
            console.log(`Guardrail ${currentGuardrail} element not found yet`);
          }
        }
      }, delay);
    }
    
    return () => setAnimateIn(false);
  }, [currentGuardrail]);
  
  // Show CTA modal after completion
  useEffect(() => {
    if (currentGuardrail === 4) {
      setTimeout(() => setShowCTAModal(true), 2000);
    }
  }, [currentGuardrail]);

  // Enhanced sample queries with categories
  const sampleQueries = [
    { 
      text: 'What were our Q4 financial results?', 
      category: 'financial_data',
      topics: ['revenue', 'profit', 'financial_performance']
    },
    { 
      text: 'Show me customer satisfaction trends in Europe', 
      category: 'customer_analytics',
      topics: ['customer_data', 'analytics', 'regional_data']
    },
    { 
      text: 'List employees with performance concerns in my department', 
      category: 'hr_records',
      topics: ['employee_data', 'performance', 'hr_sensitive']
    },
    { 
      text: 'Explain the security architecture of our new product', 
      category: 'technical_documentation',
      topics: ['security', 'architecture', 'product_specs']
    },
    { 
      text: 'What are the salary ranges for senior engineers?', 
      category: 'compensation_data',
      topics: ['salary', 'compensation', 'hr_confidential']
    }
  ];
  
  // Enhanced role-based permissions with context
  const rolePermissions = {
    'executive': {
      name: 'Executive',
      access: 'Full Access',
      categories: ['financial_data', 'customer_analytics', 'hr_records', 'technical_documentation', 'compensation_data'],
      context: { region: 'global', clearance: 'executive', department: 'all' }
    },
    'manager': {
      name: 'Department Manager', 
      access: 'Limited Access',
      categories: ['customer_analytics', 'technical_documentation', 'hr_records'],
      context: { region: 'eu-central', clearance: 'manager', department: 'engineering' }
    },
    'employee': {
      name: 'Employee',
      access: 'Basic Access', 
      categories: ['technical_documentation'],
      context: { region: 'eu-central', clearance: 'standard', department: 'engineering' }
    }
  };
  
  // Three guardrails architecture
  const guardrails = [
    { 
      name: "Setup", 
      icon: User, 
      title: "Configure Request",
      description: "Select role and prompt, then start the LangChain authorization flow" 
    },
    { 
      name: "Categorizer", 
      icon: Filter, 
      title: "Prompt Classification (Pre-Query)",
      description: "LLM classifies prompt topic and validates against user permissions" 
    },
    { 
      name: "Retriever", 
      icon: Database, 
      title: "Document Filtering (During Retrieval)", 
      description: "Vector store filters documents based on metadata and user context" 
    },
    { 
      name: "Anonymizer", 
      icon: Eye, 
      title: "Output Redaction (Post-Query)",
      description: "Dynamic field masking based on user entitlements" 
    },
    { 
      name: "Complete", 
      icon: Check, 
      title: "Secure Response",
      description: "Policy-compliant response delivered to user" 
    }
  ];
  
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
      confidence: 0.87,
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
    
    const allDocs = [
      { name: "Q4_Financial_Report.pdf", metadata: { region: "global", classification: "confidential", department: "finance" }},
      { name: "EU_Customer_Analytics.pdf", metadata: { region: "eu-central", classification: "internal", department: "marketing" }},
      { name: "Employee_Performance_Q4.xlsx", metadata: { region: "eu-central", classification: "restricted", department: "hr" }},
      { name: "Product_Security_Architecture.md", metadata: { region: "global", classification: "internal", department: "engineering" }},
      { name: "Salary_Benchmarks_2024.xlsx", metadata: { region: "eu-central", classification: "confidential", department: "hr" }}
    ];
    
    // Filter based on role context and query category
    const filteredDocs = allDocs.filter(doc => {
      if (userRole === 'executive') return true;
      if (userRole === 'manager') {
        return doc.metadata.region === role.context.region || doc.metadata.region === 'global';
      }
      return doc.metadata.region === role.context.region && doc.metadata.classification === 'internal';
    });
    
    return {
      totalDocs: allDocs.length,
      filteredDocs: filteredDocs.slice(0, 3),
      message: `Retrieved ${filteredDocs.length} authorized documents`
    };
  };
  
  // Get redacted response
  const getRedactedResponse = () => {
    const query = sampleQueries[queryIndex];
    const role = rolePermissions[userRole];
    
    if (!isAuthorized()) {
      return {
        response: "Access Denied: You don't have permission to access this information based on your current role and context.",
        redactionLevel: "complete"
      };
    }
    
    const responses = {
      0: { // Financial query
        executive: "Q4 financial results: Revenue $2.3M (+12% QoQ), Profit margin 23.4% (+2.1%), EBITDA $540K (+15%). Strong performance in enterprise segment with $890K ARR.",
        manager: "Q4 showed positive growth trends. Revenue increased 12% quarter-over-quarter. Profit margins improved by [REDACTED]. Enterprise segment performed well with [REDACTED] in annual recurring revenue.",
        employee: "Access Denied: Financial data requires manager-level clearance or higher."
      },
      1: { // Customer analytics
        executive: "EU customer satisfaction: 87.3% (+4.2 pts), NPS score 52 (+8), retention rate 94.1%. Top satisfaction drivers: product reliability (8.9/10), support quality (8.7/10).",
        manager: "EU customer satisfaction improved to 87.3% (+4.2 points). NPS score increased to 52. Customer retention remains strong at 94.1%. Key satisfaction drivers include product reliability and support quality.",
        employee: "EU customer satisfaction trends show improvement. Overall satisfaction increased. Product reliability and support quality are key positive factors. Detailed metrics require manager access."
      },
      2: { // HR records  
        executive: "Engineering dept: 3 employees below expectations (2 missed deadlines, 1 communication). Performance improvement plans active. Retention risk: medium for 2 individuals.",
        manager: "Your department has 3 employees with performance concerns: 2 related to deadline management, 1 communication-related. Performance improvement plans are in progress.",
        employee: "Access Denied: Employee performance data requires manager-level clearance."
      },
      3: { // Technical docs
        executive: "Security architecture uses zero-trust model, quantum-resistant encryption (AES-256), real-time threat detection with <0.001% false positive rate. Multi-cloud deployment: AWS, Azure, GCP.",
        manager: "Product uses zero-trust security model with quantum-resistant encryption. Real-time threat detection system maintains very low false positive rates. Supports multi-cloud deployment.",
        employee: "Product implements zero-trust security architecture with modern encryption standards. Threat detection capabilities are integrated. Multi-cloud deployment is supported."
      },
      4: { // Compensation
        executive: "Senior Engineer salary range: €75K-€110K (median €89K). Total comp with equity: €95K-€140K. Market positioning: 75th percentile for EU tech.",
        manager: "Senior Engineer compensation is competitive with market standards. Total compensation packages include base salary plus equity components. [SALARY_RANGES_REDACTED]",
        employee: "Access Denied: Compensation data requires executive-level clearance."
      }
    };
    
    return {
      response: responses[queryIndex][userRole],
      redactionLevel: userRole === 'executive' ? 'none' : userRole === 'manager' ? 'partial' : 'high'
    };
  };
  
  // Reset demo
  const resetDemo = () => {
    setCurrentGuardrail(0);
    setIsProcessing(false);
    setShowCTAModal(false);
  };
  
  // Start guardrail flow
  const startGuardrailFlow = () => {
    setCurrentGuardrail(1);
    setIsProcessing(true);
    
    setTimeout(() => setCurrentGuardrail(2), 6000);  // 6 seconds for guardrail 1
    setTimeout(() => setCurrentGuardrail(3), 12000); // 6 seconds for guardrail 2  
    setTimeout(() => setCurrentGuardrail(4), 18000); // 6 seconds for guardrail 3
    setTimeout(() => setIsProcessing(false), 18000); // Complete at 18 seconds
  };
  
  // Reusable components
  const BetaTag = () => (
    <span className="ml-2 px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded uppercase">Beta</span>
  );
  
  const Button = ({ children, primary, secondary, danger, disabled, onClick, className = "", icon }) => {
    const baseStyle = "px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center relative overflow-hidden group";
    const primaryStyle = primary ? "bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-sm hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-inner" : "";
    const secondaryStyle = secondary ? "bg-white border border-gray-200 text-slate-700 hover:bg-gray-50 hover:border-teal-400 hover:text-teal-600 hover:shadow-sm hover:scale-[1.01] active:scale-[0.99] active:bg-gray-100" : "";
    const dangerStyle = danger ? "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98] active:translate-y-0 active:shadow-inner" : "";
    const disabledStyle = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
    
    return (
      <button 
        onClick={onClick} 
        disabled={disabled}
        className={`${baseStyle} ${primaryStyle} ${secondaryStyle} ${dangerStyle} ${disabledStyle} ${className}`}
      >
        <div className="flex items-center justify-center relative z-10">
          {icon && <span className="mr-2 transform group-hover:scale-110 transition-transform duration-300">{icon}</span>}
          <span className="transform transition-all duration-300">{children}</span>
        </div>
      </button>
    );
  };
  
  const Card = ({ children, className = "", ...props }) => (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md ${className}`} {...props}>
      {children}
    </div>
  );
  
  // CTA Modal
  const CTAModal = () => {
    if (!showCTAModal) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full mx-4 transform transition-all">
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
              <Button 
                primary
                onClick={() => {
                  window.open('https://www.plainid.com/contact/', '_blank');
                  setShowCTAModal(false);
                }}
                icon={<Calendar size={18} />}
                className="w-full justify-center"
              >
                Schedule Live Demo
              </Button>
              
              <Button 
                secondary
                onClick={() => {
                  window.open('https://docs.plainid.io/docs/langchain-authorizer', '_blank');
                  setShowCTAModal(false);
                }}
                icon={<Download size={18} />}
                className="w-full justify-center"
              >
                View Documentation
              </Button>
              
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

  const classification = getClassificationResult();
  const docResults = getDocumentResults();
  const response = getRedactedResponse();
  const currentRole = rolePermissions[userRole];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-2.5 rounded-lg shadow-sm">
              <Shield size={24} />
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-medium text-gray-900 tracking-tight flex items-center">
                PlainID LangChain Authorizer
                <BetaTag />
              </h1>
              <p className="text-sm text-gray-500">Enterprise Authorization for LangChain and AI Applications</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button 
              secondary
              onClick={() => setShowComparison(!showComparison)}
              icon={<ArrowRight size={18} />}
            >
              {showComparison ? "Show AI Chat" : "Compare AI Chat Approaches"}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8">
        {/* Hero Section */}
        <Card className="mb-8 p-8 relative overflow-hidden bg-gradient-to-r from-teal-50 to-blue-50">
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Secure Your LangChain & AI Pipeline
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Add enterprise-grade authorization with three security guardrails
              </p>
              <div className="flex justify-center space-x-8 mb-6">
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
            
            {/* Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-gray-700 font-medium mb-3 text-sm uppercase tracking-wider">User Role & Context</h4>
                <div className="space-y-3">
                  {Object.entries(rolePermissions).map(([role, config]) => (
                    <button
                      key={role}
                      onClick={() => {
                        setUserRole(role);
                        resetDemo();
                      }}
                      className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                        userRole === role 
                          ? 'border-teal-500 bg-teal-50 shadow-sm' 
                          : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/50'
                      }`}
                      disabled={isProcessing}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{config.name}</p>
                          <p className="text-sm text-gray-600">{config.access}</p>
                        </div>
                        <div className="text-right text-xs text-gray-500">
                          <div className="flex items-center">
                            <MapPin size={12} className="mr-1" />
                            {config.context.region}
                          </div>
                          <div className="flex items-center">
                            <Users size={12} className="mr-1" />
                            {config.context.department}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-gray-700 font-medium mb-3 text-sm uppercase tracking-wider">Enter Prompt</h4>
                <div className="space-y-2">
                  {sampleQueries.map((query, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQueryIndex(index);
                        resetDemo();
                      }}
                      className={`w-full p-3 rounded-lg border transition-all duration-300 text-left ${
                        queryIndex === index 
                          ? 'border-teal-500 bg-teal-50 shadow-sm' 
                          : 'border-gray-200 bg-white hover:border-teal-300 hover:bg-teal-50/50'
                      }`}
                      disabled={isProcessing}
                    >
                      <p className="text-sm text-gray-900">{query.text}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {showComparison ? (
          // Side-by-Side Comparison
          <div className="grid grid-cols-2 gap-8">
            {/* Standard RAG */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <div className="rounded-full bg-red-50 p-2">
                  <AlertTriangle className="text-red-500" size={24} />
                </div>
                <h3 className="text-xl font-medium ml-3 text-gray-900">AI Chat</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Query Processing</h4>
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <p className="text-sm text-gray-600">❌ No prompt classification</p>
                    <p className="text-sm text-gray-600">❌ No authorization checks</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Document Retrieval</h4>
                  <div className="bg-gray-50 p-3 rounded-lg border">
                    <p className="text-sm text-gray-600">❌ All documents accessible</p>
                    <p className="text-sm text-gray-600">❌ No metadata filtering</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Response</h4>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <p className="text-gray-900 font-medium">{response.response}</p>
                    {!isAuthorized() && (
                      <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded">
                        <p className="text-red-700 text-sm flex items-center">
                          <AlertTriangle size={16} className="mr-2" />
                          Security Risk: Unauthorized data exposure
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
            
            {/* PlainID RAG */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <div className="rounded-full bg-teal-50 p-2">
                  <Shield className="text-teal-500" size={24} />
                </div>
                <h3 className="text-xl font-medium ml-3 text-gray-900 flex items-center">
                  PlainID Secured AI Chat
                  <BetaTag />
                </h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Guardrail 1: Categorizer</h4>
                  <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                    <p className="text-sm text-gray-600">✓ LLM classifies prompt as '{classification.category}'</p>
                    <p className="text-sm text-gray-600">✓ Authorization: {classification.authorized ? 'Granted' : 'Denied'}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Guardrail 2: Retriever</h4>
                  <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                    <p className="text-sm text-gray-600">✓ Metadata filtering applied</p>
                    <p className="text-sm text-gray-600">✓ {docResults.message}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Guardrail 3: Anonymizer</h4>
                  <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
                    <p className="text-gray-900">{response.response}</p>
                    <div className="mt-2 p-2 bg-teal-100 border border-teal-300 rounded">
                      <p className="text-teal-700 text-sm flex items-center">
                        <Shield size={16} className="mr-2" />
                        Policy-compliant response with {response.redactionLevel} redaction
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          // Guardrails Flow
          <div>
            {/* Flow Controls */}
            <Card className="p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-gray-900 font-medium mb-1">LangChain Authorization Flow</h4>
                  <p className="text-gray-500 text-sm">Three guardrails secure your RAG pipeline</p>
                </div>
                <div className="flex space-x-3">
                  {currentGuardrail === 0 && (
                    <Button 
                      primary
                      onClick={startGuardrailFlow}
                      icon={<ArrowRight size={18} />}
                      className="px-6"
                    >
                      Start Authorization Flow
                    </Button>
                  )}
                  {currentGuardrail > 0 && currentGuardrail < 4 && (
                    <Button
                      primary
                      onClick={() => setCurrentGuardrail(currentGuardrail + 1)}
                      disabled={isProcessing}
                      icon={<ChevronRight size={18} />}
                    >
                      Next Guardrail
                    </Button>
                  )}
                  {currentGuardrail === 4 && (
                    <Button 
                      primary
                      icon={<ArrowRight size={18} />}
                      onClick={() => {
                        resetDemo();
                        startGuardrailFlow();
                      }}
                    >
                      Try Another Query
                    </Button>
                  )}
                  
                  {currentGuardrail > 0 && (
                    <Button 
                      secondary
                      onClick={resetDemo}
                      disabled={isProcessing && currentGuardrail < 4}
                    >
                      Reset Demo
                    </Button>
                  )}
                </div>
              </div>
            </Card>
            
            {/* Guardrails Visualization */}
            <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg mb-8">
              {/* Pipeline Progress - Always Visible */}
              <div className="p-6 border-b border-gray-100">
                <div className="relative mb-6">
                  <div className="absolute h-2 bg-gray-200 left-12 right-12 top-6 rounded-full z-0"></div>
                  <div 
                    className="absolute h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-500 z-0"
                    style={{
                      top: '1.5rem',
                      left: '3rem',
                      width: currentGuardrail === 0 ? '0' : 
                             currentGuardrail === 4 ? 'calc(100% - 6rem)' : 
                             `calc(${(currentGuardrail / 4) * 100}% - ${24 * (1 - currentGuardrail/4)}px)`
                    }}
                  ></div>
                  
                  <div className="flex justify-between items-center">
                    {guardrails.map((guardrail, index) => (
                      <div key={index} className={`flex flex-col items-center transition-all duration-500 z-10 relative ${
                        currentGuardrail === index ? 'scale-110' : ''
                      }`}>
                        <div className={`w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all duration-300 z-10 relative ${
                          currentGuardrail === index 
                            ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-transparent shadow-md' 
                            : currentGuardrail > index 
                            ? 'bg-teal-500 text-white border-transparent' 
                            : 'bg-white text-gray-400 border-gray-200'
                        }`}>
                          <guardrail.icon size={16} />
                        </div>
                        <span className={`text-xs font-medium mt-1 transition-colors duration-300 ${
                          currentGuardrail === index 
                            ? 'text-teal-600' 
                            : currentGuardrail > index 
                            ? 'text-teal-500' 
                            : 'text-gray-400'
                        }`}>
                          {guardrail.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Current Step Description - Compact */}
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-gray-900 font-medium text-sm">{guardrails[currentGuardrail].title}</h4>
                    <p className="text-gray-600 text-xs">{guardrails[currentGuardrail].description}</p>
                  </div>
                  
                  {isProcessing && currentGuardrail < 4 && (
                    <div className="flex items-center bg-white/80 px-3 py-1 rounded-full border border-teal-100 animate-pulse">
                      <div className="flex space-x-1 mr-2">
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce"></span>
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                        <span className="w-1.5 h-1.5 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                      </div>
                      <span className="text-gray-700 text-xs font-medium">Processing</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Detailed Step Content - Below Sticky Pipeline */}
            <Card className="mb-8 border-t-4 border-teal-500" data-scroll-target="guardrails-content">
              {/* Step Content */}
              <div className="p-6">
                <div className="space-y-6">
                  {/* Guardrail 1: Categorizer - Always render, control visibility */}
                  <div 
                    id="guardrail-1" 
                    className={`p-6 rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-blue-50 scroll-mt-80 transition-all duration-500 ${
                      currentGuardrail === 1 ? 'ring-2 ring-teal-300 shadow-lg scale-[1.02]' : ''
                    } ${currentGuardrail >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                  >
                    <div className="flex items-start">
                      <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-3 rounded-xl mr-4 flex-shrink-0">
                        <Filter size={24} />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-medium text-gray-900 mb-3">
                          Guardrail 1: Prompt Categorization
                          {currentGuardrail === 1 && (
                            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800 animate-pulse">
                              Active
                            </span>
                          )}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-white/80 p-4 rounded-lg border border-teal-100">
                            <h5 className="font-medium text-gray-800 mb-2">LLM Classification</h5>
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Category:</span>
                                <span className="text-sm font-medium">{classification.category}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Confidence:</span>
                                <span className="text-sm font-medium">{(classification.confidence * 100).toFixed(1)}%</span>
                              </div>
                              <div className="text-xs text-gray-500">
                                Topics: {classification.topics.join(', ')}
                              </div>
                            </div>
                          </div>
                          <div className="bg-white/80 p-4 rounded-lg border border-teal-100">
                            <h5 className="font-medium text-gray-800 mb-2">Authorization Check</h5>
                            <div className={`p-3 rounded-lg ${
                              classification.authorized 
                                ? 'bg-green-50 border border-green-200' 
                                : 'bg-red-50 border border-red-200'
                            }`}>
                              <div className="flex items-center">
                                {classification.authorized ? (
                                  <Check size={16} className="text-green-600 mr-2" />
                                ) : (
                                  <Lock size={16} className="text-red-600 mr-2" />
                                )}
                                <span className={`font-medium ${
                                  classification.authorized ? 'text-green-800' : 'text-red-800'
                                }`}>
                                  {classification.authorized ? 'Access Granted' : 'Access Denied'}
                                </span>
                              </div>
                              <p className={`text-sm mt-1 ${
                                classification.authorized ? 'text-green-700' : 'text-red-700'
                              }`}>
                                {classification.authorized 
                                  ? `${currentRole.name} can access ${classification.category} data`
                                  : `${currentRole.name} cannot access ${classification.category} data`
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Guardrail 2: Retriever - Always render, control visibility */}
                  <div 
                    id="guardrail-2" 
                    className={`p-6 rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 scroll-mt-64 transition-all duration-500 ${
                      currentGuardrail === 2 ? 'ring-2 ring-blue-300 shadow-lg scale-[1.02]' : ''
                    } ${currentGuardrail >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                  >
                    <div className="flex items-start">
                      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3 rounded-xl mr-4 flex-shrink-0">
                        <Database size={24} />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-medium text-gray-900 mb-3">
                          Guardrail 2: Document Filtering
                          {currentGuardrail === 2 && (
                            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 animate-pulse">
                              Active
                            </span>
                          )}
                        </h4>
                        {isAuthorized() ? (
                          <div>
                            <p className="text-gray-700 mb-3">{docResults.message}</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                              {docResults.filteredDocs.map((doc, index) => (
                                <div key={index} className="bg-white/80 p-3 rounded-lg border border-blue-100">
                                  <div className="flex items-center mb-2">
                                    <FileText size={16} className="text-blue-500 mr-2" />
                                    <span className="text-sm font-medium text-gray-900">{doc.name}</span>
                                  </div>
                                  <div className="text-xs text-gray-600 space-y-1">
                                    <div>Region: {doc.metadata.region}</div>
                                    <div>Classification: {doc.metadata.classification}</div>
                                    <div>Department: {doc.metadata.department}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="bg-white/80 p-3 rounded-lg border border-blue-100">
                              <p className="text-sm text-gray-700">
                                <strong>Filter Applied:</strong> region="{currentRole.context.region}" AND 
                                clearance_level>="{currentRole.context.clearance}"
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center mb-3">
                              <AlertTriangle size={20} className="text-red-500 mr-3 flex-shrink-0" />
                              <p className="text-red-700 font-medium">{docResults.message}</p>
                            </div>
                            <p className="text-gray-700 bg-white p-3 rounded-lg border border-blue-100">
                              PlainID's authorization controls prevent retrieval of restricted documents,
                              protecting sensitive information from unauthorized access.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Guardrail 3: Anonymizer - Always render, control visibility */}
                  <div 
                    id="guardrail-3" 
                    className={`p-6 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 scroll-mt-64 transition-all duration-500 ${
                      currentGuardrail === 3 ? 'ring-2 ring-purple-300 shadow-lg scale-[1.02]' : ''
                    } ${currentGuardrail >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                  >
                    <div className="flex items-start">
                      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-3 rounded-xl mr-4 flex-shrink-0">
                        <Eye size={24} />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-medium text-gray-900 mb-3">
                          Guardrail 3: Output Redaction
                          {currentGuardrail === 3 && (
                            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 animate-pulse">
                              Active
                            </span>
                          )}
                        </h4>
                        <div className="bg-white/90 p-4 rounded-lg border border-purple-100 mb-4">
                          <p className="text-gray-900 leading-relaxed">{response.response}</p>
                        </div>
                        <div className="bg-white/80 p-3 rounded-lg border border-purple-100">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-800">Redaction Level: {response.redactionLevel}</p>
                              <p className="text-xs text-gray-600">
                                Policy applied based on {currentRole.name} role permissions
                              </p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                              response.redactionLevel === 'none' ? 'bg-green-100 text-green-800' :
                              response.redactionLevel === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {response.redactionLevel === 'none' ? 'Full Access' :
                               response.redactionLevel === 'partial' ? 'Partial Redaction' :
                               'High Redaction'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Completion - Always render, control visibility */}
                  <div 
                    id="guardrail-4" 
                    className={`p-6 rounded-xl border border-green-200 bg-gradient-to-r from-green-50 to-teal-50 scroll-mt-64 transition-all duration-500 ${
                      currentGuardrail === 4 ? 'ring-2 ring-green-300 shadow-lg scale-[1.02]' : ''
                    } ${currentGuardrail >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
                  >
                    <div className="flex items-start">
                      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-xl mr-4 flex-shrink-0">
                        <Check size={24} />
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-lg font-medium text-gray-900 mb-3">
                          Authorization Complete
                          {currentGuardrail === 4 && (
                            <span className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 animate-pulse">
                              Complete
                            </span>
                          )}
                        </h4>
                        <div className="bg-white/90 p-4 rounded-lg border border-green-100 mb-4">
                          <div className="flex items-center mb-2">
                            <Shield size={20} className="text-green-600 mr-2" />
                            <span className="font-medium text-gray-900">PlainID LangChain Authorizer</span>
                            <BetaTag />
                          </div>
                          <p className="text-gray-700">
                            {isAuthorized() 
                              ? "Secure response generated with appropriate access controls. All three guardrails successfully enforced policy compliance."
                              : "Access control policies prevented unauthorized access. User received appropriate access denied response."}
                          </p>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center p-3 bg-white/80 rounded-lg border border-green-100">
                            <Filter size={20} className="text-green-600 mx-auto mb-1" />
                            <p className="text-xs font-medium text-gray-700">Prompt Classified</p>
                          </div>
                          <div className="text-center p-3 bg-white/80 rounded-lg border border-green-100">
                            <Database size={20} className="text-green-600 mx-auto mb-1" />
                            <p className="text-xs font-medium text-gray-700">Documents Filtered</p>
                          </div>
                          <div className="text-center p-3 bg-white/80 rounded-lg border border-green-100">
                            <Eye size={20} className="text-green-600 mx-auto mb-1" />
                            <p className="text-xs font-medium text-gray-700">Output Redacted</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center mb-2">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-2 rounded-lg shadow-sm mr-3">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="text-lg font-medium flex items-center">
                    PlainID LangChain Authorizer
                    <BetaTag />
                  </p>
                  <p className="text-gray-400 text-sm">Enterprise Authorization for LangChain and AI Applications</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-sm px-4 py-2 bg-teal-500/20 rounded-lg font-medium hover:bg-teal-500/30 transition-colors cursor-pointer">
                Policy-Based Access Control
              </div>
              <div className="text-sm px-4 py-2 bg-teal-500/20 rounded-lg font-medium hover:bg-teal-500/30 transition-colors cursor-pointer">
                AI Security
              </div>
              <div className="text-sm px-4 py-2 bg-teal-500/20 rounded-lg font-medium hover:bg-teal-500/30 transition-colors cursor-pointer">
                Authorization Controls
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700/50 text-center">
            <p className="text-sm text-gray-400">
              Made by the{' '}
              <a 
                href="mailto:presales@plainid.com"
                className="text-gray-400 hover:text-teal-400 transition-colors duration-200 underline-offset-2 hover:underline cursor-pointer"
              >
                SE Team
              </a>
              {' '}• Updated with LangChain Authorizer Integration
            </p>
          </div>
        </div>
      </footer>
      
      {/* CTA Modal */}
      <CTAModal />
    </div>
  );
}
