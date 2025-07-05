import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../common/SafeIcon';

const { 
  FiBot, FiZap, FiEye, FiFileText, FiActivity, FiTarget,
  FiMessageCircle, FiSend, FiMic, FiCamera, FiImage, FiUpload,
  FiTrendingUp, FiHeart, FiAlertCircle, FiCheckCircle, FiClock,
  FiStar, FiDatabase, FiSettings, FiDownload, FiShare2, FiFilter
} = FiIcons;

function AIAssistant() {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDiagnosis, setSelectedDiagnosis] = useState(null);

  const aiFeatures = [
    {
      id: 'chat',
      title: 'AI Chat Assistant',
      description: 'Get instant answers to clinical questions',
      icon: FiMessageCircle,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'diagnosis',
      title: 'Diagnostic Support',
      description: 'AI-powered diagnosis assistance',
      icon: FiEye,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'analysis',
      title: 'Image Analysis',
      description: 'Analyze X-rays and clinical images',
      icon: FiImage,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'predictions',
      title: 'Predictive Analytics',
      description: 'Forecast treatment outcomes',
      icon: FiTrendingUp,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const initialMessages = [
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI dental assistant. I can help you with diagnosis, treatment planning, and clinical questions. How can I assist you today?",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      suggestions: [
        'Analyze patient X-ray',
        'Treatment recommendations',
        'Drug interactions',
        'Billing codes lookup'
      ]
    }
  ];

  const diagnosticSuggestions = [
    {
      id: 1,
      condition: 'Dental Caries',
      confidence: 95,
      description: 'Multiple cavities detected in posterior teeth',
      recommendations: [
        'Composite filling restoration',
        'Fluoride treatment',
        'Dietary counseling'
      ],
      urgency: 'moderate'
    },
    {
      id: 2,
      condition: 'Periodontal Disease',
      confidence: 87,
      description: 'Early stage gingivitis with inflammation',
      recommendations: [
        'Deep cleaning (scaling & root planing)',
        'Antibiotic therapy',
        'Improved oral hygiene routine'
      ],
      urgency: 'low'
    },
    {
      id: 3,
      condition: 'Impacted Wisdom Tooth',
      confidence: 92,
      description: 'Lower left wisdom tooth showing signs of impaction',
      recommendations: [
        'Surgical extraction',
        'Pain management',
        'Post-operative care'
      ],
      urgency: 'high'
    }
  ];

  const recentAnalyses = [
    {
      id: 1,
      patient: 'John Doe',
      type: 'Panoramic X-ray',
      result: 'Normal findings',
      confidence: 98,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      patient: 'Jane Smith',
      type: 'Bitewing X-ray',
      result: 'Caries detected',
      confidence: 94,
      timestamp: '4 hours ago'
    },
    {
      id: 3,
      patient: 'Mike Johnson',
      type: 'Periapical X-ray',
      result: 'Root resorption',
      confidence: 89,
      timestamp: '6 hours ago'
    }
  ];

  const aiInsights = [
    {
      icon: FiTrendingUp,
      title: 'Patient Risk Analysis',
      description: 'High-risk patients identified for preventive care',
      value: '24 patients',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: FiHeart,
      title: 'Treatment Success Rate',
      description: 'AI-optimized treatment plans showing improved outcomes',
      value: '94.2%',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: FiZap,
      title: 'Efficiency Gain',
      description: 'Time saved through AI-assisted diagnostics',
      value: '3.2 hours/day',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: FiDatabase,
      title: 'Knowledge Base',
      description: 'Clinical cases analyzed and learned from',
      value: '15,847 cases',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        type: 'ai',
        content: generateAIResponse(inputMessage),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (input) => {
    const responses = [
      "Based on the symptoms you've described, I recommend a comprehensive oral examination. The clinical presentation suggests possible periodontal involvement.",
      "For optimal treatment outcomes, consider the patient's medical history and current medications. I've identified potential drug interactions that should be considered.",
      "The radiographic findings show interesting patterns. I recommend correlating with clinical symptoms for a complete diagnosis.",
      "Based on current research and clinical guidelines, here are the evidence-based treatment options I recommend..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'moderate': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-500 bg-gray-50';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'high': return FiAlertCircle;
      case 'moderate': return FiClock;
      case 'low': return FiCheckCircle;
      default: return FiClock;
    }
  };

  const renderChatInterface = () => (
    <div className="h-[600px] flex flex-col">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-lg ${
              message.type === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 text-gray-900'
            }`}>
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-2 opacity-70">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              {message.suggestions && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(suggestion)}
                      className="block w-full text-left p-2 text-xs bg-white bg-opacity-20 rounded hover:bg-opacity-30 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about dental care..."
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="absolute right-3 top-3 flex space-x-1">
              <button className="text-gray-400 hover:text-gray-600">
                <SafeIcon icon={FiMic} className="text-sm" />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <SafeIcon icon={FiUpload} className="text-sm" />
              </button>
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg transition-colors"
          >
            <SafeIcon icon={FiSend} />
          </button>
        </div>
      </div>
    </div>
  );

  const renderDiagnosticSupport = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Diagnostic Suggestions</h3>
        <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
          <SafeIcon icon={FiUpload} />
          <span className="text-sm">Upload Images</span>
        </button>
      </div>

      <div className="space-y-4">
        {diagnosticSuggestions.map((diagnosis) => (
          <motion.div
            key={diagnosis.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg border-l-4 cursor-pointer hover:shadow-lg transition-all ${getUrgencyColor(diagnosis.urgency)}`}
            onClick={() => setSelectedDiagnosis(diagnosis)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <SafeIcon icon={getUrgencyIcon(diagnosis.urgency)} className="text-lg" />
                  <h4 className="font-semibold text-gray-900">{diagnosis.condition}</h4>
                  <span className="text-sm text-gray-600">({diagnosis.confidence}% confidence)</span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{diagnosis.description}</p>
                <div className="space-y-1">
                  {diagnosis.recommendations.map((rec, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <span className="text-xs text-gray-600">{rec}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="ml-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiImage} className="text-gray-400 text-xl" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderImageAnalysis = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <SafeIcon icon={FiCamera} className="text-4xl text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Image Analysis</h3>
        <p className="text-gray-600 mb-4">Upload X-rays or clinical images for instant AI analysis</p>
        <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
          Upload Image
        </button>
      </div>

      <div>
        <h4 className="font-semibold text-gray-900 mb-4">Recent Analyses</h4>
        <div className="space-y-3">
          {recentAnalyses.map((analysis) => (
            <div key={analysis.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <SafeIcon icon={FiImage} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{analysis.patient}</p>
                  <p className="text-sm text-gray-600">{analysis.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{analysis.result}</p>
                <p className="text-xs text-gray-500">{analysis.confidence}% • {analysis.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPredictiveAnalytics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiInsights.map((insight, index) => (
          <motion.div
            key={insight.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${insight.color}`}>
                <SafeIcon icon={insight.icon} className="text-white text-xl" />
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{insight.value}</p>
              </div>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">{insight.title}</h4>
            <p className="text-sm text-gray-600">{insight.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
        <h4 className="font-semibold text-gray-900 mb-4">AI Recommendations</h4>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiZap} className="text-blue-500 mt-1" />
            <div>
              <p className="font-medium text-gray-900">Optimize Appointment Scheduling</p>
              <p className="text-sm text-gray-600">AI suggests rescheduling 3 appointments to reduce wait times by 25%</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiTarget} className="text-purple-500 mt-1" />
            <div>
              <p className="font-medium text-gray-900">Preventive Care Opportunities</p>
              <p className="text-sm text-gray-600">12 patients are due for preventive treatments based on their history</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <SafeIcon icon={FiActivity} className="text-green-500 mt-1" />
            <div>
              <p className="font-medium text-gray-900">Treatment Plan Optimization</p>
              <p className="text-sm text-gray-600">AI-enhanced treatment plans show 15% better success rates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'chat':
        return renderChatInterface();
      case 'diagnosis':
        return renderDiagnosticSupport();
      case 'analysis':
        return renderImageAnalysis();
      case 'predictions':
        return renderPredictiveAnalytics();
      default:
        return renderChatInterface();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Assistant</h1>
            <p className="text-gray-600">Advanced artificial intelligence for dental practice optimization</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">AI Online</span>
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
              <SafeIcon icon={FiSettings} className="mr-2" />
              Configure AI
            </button>
          </div>
        </div>

        {/* Feature Tabs */}
        <div className="flex space-x-2 mb-6">
          {aiFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setActiveTab(feature.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === feature.id
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <SafeIcon icon={feature.icon} />
              <span>{feature.title}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="p-6"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default AIAssistant;