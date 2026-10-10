import React from 'react';
import { AlertCircle, CheckCircle2, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ProblemSolution() {
  const { t } = useLanguage();

  const pairs = [
    {
      problem: {
        tag: t.problemSolution.p1Tag,
        title: t.problemSolution.p1Title,
        desc: t.problemSolution.p1Desc,
      },
      solution: {
        tag: t.problemSolution.s1Tag,
        title: t.problemSolution.s1Title,
        desc: t.problemSolution.s1Desc,
      }
    },
    {
      problem: {
        tag: t.problemSolution.p2Tag,
        title: t.problemSolution.p2Title,
        desc: t.problemSolution.p2Desc,
      },
      solution: {
        tag: t.problemSolution.s2Tag,
        title: t.problemSolution.s2Title,
        desc: t.problemSolution.s2Desc,
      }
    },
    {
      problem: {
        tag: t.problemSolution.p3Tag,
        title: t.problemSolution.p3Title,
        desc: t.problemSolution.p3Desc,
      },
      solution: {
        tag: t.problemSolution.s3Tag,
        title: t.problemSolution.s3Title,
        desc: t.problemSolution.s3Desc,
      }
    }
  ];

  return (
    <section id="problem-solution" className="py-28 relative bg-obsidian-900 border-t border-white/10">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-ember-500/10 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            <span>{t.problemSolution.badge}</span>
          </div>
          
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            {t.problemSolution.title}
          </h2>
          
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            {t.problemSolution.subtitle}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="space-y-8">
          {pairs.map((item, idx) => (
            <div 
              key={idx}
              className="grid grid-cols-1 lg:grid-cols-2 rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              
              {/* Problem Column (Red Tone) */}
              <div className="p-8 sm:p-10 bg-gradient-to-br from-rose-950/30 via-obsidian-950 to-obsidian-950 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-rose-400">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{item.problem.tag}</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {item.problem.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.problem.desc}
                  </p>
                </div>
              </div>

              {/* Solution Column (Emerald Tone) */}
              <div className="p-8 sm:p-10 bg-gradient-to-br from-emerald-950/30 via-obsidian-950 to-obsidian-950 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{item.solution.tag}</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white">
                    {item.solution.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.solution.desc}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
