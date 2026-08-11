import { createSelector } from '@reduxjs/toolkit';

const selectStudentsState = (state) => state.students;

export const selectAllStudents = (state) => state.students?.items || [];
export const selectStudentsSearchTerm = (state) => state.students?.searchTerm || '';
export const selectStudentsFilters = (state) => state.students?.filters || { course: 'All', batch: 'All', team: 'All' };

export const selectFilteredStudents = createSelector(
  [selectAllStudents, selectStudentsSearchTerm, selectStudentsFilters],
  (students, searchTerm, filters) => {
    return students.filter((student) => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        student.name?.toLowerCase().includes(term) ||
        student.rollNumber?.toLowerCase().includes(term) ||
        student.email?.toLowerCase().includes(term);

      const matchesCourse = filters.course === 'All' || student.course === filters.course;
      const matchesBatch = filters.batch === 'All' || student.batch === filters.batch;
      const matchesTeam = filters.team === 'All' || student.team === filters.team;

      return matchesSearch && matchesCourse && matchesBatch && matchesTeam;
    });
  }
);

export const selectStudentsStats = createSelector([selectAllStudents], (students) => {
  const courses = Array.from(new Set(students.map((s) => s.course).filter(Boolean)));
  const batches = Array.from(new Set(students.map((s) => s.batch).filter(Boolean)));
  const teams = Array.from(new Set(students.map((s) => s.team).filter(Boolean)));

  return {
    totalStudents: students.length,
    courses,
    batches,
    teams,
  };
});
