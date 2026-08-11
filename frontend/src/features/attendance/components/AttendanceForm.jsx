import { useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { attendanceStatuses } from '../api/attendanceApi';

function AttendanceForm({ onSubmit, isLoading = false }) {
  const [rollNumber, setRollNumber] = useState('');
  const [status, setStatus] = useState('Present');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalizedRoll = rollNumber.trim();

    if (!/^[0-9]{6}$/.test(normalizedRoll)) {
      setError('Please enter a valid 6-digit roll number (e.g. 102341).');
      return;
    }

    setError('');
    onSubmit({ rollNumber: normalizedRoll, status });
    setRollNumber('');
    setStatus('Present');
  };

  const getStatusBadgeStyle = (option) => {
    const isSelected = status === option;
    if (!isSelected) {
      return 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 border border-transparent';
    }

    switch (option) {
      case 'Present':
        return 'bg-[#006B3C] text-white font-semibold shadow-xs ring-2 ring-[#006B3C]/20 border border-[#006B3C]';
      case 'Absent':
        return 'bg-[#DE646D] text-white font-semibold shadow-xs ring-2 ring-[#DE646D]/20 border border-[#DE646D]';
      case 'Late':
        return 'bg-[#DAA622] text-white font-semibold shadow-xs ring-2 ring-[#DAA622]/20 border border-[#DAA622]';
      case 'Leave':
        return 'bg-[#2D67E4] text-white font-semibold shadow-xs ring-2 ring-[#2D67E4]/20 border border-[#2D67E4]';
      default:
        return 'bg-[#006B3C] text-white font-semibold shadow-xs border border-[#006B3C]';
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="Roll Number"
        value={rollNumber}
        onChange={(event) => setRollNumber(event.target.value)}
        placeholder="102341"
        maxLength={6}
        error={error}
        disabled={isLoading}
      />
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
          Attendance Status
        </label>
        <div className="flex flex-wrap gap-2">
          {attendanceStatuses.map((option) => (
            <button
              key={option}
              type="button"
              disabled={isLoading}
              onClick={() => setStatus(option)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition cursor-pointer disabled:opacity-50 ${getStatusBadgeStyle(
                option
              )}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex pt-2 sm:justify-end">
        <Button variant="primary" type="submit" isLoading={isLoading} className="w-full sm:w-auto">
          Mark Attendance
        </Button>
      </div>
    </form>
  );
}

export default AttendanceForm;
