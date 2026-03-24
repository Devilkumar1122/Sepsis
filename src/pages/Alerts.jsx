import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Clock, Activity, ArrowRight, User, ArrowLeft } from 'lucide-react';

const mockAlerts = [
  {
    id: 1,
    patientName: 'Emma Thompson',
    riskPercentage: 92,
    time: '2 mins ago',
    suggestedAction: 'Immediate ICU transfer & start broad-spectrum antibiotics',
    severity: 'critical', 
  },
  {
    id: 2,
    patientName: 'Michael Chen',
    riskPercentage: 78,
    time: '15 mins ago',
    suggestedAction: 'Review lactic acid lab results and monitor vitals closely',
    severity: 'high', 
  },
  {
    id: 3,
    patientName: 'Sarah Jenkins',
    riskPercentage: 45,
    time: '1 hour ago',
    suggestedAction: 'Standard monitoring protocol',
    severity: 'moderate', 
  },
];

export default function AlertPage() {
  return (
    <div className="min-h-screen bg-gray-950 p-6 font-sans text-gray-100">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <Link to="/" className="inline-flex items-center text-sm font-medium text-red-500 hover:text-red-400 mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent flex items-center">
              <AlertCircle className="w-8 h-8 text-red-500 mr-3 animate-pulse" />
              Active Alerts
            </h1>
            <p className="text-gray-400 mt-2">AI-driven sepsis risk monitoring system</p>
          </div>
          <div className="flex items-center space-x-2 bg-gray-900/50 border border-gray-800 px-4 py-2 rounded-lg backdrop-blur-md">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-sm font-medium text-gray-300">Live Updates</span>
          </div>
        </div>

        {/* Alerts List */}
        <div className="space-y-5 flex flex-col items-stretch w-full">
          {mockAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`relative overflow-hidden group transition-all duration-300 ease-out hover:-translate-y-1 rounded-2xl p-6 backdrop-blur-xl bg-gray-900/40 border
                ${alert.severity === 'critical' 
                  ? 'border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)]' 
                  : alert.severity === 'high'
                  ? 'border-orange-500/40 hover:border-orange-500/60 hover:shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                  : 'border-gray-800 hover:border-gray-700 hover:shadow-lg hover:shadow-gray-900/50'
                }
              `}
            >
              <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10 w-full">
                
                {/* Left Section: Patient & Risk */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 relative">
                    {alert.severity === 'critical' && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
                    )}
                    <div className={`flex items-center justify-center w-16 h-16 rounded-full border-2 shadow-inner
                      ${alert.severity === 'critical' ? 'border-red-500 bg-red-500/10 text-red-500 shadow-red-500/20' 
                      : alert.severity === 'high' ? 'border-orange-500 bg-orange-500/10 text-orange-400 shadow-orange-500/20' 
                      : 'border-blue-500 bg-blue-500/10 text-blue-400 shadow-blue-500/20'}`}>
                      <span className="text-2xl font-bold">{alert.riskPercentage}<span className="text-sm">%</span></span>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-xl font-semibold text-gray-100 flex items-center tracking-wide">
                        <User className="w-5 h-5 mr-2 text-gray-500" />
                        {alert.patientName}
                      </h2>
                      {alert.severity === 'critical' && (
                        <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-red-100 bg-red-600/90 border border-red-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.6)]">
                          Critical
                        </span>
                      )}
                    </div>
                    <div className="flex items-center text-sm text-gray-400 font-medium">
                      <Clock className="w-4 h-4 mr-1.5" />
                      Alert flagged {alert.time}
                    </div>
                  </div>
                </div>

                {/* Right Section: Action */}
                <div className="flex-1 md:max-w-md p-4 rounded-xl bg-gray-950/60 border border-gray-800/80 shadow-inner group-hover:bg-gray-950/80 transition-colors">
                  <div className="flex items-center text-sm font-medium text-gray-400 mb-2 tracking-wide uppercase">
                    <Activity className="w-4 h-4 mr-2 text-blue-400" />
                    Suggested Action
                  </div>
                  <p className={`text-base font-medium leading-relaxed ${alert.severity === 'critical' ? 'text-red-200' : 'text-gray-200'}`}>
                    {alert.suggestedAction}
                  </p>
                </div>

                {/* Arrow Icon */}
                <div className="hidden md:flex items-center justify-center pl-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
                  <button className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors ring-1 ring-gray-700">
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Background gradient effect for critical alerts */}
              {alert.severity === 'critical' && (
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-red-500 opacity-[0.05] rounded-full blur-3xl pointer-events-none group-hover:opacity-10 transition-opacity duration-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
