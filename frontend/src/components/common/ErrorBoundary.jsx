import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs font-sans space-y-4 max-w-lg mx-auto my-6">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-100">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">
              {this.props.title || 'Something went wrong rendering this section'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {this.state.error?.message || 'An unexpected rendering error occurred.'}
            </p>
          </div>
          <Button
            type="button"
            onClick={() => this.setState({ hasError: false, error: null })}
            icon={<RefreshCw className="w-4 h-4" />}
            className="bg-[#006B3C] hover:bg-[#00522e] text-white text-xs font-bold py-2 px-4 rounded-xl cursor-pointer"
          >
            Retry Section
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
