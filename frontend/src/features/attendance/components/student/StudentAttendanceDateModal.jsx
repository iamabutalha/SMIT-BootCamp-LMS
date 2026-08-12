import { CheckCircle2, XCircle, Clock, Calendar, ShieldCheck, FileText } from 'lucide-react';
import Modal from '@/components/ui/Modal';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export function StudentAttendanceDateModal({ isOpen, onClose, record }) {
  if (!record) return null;

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'present':
        return (
          <Badge className="bg-[#E8F7DF] text-[#57BA7F] font-bold text-xs px-3 py-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Present</span>
          </Badge>
        );
      case 'leave':
        return (
          <Badge className="bg-amber-50 text-[#DAA622] font-bold text-xs px-3 py-1 border border-amber-200 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>Approved Leave</span>
          </Badge>
        );
      case 'absent':
        return (
          <Badge className="bg-rose-50 text-[#DE646D] font-bold text-xs px-3 py-1 border border-rose-200 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" />
            <span>Absent</span>
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="space-y-5 font-sans text-left py-1">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">{record.date}</h3>
              <span className="text-xs font-semibold text-slate-500">{record.day}</span>
            </div>
          </div>
          <div>{getStatusBadge(record.status)}</div>
        </div>

        {/* Read-Only Details Grid */}
        <div className="space-y-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Course & Session</span>
            <div className="font-bold text-slate-900">{record.className}</div>
            <div className="text-slate-600 font-medium">{record.session}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Check-in Time</span>
              <span className="font-bold text-slate-800">{record.checkIn || '—'}</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
              <span className="text-[10px] text-slate-400 font-semibold uppercase block">Check-out Time</span>
              <span className="font-bold text-slate-800">{record.checkOut || '—'}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Marked By</span>
            <div className="flex items-center gap-1.5 font-semibold text-slate-800">
              <ShieldCheck className="w-3.5 h-3.5 text-[#006B3C]" />
              <span>{record.markedBy || 'Admin / Mentor'}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Remarks</span>
            <p className="text-slate-700 font-medium">{record.remarks || 'No additional remarks'}</p>
          </div>
        </div>

        {/* Read-Only Notice Note */}
        <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-100 text-[11px] text-[#0284C7] font-medium flex items-center gap-2">
          <FileText className="w-4 h-4 shrink-0" />
          <span>Attendance records are official log entries and can only be updated by authorized instructors.</span>
        </div>

        {/* Action Footer: Single Close Button */}
        <div className="pt-3 border-t border-slate-100">
          <Button
            type="button"
            fullWidth
            onClick={onClose}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-xl cursor-pointer"
          >
            Close Details
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default StudentAttendanceDateModal;
