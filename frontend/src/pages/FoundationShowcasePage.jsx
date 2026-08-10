import { useState } from 'react';
import {
  Users,
  CheckCircle2,
  Clock,
  Award,
  Plus,
  Trash2,
  Sparkles,
} from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { SectionCard } from '../components/common/SectionCard';
import { StatusBadge } from '../components/common/StatusBadge';
import { ErrorState } from '../components/common/ErrorState';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingState } from '../components/common/LoadingState';
import { ConfirmDialog } from '../components/common/ConfirmDialog';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Textarea } from '../components/ui/Textarea';
import { Checkbox } from '../components/ui/Checkbox';
import { Modal } from '../components/ui/Modal';
import { Tabs } from '../components/ui/Tabs';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../components/ui/Table';
import DashboardLayout from '../layouts/DashboardLayout';

export function FoundationShowcasePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('STUDENT');

  const demoUsers = [
    { id: '1', name: 'Ali Jan', email: 'ali@example.com', role: 'STUDENT', status: 'PRESENT' },
    { id: '2', name: 'Shah Faisal', email: 'shah@example.com', role: 'MENTOR', status: 'REVIEWED' },
    { id: '3', name: 'Abu Talha', email: 'talha@example.com', role: 'ADMIN', status: 'ACTIVE' },
    { id: '4', name: 'Sara Khan', email: 'sara@example.com', role: 'STUDENT', status: 'ABSENT' },
  ];

  const tabItems = [
    {
      id: 'components',
      label: 'UI Components',
      badge: 'Active',
      content: (
        <div className="space-y-6">
          {/* Buttons Showcase */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-800">Button Variants</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
                Primary (Brand Dark Green)
              </Button>
              <Button variant="secondary">Secondary (Mint Accent)</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger" icon={<Trash2 className="w-4 h-4" />}>
                Destructive
              </Button>
              <Button variant="primary" isLoading>
                Loading
              </Button>
            </div>
          </div>

          {/* Form Controls Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Student Name"
              placeholder="e.g. Ali Jan"
              helperText="Enter full student legal name"
            />
            <Select
              label="Assign Role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              options={[
                { value: 'STUDENT', label: 'Student' },
                { value: 'MENTOR', label: 'Mentor' },
                { value: 'ADMIN', label: 'Administrator' },
              ]}
            />
            <div className="md:col-span-2">
              <Textarea
                label="Task Feedback Note"
                placeholder="Write structured feedback..."
              />
            </div>
            <div className="md:col-span-2">
              <Checkbox label="Send email notification automatically" defaultChecked />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'table',
      label: 'Data Table & Badges',
      badge: '4 Records',
      content: (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-semibold text-slate-900">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <StatusBadge status={user.role} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={user.status} />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ),
    },
    {
      id: 'states',
      label: 'Global Application States',
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <LoadingState message="Fetching cohort attendance..." />
          <EmptyState
            title="No Submissions Yet"
            description="Students have not submitted work for this task."
          />
          <ErrorState
            title="API Endpoint Failed"
            message="Unable to communicate with server."
            onRetry={() => {}}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Frontend Foundation Showcase"
        subtitle="Visual verification suite for the SMIT Bootcamp LMS design system (Brand Green #006B3C, Lime #4DBD18)"
        action={
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => setIsConfirmOpen(true)}
              icon={<Trash2 className="w-4 h-4" />}
            >
              Test Confirm Dialog
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(true)}
              icon={<Sparkles className="w-4 h-4" />}
            >
              Test Modal Dialog
            </Button>
          </div>
        }
      />

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Students"
          value="1,248"
          icon={Users}
          trend="+12%"
          trendLabel="this month"
          hint="Enrolled across 14 active cohorts"
          variant="accent"
        />
        <StatCard
          title="Attendance Rate"
          value="94.2%"
          icon={CheckCircle2}
          trend="+2.1%"
          hint="Cohort average for current week"
        />
        <StatCard
          title="Pending Submissions"
          value="48"
          icon={Clock}
          trend="-5"
          trendLabel="vs last week"
          hint="Requires mentor review"
        />
        <StatCard
          title="Reviewed Tasks"
          value="312"
          icon={Award}
          trend="+18%"
          hint="Graded by assigned mentors"
        />
      </div>

      {/* Main Showcase Section */}
      <SectionCard
        title="Interactive Component Library"
        subtitle="Reusable foundation components for Faizan and Muzamil"
      >
        <Tabs tabs={tabItems} defaultTab="components" />
      </SectionCard>

      {/* Modals & Dialogs */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Foundation Modal Primitive"
        subtitle="Reusable backdrop dialog container"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            This modal primitive supports custom headers, footers, backdrop click-outside closing, and ESC key navigation.
          </p>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={() => setIsModalOpen(false)}>
              Understood
            </Button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => setIsConfirmOpen(false)}
        title="Delete Cohort Confirmation"
        description="Are you sure you want to delete this cohort record? This action cannot be undone."
        confirmText="Delete Cohort"
        isDanger
      />
    </div>
  );
}

export function FoundationShowcasePageWrapper() {
  return (
    <DashboardLayout />
  );
}

export default FoundationShowcasePage;
