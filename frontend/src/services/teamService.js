import apiClient from "./apiClient";

const INITIAL_STUDENTS = [
  { id: "std-1", name: "Ali Raza", rollNumber: "SMIT-2024-001", email: "ali.raza@example.com" },
  { id: "std-2", name: "Sara Ahmed", rollNumber: "SMIT-2024-002", email: "sara.ahmed@example.com" },
  { id: "std-3", name: "Usman Khan", rollNumber: "SMIT-2024-003", email: "usman.khan@example.com" },
  { id: "std-4", name: "Fatima Noor", rollNumber: "SMIT-2024-004", email: "fatima.noor@example.com" },
  { id: "std-5", name: "Zaid Hassan", rollNumber: "SMIT-2024-005", email: "zaid.hassan@example.com" },
];

const INITIAL_TEAMS = [
  {
    id: "team-1",
    name: "Alpha Web Developers",
    leaderId: "std-1",
    leaderName: "Ali Raza",
    members: [
      { id: "std-1", name: "Ali Raza", rollNumber: "SMIT-2024-001", email: "ali.raza@example.com" },
      { id: "std-2", name: "Sara Ahmed", rollNumber: "SMIT-2024-002", email: "sara.ahmed@example.com" },
    ],
    createdAt: "2026-08-01",
  },
  {
    id: "team-2",
    name: "Code Crafters",
    leaderId: "std-3",
    leaderName: "Usman Khan",
    members: [
      { id: "std-3", name: "Usman Khan", rollNumber: "SMIT-2024-003", email: "usman.khan@example.com" },
      { id: "std-4", name: "Fatima Noor", rollNumber: "SMIT-2024-004", email: "fatima.noor@example.com" },
      { id: "std-5", name: "Zaid Hassan", rollNumber: "SMIT-2024-005", email: "zaid.hassan@example.com" },
    ],
    createdAt: "2026-08-05",
  },
];

let teamsData = [...INITIAL_TEAMS];
let studentsData = [...INITIAL_STUDENTS];

const teamService = {
  // Fetch available students
  getStudents: async () => {
    try {
      const response = await apiClient.get("/students");
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
    } catch {
      // Fallback local students data
    }
    return studentsData;
  },

  // Fetch list of teams
  getTeams: async (filters = {}) => {
    try {
      const response = await apiClient.get("/teams", { params: filters });
      if (response.data && Array.isArray(response.data)) {
        return response.data;
      }
    } catch {
      // Fallback local filtering
    }

    let filtered = [...teamsData];

    if (filters.search) {
      const query = filters.search.toLowerCase();
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(query) ||
          (t.leaderName && t.leaderName.toLowerCase().includes(query))
      );
    }

    return filtered;
  },

  // Get single team by ID
  getTeamById: async (id) => {
    try {
      const response = await apiClient.get(`/teams/${id}`);
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback lookup
    }
    const team = teamsData.find((t) => t.id === id);
    if (!team) throw new Error("Team not found");
    return team;
  },

  // Create new team
  createTeam: async (teamPayload) => {
    const { name, memberIds = [], leaderId } = teamPayload;
    const selectedMembers = studentsData.filter((s) => memberIds.includes(s.id));
    const leader = studentsData.find((s) => s.id === leaderId) || selectedMembers[0];

    const newTeam = {
      id: `team-${Date.now()}`,
      name,
      leaderId: leader ? leader.id : "",
      leaderName: leader ? leader.name : "N/A",
      members: selectedMembers,
      createdAt: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await apiClient.post("/teams", newTeam);
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback local save
    }

    teamsData = [newTeam, ...teamsData];
    return newTeam;
  },

  // Update existing team
  updateTeam: async (id, teamPayload) => {
    const { name, memberIds = [], leaderId } = teamPayload;
    const selectedMembers = studentsData.filter((s) => memberIds.includes(s.id));
    const leader = studentsData.find((s) => s.id === leaderId) || selectedMembers[0];

    const updatedFields = {
      name,
      leaderId: leader ? leader.id : "",
      leaderName: leader ? leader.name : "N/A",
      members: selectedMembers,
    };

    try {
      const response = await apiClient.put(`/teams/${id}`, updatedFields);
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback local update
    }

    teamsData = teamsData.map((t) =>
      t.id === id ? { ...t, ...updatedFields } : t
    );
    const updated = teamsData.find((t) => t.id === id);
    return updated;
  },

  // Delete team
  deleteTeam: async (id) => {
    try {
      await apiClient.delete(`/teams/${id}`);
    } catch {
      // Fallback local delete
    }

    teamsData = teamsData.filter((t) => t.id !== id);
    return { success: true, id };
  },

  // Add member to team
  addMember: async (teamId, studentId) => {
    const student = studentsData.find((s) => s.id === studentId);
    if (!student) throw new Error("Student not found");

    try {
      const response = await apiClient.post(`/teams/${teamId}/members`, {
        studentId,
      });
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback local update
    }

    teamsData = teamsData.map((t) => {
      if (t.id === teamId) {
        const alreadyMember = t.members.some((m) => m.id === studentId);
        const updatedMembers = alreadyMember
          ? t.members
          : [...t.members, student];
        return { ...t, members: updatedMembers };
      }
      return t;
    });

    return teamsData.find((t) => t.id === teamId);
  },

  // Remove member from team
  removeMember: async (teamId, studentId) => {
    try {
      const response = await apiClient.delete(
        `/teams/${teamId}/members/${studentId}`
      );
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback local update
    }

    teamsData = teamsData.map((t) => {
      if (t.id === teamId) {
        const updatedMembers = t.members.filter((m) => m.id !== studentId);
        // If removed member was leader, reassign leader if members remain
        let newLeaderId = t.leaderId;
        let newLeaderName = t.leaderName;

        if (t.leaderId === studentId) {
          if (updatedMembers.length > 0) {
            newLeaderId = updatedMembers[0].id;
            newLeaderName = updatedMembers[0].name;
          } else {
            newLeaderId = "";
            newLeaderName = "N/A";
          }
        }

        return {
          ...t,
          members: updatedMembers,
          leaderId: newLeaderId,
          leaderName: newLeaderName,
        };
      }
      return t;
    });

    return teamsData.find((t) => t.id === teamId);
  },

  // Change team leader
  changeLeader: async (teamId, leaderId) => {
    const student = studentsData.find((s) => s.id === leaderId);
    if (!student) throw new Error("Selected leader not found");

    try {
      const response = await apiClient.patch(`/teams/${teamId}/leader`, {
        leaderId,
      });
      if (response.data) {
        return response.data;
      }
    } catch {
      // Fallback local update
    }

    teamsData = teamsData.map((t) => {
      if (t.id === teamId) {
        return {
          ...t,
          leaderId: student.id,
          leaderName: student.name,
        };
      }
      return t;
    });

    return teamsData.find((t) => t.id === teamId);
  },
};

export default teamService;
