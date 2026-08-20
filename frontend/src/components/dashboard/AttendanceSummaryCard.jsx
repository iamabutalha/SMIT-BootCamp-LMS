import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Search, UserCheck } from "lucide-react";

function AttendanceSummaryCard({ attendanceRecords = [] }) {
  const [search, setSearch] = useState("");

  // Default sample rows matching user screenshot if no records passed from API
  const defaultAttendance = [
    {
      id: "att-1",
      rollNo: "100001",
      studentName: "Ali Khan",
      course: "Web Development",
      checkIn: "07:32 AM",
      checkOut: "09:36 AM",
      status: "Present",
      action: "Done",
    },
  ];

  const displayList =
    attendanceRecords.length > 0
      ? attendanceRecords.map((rec, idx) => ({
          id: rec._id || rec.id || idx,
          rollNo: rec.student?.rollNumber || rec.rollNumber || `10000${idx + 1}`,
          studentName: rec.student?.name || rec.studentName || "Student Name",
          course: rec.student?.course || rec.course || "Web Development",
          checkIn: rec.checkIn || "07:32 AM",
          checkOut: rec.checkOut || "09:36 AM",
          status: rec.status || "Present",
          action: "Done",
        }))
      : defaultAttendance;

  const filteredList = displayList.filter(
    (item) =>
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl border border-border bg-surface shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-5">
        <div className="flex items-center gap-2.5">
          <Calendar className="h-5 w-5 text-primary shrink-0" />
          <h2 className="font-bold text-text text-base">Today's Attendance Summary</h2>
        </div>
        <Link
          to="/attendance"
          className="text-sm font-semibold text-primary hover:underline"
        >
          Manage
        </Link>
      </div>

      <div className="p-5 space-y-4">
        {/* Search Bar & Mark Present Button */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or roll number..."
              className="w-full rounded-full border border-border bg-background py-2 pl-10 pr-4 text-xs text-text outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
            />
          </div>

          <Link
            to="/attendance"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-primary/90 transition shrink-0"
          >
            <UserCheck className="h-4 w-4" />
            <span>Mark Present</span>
          </Link>
        </div>

        {/* Attendance Table with Scrollbar */}
        <div className="max-h-[460px] overflow-y-auto overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 z-10 bg-gray-100/95 backdrop-blur-sm text-[11px] font-bold text-text-muted uppercase tracking-wider border-b border-border shadow-xs">
              <tr>
                <th className="px-4 py-3">ROLL NO</th>
                <th className="px-4 py-3">STUDENT NAME</th>
                <th className="px-4 py-3">COURSE</th>
                <th className="px-4 py-3">CHECK-IN</th>
                <th className="px-4 py-3">CHECK-OUT</th>
                <th className="px-4 py-3">STATUS</th>
                <th className="px-4 py-3">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-surface font-medium">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-6 text-center text-text-muted">
                    No matching attendance records found.
                  </td>
                </tr>
              ) : (
                filteredList.map((row) => (
                  <tr key={row.id} className="hover:bg-background/50 transition">
                    <td className="px-4 py-3.5 font-bold text-text">{row.rollNo}</td>
                    <td className="px-4 py-3.5 font-semibold text-primary">{row.studentName}</td>
                    <td className="px-4 py-3.5 text-text-muted">{row.course}</td>
                    <td className="px-4 py-3.5 text-text-muted">{row.checkIn}</td>
                    <td className="px-4 py-3.5 text-text-muted">{row.checkOut}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          row.status === "Present"
                            ? "bg-emerald-100 text-emerald-700"
                            : row.status === "Absent"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-text-muted">{row.action}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AttendanceSummaryCard;
