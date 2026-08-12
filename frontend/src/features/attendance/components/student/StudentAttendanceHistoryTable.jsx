import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { CheckCircle2, XCircle, Clock, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import StudentAttendanceDateModal from './StudentAttendanceDateModal';

export function StudentAttendanceHistoryTable({ records = [], pagination, onPageChange }) {
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'present':
        return (
          <Badge className="bg-[#E8F7DF] text-[#57BA7F] font-bold hover:bg-[#E8F7DF] text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1 inline shrink-0" />
            <span>Present</span>
          </Badge>
        );
      case 'leave':
        return (
          <Badge className="bg-amber-50 text-[#DAA622] font-bold hover:bg-amber-50 text-[11px] border border-amber-200">
            <Clock className="w-3.5 h-3.5 mr-1 inline shrink-0" />
            <span>Leave</span>
          </Badge>
        );
      case 'absent':
        return (
          <Badge className="bg-rose-50 text-[#DE646D] font-bold hover:bg-rose-50 text-[11px] border border-rose-200">
            <XCircle className="w-3.5 h-3.5 mr-1 inline shrink-0" />
            <span>Absent</span>
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleRowClick = (rec) => {
    setSelectedRecord(rec);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden font-sans text-left">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Attendance Log History</h3>
          <p className="text-xs text-slate-500">Official log entries recorded by instructors.</p>
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Showing {records.length} records
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/70 border-b border-slate-100">
            <TableRow>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider py-3.5">Date</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Day</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Class & Session</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Status</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Check-In</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-center">Check-Out</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Remarks</TableHead>
              <TableHead className="text-xs font-semibold text-slate-600 uppercase tracking-wider text-right pr-6">View</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {records.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-xs text-slate-500">
                  No attendance records found matching filter criteria.
                </TableCell>
              </TableRow>
            ) : (
              records.map((rec) => (
                <TableRow
                  key={rec.id}
                  onClick={() => handleRowClick(rec)}
                  className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                >
                  <TableCell className="py-3.5">
                    <span className="font-bold text-slate-900 text-xs">{rec.date}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-xs font-medium text-slate-600">{rec.day}</span>
                  </TableCell>

                  <TableCell>
                    <div>
                      <div className="font-bold text-slate-900 text-xs">{rec.className}</div>
                      <div className="text-[11px] text-slate-500 truncate max-w-[200px]">{rec.session}</div>
                    </div>
                  </TableCell>

                  <TableCell className="text-center">
                    {getStatusBadge(rec.status)}
                  </TableCell>

                  <TableCell className="text-center">
                    <span className="text-xs font-semibold text-slate-700">{rec.checkIn}</span>
                  </TableCell>

                  <TableCell className="text-center">
                    <span className="text-xs font-semibold text-slate-700">{rec.checkOut}</span>
                  </TableCell>

                  <TableCell>
                    <span className="text-xs text-slate-600 truncate max-w-[180px] block">{rec.remarks}</span>
                  </TableCell>

                  <TableCell className="text-right pr-6">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRowClick(rec);
                      }}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Bar */}
      {pagination && pagination.totalPages > 1 && (
        <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
          <span>
            Showing {(pagination.page - 1) * pagination.limit + 1}–
            {Math.min(pagination.page * pagination.limit, pagination.totalRecords)} of {pagination.totalRecords} records
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              disabled={pagination.page === 1}
              onClick={() => onPageChange(pagination.page - 1)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 bg-slate-50 rounded-lg border border-slate-200 text-slate-800">
              Page {pagination.page} of {pagination.totalPages}
            </span>
            <button
              type="button"
              disabled={pagination.page === pagination.totalPages}
              onClick={() => onPageChange(pagination.page + 1)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Read-Only Modal */}
      <StudentAttendanceDateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        record={selectedRecord}
      />
    </div>
  );
}

export default StudentAttendanceHistoryTable;
