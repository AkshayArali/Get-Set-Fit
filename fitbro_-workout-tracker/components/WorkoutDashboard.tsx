
import React from 'react';
import { WorkoutPlan, WorkoutLog } from '../types';
import { DumbbellIcon, PlayIcon, PlusIcon, HistoryIcon, TrashIcon } from './icons';

interface WorkoutDashboardProps {
  plans: WorkoutPlan[];
  logs: WorkoutLog[];
  onStartWorkout: (plan: WorkoutPlan) => void;
  onCreateWorkout: () => void;
  onViewHistory: () => void;
  onDeletePlan: (planId: string) => void;
}

const WorkoutDashboard: React.FC<WorkoutDashboardProps> = ({ plans, logs, onStartWorkout, onCreateWorkout, onViewHistory, onDeletePlan }) => {
  // Calculate stats
  const totalWorkouts = logs.length;
  const totalDuration = logs.reduce((acc, log) => acc + log.duration, 0);
  const averageDuration = totalWorkouts > 0 ? Math.round(totalDuration / totalWorkouts / 60) : 0;
  const lastWorkout = logs.length > 0 ? new Date(logs[logs.length - 1].date) : null;

  return (
    <div className="p-4 max-w-4xl mx-auto text-white">
      <header className="text-center my-8">
        <h1 className="text-4xl font-bold text-gray-100 flex items-center justify-center gap-3">
            <DumbbellIcon className="w-10 h-10 text-blue-500"/>
            Get Set Fit
        </h1>
        <p className="text-gray-400 mt-2">Your personal fitness tracker. Let's get it!</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{totalWorkouts}</div>
          <div className="text-sm text-gray-400">Total Workouts</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{averageDuration}m</div>
          <div className="text-sm text-gray-400">Avg Duration</div>
        </div>
        <div className="bg-gray-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-400">
            {lastWorkout ? lastWorkout.toLocaleDateString() : 'Never'}
          </div>
          <div className="text-sm text-gray-400">Last Workout</div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button onClick={onCreateWorkout} className="bg-blue-600 text-white font-bold py-4 px-6 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg">
                <PlusIcon className="w-6 h-6"/>
                New Workout Plan
            </button>
            <button onClick={onViewHistory} className="bg-gray-700 text-white font-bold py-4 px-6 rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105 flex items-center justify-center gap-2 text-lg">
                <HistoryIcon className="w-6 h-6"/>
                View History
            </button>
        </div>

        <div>
            <h2 className="text-xl font-semibold text-gray-200 mb-4">My Workout Plans</h2>
            {plans.length > 0 ? (
                <div className="space-y-3">
                    {plans.map(plan => (
                        <div key={plan.id} className="bg-gray-800 p-4 rounded-lg flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-gray-100">{plan.name}</h3>
                                <p className="text-sm text-gray-400">{plan.exercises.length} exercises</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => onDeletePlan(plan.id)}
                                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                                    aria-label={`Delete ${plan.name}`}
                                >
                                    <TrashIcon className="w-5 h-5"/>
                                </button>
                                <button onClick={() => onStartWorkout(plan)} className="bg-green-600 text-white font-semibold pl-4 pr-5 py-2 rounded-full hover:bg-green-700 transition-colors flex items-center gap-1.5">
                                    <PlayIcon className="w-5 h-5"/>
                                    Start
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 bg-gray-800 rounded-lg">
                    <p className="text-gray-400">You haven't created any workout plans yet.</p>
                    <button onClick={onCreateWorkout} className="mt-4 text-blue-400 font-semibold hover:underline">
                        Create your first plan
                    </button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDashboard;