import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Cpu, Database, User, 
  Key, Server, Wifi, Lock, Eye, Globe, MapPin, 
  ScanLine, AlertTriangle, HardDrive, Satellite,
  RadioTower, Binary, Fingerprint, Shield,
  Download, History, Zap, Volume2, VolumeX,
  Network, Activity, Code, ChevronDown, X,
  Laptop, Smartphone, Mail, Phone, Clock,
  FileText, Share2, Copy, Check, Menu
} from 'lucide-react';
import './App.css';

const HackerOSINT = () => {
  const [number, setNumber] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [terminalMode, setTerminalMode] = useState(false);
  const [command, setCommand] = useState('');
  const [logs, setLogs] = useState([
    'SYSTEM BOOT SEQUENCE INITIATED...',
    'LOADING CORE MODULES...',
    'ESTABLISHING ENCRYPTED CONNECTION...',
    'SCANNING FOR THREATS...',
    'READY FOR OSINT OPERATIONS'
  ]);
  const [searchHistory, setSearchHistory] = useState([]);
  const [stealthMode, setStealthMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const terminalRef = useRef(null);
  const canvasRef = useRef(null);

  // Matrix rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const matrix = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const chars = matrix.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = stealthMode ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = stealthMode ? "#00ff00" : "#0fff50";
      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [stealthMode]);

  // Terminal auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setShowKeyboard(!showKeyboard);
      }
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        setTerminalMode(!terminalMode);
      }
      if (e.key === 'Escape') {
        setShowKeyboard(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showKeyboard, terminalMode]);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const fetchData = async () => {
    if (!number || number.length !== 10) {
      addNotification('Enter a valid 10-digit number', 'error');
      return;
    }
    
    setLoading(true);
    setError(null);
    setData(null);
    setMobileMenuOpen(false);
    
    // Add to history
    if (!searchHistory.includes(number)) {
      setSearchHistory(prev => [number, ...prev.slice(0, 4)]);
    }
    
    // Add to logs
    setLogs(prev => [...prev, `INITIATING DEEP SCAN FOR TARGET: ${number}`]);
    setLogs(prev => [...prev, 'ENCRYPTING CONNECTION...']);
    
    if (soundEnabled) {
      // Simulated beep sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      oscillator.frequency.value = 800;
      oscillator.connect(audioContext.destination);
      oscillator.start();
      setTimeout(() => oscillator.stop(), 100);
    }
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const response = await fetch(`https://source-code-api.vercel.app/?num=${number}`);
      const result = await response.json();
      
      // Simulate scanning process
      const scanSteps = [
        'BYPASSING ENCRYPTION...',
        'ACCESSING DATABASE GRID...',
        'EXTRACTING PERSONAL RECORDS...',
        'CROSS-REFERENCING WITH DEEP WEB...',
        'DECRYPTING LOCATION DATA...',
        'ANALYZING SOCIAL FOOTPRINT...',
        'SCANNING DEVICE FINGERPRINTS...',
        'MAPPING NETWORK TOPOLOGY...',
        'COMPILING FINAL REPORT...'
      ];
      
      for (let i = 0; i < scanSteps.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setLogs(prev => [...prev, `[${i+1}/9] ${scanSteps[i]}`]);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setData(result);
      setLogs(prev => [...prev, `SCAN COMPLETE: FOUND ${result.length} RECORDS`]);
      setLogs(prev => [...prev, '>>> READY FOR NEXT OPERATION']);
      addNotification(`Found ${result.length} records`, 'success');
    } catch (err) {
      setError("CRITICAL_FAILURE: UNABLE TO REACH DATABASE");
      setLogs(prev => [...prev, 'ERROR: DATABASE CONNECTION FAILED']);
      addNotification('Database connection failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCommand = (e) => {
    e.preventDefault();
    if (!command.trim()) return;
    
    setLogs(prev => [...prev, `>>> ${command}`]);
    
    const cmd = command.toLowerCase();
    
    if (cmd === 'clear') {
      setLogs([]);
    } else if (cmd === 'scan') {
      if (number) fetchData();
      else setLogs(prev => [...prev, 'ERROR: NO TARGET NUMBER SPECIFIED']);
    } else if (cmd === 'help') {
      setLogs(prev => [...prev, 
        'AVAILABLE COMMANDS:',
        '  scan - Execute deep scan',
        '  clear - Clear terminal',
        '  help - Show commands',
        '  status - System status',
        '  history - Search history',
        '  stealth - Toggle stealth mode',
        '  export - Export results'
      ]);
    } else if (cmd === 'status') {
      setLogs(prev => [...prev, 
        'SYSTEM STATUS: OPERATIONAL', 
        'CONNECTION: ENCRYPTED', 
        'THREAT LEVEL: LOW',
        `STEALTH MODE: ${stealthMode ? 'ACTIVE' : 'INACTIVE'}`
      ]);
    } else if (cmd === 'history') {
      setLogs(prev => [...prev, 
        'SEARCH HISTORY:',
        ...searchHistory.map((h, i) => `  ${i + 1}. ${h}`)
      ]);
    } else if (cmd === 'stealth') {
      setStealthMode(!stealthMode);
      setLogs(prev => [...prev, `STEALTH MODE: ${!stealthMode ? 'ACTIVATED' : 'DEACTIVATED'}`]);
    } else if (cmd === 'export' && data) {
      downloadResults();
      setLogs(prev => [...prev, 'EXPORTING DATA...']);
    } else {
      setLogs(prev => [...prev, `COMMAND NOT RECOGNIZED: ${command}`]);
    }
    
    setCommand('');
  };

  const downloadResults = () => {
    if (!data) return;
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `osint_results_${number}_${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    addNotification('Results exported successfully', 'success');
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    addNotification('Copied to clipboard', 'success');
  };

  const getThreatLevel = (index) => {
    const levels = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'];
    return levels[index % 4];
  };

  const getEncryptionLevel = (index) => {
    const levels = ['AES-256', 'RSA-2048', 'ECC-384', 'QUANTUM'];
    return levels[index % 4];
  };

  const getThreatColor = (level) => {
    switch(level) {
      case 'LOW': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'HIGH': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'CRITICAL': return 'text-red-400 bg-red-500/20 border-red-500/30';
      default: return 'text-green-400 bg-green-500/20 border-green-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black text-[#0fff50] font-mono overflow-hidden">
      {/* Matrix Rain Background */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 opacity-20"
      />
      
      {/* Grid Overlay */}
      <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[linear-gradient(#0fff50_1px,transparent_1px),linear-gradient(90deg,#0fff50_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      
      {/* Scanning Lines */}
      <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-full h-[1px] bg-[#0fff50] animate-pulse"
            style={{
              top: `${i * 5}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${2 + i * 0.1}s`
            }}
          />
        ))}
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map(notif => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              className={`px-4 py-2 rounded border backdrop-blur-lg ${
                notif.type === 'success' ? 'bg-green-500/20 border-green-500/50 text-green-400' :
                notif.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-400' :
                'bg-[#0fff50]/20 border-[#0fff50]/50 text-[#0fff50]'
              }`}
            >
              {notif.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showKeyboard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowKeyboard(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black border border-[#0fff50]/50 p-6 rounded-lg max-w-md w-full"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Code className="text-[#0fff50]" />
                  KEYBOARD SHORTCUTS
                </h3>
                <button onClick={() => setShowKeyboard(false)} className="text-[#0fff50]/50 hover:text-[#0fff50]">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  { key: 'Ctrl + K', action: 'Toggle shortcuts' },
                  { key: 'Ctrl + T', action: 'Toggle terminal' },
                  { key: 'Enter', action: 'Execute scan' },
                  { key: 'Esc', action: 'Close modals' },
                ].map((shortcut, i) => (
                  <div key={i} className="flex justify-between items-center p-2 bg-[#0fff50]/5 rounded">
                    <span className="text-[#0fff50]/70">{shortcut.action}</span>
                    <kbd className="px-2 py-1 bg-[#0fff50]/10 border border-[#0fff50]/30 rounded text-xs">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto relative z-10 p-2 sm:p-4 lg:p-6">
        {/* Header */}
        <header className="mb-4 sm:mb-6 lg:mb-8 p-3 sm:p-4 lg:p-6 border border-[#0fff50]/30 bg-black/80 backdrop-blur-lg rounded-lg relative overflow-hidden group hover:border-[#0fff50]/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0fff50]/5 to-transparent animate-[shimmer_2s_infinite]"></div>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="relative flex-1 w-full">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tighter flex items-center gap-2 sm:gap-3"
              >
                <Terminal className="text-[#0fff50] animate-pulse" size={24} /> 
                <span className="relative">
                  <span className="relative z-10">DARKNET_OSINT_v7.0</span>
                  <span className="absolute top-0 left-0 text-[#ff00ff] animate-[glitch_0.3s_infinite] opacity-70 hidden sm:inline">DARKNET_OSINT_v7.0</span>
                </span>
              </motion.h1>
              
              <div className="flex flex-wrap items-center gap-2 mt-2 text-[10px] sm:text-xs">
                <span className="flex items-center gap-1 px-2 py-1 bg-[#0fff50]/10 border border-[#0fff50]/30 rounded">
                  <Wifi size={10} /> ENCRYPTED
                </span>
                <span className="flex items-center gap-1 px-2 py-1 bg-[#0fff50]/10 border border-[#0fff50]/30 rounded">
                  <Shield size={10} /> TOR_ACTIVE
                </span>
                <span className="flex items-center gap-1 px-2 py-1 bg-[#0fff50]/10 border border-[#0fff50]/30 rounded">
                  <Satellite size={10} /> GPS_SPOOFING
                </span>
                {stealthMode && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/50 rounded text-green-400 animate-pulse">
                    <Eye size={10} /> STEALTH
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2 w-full lg:w-auto">
              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden px-3 py-2 bg-[#0fff50]/10 border border-[#0fff50]/30 rounded flex items-center gap-2"
              >
                <Menu size={16} />
                MENU
              </button>
              
              {/* Desktop Controls */}
              <div className="hidden lg:flex items-center gap-2">
                <div className="text-right">
                  <div className="text-[10px] text-[#0fff50]/70 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-[#0fff50] animate-pulse rounded-full"></div>
                      ACTIVE
                    </div>
                    <span>|</span>
                    <span>IP: ***.***.***.***</span>
                    <span>|</span>
                    <span>AES-256</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="px-3 py-1 bg-[#0fff50]/10 border border-[#0fff50]/30 text-xs hover:bg-[#0fff50]/20 transition-all duration-200 flex items-center gap-2 rounded"
                  title="Toggle Sound"
                >
                  {soundEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
                </button>
                
                <button 
                  onClick={() => setStealthMode(!stealthMode)}
                  className={`px-3 py-1 text-xs hover:bg-[#0fff50]/20 transition-all duration-200 flex items-center gap-2 rounded ${
                    stealthMode ? 'bg-green-500/20 border border-green-500/50 text-green-400' : 'bg-[#0fff50]/10 border border-[#0fff50]/30'
                  }`}
                  title="Toggle Stealth Mode"
                >
                  <Eye size={12} />
                  {stealthMode ? 'STEALTH' : 'NORMAL'}
                </button>
                
                <button 
                  onClick={() => setTerminalMode(!terminalMode)}
                  className="px-3 py-1 bg-[#0fff50] text-black text-xs font-bold hover:bg-[#0fff50]/80 transition-all duration-200 flex items-center gap-2 rounded"
                >
                  <Terminal size={12} />
                  {terminalMode ? 'NORMAL' : 'TERMINAL'}
                </button>
              </div>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="lg:hidden mt-4 pt-4 border-t border-[#0fff50]/30 space-y-2 overflow-hidden"
              >
                <button 
                  onClick={() => { setSoundEnabled(!soundEnabled); setMobileMenuOpen(false); }}
                  className="w-full px-3 py-2 bg-[#0fff50]/10 border border-[#0fff50]/30 text-sm hover:bg-[#0fff50]/20 transition-all duration-200 flex items-center gap-2 rounded justify-center"
                >
                  {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                  {soundEnabled ? 'SOUND ON' : 'SOUND OFF'}
                </button>
                
                <button 
                  onClick={() => { setStealthMode(!stealthMode); setMobileMenuOpen(false); }}
                  className={`w-full px-3 py-2 text-sm hover:bg-[#0fff50]/20 transition-all duration-200 flex items-center gap-2 rounded justify-center ${
                    stealthMode ? 'bg-green-500/20 border border-green-500/50 text-green-400' : 'bg-[#0fff50]/10 border border-[#0fff50]/30'
                  }`}
                >
                  <Eye size={14} />
                  {stealthMode ? 'STEALTH MODE' : 'NORMAL MODE'}
                </button>
                
                <button 
                  onClick={() => { setTerminalMode(!terminalMode); setMobileMenuOpen(false); }}
                  className="w-full px-3 py-2 bg-[#0fff50] text-black text-sm font-bold hover:bg-[#0fff50]/80 transition-all duration-200 flex items-center gap-2 rounded justify-center"
                >
                  <Terminal size={14} />
                  {terminalMode ? 'NORMAL MODE' : 'TERMINAL MODE'}
                </button>
                
                <button 
                  onClick={() => { setShowKeyboard(true); setMobileMenuOpen(false); }}
                  className="w-full px-3 py-2 bg-[#0fff50]/10 border border-[#0fff50]/30 text-sm hover:bg-[#0fff50]/20 transition-all duration-200 flex items-center gap-2 rounded justify-center"
                >
                  <Code size={14} />
                  SHORTCUTS
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Left Column - Control Panel */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            {/* Search Panel */}
            {!terminalMode ? (
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0fff50] to-[#00ffaa] rounded-lg blur opacity-30 group-hover:opacity-70 transition duration-1000"></div>
                <div className="relative bg-black border border-[#0fff50]/50 p-4 sm:p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <ScanLine className="mr-3 text-[#0fff50] animate-pulse" />
                    <h2 className="text-lg sm:text-xl font-bold">DEEP WEB SCANNER</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                        <Fingerprint className="text-[#0fff50]/50" size={20} />
                      </div>
                      <input
                        type="tel"
                        placeholder="ENTER 10-DIGIT NUMBER..."
                        className="w-full bg-black border border-[#0fff50]/30 pl-10 pr-4 py-3 text-sm sm:text-base text-[#0fff50] placeholder:text-[#0fff50]/30 focus:outline-none focus:border-[#0fff50] focus:shadow-[0_0_20px_rgba(0,255,80,0.3)] transition-all duration-300 rounded"
                        value={number}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 10) {
                            setNumber(value);
                          }
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && fetchData()}
                        maxLength={10}
                      />
                      {number && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-[#0fff50]/50">
                          {number.length}/10
                        </div>
                      )}
                    </div>
                    
                    {/* Search History Dropdown */}
                    {searchHistory.length > 0 && (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs text-[#0fff50]/50 flex items-center gap-1">
                          <History size={12} />
                          RECENT:
                        </span>
                        {searchHistory.map((hist, i) => (
                          <button
                            key={i}
                            onClick={() => setNumber(hist)}
                            className="px-2 py-1 bg-[#0fff50]/10 border border-[#0fff50]/30 text-xs rounded hover:bg-[#0fff50]/20 transition-all"
                          >
                            {hist}
                          </button>
                        ))}
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button 
                        onClick={fetchData}
                        disabled={loading || number.length !== 10}
                        className="bg-gradient-to-r from-[#0fff50] to-[#00aa50] text-black py-3 font-bold hover:shadow-[0_0_20px_rgba(0,255,80,0.5)] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed rounded"
                      >
                        {loading ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                              <Cpu size={16} />
                            </motion.div>
                            SCANNING...
                          </>
                        ) : (
                          <>
                            <Satellite size={16} />
                            DEEP SCAN
                          </>
                        )}
                      </button>
                      
                      {data && (
                        <button 
                          onClick={downloadResults}
                          className="px-4 sm:px-6 border border-[#0fff50]/50 hover:border-[#0fff50] hover:bg-[#0fff50]/10 transition-all duration-300 flex items-center justify-center gap-2 rounded"
                        >
                          <Download size={16} />
                          <span className="hidden sm:inline">EXPORT</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Terminal Interface */
              <div className="relative bg-black border border-[#0fff50]/50 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between bg-[#0fff50]/10 p-3 border-b border-[#0fff50]/30">
                  <div className="flex items-center gap-2">
                    <Binary className="mr-2" size={16} />
                    <span className="font-bold text-sm sm:text-base">SYSTEM TERMINAL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0fff50] rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-[#0fff50] rounded-full animate-pulse delay-100"></div>
                    <div className="w-2 h-2 bg-[#0fff50] rounded-full animate-pulse delay-200"></div>
                  </div>
                </div>
                
                <div 
                  ref={terminalRef}
                  className="h-64 sm:h-80 p-4 overflow-y-auto text-xs sm:text-sm font-mono"
                >
                  {logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="mb-1"
                    >
                      <span className="text-[#0fff50]/50">$ </span>
                      <span className={log.startsWith('ERROR') ? 'text-red-400' : 'text-[#0fff50]'}>
                        {log}
                      </span>
                    </motion.div>
                  ))}
                  
                  {loading && (
                    <div className="flex items-center gap-2 text-[#0fff50]/70">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <Cpu size={12} />
                      </motion.div>
                      SCANNING IN PROGRESS...
                    </div>
                  )}
                </div>
                
                <form onSubmit={handleCommand} className="border-t border-[#0fff50]/30">
                  <div className="flex items-center p-3">
                    <span className="text-[#0fff50] mr-2">$</span>
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      className="flex-1 bg-transparent border-none outline-none text-sm text-[#0fff50] placeholder:text-[#0fff50]/30"
                      placeholder="TYPE COMMAND (help for list)..."
                      autoFocus
                    />
                  </div>
                </form>
              </div>
            )}

            {/* Results Section */}
            <AnimatePresence>
              {data && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {data.map((item, index) => (
                    <div 
                      key={item.id + index}
                      className="relative group"
                    >
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0fff50] to-[#00ffaa] rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                      <div className="relative bg-black border border-[#0fff50]/30 p-4 sm:p-5 rounded-lg hover:border-[#0fff50]/50 transition-all duration-300">
                        {/* Scanner Line */}
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#0fff50] to-transparent animate-[scan_3s_linear_infinite]" />
                        
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold flex items-center gap-2 mb-2">
                              <User className="text-[#0fff50]" />
                              <span className="bg-gradient-to-r from-[#0fff50] to-[#00aa50] bg-clip-text text-transparent">
                                {item.name.toUpperCase()}
                              </span>
                            </h3>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2 py-1 bg-[#0fff50]/10 border border-[#0fff50]/30 text-xs rounded">
                                ID: {item.id}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded border ${getThreatColor(getThreatLevel(index))}`}>
                                THREAT: {getThreatLevel(index)}
                              </span>
                              <button
                                onClick={() => copyToClipboard(item.mobile, `mobile-${index}`)}
                                className="px-2 py-1 bg-[#0fff50]/10 border border-[#0fff50]/30 text-xs rounded hover:bg-[#0fff50]/20 transition-all flex items-center gap-1"
                              >
                                {copiedField === `mobile-${index}` ? <Check size={10} /> : <Copy size={10} />}
                                COPY
                              </button>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="text-[10px] text-[#0fff50]/50">ENCRYPTION</div>
                            <div className="text-sm font-bold text-[#0fff50]">{getEncryptionLevel(index)}</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Phone size={14} className="text-[#0fff50]" />
                              <span className="text-[#0fff50]/70 w-20 sm:w-24">MOBILE:</span>
                              <span className="font-bold">{item.mobile}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Smartphone size={14} className="text-[#0fff50]" />
                              <span className="text-[#0fff50]/70 w-20 sm:w-24">ALT:</span>
                              <span className="font-bold">{item.alt_mobile}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <User size={14} className="text-[#0fff50]" />
                              <span className="text-[#0fff50]/70 w-20 sm:w-24">FATHER:</span>
                              <span className="font-bold">{item.father_name}</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <MapPin size={14} className="text-[#0fff50]" />
                              <span className="text-[#0fff50]/70 w-20 sm:w-24">LOCATION:</span>
                              <span className="font-bold">{item.circle}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FileText size={14} className="text-[#0fff50]" />
                              <span className="text-[#0fff50]/70 w-20 sm:w-24">AADHAAR:</span>
                              <span className="font-bold">{item.id_number}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Globe size={14} className="text-[#0fff50] mt-1" />
                              <span className="text-[#0fff50]/70 w-20 sm:w-24 flex-shrink-0">ADDRESS:</span>
                              <span className="font-bold break-words">{item.address.replace(/!!/g, ', ')}</span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-[#0fff50]/20 flex flex-wrap justify-between gap-2 text-xs text-[#0fff50]/50">
                          <span className="flex items-center gap-1">
                            <Database size={12} /> DATABASE
                          </span>
                          <span className="flex items-center gap-1">
                            <RadioTower size={12} /> GPS_ACTIVE
                          </span>
                          <span className="flex items-center gap-1 text-[#0fff50]">
                            <Eye size={12} /> MONITORED
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> LIVE
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 border border-red-500/50 bg-red-500/10 backdrop-blur-sm rounded-lg"
              >
                <div className="flex items-center gap-2 text-red-400">
                  <AlertTriangle />
                  <span className="font-bold">CRITICAL ERROR</span>
                </div>
                <p className="mt-2 text-sm">{error}</p>
              </motion.div>
            )}
          </div>

          {/* Right Column - Stats Panel */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            {/* System Status */}
            <div className="bg-black border border-[#0fff50]/30 p-4 sm:p-5 rounded-lg">
              <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2">
                <Server className="text-[#0fff50]" />
                SYSTEM STATUS
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                {[
                  { label: 'CONNECTION', value: 'ENCRYPTED', level: 'high', icon: Lock },
                  { label: 'TOR NETWORK', value: 'ACTIVE', level: 'high', icon: Network },
                  { label: 'VPN STATUS', value: 'MULTI-HOP', level: 'high', icon: Shield },
                  { label: 'DATABASE', value: 'GRANTED', level: 'medium', icon: Database },
                  { label: 'THREAT', value: 'LOW', level: 'low', icon: AlertTriangle },
                ].map((stat, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-[#0fff50]/5 rounded">
                    <span className="text-xs sm:text-sm text-[#0fff50]/70 flex items-center gap-2">
                      <stat.icon size={12} />
                      {stat.label}
                    </span>
                    <span className={`px-2 py-1 text-xs font-bold rounded ${
                      stat.level === 'high' ? 'bg-green-500/20 text-green-400' :
                      stat.level === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Feed */}
            <div className="bg-black border border-[#0fff50]/30 p-4 sm:p-5 rounded-lg">
              <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2">
                <Activity className="text-[#0fff50]" />
                LIVE FEED
              </h3>
              
              <div className="space-y-2 sm:space-y-3 text-xs">
                {[
                  { text: 'DATABASE SYNC', icon: Database },
                  { text: 'ENCRYPTION ACTIVE', icon: Lock },
                  { text: 'PROXY: 3 NODES', icon: Network },
                  { text: 'STREAM: 1.2GB/S', icon: Activity },
                  { text: 'THREATS: 42', icon: Shield },
                  { text: 'SCAN: 2 MIN AGO', icon: Clock },
                ].map((feed, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 p-2 hover:bg-[#0fff50]/5 rounded group"
                  >
                    <feed.icon size={12} className="text-[#0fff50] group-hover:animate-pulse" />
                    <span className="text-[#0fff50]/80">{feed.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions - Hidden on Mobile in favor of main controls */}
            <div className="hidden sm:block bg-black border border-[#0fff50]/30 p-4 sm:p-5 rounded-lg">
              <h3 className="text-base sm:text-lg font-bold mb-4 flex items-center gap-2">
                <Zap className="text-[#0fff50]" />
                QUICK ACTIONS
              </h3>
              
              <div className="space-y-3">
                {[
                  { icon: Globe, label: 'GEO-LOCATE', color: 'from-blue-500 to-cyan-500' },
                  { icon: MapPin, label: 'TRACE ROUTE', color: 'from-purple-500 to-pink-500' },
                  { icon: HardDrive, label: 'DEEP SCAN', color: 'from-green-500 to-emerald-500' },
                  { icon: Shield, label: 'ENCRYPT', color: 'from-yellow-500 to-orange-500' },
                ].map((action, index) => (
                  <button
                    key={index}
                    className={`w-full p-2 sm:p-3 bg-gradient-to-r ${action.color} text-black font-bold text-xs sm:text-sm rounded hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2`}
                  >
                    <action.icon size={14} />
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-[#0fff50]/20 text-center text-[10px] sm:text-xs text-[#0fff50]/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="space-y-1">
              <span className="block">DARKNET_OSINT_v7.0 • EDUCATIONAL USE ONLY</span>
              <span className="block text-[#0fff50]/30">ALL ACTIVITIES LOGGED & ENCRYPTED</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="flex items-center gap-1">
                <Lock size={10} /> SECURE
              </span>
              <span className="flex items-center gap-1">
                <Shield size={10} /> PROTECTED
              </span>
              <span className="flex items-center gap-1">
                <Eye size={10} /> MONITORED
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        ::selection {
          background: rgba(0, 255, 80, 0.3);
          color: #0fff50;
        }
        
        input::placeholder {
          font-size: 0.9em;
          letter-spacing: 0.5px;
        }
        
        @media (max-width: 640px) {
          input::placeholder {
            font-size: 0.8em;
          }
        }
      `}</style>
    </div>
  );
};

function App() {
  return <HackerOSINT />;
}

export default App;