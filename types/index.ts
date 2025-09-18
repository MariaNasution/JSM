export interface Course {
  id: number;
  title: string;
  instructor: string;
  dueDate: string;
  progress: number;
  totalLectures: number;
  completedLectures: number;
  status: 'Continue' | 'Start' | 'Retake';
  statusType: 'continue' | 'start' | 'retake';
  tag?: string;
  tagColor?: string;
}

export interface SidebarProps {
  className?: string;
}

export interface LayoutProps {
  children: React.ReactNode;
}