'use client';

import Link from 'next/link';

function DashboardVisual() {
  return (
    <div className="w-full h-full bg-slate-200 rounded-2xl" />
  );
}

function ApiVisual() {
  return (
    <div className="w-full h-full bg-slate-200 rounded-2xl" />
  );
}

export function IntegrationSection() {
  return (
    <section className="py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Dashboard Card */}
        <div className="bg-slate-50 rounded-[2rem] p-6 md:p-8 flex flex-col">
          {/* Visual */}
          <div className="aspect-[4/3] w-full mb-8">
            <DashboardVisual />
          </div>

          {/* Content */}
          <div className="text-center flex-1 flex flex-col">
            <h3 className="font-jakarta font-semibold text-2xl md:text-3xl tracking-tight text-slate-900 mb-3">
              Use directly in the Dashboard
            </h3>
            <p className="font-manrope text-slate-500 mb-6 max-w-md mx-auto">
              No coding required. Upload, compress, and download your files with our intuitive web interface.
            </p>
            <div className="flex items-center justify-center gap-3 mt-auto">
              <Link
                href="/login"
                className="px-6 py-3 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-slate-800 transition-colors"
              >
                OPEN DASHBOARD
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-full font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                SIGN UP FREE
              </Link>
            </div>
          </div>
        </div>

        {/* API Card */}
        <div className="bg-slate-50 rounded-[2rem] p-6 md:p-8 flex flex-col">
          {/* Visual */}
          <div className="aspect-[4/3] w-full mb-8">
            <ApiVisual />
          </div>

          {/* Content */}
          <div className="text-center flex-1 flex flex-col">
            <h3 className="font-jakarta font-semibold text-2xl md:text-3xl tracking-tight text-slate-900 mb-3">
              Integrate with our API
            </h3>
            <p className="font-manrope text-slate-500 mb-6 max-w-md mx-auto">
              Build compression into your workflow with our simple REST API. SDKs available for all major languages.
            </p>
            <div className="flex items-center justify-center gap-3 mt-auto">
              <Link
                href="/docs"
                className="px-6 py-3 bg-slate-900 text-white rounded-full font-semibold text-sm hover:bg-slate-800 transition-colors"
              >
                VIEW DOCUMENTATION
              </Link>
              <Link
                href="/dashboard/keys"
                className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-full font-semibold text-sm hover:bg-slate-50 transition-colors"
              >
                GET API KEY
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
