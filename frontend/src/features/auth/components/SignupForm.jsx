import { useNavigate, Link } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { User, Mail, Lock, Phone, UserPlus } from 'lucide-react';

import { useRegisterMutation, useUpdateProfileImageMutation } from '../api/authApi';
import { setCredentials } from '../authSlice';
import { ProfileImageUpload } from './ProfileImageUpload';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { getAuthErrorMessage } from '@/utils/errorUtils';

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
  const [registerUser, { isLoading: isRegistering }] = useRegisterMutation();
  const [updateProfileImage, { isLoading: isUploadingImage }] = useUpdateProfileImageMutation();

  const isSubmitting = isRegistering || isUploadingImage;

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
    if (isSubmitting) return;

    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('password', values.password);
      if (values.phone) {
        formData.append('phone', values.phone);
      }
      if (values.profileImage && values.profileImage instanceof File) {
        formData.append('profileImage', values.profileImage);
      }

      const response = await registerUser(formData).unwrap();
      const { token, user } = response.data || {};

      if (!token || !user) {
        toast.success(response.message || 'Account created successfully! Please sign in.');
        navigate(ROUTES.STUDENT.LOGIN, { replace: true });
        return;
      }

      dispatch(setCredentials({ token, user }));
      toast.success(response.message || 'Account created successfully!');

      navigate(ROUTES.STUDENT.ROOT, { replace: true });
    } catch (err) {
      toast.error(getAuthErrorMessage(err, false));
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
            isDisabled={isSubmitting}
          />
        )}
      />

      {/* FULL NAME */}
      <Input
        label="FULL NAME"
        placeholder="Ali Jan"
        leftIcon={<User className="w-4 h-4 text-slate-400" />}
        error={errors.name?.message}
        disabled={isSubmitting}
        {...register('name')}
      />

      {/* EMAIL ADDRESS */}
      <Input
        label="EMAIL ADDRESS"
        type="email"
        placeholder="student@saylani.org"
        leftIcon={<Mail className="w-4 h-4 text-slate-400" />}
        error={errors.email?.message}
        disabled={isSubmitting}
        {...register('email')}
      />

      {/* PHONE NUMBER */}
      <Input
        label="PHONE NUMBER (OPTIONAL)"
        type="tel"
        placeholder="+92 300 1234567"
        leftIcon={<Phone className="w-4 h-4 text-slate-400" />}
        error={errors.phone?.message}
        disabled={isSubmitting}
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
          disabled={isSubmitting}
          {...register('password')}
        />

        <Input
          label="CONFIRM PASSWORD"
          type="password"
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4 text-slate-400" />}
          error={errors.confirmPassword?.message}
          disabled={isSubmitting}
          {...register('confirmPassword')}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        isLoading={isSubmitting}
        icon={<UserPlus className="w-4 h-4" />}
        className="w-full bg-[#0072BC] hover:bg-[#005e9c] text-white py-3 h-11 text-sm font-extrabold rounded-xl shadow-xs transition-all cursor-pointer mt-2"
      >
        Create Account
      </Button>

      {/* Footer Link */}
      <div className="text-center pt-2 text-xs text-slate-600">
        Already have an account?{' '}
        <Link to={ROUTES.STUDENT.LOGIN} className="font-bold text-[#0072BC] hover:underline">
          Sign in here
        </Link>
      </div>
    </form>
  );
}

export default SignupForm;
