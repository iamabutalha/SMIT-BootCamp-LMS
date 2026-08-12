import AuthLayout from '@/layouts/AuthLayout';
import SignupForm from '../components/SignupForm';

export function Signup() {
  return (
    <AuthLayout
      title="Create Student Account"
      subtitle="Join the Saylani Mass IT Training (SMIT) Bootcamp LMS Student Workspace."
    >
      <SignupForm />
    </AuthLayout>
  );
}

export default Signup;
