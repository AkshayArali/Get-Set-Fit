
import React, { useState } from 'react';
import { suggestExercises } from '../services/geminiService';
import { SparklesIcon } from './icons';

interface ExerciseSuggestionProps {
  onAddExercise: (name: string) => void;
}

const ExerciseSuggestion: React.FC<ExerciseSuggestionProps> = ({ onAddExercise }) => {
  const [muscleGroup, setMuscleGroup] = useState('');
  const [suggestions, setSuggestions] = useState<{name: string, description: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSuggest = async () => {
    if (!muscleGroup) return;
    setIsLoading(true);
    setError(null);
    setSuggestions([]);
    try {
      const result = await suggestExercises(muscleGroup);
      setSuggestions(result);
    } catch (e) {
      setError('Could not get suggestions. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-6">
      <h3 className="text-lg font-bold text-gray-100 flex items-center gap-2">
        <SparklesIcon className="w-6 h-6 text-blue-400" />
        AI Exercise Suggester
      </h3>
      <p className="text-sm text-gray-400 mt-1">Stuck? Get some ideas for a muscle group.</p>
      <div className="flex gap-2 mt-4">
        <input
          type="text"
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)}
          placeholder="e.g., Chest, Legs, Biceps"
          className="flex-grow bg-gray-700 text-white placeholder-gray-400 border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSuggest}
          disabled={isLoading || !muscleGroup}
          className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Suggest'
          )}
        </button>
      </div>

      {error && <p className="text-red-400 mt-3 text-sm">{error}</p>}

      {suggestions.length > 0 && (
        <div className="mt-4 space-y-2">
            <h4 className="text-md font-semibold text-gray-200">Suggestions:</h4>
            <ul className="space-y-2">
                {suggestions.map((s, index) => (
                    <li key={index} className="bg-gray-700 p-3 rounded-md flex justify-between items-center gap-2">
                        <div>
                           <p className="font-semibold text-gray-100">{s.name}</p>
                           <p className="text-sm text-gray-400">{s.description}</p>
                        </div>
                        <button
                            onClick={() => onAddExercise(s.name)}
                            className="text-blue-400 hover:text-blue-300 text-sm font-semibold whitespace-nowrap"
                        >
                            + Add
                        </button>
                    </li>
                ))}
            </ul>
        </div>
      )}
    </div>
  );
};

export default ExerciseSuggestion;