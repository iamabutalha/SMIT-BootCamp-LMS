import { useState, useEffect } from "react";
import Modal from "../../../components/ui/Modal";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Button from "../../../components/ui/Button";

const STATUS_OPTIONS = [
  { value: "Pending", label: "Pending" },
  { value: "In Progress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
];
function TaskModal({
  isOpen,
  onClose,
  onSubmit,
  task = null,
  students = [],
  loading = false,
  error = null,
}) {
  const isEditing = Boolean(task);

  const [formData, setFormData] = useState({
    studentId: "",
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        studentId: task.studentId || "",
        title: task.title || "",
        description: task.description || "",
        dueDate: task.dueDate || "",
        status: task.status || "Pending",
      });
    } else {
      setFormData({
        studentId: students[0]?.id || "",
        title: "",
        description: "",
        dueDate: new Date().toISOString().split("T")[0],
        status: "Pending",
      });
    }
    setErrors({});
  }, [task, isOpen, students]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.studentId) newErrors.studentId = "Student selection is required.";
    if (!formData.title.trim()) newErrors.title = "Task title is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.dueDate) newErrors.dueDate = "Due date is required.";
    if (!formData.status) newErrors.status = "Status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  const studentOptions = students.map((s) => ({
    value: s.id,
    label: `${s.name} (${s.rollNumber})`,
  }));

  const footer = (
    <>
      <Button variant="outline" onClick={onClose} disabled={loading}>
        Cancel
      </Button>
      <Button variant="primary" loading={loading} onClick={handleSubmit}>
        {isEditing ? "Save Changes" : "Create Task"}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Task" : "Create New Task"}
      footer={footer}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-danger/10 p-3 text-xs font-medium text-danger border border-danger/20">
            {error}
          </div>
        )}

        {/* Student Select */}
        <Select
          id="studentId"
          name="studentId"
          label="Student"
          required
          options={studentOptions}
          value={formData.studentId}
          onChange={handleChange}
          error={errors.studentId}
          placeholder="Select a student"
        />

        {/* Task Title Input */}
        <Input
          id="title"
          name="title"
          label="Task Title"
          required
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
        />

        {/* Description Textarea */}
        <div className="w-full">
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium text-text">
            Description <span className="ml-1 text-danger">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            className={`
              w-full
              rounded-lg
              border
              bg-surface
              px-3
              py-2.5
              text-sm
              text-text
              outline-none
              transition
              placeholder:text-text-muted
              focus:ring-2
              focus:ring-primary/20
              disabled:cursor-not-allowed
              disabled:bg-background
              disabled:opacity-60
              ${errors.description ? "border-danger focus:border-danger" : "border-border focus:border-primary"}
            `}
            placeholder="Enter task description and instructions..."
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-danger">{errors.description}</p>
          )}
        </div>

        {/* Due Date & Status */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            id="dueDate"
            name="dueDate"
            type="date"
            label="Due Date"
            required
            value={formData.dueDate}
            onChange={handleChange}
            error={errors.dueDate}
          />

          <Select
            id="status"
            name="status"
            label="Status"
            required
            options={STATUS_OPTIONS}
            value={formData.status}
            onChange={handleChange}
            error={errors.status}
          />
        </div>
      </form>
    </Modal>
  );
}

export default TaskModal;
