import AuthLayout from '@/layouts/AuthLayout';
import AdminLoginForm from '../components/AdminLoginForm';

export function AdminLogin() {
  return (
    <AuthLayout
      title="Admin Portal Workspace"
      subtitle="Sign in to your BootcampLMS administrative management portal."
    >
      <AdminLoginForm />
    </AuthLayout>
  );
}

export default AdminLogin;
