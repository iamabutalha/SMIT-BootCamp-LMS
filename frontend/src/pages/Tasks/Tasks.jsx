import { useEffect } from "react";
import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import Table from "../../components/ui/Table";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Select from "../../components/ui/Select";
import Input from "../../components/ui/Input";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";

import TaskModal from "./modals/TaskModal";
import TaskDetailModal from "./modals/TaskDetailModal";
import DeleteTaskModal from "./modals/DeleteTaskModal";
import StudentTaskHistoryModal from "./modals/StudentTaskHistoryModal";

import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchTasks,
  fetchStudents,
  createTaskThunk,
  updateTaskThunk,
  updateTaskStatusThunk,
  deleteTaskThunk,
  setFilters,
  resetFilters,
  openCreateTaskModal,
  openEditTaskModal,
  closeTaskModal,
  openDetailModal,
  closeDetailModal,
  openDeleteModal,
  closeDeleteModal,
  openHistoryModal,
  closeHistoryModal,
} from "../../store/slices/taskSlice";

import {
  Plus,
  Eye,
  Edit2,
  Trash2,
  History,
  FilterX,
  ClipboardList,
} from "lucide-react";

import { formatDMY } from "../../utils/dateUtils";

const getStatusBadgeVariant = (status) => {
  switch (status) {
    case "Completed":
      return "success";
    case "In Progress":
      return "info";
    case "Pending":
      return "warning";
    default:
      return "neutral";
  }
};

const STATUS_FILTER_OPTIONS = [
  { value: "", label: "All Statuses" },
  { value: "Pending", label: "Pending" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];

function Tasks() {
  const dispatch = useAppDispatch();
  const {
    tasks,
    students,
    filters,
    loading,
    error,
    taskModalOpen,
    detailModalOpen,
    deleteModalOpen,
    historyModalOpen,
    selectedTask,
    deletingTask,
    historyStudent,
    actionLoading,
    actionError,
  } = useAppSelector((state) => state.task);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchTasks(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    dispatch(setFilters({ [key]: value }));
  };

  const handleClearFilters = () => {
    dispatch(resetFilters());
  };

  const handleCreateSubmit = (formData) => {
    if (selectedTask) {
      dispatch(updateTaskThunk({ id: selectedTask.id, taskPayload: formData }));
    } else {
      dispatch(createTaskThunk(formData));
    }
  };

  const handleDeleteConfirm = (id) => {
    dispatch(deleteTaskThunk(id));
  };

  const handleStatusChange = (id, newStatus) => {
    dispatch(updateTaskStatusThunk({ id, status: newStatus }));
  };

  const studentFilterOptions = [
    { value: "", label: "All Students" },
    ...students.map((s) => ({
      value: s.id,
      label: `${s.name} (${s.rollNumber})`,
    })),
  ];

  const columns = [
    {
      key: "studentName",
      label: "Student Name",
      render: (row) => (
        <button
          type="button"
          onClick={() => dispatch(openHistoryModal(row))}
          className="group flex flex-col items-start text-left hover:opacity-80 transition"
          title="Click to view student task history"
        >
          <span className="font-semibold text-primary group-hover:underline flex items-center gap-1.5">
            {row.studentName}
            <History className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100" />
          </span>
          <span className="text-xs font-mono text-text-muted">
            {row.rollNumber}
          </span>
        </button>
      ),
    },
    {
      key: "rollNumber",
      label: "Roll Number",
      render: (row) => (
        <span className="font-mono text-xs font-medium text-text-muted">
          {row.rollNumber}
        </span>
      ),
    },
    {
      key: "title",
      label: "Task Title",
      render: (row) => (
        <div>
          <span className="font-semibold text-text">{row.title}</span>
          {row.description && (
            <p className="line-clamp-1 text-xs text-text-muted">
              {row.description}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "dueDate",
      label: "Due Date",
      render: (row) => (
        <span className="text-xs font-medium text-text-muted">
          {formatDMY(row.dueDate)}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge variant={getStatusBadgeVariant(row.status)}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "action",
      label: "Action",
      render: (row) => (
        <div className="flex items-center gap-1">
          {/* View Details */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(openDetailModal(row))}
            title="View Details"
          >
            <Eye className="h-4 w-4 text-primary" />
          </Button>

          {/* Edit Task */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(openEditTaskModal(row))}
            title="Edit Task"
          >
            <Edit2 className="h-4 w-4 text-text-muted hover:text-text" />
          </Button>

          {/* Quick Status Select */}
          <select
            value={row.status}
            onChange={(e) => handleStatusChange(row.id, e.target.value)}
            className="rounded border border-border bg-surface px-1.5 py-1 text-xs text-text outline-none hover:bg-background focus:ring-1 focus:ring-primary"
            title="Quickly change status"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Delete Task */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(openDeleteModal(row))}
            title="Delete Task"
          >
            <Trash2 className="h-4 w-4 text-danger opacity-80 hover:opacity-100" />
          </Button>
        </div>
      ),
    },
  ];

  const hasActiveFilters = Boolean(
    filters.studentId || filters.status || filters.date
  );

  return (
    <MainLayout
      title="Tasks"
      subtitle="Manage bootcamp tasks, track progress, and assign student work."
    >
      <div className="space-y-6">
        {/* Header with Create Task Action */}
        <PageHeader
          title="Tasks Management"
          subtitle="View, create, filter, and track student tasks."
          action={
            <Button
              variant="primary"
              onClick={() => dispatch(openCreateTaskModal())}
            >
              <Plus className="h-4 w-4" />
              <span>Create Task</span>
            </Button>
          }
        />

        {/* Filtering Bar */}
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Filter Tasks
            </h2>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <FilterX className="h-3.5 w-3.5" />
                <span>Clear Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Student Filter */}
            <Select
              id="filter-student"
              label="Student"
              options={studentFilterOptions}
              value={filters.studentId}
              onChange={(e) => handleFilterChange("studentId", e.target.value)}
              placeholder="All Students"
            />

            {/* Status Filter */}
            <Select
              id="filter-status"
              label="Status"
              options={STATUS_FILTER_OPTIONS}
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              placeholder="All Statuses"
            />

            {/* Date Filter */}
            <Input
              id="filter-date"
              type="date"
              label="Due Date"
              value={filters.date}
              onChange={(e) => handleFilterChange("date", e.target.value)}
            />
          </div>
        </div>

        {/* Content Area (Loading, Error, Table, or Empty) */}
        {loading ? (
          <LoadingState message="Loading bootcamp tasks..." />
        ) : error ? (
          <ErrorState
            title="Failed to load tasks"
            message={error}
            action={
              <Button
                variant="outline"
                onClick={() => dispatch(fetchTasks(filters))}
              >
                Retry
              </Button>
            }
          />
        ) : tasks.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface">
            <EmptyState
              icon={ClipboardList}
              title={
                hasActiveFilters
                  ? "No tasks match your filters"
                  : "No tasks available"
              }
              description={
                hasActiveFilters
                  ? "Try clearing or adjusting your filter criteria."
                  : "Get started by creating a new task for your students."
              }
            />
          </div>
        ) : (
          <Table
            columns={columns}
            data={tasks}
            emptyMessage="No tasks found."
            rowKey="id"
          />
        )}

        {/* Create / Edit Task Modal */}
        <TaskModal
          isOpen={taskModalOpen}
          onClose={() => dispatch(closeTaskModal())}
          onSubmit={handleCreateSubmit}
          task={selectedTask}
          students={students}
          loading={actionLoading}
          error={actionError}
        />

        {/* View Task Details Modal */}
        <TaskDetailModal
          isOpen={detailModalOpen}
          onClose={() => dispatch(closeDetailModal())}
          task={selectedTask}
          onEdit={(t) => dispatch(openEditTaskModal(t))}
          onStatusChange={handleStatusChange}
        />

        {/* Delete Confirmation Modal */}
        <DeleteTaskModal
          isOpen={deleteModalOpen}
          onClose={() => dispatch(closeDeleteModal())}
          onConfirm={handleDeleteConfirm}
          task={deletingTask}
          loading={actionLoading}
          error={actionError}
        />

        {/* Student Task History Modal */}
        <StudentTaskHistoryModal
          isOpen={historyModalOpen}
          onClose={() => dispatch(closeHistoryModal())}
          student={historyStudent}
        />
      </div>
    </MainLayout>
  );
}

export default Tasks;