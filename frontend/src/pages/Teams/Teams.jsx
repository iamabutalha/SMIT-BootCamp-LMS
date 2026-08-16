import { useEffect } from "react";
import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";

import TeamModal from "./modals/TeamModal";
import TeamDetailModal from "./modals/TeamDetailModal";
import DeleteTeamModal from "./modals/DeleteTeamModal";
import ManageMembersModal from "./modals/ManageMembersModal";

import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchTeams,
  fetchStudents,
  createTeamThunk,
  updateTeamThunk,
  deleteTeamThunk,
  addMemberThunk,
  removeMemberThunk,
  changeLeaderThunk,
  setSearchQuery,
  resetSearchQuery,
  openCreateTeamModal,
  openEditTeamModal,
  closeTeamModal,
  openDetailModal,
  closeDetailModal,
  openDeleteModal,
  closeDeleteModal,
  openMembersModal,
  closeMembersModal,
} from "../../store/slices/teamSlice";

import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  Users,
  Crown,
  Search,
  FilterX,
  UserCheck,
} from "lucide-react";

function Teams() {
  const dispatch = useAppDispatch();
  const {
    teams,
    students,
    searchQuery,
    loading,
    error,
    teamModalOpen,
    detailModalOpen,
    deleteModalOpen,
    membersModalOpen,
    selectedTeam,
    deletingTeam,
    managingTeam,
    actionLoading,
    actionError,
  } = useAppSelector((state) => state.team);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTeams({ search: searchQuery }));
  }, [dispatch, searchQuery]);

  const handleSearchChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleClearSearch = () => {
    dispatch(resetSearchQuery());
  };

  const handleCreateOrUpdateSubmit = (formData) => {
    if (selectedTeam) {
      const teamId = selectedTeam._id || selectedTeam.id;
      dispatch(
        updateTeamThunk({ id: teamId, teamPayload: formData })
      );
    } else {
      dispatch(createTeamThunk(formData));
    }
  };

  const handleDeleteConfirm = (id) => {
    const teamId = typeof id === "object" ? id?._id || id?.id : id;
    dispatch(deleteTeamThunk(teamId));
  };

  const handleAddMember = (teamId, studentId) => {
    dispatch(addMemberThunk({ teamId, studentId }));
  };

  const handleRemoveMember = (teamId, studentId) => {
    dispatch(removeMemberThunk({ teamId, studentId }));
  };

  const handleChangeLeader = (teamId, leaderId) => {
    dispatch(changeLeaderThunk({ teamId, leaderId }));
  };

  const columns = [
    {
      key: "name",
      label: "Team Name",
      render: (row) => (
        <button
          type="button"
          onClick={() => dispatch(openDetailModal(row))}
          className="group flex flex-col items-start text-left hover:opacity-80 transition"
          title="Click to view team details"
        >
          <span className="font-semibold text-primary group-hover:underline flex items-center gap-1.5">
            <Users className="h-4 w-4 opacity-70" />
            {row.name}
          </span>
          <span className="text-xs text-text-muted">
            {(row.members || []).length} members
          </span>
        </button>
      ),
    },
    {
      key: "leaderName",
      label: "Team Leader",
      render: (row) => (
        <div className="flex items-center gap-1.5">
          <Crown className="h-4 w-4 text-amber-500 shrink-0" />
          <span className="font-semibold text-text">
            {row.leaderName || "Not Assigned"}
          </span>
        </div>
      ),
    },
    {
      key: "members",
      label: "Members",
      render: (row) => {
        const membersList = row.members || [];
        return (
          <div className="flex items-center gap-1">
            <Badge variant="mint" className="font-semibold">
              {membersList.length} Members
            </Badge>
            <span className="text-xs text-text-muted line-clamp-1 max-w-[200px]">
              ({membersList.map((m) => m.name).join(", ")})
            </span>
          </div>
        );
      },
    },
    {
      key: "createdAt",
      label: "Created Date",
      render: (row) => (
        <span className="text-xs font-medium text-text-muted">
          {row.createdAt
            ? new Date(row.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "N/A"}
        </span>
      ),
    },
    {
      key: "action",
      label: "Actions",
      render: (row) => (
        <div className="flex items-center gap-1">
          {/* View Team Details */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(openDetailModal(row))}
            title="View Details"
          >
            <Eye className="h-4 w-4 text-primary" />
          </Button>

          {/* Edit Team */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(openEditTeamModal(row))}
            title="Edit Team"
          >
            <Edit2 className="h-4 w-4 text-text-muted hover:text-text" />
          </Button>

          {/* Manage Members */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(openMembersModal(row))}
            title="Manage Members"
          >
            <UserCheck className="h-4 w-4 text-primary opacity-80 hover:opacity-100" />
          </Button>

          {/* Delete Team */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(openDeleteModal(row))}
            title="Delete Team"
          >
            <Trash2 className="h-4 w-4 text-danger opacity-80 hover:opacity-100" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <MainLayout
      title="Teams"
      subtitle="Manage bootcamp teams, assign members, and set team leaders."
    >
      <div className="space-y-6">
        {/* Page Header with Create Action */}
        <PageHeader
          title="Teams Management"
          subtitle="View, create, edit, and manage bootcamp student teams."
          action={
            <Button
              variant="primary"
              onClick={() => dispatch(openCreateTeamModal())}
            >
              <Plus className="h-4 w-4" />
              <span>Create Team</span>
            </Button>
          }
        />

        {/* Search & Filter Bar */}
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input
                id="search-teams"
                type="text"
                placeholder="Search teams by name or leader..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-9"
              />
            </div>

            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="flex items-center justify-center gap-1.5 text-xs font-medium text-primary hover:underline px-2 py-1"
              >
                <FilterX className="h-3.5 w-3.5" />
                <span>Clear Search</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Area (Loading, Error, Table, or Empty) */}
        {loading ? (
          <LoadingState message="Loading bootcamp teams..." />
        ) : error ? (
          <ErrorState
            title="Failed to load teams"
            message={error}
            action={
              <Button
                variant="outline"
                onClick={() => dispatch(fetchTeams({ search: searchQuery }))}
              >
                Retry
              </Button>
            }
          />
        ) : teams.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface">
            <EmptyState
              icon={Users}
              title={
                searchQuery
                  ? "No teams match your search"
                  : "No teams available"
              }
              description={
                searchQuery
                  ? "Try clearing or adjusting your search term."
                  : "Get started by creating a new team for your students."
              }
            />
          </div>
        ) : (
          <Table
            columns={columns}
            data={teams}
            emptyMessage="No teams found."
            rowKey={(r) => r._id || r.id}
          />
        )}

        {/* Create / Edit Team Modal */}
        <TeamModal
          isOpen={teamModalOpen}
          onClose={() => dispatch(closeTeamModal())}
          onSubmit={handleCreateOrUpdateSubmit}
          team={selectedTeam}
          students={students}
          loading={actionLoading}
          error={actionError}
        />

        {/* View Team Details Modal */}
        <TeamDetailModal
          isOpen={detailModalOpen}
          onClose={() => dispatch(closeDetailModal())}
          team={selectedTeam}
          onEdit={(t) => dispatch(openEditTeamModal(t))}
          onManageMembers={(t) => dispatch(openMembersModal(t))}
        />

        {/* Delete Confirmation Modal */}
        <DeleteTeamModal
          isOpen={deleteModalOpen}
          onClose={() => dispatch(closeDeleteModal())}
          onConfirm={handleDeleteConfirm}
          team={deletingTeam}
          loading={actionLoading}
          error={actionError}
        />

        {/* Manage Members Modal */}
        <ManageMembersModal
          isOpen={membersModalOpen}
          onClose={() => dispatch(closeMembersModal())}
          team={managingTeam}
          students={students}
          onAddMember={handleAddMember}
          onRemoveMember={handleRemoveMember}
          onChangeLeader={handleChangeLeader}
          loading={actionLoading}
          error={actionError}
        />
      </div>
    </MainLayout>
  );
}

export default Teams;