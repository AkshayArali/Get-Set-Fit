
import { WorkoutPlan, WorkoutLog } from '../types';

const PLANS_KEY = 'get_set_fit_workout_plans';
const LOGS_KEY = 'get_set_fit_workout_logs';
const SETTINGS_KEY = 'get_set_fit_settings';

export interface AppSettings {
  theme: 'light' | 'dark';
  units: 'metric' | 'imperial';
  notifications: boolean;
  offlineMode: boolean;
}

// Enhanced storage with error handling and fallbacks
const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  },
  setItem: (key: string, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Error writing to localStorage:', error);
      return false;
    }
  }
};

export const getWorkoutPlans = (): WorkoutPlan[] => {
  const data = safeStorage.getItem(PLANS_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing workout plans:', error);
    return [];
  }
};

export const saveWorkoutPlans = (plans: WorkoutPlan[]): boolean => {
  return safeStorage.setItem(PLANS_KEY, JSON.stringify(plans));
};

export const getWorkoutLogs = (): WorkoutLog[] => {
  const data = safeStorage.getItem(LOGS_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch (error) {
    console.error('Error parsing workout logs:', error);
    return [];
  }
};

export const saveWorkoutLogs = (logs: WorkoutLog[]): boolean => {
  return safeStorage.setItem(LOGS_KEY, JSON.stringify(logs));
};

export const getSettings = (): AppSettings => {
  const data = safeStorage.getItem(SETTINGS_KEY);
  if (!data) {
    return {
      theme: 'dark',
      units: 'metric',
      notifications: true,
      offlineMode: true
    };
  }
  
  try {
    return { ...JSON.parse(data), offlineMode: true }; // Always enable offline mode
  } catch (error) {
    console.error('Error parsing settings:', error);
    return {
      theme: 'dark',
      units: 'metric',
      notifications: true,
      offlineMode: true
    };
  }
};

export const saveSettings = (settings: AppSettings): boolean => {
  return safeStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

// Export data for backup
export const exportData = (): string => {
  const data = {
    plans: getWorkoutPlans(),
    logs: getWorkoutLogs(),
    settings: getSettings(),
    exportDate: new Date().toISOString()
  };
  return JSON.stringify(data, null, 2);
};

// Import data from backup
export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.plans && Array.isArray(data.plans)) {
      saveWorkoutPlans(data.plans);
    }
    
    if (data.logs && Array.isArray(data.logs)) {
      saveWorkoutLogs(data.logs);
    }
    
    if (data.settings) {
      saveSettings(data.settings);
    }
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};