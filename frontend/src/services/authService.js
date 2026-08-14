import apiClient from "./apiClient";

const authService = {
  login: async (credentials) => {
    const response = await apiClient.post(
      "/auth/login",
      credentials
    );

    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post(
      "/auth/logout"
    );

    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get(
      "/auth/me"
    );

    return response.data;
  },
};

export default authService;