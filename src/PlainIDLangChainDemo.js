import React, { useState, useEffect } from 'react';
import { Shield, Send, User, Filter, Database, Eye, Check, AlertTriangle, Lock, ChevronRight, Calendar, Download, MapPin, Users, Layers, Menu, Plus, MessageSquare, ArrowRight, Unlock, Paperclip, Camera, X, FileText, Image as ImageIcon, FileSpreadsheet, File } from 'lucide-react';

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
  const messagesEndRef = React.useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

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

  // Get unsecured response - always returns full data regardless of permissions
  const getUnsecuredResponse = () => {
    const unsecuredResponses = [
      "Q4 financial results: Revenue $2.3M (+12% QoQ), Profit margin 23.4% (+2.1%), EBITDA $540K (+15%). Strong performance in enterprise segment with $890K ARR.",
      "EU customer satisfaction: 87.3% (+4.2 pts), NPS score 52 (+8), retention rate 94.1%. Top satisfaction drivers: product reliability (8.9/10), support quality (8.7/10).",
      "Engineering dept: 3 employees below expectations (2 missed deadlines, 1 communication). Performance improvement plans active. Retention risk: medium for 2 individuals.",
      "Security architecture uses zero-trust model, quantum-resistant encryption (AES-256), real-time threat detection with <0.001% false positive rate. Multi-cloud deployment: AWS, Azure, GCP.",
      "Senior Engineer salary range: €75K-€110K (median €89K). Total comp with equity: €95K-€140K. Market positioning: 75th percentile for EU tech."
    ];
    
    return unsecuredResponses[queryIndex];
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
    setAttachedFiles([]); // Clear files after sending
    setCurrentGuardrail(1);
    setIsProcessing(true);

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
        timestamp: new Date()
      }]);
      setIsProcessing(false);
      setCurrentGuardrail(0);
      
      // Show CTA modal
      setTimeout(() => setShowCTAModal(true), 2000);
    }, 8000);
  };

  const selectQuery = (index) => {
    setQueryIndex(index);
    setInputText(sampleQueries[index].text);
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
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-gray-900 text-white flex flex-col overflow-hidden`}>
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
            }}
            className="w-full flex items-center justify-center px-3 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
          >
            <Plus size={16} className="mr-2" />
            <span className="text-sm font-medium">New Demo</span>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto p-3">
          <div className="text-xs text-gray-400 mb-2 px-3">Available Prompts</div>
          <div className="space-y-1">
            {sampleQueries.map((query, i) => (
              <button
                key={i}
                onClick={() => selectQuery(i)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  queryIndex === i ? 'bg-teal-500 text-white' : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                {query.text}
              </button>
            ))}
          </div>
        </div>
        
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
                          LLM classifies prompt as '{classification.category}'
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
                      <p>1. <strong>Select your role</strong> from the sidebar (Executive, Manager, or Employee)</p>
                      <p>2. <strong>Choose a query</strong> from the sidebar or type your own</p>
                      <p>3. <strong>Send the message</strong> to see the three-layer authorization process in action</p>
                      <p>4. <strong>Watch</strong> as each guardrail protects your data based on your role and permissions</p>
                    </div>
                  </div>

                  {/* Current Configuration */}
                  <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl border border-teal-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Configuration</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/80 rounded-lg p-4">
                        <div className="text-sm font-medium text-gray-700 mb-2">Selected Query</div>
                        <div className="text-sm text-gray-900">{sampleQueries[queryIndex].text}</div>
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
                                      <span className="font-medium">{msg.classification.category}</span>
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
                                        ? `${currentRole.name} can access ${msg.classification.category} data`
                                        : `${currentRole.name} cannot access ${msg.classification.category} data`
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
