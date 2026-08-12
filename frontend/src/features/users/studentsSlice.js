import { createSlice } from '@reduxjs/toolkit';

const initialStudents = [
  {
    id: '1',
    rollNumber: '102341',
    name: 'Muhammad Ali',
    course: 'Web & Mobile Dev',
    batch: 'Batch 10',
    team: 'Alpha',
    email: 'ali@example.com',
  },
  {
    id: '2',
    rollNumber: '102342',
    name: 'Fatima Ahmed',
    course: 'Web & Mobile Dev',
    batch: 'Batch 10',
    team: 'Beta',
    email: 'fatima@example.com',
  },
  {
    id: '3',
    rollNumber: '102343',
    name: 'Usman Ghani',
    course: 'AI & Data Science',
    batch: 'Batch 9',
    team: 'Alpha',
    email: 'usman@example.com',
  },
  {
    id: '4',
    rollNumber: '102344',
    name: 'Aisha Malik',
    course: 'Cloud Native',
    batch: 'Batch 10',
    team: 'Gamma',
    email: 'aisha@example.com',
  },
  {
    id: '5',
    rollNumber: '102345',
    name: 'Bilal Hussain',
    course: 'Web & Mobile Dev',
    batch: 'Batch 9',
    team: 'Beta',
    email: 'bilal@example.com',
  },
];

const initialState = {
  items: initialStudents,
  loading: true,
  error: null,
  searchTerm: '',
  filters: {
    course: 'All',
    batch: 'All',
    team: 'All',
  },
};

export const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    addStudent: (state, action) => {
      const newStudent = {
        id: Date.now().toString(),
        rollNumber: action.payload.rollNumber || `10${Math.floor(1000 + Math.random() * 9000)}`,
        name: action.payload.name,
        course: action.payload.course || 'Web & Mobile Dev',
        batch: action.payload.batch || 'Batch 10',
        team: action.payload.team || 'Alpha',
        email: action.payload.email || '',
      };
      state.items.unshift(newStudent);
    },
    updateStudent: (state, action) => {
      const index = state.items.findIndex((s) => s.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
    setStudentsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setStudentsError: (state, action) => {
      state.error = action.payload;
    },
    clearStudentsError: (state) => {
      state.error = null;
    },
    setStudentsSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setStudentsFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const {
  addStudent,
  updateStudent,
  setStudentsLoading,
  setStudentsError,
  clearStudentsError,
  setStudentsSearchTerm,
  setStudentsFilters,
} = studentsSlice.actions;

export default studentsSlice.reducer;
