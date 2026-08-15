import { useState, useEffect } from "react";
import Modal from "../../components/ui/Modal";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";
import { UserCheck, Users } from "lucide-react";

function TeamModal({
  isOpen,
  onClose,
  onSubmit,
  team = null,
  students = [],
  loading = false,
  error = null,
}) {
  const isEditing = Boolean(team);

  const [formData, setFormData] = useState({
    name: "",
    memberIds: [],
    leaderId: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (team) {
      const existingMemberIds = (team.members || []).map((m) => m.id);
      setFormData({
        name: team.name || "",
        memberIds: existingMemberIds,
        leaderId: team.leaderId || existingMemberIds[0] || "",
      });
    } else {
      const initialMemberIds = students.length > 0 ? [students[0].id] : [];
      setFormData({
        name: "",
        memberIds: initialMemberIds,
        leaderId: initialMemberIds[0] || "",
      });
    }
    setErrors({});
  }, [team, isOpen, students]);

  const handleMemberToggle = (studentId) => {
    setFormData((prev) => {
      const isSelected = prev.memberIds.includes(studentId);
      let updatedMemberIds = [];

      if (isSelected) {
        updatedMemberIds = prev.memberIds.filter((id) => id !== studentId);
      } else {
        updatedMemberIds = [...prev.memberIds, studentId];
      }

      // If removed member was currently chosen as leader, reassign leader
      let updatedLeaderId = prev.leaderId;
      if (isSelected && prev.leaderId === studentId) {
        updatedLeaderId = updatedMemberIds.length > 0 ? updatedMemberIds[0] : "";
      } else if (!prev.leaderId && updatedMemberIds.length > 0) {
        updatedLeaderId = updatedMemberIds[0];
      }

      return {
        ...prev,
        memberIds: updatedMemberIds,
        leaderId: updatedLeaderId,
      };
    });

    if (errors.memberIds) {
      setErrors((prev) => ({ ...prev, memberIds: "" }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Team name is required.";
    }
    if (formData.memberIds.length === 0) {
      newErrors.memberIds = "Please select at least one team member.";
    }
    if (!formData.leaderId) {
      newErrors.leaderId = "Team leader assignment is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit(formData);
  };

  // Filter student options for leader select to selected members
  const selectedStudentObjects = students.filter((s) =>
    formData.memberIds.includes(s.id)
  );

  const leaderOptions = selectedStudentObjects.map((s) => ({
    value: s.id,
    label: `${s.name} (${s.rollNumber})`,
  }));

  const footer = (
    <>
      <Button variant="outline" onClick={onClose} disabled={loading}>
        Cancel
      </Button>
      <Button variant="primary" loading={loading} onClick={handleSubmit}>
        {isEditing ? "Save Changes" : "Create Team"}
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Team" : "Create New Team"}
      footer={footer}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-danger/10 p-3 text-xs font-medium text-danger border border-danger/20">
            {error}
          </div>
        )}

        {/* Team Name Input */}
        <Input
          id="name"
          name="name"
          label="Team Name"
          required
          placeholder="Enter team name (e.g. Alpha Developers)"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
        />

        {/* Team Members Selection */}
        <div>
          <label className="mb-1.5 flex items-center justify-between text-sm font-medium text-text">
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary" />
              <span>Select Team Members</span>
              <span className="text-danger">*</span>
            </span>
            <span className="text-xs text-text-muted">
              Selected ({formData.memberIds.length})
            </span>
          </label>

          <div className="max-h-48 overflow-y-auto rounded-lg border border-border bg-surface p-2 space-y-1">
            {students.length === 0 ? (
              <p className="p-2 text-center text-xs text-text-muted">
                No students available.
              </p>
            ) : (
              students.map((student) => {
                const isChecked = formData.memberIds.includes(student.id);
                return (
                  <label
                    key={student.id}
                    className={`flex items-center justify-between rounded-md px-3 py-2 text-sm cursor-pointer transition ${
                      isChecked
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-background text-text"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleMemberToggle(student.id)}
                        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                      />
                      <span>{student.name}</span>
                    </div>
                    <span className="text-xs font-mono text-text-muted">
                      {student.rollNumber}
                    </span>
                  </label>
                );
              })
            )}
          </div>
          {errors.memberIds && (
            <p className="mt-1 text-xs text-danger">{errors.memberIds}</p>
          )}
        </div>

        {/* Team Leader Select */}
        {formData.memberIds.length > 0 && (
          <Select
            id="leaderId"
            name="leaderId"
            label="Assign Team Leader"
            required
            options={leaderOptions}
            value={formData.leaderId}
            onChange={handleChange}
            error={errors.leaderId}
            placeholder="Select a team leader"
            helperText="Team leader must be selected from team members."
          />
        )}
      </form>
    </Modal>
  );
}

export default TeamModal;
