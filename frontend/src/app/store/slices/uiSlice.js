import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: true,
  mobileSidebarOpen: false,
  logoutModalOpen: false,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleMobileSidebar: (state) => {
      state.mobileSidebarOpen = !state.mobileSidebarOpen;
    },
    setMobileSidebarOpen: (state, action) => {
      state.mobileSidebarOpen = action.payload;
    },
    closeMobileSidebar: (state) => {
      state.mobileSidebarOpen = false;
    },
    openLogoutModal: (state) => {
      state.logoutModalOpen = true;
    },
    closeLogoutModal: (state) => {
      state.logoutModalOpen = false;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleMobileSidebar,
  setMobileSidebarOpen,
  closeMobileSidebar,
  openLogoutModal,
  closeLogoutModal,
} = uiSlice.actions;

export default uiSlice.reducer;
