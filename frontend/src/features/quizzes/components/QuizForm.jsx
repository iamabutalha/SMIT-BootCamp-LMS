import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, CheckCircle2, FileCheck } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import QuestionBuilder from './QuestionBuilder';

const quizSchema = z.object({
  title: z.string().min(3, 'Quiz title must be at least 3 characters'),
  description: z.string().optional(),
  course: z.string().min(1, 'Course is required'),
  teacher: z.string().min(1, 'Teacher is required'),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  duration: z.coerce.number().min(1, 'Duration must be at least 1 minute'),
  passingScore: z.coerce.number().min(10, 'Passing score must be at least 10%').max(100, 'Max 100%'),
  instructions: z.string().optional(),
  status: z.enum(['Draft', 'Published', 'Archived']),
});

export function QuizForm({ initialValues, onSubmit, isSubmitting = false, isEdit = false }) {
  const [questions, setQuestions] = useState(initialValues?.questions || []);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: initialValues?.title || '',
      description: initialValues?.description || '',
      course: initialValues?.course || 'Web & Mobile Dev',
      teacher: initialValues?.teacher || 'Ali Khan',
      difficulty: initialValues?.difficulty || 'Medium',
      duration: initialValues?.duration || 30,
      passingScore: initialValues?.passingScore || 70,
      instructions: initialValues?.instructions || 'Answer all questions carefully before submitting.',
      status: initialValues?.status || 'Published',
    },
  });

  const handleFormSubmit = (data) => {
    onSubmit({
      ...data,
      questions,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8 text-left font-sans">
      {/* Quiz Basic Information Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">Quiz Overview & Settings</h3>
            <p className="text-xs text-slate-500">Configure quiz metadata, course assignment, and timing rules.</p>
          </div>
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={field.onChange}
                options={[
                  { label: 'Published', value: 'Published' },
                  { label: 'Draft', value: 'Draft' },
                  { label: 'Archived', value: 'Archived' },
                ]}
                className="w-32 text-xs h-9 font-bold"
              />
            )}
          />
        </div>

        <div className="space-y-4">
          {/* Title Input */}
          <Input
            label="QUIZ TITLE"
            placeholder="e.g. JavaScript Fundamentals & ES6+"
            error={errors.title?.message}
            disabled={isSubmitting}
            {...register('title')}
          />

          {/* Description */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Description
            </label>
            <Textarea
              placeholder="Brief summary of topics assessed in this quiz..."
              rows={3}
              disabled={isSubmitting}
              {...register('description')}
            />
          </div>

          {/* Course, Teacher, Difficulty */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Controller
              name="course"
              control={control}
              render={({ field }) => (
                <Select
                  label="COURSE"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: 'Web & Mobile Dev', value: 'Web & Mobile Dev' },
                    { label: 'Python Data Science', value: 'Python Data Science' },
                    { label: 'UI/UX Design', value: 'UI/UX Design' },
                    { label: 'Cloud Computing', value: 'Cloud Computing' },
                  ]}
                  error={errors.course?.message}
                />
              )}
            />

            <Controller
              name="teacher"
              control={control}
              render={({ field }) => (
                <Select
                  label="ASSIGNED TEACHER"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: 'Ali Khan', value: 'Ali Khan' },
                    { label: 'Sara Ahmed', value: 'Sara Ahmed' },
                    { label: 'Usman Ghani', value: 'Usman Ghani' },
                    { label: 'Fatima Noor', value: 'Fatima Noor' },
                  ]}
                  error={errors.teacher?.message}
                />
              )}
            />

            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <Select
                  label="DIFFICULTY LEVEL"
                  value={field.value}
                  onChange={field.onChange}
                  options={[
                    { label: 'Easy', value: 'Easy' },
                    { label: 'Medium', value: 'Medium' },
                    { label: 'Hard', value: 'Hard' },
                  ]}
                  error={errors.difficulty?.message}
                />
              )}
            />
          </div>

          {/* Duration & Passing Score */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="DURATION (MINUTES)"
              type="number"
              min="1"
              placeholder="30"
              error={errors.duration?.message}
              disabled={isSubmitting}
              {...register('duration')}
            />

            <Input
              label="PASSING SCORE (%)"
              type="number"
              min="10"
              max="100"
              placeholder="70"
              error={errors.passingScore?.message}
              disabled={isSubmitting}
              {...register('passingScore')}
            />
          </div>

          {/* Instructions */}
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Student Instructions
            </label>
            <Textarea
              placeholder="Guidelines shown to students before starting..."
              rows={2}
              disabled={isSubmitting}
              {...register('instructions')}
            />
          </div>
        </div>
      </div>

      {/* Dynamic Question Builder */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
        <QuestionBuilder questions={questions} onChange={setQuestions} />
      </div>

      {/* Form Action Buttons */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => window.history.back()}
          className="border-slate-200 text-slate-700 hover:bg-slate-50 py-2.5 px-5 text-xs font-semibold rounded-xl cursor-pointer"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          icon={isEdit ? <FileCheck className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          className="bg-[#006B3C] hover:bg-[#00522e] text-white py-2.5 px-6 text-xs font-bold rounded-xl shadow-xs cursor-pointer"
        >
          {isEdit ? 'Save Quiz Changes' : 'Create Quiz'}
        </Button>
      </div>
    </form>
  );
}

export default QuizForm;
