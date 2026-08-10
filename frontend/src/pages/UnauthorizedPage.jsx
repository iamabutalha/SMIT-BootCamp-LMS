import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { ROUTES } from '../constants/routes';

export function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
        <p className="text-slate-600 mb-6">
          You do not have permission to view this page. Please contact your administrator if you believe this is an error.
        </p>
        <Link
          to={ROUTES.ROOT}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
