import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Pencil, CheckCircle2, Clock, Users, Award, Percent, HelpCircle, FileText, CheckCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import PageLoader from '@/components/common/PageLoader';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import QuizAttemptTable from '../components/QuizAttemptTable';
import { useGetQuizByIdQuery } from '../api/quizzesApi';
import { ROUTES } from '@/constants/routes';

export function QuizDetailsContent() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { data: quiz, isLoading } = useGetQuizByIdQuery(quizId);

  if (isLoading) {
    return <PageLoader message="Loading quiz details & performance analytics..." />;
  }

  if (!quiz) {
    return (
      <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs font-sans max-w-lg mx-auto my-8">
        <h3 className="text-lg font-bold text-slate-800">Quiz Not Found</h3>
        <p className="text-xs text-slate-500 mt-1">No quiz found matching ID &quot;{quizId}&quot;.</p>
        <button
          type="button"
          onClick={() => navigate(ROUTES.ADMIN.QUIZZES)}
          className="mt-4 px-4 py-2 bg-[#006B3C] text-white font-bold text-xs rounded-xl cursor-pointer"
        >
          Back to Quizzes
        </button>
      </div>
    );
  }

  const metrics = quiz.metrics || {
    totalAttempts: 0,
    avgScore: 0,
    highestScore: 0,
    lowestScore: 0,
    passCount: 0,
    failCount: 0,
    passRate: 0,
  };

  // Recharts score distribution dataset
  const distributionData = [
    { range: '0-40%', count: quiz.attempts?.filter((a) => a.percentage <= 40).length || 0 },
    { range: '41-60%', count: quiz.attempts?.filter((a) => a.percentage > 40 && a.percentage <= 60).length || 0 },
    { range: '61-75%', count: quiz.attempts?.filter((a) => a.percentage > 60 && a.percentage <= 75).length || 0 },
    { range: '76-90%', count: quiz.attempts?.filter((a) => a.percentage > 75 && a.percentage <= 90).length || 0 },
    { range: '91-100%', count: quiz.attempts?.filter((a) => a.percentage > 90).length || 0 },
  ];

  const passFailData = [
    { name: 'Passed', value: metrics.passCount, color: '#21C75D' },
    { name: 'Failed', value: metrics.failCount, color: '#CF3E44' },
  ];

  const questions = quiz.questions || [];

  return (
    <div className="space-y-6 font-sans text-left">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(ROUTES.ADMIN.QUIZZES)}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            title="Back to Quizzes"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">{quiz.title}</h1>
              {quiz.status === 'Published' ? (
                <Badge className="bg-[#E8F7DF] text-[#21C75D] font-bold">Published</Badge>
              ) : (
                <Badge className="bg-amber-50 text-amber-600 font-bold border border-amber-200">Draft</Badge>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Course: <span className="font-semibold text-slate-700">{quiz.course}</span> • Teacher: <span className="font-semibold text-slate-700">{quiz.teacher}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link to={ROUTES.ADMIN.QUIZZES_EDIT(quiz.id)}>
            <Button
              type="button"
              variant="outline"
              icon={<Pencil className="w-4 h-4" />}
              className="border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold rounded-xl cursor-pointer"
            >
              Edit Quiz
            </Button>
          </Link>
        </div>
      </div>

      {/* Quiz Overview Details Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
        <h3 className="text-base font-bold text-slate-900">Quiz Description & Instructions</h3>
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          {quiz.description || 'No detailed description provided.'}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-slate-400" />
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Duration</div>
              <div className="text-xs font-extrabold text-slate-800">{quiz.duration} Mins</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-slate-400" />
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Questions</div>
              <div className="text-xs font-extrabold text-slate-800">{questions.length} Questions</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Award className="w-4 h-4 text-slate-400" />
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Passing Score</div>
              <div className="text-xs font-extrabold text-[#006B3C]">{quiz.passingScore}%</div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Created Date</div>
              <div className="text-xs font-bold text-slate-800">{quiz.createdDate}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Summary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0072BC] flex items-center justify-center shrink-0">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-slate-900">{metrics.totalAttempts}</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Attempts</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E8F7DF] text-[#21C75D] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-slate-900">{metrics.avgScore}%</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Avg Score</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-slate-900">{metrics.highestScore}%</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Highest Score</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Percent className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-slate-900">{metrics.lowestScore}%</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Lowest Score</div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-slate-200/80 shadow-2xs col-span-2 sm:col-span-1">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#006B3C]/10 text-[#006B3C] flex items-center justify-center shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-lg font-extrabold text-slate-900">{metrics.passRate}%</div>
              <div className="text-[10px] font-semibold text-slate-500 uppercase">Pass Rate</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts Row */}
      <ErrorBoundary title="Analytics Charts Error">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Score Distribution Bar Chart */}
          <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Score Distribution Histogram</h3>
              <p className="text-xs text-slate-500">Student performance distribution across percentage ranges.</p>
            </div>

            <div className="h-64 w-full pt-2 min-h-[240px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={200}>
                <BarChart data={distributionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '12px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index >= 3 ? '#21C75D' : index === 2 ? '#0284C7' : '#E11D48'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pass vs Fail Donut Visualization */}
          <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Pass / Fail Ratio</h3>
              <p className="text-xs text-slate-500">Proportion of passing student attempts.</p>
            </div>

            <div className="h-48 w-full relative flex items-center justify-center min-h-[180px]">
              <ResponsiveContainer width="100%" height="100%" minWidth={100} minHeight={150}>
                <PieChart>
                  <Pie
                    data={passFailData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {passFailData.map((entry, index) => (
                      <Cell key={`pie-cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-xl font-extrabold text-slate-900">{metrics.passRate}%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Passed</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 pt-2 border-t border-slate-100 text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#21C75D]" />
                <span>Passed ({metrics.passCount})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#CF3E44]" />
                <span>Failed ({metrics.failCount})</span>
              </div>
            </div>
          </div>
        </div>
      </ErrorBoundary>

      {/* Question Items Review Section */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900">Question Items ({questions.length})</h3>

        {questions.length === 0 ? (
          <div className="p-6 bg-white rounded-2xl border border-slate-200 text-xs text-slate-500 text-center">
            No questions defined for this quiz yet.
          </div>
        ) : (
          <div className="space-y-4">
            {questions.map((qn, idx) => (
              <div key={qn.id || idx} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
                <div className="flex items-start justify-between gap-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-sky-50 text-[#0072BC] text-xs font-extrabold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900">{qn.question}</h4>
                  </div>
                  <Badge variant="outline" className="text-xs font-semibold text-slate-600 shrink-0">
                    {qn.points || 20} Points
                  </Badge>
                </div>

                {/* Options if Multiple Choice / True False */}
                {qn.options && qn.options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                    {qn.options.map((opt) => {
                      const isCorrect = String(opt).trim().toLowerCase() === String(qn.correctAnswer).trim().toLowerCase();
                      return (
                        <div
                          key={opt}
                          className={`p-2.5 rounded-xl border flex items-center justify-between font-medium ${
                            isCorrect ? 'bg-[#E8F7DF] border-[#21C75D] text-slate-900 font-bold' : 'bg-slate-50 border-slate-100 text-slate-600'
                          }`}
                        >
                          <span>{opt}</span>
                          {isCorrect && <CheckCircle className="w-4 h-4 text-[#21C75D]" />}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Correct Answer for Short Answer */}
                {qn.type === 'short_answer' && (
                  <div className="text-xs text-slate-700 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100 font-semibold">
                    Correct Answer: <span className="text-[#006B3C] font-extrabold">{qn.correctAnswer}</span>
                  </div>
                )}

                {/* Explanation */}
                {qn.explanation && (
                  <p className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100 leading-relaxed">
                    <strong className="text-slate-700">Explanation: </strong> {qn.explanation}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Student Attempts Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Student Attempts ({metrics.totalAttempts})</h3>
        </div>
        <QuizAttemptTable attempts={quiz.attempts || []} />
      </div>
    </div>
  );
}

export function QuizDetailsPage() {
  return (
    <ErrorBoundary title="Quiz Details Page Error">
      <QuizDetailsContent />
    </ErrorBoundary>
  );
}

export default QuizDetailsPage;
