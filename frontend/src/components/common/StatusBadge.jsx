import Badge from '../ui/Badge';

export function StatusBadge({ status, className }) {
  if (!status) return null;

  const normalized = String(status).toUpperCase();

  const config = {
    // Attendance
    PRESENT: { variant: 'success', label: 'Present' },
    ABSENT: { variant: 'danger', label: 'Absent' },
    LATE: { variant: 'warning', label: 'Late' },
    LEAVE: { variant: 'info', label: 'Leave' },
    EXCUSED: { variant: 'info', label: 'Excused' },

    // Submissions / Tasks
    PENDING: { variant: 'warning', label: 'Pending' },
    SUBMITTED: { variant: 'info', label: 'Submitted' },
    REVIEWED: { variant: 'success', label: 'Reviewed' },
    OVERDUE: { variant: 'danger', label: 'Overdue' },

    // Roles
    ADMIN: { variant: 'danger', label: 'Admin' },
    MENTOR: { variant: 'primary', label: 'Mentor' },
    STUDENT: { variant: 'default', label: 'Student' },

    // General Status
    ACTIVE: { variant: 'success', label: 'Active' },
    INACTIVE: { variant: 'default', label: 'Inactive' },
  };

  const current = config[normalized] || { variant: 'default', label: status };

  return (
    <Badge variant={current.variant} className={className}>
      {current.label}
    </Badge>
  );
}

export default StatusBadge;
