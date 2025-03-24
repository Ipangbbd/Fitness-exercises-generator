// Exercise database organized by muscle groups
const exerciseDatabase = {
    chest: [
        { name: "Bench Press", sets: "3-4", reps: "8-12" },
        { name: "Incline Dumbbell Press", sets: "3", reps: "10-12" },
        { name: "Chest Flyes", sets: "3", reps: "12-15" },
        { name: "Push-Ups", sets: "3", reps: "Max" },
        { name: "Cable Crossover", sets: "3", reps: "12-15" },
        { name: "Decline Bench Press", sets: "3", reps: "8-12" },
        { name: "Dumbbell Pullovers", sets: "3", reps: "10-12" }
    ],
    back: [
        { name: "Pull-Ups", sets: "3-4", reps: "Max" },
        { name: "Bent Over Rows", sets: "3", reps: "8-12" },
        { name: "Lat Pulldowns", sets: "3", reps: "10-12" },
        { name: "Seated Cable Rows", sets: "3", reps: "10-12" },
        { name: "Deadlifts", sets: "3", reps: "6-10" },
        { name: "T-Bar Rows", sets: "3", reps: "8-12" },
        { name: "Single-Arm Dumbbell Rows", sets: "3", reps: "10-12" }
    ],
    shoulders: [
        { name: "Overhead Press", sets: "3-4", reps: "8-12" },
        { name: "Lateral Raises", sets: "3", reps: "12-15" },
        { name: "Front Raises", sets: "3", reps: "12-15" },
        { name: "Reverse Flyes", sets: "3", reps: "12-15" },
        { name: "Face Pulls", sets: "3", reps: "12-15" },
        { name: "Shrugs", sets: "3", reps: "10-12" },
        { name: "Arnold Press", sets: "3", reps: "10-12" }
    ],
    legs: [
        { name: "Squats", sets: "3-4", reps: "8-12" },
        { name: "Leg Press", sets: "3", reps: "10-12" },
        { name: "Lunges", sets: "3", reps: "10-12 each leg" },
        { name: "Leg Extensions", sets: "3", reps: "12-15" },
        { name: "Leg Curls", sets: "3", reps: "12-15" },
        { name: "Calf Raises", sets: "4", reps: "15-20" },
        { name: "Romanian Deadlifts", sets: "3", reps: "8-12" },
        { name: "Bulgarian Split Squats", sets: "3", reps: "10-12 each leg" }
    ],
    arms: [
        { name: "Bicep Curls", sets: "3", reps: "10-12" },
        { name: "Tricep Pushdowns", sets: "3", reps: "10-12" },
        { name: "Hammer Curls", sets: "3", reps: "10-12" },
        { name: "Skull Crushers", sets: "3", reps: "10-12" },
        { name: "Preacher Curls", sets: "3", reps: "10-12" },
        { name: "Tricep Dips", sets: "3", reps: "Max" },
        { name: "Concentration Curls", sets: "3", reps: "12-15" },
        { name: "Overhead Tricep Extensions", sets: "3", reps: "12-15" }
    ],
    core: [
        { name: "Crunches", sets: "3", reps: "15-20" },
        { name: "Plank", sets: "3", reps: "30-60 sec" },
        { name: "Russian Twists", sets: "3", reps: "20 each side" },
        { name: "Leg Raises", sets: "3", reps: "12-15" },
        { name: "Mountain Climbers", sets: "3", reps: "20 each side" },
        { name: "Ab Rollouts", sets: "3", reps: "10-15" },
        { name: "Bicycle Crunches", sets: "3", reps: "20 each side" }
    ]
};

// Schedule templates for different training frequencies
const scheduleTemplates = {
    "2-week": [
        {
            day: "Day 1",
            focus: "Upper Body",
            muscleGroups: ["chest", "back", "shoulders", "arms"]
        },
        {
            day: "Day 2",
            focus: "Lower Body & Core",
            muscleGroups: ["legs", "core"]
        }
    ],
    "3-week": [
        {
            day: "Day 1",
            focus: "Push",
            muscleGroups: ["chest", "shoulders", "arms"]
        },
        {
            day: "Day 2",
            focus: "Pull",
            muscleGroups: ["back", "arms"]
        },
        {
            day: "Day 3",
            focus: "Legs & Core",
            muscleGroups: ["legs", "core"]
        }
    ],
    "4-week": [
        {
            day: "Day 1",
            focus: "Chest & Triceps",
            muscleGroups: ["chest", "arms"]
        },
        {
            day: "Day 2",
            focus: "Back & Biceps",
            muscleGroups: ["back", "arms"]
        },
        {
            day: "Day 3",
            focus: "Legs",
            muscleGroups: ["legs"]
        },
        {
            day: "Day 4",
            focus: "Shoulders & Core",
            muscleGroups: ["shoulders", "core"]
        }
    ],
    "5-week": [
        {
            day: "Day 1",
            focus: "Chest",
            muscleGroups: ["chest"]
        },
        {
            day: "Day 2",
            focus: "Back",
            muscleGroups: ["back"]
        },
        {
            day: "Day 3",
            focus: "Legs",
            muscleGroups: ["legs"]
        },
        {
            day: "Day 4",
            focus: "Shoulders",
            muscleGroups: ["shoulders"]
        },
        {
            day: "Day 5",
            focus: "Arms & Core",
            muscleGroups: ["arms", "core"]
        }
    ]
};

// Function to get a randomized schedule based on frequency
function getSchedule(frequency) {
    const template = scheduleTemplates[frequency];
    const schedule = [];

    for (const day of template) {
        const daySchedule = {
            day: day.day,
            focus: day.focus,
            exercises: []
        };

        // For each muscle group in this day's focus
        for (const group of day.muscleGroups) {
            const muscleExercises = {
                group: group.charAt(0).toUpperCase() + group.slice(1),
                exercises: []
            };

            // Get random exercises for this muscle group (2-3 exercises per group)
            const exerciseCount = Math.floor(Math.random() * 2) + 2; // 2-3 exercises
            const availableExercises = [...exerciseDatabase[group]];

            for (let i = 0; i < exerciseCount && availableExercises.length > 0; i++) {
                // Get random exercise
                const randomIndex = Math.floor(Math.random() * availableExercises.length);
                const exercise = availableExercises.splice(randomIndex, 1)[0];

                muscleExercises.exercises.push({
                    name: exercise.name,
                    sets: exercise.sets,
                    reps: exercise.reps
                });
            }

            daySchedule.exercises.push(muscleExercises);
        }

        schedule.push(daySchedule);
    }

    return schedule;
}