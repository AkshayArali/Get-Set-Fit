
import React from 'react';
import { WorkoutLog } from '../types';
import { CheckCircleIcon, HistoryIcon } from './icons';

interface WorkoutHistoryProps {
  logs: WorkoutLog[];
  onClearHistory: () => void;
}

const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({ logs, onClearHistory }) => {
  const sortedLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return (
    <div className="p-4 max-w-2xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <HistoryIcon className="w-7 h-7" />
        Workout History
      </h2>

      {sortedLogs.length === 0 ? (
        <div className="text-center py-10 bg-gray-800 rounded-lg">
          <p className="text-gray-400">No workouts completed yet.</p>
          <p className="text-gray-500 text-sm mt-1">Finish a workout to see it here!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {sortedLogs.map(log => (
            <div key={log.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-4">
                <CheckCircleIcon className="w-8 h-8 text-green-500" />
                <div>
                  <p className="font-bold text-lg text-gray-100">{log.planName}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(log.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <p className="font-semibold text-gray-300">{formatDuration(log.duration)}</p>
            </div>
          ))}
          <div className="pt-4 flex justify-end">
            <button
                onClick={onClearHistory}
                className="text-sm text-red-500 hover:text-red-400"
            >
                Clear All History
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutHistory;