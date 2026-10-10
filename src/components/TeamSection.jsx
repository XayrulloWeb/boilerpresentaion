import React from 'react';
import { Users, Code2, Globe, Send, Award, Clock, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function TeamSection() {
  const { t } = useLanguage();
  const members = t.team.members || [];

  return (
    <section id="team" className="py-28 relative bg-obsidian-950 border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] bg-plasma-400/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-plasma-400/30 bg-plasma-400/10 text-plasma-300 text-xs font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>{t.team.badge}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            {t.team.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-plasma-400 via-amber-300 to-emerald-400">
              {t.team.titleGradient}
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            {t.team.subtitle}
          </p>

          {/* Roster Notice Chip */}
          {t.team.statusNotice && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-mono mt-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>{t.team.statusNotice}</span>
            </div>
          )}
        </div>

        {/* Team Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, idx) => {
            const isLead = member.isLead;
            const isPending = member.isPending;

            return (
              <div 
                key={idx}
                className={`glass-panel p-6 rounded-3xl border flex flex-col justify-between transition-all duration-300 group relative ${
                  isLead 
                    ? 'border-amber-500/40 bg-gradient-to-b from-amber-500/10 via-obsidian-900/90 to-obsidian-950 shadow-xl shadow-amber-500/5 hover:border-amber-400' 
                    : 'border-white/10 hover:border-white/25 bg-obsidian-900/70'
                }`}
              >
                {/* Top Badge for Founders */}
                {isLead && (
                  <div className="absolute -top-3 right-5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-ember-500 text-white font-mono text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Award className="w-3 h-3" />
                    <span>{member.leadBadge || (idx === 0 ? 'CHIEF FOUNDER' : 'CO-FOUNDER')}</span>
                  </div>
                )}

                <div className="space-y-4">
                  
                  {/* Avatar Badge */}
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-lg text-white group-hover:scale-105 transition-all shadow-lg border ${
                      isLead 
                        ? 'bg-gradient-to-br from-amber-500/30 to-ember-500/20 border-amber-500/40 text-amber-200' 
                        : 'bg-gradient-to-br from-obsidian-800 to-obsidian-900 border-white/15 text-slate-300'
                    }`}>
                      {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                    </div>

                    {member.badge && (
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono border ${
                        isLead 
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 font-semibold' 
                          : 'bg-white/5 text-slate-400 border-white/10'
                      }`}>
                        {member.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display font-bold text-lg text-white flex items-center gap-1.5">
                      <span>{member.name}</span>
                      {isLead && <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />}
                    </h3>
                    <div className={`text-xs font-mono font-medium mt-0.5 ${isLead ? 'text-amber-400' : 'text-slate-300'}`}>
                      {member.role}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono mt-1">
                      {member.focus}
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Pending Notice for upcoming slots */}
                  {isPending && member.pendingLabel && (
                    <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-white/5 text-slate-400 font-mono text-[10px] border border-white/5">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{member.pendingLabel}</span>
                    </div>
                  )}

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {member.skills?.map((skill, sIdx) => (
                      <span 
                        key={sIdx}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono border ${
                          isLead && sIdx === 0
                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold'
                            : 'bg-obsidian-850 border-white/5 text-slate-300'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Links */}
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-3">
                  <a 
                    href={member.links?.code || 'https://github.com'} 
                    target="_blank" 
                    rel="noreferrer"
                    title="GitHub"
                    className="w-8 h-8 rounded-lg bg-obsidian-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-colors"
                  >
                    <Code2 className="w-4 h-4" />
                  </a>
                  <a 
                    href={member.links?.telegram || 'https://t.me'} 
                    target="_blank" 
                    rel="noreferrer"
                    title="Telegram"
                    className="w-8 h-8 rounded-lg bg-obsidian-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </a>
                  <a 
                    href={member.links?.web || 'https://linkedin.com'} 
                    target="_blank" 
                    rel="noreferrer"
                    title="LinkedIn / Portfolio"
                    className="w-8 h-8 rounded-lg bg-obsidian-800 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-white/30 transition-colors"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
