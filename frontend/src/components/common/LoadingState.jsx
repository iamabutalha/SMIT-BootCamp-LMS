import Spinner from '../ui/Spinner';

export function LoadingState({ message = 'Loading contents...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 my-4 space-y-3">
      <Spinner size="lg" />
      {message && <p className="text-xs text-slate-500 font-medium">{message}</p>}
    </div>
  );
}

export default LoadingState;
