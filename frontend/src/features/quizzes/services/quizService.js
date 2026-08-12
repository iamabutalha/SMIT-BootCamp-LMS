/**
 * Quiz Data Service Layer
 * Manages quiz definitions, question banks, student attempts, and analytics calculation.
 * Structured for smooth transition to backend REST APIs.
 */

export const INITIAL_QUIZZES = [
  {
    id: 'q-1',
    title: 'JavaScript Fundamentals & ES6+',
    description: 'Comprehensive evaluation of JS data structures, closures, promises, async/await, and modern ES6+ syntax.',
    course: 'Web & Mobile Dev',
    teacher: 'Ali Khan',
    teacherId: 't-1',
    difficulty: 'Medium',
    duration: 30, // mins
    passingScore: 70, // percentage
    instructions: 'Complete all 5 questions within 30 minutes. You need at least 70% to pass this assessment.',
    status: 'Published',
    createdDate: '2026-07-15',
    questions: [
      {
        id: 'qn-1',
        type: 'multiple_choice',
        question: 'Which of the following array methods creates a new array populated with the results of calling a provided function on every element?',
        options: ['forEach()', 'map()', 'filter()', 'reduce()'],
        correctAnswer: 'map()',
        explanation: 'map() transforms each element of an array and returns a new array of the same length without mutating the original array.',
        points: 20,
      },
      {
        id: 'qn-2',
        type: 'multiple_choice',
        question: 'What will be the output of `console.log(typeof NaN)` in JavaScript?',
        options: ['number', 'NaN', 'undefined', 'object'],
        correctAnswer: 'number',
        explanation: 'In JavaScript, `NaN` (Not-a-Number) is technically classified as a primitive numeric value type.',
        points: 20,
      },
      {
        id: 'qn-3',
        type: 'true_false',
        question: 'JavaScript is a single-threaded language with a non-blocking asynchronous event loop.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'JS executes code on a single thread using an event loop to delegate asynchronous I/O tasks.',
        points: 20,
      },
      {
        id: 'qn-4',
        type: 'multiple_choice',
        question: 'Which operator is used for deep optional chaining in modern JavaScript?',
        options: ['?.', '??', '||', '&&'],
        correctAnswer: '?.',
        explanation: 'The optional chaining operator (`?.`) allows reading values of properties located deep within an object chain without throwing an error if a reference is nullish.',
        points: 20,
      },
      {
        id: 'qn-5',
        type: 'short_answer',
        question: 'What keyword is used to declare a variable that cannot be reassigned?',
        options: [],
        correctAnswer: 'const',
        explanation: '`const` creates a read-only reference to a value, preventing variable reassignment.',
        points: 20,
      },
    ],
    attempts: [
      { id: 'att-1', studentId: '1', studentName: 'Muhammad Ali', rollNumber: '102341', score: 80, percentage: 80, timeTaken: '18 min', status: 'Passed', attemptDate: '2026-08-01' },
      { id: 'att-2', studentId: '2', studentName: 'Fatima Ahmed', rollNumber: '102342', score: 100, percentage: 100, timeTaken: '22 min', status: 'Passed', attemptDate: '2026-08-02' },
      { id: 'att-3', studentId: '3', studentName: 'Usman Ghani', rollNumber: '102343', score: 60, percentage: 60, timeTaken: '29 min', status: 'Failed', attemptDate: '2026-08-03' },
      { id: 'att-4', studentId: '4', studentName: 'Aisha Malik', rollNumber: '102344', score: 80, percentage: 80, timeTaken: '15 min', status: 'Passed', attemptDate: '2026-08-05' },
    ],
  },
  {
    id: 'q-2',
    title: 'React State Management & Redux Toolkit',
    description: 'Assess state hydration, slice reducers, RTK Query caching, and selector memoization.',
    course: 'Web & Mobile Dev',
    teacher: 'Sara Ahmed',
    teacherId: 't-2',
    difficulty: 'Hard',
    duration: 45,
    passingScore: 75,
    instructions: 'Test covers Redux Toolkit, useReducer, and Context API. Select the single best answer for each question.',
    status: 'Published',
    createdDate: '2026-07-20',
    questions: [
      {
        id: 'qn-201',
        type: 'multiple_choice',
        question: 'What Redux Toolkit helper automatically generates action creators and action types based on reducers?',
        options: ['createSlice', 'createReducer', 'createAction', 'configureStore'],
        correctAnswer: 'createSlice',
        explanation: 'createSlice accepts an initial state and reducer functions, automatically deriving action creators.',
        points: 25,
      },
      {
        id: 'qn-202',
        type: 'true_false',
        question: 'RTK Query baseQueryWithReauth handles token refresh logic when receiving HTTP 401 response status.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Custom baseQuery wrappers can intercept status 401 to re-authenticate or clear invalid sessions.',
        points: 25,
      },
      {
        id: 'qn-203',
        type: 'multiple_choice',
        question: 'Which hook should be used to retrieve data from the Redux store in a React component?',
        options: ['useSelector', 'useDispatch', 'useStore', 'useContext'],
        correctAnswer: 'useSelector',
        explanation: 'useSelector extracts state data using selector functions.',
        points: 25,
      },
      {
        id: 'qn-204',
        type: 'short_answer',
        question: 'What tool library enables mutating syntax safely in Redux Toolkit reducers under the hood?',
        options: [],
        correctAnswer: 'immer',
        explanation: 'Immer uses Proxies to allow writing mutable code that produces immutable state updates.',
        points: 25,
      },
    ],
    attempts: [
      { id: 'att-10', studentId: '1', studentName: 'Muhammad Ali', rollNumber: '102341', score: 100, percentage: 100, timeTaken: '32 min', status: 'Passed', attemptDate: '2026-08-04' },
      { id: 'att-11', studentId: '5', studentName: 'Bilal Hussain', rollNumber: '102345', score: 75, percentage: 75, timeTaken: '40 min', status: 'Passed', attemptDate: '2026-08-06' },
    ],
  },
  {
    id: 'q-3',
    title: 'Node.js, Express & REST API Architecture',
    description: 'Testing middleware pipeline, controller handlers, JWT verification, and HTTP error responses.',
    course: 'Web & Mobile Dev',
    teacher: 'Ali Khan',
    teacherId: 't-1',
    difficulty: 'Medium',
    duration: 30,
    passingScore: 70,
    instructions: 'Focus on Express middleware mechanics and asynchronous route handling.',
    status: 'Published',
    createdDate: '2026-07-28',
    questions: [
      {
        id: 'qn-301',
        type: 'multiple_choice',
        question: 'What is the mandatory four-argument signature for an Express error-handling middleware function?',
        options: ['(err, req, res, next)', '(req, res, err, next)', '(req, res, next)', '(err, res)'],
        correctAnswer: '(err, req, res, next)',
        explanation: 'Express identifies error middlewares specifically by their 4-parameter signature.',
        points: 50,
      },
      {
        id: 'qn-302',
        type: 'true_false',
        question: 'HTTP status code 403 Forbidden indicates that the client is authenticated but lacks required permissions.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: '401 indicates unauthenticated/invalid session, while 403 indicates forbidden authorization.',
        points: 50,
      },
    ],
    attempts: [
      { id: 'att-20', studentId: '2', studentName: 'Fatima Ahmed', rollNumber: '102342', score: 100, percentage: 100, timeTaken: '20 min', status: 'Passed', attemptDate: '2026-08-08' },
    ],
  },
  {
    id: 'q-4',
    title: 'MongoDB Schemas & Aggregation Pipelines',
    description: 'Evaluating database indexing, Mongoose schemas, population, and multi-stage aggregation pipelines.',
    course: 'Web & Mobile Dev',
    teacher: 'Usman Ghani',
    teacherId: 't-3',
    difficulty: 'Hard',
    duration: 40,
    passingScore: 70,
    instructions: 'Draft phase quiz under review for upcoming Cohort batch test.',
    status: 'Draft',
    createdDate: '2026-08-05',
    questions: [
      {
        id: 'qn-401',
        type: 'multiple_choice',
        question: 'Which aggregation stage is used to filter documents in a MongoDB pipeline?',
        options: ['$match', '$filter', '$find', '$where'],
        correctAnswer: '$match',
        explanation: '$match filters the document stream to pass only matching documents to the next stage.',
        points: 100,
      },
    ],
    attempts: [],
  },
  {
    id: 'q-5',
    title: 'CSS Grid, Flexbox & Responsive Layouts',
    description: 'Mastering modern CSS layout algorithms, container queries, and mobile-first design systems.',
    course: 'UI/UX Design',
    teacher: 'Fatima Noor',
    teacherId: 't-4',
    difficulty: 'Easy',
    duration: 25,
    passingScore: 60,
    instructions: 'Covers flexbox axis alignment, grid auto-fit, and media queries.',
    status: 'Published',
    createdDate: '2026-06-10',
    questions: [
      {
        id: 'qn-501',
        type: 'true_false',
        question: 'In Flexbox, `justify-content` aligns items along the main axis while `align-items` aligns along the cross axis.',
        options: ['True', 'False'],
        correctAnswer: 'True',
        explanation: 'Main axis alignment is controlled by justify-content; cross axis is controlled by align-items.',
        points: 100,
      },
    ],
    attempts: [
      { id: 'att-30', studentId: '3', studentName: 'Usman Ghani', rollNumber: '102343', score: 100, percentage: 100, timeTaken: '12 min', status: 'Passed', attemptDate: '2026-06-25' },
    ],
  },
];

let quizzesStore = [...INITIAL_QUIZZES];

/**
 * Service Methods for Quizzes
 */
export const quizService = {
  // Fetch quizzes with dynamic filters & aggregate summary stats
  getQuizzes: ({ search = '', status = 'All', course = 'All', teacher = 'All', difficulty = 'All', sortBy = 'Newest' } = {}) => {
    let filtered = [...quizzesStore];

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (quiz) =>
          quiz.title.toLowerCase().includes(q) ||
          quiz.description.toLowerCase().includes(q) ||
          quiz.course.toLowerCase().includes(q) ||
          quiz.teacher.toLowerCase().includes(q)
      );
    }

    if (status !== 'All') {
      filtered = filtered.filter((quiz) => quiz.status.toLowerCase() === status.toLowerCase());
    }

    if (course !== 'All') {
      filtered = filtered.filter((quiz) => quiz.course === course);
    }

    if (teacher !== 'All') {
      filtered = filtered.filter((quiz) => quiz.teacher === teacher);
    }

    if (difficulty !== 'All') {
      filtered = filtered.filter((quiz) => quiz.difficulty.toLowerCase() === difficulty.toLowerCase());
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'Newest') return new Date(b.createdDate) - new Date(a.createdDate);
      if (sortBy === 'Oldest') return new Date(a.createdDate) - new Date(b.createdDate);
      if (sortBy === 'Highest Attempts') return b.attempts.length - a.attempts.length;
      if (sortBy === 'Highest Score') {
        const avgA = a.attempts.length ? a.attempts.reduce((acc, curr) => acc + curr.percentage, 0) / a.attempts.length : 0;
        const avgB = b.attempts.length ? b.attempts.reduce((acc, curr) => acc + curr.percentage, 0) / b.attempts.length : 0;
        return avgB - avgA;
      }
      return 0;
    });

    // Compute dynamic aggregate stats from dataset
    const totalQuizzes = quizzesStore.length;
    const publishedCount = quizzesStore.filter((q) => q.status === 'Published').length;
    const draftCount = quizzesStore.filter((q) => q.status === 'Draft').length;
    
    let totalAttempts = 0;
    let sumPercentage = 0;
    quizzesStore.forEach((q) => {
      totalAttempts += q.attempts.length;
      q.attempts.forEach((att) => {
        sumPercentage += att.percentage;
      });
    });

    const averageScore = totalAttempts > 0 ? Math.round(sumPercentage / totalAttempts) : 0;

    return {
      items: filtered,
      summary: {
        totalQuizzes,
        publishedCount,
        draftCount,
        totalAttempts,
        averageScore,
      },
    };
  },

  // Get single quiz by ID
  getQuizById: (quizId) => {
    const quiz = quizzesStore.find((q) => q.id === quizId);
    if (!quiz) return null;

    // Calculate detailed quiz metrics
    const totalAttempts = quiz.attempts.length;
    const percentages = quiz.attempts.map((a) => a.percentage);
    const avgScore = totalAttempts > 0 ? Math.round(percentages.reduce((a, b) => a + b, 0) / totalAttempts) : 0;
    const highestScore = totalAttempts > 0 ? Math.max(...percentages) : 0;
    const lowestScore = totalAttempts > 0 ? Math.min(...percentages) : 0;
    const passCount = quiz.attempts.filter((a) => a.status === 'Passed').length;
    const passRate = totalAttempts > 0 ? Math.round((passCount / totalAttempts) * 100) : 0;

    return {
      ...quiz,
      metrics: {
        totalAttempts,
        avgScore,
        highestScore,
        lowestScore,
        passCount,
        failCount: totalAttempts - passCount,
        passRate,
      },
    };
  },

  // Create new Quiz
  createQuiz: (data) => {
    const newId = `q-${Date.now()}`;
    const newQuiz = {
      id: newId,
      title: data.title,
      description: data.description || '',
      course: data.course || 'Web & Mobile Dev',
      teacher: data.teacher || 'Ali Khan',
      teacherId: data.teacherId || 't-1',
      difficulty: data.difficulty || 'Medium',
      duration: Number(data.duration) || 30,
      passingScore: Number(data.passingScore) || 70,
      instructions: data.instructions || '',
      status: data.status || 'Draft',
      createdDate: new Date().toISOString().split('T')[0],
      questions: data.questions || [],
      attempts: [],
    };
    quizzesStore = [newQuiz, ...quizzesStore];
    return newQuiz;
  },

  // Update existing Quiz
  updateQuiz: (quizId, data) => {
    const index = quizzesStore.findIndex((q) => q.id === quizId);
    if (index === -1) throw new Error('Quiz not found');
    
    quizzesStore[index] = {
      ...quizzesStore[index],
      ...data,
      duration: data.duration !== undefined ? Number(data.duration) : quizzesStore[index].duration,
      passingScore: data.passingScore !== undefined ? Number(data.passingScore) : quizzesStore[index].passingScore,
    };
    return quizzesStore[index];
  },

  // Delete Quiz
  deleteQuiz: (quizId) => {
    quizzesStore = quizzesStore.filter((q) => q.id !== quizId);
    return true;
  },

  // Duplicate Quiz
  duplicateQuiz: (quizId) => {
    const target = quizzesStore.find((q) => q.id === quizId);
    if (!target) throw new Error('Quiz not found');

    const duplicate = {
      ...target,
      id: `q-dup-${Date.now()}`,
      title: `${target.title} (Copy)`,
      status: 'Draft',
      createdDate: new Date().toISOString().split('T')[0],
      attempts: [],
    };
    quizzesStore = [duplicate, ...quizzesStore];
    return duplicate;
  },

  // Toggle Publish Status
  togglePublishQuiz: (quizId) => {
    const index = quizzesStore.findIndex((q) => q.id === quizId);
    if (index === -1) throw new Error('Quiz not found');
    const target = quizzesStore[index];
    const updated = {
      ...target,
      status: target.status === 'Published' ? 'Draft' : 'Published',
    };
    quizzesStore[index] = updated;
    return updated;
  },

  // Submit Student Quiz Attempt
  submitQuizAttempt: (quizId, userAnswers, timeSpentSeconds, studentInfo = {}) => {
    const quizIndex = quizzesStore.findIndex((q) => q.id === quizId);
    if (quizIndex === -1) throw new Error('Quiz not found');
    const quiz = quizzesStore[quizIndex];

    let totalPointsAvailable = 0;
    let earnedPoints = 0;
    let correctCount = 0;

    const questionsReview = (quiz.questions || []).map((qn) => {
      totalPointsAvailable += qn.points || 20;
      const userAns = userAnswers[qn.id] || '';
      const isCorrect = String(userAns).trim().toLowerCase() === String(qn.correctAnswer).trim().toLowerCase();

      if (isCorrect) {
        earnedPoints += qn.points || 20;
        correctCount += 1;
      }

      return {
        questionId: qn.id,
        question: qn.question,
        type: qn.type,
        options: qn.options,
        userAnswer: userAns,
        correctAnswer: qn.correctAnswer,
        explanation: qn.explanation,
        points: qn.points || 20,
        isCorrect,
      };
    });

    const percentage = totalPointsAvailable > 0 ? Math.round((earnedPoints / totalPointsAvailable) * 100) : 0;
    const isPassed = percentage >= quiz.passingScore;

    const minutesTaken = Math.max(1, Math.round(timeSpentSeconds / 60));
    const attemptRecord = {
      id: `att-${Date.now()}`,
      studentId: studentInfo.id || 'current_student_id',
      studentName: studentInfo.name || 'Muhammad Ali',
      rollNumber: studentInfo.rollNumber || '102341',
      score: percentage,
      percentage,
      timeTaken: `${minutesTaken} min`,
      status: isPassed ? 'Passed' : 'Failed',
      attemptDate: new Date().toISOString().split('T')[0],
      questionsReview,
    };

    const existingAttempts = Array.isArray(quiz.attempts) ? [...quiz.attempts] : [];
    const updatedQuiz = {
      ...quiz,
      attempts: [attemptRecord, ...existingAttempts],
    };

    quizzesStore[quizIndex] = updatedQuiz;

    return {
      quizId,
      quizTitle: quiz.title,
      course: quiz.course,
      passingScore: quiz.passingScore,
      percentage,
      isPassed,
      timeSpentSeconds,
      correctCount,
      totalQuestions: (quiz.questions || []).length,
      questionsReview,
      attemptRecord,
    };
  },

  // Get student-facing categorized quizzes
  getStudentQuizzes: (studentId = '1', tab = 'Available') => {
    const allPublished = quizzesStore.filter((q) => q.status === 'Published');

    const completed = [];
    const available = [];
    const upcoming = [];

    allPublished.forEach((quiz) => {
      const studentAttempt = quiz.attempts.find((a) => String(a.studentId) === String(studentId));
      if (studentAttempt) {
        completed.push({
          ...quiz,
          attempt: studentAttempt,
        });
      } else {
        available.push(quiz);
      }
    });

    if (tab === 'Completed') return completed;
    if (tab === 'Upcoming') return upcoming;
    return available;
  },
};

export default quizService;
