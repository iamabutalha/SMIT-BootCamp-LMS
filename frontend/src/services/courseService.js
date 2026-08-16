import apiClient from "./apiClient";

const courseService = {
  getCourses: async () => {
    const response = await apiClient.get("/courses");
    return response.data?.data || response.data;
  },

  createCourse: async (courseData) => {
    const response = await apiClient.post("/courses", courseData);
    return response.data?.data || response.data;
  },

  updateCourse: async (id, courseData) => {
    const response = await apiClient.put(`/courses/${id}`, courseData);
    return response.data?.data || response.data;
  },

  deleteCourse: async (id) => {
    const response = await apiClient.delete(`/courses/${id}`);
    return response.data;
  },
};

export default courseService;
