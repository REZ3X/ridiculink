import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LongURL } from '../../models/LongURL.js';
import { ExclamationTriangleIcon, HomeIcon } from '@heroicons/react/24/outline';

export default async function RedirectPage({ params }) {
  const { longerURL } = params;

  let urlDoc;
  
  try {
    urlDoc = await LongURL.findByLongUrl(longerURL);
  } catch (error) {
    console.error('Database error:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-pink-50 p-4">
        <div className="text-center p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md border border-white/20">
          <div className="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-6">
            <ExclamationTriangleIcon className="w-12 h-12 text-red-600" />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-800 mb-4">System Error</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            A critical error occurred while processing your ridiculously long URL. 
            Our quantum systems are experiencing temporal difficulties.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <HomeIcon className="w-5 h-5" />
            Return to Base
          </Link>
        </div>
      </div>
    );
  }

  if (!urlDoc) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-100 p-4">
        <div className="text-center p-8 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl max-w-md border border-white/20">
          <div className="inline-flex items-center justify-center p-4 bg-amber-100 rounded-full mb-6">
            <ExclamationTriangleIcon className="w-12 h-12 text-amber-600" />
          </div>
          <h1 className="text-3xl font-display font-bold text-slate-800 mb-4">URL Not Found</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            This magnificently enhanced URL has either expired or never existed 
            in our cryptographic database matrix.
          </p>
          <Link 
            href="/"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
          >
            <HomeIcon className="w-5 h-5" />
            Generate New URL
          </Link>
        </div>
      </div>
    );
  }

  redirect(urlDoc.originalUrl);
}