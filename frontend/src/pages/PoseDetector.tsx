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
    <div className="min-h-screen bg-gradient-to-r from-[#e0e6f8] to-[#cbd4f4] flex flex-col items-center relative">
      <Navigation />
      <main className="container mx-auto pt-36 page-transition space-y-12">
        <div className="space-y-6 text-center">
          <h1 className="text-4xl font-extrabold text-[#5e5b99] tracking-tighter">
            Pose Detection
          </h1>
          <div
            className="mx-auto bg-transparent rounded-lg overflow-hidden"
            style={{ maxWidth: "640px" }}
          >
            <PoseDetection desiredExercises={id ? workouts[id]["exercises"] : ["T-pose", "Squat pose"]} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xl mx-auto">
          <h2 className="text-3xl font-bold text-[#5e5b99] mb-4">
            Pose Detection
          </h2>
          <p className="text-lg text-[#7b7ab8] mb-4">
            Make sure your browser has access to your camera!
          </p>
        </div>
      </main>
    </div>
  );
};

export default PoseDetector;
