import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  User, 
  Send, 
  Mic, 
  MicOff,
  Loader2,
  Sparkles,
  BookOpen,
  TrendingUp,
  Search,
  Copy,
  Check,
  RefreshCw,
  Settings,
  MessageSquare,
  Lightbulb,
  FileText,
  Scale,
  GraduationCap,
  AlertCircle
} from 'lucide-react';
import Navbar from '../components/Navbar';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: "Hello! I'm your AI News Assistant. I can help you with:\n\n📝 **Summarizing** - Get quick summaries of long articles\n🔍 **Analyzing** - Deep dive into breaking news stories\n💬 **Answering** - Ask me about current events\n⚖️ **Comparing** - Compare different articles on the same topic\n📰 **Briefings** - Generate personalized news briefings\n🎓 **Explaining** - Understand complex tech topics\n\nWhat would you like to explore today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickActions = [
    { id: 'summarize', icon: BookOpen, label: 'Summarize Article', prompt: 'Summarize the key points of this article:' },
    { id: 'analyze', icon: Sparkles, label: 'Analyze Topic', prompt: 'Provide an in-depth analysis of:' },
    { id: 'compare', icon: Scale, label: 'Compare Articles', prompt: 'Compare and contrast these articles:' },
    { id: 'explain', icon: GraduationCap, label: 'Explain Topic', prompt: 'Explain this topic in simple terms:' },
    { id: 'briefing', icon: FileText, label: 'Daily Briefing', prompt: 'Generate a personalized news briefing about:' },
    { id: 'trending', icon: TrendingUp, label: 'What\'s Trending', prompt: 'What are the trending topics in:' },
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Simulate AI response - in production this would call the backend
      const response = await generateAIResponse(userMessage.content);
      
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
        sources: [
          { title: 'Hacker News', url: '#' },
          { title: 'Dev.to', url: '#' },
        ]
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I apologize, but I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (prompt) => {
    // Simulated AI responses based on user intent
    // In production, this would call the backend AI API
    
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes('summarize') || lowerPrompt.includes('summary')) {
      return `## Article Summary

Based on the content, here are the key points:

1. **Main Finding**: The article discusses the latest developments in the tech industry, focusing on recent announcements and their potential impact.

2. **Key Insights**:
   - Industry experts note significant trends emerging in the market
   - New technologies are driving innovation across sectors
   - Community feedback has been largely positive

3. **Context**: This development represents a shift in how developers approach building applications, with a focus on efficiency and user experience.

4. **Implications**: The changes discussed could affect developers in the following ways:
   - New tools and frameworks to learn
   - Updated best practices for development
   - Potential career growth opportunities

*Note: This is a simulated response. Connect to an AI API for real summaries.*`;
    }
    
    if (lowerPrompt.includes('compare') || lowerPrompt.includes('difference')) {
      return `## Article Comparison

Here's an analysis comparing different perspectives:

| Aspect | Article A | Article B |
|--------|-----------|-----------|
| **Focus** | Technical implementation | Business impact |
| **Audience** | Developers | Executives |
| **Tone** | Technical | Strategic |
| **Depth** | Code-level | High-level overview |

### Key Differences:
- **Article A** provides hands-on examples and code snippets
- **Article B** focuses on ROI and business metrics
- Both agree on the overall trend but differ in emphasis

### Recommendation:
If you're a developer, start with Article A for practical implementation details, then read Article B for business context.`;
    }
    
    if (lowerPrompt.includes('explain') || lowerPrompt.includes('what is')) {
      return `## Explanation

Let me break this down in simple terms:

### The Concept
This refers to [topic], which is essentially a way to [basic definition].

### Why It Matters
- **Efficiency**: It helps developers work smarter
- **Scalability**: Enables building larger systems
- **Maintainability**: Makes code easier to understand and update

### Real-World Example
Think of it like [analogy]. Just as [analogy example], this technology does [explanation].

### Getting Started
1. Start with the official documentation
2. Build a small sample project
3. Join community forums for support
4. Practice with real-world scenarios

Would you like me to elaborate on any specific aspect?`;
    }
    
    // Default response
    return `## Analysis

Thank you for your question about "${prompt.slice(0, 50)}..."

### What I Found
Based on current trends and recent articles, here's what I can tell you:

The developer community has been actively discussing this topic, with multiple angles emerging:

1. **Technical Perspective**: There are several approaches being explored
2. **Industry Impact**: Companies are adapting their strategies
3. **Community Sentiment**: Generally positive with some concerns

### Sources
This analysis draws from recent discussions on:
- Hacker News
- Dev.to
- Various tech blogs

### Next Steps
Would you like me to:
- 📝 Summarize a specific article?
- 🔍 Search for more details?
- ⚖️ Compare different viewpoints?

Let me know how I can help further!`;
  };

  const handleQuickAction = (action) => {
    setInput(action.prompt);
    inputRef.current?.focus();
  };

  const handleCopy = (content, id) => {
    navigator.clipboard.writeText(content);
    setCopiedMessage(id);
    setTimeout(() => setCopiedMessage(null), 2000);
  };

  const toggleVoiceInput = () => {
    // Voice input would use Web Speech API
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice input is not supported in your browser. Please use Chrome or Edge.');
      return;
    }
    
    setIsListening(!isListening);
    // In production, implement full voice recognition
  };

  const formatTimestamp = (date) => {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Bot className="text-gold-primary w-8 h-8" />
            AI News Assistant
          </h1>
          <p className="text-gray-400 mt-1">
            Your intelligent companion for news analysis and insights
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleQuickAction(action)}
                className="flex items-center gap-2 px-3 py-2 bg-[#111111] border border-[#333333] rounded-lg text-sm text-gray-300 hover:text-gold hover:border-gold/30 transition-all"
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#111111] border border-[#333333] rounded-2xl overflow-hidden flex flex-col"
          style={{ height: '600px' }}
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-gold text-black' 
                        : 'bg-[#1a1a1a] border border-[#333333] text-gold'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="w-5 h-5" />
                      ) : (
                        <Bot className="w-5 h-5" />
                      )}
                    </div>
                    
                    {/* Message Content */}
                    <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-4 rounded-2xl ${
                        message.role === 'user' 
                          ? 'bg-gold/20 text-white rounded-br-sm' 
                          : message.isError
                            ? 'bg-red-500/10 text-red-400 border border-red-500/30'
                            : 'bg-[#1a1a1a] text-gray-200 rounded-bl-sm'
                      }`}>
                        <div className="prose prose-invert prose-sm max-w-none">
                          {message.content.split('\n').map((line, i) => {
                            if (line.startsWith('## ')) {
                              return <h3 key={i} className="text-lg font-bold text-gold mt-2 mb-1">{line.replace('## ', '')}</h3>;
                            }
                            if (line.startsWith('### ')) {
                              return <h4 key={i} className="text-md font-semibold text-white mt-2 mb-1">{line.replace('### ', '')}</h4>;
                            }
                            if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || line.startsWith('4. ')) {
                              return <li key={i} className="ml-4 text-gray-300">{line.replace(/^\d\. /, '')}</li>;
                            }
                            if (line.startsWith('- ')) {
                              return <li key={i} className="ml-4 text-gray-300">{line.replace('- ', '')}</li>;
                            }
                            if (line.startsWith('*')) {
                              return <p key={i} className="text-gray-400 italic">{line.replace(/\*/g, '')}</p>;
                            }
                            if (line.startsWith('|')) {
                              return <code key={i} className="text-gold">{line}</code>;
                            }
                            return line ? <p key={i} className="text-gray-300">{line}</p> : <br key={i} />;
                          })}
                        </div>
                        
                        {/* Copy Button for AI messages */}
                        {message.role === 'assistant' && !message.isError && (
                          <button
                            onClick={() => handleCopy(message.content, message.id)}
                            className="mt-2 p-1 text-gray-500 hover:text-gold transition-colors"
                          >
                            {copiedMessage === message.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        )}
                      </div>
                      
                      {/* Timestamp & Sources */}
                      <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${message.role === 'user' ? 'justify-end' : ''}`}>
                        <span>{formatTimestamp(message.timestamp)}</span>
                        {message.sources && (
                          <span className="text-gold/70">• Sources: {message.sources.length}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Loading indicator */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#333333] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-gold" />
                  </div>
                  <div className="bg-[#1a1a1a] rounded-2xl rounded-bl-sm px-4 py-3">
                    <Loader2 className="w-5 h-5 text-gold animate-spin" />
                  </div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-[#333333] p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={toggleVoiceInput}
                className={`p-2 rounded-lg transition-all ${
                  isListening 
                    ? 'bg-red-500/20 text-red-400 animate-pulse' 
                    : 'bg-[#1a1a1a] text-gray-400 hover:text-gold'
                }`}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything about the news..."
                className="flex-1 bg-[#1a1a1a] border border-[#333333] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-all"
                disabled={isLoading}
              />
              
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="p-3 bg-gold-gradient text-black rounded-xl hover:shadow-lg hover:shadow-gold/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI responses are simulated for demo. Connect to a real AI API for production use.
            </p>
          </div>
        </motion.div>

        {/* Features Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div className="p-4 bg-[#111111] border border-[#333333] rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gold/10 rounded-lg">
                <BookOpen className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-semibold text-white">Summarize Articles</h3>
            </div>
            <p className="text-sm text-gray-400">
              Paste an article or ask me to summarize the latest news on any topic.
            </p>
          </div>
          
          <div className="p-4 bg-[#111111] border border-[#333333] rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gold/10 rounded-lg">
                <Scale className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-semibold text-white">Compare & Contrast</h3>
            </div>
            <p className="text-sm text-gray-400">
              Get side-by-side comparisons of different articles on the same topic.
            </p>
          </div>
          
          <div className="p-4 bg-[#111111] border border-[#333333] rounded-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gold/10 rounded-lg">
                <GraduationCap className="w-5 h-5 text-gold" />
              </div>
              <h3 className="font-semibold text-white">Learn & Explain</h3>
            </div>
            <p className="text-sm text-gray-400">
              Complex topics explained in simple terms with examples.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AIChat;
