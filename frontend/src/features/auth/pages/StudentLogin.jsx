import AuthLayout from '@/layouts/AuthLayout';
import StudentLoginForm from '../components/StudentLoginForm';

export function StudentLogin() {
  return (
    <AuthLayout
      title="Student Portal Workspace"
      subtitle="Sign in to your BootcampLMS student workspace to view courses and assignments."
    >
      <StudentLoginForm />
    </AuthLayout>
  );
}

export default StudentLogin;
