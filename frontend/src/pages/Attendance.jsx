import MainLayout from "../components/layout/MainLayout";

function Attendance() {
  return (
    <MainLayout
      title="Attendance"
      subtitle="Track student attendance"
    >
      <div>
        <h2 className="text-xl font-semibold text-text">
          Attendance
        </h2>

        <p className="mt-1 text-sm text-text-muted">
          Attendance management will be implemented here.
        </p>
      </div>
    </MainLayout>
  );
}

export default Attendance;