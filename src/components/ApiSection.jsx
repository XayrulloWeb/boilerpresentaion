import React, { useState } from 'react';
import { Terminal, Play, Check, Copy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { sound } from '../utils/audio';

export default function ApiSection() {
  const { t } = useLanguage();
  const [selectedEndpoint, setSelectedEndpoint] = useState('telemetry');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const endpoints = {
    telemetry: {
      method: 'GET',
      path: '/api/v1/boiler/telemetry',
      desc: 'Real-time telemetry: DS18B20 temperature, ACS712 current, relay status, cycle timers.',
      response: {
        timestamp: '2026-10-10T20:30:15Z',
        device: {
          id: 'SB-ESP32-84F3E2',
          firmware: 'v2.4.1-freertos',
          uptime_seconds: 142850
        },
        sensors: {
          water_temperature_celsius: 62.4,
          ds18b20_status: 'OK',
          motor_current_amps_rms: 0.85,
          acs712_status: 'NORMAL'
        },
        relays: {
          pin18_shnek_forward: true,
          pin19_shnek_reverse: false,
          pin04_blower_fan: true
        },
        state_machine: {
          current_state: 'STATE_SHNEK_WORK',
          cycle_remaining_seconds: 14,
          jam_detection_threshold_amps: 3.5
        },
        network: {
          mode: 'STA_CONNECTED',
          mdns_hostname: 'boiler.local',
          ip_address: '192.168.1.145',
          rssi_dbm: -58
        }
      }
    },
    setTarget: {
      method: 'POST',
      path: '/api/v1/boiler/control/target-temp',
      desc: 'Set target temperature and write to persistent NVS Flash.',
      body: {
        target_temperature_celsius: 68.0,
        hysteresis_celsius: 4.0
      },
      response: {
        status: 'SUCCESS',
        message: 'Target temperature updated to 68.0°C',
        nvs_written: true,
        applied_at_utc: '2026-10-10T20:30:20Z'
      }
    },
    relayTest: {
      method: 'POST',
      path: '/api/v1/service/relay-pulse',
      desc: 'Service diagnostic pulse for installation testing.',
      body: {
        relay_pin: 19,
        action: 'PULSE',
        duration_ms: 3000
      },
      response: {
        status: 'EXECUTED',
        relay: 'SHNEK_REVERSE_PIN_19',
        pulse_duration_ms: 3000,
        safety_interlock_pin18: 'DISENGAGED'
      }
    },
    diagnostics: {
      method: 'GET',
      path: '/api/v1/system/diagnostics',
      desc: 'FreeRTOS memory heaps, watchdog timers, and total preserved motor count.',
      response: {
        system_health: 'OPTIMAL',
        cpu_cores: 2,
        cpu_clock_mhz: 240,
        free_heap_bytes: 184512,
        watchdog_resets_count: 0,
        rescued_gearbox_jams_total: 16,
        nvs_partitions_status: 'VALID_CRC32'
      }
    }
  };

  const current = endpoints[selectedEndpoint];

  const handleCopy = () => {
    sound.playButtonClick();
    navigator.clipboard.writeText(`curl -X ${current.method} http://boiler.local${current.path}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendTest = () => {
    sound.playButtonClick();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      sound.playSuccess();
    }, 400);
  };

  return (
    <section id="api" className="py-28 relative bg-obsidian-950 border-t border-white/10">
      
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-plasma-400/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-plasma-400/30 bg-plasma-400/10 text-plasma-300 text-xs font-mono">
            <Terminal className="w-3.5 h-3.5" />
            <span>{t.api.badge}</span>
          </div>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-white tracking-tight">
            {t.api.title}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-plasma-400 via-teal-300 to-amber-300">
              {t.api.titleGradient}
            </span>
          </h2>
          <p className="text-slate-400 text-base">
            {t.api.subtitle}
          </p>
        </div>

        {/* API Interactive Console */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl space-y-8">
          
          {/* Endpoint Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(endpoints).map(([key, ep]) => {
              const isSelected = selectedEndpoint === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    sound.playButtonClick();
                    setSelectedEndpoint(key);
                  }}
                  className={`p-3.5 rounded-2xl border text-left font-mono text-xs transition-all ${
                    isSelected
                      ? 'border-plasma-400 bg-plasma-400/15 text-white shadow-lg shadow-plasma-400/20'
                      : 'border-white/10 bg-obsidian-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      ep.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="text-[11px] truncate">{key}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Endpoint Details */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Endpoint Spec */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono ${
                  current.method === 'GET' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                }`}>
                  {current.method}
                </span>
                <span className="font-mono text-xs text-white bg-obsidian-850 px-3 py-1 rounded-md border border-white/5 break-all">
                  {current.path}
                </span>
              </div>

              <p className="text-slate-300 text-xs leading-relaxed">
                {current.desc}
              </p>

              {/* cURL Snippet */}
              <div className="space-y-1.5 pt-2">
                <div className="text-[11px] font-mono text-slate-400 flex items-center justify-between">
                  <span>{t.api.curlTitle}</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? t.api.copiedBtn : t.api.copyBtn}</span>
                  </button>
                </div>
                <div className="p-3 rounded-xl bg-obsidian-950 border border-white/5 font-mono text-[11px] text-plasma-300 overflow-x-auto">
                  curl -X {current.method} http://boiler.local{current.path}
                </div>
              </div>

              {/* Test Button */}
              <button
                onClick={handleSendTest}
                disabled={loading}
                className="w-full py-3 rounded-xl font-display font-semibold text-xs text-white bg-gradient-to-r from-plasma-500 to-teal-500 hover:shadow-lg hover:shadow-plasma-500/30 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{loading ? t.api.sendingBtn : t.api.sendBtn}</span>
              </button>
            </div>

            {/* Right: Real JSON Response Sandbox */}
            <div className="lg:col-span-7 space-y-2">
              <div className="flex items-center justify-between font-mono text-xs text-slate-400">
                <span>{t.api.responseLabel}</span>
                <span className="text-emerald-400">12 ms latency</span>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-950 border border-white/10 font-mono text-xs text-emerald-300/90 overflow-x-auto max-h-[340px] leading-relaxed shadow-inner">
                <pre>{JSON.stringify(current.response, null, 2)}</pre>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
