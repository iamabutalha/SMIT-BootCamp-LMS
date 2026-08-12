import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus,
  Users,
  Layers,
  Search,
  Pencil,
  Trash2,
  Eye,
  UserCheck,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  UserPlus,
  X,
} from 'lucide-react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Avatar from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { EmptyState } from '@/components/common/EmptyState';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';

const INITIAL_TEAMS = [
  {
    _id: '1',
    name: 'Team Alpha — Web Development',
    batch: 'Batch 12',
    description: 'Full-stack web development team focusing on React, Node.js, Express, and MongoDB.',
    studentsCount: 4,
    mentorName: 'Ahmed Raza',
    status: 'active',
    members: [
      { id: 's1', rollNumber: '102341', name: 'Muhammad Ali', email: 'ali@saylani.org', role: 'Team Lead' },
      { id: 's2', rollNumber: '102342', name: 'Fatima Ahmed', email: 'fatima@saylani.org', role: 'Member' },
      { id: 's3', rollNumber: '102346', name: 'Zainab Bibi', email: 'zainab@saylani.org', role: 'Member' },
      { id: 's4', rollNumber: '102347', name: 'Hamza Khan', email: 'hamza@saylani.org', role: 'Member' },
    ],
  },
  {
    _id: '2',
    name: 'Team Beta — Mobile App Development',
    batch: 'Batch 5',
    description: 'Cross-platform mobile app team building React Native and Flutter projects.',
    studentsCount: 2,
    mentorName: 'Sara Khan',
    status: 'active',
    members: [
      { id: 's5', rollNumber: '102343', name: 'Usman Ghani', email: 'usman@saylani.org', role: 'Team Lead' },
      { id: 's6', rollNumber: '102345', name: 'Bilal Hussain', email: 'bilal@saylani.org', role: 'Member' },
    ],
  },
  {
    _id: '3',
    name: 'Team Gamma — Python & AI',
    batch: 'Batch 3',
    description: 'Data science & artificial intelligence cohort analyzing machine learning models.',
    studentsCount: 2,
    mentorName: 'Usman Ali',
    status: 'completed',
    members: [
      { id: 's7', rollNumber: '102344', name: 'Aisha Malik', email: 'aisha@saylani.org', role: 'Team Lead' },
      { id: 's8', rollNumber: '102348', name: 'Sana Tariq', email: 'sana@saylani.org', role: 'Member' },
    ],
  },
  {
    _id: '4',
    name: 'Team Delta — Cloud Native',
    batch: 'Batch 10',
    description: 'Cloud infrastructure & DevOps team deploying Docker, Kubernetes, and AWS services.',
    studentsCount: 2,
    mentorName: 'Zubair Sheikh',
    status: 'active',
    members: [
      { id: 's9', rollNumber: '102349', name: 'Tariq Mehmood', email: 'tariq@saylani.org', role: 'Team Lead' },
      { id: 's10', rollNumber: '102350', name: 'Hina Shah', email: 'hina@saylani.org', role: 'Member' },
    ],
  },
];

const teamFormSchema = z.object({
  name: z.string().min(3, 'Team name must be at least 3 characters'),
  batch: z.string().min(1, 'Batch is required'),
  mentorName: z.string().min(2, 'Mentor name is required'),
  description: z.string().optional(),
  status: z.enum(['active', 'completed']).default('active'),
});

export function CohortsPage() {
  const navigate = useNavigate();
  const [teams, setTeams] = useState(INITIAL_TEAMS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal States
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingTeam, setEditingTeam] = useState(null);
  const [viewingMembersTeam, setViewingMembersTeam] = useState(null);
  const [deletingTeam, setDeletingTeam] = useState(null);

  // Add Member Form inline state inside View Members Modal
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [memberRollNumber, setMemberRollNumber] = useState('');
  const [memberName, setMemberName] = useState('');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberRole, setMemberRole] = useState('Member');
  const [memberFormError, setMemberFormError] = useState('');

  const stats = useMemo(() => {
    const total = teams.length;
    const active = teams.filter((t) => t.status === 'active').length;
    const completed = teams.filter((t) => t.status === 'completed').length;
    const totalStudents = teams.reduce((acc, t) => acc + (t.members?.length || t.studentsCount || 0), 0);
    return { total, active, completed, totalStudents };
  }, [teams]);

  const filteredTeams = useMemo(() => {
    return teams.filter((t) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.batch.toLowerCase().includes(q) ||
        t.mentorName.toLowerCase().includes(q) ||
        t.description?.toLowerCase().includes(q);

      const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [teams, searchQuery, statusFilter]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(teamFormSchema),
    defaultValues: {
      name: '',
      batch: 'Batch 12',
      mentorName: '',
      description: '',
      status: 'active',
    },
  });

  const handleOpenCreate = () => {
    setEditingTeam(null);
    reset({
      name: '',
      batch: 'Batch 12',
      mentorName: '',
      description: '',
      status: 'active',
    });
    setShowFormModal(true);
  };

  const handleOpenEdit = (team) => {
    setEditingTeam(team);
    setValue('name', team.name);
    setValue('batch', team.batch);
    setValue('mentorName', team.mentorName);
    setValue('description', team.description || '');
    setValue('status', team.status || 'active');
    setShowFormModal(true);
  };

  const handleSaveTeam = (values) => {
    if (editingTeam) {
      setTeams((prev) =>
        prev.map((t) =>
          t._id === editingTeam._id
            ? { ...t, ...values }
            : t
        )
      );
      toast.success(`Team "${values.name}" updated successfully!`);
    } else {
      const newTeam = {
        _id: `team-${Date.now()}`,
        name: values.name,
        batch: values.batch,
        mentorName: values.mentorName,
        description: values.description || '',
        status: values.status,
        studentsCount: 0,
        members: [],
      };
      setTeams((prev) => [newTeam, ...prev]);
      toast.success(`New Team "${values.name}" created successfully!`);
    }

    setShowFormModal(false);
    setEditingTeam(null);
    reset();
  };

  const handleDeleteConfirm = () => {
    if (!deletingTeam) return;
    setTeams((prev) => prev.filter((t) => t._id !== deletingTeam._id));
    toast.success(`Team "${deletingTeam.name}" deleted.`);
    setDeletingTeam(null);
  };

  // Add Member Handler inside Viewing Members Modal
  const handleAddMemberToTeam = (e) => {
    e.preventDefault();
    if (!memberRollNumber.trim() || !/^[0-9]{6}$/.test(memberRollNumber.trim())) {
      setMemberFormError('Please enter a valid 6-digit roll number (e.g., 102352).');
      return;
    }
    if (!memberName.trim()) {
      setMemberFormError('Student full name is required.');
      return;
    }

    setMemberFormError('');

    const newMember = {
      id: `s-${Date.now()}`,
      rollNumber: memberRollNumber.trim(),
      name: memberName.trim(),
      email: memberEmail.trim() || `${memberName.trim().toLowerCase().replace(/\s+/g, '')}@saylani.org`,
      role: memberRole,
    };

    setTeams((prev) =>
      prev.map((t) => {
        if (t._id === viewingMembersTeam._id) {
          const updatedMembers = [...(t.members || []), newMember];
          return {
            ...t,
            members: updatedMembers,
            studentsCount: updatedMembers.length,
          };
        }
        return t;
      })
    );

    // Update active modal view state
    setViewingMembersTeam((prev) => ({
      ...prev,
      members: [...(prev.members || []), newMember],
      studentsCount: (prev.members?.length || 0) + 1,
    }));

    toast.success(`Student "${newMember.name}" (Roll #${newMember.rollNumber}) added to team!`);

    // Reset member form
    setMemberRollNumber('');
    setMemberName('');
    setMemberEmail('');
    setMemberRole('Member');
    setShowAddMemberForm(false);
  };

  // Remove Member Handler
  const handleRemoveMemberFromTeam = (memberId, memberName) => {
    setTeams((prev) =>
      prev.map((t) => {
        if (t._id === viewingMembersTeam._id) {
          const updatedMembers = (t.members || []).filter((m) => (m.id || m.rollNumber) !== memberId);
          return {
            ...t,
            members: updatedMembers,
            studentsCount: updatedMembers.length,
          };
        }
        return t;
      })
    );

    setViewingMembersTeam((prev) => ({
      ...prev,
      members: (prev.members || []).filter((m) => (m.id || m.rollNumber) !== memberId),
      studentsCount: Math.max(0, (prev.members?.length || 1) - 1),
    }));

    toast.info(`Removed "${memberName}" from team.`);
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#F8F9FB] min-h-screen font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Teams Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {stats.active} active teams · {stats.totalStudents} total students assigned
          </p>
        </div>

        <Button
          onClick={handleOpenCreate}
          leftIcon={<Plus className="w-4 h-4" />}
          className="bg-[#006B3C] hover:bg-[#005530] text-white shadow-2xs self-start sm:self-auto"
        >
          Create Team
        </Button>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#0C0E0F]">{stats.total}</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Total Teams</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#006B3C]">{stats.active}</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Active Teams</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-slate-600">{stats.completed}</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Completed</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white p-4 rounded-[16px] border border-slate-200/80 shadow-2xs flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#2D67E4]">{stats.totalStudents}</p>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Total Members</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#F1F5FF] text-[#2D67E4] flex items-center justify-center shrink-0">
            <Users className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams by name or mentor..."
            className="w-full h-9 pl-9 pr-3 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
          />
        </div>

        <div className="flex items-center bg-slate-100 p-1 rounded-xl gap-1 self-start sm:self-auto">
          {['All', 'active', 'completed'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer capitalize ${
                statusFilter === st
                  ? 'bg-white text-[#006B3C] shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {st === 'active' ? 'Active Teams' : st === 'completed' ? 'Completed' : 'All Teams'}
            </button>
          ))}
        </div>
      </div>

      {/* Team Cards Grid */}
      {filteredTeams.length === 0 ? (
        <EmptyState
          title={searchQuery ? 'No teams found' : 'No teams created yet'}
          description={
            searchQuery ? 'Try adjusting your search criteria.' : 'Click "Create Team" to set up your first bootcamp team.'
          }
          icon={Layers}
          action={
            !searchQuery
              ? { label: 'Create Team', onClick: handleOpenCreate }
              : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTeams.map((team) => (
            <div
              key={team._id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8F7DF] text-[#006B3C] flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {team.batch}
                    </span>
                    <Badge
                      variant={team.status === 'active' ? 'success' : 'secondary'}
                      className={`text-[10px] uppercase tracking-wider ${
                        team.status === 'active'
                          ? 'bg-[#E8F7DF] text-[#006B3C] border-transparent font-bold'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {team.status === 'active' ? 'Active' : 'Completed'}
                    </Badge>
                  </div>
                </div>

                {/* Team Title & Description */}
                <h3
                  onClick={() => navigate(`/admin/teams/${team._id}`)}
                  className="text-base font-bold text-slate-900 mb-1 group-hover:text-[#006B3C] transition-colors cursor-pointer"
                >
                  {team.name}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                  {team.description || 'No description provided for this team.'}
                </p>
              </div>

              {/* Footer Info & Actions */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-medium">
                    <UserCheck className="w-4 h-4 text-[#006B3C]" />
                    <span>Mentor: <strong className="text-slate-800">{team.mentorName || '—'}</strong></span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500 font-semibold">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{team.members?.length || team.studentsCount || 0} Members</span>
                  </div>
                </div>

                {/* Member Avatars Stack */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex -space-x-2 overflow-hidden">
                    {(team.members || []).slice(0, 4).map((m, idx) => (
                      <Avatar
                        key={m.id || idx}
                        name={m.name}
                        className="w-7 h-7 ring-2 ring-white text-[10px]"
                      />
                    ))}
                    {(team.members?.length || 0) > 4 && (
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                        +{(team.members?.length || 0) - 4}
                      </div>
                    )}
                  </div>

                  {/* Quick Card Action Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => navigate(`/admin/teams/${team._id}`)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#006B3C] hover:bg-[#E8F7DF] transition cursor-pointer flex items-center gap-1 text-xs font-bold"
                      title="View Team Details"
                    >
                      <Eye className="w-4 h-4" />
                      <span className="hidden sm:inline">Details</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(team)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
                      title="Edit Team"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingTeam(team)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                      title="Delete Team"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Team Modal */}
      <Modal
        isOpen={showFormModal}
        onClose={() => {
          setShowFormModal(false);
          setEditingTeam(null);
          reset();
        }}
        title={editingTeam ? 'Edit Team' : 'Create New Team'}
        subtitle="Manage bootcamp team details, cohort batch, and lead mentor."
      >
        <form onSubmit={handleSubmit(handleSaveTeam)} className="space-y-4">
          <Input
            label="TEAM NAME"
            placeholder="e.g., Team Alpha — Web Development"
            error={errors.name?.message}
            {...register('name')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="BATCH / COHORT"
              placeholder="Batch 12"
              error={errors.batch?.message}
              {...register('batch')}
            />
            <Input
              label="MENTOR / TEAM LEAD"
              placeholder="Ahmed Raza"
              error={errors.mentorName?.message}
              {...register('mentorName')}
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Status
            </label>
            <select
              className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
              {...register('status')}
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Description (Optional)
            </label>
            <textarea
              className="w-full h-24 px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006B3C] resize-none"
              placeholder="Brief description of team objectives and technologies..."
              {...register('description')}
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setShowFormModal(false);
                setEditingTeam(null);
                reset();
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-[#006B3C] hover:bg-[#005530] text-white">
              {editingTeam ? 'Save Changes' : 'Create Team'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* View & Add Team Members Modal */}
      {viewingMembersTeam && (
        <Modal
          isOpen={!!viewingMembersTeam}
          onClose={() => {
            setViewingMembersTeam(null);
            setShowAddMemberForm(false);
          }}
          title={`${viewingMembersTeam.name} — Members`}
          subtitle={`Assigned students and team lead for ${viewingMembersTeam.batch}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            {/* Header info & Add Member trigger */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs">
              <div className="space-y-1">
                <div>
                  <span className="text-slate-500">Lead Mentor: </span>
                  <span className="font-bold text-slate-900">{viewingMembersTeam.mentorName}</span>
                </div>
                <div>
                  <span className="text-slate-500">Total Members: </span>
                  <span className="font-bold text-[#006B3C]">{viewingMembersTeam.members?.length || 0} Students</span>
                </div>
              </div>

              <Button
                size="sm"
                onClick={() => setShowAddMemberForm(!showAddMemberForm)}
                leftIcon={showAddMemberForm ? <X className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                className="bg-[#006B3C] hover:bg-[#005530] text-white shadow-2xs self-start sm:self-auto text-xs"
              >
                {showAddMemberForm ? 'Close Add Form' : 'Add Member'}
              </Button>
            </div>

            {/* Inline Add Member Form */}
            {showAddMemberForm && (
              <form onSubmit={handleAddMemberToTeam} className="bg-white p-4 rounded-xl border border-[#006B3C]/30 shadow-2xs space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <UserPlus className="w-4 h-4 text-[#006B3C]" />
                    Add Student Member to Team
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowAddMemberForm(false)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="ROLL NUMBER"
                    value={memberRollNumber}
                    onChange={(e) => setMemberRollNumber(e.target.value)}
                    placeholder="102352"
                    maxLength={6}
                  />
                  <Input
                    label="FULL NAME"
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="Hamza Mehmood"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Input
                    label="EMAIL ADDRESS"
                    type="email"
                    value={memberEmail}
                    onChange={(e) => setMemberEmail(e.target.value)}
                    placeholder="student@saylani.org"
                  />
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                      Role in Team
                    </label>
                    <select
                      value={memberRole}
                      onChange={(e) => setMemberRole(e.target.value)}
                      className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
                    >
                      <option value="Member">Member</option>
                      <option value="Team Lead">Team Lead</option>
                    </select>
                  </div>
                </div>

                {memberFormError && (
                  <p className="text-xs text-red-500 font-medium">{memberFormError}</p>
                )}

                <div className="flex justify-end gap-2 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowAddMemberForm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    className="bg-[#006B3C] hover:bg-[#005530] text-white"
                  >
                    Add Member
                  </Button>
                </div>
              </form>
            )}

            {/* Members List Table */}
            <div className="overflow-x-auto border border-slate-100 rounded-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-100 uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Roll Number</th>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Email</th>
                    <th className="py-2.5 px-3">Role</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(!viewingMembersTeam.members || viewingMembersTeam.members.length === 0) ? (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-slate-400">
                        No members assigned to this team yet. Click "Add Member" to assign students.
                      </td>
                    </tr>
                  ) : (
                    viewingMembersTeam.members.map((m) => (
                      <tr key={m.id || m.rollNumber} className="hover:bg-slate-50/80">
                        <td className="py-2.5 px-3 font-bold text-[#006B3C]">{m.rollNumber}</td>
                        <td className="py-2.5 px-3 font-semibold text-slate-800">{m.name}</td>
                        <td className="py-2.5 px-3 text-slate-500">{m.email}</td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              m.role === 'Team Lead'
                                ? 'bg-[#E8F7DF] text-[#006B3C]'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {m.role}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveMemberFromTeam(m.id || m.rollNumber, m.name)}
                            className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition cursor-pointer"
                            title="Remove Member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-2">
              <Button
                variant="outline"
                onClick={() => {
                  setViewingMembersTeam(null);
                  setShowAddMemberForm(false);
                }}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Team Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingTeam}
        onClose={() => setDeletingTeam(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Team"
        description={`Are you sure you want to delete "${deletingTeam?.name}"? This action will unassign enrolled students.`}
        confirmText="Delete Team"
        isDanger
      />
    </div>
  );
}

export default CohortsPage;
