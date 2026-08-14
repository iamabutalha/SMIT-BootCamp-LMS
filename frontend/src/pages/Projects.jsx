import MainLayout from "../components/layout/MainLayout";

function Projects() {
  return (
    <MainLayout
      title="Projects"
      subtitle="Track bootcamp projects"
    >
      <div>
        <h2 className="text-xl font-semibold text-text">
          Projects
        </h2>

        <p className="mt-1 text-sm text-text-muted">
          Project management will be implemented here.
        </p>
      </div>
    </MainLayout>
  );
}

export default Projects;