import {
  Bell,
  BookOpen,
  Brain,
  ClipboardList,
  Code2,
  FileText,
  GraduationCap,
  Home,
  LogIn,
  Package,
  PlayCircle,
  Shapes,
  ShoppingBag,
  Trophy,
  UserPlus,
  Video,
} from 'lucide-react';

export const guestNavigation = [
  ['/', 'Home', Home],
  ['/register', 'Register', UserPlus],
  ['/login', 'Sign in', LogIn],
  ['/catalogue', 'Course catalogue', BookOpen],
];

export const studentNavigation = [
  ['/student', 'Overview', Home],
  ['/student/courses', 'Explore courses', BookOpen],
  ['/student/learning', 'My learning', GraduationCap],
  ['/student/live', 'Live classroom', Video],
  ['/student/videos', 'Recorded lessons', PlayCircle],
  ['/student/code', 'Code studio', Code2],
  ['/student/circuit', 'Circuit lab', Shapes],
  ['/student/assignments', 'Assignments', ClipboardList],
  ['/student/quiz', 'Quizzes', FileText],
  ['/student/recommendations', 'Skill recommendations', Brain],
  ['/student/leaderboards', 'Course leaderboards', Trophy],
  ['/student/store', 'Hardware store', ShoppingBag],
  ['/student/orders', 'My orders', Package],
  ['/student/notifications', 'Notifications', Bell],
];
