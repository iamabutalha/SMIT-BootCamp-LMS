import { useLocation } from 'react-router-dom';

export function RouteTransition({ children }) {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className="w-full transition-all duration-200 ease-out animate-in fade-in-50 slide-in-from-bottom-1"
    >
      {children}
    </div>
  );
}

export default RouteTransition;
