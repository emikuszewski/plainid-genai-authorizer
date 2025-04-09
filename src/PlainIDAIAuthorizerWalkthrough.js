import React, { useState, useEffect } from 'react';
import { Shield, Check, AlertTriangle, Lock, Unlock, Server, Database, User, Bot, FileText, Filter, Eye, EyeOff, ArrowRight, ChevronRight } from 'lucide-react';

export default function PlainIDAIAuthorizerWalkthrough() {
  // Demo state
  const [userRole, setUserRole] = useState('executive');
  const [queryIndex, setQueryIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  
  // Animation helper and scroll handler
  useEffect(() => {
    setAnimateIn(true);
    
    // Add scroll behavior when walkthrough starts or steps change
    if (currentStep === 1) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        const pipelineElement = document.getElementById('pipeline-visualization');
        if (pipelineElement) {
          // Calculate a position that shows more of the pipeline output
          const rect = pipelineElement.getBoundingClientRect();
          const pipelineTop = window.pageYOffset + rect.top;
          
          // Scroll to show pipeline steps and some content below
          const scrollTarget = pipelineTop - 80;
          
          window.scrollTo({
            top: scrollTarget,
            behavior: 'smooth'
          });
        } else {
          // Increase fallback scroll position to show more content
          window.scrollTo({
            top: 950,
            behavior: 'smooth'
          });
        }
      }, 300);
    }
    
    return () => setAnimateIn(false);
  }, [currentStep]);

  // Sample messages and data categories with role-based access
  const sampleQueries = [
    'What were our Q4 financial results?',
    'Summarize our customer satisfaction trends',
    'Show me details of our 5-year strategic plan',
    'List employees with performance concerns',
    'Explain the technical specs of our new product'
  ];
  
  const dataCategories = {
    0: { executive: true, manager: true, employee: false },     // financial
    1: { executive: true, manager: true, employee: true },      // customerData
    2: { executive: true, manager: false, employee: false },    // strategicPlans
    3: { executive: true, manager: true, employee: false },     // employeeRecords
    4: { executive: true, manager: true, employee: true }       // productSpecs
  };
  
  // Pipeline steps
  const pipelineSteps = [
    { name: "Start", icon: User, description: "Select a role and message, then click 'Send Message'" },
    { name: "Message", icon: User, description: "User submits a question to the AI system" },
    { name: "Authorize", icon: Shield, description: "System checks if user is authorized to ask this specific question" },
    { name: "Retrieve", icon: Database, description: "System retrieves only documents the user is authorized to access" },
    { name: "Filter", icon: Filter, description: "System applies content filters based on user permissions" },
    { name: "Generate", icon: Bot, description: "System generates response with only authorized information" },
    { name: "Complete", icon: Check, description: "The secure RAG pipeline process is complete" }
  ];
  
  // Check if access is authorized for current query and role
  const isAuthorized = () => {
    return dataCategories[queryIndex][userRole];
  };
  
  // Simple reset without starting pipeline
  const resetWalkthrough = () => {
    setCurrentStep(0);
    setIsProcessing(false);
  };
  
  // Start pipeline animation
  const startPipeline = () => {
    setCurrentStep(1);
    setIsProcessing(true);
    
    // Auto-progress through steps
    setTimeout(() => setCurrentStep(2), 3000);
    setTimeout(() => setCurrentStep(3), 6000);
    setTimeout(() => setCurrentStep(4), 9000);
    setTimeout(() => setCurrentStep(5), 12000);
    setTimeout(() => setCurrentStep(6), 15000);
    setTimeout(() => setIsProcessing(false), 15000);
  };
  
  // Get the appropriate result based on authorization status
  const getResult = () => {
    if (!isAuthorized()) {
      return {
        authorized: false,
        response: "Access Denied: You don't have permission to access this information based on your current role.",
        maskedContent: "████████████████████████████████████████\n████████████████████████\n██████████████",
        retrievedDocs: []
      };
    }
    
    const responses = [
      {
        authorized: true,
        response: "Q4 financial results showed a 12% increase in revenue and 8% growth in profit margins compared to Q3. EBITDA improved by 15%, with particularly strong performance in our enterprise segment.",
        retrievedDocs: ["Q4 Financial Report", "Executive Dashboard", "Annual Financial Summary"]
      },
      {
        authorized: true,
        response: "Customer satisfaction increased 4.2 points to an all-time high of 92%. Key improvements were in product reliability (+5.8) and customer support responsiveness (+6.2).",
        retrievedDocs: ["Customer Feedback Database", "Quarterly NPS Report", "Support Ticket Analytics"]
      },
      {
        authorized: true,
        response: "Our 5-year strategic plan focuses on three pillars: market expansion into APAC region, product diversification with AI-powered solutions, and vertical integration through strategic acquisitions.",
        retrievedDocs: ["Strategic Plan 2025-2030", "Board Meeting Minutes", "Market Analysis Report"]
      },
      {
        authorized: true,
        response: "7 employees have performance ratings below expectations for 2+ consecutive quarters. Primary concerns include missed deadlines (4), quality issues (2), and communication problems (1).",
        retrievedDocs: ["HR Performance Database", "Manager Evaluations", "Improvement Plan Tracking"]
      },
      {
        authorized: true,
        response: "The new product features quantum-resistant encryption, real-time policy enforcement, and AI-powered threat detection with <0.001% false positive rate. Cloud deployment options include AWS, Azure, and GCP.",
        retrievedDocs: ["Product Specification Document", "Engineering Wiki", "Release Notes"]
      }
    ];
    
    return responses[queryIndex];
  };

  // Get current result
  const result = getResult();
  
  // Background pattern for dot grid
  const DotGridPattern = ({ className = "" }) => {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div className="absolute inset-0 opacity-15">
          {Array.from({ length: 20 }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="flex justify-around">
              {Array.from({ length: 30 }).map((_, colIndex) => (
                <div 
                  key={`dot-${rowIndex}-${colIndex}`} 
                  className="w-1 h-1 rounded-full bg-current m-3"
                  style={{
                    opacity: colIndex % 2 === 0 ? 0.8 : 0.4,
                    transform: `scale(${rowIndex % 5 === 0 ? 2 : 1})`
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  // Button component for consistent styling
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
        {/* Subtle ripple effect */}
        <span className="absolute w-0 h-0 rounded-full bg-white opacity-10 transform -translate-x-1/2 -translate-y-1/2 group-hover:animate-ripple pointer-events-none"></span>
        
        {/* Button content */}
        <div className="flex items-center justify-center relative z-10">
          {icon && <span className="mr-2 transform group-hover:scale-110 transition-transform duration-300">{icon}</span>}
          <span className="transform transition-all duration-300">{children}</span>
        </div>
      </button>
    );
  };
  
  // Card component for consistent styling
  const Card = ({ children, className = "", ...props }) => {
    return (
      <div 
        className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-icy-gray via-white to-icy-gray font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-2.5 rounded-lg shadow-sm">
              <Shield size={24} />
            </div>
            <h1 className="ml-3 text-xl font-medium text-deep-teal tracking-tight flex items-center">
              PlainID GenAI Authorizer Prototype 
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 uppercase font-bold">
                Beta
              </span>
            </h1>
          </div>
          <div className="flex space-x-4">
            <Button 
              secondary
              onClick={() => setShowComparison(!showComparison)}
              icon={<ArrowRight size={18} />}
            >
              {showComparison ? "Show Pipeline View" : "Compare Side-by-Side"}
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-8">
        {/* Introduction */}
        <Card className="mb-8 p-8 relative overflow-hidden backdrop-blur-sm bg-white/95">
          <DotGridPattern className="text-teal-500" />
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-center relative z-10">
            <div className="md:w-2/3 flex-shrink-0">
              <div className="bg-gradient-to-br from-misty-teal to-white p-6 rounded-xl border border-teal-100 shadow-sm">
                <div className="flex items-center justify-center mb-5">
                  <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                    <Shield size={32} className="text-white" />
                  </div>
                </div>
                <h3 className="text-center text-deep-teal font-medium text-xl mb-3">Secure Your GenAI with Dynamic Authorization</h3>
                <p className="text-center text-deep-teal/80">Protection for sensitive information across your AI workflows</p>
              </div>
            </div>
          </div>
          
          {/* Configuration Section - Updated to stack vertically */}
          <div className="mt-10 pt-7 border-t border-gray-100 relative z-10">
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="text-deep-teal font-medium mb-4 text-sm uppercase tracking-wider">Select User Role</h4>
                <div className="flex flex-wrap gap-3">
                  {['executive', 'manager', 'employee'].map((role) => (
                    <button
                      key={role}
                      onClick={() => {
                        setUserRole(role);
                        resetWalkthrough();
                      }}
                      className={`px-5 py-2.5 rounded-lg capitalize transition-all duration-300 relative overflow-hidden ${
                        userRole === role 
                          ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-sm hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]' 
                          : 'bg-white border border-gray-200 text-slate-700 hover:border-teal-400 hover:bg-misty-teal/20 hover:text-teal-600 hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]'
                      }`}
                      disabled={isProcessing}
                    >
                      <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></span>
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-deep-teal font-medium mb-4 text-sm uppercase tracking-wider">Enter a Prompt for the AI</h4>
                <div className="flex flex-wrap gap-2">
                  {sampleQueries.map((message, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQueryIndex(index);
                        resetWalkthrough();
                      }}
                      className={`px-5 py-2.5 rounded-full text-sm transition-all duration-300 relative overflow-hidden ${
                        queryIndex === index 
                          ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-sm hover:shadow-md hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]' 
                          : 'bg-white border border-gray-200 text-slate-700 hover:border-teal-400 hover:bg-misty-teal/20 hover:text-teal-600 hover:shadow-sm hover:scale-[1.01] active:scale-[0.99]'
                      }`}
                      disabled={isProcessing}
                    >
                      <span className="absolute inset-0 w-full h-full bg-white/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></span>
                      {message.length > 30 ? message.substring(0, 30) + '...' : message}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
        
        {showComparison ? (
          // Side-by-Side Comparison View
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* With PlainID */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <div className="rounded-full bg-misty-teal p-2">
                  <Shield className="text-teal-500" size={24} />
                </div>
                <h3 className="text-xl font-medium ml-3 text-deep-teal flex items-center">
                  With PlainID GenAI Authorizer Prototype
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 uppercase font-bold">
                    Beta
                  </span>
                </h3>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-slate-700 mb-2">Message Request</h4>
                <div className="bg-icy-gray p-4 rounded-lg border border-gray-100">
                  <p className="text-deep-teal">{sampleQueries[queryIndex]}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-slate-700 mb-2">Authorization Check</h4>
                <div className="flex items-center">
                  {isAuthorized() ? (
                    <div className="flex items-center bg-misty-teal text-deep-teal px-3 py-2 rounded-lg border border-teal-100">
                      <Check className="text-teal-500 mr-2" size={18} />
                      <span className="font-medium">Access Granted</span>
                    </div>
                  ) : (
                    <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-2 rounded-lg border border-yellow-200">
                      <AlertTriangle className="text-yellow-500 mr-2" size={18} />
                      <span className="font-medium">Access Restricted</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-2">AI Response</h4>
                <div className="bg-icy-gray p-4 rounded-lg border border-gray-100">
                  <p className="text-deep-teal">{result.response}</p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button 
                  secondary
                  onClick={() => setShowComparison(false)}
                >
                  Show Pipeline View
                </Button>
              </div>
            </Card>
            
            {/* Without PlainID */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <div className="rounded-full bg-red-50 p-2">
                  <AlertTriangle className="text-red-500" size={24} />
                </div>
                <h3 className="text-xl font-medium ml-3 text-deep-teal">Without Access Control</h3>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-slate-700 mb-2">Message Request</h4>
                <div className="bg-icy-gray p-4 rounded-lg border border-gray-100">
                  <p className="text-deep-teal">{sampleQueries[queryIndex]}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium text-slate-700 mb-2">Authorization Check</h4>
                <div className="flex items-center bg-red-50 text-red-700 px-3 py-2 rounded-lg border border-red-100">
                  <Unlock className="text-red-500 mr-2" size={18} />
                  <span className="font-medium">No Access Control</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-2">AI Response</h4>
                <div className="bg-icy-gray p-4 rounded-lg border border-gray-100">
                  <p className={!isAuthorized() ? "text-red-600" : "text-deep-teal"}>
                    {!isAuthorized() 
                      ? "Q4 financial results showed a 12% increase in revenue and 8% growth in profit margins. EBITDA improved by 15% with strong performance in enterprise segment." 
                      : result.response}
                  </p>
                  {!isAuthorized() && (
                    <div className="mt-3 p-2.5 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700 text-sm flex items-center">
                        <AlertTriangle size={16} className="mr-2 flex-shrink-0" />
                        <span>Security Risk: Unauthorized access to sensitive financial data</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        ) : (
          // Pipeline View
          <div>
            {/* Walkthrough controls */}
            <Card className="p-6 mb-8 bg-white/95 backdrop-blur-sm">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
                <div className="mb-4 sm:mb-0">
                  <h4 className="text-deep-teal font-medium mb-1">AI Chat</h4>
                  <p className="text-slate-500 text-sm">See how authorization controls secure AI content retrieval</p>
                </div>
                <div className="flex space-x-3">
                  {currentStep === 0 && (
                    <Button 
                      primary
                      onClick={() => {
                        startPipeline();
                      }}
                      icon={<ArrowRight size={18} />}
                      className="px-6"
                    >
                      Send Message
                    </Button>
                  )}
                  {currentStep > 0 && currentStep < 6 && (
                    <Button
                      primary
                      onClick={() => setCurrentStep(currentStep + 1)}
                      disabled={isProcessing}
                      icon={<ChevronRight size={18} />}
                    >
                      Skip to Next
                    </Button>
                  )}
                  {currentStep === 6 && (
                    <Button 
                      primary
                      icon={<ArrowRight size={18} />}
                      onClick={() => {
                        resetWalkthrough();
                        startPipeline();
                      }}
                    >
                      Send Another Message
                    </Button>
                  )}
                  
                  {currentStep > 0 && (
                    <Button 
                      secondary
                      onClick={resetWalkthrough}
                      disabled={isProcessing && currentStep < 6}
                    >
                      {isProcessing ? "Processing..." : "Reset"}
                    </Button>
                  )}
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-misty-teal to-white p-5 rounded-xl border border-teal-100 shadow-inner">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-teal-100 shadow-sm">
                    <p className="text-deep-teal font-medium mb-2 text-sm">Current Message:</p>
                    <div className="flex items-center">
                      <User size={16} className="text-teal-500 mr-2 flex-shrink-0" />
                      <p className="text-deep-teal py-2 px-3 bg-white rounded-lg border border-teal-50 font-medium text-sm flex-grow">
                        "{sampleQueries[queryIndex]}"
                      </p>
                    </div>
                  </div>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-teal-100 shadow-sm">
                    <p className="text-deep-teal font-medium mb-2 text-sm">User Role:</p>
                    <div className="flex items-center">
                      <User size={16} className="text-teal-500 mr-2 flex-shrink-0" />
                      <div className="flex items-center py-2 px-3 bg-white rounded-lg border border-teal-50 w-full">
                        <span className="text-deep-teal font-medium capitalize text-sm">{userRole}</span>
                        <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800">
                          {userRole === 'executive' ? 'Full access' : userRole === 'manager' ? 'Limited access' : 'Basic access'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Pipeline Visualization - ENHANCED DESIGN */}
            <Card id="pipeline-visualization" className="p-6 mb-8 relative overflow-visible border-t-4 border-teal-500 bg-white/95 backdrop-blur-sm">
              <DotGridPattern className="text-teal-500" />
              
              {/* Pipeline Steps */}
              <div className="relative mb-12 z-10">
                {/* Container for steps with relative positioning */}
                <div className="relative">
                  {/* Background track - positioned relative to container */}
                  <div className="absolute h-2 bg-cloudy-gray/30 left-9 right-9 top-5 rounded-full"></div>
                  
                  {/* Progress indicator - dynamically sized */}
                  <div 
                    className={`absolute h-2 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-500 ease-out`}
                    style={{
                      top: '1.25rem', // 5px in rem
                      left: '2.25rem', // 9px in rem
                      width: currentStep === 0 ? '0' : 
                             currentStep === 6 ? 'calc(100% - 4.5rem)' : // 18px in rem  
                             `calc(${(currentStep / 6) * 100}% - ${18 * (1 - currentStep/6)}px)`
                    }}
                  ></div>
                  
                  {/* Step indicators */}
                  <div className="flex justify-between mt-4 mb-8">
                    {[0, 1, 2, 3, 4, 5, 6].map((step) => (
                      <div key={step} className={`flex flex-col items-center transition-all duration-500 ${
                        currentStep === step ? 'scale-110' : ''
                      }`}>
                        <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 z-10 transition-all duration-300 transform hover:scale-110 ${
                          currentStep === step 
                            ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white border-transparent shadow-md' 
                            : currentStep > step 
                            ? 'bg-teal-500 bg-opacity-80 text-white border-transparent hover:shadow-md' 
                            : 'bg-white text-slate-400 border-gray-200 hover:border-teal-300 hover:text-teal-400'
                        }`}
                        >
                          <span className="font-medium">{step}</span>
                        </div>
                        <span className={`text-xs font-medium mt-2 transition-colors duration-300 ${
                          currentStep === step 
                            ? 'text-teal-500' 
                            : currentStep > step 
                            ? 'text-teal-600' 
                            : 'text-slate-400'
                        }`}>
                          {pipelineSteps[step].name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Current Step Description */}
              <div className="bg-gradient-to-r from-misty-teal to-white p-5 rounded-xl border-l-4 border-teal-500 shadow-sm mb-8 relative z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-deep-teal font-medium mb-1">Current Step:</p>
                    <p className="text-deep-teal/80">{pipelineSteps[currentStep].description}</p>
                  </div>
                  
                  {isProcessing && currentStep < 6 && (
                    <div className="flex items-center bg-white/80 px-3 py-1.5 rounded-full border border-teal-100 shadow-sm animate-subtle-pulse overflow-hidden relative">
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-teal-50 via-white to-teal-50 animate-shimmer opacity-70"></div>
                      
                      {/* Border glow */}
                      <div className="absolute inset-0 bg-teal-200 filter blur-md opacity-20 animate-subtle-glow"></div>
                      
                      {/* Content */}
                      <div className="flex space-x-1 mr-2 relative z-10">
                        <span className="w-2 h-2 bg-teal-500 rounded-full animate-dot-bounce"></span>
                        <span className="w-2 h-2 bg-teal-500 rounded-full animate-dot-bounce animation-delay-400"></span>
                      </div>
                      <span className="text-deep-teal text-sm font-medium relative z-10">AI thinking</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Step Content - ENHANCED DESIGN WITH ANIMATIONS */}
              {currentStep >= 1 && (
                <div className={`min-h-[320px] flex items-start justify-center transition-all duration-500 relative z-10 ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {/* Active step container with animation */}
                  <div key={currentStep} className="w-full">
                    {/* STEP 1 */}
                    {currentStep === 1 && (
                      <div className="bg-gradient-to-r from-misty-teal to-white p-6 rounded-xl border border-teal-100 flex flex-col md:flex-row shadow-sm">
                        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 rounded-xl mb-4 md:mb-0 md:mr-5 flex-shrink-0 self-start">
                          <User size={28} />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-deep-teal mb-3">Message Submission</h4>
                          <p className="text-deep-teal text-lg mb-4 bg-white/70 p-3 rounded-lg border border-teal-50 shadow-sm">
                            User asks: <span className="font-medium">"{sampleQueries[queryIndex]}"</span>
                          </p>
                          <div className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-teal-100 shadow-sm">
                            <p className="text-deep-teal/80">
                              The RAG pipeline begins with a natural language message that will be processed through
                              PlainID's authorization controls to ensure proper data access governance.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* STEP 2 */}
                    {currentStep === 2 && (
                      <div className={`p-6 rounded-xl border flex flex-col md:flex-row ${
                        isAuthorized() 
                          ? 'bg-gradient-to-r from-misty-teal to-white border-green-200' 
                          : 'bg-yellow-50 border-yellow-200'
                      }`}>
                        <div className={`p-3 rounded-xl mb-4 md:mb-0 md:mr-5 flex-shrink-0 self-start text-white ${
                          isAuthorized() 
                            ? 'bg-gradient-to-r from-green-500 to-teal-500'
                            : 'bg-gradient-to-r from-yellow-500 to-amber-500'
                        }`}>
                          {isAuthorized() ? <Shield size={28} /> : <Lock size={28} />}
                        </div>
                        <div>
                          <h4 className="text-lg font-medium mb-2 flex items-center">
                            {isAuthorized() ? (
                              <span className="text-green-800">Access Granted</span>
                            ) : (
                              <span className="text-yellow-800">Access Restricted</span>
                            )}
                          </h4>
                          <p className={`text-lg mb-3 ${isAuthorized() ? "text-green-700" : "text-yellow-700"}`}>
                            {isAuthorized() 
                              ? `The ${userRole} role is authorized to access this information` 
                              : `The ${userRole} role does not have permission to access this information`}
                          </p>
                          <p className={`bg-white p-3 rounded-lg border ${
                            isAuthorized() ? "text-green-700 border-green-100" : "text-yellow-700 border-yellow-100"
                          }`}>
                            PlainID's dynamic authorization engine verifies permissions based on user role,
                            context, and data sensitivity before allowing the query to proceed.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* STEP 3 */}
                    {currentStep === 3 && (
                      <div className="bg-gradient-to-r from-misty-teal to-white p-6 rounded-xl border border-teal-100 flex flex-col md:flex-row">
                        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-3 rounded-xl mb-4 md:mb-0 md:mr-5 flex-shrink-0 self-start">
                          <Database size={28} />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-deep-teal mb-2">Document Retrieval</h4>
                          {isAuthorized() ? (
                            <div>
                              <p className="text-deep-teal mb-3">Documents retrieved from secure data sources:</p>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                                {result.retrievedDocs?.map((doc, index) => (
                                  <div key={index} className="bg-white p-3 rounded-lg border border-teal-100 flex items-center shadow-sm">
                                    <FileText size={18} className="text-teal-500 mr-2 flex-shrink-0" />
                                    <span className="text-deep-teal font-medium">{doc}</span>
                                  </div>
                                ))}
                              </div>
                              <p className="text-deep-teal bg-white p-3 rounded-lg border border-teal-100">
                                Only documents the user is authorized to access are retrieved, ensuring sensitive
                                information remains protected throughout the process.
                              </p>
                            </div>
                          ) : (
                            <div>
                              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center mb-3">
                                <AlertTriangle size={20} className="text-yellow-500 mr-3 flex-shrink-0" />
                                <p className="text-yellow-700">No documents retrieved due to access restrictions</p>
                              </div>
                              <p className="text-deep-teal bg-white p-3 rounded-lg border border-teal-100">
                                PlainID's authorization controls prevent retrieval of restricted documents,
                                protecting sensitive information from unauthorized access.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* STEP 4 */}
                    {currentStep === 4 && (
                      <div className="bg-gradient-to-r from-misty-teal to-white p-6 rounded-xl border border-teal-100 flex flex-col md:flex-row">
                        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-3 rounded-xl mb-4 md:mb-0 md:mr-5 flex-shrink-0 self-start">
                          <Filter size={28} />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-deep-teal mb-2">Content Filtering</h4>
                          {isAuthorized() ? (
                            <div>
                              <div className="flex items-center bg-green-50 border border-green-100 rounded-lg p-4 mb-3">
                                <Check size={20} className="text-green-600 mr-3 flex-shrink-0" />
                                <p className="text-green-700 font-medium">Content permitted for view by {userRole} role</p>
                              </div>
                              <p className="text-deep-teal bg-white p-3 rounded-lg border border-teal-100">
                                All content retrieved is appropriate for the user's authorization level.
                                The document content passes through PlainID's content filtering controls.
                              </p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-yellow-700 mb-3 font-medium">Content redacted for {userRole} role:</p>
                              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg font-mono mb-3">
                                {result.maskedContent}
                              </div>
                              <p className="text-deep-teal bg-white p-3 rounded-lg border border-teal-100">
                                Sensitive content is automatically redacted based on the user's permissions,
                                preventing unauthorized information disclosure.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* STEP 5 */}
                    {currentStep === 5 && (
                      <div className="bg-gradient-to-r from-misty-teal to-white p-6 rounded-xl border border-teal-100 flex flex-col md:flex-row">
                        <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-3 rounded-xl mb-4 md:mb-0 md:mr-5 flex-shrink-0 self-start">
                          <Bot size={28} />
                        </div>
                        <div>
                          <h4 className="text-lg font-medium text-deep-teal mb-2">Response Generation</h4>
                          <div className={`flex items-center p-4 rounded-lg mb-3 ${
                            isAuthorized() 
                              ? 'bg-green-50 border border-green-100' 
                              : 'bg-yellow-50 border border-yellow-200'
                          }`}>
                            {isAuthorized() ? (
                              <Check size={20} className="text-green-600 mr-3 flex-shrink-0" />
                            ) : (
                              <AlertTriangle size={20} className="text-yellow-500 mr-3 flex-shrink-0" />
                            )}
                            <p className={isAuthorized() ? "text-green-700" : "text-yellow-700"}>
                              {isAuthorized() 
                                ? "Generating response with authorized information" 
                                : "Generating access denied response"}
                            </p>
                          </div>
                          <p className="text-deep-teal bg-white p-3 rounded-lg border border-teal-100">
                            The AI model only uses authorized information to generate the response,
                            ensuring compliance with access control policies while providing relevant answers.
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {/* STEP 6 */}
                    {currentStep === 6 && (
                      <div className="bg-gradient-to-r from-misty-teal to-white p-6 rounded-xl border border-teal-100 flex flex-col shadow-sm">
                        <div className="flex mb-4">
                          <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-3 rounded-xl mr-4 flex-shrink-0 self-start">
                            <Check size={28} />
                          </div>
                          <div>
                            <h4 className="text-lg font-medium text-deep-teal mb-2">Final Response</h4>
                            <p className="text-deep-teal/80">
                              Secure, policy-compliant response generated for {userRole} role:
                            </p>
                          </div>
                        </div>
                        
                        <div className={`bg-white/90 backdrop-blur-sm p-5 rounded-xl border ${!isAuthorized() ? 'border-red-500 bg-red-50/50' : 'border-teal-200'} shadow-sm mb-4`}>
                          <p className={`${!isAuthorized() ? 'text-red-700 font-medium' : 'text-deep-teal'}`}>{result.response}</p>
                        </div>
                        
                        <div className="bg-gradient-to-r from-misty-teal to-white p-4 rounded-xl flex items-start border border-teal-100">
                          <Shield size={22} className="text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-deep-teal font-medium">PlainID GenAI Authorizer Prototype <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 uppercase font-bold">Beta</span></p>
                            <p className="text-deep-teal/80">
                              {isAuthorized() 
                                ? "Response generated with appropriate access controls. All information is authorized for your role."
                                : "Access control policies have prevented unauthorized access to sensitive information based on your role."}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-6 text-center">
                          <Button 
                            primary
                            icon={<ArrowRight size={18} />}
                            onClick={() => {
                              resetWalkthrough();
                              startPipeline();
                            }}
                          >
                            Send Another Message
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-deep-teal to-slate text-white py-10 mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-3">
                <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-2 rounded-lg shadow-sm">
                  <Shield size={18} />
                </div>
                <p className="ml-2 text-lg font-medium flex items-center">
                  PlainID GenAI Authorizer Prototype
                  <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-teal-100 text-white bg-opacity-20 uppercase font-bold">
                    Beta
                  </span>
                </p>
              </div>
              <p className="text-gray-300 text-sm">Securing GenAI Applications with Dynamic Authorization</p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <div className="text-sm px-4 py-2 bg-teal-500 bg-opacity-20 rounded-lg font-medium hover:bg-opacity-30 transition-colors cursor-pointer transform hover:scale-105 transition-transform duration-300 hover:shadow-sm">Policy-Based Access</div>
              <div className="text-sm px-4 py-2 bg-teal-500 bg-opacity-20 rounded-lg font-medium hover:bg-opacity-30 transition-colors cursor-pointer transform hover:scale-105 transition-transform duration-300 hover:shadow-sm">LLM Security</div>
              <div className="text-sm px-4 py-2 bg-teal-500 bg-opacity-20 rounded-lg font-medium hover:bg-opacity-30 transition-colors cursor-pointer transform hover:scale-105 transition-transform duration-300 hover:shadow-sm">Authorization Controls</div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-700/50 text-center">
            <p className="text-sm text-gray-400">Made by the SE Team for Walkthrough Purposes Only</p>
          </div>
        </div>
      </footer>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
        
        :root {
          --plainid-teal: #00A7B5;
          --deep-teal: #002A3A;
          --white: #FFFFFF;
          --misty-teal: #D1E4E5;
          --icy-gray: #EEF1F4;
          --cloudy-gray: #BFCED6;
          --slate: #515A6C;
          --neon-green: #BAF967;
        }
        
        body {
          font-family: 'Roboto', sans-serif;
          letter-spacing: 0.01em;
        }
        
        /* Button ripple animation */
        @keyframes ripple {
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes subtle-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        
        @keyframes subtle-glow {
          0% { opacity: 0.1; }
          50% { opacity: 0.2; }
          100% { opacity: 0.1; }
        }
        
        @keyframes dot-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        .animate-ripple {
          animation: ripple 1s linear;
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
          background-size: 200% 100%;
        }
        
        .animate-subtle-pulse {
          animation: subtle-pulse 2s ease-in-out infinite;
        }
        
        .animate-subtle-glow {
          animation: subtle-glow 2s ease-in-out infinite;
        }
        
        .animate-dot-bounce {
          animation: dot-bounce 1s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        /* Focus styles for accessibility */
        button:focus-visible, 
        [role="button"]:focus-visible {
          outline: 2px solid var(--plainid-teal);
          outline-offset: 2px;
          box-shadow: 0 0 0 4px rgba(0, 167, 181, 0.2);
        }
        
        .bg-teal-500, .from-teal-500 {
          background-color: var(--plainid-teal);
        }
        .text-teal-500 {
          color: var(--plainid-teal);
        }
        .border-teal-500 {
          border-color: var(--plainid-teal);
        }
        .bg-deep-teal, .from-deep-teal {
          background-color: var(--deep-teal);
        }
        .text-deep-teal {
          color: var(--deep-teal);
        }
        .bg-misty-teal, .from-misty-teal {
          background-color: var(--misty-teal);
        }
        .border-misty-teal {
          border-color: var(--misty-teal);
        }
        .bg-icy-gray, .from-icy-gray {
          background-color: var(--icy-gray);
        }
        .bg-cloudy-gray {
          background-color: var(--cloudy-gray);
        }
        .bg-slate, .from-slate {
          background-color: var(--slate);
        }
        .text-slate {
          color: var(--slate);
        }
      `}</style>
    </div>
  );h-2 bg-teal-500 rounded-full animate-dot-bounce animation-delay-200"></span>
                        <span className="w-2
