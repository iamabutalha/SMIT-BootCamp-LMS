import { Plus, Trash2, Copy, ArrowUp, ArrowDown, HelpCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';

export function QuestionBuilder({ questions = [], onChange }) {
  const handleAddQuestion = () => {
    const newQuestion = {
      id: `qn-${Date.now()}`,
      type: 'multiple_choice',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      explanation: '',
      points: 20,
    };
    onChange([...questions, newQuestion]);
  };

  const handleUpdateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleUpdateOption = (qIndex, optIndex, value) => {
    const updated = [...questions];
    const opts = [...(updated[qIndex].options || ['', '', '', ''])];
    opts[optIndex] = value;
    updated[qIndex] = { ...updated[qIndex], options: opts };
    onChange(updated);
  };

  const handleDeleteQuestion = (index) => {
    const updated = questions.filter((_, i) => i !== index);
    onChange(updated);
  };

  const handleDuplicateQuestion = (index) => {
    const q = questions[index];
    const duplicate = {
      ...q,
      id: `qn-${Date.now()}`,
      question: `${q.question} (Copy)`,
    };
    const updated = [...questions];
    updated.splice(index + 1, 0, duplicate);
    onChange(updated);
  };

  const handleMoveQuestion = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === questions.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const updated = [...questions];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    onChange(updated);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Quiz Questions ({questions.length})</h3>
          <p className="text-xs text-slate-500">Add, configure, and reorder questions for this quiz.</p>
        </div>
        <Button
          type="button"
          onClick={handleAddQuestion}
          icon={<Plus className="w-4 h-4" />}
          className="bg-[#006B3C] hover:bg-[#00522e] text-white py-2 px-3.5 text-xs font-bold rounded-xl cursor-pointer"
        >
          Add Question
        </Button>
      </div>

      {questions.length === 0 ? (
        <div className="p-8 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 space-y-3">
          <HelpCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">No questions added yet</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Click the button above to start creating multiple choice, true/false, or short answer questions.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddQuestion}
            icon={<Plus className="w-4 h-4" />}
            className="border-slate-300 text-slate-700 hover:bg-white text-xs font-semibold rounded-xl cursor-pointer"
          >
            Add First Question
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, index) => (
            <div
              key={q.id || index}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4 relative group"
            >
              {/* Question Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#006B3C]/10 text-[#006B3C] text-xs font-extrabold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-800">Question {index + 1}</span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Type Selector */}
                  <Select
                    value={q.type}
                    onChange={(e) => handleUpdateQuestion(index, 'type', e.target.value)}
                    options={[
                      { label: 'Multiple Choice', value: 'multiple_choice' },
                      { label: 'True / False', value: 'true_false' },
                      { label: 'Short Answer', value: 'short_answer' },
                    ]}
                    className="w-36 text-xs h-8 py-0"
                  />

                  {/* Points Input */}
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] text-slate-400 font-semibold uppercase">Pts:</span>
                    <input
                      type="number"
                      min="1"
                      value={q.points || 20}
                      onChange={(e) => handleUpdateQuestion(index, 'points', Number(e.target.value))}
                      className="w-14 h-8 px-2 rounded-lg border border-slate-200 text-xs font-bold text-center focus:outline-none focus:border-[#006B3C]"
                    />
                  </div>

                  {/* Reorder & Action Buttons */}
                  <div className="flex items-center gap-1 pl-2 border-l border-slate-200">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => handleMoveQuestion(index, 'up')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === questions.length - 1}
                      onClick={() => handleMoveQuestion(index, 'down')}
                      className="p-1.5 text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDuplicateQuestion(index)}
                      className="p-1.5 text-slate-400 hover:text-sky-600 cursor-pointer"
                      title="Duplicate Question"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(index)}
                      className="p-1.5 text-slate-400 hover:text-red-600 cursor-pointer"
                      title="Delete Question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Question Input Text */}
              <Textarea
                placeholder="Enter your question statement here..."
                rows={2}
                value={q.question}
                onChange={(e) => handleUpdateQuestion(index, 'question', e.target.value)}
                className="text-xs"
              />

              {/* Question Type Options */}
              {q.type === 'multiple_choice' && (
                <div className="space-y-3 pt-1">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Multiple Choice Options (Select Correct Answer)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['A', 'B', 'C', 'D'].map((letter, optIdx) => {
                      const optVal = (q.options || [])[optIdx] || '';
                      const isCorrect = q.correctAnswer === optVal && optVal !== '';

                      return (
                        <div
                          key={letter}
                          className={`flex items-center gap-2 p-2 rounded-xl border transition-colors ${
                            isCorrect ? 'bg-emerald-50/70 border-emerald-300' : 'bg-slate-50 border-slate-200/80'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() => handleUpdateQuestion(index, 'correctAnswer', optVal)}
                            className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 cursor-pointer transition-colors ${
                              isCorrect ? 'bg-[#21C75D] text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                            }`}
                            title="Mark as correct answer"
                          >
                            {letter}
                          </button>
                          <Input
                            placeholder={`Option ${letter}`}
                            value={optVal}
                            onChange={(e) => handleUpdateOption(index, optIdx, e.target.value)}
                            className="text-xs h-9 border-none bg-transparent shadow-none focus:ring-0"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {q.type === 'true_false' && (
                <div className="space-y-2 pt-1">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Correct Answer
                  </label>
                  <div className="flex items-center gap-4">
                    {['True', 'False'].map((tfVal) => (
                      <label
                        key={tfVal}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold cursor-pointer transition-colors ${
                          q.correctAnswer === tfVal
                            ? 'bg-[#E8F7DF] border-[#21C75D] text-[#006B3C]'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`tf-${index}`}
                          checked={q.correctAnswer === tfVal}
                          onChange={() => handleUpdateQuestion(index, 'correctAnswer', tfVal)}
                          className="accent-[#006B3C]"
                        />
                        <span>{tfVal}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {q.type === 'short_answer' && (
                <div className="space-y-2 pt-1">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Model Answer / Required Keywords
                  </label>
                  <Input
                    placeholder="Enter correct keyword or model answer (e.g. const)"
                    value={q.correctAnswer}
                    onChange={(e) => handleUpdateQuestion(index, 'correctAnswer', e.target.value)}
                    className="text-xs"
                  />
                </div>
              )}

              {/* Explanation Field */}
              <div className="pt-2">
                <Textarea
                  placeholder="Explanation / Answer rationale (shown to students after grading)..."
                  rows={2}
                  value={q.explanation || ''}
                  onChange={(e) => handleUpdateQuestion(index, 'explanation', e.target.value)}
                  className="text-xs bg-slate-50/50"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionBuilder;
