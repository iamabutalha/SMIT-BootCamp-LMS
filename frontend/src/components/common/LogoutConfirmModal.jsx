import { LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

export function LogoutConfirmModal() {
  const { isLogoutModalOpen, confirmLogout, cancelLogout } = useAuth();

  if (!isLogoutModalOpen) return null;

  return (
    <Modal
      isOpen={isLogoutModalOpen}
      onClose={cancelLogout}
      maxWidth="max-w-md"
    >
      <div className="text-center space-y-4 font-sans">
        {/* Soft Red Danger Icon Badge */}
        <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-100 shadow-2xs">
          <LogOut className="w-7 h-7" />
        </div>

        {/* Header & Subtitle */}
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900">Sign Out of LMS?</h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
            Are you sure you want to end your session? You will need to sign in again to access your LMS workspace.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-3">
          <Button
            type="button"
            variant="outline"
            fullWidth
            onClick={cancelLogout}
            className="w-full border-slate-200 text-slate-700 hover:bg-slate-50 py-2.5 h-10 text-xs font-semibold rounded-xl cursor-pointer"
          >
            Cancel
          </Button>

          <Button
            type="button"
            fullWidth
            onClick={confirmLogout}
            icon={<LogOut className="w-4 h-4" />}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 h-10 text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Yes, Sign Out
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default LogoutConfirmModal;
