import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import teamService from "../../services/teamService";

export const fetchTeams = createAsyncThunk(
  "teams/fetchTeams",
  async (filters, { rejectWithValue }) => {
    try {
      const teams = await teamService.getTeams(filters);
      return Array.isArray(teams) ? teams : [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch teams"
      );
    }
  }
);

export const fetchStudents = createAsyncThunk(
  "teams/fetchStudents",
  async (_, { rejectWithValue }) => {
    try {
      const students = await teamService.getStudents();
      return Array.isArray(students) ? students : [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to fetch students"
      );
    }
  }
);

export const createTeamThunk = createAsyncThunk(
  "teams/createTeam",
  async (teamPayload, { rejectWithValue }) => {
    try {
      const newTeam = await teamService.createTeam(teamPayload);
      return newTeam;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to create team"
      );
    }
  }
);

export const updateTeamThunk = createAsyncThunk(
  "teams/updateTeam",
  async ({ id, teamPayload }, { rejectWithValue }) => {
    try {
      const updatedTeam = await teamService.updateTeam(id, teamPayload);
      return updatedTeam;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to update team"
      );
    }
  }
);

export const deleteTeamThunk = createAsyncThunk(
  "teams/deleteTeam",
  async (id, { rejectWithValue }) => {
    try {
      await teamService.deleteTeam(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete team"
      );
    }
  }
);

export const addMemberThunk = createAsyncThunk(
  "teams/addMember",
  async ({ teamId, studentId }, { rejectWithValue }) => {
    try {
      const updatedTeam = await teamService.addMember(teamId, studentId);
      return updatedTeam;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to add member to team"
      );
    }
  }
);

export const removeMemberThunk = createAsyncThunk(
  "teams/removeMember",
  async ({ teamId, studentId }, { rejectWithValue }) => {
    try {
      const updatedTeam = await teamService.removeMember(teamId, studentId);
      return updatedTeam;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to remove member from team"
      );
    }
  }
);

export const changeLeaderThunk = createAsyncThunk(
  "teams/changeLeader",
  async ({ teamId, leaderId }, { rejectWithValue }) => {
    try {
      const updatedTeam = await teamService.changeLeader(teamId, leaderId);
      return updatedTeam;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to change team leader"
      );
    }
  }
);

const initialState = {
  teams: [],
  students: [],
  searchQuery: "",
  loading: false,
  error: null,

  // Modals state
  teamModalOpen: false,
  detailModalOpen: false,
  deleteModalOpen: false,
  membersModalOpen: false,

  selectedTeam: null,
  deletingTeam: null,
  managingTeam: null,

  actionLoading: false,
  actionError: null,
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetSearchQuery: (state) => {
      state.searchQuery = "";
    },
    openCreateTeamModal: (state) => {
      state.selectedTeam = null;
      state.actionError = null;
      state.teamModalOpen = true;
    },
    openEditTeamModal: (state, action) => {
      state.selectedTeam = action.payload;
      state.actionError = null;
      state.teamModalOpen = true;
    },
    closeTeamModal: (state) => {
      state.teamModalOpen = false;
      state.selectedTeam = null;
      state.actionError = null;
    },
    openDetailModal: (state, action) => {
      state.selectedTeam = action.payload;
      state.detailModalOpen = true;
    },
    closeDetailModal: (state) => {
      state.detailModalOpen = false;
      state.selectedTeam = null;
    },
    openDeleteModal: (state, action) => {
      state.deletingTeam = action.payload;
      state.actionError = null;
      state.deleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
      state.deleteModalOpen = false;
      state.deletingTeam = null;
      state.actionError = null;
    },
    openMembersModal: (state, action) => {
      state.managingTeam = action.payload;
      state.actionError = null;
      state.membersModalOpen = true;
    },
    closeMembersModal: (state) => {
      state.membersModalOpen = false;
      state.managingTeam = null;
      state.actionError = null;
    },
    clearActionError: (state) => {
      state.actionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchTeams
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.loading = false;
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetchStudents
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      })

      // createTeamThunk
      .addCase(createTeamThunk.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(createTeamThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.teamModalOpen = false;
        state.teams = [action.payload, ...state.teams];
      })
      .addCase(createTeamThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // updateTeamThunk
      .addCase(updateTeamThunk.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(updateTeamThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.teamModalOpen = false;
        const updated = action.payload;
        state.teams = state.teams.map((t) =>
          (t._id || t.id) === (updated._id || updated.id) ? updated : t
        );
      })
      .addCase(updateTeamThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      })

      // deleteTeamThunk
      .addCase(deleteTeamThunk.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(deleteTeamThunk.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.deleteModalOpen = false;
        state.deletingTeam = null;
        const deletedId = action.payload;
        state.teams = state.teams.filter(
          (t) => t._id !== deletedId && t.id !== deletedId
        );
      })
      .addCase(deleteTeamThunk.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload;
      });
  },
});

export const {
  setSearchQuery,
  resetSearchQuery,
  openCreateTeamModal,
  openEditTeamModal,
  closeTeamModal,
  openDetailModal,
  closeDetailModal,
  openDeleteModal,
  closeDeleteModal,
  openMembersModal,
  closeMembersModal,
  clearActionError,
} = teamSlice.actions;

export default teamSlice.reducer;
