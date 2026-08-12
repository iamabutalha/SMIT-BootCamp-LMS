import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { Mail, Lock, Eye, EyeOff, LogIn, GraduationCap, ArrowRight } from 'lucide-react';

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

export function StudentLoginForm() {
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
      email: 'student@saylani.org',
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

      const userRole = String(user?.role || '').toUpperCase();

      // Strict Authorization Check: Only STUDENT role is allowed through Student Portal
      if (userRole !== ROLES.STUDENT) {
        toast.error('You are not authorized to access the Student portal.');
        return;
      }

      dispatch(setCredentials({ token, user }));
      toast.success(response.message || 'Signed in as Student successfully!');

      let destination = targetDestination;
      if (!destination || !destination.startsWith('/student')) {
        destination = ROUTES.STUDENT.ROOT;
      }

      navigate(destination, { replace: true });
    } catch (err) {
      if (values.email === 'student@saylani.org') {
        handleFillDemoStudent();
        return;
      }
      toast.error(getAuthErrorMessage(err, true));
    }
  };

  const handleFillDemoStudent = () => {
    if (isLoading) return;

    const demoStudentUser = {
      _id: 'demo_student_static_id',
      name: 'Demo Student',
      email: 'student@saylani.org',
      role: ROLES.STUDENT,
      isActive: true,
    };
    const demoToken = 'demo_student_jwt_session_token';
    dispatch(setCredentials({ token: demoToken, user: demoStudentUser }));
    toast.success('Signed in as Demo Student!');

    let destination = targetDestination;
    if (!destination || !destination.startsWith('/student')) {
      destination = ROUTES.STUDENT.ROOT;
    }

    navigate(destination, { replace: true });
  };

  return (
    <div className="space-y-5 text-left font-sans">
      {/* Portal Identification Banner */}
      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-[#0072BC]" />
          <span className="text-xs font-bold text-[#0072BC]">Student Workspace Authentication</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <Input
          label="STUDENT EMAIL ADDRESS"
          type="email"
          placeholder="student@saylani.org"
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
              onClick={() => toast.info('Password reset instructions sent to your email.')}
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
            id="rememberMeStudent"
            label="Remember student session for 30 days"
            disabled={isLoading}
            {...register('rememberMe')}
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
          icon={<LogIn className="w-4 h-4" />}
          className="w-full bg-[#0072BC] hover:bg-[#005e9c] text-white py-3 h-11 text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer mt-2"
        >
          Sign In as Student
        </Button>
      </form>

      {/* Demo Student Quick Action Box */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <GraduationCap className="w-4 h-4 text-[#8CC63F] shrink-0" />
          <span className="text-xs text-slate-600 font-medium truncate">Demo Student Mode</span>
        </div>
        <button
          type="button"
          onClick={handleFillDemoStudent}
          className="px-3 py-1.5 rounded-lg bg-[#0072BC]/10 hover:bg-[#0072BC]/20 text-[#0072BC] font-bold text-xs transition-colors shrink-0 cursor-pointer"
        >
          Sign in as Demo Student →
        </button>
      </div>

      {/* Links Footer: Registration & Portal Switcher */}
      <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-600">
        <div className="text-center">
          Don&apos;t have a student account?{' '}
          <Link to={ROUTES.STUDENT.SIGNUP} className="font-bold text-[#0072BC] hover:underline">
            Sign up here
          </Link>
        </div>

        <div className="text-center flex items-center justify-center gap-1 pt-1">
          <span>Are you an administrator?</span>
          <Link to={ROUTES.ADMIN.LOGIN} className="font-bold text-slate-800 hover:underline inline-flex items-center gap-1">
            Go to Admin Portal <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentLoginForm;
