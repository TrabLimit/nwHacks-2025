import { Navigation } from "@/components/Navigation";
import { WorkoutCard } from "@/components/WorkoutCard";

const selectedItems = {
  workout: {
    id: "4",
    title: "Upper Body Power",
    description: "Build upper body strength with this comprehensive routine.",
    duration: "40 min",
    level: "Intermediate",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000",
  },
  exercise: {
    id: "1",
    title: "Push-Ups",
    description: "Classic upper body exercise for strength and endurance.",
    duration: "5 min",
    level: "Beginner",
    image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000",
  },
  song: {
    id: "6",
    title: "Eye of the Tiger",
    description: "A motivational classic to keep you going!",
    duration: "4 min",
    level: "Music",
    image: "/brat.jpg",
  },
};

const Categories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f0e2d0] to-[#dbc1a6] flex items-center justify-center">
      <Navigation />
      <main className="container mx-auto page-transition">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-4xl font-extrabold text-[#5a3d31] tracking-tighter">
            Selected Workout
          </h1>
          <p className="mx-auto max-w-[600px] text-md text-[#5a3d31]">
            Your workout is ready for you to start
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center justify-center">
          <section className="text-center bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#5a3d31] mb-4">Workout Selected</h2>
            <img
              src={selectedItems.workout.image}
              alt={selectedItems.workout.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <p className="text-lg font-semibold text-[#5a3d31]">
              {selectedItems.workout.title}
            </p>
            <p className="text-sm text-[#5a3d31]">
              {selectedItems.workout.description}
            </p>
          </section>
          <section className="text-center bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#5a3d31] mb-4">Exercise Selected</h2>
            <img
              src={selectedItems.exercise.image}
              alt={selectedItems.exercise.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <p className="text-lg font-semibold text-[#5a3d31]">
              {selectedItems.exercise.title}
            </p>
            <p className="text-sm text-[#5a3d31]">
              {selectedItems.exercise.description}
            </p>
          </section>
          <section className="text-center bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-[#5a3d31] mb-4">Song Selected</h2>
            <img
              src={selectedItems.song.image}
              alt={selectedItems.song.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <p className="text-lg font-semibold text-[#5a3d31]">
              {selectedItems.song.title}
            </p>
            <p className="text-sm text-[#5a3d31]">
              {selectedItems.song.description}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Categories;
