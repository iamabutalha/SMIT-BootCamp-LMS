import { Users, TrendingUp, ShieldCheck } from 'lucide-react';

export function AuthLayout({
  children,
  title = 'Welcome back, Admin',
  subtitle = 'Sign in to your BootcampLMS admin workspace.',
}) {
  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-background font-sans">
      {/* Left Brand Panel — Hidden on small screens, 50% width on Desktop */}
      <div className="hidden lg:flex relative flex-col justify-between p-12 bg-[#005c33] text-white overflow-hidden select-none">
        {/* Background Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

        {/* Top Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <img src="/logo.png" alt="LMS Group" className="h-10 w-10 rounded-full object-cover bg-white shadow-md" />
          <span className="truncate font-bold tracking-tight text-lg text-white">
            Bootcamp<span className="text-lime">LMS</span>
          </span>
        </div>

        {/* Center Hero Heading & Subtitle */}
        <div className="relative max-w-md my-auto space-y-6">
          <h1 className="text-4xl leading-tight font-bold text-white tracking-tight">
            Run your bootcamp with{' '}
            <span className="block text-lime">clarity.</span>
          </h1>

          <p className="text-base text-[#E8F7DF]/80 font-normal leading-relaxed">
            One workspace for students, attendance, teams, projects, tasks and reporting — built for mentors who care about outcomes.
          </p>

          {/* 3 Glassmorphism Stat Cards */}
          <div className="grid grid-cols-3 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white/10 ring-1 ring-white/15 space-y-1.5 shadow-lg">
              <Users className="h-5 w-5 text-lime" />
              <div className="text-2xl font-bold text-white">128</div>
              <div className="text-xs text-[#E8F7DF]/80 font-medium">Students</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 ring-1 ring-white/15 space-y-1.5 shadow-lg">
              <TrendingUp className="h-5 w-5 text-lime" />
              <div className="text-2xl font-bold text-white">94%</div>
              <div className="text-xs text-[#E8F7DF]/80 font-medium">Attendance</div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 ring-1 ring-white/15 space-y-1.5 shadow-lg">
              <ShieldCheck className="h-5 w-5 text-lime" />
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-xs text-[#E8F7DF]/80 font-medium">Active teams</div>
            </div>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="relative z-10 text-xs text-[#E8F7DF]/60 font-normal">
          © 2026 BootcampLMS. Professional. Modern. Reliable.
        </div>
      </div>

      {/* Right Canvas Panel — Form Container */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 md:p-16 bg-card">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo Header */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-2">
            <img src="/logo.png" alt="LMS Group" className="h-10 w-10 rounded-full object-cover bg-white shadow-md" />
            <span className="truncate font-bold tracking-tight text-lg text-foreground">
              Bootcamp<span className="text-brand-dark">LMS</span>
            </span>
          </div>

          {/* Form Header */}
          <div className="text-left space-y-1.5">
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground font-normal">
              {subtitle}
            </p>
          </div>

          {/* Render Form */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
