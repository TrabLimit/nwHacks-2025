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
    <div className="min-h-screen bg-gradient-to-r from-[#f0e2d0] to-[#dbc1a6] flex flex-col items-center relative">
      <Navigation />
      <div className="fixed top-4 right-6 bg-[#5a3d31] text-white px-4 py-2 rounded-full font-bold">
        Score: 100
      </div>
      <div className="fixed bottom-4 left-6 bg-[#5a3d31] text-white px-4 py-2 rounded-full font-bold">
        Points: 50
      </div>
      <div className="fixed bottom-4 right-6 bg-[#5a3d31] text-white px-4 py-2 rounded-full font-bold">
        Timer: {timeLeft}s
      </div>
      <main className="container mx-auto pt-36 page-transition space-y-12">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-extrabold text-[#5a3d31] tracking-tighter">
            Workout Tutorial
          </h1>
          <div className="w-3/4 mx-auto bg-black rounded-lg overflow-hidden">
            <iframe
              src={selectedItem.workout.videoUrl}
              title="Workout Video"
              className="w-full h-[500px]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-[#5a3d31] mb-4">
            {selectedItem.workout.title}
          </h2>
          <p className="text-lg text-[#5a3d31] mb-4">
            {selectedItem.workout.description}
          </p>
          <div className="flex justify-center space-x-4">
            <span className="inline-block bg-[#dbc1a6] text-[#5a3d31] px-4 py-2 rounded-full font-medium">
              Duration: {selectedItem.workout.duration}
            </span>
            <span className="inline-block bg-[#dbc1a6] text-[#5a3d31] px-4 py-2 rounded-full font-medium">
              Level: {selectedItem.workout.level}
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Workout;
