import React, { useState } from 'react';
import { Upload, FileSpreadsheet, Download, Printer, CheckCircle2, AlertCircle, RefreshCw, Search, Filter } from 'lucide-react';

export default function BatchPrediction({ onBatchPredict, batchResults, loading }) {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState('ALL');
  const [errorMsg, setErrorMsg] = useState(null);

  const sampleCSVTemplate = `customer_id,age,gender,subscription_type,watch_hours,last_login_days,region,monthly_fee,number_of_profiles,avg_watch_time_per_day,favorite_genre
c-1001,45,Male,Basic,3.5,42,North America,8.99,1,0.15,Action
c-1002,28,Female,Premium,72.0,2,Europe,17.99,4,2.40,Sci-Fi
c-1003,58,Other,Standard,14.2,28,South America,13.99,2,0.45,Drama
c-1004,32,Female,Basic,8.0,18,Asia,8.99,1,0.25,Comedy
c-1005,62,Male,Premium,4.5,52,Africa,17.99,1,0.10,Horror`;

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) processFile(selected);
  };

  const processFile = (selectedFile) => {
    if (!selectedFile.name.endsWith('.csv')) {
      setErrorMsg('Please select a valid CSV file.');
      return;
    }
    setErrorMsg(null);
    setFile(selectedFile);
    onBatchPredict(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const downloadSampleTemplate = () => {
    const blob = new Blob([sampleCSVTemplate], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'netflix_churn_batch_sample.csv';
    a.click();
  };

  const downloadResultsCSV = () => {
    if (!batchResults || !batchResults.predictions) return;

    const items = batchResults.predictions;
    const headers = Object.keys(items[0]).join(',');
    const rows = items.map(item => Object.values(item).map(v => `"${v}"`).join(','));
    const csvContent = [headers, ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `churn_predictions_export_${Date.now()}.csv`;
    a.click();
  };

  const handlePrintPDF = () => {
    window.print();
  };

  const filteredPredictions = batchResults?.predictions?.filter(item => {
    const matchesSearch = String(item.customer_id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          String(item.favorite_genre || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = riskFilter === 'ALL' || item.risk_level === riskFilter;
    return matchesSearch && matchesRisk;
  }) || [];

  return (
    <div className="space-y-8">
      
      {/* CSV File Upload Card */}
      <div className="glass-card p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <FileSpreadsheet className="w-6 h-6 text-indigo-400" />
              <span>Batch Customer CSV Scoring</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">Upload CSV datasets to calculate churn probability for thousands of users</p>
          </div>

          <button
            onClick={downloadSampleTemplate}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-300 text-xs font-semibold flex items-center space-x-2 border border-slate-700 transition-all w-fit"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Sample CSV Template</span>
          </button>
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all cursor-pointer ${
            dragOver ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 hover:border-slate-700 bg-slate-900/40'
          }`}
        >
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
            id="csv-upload-input"
          />
          <label htmlFor="csv-upload-input" className="cursor-pointer space-y-3 block">
            <div className="w-14 h-14 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
              <Upload className="w-7 h-7" />
            </div>
            <div>
              <span className="text-sm font-bold text-white">Click to browse CSV file</span>
              <span className="text-xs text-slate-400 block mt-1">or drag and drop CSV file directly here</span>
            </div>
            <p className="text-[11px] text-slate-500">Supports standard customer schema: age, gender, subscription_type, watch_hours, last_login_days, region, monthly_fee, number_of_profiles, avg_watch_time_per_day, favorite_genre</p>
          </label>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center space-x-3 py-6 text-indigo-400 text-sm font-semibold">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>Processing CSV Batch Scoring...</span>
          </div>
        )}
      </div>

      {/* Batch Results Overview */}
      {batchResults && (
        <div className="space-y-6">
          
          {/* Summary KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-slate-800 text-center">
              <span className="text-xs text-slate-400 font-semibold uppercase">Total Scored</span>
              <div className="text-3xl font-extrabold text-white mt-1">{batchResults.summary.total_customers}</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-rose-500/30 bg-rose-950/10 text-center">
              <span className="text-xs text-rose-300 font-semibold uppercase">Predicted Churn</span>
              <div className="text-3xl font-extrabold text-rose-400 mt-1">{batchResults.summary.predicted_churn_count}</div>
              <div className="text-[11px] text-rose-300">{batchResults.summary.churn_rate_percent}% churn rate</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-amber-500/30 bg-amber-950/10 text-center">
              <span className="text-xs text-amber-300 font-semibold uppercase">High Risk Users</span>
              <div className="text-3xl font-extrabold text-amber-400 mt-1">{batchResults.summary.high_risk_count}</div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-indigo-500/30 text-center">
              <span className="text-xs text-indigo-300 font-semibold uppercase">Avg Churn Prob</span>
              <div className="text-3xl font-extrabold text-indigo-400 mt-1">{batchResults.summary.average_churn_probability}%</div>
            </div>
          </div>

          {/* Interactive Results Table */}
          <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search Customer ID / Genre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500 w-64"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={riskFilter}
                    onChange={(e) => setRiskFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="ALL">All Risk Tiers</option>
                    <option value="HIGH">High Risk Only</option>
                    <option value="MEDIUM">Medium Risk Only</option>
                    <option value="LOW">Low Risk Only</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={downloadResultsCSV}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center space-x-2 shadow-md transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Scored CSV</span>
                </button>

                <button
                  onClick={handlePrintPDF}
                  className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1.5 border border-slate-700 transition-all"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Report</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Customer ID</th>
                    <th className="py-3 px-4">Sub Tier</th>
                    <th className="py-3 px-4">Last Login</th>
                    <th className="py-3 px-4">Avg Watch Time</th>
                    <th className="py-3 px-4">Prediction</th>
                    <th className="py-3 px-4">Probability</th>
                    <th className="py-3 px-4">Risk Level</th>
                    <th className="py-3 px-4">Suggested Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredPredictions.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-white">{row.customer_id || `User-${idx+1}`}</td>
                      <td className="py-3 px-4 text-slate-300">{row.subscription_type}</td>
                      <td className="py-3 px-4 text-slate-300">{row.last_login_days} days ago</td>
                      <td className="py-3 px-4 text-slate-300">{row.avg_watch_time_per_day} hrs/day</td>
                      <td className="py-3 px-4 font-semibold">
                        <span className={`px-2 py-0.5 rounded text-[11px] ${row.churn_prediction === 'Will Churn' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'}`}>
                          {row.churn_prediction}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-white">{row['churn_probability_%']}%</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          row.risk_level === 'HIGH' ? 'bg-rose-500/20 text-rose-400' : (row.risk_level === 'MEDIUM' ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400')
                        }`}>
                          {row.risk_level}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-indigo-300 font-medium">{row.suggested_action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
