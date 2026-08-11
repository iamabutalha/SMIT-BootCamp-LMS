
import { AppRouter } from './app/router';
import { RouteLoader } from './components/common';
import LogoutConfirmModal from './components/common/LogoutConfirmModal';

export function App() {
  return (
    <>
      <RouteLoader />
      <LogoutConfirmModal />
      <AppRouter />
    </>
  );
}

export default App;


