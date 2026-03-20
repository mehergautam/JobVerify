import React, { useState } from 'react';
import Layout from '../components/Layout';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { ScrollText, Loader2, CheckCircle2, XCircle, AlertCircle, ShieldCheck } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function ScoreBadge({ score }) {
  const isGood = score >= 70;
  const isMed = score >= 40;
  const color = isGood ? 'text-emerald' : isMed ? 'text-amber-500' : 'text-red-500';
  const bg = isGood ? 'bg-emerald/10 border-emerald/20' : isMed ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200';
  const label = isGood ? 'Highly Legitimate' : isMed ? 'Somewhat Suspicious' : 'Likely Fraudulent';
  return (
    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border font-bold ${bg} ${color}`}>
      {isGood ? <CheckCircle2 size={16} /> : isMed ? <AlertCircle size={16} /> : <XCircle size={16} />}
      {label} ({score}/100)
    </div>
  );
}

function OfferVerifier() {
  const [offerText, setOfferText] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!offerText.trim()) return toast.error('Please paste your offer letter text');
    setIsLoading(true);
    setResult(null);
    try {
      const res = await axios.post(`${API_URL}/tools/offer-verify`, { offerText });
      setResult(res.data);
      toast.success('Offer letter analyzed!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to verify offer letter.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout pageTitle="Offer Letter Verifier">
      <div className="space-y-6 pb-10">
        <div className="glass-card p-6 border-l-4 border-amber-500">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <ScrollText size={22} className="text-amber-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy">Offer Letter Verifier</h2>
              <p className="text-slate-500 text-sm mt-1">Paste your job offer and get an instant legitimacy check, red flag detection, and key term extraction.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 glass-card p-6 space-y-4">
            <label className="block text-sm font-bold text-slate-700 mb-2">Offer Letter Text <span className="text-red-400">*</span></label>
            <textarea
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm resize-none"
              placeholder="Paste the complete text of the offer letter here..."
              rows={14}
              value={offerText}
              onChange={e => setOfferText(e.target.value)}
            />
            <button
              onClick={handleVerify}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {isLoading ? <><Loader2 size={18} className="animate-spin" /> Verifying...</> : <><ShieldCheck size={18} /> Verify Offer Letter</>}
            </button>
          </div>
          <div className="space-y-4">
            <div className="glass-card p-5">
              <h3 className="font-bold text-navy mb-3 text-sm">What We Check</h3>
              <ul className="space-y-2 text-sm text-slate-500">
                {['Standard legal clauses', 'Company information completeness', 'Suspicious payment requests', 'Missing compensation details', 'Unrealistic promises', 'Contact & verification details'].map((t, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle2 size={13} className="text-amber-500 mt-0.5 flex-shrink-0" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="glass-card p-5 bg-red-50/50">
              <p className="text-xs font-bold text-red-600 mb-2 flex items-center gap-1"><AlertCircle size={13} />Common Scam Signs</p>
              <ul className="text-xs text-slate-500 space-y-1">
                {['Asking for fees upfront', 'No company address', 'Immediate start without interview', 'Unusually high salary'].map((t, i) => <li key={i}>• {t}</li>)}
              </ul>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="glass-card p-12 flex flex-col items-center gap-4">
            <div className="relative w-14 h-14">
              <div className="absolute inset-0 rounded-full border-4 border-slate-100"></div>
              <div className="absolute inset-0 rounded-full border-4 border-amber-500 border-t-transparent animate-spin"></div>
            </div>
            <p className="font-bold text-navy animate-pulse">Analyzing offer letter with AI...</p>
          </div>
        )}

        {result && (
          <div className="glass-card p-6 space-y-5 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-navy">Verification Result</h3>
              <ScoreBadge score={result.trustScore || 0} />
            </div>
            {result.keyTerms && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[['Role', result.keyTerms.role], ['Salary', result.keyTerms.salary], ['Benefits', result.keyTerms.benefits?.join(', ')]].map(([label, val]) => (
                  <div key={label} className="p-4 bg-slate-50 rounded-xl">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
                    <p className="font-bold text-navy text-sm">{val || 'Not Found'}</p>
                  </div>
                ))}
              </div>
            )}
            {result.redFlags?.length > 0 && (
              <div>
                <h4 className="font-bold text-red-600 mb-2 flex items-center gap-2"><AlertCircle size={16} />Red Flags</h4>
                <div className="space-y-2">
                  {result.redFlags.map((f, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                      <XCircle size={14} className="text-red-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-slate-700">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {result.recommendation && (
              <div className="p-4 bg-blue-50 rounded-xl">
                <p className="text-sm font-bold text-blue-700 mb-1">Our Recommendation</p>
                <p className="text-sm text-slate-700">{result.recommendation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default OfferVerifier;
