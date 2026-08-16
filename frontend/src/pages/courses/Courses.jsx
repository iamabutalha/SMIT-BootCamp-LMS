import { useEffect, useMemo, useState } from "react";
import { BookOpen, Edit2, Plus, Search, Trash2, Users, Layers } from "lucide-react";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";
import Modal from "../../components/ui/Modal";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";

import courseService from "../../services/courseService";

const initialFallbackCourses = [
  {
    id: 1,
    code: "WMA-101",
    title: "Web & Mobile App Development",
    instructor: "Saylani Faculty",
    batches: 3,
    students: 120,
    status: "Active",
  },
  {
    id: 2,
    code: "AI-201",
    title: "Artificial Intelligence & Data Science",
    instructor: "Saylani Faculty",
    batches: 2,
    students: 85,
    status: "Active",
  },
  {
    id: 3,
    code: "CC-301",
    title: "Cloud Native Computing",
    instructor: "Saylani Faculty",
    batches: 1,
    students: 45,
    status: "Upcoming",
  },
];

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    code: "",
    title: "",
    instructor: "Saylani Faculty",
    batches: 1,
    students: 0,
    status: "Active",
  });

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await courseService.getCourses();
      if (Array.isArray(data) && data.length > 0) {
        setCourses(data);
      } else {
        setCourses(initialFallbackCourses);
      }
    } catch (err) {
      console.warn("Could not fetch courses from backend, using default fallback data:", err);
      setCourses(initialFallbackCourses);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    const term = search.toLowerCase().trim();
    if (!term) return courses;
    return courses.filter(
      (course) =>
        course.title?.toLowerCase().includes(term) ||
        course.code?.toLowerCase().includes(term) ||
        course.instructor?.toLowerCase().includes(term)
    );
  }, [courses, search]);

  const handleOpenAddModal = () => {
    setEditingCourse(null);
    setFormData({
      code: `SMIT-${Math.floor(100 + Math.random() * 900)}`,
      title: "",
      instructor: "Saylani Faculty",
      batches: 1,
      students: 0,
      status: "Active",
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (course) => {
    setEditingCourse(course);
    setFormData({
      code: course.code,
      title: course.title,
      instructor: course.instructor,
      batches: course.batches,
      students: course.students,
      status: course.status,
    });
    setShowModal(true);
  };

  const handleDeleteCourse = async (courseId) => {
    try {
      if (typeof courseId === "string" && courseId.length === 24) {
        await courseService.deleteCourse(courseId);
      }
      setCourses((prev) => prev.filter((c) => (c._id || c.id) !== courseId));
    } catch (err) {
      console.error("Failed to delete course:", err);
      setCourses((prev) => prev.filter((c) => (c._id || c.id) !== courseId));
    }
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.code.trim()) return;

    try {
      if (editingCourse) {
        const id = editingCourse._id || editingCourse.id;
        let updated = formData;
        if (typeof id === "string" && id.length === 24) {
          updated = await courseService.updateCourse(id, formData);
        }
        setCourses((prev) =>
          prev.map((c) => ((c._id || c.id) === id ? { ...c, ...updated } : c))
        );
      } else {
        let created;
        try {
          created = await courseService.createCourse(formData);
        } catch {
          created = { id: Date.now(), ...formData };
        }
        setCourses((prev) => [created, ...prev]);
      }
    } catch (err) {
      console.error("Save course error:", err);
    } finally {
      setShowModal(false);
    }
  };

  const totalStudentsEnrolled = useMemo(() => {
    return courses.reduce((acc, c) => acc + (Number(c.students) || 0), 0);
  }, [courses]);

  const activeBatches = useMemo(() => {
    return courses.reduce((acc, c) => acc + (Number(c.batches) || 0), 0);
  }, [courses]);

  const columns = [
    {
      key: "code",
      label: "Course Code",
      render: (row) => (
        <span className="font-mono text-xs font-bold text-primary">
          {row.code}
        </span>
      ),
    },
    {
      key: "title",
      label: "Course Title",
      render: (row) => (
        <span className="font-semibold text-text">{row.title}</span>
      ),
    },
    {
      key: "instructor",
      label: "Instructor",
      render: (row) => (
        <span className="text-xs text-text-muted">{row.instructor}</span>
      ),
    },
    {
      key: "batches",
      label: "Batches",
      render: (row) => (
        <span className="text-xs font-semibold text-text">{row.batches}</span>
      ),
    },
    {
      key: "students",
      label: "Enrolled Students",
      render: (row) => (
        <span className="text-xs font-medium text-text">{row.students}</span>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge variant={row.status === "Active" ? "success" : "info"}>
          {row.status}
        </Badge>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={() => handleOpenEditModal(row)}
            className="rounded p-1.5 text-text-muted hover:bg-background hover:text-primary"
            title="Edit Course"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => handleDeleteCourse(row._id || row.id)}
            className="rounded p-1.5 text-text-muted hover:bg-danger/10 hover:text-danger"
            title="Delete Course"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <MainLayout
      title="Courses"
      subtitle="View and manage bootcamp curriculum and courses."
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <PageHeader
            title="Bootcamp Courses"
            subtitle="Explore all offered courses, batches, and enrollment numbers."
          />

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add Course
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Courses"
            value={String(courses.length)}
            description="Active bootcamp programs"
            descriptionClassName="text-indigo-500"
          />

          <StatCard
            title="Active Batches"
            value={String(activeBatches)}
            description="Ongoing cohort batches"
            descriptionClassName="text-success"
          />

          <StatCard
            title="Total Enrolled"
            value={`${totalStudentsEnrolled}+`}
            description="Bootcamp students"
            descriptionClassName="text-primary"
          />
        </div>

        {/* Search */}
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-lg border border-border bg-surface py-2.5 pl-10 pr-3 text-sm text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>

        {/* Dynamic States */}
        {loading ? (
          <LoadingState message="Loading courses from backend API..." />
        ) : error ? (
          <ErrorState message={error} onRetry={loadCourses} />
        ) : filteredCourses.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface">
            <EmptyState
              icon={BookOpen}
              title="No courses match your search"
              description="Try adjusting your filter criteria or add a new course."
              iconColor="text-indigo-500"
            />
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <Table
                columns={columns}
                data={filteredCourses}
                emptyMessage="No courses available."
                rowKey={(r) => r._id || r.id}
              />
            </div>

            {/* Mobile Cards View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {filteredCourses.map((course) => (
                <div
                  key={course._id || course.id}
                  className="rounded-xl border border-border bg-surface p-4 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary">
                      {course.code}
                    </span>
                    <Badge variant={course.status === "Active" ? "success" : "info"}>
                      {course.status}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="font-semibold text-text text-base">
                      {course.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-0.5">
                      Instructor: {course.instructor}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                    <div className="flex items-center gap-1.5 text-text">
                      <Layers className="h-3.5 w-3.5 text-indigo-500" />
                      <span>{course.batches} Batches</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-text">
                      <Users className="h-3.5 w-3.5 text-emerald-500" />
                      <span>{course.students} Students</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(course)}
                        className="rounded p-1 text-text-muted hover:text-primary"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCourse(course._id || course.id)}
                        className="rounded p-1 text-text-muted hover:text-danger"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Add/Edit Modal */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={editingCourse ? "Edit Course" : "Add New Course"}
          size="md"
        >
          <form onSubmit={handleSaveCourse} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-semibold text-text">
                Course Code
              </label>
              <Input
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value })
                }
                placeholder="e.g. WMA-101"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-semibold text-text">
                Course Title
              </label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="e.g. Web & Mobile App Development"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text">
                  Instructor
                </label>
                <Input
                  value={formData.instructor}
                  onChange={(e) =>
                    setFormData({ ...formData, instructor: e.target.value })
                  }
                  placeholder="Saylani Faculty"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text">
                  Status
                </label>
                <Select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Completed">Completed</option>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text">
                  Batches
                </label>
                <Input
                  type="number"
                  value={formData.batches}
                  onChange={(e) =>
                    setFormData({ ...formData, batches: Number(e.target.value) })
                  }
                  min="1"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-text">
                  Enrolled Students
                </label>
                <Input
                  type="number"
                  value={formData.students}
                  onChange={(e) =>
                    setFormData({ ...formData, students: Number(e.target.value) })
                  }
                  min="0"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm">
                {editingCourse ? "Update Course" : "Create Course"}
              </Button>
            </div>
          </form>
        </Modal>
      </div>
    </MainLayout>
  );
}

export default Courses;
