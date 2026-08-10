import { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

function GlobalEventListener({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleUnauthorized = () => {
      dispatch(logout());
    };

    window.addEventListener('smit:unauthorized', handleUnauthorized);
    return () => {
      window.removeEventListener('smit:unauthorized', handleUnauthorized);
    };
  }, [dispatch]);

  return children;
}

export function AppProviders({ children }) {
  return (
    <Provider store={store}>
      <GlobalEventListener>
        <BrowserRouter>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </BrowserRouter>
      </GlobalEventListener>
    </Provider>
  );
}

export default AppProviders;
