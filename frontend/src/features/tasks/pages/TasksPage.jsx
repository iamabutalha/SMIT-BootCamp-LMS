import { useState } from 'react';
import {
  ClipboardList,
  UploadCloud,
  CheckCircle2,
  XCircle,
  MessageSquare,
  ChevronRight,
  FolderOpen,
} from 'lucide-react';

export function TasksPage() {
  const [activeTab, setActiveTab] = useState('Assignment');

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#F8F9FB] min-h-screen font-sans">
      {/* Header + Feedback Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Assignments & Tasks</h1>

        <button
          type="button"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 shadow-2xs cursor-pointer self-start sm:self-auto"
        >
          <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
          <span>Feedback</span>
        </button>
      </div>

      {/* 4 Top Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#0C0E0F]">0</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Total</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center shrink-0">
            <ClipboardList className="w-5 h-5" />
          </div>
        </div>

        {/* Submitted */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#DAA622]">0</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Submitted</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#FEF8C2] text-[#DAA622] flex items-center justify-center shrink-0">
            <UploadCloud className="w-5 h-5" />
          </div>
        </div>

        {/* Approved */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#21C75D]">0</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Approved</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#D5F7E5] text-[#21C75D] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        {/* Rejected */}
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#DE646D]">0</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Rejected</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#F8E5E2] text-[#DE646D] flex items-center justify-center shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[16px] border border-slate-200/80 shadow-2xs overflow-hidden space-y-4 p-4 sm:p-6">
        
        {/* Filter Bar */}
        <div className="flex border-b border-slate-100 text-xs font-bold gap-6">
          {['Assignment', 'Topics', 'Status', 'Action'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-3 transition-colors cursor-pointer border-b-2 ${
                activeTab === tab
                  ? 'border-[#2D67E4] text-[#2D67E4]'
                  : 'border-transparent text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Empty State matching screenshot */}
        <div className="py-16 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-16 h-16 rounded-full bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center shadow-2xs">
            <FolderOpen className="w-8 h-8" />
          </div>
          <div className="space-y-1 max-w-sm">
            <h3 className="text-base font-bold text-[#0C0E0F]">No Assignments</h3>
            <p className="text-xs text-slate-500 font-medium">
              You haven&apos;t been given any assignments yet.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TasksPage;
