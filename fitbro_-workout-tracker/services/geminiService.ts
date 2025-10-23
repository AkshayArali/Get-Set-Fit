
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY is not set. AI features will be disabled.");
}

const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

const exerciseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      name: {
        type: Type.STRING,
        description: "The name of the exercise."
      },
      description: {
        type: Type.STRING,
        description: "A brief description of how to perform the exercise."
      }
    },
    required: ["name", "description"]
  }
};

export const suggestExercises = async (muscleGroup: string): Promise<{name: string, description: string}[]> => {
  if (!ai || !API_KEY) {
    console.warn("AI service is not available. Returning fallback exercises.");
    return getFallbackExercises(muscleGroup);
  }
  
  try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate a list of 5 effective exercises for the following muscle group: ${muscleGroup}.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: exerciseSchema,
        }
    });

    const text = response.text.trim();
    if (!text) {
        return getFallbackExercises(muscleGroup);
    }
    
    const parsed = JSON.parse(text);
    return parsed;

  } catch (error) {
    console.error("Error suggesting exercises:", error);
    console.warn("Falling back to offline exercise suggestions.");
    return getFallbackExercises(muscleGroup);
  }
};

// Fallback exercises when AI is not available
const getFallbackExercises = (muscleGroup: string): {name: string, description: string}[] => {
  const fallbackExercises: Record<string, {name: string, description: string}[]> = {
    chest: [
      { name: "Push-ups", description: "Classic bodyweight exercise for chest, shoulders, and triceps" },
      { name: "Bench Press", description: "Barbell or dumbbell press lying on a bench" },
      { name: "Incline Press", description: "Press at an incline to target upper chest" },
      { name: "Dumbbell Flyes", description: "Isolation exercise for chest muscles" },
      { name: "Dips", description: "Bodyweight exercise targeting chest and triceps" }
    ],
    back: [
      { name: "Pull-ups", description: "Bodyweight exercise for upper back and lats" },
      { name: "Bent-over Rows", description: "Barbell or dumbbell rows for back muscles" },
      { name: "Lat Pulldowns", description: "Machine exercise targeting latissimus dorsi" },
      { name: "Deadlifts", description: "Compound exercise for entire posterior chain" },
      { name: "Face Pulls", description: "Cable exercise for rear delts and upper back" }
    ],
    legs: [
      { name: "Squats", description: "Fundamental compound movement for legs and glutes" },
      { name: "Lunges", description: "Single-leg exercise for balance and strength" },
      { name: "Deadlifts", description: "Hip hinge movement for hamstrings and glutes" },
      { name: "Leg Press", description: "Machine exercise for quadriceps" },
      { name: "Calf Raises", description: "Isolation exercise for calf muscles" }
    ],
    arms: [
      { name: "Bicep Curls", description: "Isolation exercise for biceps" },
      { name: "Tricep Dips", description: "Bodyweight exercise for triceps" },
      { name: "Hammer Curls", description: "Variation of bicep curls with neutral grip" },
      { name: "Overhead Tricep Extension", description: "Isolation exercise for triceps" },
      { name: "Chin-ups", description: "Compound exercise targeting biceps and back" }
    ],
    shoulders: [
      { name: "Overhead Press", description: "Compound movement for shoulder development" },
      { name: "Lateral Raises", description: "Isolation exercise for side delts" },
      { name: "Front Raises", description: "Isolation exercise for front delts" },
      { name: "Rear Delt Flyes", description: "Isolation exercise for rear delts" },
      { name: "Pike Push-ups", description: "Bodyweight exercise for shoulders" }
    ],
    core: [
      { name: "Plank", description: "Isometric exercise for core stability" },
      { name: "Crunches", description: "Classic abdominal exercise" },
      { name: "Russian Twists", description: "Rotational core exercise" },
      { name: "Mountain Climbers", description: "Dynamic core and cardio exercise" },
      { name: "Dead Bug", description: "Core stability exercise" }
    ]
  };

  return fallbackExercises[muscleGroup.toLowerCase()] || fallbackExercises.core;
};