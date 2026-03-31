import React, { useState } from 'react';
import { Search, Loader2, Building, ShieldCheck, AlertTriangle } from 'lucide-react';

const CompanyVerifier = () => {
  const [companyName, setCompanyName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!companyName.trim()) {
      setError('Please enter a company name.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const apiUrl = baseUrl.endsWith('/api') 
        ? `${baseUrl}/verify-company`
        : `${baseUrl}/api/verify-company`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName })
      });

      if (!response.ok) {
        throw new Error('Failed to verify company.');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message || 'An error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#131316] text-[#F5F0E8] p-6 lg:p-10 font-sans">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Building className="text-[#C9A84C] w-8 h-8" />
            <h1 className="text-3xl font-bold tracking-tight">Real Indian Company Verifier</h1>
          </div>
          <p className="text-[#9AB5A8]">
            Verify if a company is registered and active in our database of 500+ real Indian companies.
          </p>
        </div>

        {/* Search Box */}
        <div className="bg-[#1A2E25] border border-[#2D4A3E] rounded-2xl p-6 shadow-xl">
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-[#9AB5A8] mb-1.5">
                Company Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#6B8A7A]" />
                </div>
                <input
                  type="text"
                  id="companyName"
                  className="block w-full pl-11 pr-4 py-3.5 bg-[#131316] border border-[#2D4A3E] rounded-xl text-[#F5F0E8] placeholder-[#6B8A7A] focus:outline-none focus:ring-2 focus:ring-[#C9A84C] focus:border-transparent transition-all"
                  placeholder="e.g. Tata Consultancy Services, Infosys, Wipro..."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-400 mt-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading || !companyName.trim()}
              className="w-full flex justify-center items-center py-3.5 px-4 rounded-xl text-sm font-bold text-[#131316] bg-[#C9A84C] hover:bg-[#D4B663] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1A2E25] focus:ring-[#C9A84C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Verifying...
                </>
              ) : (
                'Verify Company'
              )}
            </button>
          </form>
        </div>

        {/* Results */}
        {result && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
            {result.isVerified ? (
              <div className="bg-[#1A2E25] border border-[#4CAF7D] rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#4CAF7D] opacity-10 rounded-bl-full pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="bg-[#4CAF7D]/20 p-3 rounded-xl border border-[#4CAF7D]/30">
                    <ShieldCheck className="h-8 w-8 text-[#4CAF7D]" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div>
                      <h3 className="text-xl font-bold text-[#4CAF7D]">Verified Real Company</h3>
                      <p className="text-[#9AB5A8] text-sm mt-1">This company appears in our verified registry.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#2D4A3E]">
                      <div>
                        <p className="text-xs text-[#6B8A7A] uppercase tracking-wider font-semibold">Registered Name</p>
                        <p className="text-[#F5F0E8] font-medium mt-1">{result.companyName}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6B8A7A] uppercase tracking-wider font-semibold">CIN</p>
                        <p className="text-[#F5F0E8] font-medium mt-1 font-mono text-sm">{result.CIN}</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6B8A7A] uppercase tracking-wider font-semibold">Status</p>
                        <p className="mt-1">
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#4CAF7D]/20 text-[#4CAF7D] border border-[#4CAF7D]/30">
                            {result.status}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-[#6B8A7A] uppercase tracking-wider font-semibold">Trust Score</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-[#F5F0E8] font-bold">{result.verificationScore}/100</p>
                          <div className="flex-1 h-2 bg-[#131316] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#4CAF7D]" 
                              style={{ width: `${result.verificationScore}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-[#2a1b1b] border border-[#E05C5C]/50 rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E05C5C] opacity-5 rounded-bl-full pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="bg-[#E05C5C]/20 p-3 rounded-xl border border-[#E05C5C]/30">
                    <AlertTriangle className="h-8 w-8 text-[#E05C5C]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-[#E05C5C]">Not Found</h3>
                    <p className="text-[#F5F0E8]">{result.warning || "Company could not be verified."}</p>
                    <p className="text-[#9AB5A8] text-sm pt-2">
                      We couldn't find an exact or partial match in our directory. This does not mean it's definitely fake, but you should proceed with caution and request corporate verification independently.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyVerifier;
