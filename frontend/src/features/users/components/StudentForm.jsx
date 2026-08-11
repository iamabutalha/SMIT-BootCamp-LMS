import { useState } from 'react';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

function StudentForm({ student, onSubmit }) {
  const [rollNumber, setRollNumber] = useState(student?.rollNumber || '');
  const [name, setName] = useState(student?.name || '');
  const [course, setCourse] = useState(student?.course || 'Web & Mobile Dev');
  const [batch, setBatch] = useState(student?.batch || 'Batch 10');
  const [team, setTeam] = useState(student?.team || 'Alpha');
  const [email, setEmail] = useState(student?.email || '');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!rollNumber.trim() || !/^[0-9]{6}$/.test(rollNumber.trim())) {
      newErrors.rollNumber = 'Please enter a valid 6-digit roll number.';
    }
    if (!name.trim()) {
      newErrors.name = 'Student name is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      rollNumber: rollNumber.trim(),
      name: name.trim(),
      course: course.trim(),
      batch: batch.trim(),
      team: team.trim(),
      email: email.trim(),
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <Input
        label="Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        placeholder="102341"
        maxLength={6}
        error={errors.rollNumber}
      />
      <Input
        label="Student Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Muhammad Ali"
        error={errors.name}
      />
      <Input
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="student@saylani.org"
      />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Course
          </label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
          >
            <option value="Web & Mobile Dev">Web & Mobile Dev</option>
            <option value="AI & Data Science">AI & Data Science</option>
            <option value="Cloud Native">Cloud Native</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Batch
          </label>
          <select
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
          >
            <option value="Batch 10">Batch 10</option>
            <option value="Batch 9">Batch 9</option>
            <option value="Batch 8">Batch 8</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
            Team
          </label>
          <select
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
          >
            <option value="Alpha">Alpha</option>
            <option value="Beta">Beta</option>
            <option value="Gamma">Gamma</option>
          </select>
        </div>
      </div>

      <div className="flex pt-4 sm:justify-end gap-3">
        <Button variant="primary" type="submit" className="w-full sm:w-auto">
          {student ? 'Save Changes' : 'Add Student'}
        </Button>
      </div>
    </form>
  );
}

export default StudentForm;
