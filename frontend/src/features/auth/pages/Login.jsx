import AuthLayout from '@/layouts/AuthLayout';
import LoginForm from '../components/LoginForm';

export function Login() {
  return (
    <AuthLayout
      title="Welcome back, Admin"
      subtitle="Sign in to your BootcampLMS admin workspace."
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;
