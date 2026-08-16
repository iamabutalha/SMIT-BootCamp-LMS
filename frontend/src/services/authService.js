import apiClient from "./apiClient";

const authService = {
  login: async (credentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    // Backend returns { success: true, data: { token, user } }
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data;
  },

  logout: async () => {
    try {
      const response = await apiClient.post("/auth/logout");
      return response.data;
    } catch {
      // Ignore network/server errors on logout to ensure client state still clears
      return { success: true };
    }
  },

  getCurrentUser: async () => {
    const response = await apiClient.get("/auth/me");
    // Backend returns { success: true, data: { id, name, email, role } }
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data;
  },
};

export default authService;