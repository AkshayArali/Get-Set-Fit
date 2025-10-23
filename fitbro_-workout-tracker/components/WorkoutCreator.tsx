
import React, { useState } from 'react';
import { WorkoutPlan, Exercise } from '../types';
import { TrashIcon, PlusIcon } from './icons';
import ExerciseSuggestion from './ExerciseSuggestion';

interface WorkoutCreatorProps {
  onSave: (plan: WorkoutPlan) => void;
  onCancel: () => void;
  planToEdit?: WorkoutPlan;
}

const WorkoutCreator: React.FC<WorkoutCreatorProps> = ({ onSave, onCancel, planToEdit }) => {
  const [name, setName] = useState(planToEdit?.name || '');
  const [exercises, setExercises] = useState<Exercise[]>(planToEdit?.exercises || []);

  const addExercise = (exerciseName: string = '') => {
    setExercises([...exercises, { id: Date.now().toString(), name: exerciseName, sets: 3, reps: '8-12' }]);
  };

  const updateExercise = <T extends keyof Exercise,>(index: number, field: T, value: Exercise[T]) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };
  
  const handleSave = () => {
    if (name && exercises.length > 0) {
      onSave({
        id: planToEdit?.id || Date.now().toString(),
        name,
        exercises,
      });
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto text-white">
      <h2 className="text-2xl font-bold mb-6">{planToEdit ? 'Edit Workout Plan' : 'Create Workout Plan'}</h2>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="workout-name" className="block text-sm font-medium text-gray-300 mb-1">Workout Name</label>
          <input
            id="workout-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Monday - Chest & Triceps"
            className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Exercises</h3>
          <div className="space-y-3">
            {exercises.map((ex, index) => (
              <div key={ex.id} className="bg-gray-800 p-3 rounded-lg flex items-center gap-3">
                <span className="text-gray-400 font-bold">{index + 1}</span>
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input type="text" value={ex.name} onChange={(e) => updateExercise(index, 'name', e.target.value)} placeholder="Exercise Name" className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                  <input type="number" value={ex.sets} onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value) || 0)} placeholder="Sets" className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                  <input type="text" value={ex.reps} onChange={(e) => updateExercise(index, 'reps', e.target.value)} placeholder="Reps (e.g., 8-12)" className="bg-gray-700 text-white border border-gray-600 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"/>
                </div>
                <button onClick={() => removeExercise(index)} className="text-red-400 hover:text-red-300 p-1">
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => addExercise()} className="mt-4 flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors">
            <PlusIcon className="w-5 h-5"/>
            Add Exercise
          </button>
        </div>

        <ExerciseSuggestion onAddExercise={(name) => {
            const newExercise = { id: Date.now().toString(), name: name, sets: 3, reps: '8-12' };
            setExercises([...exercises, newExercise]);
        }} />
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button onClick={onCancel} className="bg-gray-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">Cancel</button>
        <button onClick={handleSave} disabled={!name || exercises.length === 0} className="bg-blue-600 text-white font-bold px-6 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">
          Save Plan
        </button>
      </div>
    </div>
  );
};

export default WorkoutCreator;