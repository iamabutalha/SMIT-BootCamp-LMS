import { useState } from 'react';
import { Users, UserPlus, Trash2, ShieldCheck, Mail } from 'lucide-react';
import Avatar from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/common/EmptyState';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';

export function TeamMembers({ members = [], onRemoveMember, onAddMemberClick }) {
  const [memberToRemove, setMemberToRemove] = useState(null);

  const handleConfirmRemove = () => {
    if (memberToRemove && onRemoveMember) {
      onRemoveMember(memberToRemove.id || memberToRemove._id);
      setMemberToRemove(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-[16px] border border-slate-200/80 shadow-2xs space-y-4 font-sans">
      {/* Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[#0C0E0F]">Team Members ({members.length})</h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">Assigned bootcamp students and project roles</p>
        </div>

        {onAddMemberClick && (
          <Button
            size="sm"
            onClick={onAddMemberClick}
            leftIcon={<UserPlus className="w-3.5 h-3.5" />}
            className="bg-[#006B3C] hover:bg-[#005530] text-xs font-bold self-start sm:self-auto"
          >
            Add Member
          </Button>
        )}
      </div>

      {/* Roster Table */}
      {members.length === 0 ? (
        <EmptyState
          title="No members added yet"
          description="Click 'Add Member' to assign students to this bootcamp team."
          icon={Users}
          action={
            onAddMemberClick
              ? { label: 'Add Member', onClick: onAddMemberClick }
              : undefined
          }
        />
      ) : (
        <div className="overflow-x-auto border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Member Name</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {members.map((member) => (
                <tr key={member.id || member._id || member.rollNumber} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={member.name} className="w-8 h-8 shrink-0" />
                      <span className="font-bold text-slate-900">{member.name}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-[#006B3C]">
                    {member.rollNumber}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 font-normal">
                    {member.email}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        member.role === 'Team Lead'
                          ? 'bg-[#E8F7DF] text-[#006B3C]'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {member.role === 'Team Lead' && <ShieldCheck className="w-3 h-3 text-[#006B3C]" />}
                      <span>{member.role || 'Member'}</span>
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-slate-500">
                    {member.joinedAt || '2026-01-15'}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setMemberToRemove(member)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                      title="Remove Member from Team"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Dialog before removal */}
      {memberToRemove && (
        <ConfirmDialog
          isOpen={Boolean(memberToRemove)}
          onClose={() => setMemberToRemove(null)}
          onConfirm={handleConfirmRemove}
          title="Remove Member from Team?"
          description={`Are you sure you want to remove ${memberToRemove.name} (Roll #${memberToRemove.rollNumber}) from this team?`}
          confirmLabel="Remove Member"
          variant="danger"
        />
      )}
    </div>
  );
}

export default TeamMembers;
