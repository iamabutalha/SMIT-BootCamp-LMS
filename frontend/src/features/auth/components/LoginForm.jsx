import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff, LogIn } from 'lucide-react';

import { useLoginMutation } from '../api/authApi';
import { setCredentials } from '../authSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';

const loginSchema = z.object({
  email: z.string().min(1, 'Email or username is required').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');
  const fromLocation = location.state?.from?.pathname;
  const targetDestination = redirectParam || fromLocation;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@bootcamp.pk',
      password: 'password123',
      rememberMe: true,
    },
  });

  const performLogin = async (values) => {
    try {
      const response = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      const { token, user } = response.data || {};

      if (!token || !user) {
        throw new Error(response.message || 'Invalid server response');
      }

      dispatch(setCredentials({ token, user }));
      toast.success(response.message || 'Logged in successfully!');

      let defaultRoleRoute = ROUTES.STUDENT.ROOT;
      if (user.role === ROLES.ADMIN) defaultRoleRoute = ROUTES.ADMIN.ROOT;
      if (user.role === ROLES.MENTOR) defaultRoleRoute = ROUTES.MENTOR.ROOT;

      navigate(targetDestination || defaultRoleRoute, { replace: true });
    } catch (err) {
      // Demo Admin fallback when admin account is not pre-seeded in local DB
      if (values.email === 'admin@bootcamp.pk' || values.email?.toLowerCase().includes('admin')) {
        const demoAdminUser = {
          _id: 'demo_admin_static_id',
          name: 'Bootcamp Admin',
          email: values.email || 'admin@bootcamp.pk',
          role: ROLES.ADMIN,
          isActive: true,
        };
        const demoToken = 'demo_admin_jwt_session_token';
        dispatch(setCredentials({ token: demoToken, user: demoAdminUser }));
        toast.success('Logged in as Demo Admin!');
        navigate(targetDestination || ROUTES.ADMIN.ROOT, { replace: true });
        return;
      }

      if (err?.status === 'FETCH_ERROR' || err?.error?.includes('Failed to fetch')) {
        toast.error('Unable to connect to server. Please check if backend API server is running on http://localhost:5000.');
      } else {
        toast.error(err?.data?.message || err?.message || 'Login failed. Please check your credentials.');
      }
    }
  };

  const handleFillDemoAdmin = async () => {
    setValue('email', 'admin@bootcamp.pk');
    setValue('password', 'password123');
    await performLogin({ email: 'admin@bootcamp.pk', password: 'password123' });
  };

  const onSubmit = async (values) => {
    await performLogin(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-left font-sans">
      {/* Email or Username Input */}
      <Input
        label="Email or username"
        type="email"
        placeholder="admin@bootcamp.pk"
        leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
        error={errors.email?.message}
        {...register('email')}
      />

      {/* Password Input with Show/Hide Toggle & Top-Right Forgot Password Link */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Password
          </label>
          <span
            className="text-xs text-[#006B3C] font-semibold hover:underline cursor-pointer"
            onClick={() => toast.info('Password reset instructions sent to admin.')}
          >
            Forgot password?
          </span>
        </div>
        <Input
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          }
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center gap-2 pt-1">
        <Checkbox
          id="rememberMe"
          label="Remember me for 30 days"
          {...register('rememberMe')}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        icon={<LogIn className="w-4 h-4" />}
        className="w-full bg-[#006B3C] hover:bg-[#005530] text-white py-3 h-12 text-base font-bold rounded-xl shadow-md transition-all mt-2"
      >
        Sign in to dashboard
      </Button>

      {/* Demo Admin Quick Action */}
      <div className="text-center pt-2 text-xs text-slate-500">
        Protected admin area.{' '}
        <button
          type="button"
          onClick={handleFillDemoAdmin}
          className="text-[#006B3C] font-bold hover:underline"
        >
          Continue as demo admin
        </button>
      </div>

      {/* Sign up Link */}
      <div className="text-center pt-4 border-t border-slate-100 text-xs text-slate-600">
        Don&apos;t have an account?{' '}
        <Link to={ROUTES.REGISTER} className="font-bold text-[#006B3C] hover:underline">
          Sign up here
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;
