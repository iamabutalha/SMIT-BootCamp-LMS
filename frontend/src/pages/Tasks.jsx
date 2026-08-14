import MainLayout from "../components/layout/MainLayout";

function Tasks() {
  return (
    <MainLayout
      title="Tasks"
      subtitle="Manage bootcamp tasks"
    >
      <div>
        <h2 className="text-xl font-semibold text-text">
          Tasks
        </h2>

        <p className="mt-1 text-sm text-text-muted">
          Task management will be implemented here.
        </p>
      </div>
    </MainLayout>
  );
}

export default Tasks;