import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Layers, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/common/EmptyState';
import { LoadingState } from '@/components/common/LoadingState';
import TeamHeader from '../components/TeamHeader';
import TeamSummaryCards from '../components/TeamSummaryCards';
import TeamMembers from '../components/TeamMembers';
import AddMemberModal from '../components/AddMemberModal';
import TeamTasks from '../components/TeamTasks';
import { INITIAL_TEAMS_DATA, AVAILABLE_STUDENTS_POOL } from '../teamsData';

export function TeamDetailsPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [team, setTeam] = useState(null);
  const [availablePool, setAvailablePool] = useState(AVAILABLE_STUDENTS_POOL);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({ name: '', description: '', mentorName: '' });

  // Simulate fast data fetching / RTK Query hook lookup
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      const found = INITIAL_TEAMS_DATA.find((t) => String(t._id) === String(teamId)) || INITIAL_TEAMS_DATA[0];
      setTeam(found);
      if (found) {
        setEditFormData({
          name: found.name,
          description: found.description || '',
          mentorName: found.mentorName || '',
        });
      }
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [teamId]);

  // Remove member from team action
  const handleRemoveMember = (memberId) => {
    if (!team) return;
    const removedMember = team.members.find((m) => m.id === memberId || m._id === memberId);
    
    setTeam((prev) => ({
      ...prev,
      members: prev.members.filter((m) => (m.id || m._id) !== memberId),
    }));

    if (removedMember) {
      setAvailablePool((prev) => [...prev, removedMember]);
    }

    toast.success(`Removed ${removedMember?.name || 'member'} from team successfully.`);
  };

  // Add selected students to team action
  const handleAddMembers = async (selectedStudents) => {
    if (!team || selectedStudents.length === 0) return;

    const newMembers = selectedStudents.map((st) => ({
      id: st.id || `s-${Date.now()}-${Math.random()}`,
      rollNumber: st.rollNumber,
      name: st.name,
      email: st.email,
      role: 'Member',
      joinedAt: new Date().toISOString().split('T')[0],
    }));

    setTeam((prev) => ({
      ...prev,
      members: [...prev.members, ...newMembers],
    }));

    // Remove added students from available pool
    const addedIds = new Set(selectedStudents.map((s) => s.id));
    setAvailablePool((prev) => prev.filter((s) => !addedIds.has(s.id)));

    toast.success(`Added ${selectedStudents.length} student(s) to ${team.name}!`);
  };

  // Handle Edit Team Submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    setTeam((prev) => ({
      ...prev,
      name: editFormData.name,
      description: editFormData.description,
      mentorName: editFormData.mentorName,
    }));
    toast.success('Team details updated successfully!');
    setIsEditModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-[#F8F9FB] min-h-screen">
        <LoadingState text="Loading team details..." />
      </div>
    );
  }

  // Error state: Team Not Found
  if (!team) {
    return (
      <div className="p-6 bg-[#F8F9FB] min-h-screen font-sans">
        <div className="bg-white p-8 rounded-[16px] border border-slate-200/80 shadow-2xs text-center space-y-4 max-w-lg mx-auto mt-12">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Team Not Found</h2>
          <p className="text-xs text-slate-500">
            The team you are looking for does not exist or may have been removed.
          </p>
          <Button
            size="sm"
            onClick={() => navigate('/admin/teams')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="bg-[#006B3C] hover:bg-[#005530] text-xs font-bold"
          >
            Back to Teams Management
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#F8F9FB] min-h-screen font-sans">
      {/* Team Details Header */}
      <TeamHeader
        team={team}
        onEditClick={() => setIsEditModalOpen(true)}
        onAddMemberClick={() => setIsAddModalOpen(true)}
      />

      {/* Team Summary Metric Cards */}
      <TeamSummaryCards membersCount={team.members?.length || 0} tasks={team.tasks || []} />

      {/* Team Members Roster Component */}
      <TeamMembers
        members={team.members || []}
        onRemoveMember={handleRemoveMember}
        onAddMemberClick={() => setIsAddModalOpen(true)}
      />

      {/* Team Tasks & Assignments Component */}
      <TeamTasks tasks={team.tasks || []} />

      {/* Add Member Modal Dialog */}
      <AddMemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        existingMembers={team.members || []}
        availablePool={availablePool}
        onAddMembers={handleAddMembers}
      />

      {/* Edit Team Modal Dialog */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Team Information"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-sans">
            <Input
              label="Team Name"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              required
            />

            <div>
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block mb-1">
                Description
              </label>
              <textarea
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                className="w-full p-3 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#006B3C] h-20"
              />
            </div>

            <Input
              label="Assigned Mentor"
              value={editFormData.mentorName}
              onChange={(e) => setEditFormData({ ...editFormData, mentorName: e.target.value })}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-[#006B3C] hover:bg-[#005530] font-bold">
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default TeamDetailsPage;
