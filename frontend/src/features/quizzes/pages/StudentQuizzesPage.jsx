import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import StudentQuizCard from '../components/StudentQuizCard';
import EmptyState from '@/components/common/EmptyState';
import { quizService } from '../services/quizService';
import { useAuth } from '@/hooks/useAuth';

export function StudentQuizzesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('Available');

  const studentId = user?._id || user?.id || '1';
  const quizzes = quizService.getStudentQuizzes(studentId, activeTab);

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">My Quizzes</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Test your knowledge, review completed assessments, and track your passing scores.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
          {['Available', 'Completed', 'Upcoming'].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-white text-slate-900 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Quiz Cards Grid */}
      {quizzes.length === 0 ? (
        <EmptyState
          icon={HelpCircle}
          title={`No ${activeTab.toLowerCase()} quizzes`}
          description={
            activeTab === 'Available'
              ? 'You have completed all available quizzes for your course!'
              : activeTab === 'Completed'
              ? 'You have not completed any quizzes yet.'
              : 'No upcoming scheduled quizzes at this time.'
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {quizzes.map((quiz) => (
            <StudentQuizCard key={quiz.id} quiz={quiz} tab={activeTab} />
          ))}
        </div>
      )}
    </div>
  );
}

export default StudentQuizzesPage;
