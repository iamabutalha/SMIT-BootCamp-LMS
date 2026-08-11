import { useState, useMemo } from 'react';
import { Search, UserPlus, X, Check, Loader2 } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export function AddMemberModal({ isOpen, onClose, existingMembers = [], availablePool = [], onAddMembers }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const existingRolls = useMemo(
    () => new Set(existingMembers.map((m) => m.rollNumber)),
    [existingMembers]
  );

  // Filter pool students not already in team
  const availableStudents = useMemo(() => {
    return availablePool.filter((st) => {
      const notInTeam = !existingRolls.has(st.rollNumber);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        st.name.toLowerCase().includes(q) ||
        st.rollNumber.toLowerCase().includes(q) ||
        st.email.toLowerCase().includes(q);

      return notInTeam && matchesSearch;
    });
  }, [availablePool, existingRolls, searchQuery]);

  const toggleSelectStudent = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === availableStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(availableStudents.map((s) => s.id));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedIds.length === 0) return;

    setIsSubmitting(true);
    try {
      const selectedStudents = availablePool.filter((s) => selectedIds.includes(s.id));
      await onAddMembers(selectedStudents);
      setSelectedIds([]);
      setSearchQuery('');
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 font-sans select-none">
      <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4 animate-in fade-in zoom-in duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Add Members to Team</h3>
              <p className="text-xs text-slate-500">Select unassigned students from bootcamp roster</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Bar & Select All Header */}
        <div className="space-y-2">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search students by name, roll #, or email..."
              className="w-full h-9 pl-9 pr-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
            />
          </div>

          {availableStudents.length > 0 && (
            <div className="flex items-center justify-between text-xs text-slate-500 px-1 pt-1">
              <span>{availableStudents.length} available students</span>
              <button
                type="button"
                onClick={handleToggleSelectAll}
                className="text-xs font-bold text-[#006B3C] hover:underline cursor-pointer"
              >
                {selectedIds.length === availableStudents.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>
          )}
        </div>

        {/* Student Checklist Roster */}
        <div className="max-h-64 overflow-y-auto space-y-2 border border-slate-100 rounded-xl p-2">
          {availableStudents.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No unassigned students found.
            </div>
          ) : (
            availableStudents.map((st) => {
              const isSelected = selectedIds.includes(st.id);
              return (
                <div
                  key={st.id}
                  onClick={() => toggleSelectStudent(st.id)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition ${
                    isSelected
                      ? 'bg-[#E8F7DF]/50 border-[#006B3C]/40'
                      : 'bg-white border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition ${
                        isSelected
                          ? 'bg-[#006B3C] border-[#006B3C] text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <Avatar name={st.name} className="w-7 h-7 shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 truncate">{st.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">Roll: {st.rollNumber} · {st.email}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Action Buttons */}
        <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
          <Button type="button" variant="outline" size="sm" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={handleSubmit}
            disabled={selectedIds.length === 0 || isSubmitting}
            className="bg-[#006B3C] hover:bg-[#005530] text-xs font-bold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-1" />
                Adding...
              </>
            ) : (
              `Add Selected (${selectedIds.length})`
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddMemberModal;
