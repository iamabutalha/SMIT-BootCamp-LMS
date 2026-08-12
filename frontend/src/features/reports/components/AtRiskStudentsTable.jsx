import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ExternalLink, ShieldAlert } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

export function AtRiskStudentsTable({ atRisk }) {
  const navigate = useNavigate();

  if (!atRisk || atRisk.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3 font-sans text-left">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#006B3C]" />
          <h3 className="text-lg font-bold text-slate-900 tracking-tight">Students Needing Attention</h3>
        </div>
        <div className="p-6 text-center bg-[#E8F7DF] rounded-xl border border-[#006B3C]/20">
          <p className="text-xs font-bold text-[#006B3C]">
            ✓ Excellent! No students currently meet the At-Risk alert threshold (&lt;75% attendance or &lt;60% completion).
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-[#DE646D]/20 shadow-2xs space-y-4 font-sans text-left">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#DE646D]" />
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Students Needing Attention</h3>
            <Badge className="bg-[#F8E5E2] text-[#DE646D] font-bold text-[10px]">
              {atRisk.length} High Risk Alerts
            </Badge>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            Students requiring academic intervention due to attendance (&lt;75%), assignments (&lt;60%), or quiz scores (&lt;50%).
          </p>
        </div>
      </div>

      <div className="overflow-x-auto border border-[#DE646D]/20 rounded-xl">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#F8E5E2]/40 text-[#DE646D] font-bold border-b border-[#DE646D]/20 uppercase tracking-wider">
            <tr>
              <th className="py-3 px-4">Roll Number</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4">Primary Risk Trigger</th>
              <th className="py-3 px-4">Attendance</th>
              <th className="py-3 px-4">Completion</th>
              <th className="py-3 px-4">Quiz Score</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {atRisk.map((student) => (
              <tr key={student.id} className="hover:bg-[#F8E5E2]/20 transition-colors">
                <td className="py-3.5 px-4 font-bold text-[#DE646D]">{student.rollNumber}</td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-2">
                    <Avatar name={student.name} className="w-7 h-7 shrink-0" />
                    <span className="font-bold text-slate-900">{student.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#F8E5E2] text-[#DE646D]">
                    {student.riskReason}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  <span className={student.attendance < 75 ? 'text-[#DE646D] font-extrabold' : 'text-slate-700'}>
                    {student.attendance}%
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  <span className={student.completion < 60 ? 'text-[#DE646D] font-extrabold' : 'text-slate-700'}>
                    {student.completion}%
                  </span>
                </td>
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  <span className={student.score < 50 ? 'text-[#DE646D] font-extrabold' : 'text-slate-700'}>
                    {student.score}%
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <Button
                    size="sm"
                    onClick={() => navigate(`/admin/students/${student.studentId || student.id}`)}
                    rightIcon={<ExternalLink className="w-3 h-3" />}
                    className="bg-[#DE646D] hover:bg-[#c44f58] text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer"
                  >
                    View Student
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AtRiskStudentsTable;
