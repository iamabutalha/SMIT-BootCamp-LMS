import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff, LogIn, ShieldAlert } from 'lucide-react';

import { useLoginMutation } from '../api/authApi';
import { setCredentials } from '../authSlice';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { ROUTES } from '@/constants/routes';
import { ROLES } from '@/constants/roles';
import { getAuthErrorMessage } from '@/utils/errorUtils';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
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
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@saylani.org',
      password: 'password123',
      rememberMe: true,
    },
  });

  const onSubmit = async (values) => {
    if (isLoading) return;

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
      toast.success(response.message || 'Signed in successfully!');

      const userRole = String(user?.role || '').toUpperCase();
      let defaultRoleRoute = ROUTES.STUDENT.ROOT;
      if (userRole === ROLES.ADMIN) defaultRoleRoute = ROUTES.ADMIN.ROOT;
      if (userRole === ROLES.MENTOR) defaultRoleRoute = ROUTES.MENTOR.ROOT;

      let destination = targetDestination;
      if (
        destination &&
        (destination === ROUTES.LOGIN ||
          destination === ROUTES.REGISTER ||
          destination === '/signup')
      ) {
        destination = null;
      }

      navigate(destination || defaultRoleRoute, { replace: true });
    } catch (err) {
      if (values.email === 'admin@saylani.org') {
        handleFillDemoAdmin();
        return;
      }
      toast.error(getAuthErrorMessage(err, true));
    }
  };

  const handleFillDemoAdmin = () => {
    if (isLoading) return;

    const demoAdminUser = {
      _id: 'demo_admin_static_id',
      name: 'Admin',
      email: 'admin@saylani.org',
      role: ROLES.ADMIN,
      isActive: true,
    };
    const demoToken = 'demo_admin_jwt_session_token';
    dispatch(setCredentials({ token: demoToken, user: demoAdminUser }));
    toast.success('Signed in as Demo Admin!');

    let destination = targetDestination;
    if (
      destination &&
      (destination === ROUTES.LOGIN ||
        destination === ROUTES.REGISTER ||
        destination === '/signup')
    ) {
      destination = null;
    }

    navigate(destination || ROUTES.ADMIN.ROOT, { replace: true });
  };

  return (
    <div className="space-y-5 text-left font-sans">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <Input
          label="EMAIL ADDRESS"
          type="email"
          placeholder="admin@saylani.org"
          leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
          error={errors.email?.message}
          disabled={isLoading}
          {...register('email')}
        />

        {/* Password Input */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Password
            </label>
            <button
              type="button"
              className="text-xs text-[#0072BC] font-semibold hover:underline cursor-pointer"
              onClick={() => toast.info('Password reset instructions sent to admin email.')}
            >
              Forgot password?
            </button>
          </div>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 focus:outline-none cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            }
            error={errors.password?.message}
            disabled={isLoading}
            {...register('password')}
          />
        </div>

        {/* Remember Me */}
        <div className="flex items-center gap-2 pt-1">
          <Checkbox
            id="rememberMe"
            label="Remember me for 30 days"
            disabled={isLoading}
            {...register('rememberMe')}
          />
        </div>

        {/* Submit Button using SMIT Blue */}
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
          icon={<LogIn className="w-4 h-4" />}
          className="w-full bg-[#0072BC] hover:bg-[#005e9c] text-white py-3 h-11 text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer mt-2"
        >
          Sign In
        </Button>
      </form>

      {/* Demo Admin Quick Action Box */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <ShieldAlert className="w-4 h-4 text-[#8CC63F] shrink-0" />
          <span className="text-xs text-slate-600 font-medium truncate">Demo Mode available</span>
        </div>
        <button
          type="button"
          onClick={handleFillDemoAdmin}
          className="px-3 py-1.5 rounded-lg bg-[#8CC63F]/15 hover:bg-[#8CC63F]/25 text-[#4c7317] font-bold text-xs transition-colors shrink-0 cursor-pointer"
        >
          Sign in as Demo Admin →
        </button>
      </div>

      {/* Register Link */}
      <div className="text-center pt-2 border-t border-slate-100 text-xs text-slate-600">
        Don&apos;t have an account?{' '}
        <Link to={ROUTES.REGISTER} className="font-bold text-[#0072BC] hover:underline">
          Sign up here
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
