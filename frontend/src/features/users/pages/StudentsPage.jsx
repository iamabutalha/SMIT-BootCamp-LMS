import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Eye, Pencil, Plus, Search, UserRound } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../components/ui/Table';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/Card';
import Modal from '../../../components/ui/Modal';
import EmptyState from '../../../components/common/EmptyState';
import StudentForm from '../components/StudentForm';
import StudentDetailsPage from './StudentDetailsPage';
import {
  addStudent,
  clearStudentsError,
  setStudentsError,
  setStudentsFilters,
  setStudentsLoading,
  setStudentsSearchTerm,
  updateStudent,
} from '../studentsSlice';
import { selectFilteredStudents, selectStudentsStats } from '../studentsSelectors';
import { ROUTES } from '../../../constants/routes';

export function StudentsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector(selectFilteredStudents);
  const stats = useSelector(selectStudentsStats);
  const loading = useSelector((state) => state.students?.loading);
  const error = useSelector((state) => state.students?.error);
  const filters = useSelector((state) => state.students?.filters || { course: 'All', batch: 'All', team: 'All' });
  const searchTerm = useSelector((state) => state.students?.searchTerm || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewingStudent, setViewingStudent] = useState(null);

  const handleOpenView = (student) => {
    const studentKey = student?.id ?? student?._id ?? student?.rollNumber;
    if (!studentKey) {
      console.error('[StudentsPage] Cannot navigate: Student object has no valid id, _id, or rollNumber', student);
      return;
    }
    navigate(`/admin/students/${studentKey}`);
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      dispatch(setStudentsLoading(false));
    }, 350);

    return () => window.clearTimeout(timer);
  }, [dispatch]);

  const handleOpenAdd = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (selectedStudent) {
      dispatch(updateStudent({ id: selectedStudent.id, ...values }));
    } else {
      dispatch(addStudent(values));
    }
    setIsModalOpen(false);
    setSelectedStudent(null);
    dispatch(setStudentsError(null));
  };

  const handleRetry = () => {
    dispatch(clearStudentsError());
    dispatch(setStudentsLoading(true));
    window.setTimeout(() => dispatch(setStudentsLoading(false)), 350);
  };

  const summaryCards = useMemo(
    () => [
      { label: 'Total Students', value: stats.totalStudents },
      { label: 'Courses', value: stats.courses.length },
      { label: 'Teams', value: stats.teams.length },
    ],
    [stats]
  );

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-10 w-40 animate-pulse rounded-lg bg-slate-200" />
        <div className="grid gap-4 md:grid-cols-3">
          {summaryCards.map((item) => (
            <div key={item.label} className="h-24 animate-pulse rounded-xl bg-slate-200" />
          ))}
        </div>
        <div className="h-80 animate-pulse rounded-xl bg-slate-200" />
      </div>
    );
  }

  if (error) {
    return (
      <EmptyState
        title="Unable to load students"
        description="Please try again to refresh the student list."
        action={{ label: 'Retry', onClick: handleRetry }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Students Management</h1>
          <p className="text-sm text-slate-500 mt-1">Manage student records, search by roll number, and review details.</p>
        </div>
        <Button variant="primary" onClick={handleOpenAdd} leftIcon={<Plus className="h-4 w-4" />} className="w-full sm:w-auto">
          Add Student
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((item) => (
          <Card key={item.label} className="border-slate-200 shadow-2xs">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.label}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#006B3C]">{item.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-slate-200 shadow-2xs">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                placeholder="Search by roll number or name"
                value={searchTerm}
                onChange={(event) => dispatch(setStudentsSearchTerm(event.target.value))}
                className="pl-9"
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <select
                value={filters.course}
                onChange={(event) => dispatch(setStudentsFilters({ course: event.target.value }))}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
              >
                <option value="All">All Courses</option>
                {stats.courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
              <select
                value={filters.batch}
                onChange={(event) => dispatch(setStudentsFilters({ batch: event.target.value }))}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
              >
                <option value="All">All Batches</option>
                {stats.batches.map((batch) => (
                  <option key={batch} value={batch}>
                    {batch}
                  </option>
                ))}
              </select>
              <select
                value={filters.team}
                onChange={(event) => dispatch(setStudentsFilters({ team: event.target.value }))}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#006B3C]"
              >
                <option value="All">All Teams</option>
                {stats.teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {students.length === 0 ? (
            <EmptyState title="No Students Found" description="Try adjusting your search or filters to find the right student." />
          ) : (
            <div className="mt-4 overflow-x-auto">
              <Table className="min-w-[760px]">
                <TableHeader>
                  <TableRow className="bg-slate-50/80">
                    <TableHead className="font-semibold">Roll Number</TableHead>
                    <TableHead className="font-semibold">Student Name</TableHead>
                    <TableHead className="font-semibold">Course</TableHead>
                    <TableHead className="font-semibold">Batch</TableHead>
                    <TableHead className="font-semibold">Team</TableHead>
                    <TableHead className="text-right font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    const studentKey = student.id || student._id || student.rollNumber || '1';
                    return (
                      <TableRow key={studentKey}>
                        <TableCell
                          onClick={() => handleOpenView(student)}
                          className="font-bold text-[#006B3C] cursor-pointer hover:underline"
                        >
                          {student.rollNumber}
                        </TableCell>
                        <TableCell
                          onClick={() => handleOpenView(student)}
                          className="cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <div className="rounded-full bg-[#E8F7DF] p-2 text-[#006B3C]">
                              <UserRound className="h-4 w-4" />
                            </div>
                            <span className="font-bold text-slate-900 hover:text-[#006B3C] transition-colors">{student.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>{student.batch}</TableCell>
                        <TableCell>{student.team}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2 flex-wrap">
                            <Button size="sm" variant="outline" onClick={() => handleOpenView(student)} title="View Student Profile">
                              <Eye className="h-4 w-4 text-slate-600" />
                            </Button>
                            <Button size="sm" variant="outline" onClick={() => handleOpenEdit(student)} title="Edit Student">
                              <Pencil className="h-4 w-4 text-slate-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedStudent ? 'Edit Student' : 'Add Student'} subtitle="Fill in the student details below.">
        <StudentForm key={selectedStudent?.id || 'new-student'} student={selectedStudent} onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
}

export default StudentsPage;
