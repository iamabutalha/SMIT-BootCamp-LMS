import apiClient from "./apiClient";

const teamService = {
  // Fetch available students
  getStudents: async () => {
    try {
      const response = await apiClient.get("/students");
      return response.data?.data || response.data || [];
    } catch {
      return [];
    }
  },

  // Fetch list of teams from backend
  getTeams: async (filters = {}) => {
    try {
      const response = await apiClient.get("/teams", { params: filters });
      const data = response.data?.data || response.data;
      if (Array.isArray(data)) {
        return data;
      }
    } catch (err) {
      console.warn("Could not fetch teams from API:", err);
    }
    return [];
  },

  // Get single team by ID
  getTeamById: async (id) => {
    const response = await apiClient.get(`/teams/${id}`);
    return response.data?.data || response.data;
  },

  // Create new team
  createTeam: async (teamPayload) => {
    const response = await apiClient.post("/teams", teamPayload);
    return response.data?.data || response.data;
  },

  // Update existing team
  updateTeam: async (id, teamPayload) => {
    const response = await apiClient.put(`/teams/${id}`, teamPayload);
    return response.data?.data || response.data;
  },

  // Delete team
  deleteTeam: async (id) => {
    const response = await apiClient.delete(`/teams/${id}`);
    return response.data;
  },

  // Add member to team
  addMember: async (teamId, studentId) => {
    const response = await apiClient.post(`/teams/${teamId}/members`, {
      studentId,
    });
    return response.data?.data || response.data;
  },

  // Remove member from team
  removeMember: async (teamId, studentId) => {
    const response = await apiClient.delete(
      `/teams/${teamId}/members/${studentId}`
    );
    return response.data?.data || response.data;
  },

  // Change team leader
  changeLeader: async (teamId, leaderId) => {
    const response = await apiClient.patch(`/teams/${teamId}/leader`, {
      leaderId,
    });
    return response.data?.data || response.data;
  },
};

export default teamService;
