import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, UserRound, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { LoadingState } from '@/components/common/LoadingState';
import StudentHeader from '../components/StudentHeader';
import StudentOverviewCards from '../components/StudentOverviewCards';
import StudentTeamCard from '../components/StudentTeamCard';
import StudentAttendanceSection from '../components/StudentAttendanceSection';
import StudentPerformanceSection from '../components/StudentPerformanceSection';
import StudentAssignmentsSection from '../components/StudentAssignmentsSection';
import { getStudentDetails } from '../studentDetailsService';

export function StudentDetailsPage({ studentId: studentIdProp, onBack: onBackProp }) {
  const params = useParams();
  const navigate = useNavigate();
  const studentId = studentIdProp || params.studentId || '1';

  const initialData = useMemo(() => getStudentDetails(studentId), [studentId]);
  const [student, setStudent] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState(() => ({
    name: initialData?.name || '',
    email: initialData?.email || '',
    rollNumber: initialData?.rollNumber || '',
    course: initialData?.course || '',
  }));

  useEffect(() => {
    const data = getStudentDetails(studentId);
    setStudent(data);
    if (data) {
      setEditFormData({
        name: data.name,
        email: data.email,
        rollNumber: data.rollNumber,
        course: data.course,
      });
    }
  }, [studentId]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setStudent((prev) => ({
      ...prev,
      name: editFormData.name,
      email: editFormData.email,
      rollNumber: editFormData.rollNumber,
      course: editFormData.course,
    }));
    toast.success('Student profile updated successfully!');
    setIsEditModalOpen(false);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-[#F8F9FB] min-h-screen">
        <LoadingState text="Loading student performance details..." />
      </div>
    );
  }

  // Error State: Student Not Found
  if (!student) {
    return (
      <div className="p-6 bg-[#F8F9FB] min-h-screen font-sans">
        <div className="bg-white p-8 rounded-[16px] border border-slate-200/80 shadow-2xs text-center space-y-4 max-w-lg mx-auto mt-12">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Student Not Found</h2>
          <p className="text-xs text-slate-500">
            The requested student record could not be found or may have been removed.
          </p>
          <Button
            size="sm"
            onClick={() => navigate('/admin/students')}
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            className="bg-[#006B3C] hover:bg-[#005530] text-xs font-bold"
          >
            Back to Students Roster
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 bg-[#F8F9FB] min-h-screen font-sans">
      {/* Student Profile Header */}
      <StudentHeader student={student} onEditClick={() => setIsEditModalOpen(true)} onBack={onBackProp} />

      {/* Student Summary Metric Cards */}
      <StudentOverviewCards overview={student.overview} />

      {/* Grid: Team Card & Performance Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4">
          <StudentTeamCard team={student.team} />
        </div>
        <div className="lg:col-span-8">
          <StudentPerformanceSection performance={student.performance} />
        </div>
      </div>

      {/* Attendance Section (History & Recharts Trend Chart) */}
      <StudentAttendanceSection attendance={student.attendance} />

      {/* Assignments Roster & Status Filter */}
      <StudentAssignmentsSection assignments={student.assignments} />

      {/* Edit Student Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Student Information"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4 text-xs font-sans">
            <Input
              label="Student Name"
              value={editFormData.name}
              onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
              required
            />
            <Input
              label="Email Address"
              type="email"
              value={editFormData.email}
              onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
              required
            />
            <Input
              label="Roll Number"
              value={editFormData.rollNumber}
              onChange={(e) => setEditFormData({ ...editFormData, rollNumber: e.target.value })}
              required
            />
            <Input
              label="Course"
              value={editFormData.course}
              onChange={(e) => setEditFormData({ ...editFormData, course: e.target.value })}
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

export default StudentDetailsPage;
