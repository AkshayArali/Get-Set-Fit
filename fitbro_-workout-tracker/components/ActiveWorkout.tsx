
import React, { useState, useEffect, useCallback } from 'react';
import { WorkoutPlan, WorkoutLog } from '../types';
import { CheckCircleIcon } from './icons';

interface ActiveWorkoutProps {
  plan: WorkoutPlan;
  onFinish: (log: WorkoutLog) => void;
  onCancel: () => void;
}

const REST_DURATION = 60; // 60 seconds rest

const ActiveWorkout: React.FC<ActiveWorkoutProps> = ({ plan, onFinish, onCancel }) => {
  const [startTime] = useState(Date.now());
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedSets, setCompletedSets] = useState<Record<string, boolean[]>>(
    plan.exercises.reduce((acc, ex) => ({ ...acc, [ex.id]: Array(ex.sets).fill(false) }), {})
  );
  const [isResting, setIsResting] = useState(false);
  const [restTimer, setRestTimer] = useState(REST_DURATION);

  const currentExercise = plan.exercises[currentExerciseIndex];
  const isWorkoutFinished = currentExerciseIndex >= plan.exercises.length;

  const handleFinishWorkout = useCallback(() => {
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);
    const log: WorkoutLog = {
      id: Date.now().toString(),
      planId: plan.id,
      planName: plan.name,
      date: new Date().toISOString(),
      duration: duration,
    };
    onFinish(log);
  }, [plan, startTime, onFinish]);

  useEffect(() => {
    if (isWorkoutFinished) {
      handleFinishWorkout();
    }
  }, [isWorkoutFinished, handleFinishWorkout]);

  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;
    if (isResting && restTimer > 0) {
      timerId = setTimeout(() => setRestTimer(r => r - 1), 1000);
    } else if (isResting && restTimer === 0) {
      setIsResting(false);
      setCurrentExerciseIndex(prev => prev + 1);
    }
    return () => clearTimeout(timerId);
  }, [isResting, restTimer]);


  const toggleSetComplete = (exerciseId: string, setIndex: number) => {
    const newCompletedSets = { ...completedSets };
    newCompletedSets[exerciseId][setIndex] = !newCompletedSets[exerciseId][setIndex];
    setCompletedSets(newCompletedSets);
    
    const allSetsCompleted = newCompletedSets[exerciseId].every(Boolean);
    if (allSetsCompleted) {
        setIsResting(true);
        setRestTimer(REST_DURATION);
    }
  };

  if (isResting) {
    return (
        <div className="p-4 max-w-2xl mx-auto text-white flex flex-col items-center justify-center h-screen">
            <h2 className="text-3xl font-bold text-blue-400">REST</h2>
            <p className="text-8xl font-mono font-bold my-8">{restTimer}</p>
            <p className="text-gray-400 text-lg">Next up: {plan.exercises[currentExerciseIndex + 1]?.name || "Workout Complete!"}</p>
            <button onClick={() => { setIsResting(false); setCurrentExerciseIndex(prev => prev + 1); }} className="mt-8 bg-gray-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-700">
                Skip Rest
            </button>
        </div>
    );
  }

  if (isWorkoutFinished || !currentExercise) {
    return (
        <div className="p-4 max-w-2xl mx-auto text-white flex flex-col items-center justify-center h-screen">
            <CheckCircleIcon className="w-24 h-24 text-green-500" />
            <h2 className="text-3xl font-bold mt-6">Workout Complete!</h2>
            <p className="text-gray-400 mt-2">Great job, keep up the hard work!</p>
        </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto text-white">
      <div className="mb-6">
        <p className="text-gray-400">{plan.name}</p>
        <h2 className="text-3xl font-bold text-blue-400">{currentExercise.name}</h2>
        <p className="text-lg text-gray-300">{currentExerciseIndex + 1} / {plan.exercises.length} Exercises</p>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Sets: {currentExercise.sets} | Reps: {currentExercise.reps}</h3>
        {Array.from({ length: currentExercise.sets }).map((_, setIndex) => (
          <button
            key={setIndex}
            onClick={() => toggleSetComplete(currentExercise.id, setIndex)}
            className={`w-full text-left p-4 rounded-lg transition-all flex justify-between items-center ${
              completedSets[currentExercise.id][setIndex]
                ? 'bg-green-500 text-white'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            <span className="text-lg font-bold">Set {setIndex + 1}</span>
            {completedSets[currentExercise.id][setIndex] ? (
              <CheckCircleIcon className="w-7 h-7" />
            ) : (
              <div className="w-7 h-7 border-2 border-gray-500 rounded-full"></div>
            )}
          </button>
        ))}
      </div>

       <div className="mt-8 flex justify-between items-center">
            <button onClick={onCancel} className="bg-red-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-red-700">
                End Workout
            </button>
        </div>
    </div>
  );
};

export default ActiveWorkout;
