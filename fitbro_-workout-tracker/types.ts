
export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: number;
  restTime?: number; // in seconds
  notes?: string;
  category?: string; // e.g., 'chest', 'back', 'legs', 'arms', 'shoulders', 'core'
}

export interface WorkoutPlan {
  id: string;
  name: string;
  description?: string;
  exercises: Exercise[];
  estimatedDuration?: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutLog {
  id: string;
  planId: string;
  planName: string;
  date: string;
  duration: number; // in seconds
  exercises: ExerciseLog[];
  notes?: string;
  rating?: number; // 1-5 stars
}

export interface ExerciseLog {
  exerciseId: string;
  exerciseName: string;
  sets: SetLog[];
  notes?: string;
}

export interface SetLog {
  setNumber: number;
  reps: number;
  weight?: number;
  restTime?: number;
  completed: boolean;
}

export interface WorkoutStats {
  totalWorkouts: number;
  totalDuration: number; // in minutes
  averageWorkoutDuration: number; // in minutes
  favoritePlan?: string;
  longestStreak: number; // days
  currentStreak: number; // days
  lastWorkout?: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  units: 'metric' | 'imperial';
  notifications: boolean;
  offlineMode: boolean;
  autoStartTimer: boolean;
  defaultRestTime: number; // in seconds
}