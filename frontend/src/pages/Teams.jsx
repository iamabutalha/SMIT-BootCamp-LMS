import MainLayout from "../components/layout/MainLayout";

function Teams() {
  return (
    <MainLayout
      title="Teams"
      subtitle="Manage bootcamp teams"
    >
      <div>
        <h2 className="text-xl font-semibold text-text">
          Teams
        </h2>

        <p className="mt-1 text-sm text-text-muted">
          Team management will be implemented here.
        </p>
      </div>
    </MainLayout>
  );
}

export default Teams;