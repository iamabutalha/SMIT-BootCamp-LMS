import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCurrentUserQuery } from '../../features/auth/api/authApi';
import { setCredentials, logout } from '../../features/auth/authSlice';
import { selectCurrentToken, selectCurrentUser } from '../../features/auth/authSelectors';
import { tokenStorage } from '../../utils/storageUtils';
import PageLoader from '../../components/common/PageLoader';

/**
 * AuthInitializer component
 * Validates stored token on initial application mount to restore user session cleanly
 * and prevents authentication flickering.
 */
export function AuthInitializer({ children }) {
  const dispatch = useDispatch();
  const tokenInStore = useSelector(selectCurrentToken);
  const userInStore = useSelector(selectCurrentUser);
  const tokenInStorage = tokenStorage.get();
  const activeToken = tokenInStore || tokenInStorage;
  const isDemoSession = Boolean(activeToken && String(activeToken).startsWith('demo_'));

  const {
    data: currentUserRes,
    isSuccess,
    isError,
    isLoading,
    isFetching,
  } = useGetCurrentUserQuery(undefined, {
    skip: !activeToken || isDemoSession,
  });

  useEffect(() => {
    if (!activeToken || isDemoSession) return;

    if (isSuccess && currentUserRes?.data) {
      dispatch(
        setCredentials({
          token: activeToken,
          user: currentUserRes.data,
        })
      );
    } else if (isError && !userInStore) {
      dispatch(logout());
    }
  }, [activeToken, isDemoSession, isSuccess, isError, currentUserRes, userInStore, dispatch]);

  if (activeToken && !isDemoSession && (isLoading || isFetching || (!isSuccess && !isError))) {
    return <PageLoader message="Restoring session..." />;
  }

  return children;
}

export default AuthInitializer;
