'use client';

import { useState } from 'react';
import { 
  LinkIcon, 
  SparklesIcon, 
  ClipboardDocumentIcon, 
  CheckIcon,
  ClockIcon,
  ShieldCheckIcon,
  CpuChipIcon,
  GlobeAltIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const [url, setUrl] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/longerner', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      setResult(data);
      setUrl('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${text}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-4 ridiculink-glass rounded-full mb-8 animate-float">
            <LinkIcon className="w-12 h-12 text-indigo-600" />
          </div>
          
          <h1 className="text-6xl md:text-7xl font-display font-black mb-6 ridiculink-text-gradient">
            Ridiculink
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
            The world&apos;s most <span className="font-bold text-indigo-600">sophisticated</span> URL lengthener. 
            Transform boring short URLs into <span className="font-bold text-purple-600">cryptographically enhanced</span>, 
            enterprise-grade hyperlinks.
          </p>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <ShieldCheckIcon className="w-4 h-4" />
              <span>Quantum Encrypted</span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CpuChipIcon className="w-4 h-4" />
              <span>AI Optimized</span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <GlobeAltIcon className="w-4 h-4" />
              <span>Enterprise Grade</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="ridiculink-glass ridiculink-shadow rounded-3xl p-8 md:p-12 mb-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="url" className="block text-lg font-semibold text-slate-700 mb-4">
                  Enter your insufficiently descriptive URL
                </label>
                <div className="relative">
                  <input
                    type="url"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="w-full px-6 py-5 text-lg border-2 border-slate-200 rounded-2xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none font-mono bg-white/70"
                    required
                  />
                  <LinkIcon className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 text-slate-400" />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full ridiculink-gradient text-white text-lg font-bold py-5 px-8 rounded-2xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] animate-glow"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                    <span>Generating Magnificent URL...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-3">
                    <SparklesIcon className="w-6 h-6" />
                    <span>Transform to Ridiculous Length</span>
                    <ArrowRightIcon className="w-6 h-6" />
                  </div>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-8 p-6 bg-red-50 border-l-4 border-red-500 rounded-xl">
                <div className="flex items-center gap-3">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>

          {result && (
            <div className="ridiculink-glass ridiculink-shadow rounded-3xl p-8 md:p-12 border-2 border-green-200/50">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-green-100 rounded-full mb-4">
                  <CheckIcon className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-3xl font-display font-bold text-slate-800 mb-2">
                  {result.isExisting ? 'Existing URL Retrieved!' : 'Successfully Transformed!'}
                </h2>
                <p className="text-slate-600 text-lg">
                  {result.isExisting 
                    ? 'This URL was already magnificently lengthened and remains valid.'
                    : 'Your URL has been cryptographically enhanced and enterprise-optimized!'
                  }
                </p>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200">
                  <h3 className="font-bold text-slate-700 mb-3 text-sm uppercase tracking-wider">Original URL</h3>
                  <p className="text-blue-600 break-all font-mono text-sm bg-white p-4 rounded-xl border">{result.originalUrl}</p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
                  <h3 className="font-bold text-slate-700 mb-4 text-sm uppercase tracking-wider">Enterprise-Grade Enhanced URL</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 text-indigo-700 break-all font-mono text-sm bg-white p-4 rounded-xl border border-indigo-200 max-h-32 overflow-y-auto">
                      {window.location.origin}/{result.longUrl}
                    </div>
                    <button
                      onClick={() => copyToClipboard(result.longUrl)}
                      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 whitespace-nowrap ${
                        copied 
                          ? 'bg-green-600 text-white' 
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {copied ? (
                        <>
                          <CheckIcon className="w-5 h-5" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <ClipboardDocumentIcon className="w-5 h-5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="bg-amber-50/80 rounded-2xl p-6 border-l-4 border-amber-400">
                  <div className="flex items-center gap-3 mb-2">
                    <ClockIcon className="w-6 h-6 text-amber-600" />
                    <h3 className="font-bold text-slate-700 text-sm uppercase tracking-wider">Expiration Protocol</h3>
                  </div>
                  <p className="text-slate-600">
                    This cryptographically enhanced URL will expire on{' '}
                    <span className="font-bold text-amber-700">
                      {formatDate(result.expiresAt)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="max-w-7xl mx-auto mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-slate-800 mb-4">
              Why Choose Ridiculink?
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Professional-grade URL lengthening with enterprise security standards
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="ridiculink-glass rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-4 text-slate-800">Magnificently Verbose</h3>
              <p className="text-slate-600 leading-relaxed">
                Transform concise URLs into extraordinarily descriptive, 
                cryptographically enhanced hyperlinks with quantum-level verbosity.
              </p>
            </div>
            
            <div className="ridiculink-glass rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <ClockIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-4 text-slate-800">Temporal Optimization</h3>
              <p className="text-slate-600 leading-relaxed">
                Advanced 7-day expiration protocols ensure optimal performance 
                and prevent dimensional URL overflow in the hyperlink matrix.
              </p>
            </div>
            
            <div className="ridiculink-glass rounded-2xl p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <CpuChipIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-display font-bold mb-4 text-slate-800">Intelligent Recycling</h3>
              <p className="text-slate-600 leading-relaxed">
                AI-powered deduplication algorithms detect existing enhanced URLs, 
                preventing redundant cryptographic processing overhead.
              </p>
            </div>
          </div>
        </div>

        <footer className="text-center mt-24 py-12 border-t border-slate-200">
          <div className="max-w-2xl mx-auto">
            <p className="text-slate-600 mb-4">
              Engineered with precision for those who appreciate unnecessarily sophisticated URL architecture
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <span>Powered by</span>
              <span className="font-mono bg-slate-100 px-2 py-1 rounded">MongoDB Atlas</span>
              <span>•</span>
              <span className="font-mono bg-slate-100 px-2 py-1 rounded">Next.js 15</span>
              <span>•</span>
              <span className="font-mono bg-slate-100 px-2 py-1 rounded">Quantum Encryption</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}