import { Navigation } from "@/components/Navigation";
import { useContext, useEffect, useState } from "react";
import PoseDetection from "@/components/PoseDetection"; // Assuming PoseDetection is a component
import { useParams } from "react-router-dom";
import { WorkoutContext } from "@/App";

const PoseDetector = () => {
  const [timeLeft, setTimeLeft] = useState(60);
  const { id } = useParams();
  const workouts = useContext(WorkoutContext);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#f0e2d0] to-[#dbc1a6] flex flex-col items-center relative pb-10">
      <Navigation />
      {/*
      <div className="fixed top-4 right-6 bg-[#5a3d31] text-white px-4 py-2 rounded-full font-bold">
        Score: 100
      </div>
      <div className="fixed bottom-4 left-6 bg-[#5a3d31] text-white px-4 py-2 rounded-full font-bold">
        Points: 50
      </div>
      <div className="fixed bottom-4 right-6 bg-[#5a3d31] text-white px-4 py-2 rounded-full font-bold">
        Timer: {timeLeft}s
      </div>
      */}

      <main className="container mx-auto pt-36 page-transition space-y-12">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-extrabold text-[#5a3d31] tracking-tighter">
            Pose Detection
          </h1>
          <div className="mx-auto bg-transparent rounded-lg overflow-hidden" style={{ maxWidth: "640px" }}>
            <PoseDetection desiredExercises={id ? workouts[id]["exercises"] : ["T-pose", "Squat pose"]} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-[#5a3d31] mb-4">
            Pose Detection
          </h2>
          <p className="text-lg text-[#5a3d31] mb-4">
            Make sure your browser has access to your camera!
          </p>
          {/*
          <div className="flex justify-center space-x-4">
            <span className="inline-block bg-[#dbc1a6] text-[#5a3d31] px-4 py-2 rounded-full font-medium">
              Duration: 40 min
            </span>
            <span className="inline-block bg-[#dbc1a6] text-[#5a3d31] px-4 py-2 rounded-full font-medium">
              Level: Intermediate
            </span>
          </div>*/}
        </div>
      </main>
    </div>
  );
};

export default PoseDetector;
