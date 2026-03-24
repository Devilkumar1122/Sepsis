import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Thermometer, HeartPulse, Droplets, User, Calendar, PlusCircle, AlertTriangle, CheckCircle, Info, ArrowLeft } from 'lucide-react';

export default function AddPatient() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    heartRate: '',
    bloodPressure: '',
    temperature: '',
    wbc: '',
    lactate: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPredictionResult(null);

    // Simulate API call and risk prediction
    setTimeout(() => {
      const hr = parseInt(formData.heartRate) || 80;
      const lactate = parseFloat(formData.lactate) || 1.0;
      const wbc = parseFloat(formData.wbc) || 7.0;
      
      let riskScore = 15;
      if (hr > 100) riskScore += 25;
      if (lactate > 2.0) riskScore += 30;
      if (wbc > 12.0 || wbc < 4.0) riskScore += 20;

      riskScore = Math.min(riskScore, 98); // cap at 98%

      let status = 'safe';
      if (riskScore > 60) status = 'high';
      else if (riskScore > 30) status = 'medium';

      setPredictionResult({ risk: riskScore, status });
      setIsSubmitting(false);
    }, 1500);
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'high':
        return { color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200', icon: AlertTriangle, label: 'High Risk' };
      case 'medium':
        return { color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200', icon: Info, label: 'Medium Risk' };
      case 'safe':
        return { color: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', icon: CheckCircle, label: 'Safe' };
      default:
        return { color: 'text-gray-700', bg: 'bg-gray-50', border: 'border-gray-200', icon: Info, label: 'Unknown' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12 font-sans">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
          <Link to="/" className="absolute top-6 left-6 inline-flex items-center text-sm font-medium text-white/70 hover:text-white transition-colors z-20">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Link>
          <h1 className="text-3xl font-bold text-white flex items-center justify-center relative z-10 pt-4">
            <PlusCircle className="w-8 h-8 mr-3" />
            Add Patient
          </h1>
          <p className="text-blue-100 mt-2 opacity-90 relative z-10 font-medium">Enter patient vitals to predict sepsis risk</p>
        </div>

        <div className="p-8">
          {/* Result Card (Animated Appearance) */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${predictionResult ? 'max-h-64 mb-8 opacity-100 transform translate-y-0' : 'max-h-0 opacity-0 m-0 transform -translate-y-4'}`}>
            {predictionResult && (() => {
              const config = getStatusConfig(predictionResult.status);
              const StatusIcon = config.icon;
              return (
                <div className={`p-6 rounded-2xl border-2 ${config.bg} ${config.border} flex flex-col md:flex-row items-center justify-between shadow-sm gap-4`}>
                  <div className="flex items-center space-x-4">
                    <div className={`p-4 rounded-full bg-white shadow-sm ${config.color}`}>
                      <StatusIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${config.color}`}>{config.label}</h3>
                      <p className={`text-sm mt-1 font-medium ${config.color} opacity-80`}>AI Prediction Complete</p>
                    </div>
                  </div>
                  <div className="text-center bg-white py-3 px-6 rounded-xl shadow-sm border border-black/5">
                    <div className={`text-5xl font-extrabold ${config.color}`}>
                      {predictionResult.risk}<span className="text-2xl">%</span>
                    </div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1 block">Risk Score</span>
                  </div>
                </div>
              );
            })()}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Basic Info */}
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 mb-5 flex items-center">
              <User className="w-5 h-5 mr-2 text-indigo-500" /> Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-600">Full Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="pl-10 w-full rounded-xl border-gray-200 bg-gray-50/50 border p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none" placeholder="John Doe" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-600">Age</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                      <Calendar className="h-4 w-4 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                    </div>
                    <input required type="number" name="age" value={formData.age} onChange={handleChange} className="pl-10 w-full rounded-xl border-gray-200 bg-gray-50/50 border p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none" placeholder="45" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-gray-600">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="w-full rounded-xl border-gray-200 bg-gray-50/50 border p-3 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 focus:bg-white transition-all outline-none text-gray-700">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Vitals */}
            <h2 className="text-lg font-bold text-gray-800 border-b border-gray-100 pb-3 mt-8 mb-5 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-rose-500" /> Vitals & Lab Results
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-600">Heart Rate (bpm)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <HeartPulse className="h-4 w-4 text-rose-400 group-focus-within:text-rose-500 transition-colors" />
                  </div>
                  <input required type="number" name="heartRate" value={formData.heartRate} onChange={handleChange} className="pl-10 w-full rounded-xl border-gray-200 bg-gray-50/50 border p-3 focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 focus:bg-white transition-all outline-none" placeholder="85" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-600">Blood Pressure (mmHg)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Activity className="h-4 w-4 text-blue-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input required type="text" name="bloodPressure" value={formData.bloodPressure} onChange={handleChange} className="pl-10 w-full rounded-xl border-gray-200 bg-gray-50/50 border p-3 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white transition-all outline-none" placeholder="120/80" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-600">Temperature (°C)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Thermometer className="h-4 w-4 text-orange-400 group-focus-within:text-orange-500 transition-colors" />
                  </div>
                  <input required type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange} className="pl-10 w-full rounded-xl border-gray-200 bg-gray-50/50 border p-3 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all outline-none" placeholder="37.2" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-600">WBC (x10³/µL)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Droplets className="h-4 w-4 text-purple-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input required type="number" step="0.1" name="wbc" value={formData.wbc} onChange={handleChange} className="pl-10 w-full rounded-xl border-gray-200 bg-gray-50/50 border p-3 focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition-all outline-none" placeholder="7.5" />
                </div>
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-sm font-semibold text-gray-600">Lactate (mmol/L)</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                    <Droplets className="h-4 w-4 text-cyan-500 group-focus-within:text-cyan-600 transition-colors" />
                  </div>
                  <input required type="number" step="0.1" name="lactate" value={formData.lactate} onChange={handleChange} className="pl-10 w-full rounded-xl border-gray-200 bg-gray-50/50 border p-3 focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 focus:bg-white transition-all outline-none" placeholder="1.2" />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full relative group overflow-hidden rounded-xl p-[1px] transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:hover:scale-100 shadow-md hover:shadow-xl hover:shadow-indigo-500/30"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500 bg-[length:200%_auto] animate-gradient"></span>
                <div className="relative flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-lg tracking-wide transition-all group-hover:bg-opacity-0">
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Risk Profile...
                    </div>
                  ) : (
                    "Predict Risk"
                  )}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
