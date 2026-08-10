import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft } from 'lucide-react';
import { ROUTES } from '../constants/routes';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div className="w-16 h-16 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileQuestion className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Page Not Found</h1>
        <p className="text-slate-600 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to={ROUTES.ROOT}
          className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
