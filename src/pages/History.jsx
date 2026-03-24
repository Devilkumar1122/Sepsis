import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, Filter, ArrowUp, ArrowDown, 
  Calendar, Activity, User, Database, ChevronDown, 
  ChevronUp, AlertCircle, RefreshCw, ArrowLeft
} from 'lucide-react';

// Dummy data for history page
const initialHistoryData = [
  { id: 'PT-1029', name: 'Eleanor Pena', age: 62, riskScore: 89, status: 'high', trend: 'up', date: '2026-03-24T10:30:00Z' },
  { id: 'PT-1030', name: 'Wade Warren', age: 45, riskScore: 12, status: 'normal', trend: 'down', date: '2026-03-24T09:15:00Z' },
  { id: 'PT-1031', name: 'Jacob Jones', age: 78, riskScore: 65, status: 'medium', trend: 'up', date: '2026-03-23T14:45:00Z' },
  { id: 'PT-1032', name: 'Arlene McCoy', age: 52, riskScore: 45, status: 'medium', trend: 'down', date: '2026-03-23T11:20:00Z' },
  { id: 'PT-1033', name: 'Devon Lane', age: 34, riskScore: 5, status: 'normal', trend: 'down', date: '2026-03-22T16:05:00Z' },
  { id: 'PT-1034', name: 'Bessie Cooper', age: 67, riskScore: 92, status: 'high', trend: 'up', date: '2026-03-22T08:30:00Z' },
  { id: 'PT-1035', name: 'Darrell Steward', age: 41, riskScore: 28, status: 'normal', trend: 'down', date: '2026-03-21T18:10:00Z' },
  { id: 'PT-1036', name: 'Jane Cooper', age: 55, riskScore: 75, status: 'high', trend: 'up', date: '2026-03-21T13:40:00Z' },
];

export default function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  // Handle Input Changes
  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setStatusFilter(e.target.value);

  // Handle Sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Filter and Sort Data
  const processedData = useMemo(() => {
    let filteredData = initialHistoryData;

    // Filter by User Search (Name or ID)
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      filteredData = filteredData.filter(
        (patient) => 
          patient.name.toLowerCase().includes(lowercasedTerm) || 
          patient.id.toLowerCase().includes(lowercasedTerm)
      );
    }

    // Filter by Status
    if (statusFilter !== 'all') {
      filteredData = filteredData.filter((patient) => patient.status === statusFilter);
    }

    // Sort Data
    if (sortConfig !== null) {
      filteredData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [searchTerm, statusFilter, sortConfig]);

  // Format Date String
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'high':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/20 uppercase tracking-wider">High Risk</span>;
      case 'medium':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 uppercase tracking-wider">Medium</span>;
      case 'normal':
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-500 border border-green-500/20 uppercase tracking-wider">Normal</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-gray-500/10 text-gray-400 border border-gray-500/20">Unknown</span>;
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') {
      return (
        <div className="flex items-center text-red-400 font-medium text-xs bg-red-400/10 px-2 py-0.5 rounded gap-1">
          <ArrowUp className="w-3 h-3" /> Risk Increased
        </div>
      );
    }
    return (
      <div className="flex items-center text-green-400 font-medium text-xs bg-green-400/10 px-2 py-0.5 rounded gap-1">
        <ArrowDown className="w-3 h-3" /> Stable
      </div>
    );
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return <ArrowDown className="w-4 h-4 ml-1 opacity-20 group-hover:opacity-50 transition-opacity" />;
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4 ml-1 text-blue-400" /> : 
      <ChevronDown className="w-4 h-4 ml-1 text-blue-400" />;
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-200 p-6 md:p-8 font-sans">
      
      {/* Ambient background glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <Link to="/" className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 mb-4 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white flex items-center tracking-tight">
              <Database className="w-8 h-8 mr-3 text-blue-500" />
              Patient History
            </h1>
            <p className="text-slate-400 mt-2 text-sm font-medium">Review and analyze past patient predictions and risk trends.</p>
          </div>
          
          <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors border border-slate-700">
            <RefreshCw className="w-4 h-4" /> Refresh Data
          </button>
        </div>

        {/* Filters and Search Bar */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 shadow-lg w-full">
          
          {/* Search Box */}
          <div className="relative flex-1 group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all sm:text-sm shadow-inner"
              placeholder="Search by Patient Name or ID..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative min-w-[200px] group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <Filter className="h-4 w-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
            </div>
            <select
              value={statusFilter}
              onChange={handleFilterChange}
              className="block w-full pl-11 pr-10 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all sm:text-sm appearance-none cursor-pointer shadow-inner"
            >
              <option value="all">All Risk Levels</option>
              <option value="high">High Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="normal">Normal / Safe</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-10">
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden flex flex-col">
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-900/80 sticky top-0 z-10 backdrop-blur-md shadow-sm border-b border-slate-700/80">
                <tr>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer group" onClick={() => requestSort('name')}>
                      Patient Name <SortIcon columnKey="name" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer group" onClick={() => requestSort('riskScore')}>
                      Risk Score <SortIcon columnKey="riskScore" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Trend
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <div className="flex items-center cursor-pointer group" onClick={() => requestSort('date')}>
                      Prediction Date <SortIcon columnKey="date" />
                    </div>
                  </th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-slate-700/50">
                {processedData.length > 0 ? (
                  processedData.map((patient, index) => (
                    <tr 
                      key={patient.id} 
                      className="hover:bg-slate-700/30 transition-colors duration-200 group relative"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-slate-300 font-mono bg-slate-800/80 px-2 py-1 rounded">{patient.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300 font-bold text-xs mr-3 shadow-inner">
                            {patient.name.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{patient.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 font-medium">
                        {patient.age} yrs
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Activity className={`w-4 h-4 mr-2 ${patient.riskScore > 80 ? 'text-red-500' : patient.riskScore > 40 ? 'text-yellow-500' : 'text-green-500'}`} />
                          <span className={`text-sm font-bold ${patient.riskScore > 80 ? 'text-red-400' : 'text-slate-200'}`}>
                            {patient.riskScore}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(patient.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getTrendIcon(patient.trend)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400 flex items-center">
                        <Calendar className="w-4 h-4 mr-2 opacity-50" />
                        {formatDate(patient.date)}
                      </td>
                    </tr>
                  ))
                ) : (
                  // Empty State UI
                  <tr>
                    <td colSpan="7" className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                          <Search className="w-8 h-8 text-slate-500" />
                        </div>
                        <h3 className="text-lg font-semibold text-slate-200 mb-1">No patients found</h3>
                        <p className="text-slate-400 text-sm max-w-sm">We couldn't find any patient records matching your current search criteria or filters.</p>
                        <button 
                          onClick={() => { setSearchTerm(''); setStatusFilter('all'); }} 
                          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20"
                        >
                          Clear All Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Simple Pagination/Footer Indicator */}
          {processedData.length > 0 && (
            <div className="bg-slate-900/50 px-6 py-4 border-t border-slate-700/80 flex items-center justify-between">
              <span className="text-sm text-slate-400">
                Showing <span className="font-semibold text-white">{processedData.length}</span> results
              </span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1 bg-slate-800 text-slate-400 rounded hover:bg-slate-700 hover:text-white transition-colors text-sm disabled:opacity-50 cursor-not-allowed border border-slate-700" disabled>Previous</button>
                <button className="px-3 py-1 bg-slate-800 text-slate-400 rounded hover:bg-slate-700 hover:text-white transition-colors text-sm border border-slate-700">Next</button>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
