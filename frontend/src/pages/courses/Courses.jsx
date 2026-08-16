import { useState } from "react";
import { BookOpen, Search } from "lucide-react";

import MainLayout from "../../components/layout/MainLayout";
import PageHeader from "../../components/common/PageHeader";
import StatCard from "../../components/common/StatCard";
import EmptyState from "../../components/common/EmptyState";
import Badge from "../../components/ui/Badge";
import Table from "../../components/ui/Table";

const initialCourses = [
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
  const [courses] = useState(initialCourses);
  const [search, setSearch] = useState("");

  const filteredCourses = courses.filter((course) => {
    const term = search.toLowerCase().trim();
    if (!term) return true;
    return (
      course.title.toLowerCase().includes(term) ||
      course.code.toLowerCase().includes(term) ||
      course.instructor.toLowerCase().includes(term)
    );
  });

  const columns = [
    {
      key: "code",
      label: "Course Code",
      render: (row) => (
        <span className="font-mono text-xs font-semibold text-primary">
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
  ];

  return (
    <MainLayout
      title="Courses"
      subtitle="View and manage bootcamp curriculum and courses."
    >
      <div className="space-y-6">
        <PageHeader
          title="Bootcamp Courses"
          subtitle="Explore all offered courses, batches, and enrollment numbers."
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            title="Total Courses"
            value={String(courses.length)}
            description="Active bootcamp programs"
            descriptionClassName="text-indigo-500"
          />

          <StatCard
            title="Active Batches"
            value="6"
            description="Ongoing cohort batches"
            descriptionClassName="text-success"
          />

          <StatCard
            title="Total Enrolled"
            value="250+"
            description="Bootcamp students"
            descriptionClassName="text-primary"
          />
        </div>

        {/* Search */}
        <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
          <div className="relative max-w-md">
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

        {filteredCourses.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface">
            <EmptyState
              icon={BookOpen}
              title="No courses match your search"
              description="Try adjusting your filter criteria."
              iconColor="text-indigo-500"
            />
          </div>
        ) : (
          <Table
            columns={columns}
            data={filteredCourses}
            emptyMessage="No courses available."
            rowKey="id"
          />
        )}
      </div>
    </MainLayout>
  );
}

export default Courses;
