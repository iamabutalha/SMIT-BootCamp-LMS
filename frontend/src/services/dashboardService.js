import apiClient from "./apiClient";

const dashboardService = {
  getDashboardData: async () => {
    const response = await apiClient.get("/dashboard");
    if (response.data && response.data.data) {
      return response.data.data;
    }
    return response.data;
  },
};

export default dashboardService;
