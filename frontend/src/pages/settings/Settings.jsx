import { useState } from "react";
import { Lock, Shield, User } from "lucide-react";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { useAppSelector } from "../../hooks";

function Settings() {
  const user = useAppSelector((state) => state.auth.user);

  const [name, setName] = useState(user?.name || "Bootcamp Admin");
  const [email, setEmail] = useState(user?.email || "admin@example.com");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setSuccessMsg("Profile information updated successfully.");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setSuccessMsg("Password changed successfully.");
    setCurrentPassword("");
    setNewPassword("");
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  return (
    <MainLayout
      title="Settings"
      subtitle="Manage your profile settings and security parameters."
    >
      <div className="mx-auto max-w-4xl space-y-6">
        <PageHeader
          title="Account Settings"
          subtitle="Configure your profile, security preferences, and portal details."
        />

        {successMsg && (
          <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-4 text-xs font-semibold text-emerald-600">
            {successMsg}
          </div>
        )}

        {/* Profile Settings Card */}
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <User className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-base font-semibold text-text">
                Personal Information
              </h2>
              <p className="text-xs text-text-muted">
                Update your display name and email address.
              </p>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} className="mt-6 space-y-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />

            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="md">
                Save Changes
              </Button>
            </div>
          </form>
        </div>

        {/* Security Settings Card */}
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Lock className="h-5 w-5 text-amber-500" />
            <div>
              <h2 className="text-base font-semibold text-text">
                Security & Password
              </h2>
              <p className="text-xs text-text-muted">
                Update your password to keep your administrator account secure.
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordUpdate} className="mt-6 space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <Input
              label="New Password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <div className="flex justify-end pt-2">
              <Button type="submit" variant="primary" size="md">
                Update Password
              </Button>
            </div>
          </form>
        </div>

        {/* System Info Card */}
        <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex items-center gap-3 border-b border-border pb-4">
            <Shield className="h-5 w-5 text-indigo-500" />
            <div>
              <h2 className="text-base font-semibold text-text">
                System Role & Permissions
              </h2>
              <p className="text-xs text-text-muted">
                Your portal access level in Saylani Bootcamp LMS.
              </p>
            </div>
          </div>

          <div className="mt-4 space-y-2 text-xs text-text">
            <div className="flex justify-between py-1">
              <span className="font-medium text-text-muted">Role</span>
              <span className="font-semibold text-primary uppercase">
                {user?.role || "ADMIN"}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="font-medium text-text-muted">Application Version</span>
              <span className="font-mono text-text">v1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Settings;
