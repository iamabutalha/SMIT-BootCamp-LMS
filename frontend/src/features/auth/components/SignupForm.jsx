import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { User, Mail, Lock, Phone, UserPlus } from 'lucide-react';

import { useRegisterMutation } from '../api/authApi';
import { setCredentials } from '../authSlice';
import { ProfileImageUpload } from './ProfileImageUpload';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';

const signupSchema = z
  .object({
    name: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().min(1, 'Email address is required').email('Invalid email address'),
    phone: z.string().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
    profileImage: z.any().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export function SignupForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      profileImage: null,
    },
  });

  const onSubmit = async (values) => {
    try {
      // API contract: POST /auth/register expects plain JSON — no file uploads.
      // Profile image can be updated later via PATCH /users/:id/profile-image.
      const bodyData = {
        name: values.name,
        email: values.email,
        password: values.password,
        phone: values.phone || undefined,
      };

      const response = await registerUser(bodyData).unwrap();
      const { token, user } = response.data || {};

      if (!token || !user) {
        throw new Error(response.message || 'Registration completed without session payload');
      }

      dispatch(setCredentials({ token, user }));
      toast.success(response.message || 'Account created successfully!');

      navigate(ROUTES.STUDENT.ROOT, { replace: true });
    } catch (err) {
      if (err?.status === 'FETCH_ERROR' || err?.error?.includes('Failed to fetch')) {
        toast.error('Unable to connect to server. Please check if backend API server is running on http://localhost:5000.');
      } else {
        toast.error(
          err?.data?.message || err?.message || 'Registration failed. Please check your details and try again.'
        );
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left font-sans">
      {/* Profile Image Picker */}
      <Controller
        name="profileImage"
        control={control}
        render={({ field }) => (
          <ProfileImageUpload
            value={field.value}
            onChange={field.onChange}
            error={errors.profileImage?.message}
            isDisabled={isLoading}
          />
        )}
      />

      {/* FULL NAME */}
      <Input
        label="FULL NAME"
        placeholder="Ali Jan"
        leftIcon={<User className="w-4 h-4 text-slate-400" />}
        error={errors.name?.message}
        {...register('name')}
      />

      {/* EMAIL ADDRESS */}
      <Input
        label="EMAIL ADDRESS"
        type="email"
        placeholder="student@saylani.org"
        leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
        error={errors.email?.message}
        {...register('email')}
      />

      {/* PHONE NUMBER (OPTIONAL) */}
      <Input
        label="PHONE NUMBER (OPTIONAL)"
        type="tel"
        placeholder="+92 300 1234567"
        leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
        error={errors.phone?.message}
        {...register('phone')}
      />

      {/* PASSWORD & CONFIRM PASSWORD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="PASSWORD"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
          error={errors.password?.message}
          {...register('password')}
        />

        <Input
          label="CONFIRM PASSWORD"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        icon={<UserPlus className="w-4 h-4" />}
        className="w-full bg-[#006B3C] hover:bg-[#005530] text-white py-3 h-12 text-base font-bold rounded-xl shadow-md transition-all mt-2"
      >
        Create Account
      </Button>

      {/* Footer Link */}
      <div className="text-center pt-3 text-xs text-slate-600">
        Already have an account?{' '}
        <Link to={ROUTES.LOGIN} className="font-bold text-[#006B3C] hover:underline">
          Sign in here
        </Link>
      </div>
    </form>
  );
}

export default SignupForm;
