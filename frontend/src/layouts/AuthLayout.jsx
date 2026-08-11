import { Users, CalendarCheck, BookOpen, ShieldCheck } from 'lucide-react';
import Logo from '@/components/common/Logo';

export function AuthLayout({
  children,
  title = 'Welcome back, Admin',
  subtitle = 'Sign in to your SMIT Bootcamp LMS workspace.',
}) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-12 bg-[#F8F9FB] font-sans">
      {/* Left Brand Panel — 5 Columns on Desktop */}
      <div className="hidden lg:flex lg:col-span-5 relative flex-col justify-between p-10 bg-slate-900 text-white overflow-hidden select-none">
        {/* Glowing Gradient Background Effects */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-[#0072BC]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-[#8CC63F]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Top Brand Logo Container */}
        <div className="relative z-10">
          <div className="inline-block bg-white p-3 rounded-2xl shadow-xl">
            <Logo size="md" />
          </div>
        </div>

        {/* Center Hero Message & Stats */}
        <div className="relative max-w-sm my-auto space-y-6 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0072BC]/20 border border-[#0072BC]/30 text-xs font-semibold text-blue-300">
            <ShieldCheck className="w-3.5 h-3.5 text-[#8CC63F]" />
            <span>Official SMIT Learning Portal</span>
          </div>

          <h1 className="text-3xl font-extrabold text-white leading-tight tracking-tight">
            Empowering youth through{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284C7] to-[#8CC63F]">
              technology & education.
            </span>
          </h1>

          <p className="text-xs text-slate-300 font-normal leading-relaxed">
            Streamlined bootcamp management for students, courses, attendance, fees, and tasks in one unified platform.
          </p>

          {/* Glassmorphism Stat Cards */}
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
              <Users className="h-4 w-4 text-[#0284C7]" />
              <div className="text-lg font-bold text-white">128+</div>
              <div className="text-[10px] text-slate-400 font-medium">Students</div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
              <CalendarCheck className="h-4 w-4 text-[#8CC63F]" />
              <div className="text-lg font-bold text-white">86%</div>
              <div className="text-[10px] text-slate-400 font-medium">Attendance</div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md space-y-1">
              <BookOpen className="h-4 w-4 text-[#0284C7]" />
              <div className="text-lg font-bold text-white">12</div>
              <div className="text-[10px] text-slate-400 font-medium">Courses</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-[11px] text-slate-400 font-normal">
          © 2026 Saylani Mass IT Training (SMIT). All rights reserved.
        </div>
      </div>

      {/* Right Form Canvas — 7 Columns on Desktop */}
      <div className="lg:col-span-7 flex flex-col justify-center items-center p-6 sm:p-12 bg-[#F8F9FB]">
        <div className="w-full max-w-md space-y-6 bg-white p-8 sm:p-10 rounded-2xl border border-slate-200/80 shadow-sm">
          {/* Mobile Logo Display */}
          <div className="lg:hidden flex items-center justify-center mb-4">
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-100">
              <Logo size="md" />
            </div>
          </div>

          {/* Title Header */}
          <div className="text-left space-y-1">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              {subtitle}
            </p>
          </div>

          {/* Form Children */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
