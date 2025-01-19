import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import Categories from "./pages/Categories";
import Workout from "./pages/Workout";
import WorkoutDetail from "./pages/WorkoutDetail";
import PoseDetector from "./pages/PoseDetector";
import { createContext } from "react";

const queryClient = new QueryClient();
const WorkoutContext = createContext(null);
const SERVER_URI = "http://localhost:3001";
const initialState = await fetch(`${SERVER_URI}/api/workouts`).then((res) => res.json());

const App = () => (
  <QueryClientProvider client={queryClient}>
    <WorkoutContext.Provider value={initialState}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/workout" element={<Workout />} />
            <Route path="/workout/:id" element={<WorkoutDetail />} />
            <Route path="/pose-detector" element={<PoseDetector />} />
            <Route path="/pose-detector/:id" element={<PoseDetector />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </WorkoutContext.Provider>
  </QueryClientProvider>
);

export default App;
export { WorkoutContext };
