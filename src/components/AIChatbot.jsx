import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, User, Flame, Cpu, ShieldCheck, RefreshCw, ChevronDown, ChevronUp, Layers, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { geminiService } from '../services/geminiService';
import { sound } from '../utils/audio';

export default function AIChatbot() {
  const { t, lang, language } = useLanguage();
  const currentLang = (lang || language || 'RU').toString().toLowerCase();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showModelDrawer, setShowModelDrawer] = useState(false);
  const [orchestratorState, setOrchestratorState] = useState(geminiService.getState());
  const [failoverAlert, setFailoverAlert] = useState(null);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: t?.chatbot?.welcome || 'Здравствуйте! Я инженерный ИИ-консультант Smart Boiler.',
      modelUsed: orchestratorState.activeModel?.name || 'Gemini 2.5 Flash',
      tokens: orchestratorState.activeModel?.inputTokens || 1048576
    }
  ]);

  const messagesEndRef = useRef(null);

  // Subscribe to orchestrator state updates
  useEffect(() => {
    const unsubscribe = geminiService.subscribe((state) => {
      setOrchestratorState(state);
      if (state.lastFailoverInfo) {
        setFailoverAlert(state.lastFailoverInfo);
        // Auto-dismiss alert after 6 seconds
        setTimeout(() => setFailoverAlert(null), 6000);
      }
    });
    return unsubscribe;
  }, []);

  // Update initial message if language changes and conversation hasn't started
  useEffect(() => {
    if (messages.length === 1 && messages[0].role === 'assistant') {
      setMessages([
        {
          role: 'assistant',
          text: t?.chatbot?.welcome || 'Здравствуйте! Я инженерный ИИ-консультант Smart Boiler.',
          modelUsed: orchestratorState.activeModel?.name || 'Gemini 2.5 Flash',
          tokens: orchestratorState.activeModel?.inputTokens || 1048576
        }
      ]);
    }
  }, [lang, language, t?.chatbot?.welcome]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend = null) => {
    const query = textToSend || input;
    if (!query.trim() || isTyping) return;

    sound.playButtonClick();
    const userMsg = { role: 'user', text: query };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const response = await geminiService.generate(query, updatedHistory, currentLang);
      
      setMessages([
        ...updatedHistory,
        {
          role: 'assistant',
          text: response.text,
          modelUsed: response.modelName || response.model,
          tokens: response.inputTokens,
          isOffline: response.offline
        }
      ]);
      sound.playSuccess();
    } catch (err) {
      console.error('Chat error:', err);
      setMessages([
        ...updatedHistory,
        {
          role: 'assistant',
          text: currentLang === 'uz' 
            ? "Kechirasiz, javob olishda xatolik yuz berdi. Iltimos, qayta urinib ko'ring."
            : currentLang === 'en'
            ? "An error occurred while generating response. Please try again."
            : "Произошла временная заминка при обработке запроса. Пожалуйста, повторите вопрос.",
          isError: true
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const activeModel = orchestratorState.activeModel;

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            sound.playButtonClick();
            setIsOpen(!isOpen);
          }}
          className="relative group px-4 py-3.5 sm:px-5 sm:py-4 rounded-full bg-gradient-to-r from-ember-500 via-amber-500 to-ember-600 text-white shadow-2xl shadow-ember-500/40 hover:scale-105 transition-all flex items-center gap-2.5 active:scale-95 border border-white/20"
          title="Smart Boiler Multi-Model AI Assistant"
        >
          <Sparkles className="w-5 h-5 text-white animate-spin-slow shrink-0" />
          <div className="flex flex-col text-left leading-tight pr-1">
            <span className="font-display font-bold text-xs">{t.chatbot.triggerTitle}</span>
            <span className="text-[9px] font-mono text-amber-200/90 hidden sm:inline">
              {activeModel ? `${(activeModel.inputTokens / 1024).toFixed(0)}k ${t.chatbot.tokensLabel}` : 'Gemini'}
            </span>
          </div>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-obsidian-950"></span>
          </span>
        </button>
      </div>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-20 sm:bottom-24 right-2 sm:right-6 w-[96vw] sm:w-[440px] h-[580px] max-h-[82vh] rounded-3xl glass-panel border border-white/15 shadow-2xl z-50 flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95 duration-200 bg-obsidian-950/98 backdrop-blur-2xl">
          
          {/* Header */}
          <div className="p-3.5 border-b border-white/10 bg-obsidian-900/90 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-ember-500/30 to-amber-500/20 border border-ember-500/40 flex items-center justify-center text-ember-400 shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-display font-bold text-sm text-white flex items-center gap-2">
                    <span>{t.chatbot.headerTitle}</span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {t.chatbot.headerBadge}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    {t.chatbot.headerSubtitle}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Active Model Bar & Multi-Model Switcher Toggle */}
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl bg-obsidian-950 border border-white/10 text-[10px] font-mono">
              <div className="flex items-center gap-1.5 text-slate-300 truncate">
                <Cpu className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-slate-500">{t.chatbot.activeModelLabel}</span>
                <span className="text-amber-300 font-semibold truncate">{activeModel?.name || 'Gemini 2.5 Flash'}</span>
                <span className="text-slate-500">({(activeModel?.inputTokens || 1048576).toLocaleString()} {t.chatbot.tokensLabel})</span>
              </div>

              <button
                onClick={() => setShowModelDrawer(!showModelDrawer)}
                className="flex items-center gap-1 text-slate-400 hover:text-amber-300 px-1.5 py-0.5 rounded hover:bg-white/5 transition-colors shrink-0"
                title="Посмотреть пул доступных моделей и статус квот"
              >
                <Layers className="w-3 h-3" />
                <span>{orchestratorState.availableModels}/{orchestratorState.totalModels}</span>
                {showModelDrawer ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>

            {/* Failover Alert Toast if occurred */}
            {failoverAlert && (
              <div className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-200 text-[10px] font-mono flex items-center gap-2 animate-in fade-in duration-200">
                <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin shrink-0" />
                <div className="flex-1 truncate">
                  <span className="font-semibold">{t.chatbot.failoverToast}:</span> {failoverAlert.failedModel} → {activeModel?.id}
                </div>
              </div>
            )}
          </div>

          {/* Model Pool Drawer / Inspection View */}
          {showModelDrawer && (
            <div className="p-3 border-b border-white/10 bg-obsidian-900/95 max-h-48 overflow-y-auto space-y-1.5 font-mono text-[10px] animate-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between text-slate-400 pb-1 border-b border-white/5 font-semibold">
                <span>{t.chatbot.poolLabel} (Ранжирование по токенам)</span>
                <span>Статус</span>
              </div>
              {orchestratorState.models.slice(0, 10).map((m, idx) => {
                const isActive = activeModel?.id === m.id;
                const isExhausted = m.status === 'exhausted';
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between px-2 py-1 rounded-lg ${
                      isActive 
                        ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30' 
                        : isExhausted
                        ? 'bg-red-500/10 text-slate-500 line-through'
                        : 'text-slate-300 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="text-slate-500 w-3">{idx + 1}.</span>
                      <span className="truncate">{m.name}</span>
                      <span className="text-slate-500 text-[9px]">({(m.inputTokens / 1024).toFixed(0)}k)</span>
                    </div>

                    <div className="shrink-0 flex items-center gap-1">
                      {isActive && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[9px] border border-emerald-500/30 font-bold">
                          TOP 1 ACTIVE
                        </span>
                      )}
                      {isExhausted && (
                        <span className="px-1.5 py-0.5 rounded bg-red-500/20 text-red-300 text-[9px] border border-red-500/30">
                          QUOTA LIMIT
                        </span>
                      )}
                      {!isActive && !isExhausted && (
                        <span className="px-1.5 py-0.5 rounded bg-white/5 text-slate-400 text-[9px]">
                          STANDBY
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 font-mono text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-ember-500/20 text-ember-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-gradient-to-r from-ember-500 to-amber-500 text-white rounded-br-none shadow-md'
                      : m.isError
                      ? 'bg-red-950/80 text-red-200 border border-red-500/30 rounded-bl-none'
                      : 'bg-obsidian-850/90 text-slate-200 border border-white/10 rounded-bl-none whitespace-pre-line'
                  }`}
                >
                  {m.text}

                  {m.role === 'assistant' && m.modelUsed && (
                    <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[9px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Cpu className="w-2.5 h-2.5 text-amber-400" />
                        {m.modelUsed}
                      </span>
                      {m.tokens > 0 && (
                        <span>{m.tokens.toLocaleString()} {t.chatbot.tokensLabel}</span>
                      )}
                      {m.isOffline && (
                        <span className="text-amber-400">{t.chatbot.offlineBadge}</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-slate-400 text-xs font-mono pl-8 py-1">
                <span className="w-2 h-2 rounded-full bg-ember-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-slate-400">{t.chatbot.typing}</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Sample Questions Chips */}
          <div className="p-2.5 border-t border-white/5 bg-obsidian-900/60 overflow-x-auto flex gap-1.5 no-scrollbar">
            {t.chatbot.sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                disabled={isTyping}
                onClick={() => handleSend(q)}
                className="px-2.5 py-1 rounded-full bg-obsidian-800 hover:bg-ember-500/20 text-[10px] font-mono text-slate-300 hover:text-amber-300 border border-white/10 shrink-0 transition-colors disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-white/10 flex items-center gap-2 bg-obsidian-950"
          >
            <input
              type="text"
              placeholder={t.chatbot.placeholder}
              value={input}
              disabled={isTyping}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-obsidian-900 border border-white/10 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-amber-500 font-mono disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-2 rounded-xl bg-gradient-to-r from-ember-500 to-amber-500 hover:from-ember-600 hover:to-amber-600 disabled:opacity-40 text-white transition-all shadow-md shadow-ember-500/20 active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
