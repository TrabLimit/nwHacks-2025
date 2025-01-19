import { Navigation } from "@/components/Navigation";
import { useEffect, useState } from "react";

const selectedItem = {
  workout: {
    id: "4",
    title: "Upper Body Power",
    description: "Build upper body strength with this comprehensive routine.",
    duration: "40 min",
    level: "Intermediate",
    videoUrl: "https://www.youtube.com/embed/dpY4ZTV7Fm0",
  },
};

const Workout = () => {
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#e0e6f8] to-[#cbd4f4] flex flex-col">
      <Navigation />
      
      {/* Fixed Score, Points, Timer */}
      <div className="fixed top-4 right-4 space-y-2 text-white">
        <div className="bg-[#5e5b99] px-4 py-2 rounded-full font-bold shadow-md">
          Score: 100
        </div>
        <div className="bg-[#5e5b99] px-4 py-2 rounded-full font-bold shadow-md">
          Points: 50
        </div>
        <div className="bg-[#5e5b99] px-4 py-2 rounded-full font-bold shadow-md">
          Timer: {timeLeft}s
        </div>
      </div>

      <main className="flex-1 container mx-auto py-16 px-4 lg:px-0">
        {/* Workout Tutorial Section */}
        <section className="space-y-8">
          <h1 className="text-4xl font-extrabold text-center text-[#5e5b99]">
            Workout Tutorial
          </h1>
          <div className="rounded-lg overflow-hidden shadow-lg bg-[#cbd4f4] max-w-4xl mx-auto">
            <iframe
              src={selectedItem.workout.videoUrl}
              title="Workout Video"
              className="w-full h-[400px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* Workout Details Section */}
        <section className="mt-12">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-[#5e5b99] mb-4 text-center">
              {selectedItem.workout.title}
            </h2>
            <p className="text-lg text-[#7b7ab8] mb-6 text-center">
              {selectedItem.workout.description}
            </p>
            <div className="flex justify-center gap-6">
              <span className="inline-block bg-[#e0e6f8] text-[#5e5b99] px-4 py-2 rounded-full font-medium shadow-md">
                Duration: {selectedItem.workout.duration}
              </span>
              <span className="inline-block bg-[#e0e6f8] text-[#5e5b99] px-4 py-2 rounded-full font-medium shadow-md">
                Level: {selectedItem.workout.level}
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Workout;
