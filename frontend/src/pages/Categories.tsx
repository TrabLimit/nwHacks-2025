import { Navigation } from "@/components/Navigation";
import { WorkoutCard } from "@/components/WorkoutCard";

const selectedItems = {
  workout: {
    id: "4",
    title: "Core Crusher",
    description: "Build upper body strength with this comprehensive routine.",
    duration: "40 min",
    level: "Intermediate",
    image: "sit.jpg",
  },
  exercise: {
    id: "1",
    title: "Plank",
    description: "Classic upper body exercise for strength and endurance.",
    duration: "5 min",
    level: "Beginner",
    image: "plank.jpg",
  },
  song: {
    id: "6",
    title: "Brat",
    description: "A motivational classic to keep you going!",
    duration: "4 min",
    level: "Music",
    image: "/brat.jpg",
  },
};

const Categories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e0e6f8] to-[#cbd4f4] flex items-center justify-center">
      <Navigation />
      <main className="container mx-auto page-transition">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#5e5b99] tracking-tighter">
            Selected Workout
          </h1>
          <p className="mx-auto max-w-[600px] text-md text-[#7b7ab8]">
            Your workout is ready for you to start
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-center">
          {/* Workout Section */}
          <section className="text-center bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#5e5b99] mb-4">
              Workout Selected
            </h2>
            <img
              src={selectedItems.workout.image}
              alt={selectedItems.workout.title}
              className="w-full h-48 object-cover rounded-md mb-2 border border-[#cbd4f4]"
            />
            <p className="text-lg font-semibold text-[#5e5b99]">
              {selectedItems.workout.title}
            </p>
            <p className="text-sm text-[#7b7ab8]">
              {selectedItems.workout.description}
            </p>
          </section>

          {/* Exercise Section */}
          <section className="text-center bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#5e5b99] mb-4">
              Exercise Selected
            </h2>
            <img
              src={selectedItems.exercise.image}
              alt={selectedItems.exercise.title}
              className="w-full h-48 object-cover rounded-md mb-2 border border-[#cbd4f4]"
            />
            <p className="text-lg font-semibold text-[#5e5b99]">
              {selectedItems.exercise.title}
            </p>
            <p className="text-sm text-[#7b7ab8]">
              {selectedItems.exercise.description}
            </p>
          </section>

          {/* Song Section */}
          <section className="text-center bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#5e5b99] mb-4">
              Song Selected
            </h2>
            <img
              src={selectedItems.song.image}
              alt={selectedItems.song.title}
              className="w-full h-48 object-cover rounded-md mb-2 border border-[#cbd4f4]"
            />
            <p className="text-lg font-semibold text-[#5e5b99]">
              {selectedItems.song.title}
            </p>
            <p className="text-sm text-[#7b7ab8]">
              {selectedItems.song.description}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Categories;
