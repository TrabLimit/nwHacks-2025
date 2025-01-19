import { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { toast } from "@/components/ui/use-toast";

const PoseDetection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [repCount, setRepCount] = useState(0);

  useEffect(() => {
    let detector: poseDetection.PoseDetector;
    let animationFrameId: number;

    const initPoseDetection = async () => {
      try {
        await tf.ready();
        const model = poseDetection.SupportedModels.MoveNet;
        detector = await poseDetection.createDetector(model);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadeddata = () => {
              setIsLoading(false);
              detectPose();
            };
          }
        }
      } catch (error) {
        console.error("Error initializing pose detection:", error);
        toast({
          title: "Error",
          description:
            "Failed to initialize pose detection. Please check your camera permissions.",
          variant: "destructive",
        });
      }
    };

    const detectPose = async () => {
      if (!detector || !videoRef.current || !canvasRef.current) return;
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const poses = await detector.estimatePoses(video);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      poses.forEach((pose) => {
        drawKeypoints(ctx, pose.keypoints);
        drawSkeleton(ctx, pose.keypoints);
      });
      animationFrameId = requestAnimationFrame(detectPose);
    };

    const drawKeypoints = (
      ctx: CanvasRenderingContext2D,
      keypoints: poseDetection.Keypoint[]
    ) => {
      keypoints.forEach((keypoint) => {
        if (keypoint.score && keypoint.score > 0.3) {
          const { x, y } = keypoint;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, 2 * Math.PI);
          ctx.fillStyle = "#5e5b99"; // Lilac blue for keypoints
          ctx.fill();
        }
      });
    };

    const drawSkeleton = (
      ctx: CanvasRenderingContext2D,
      keypoints: poseDetection.Keypoint[]
    ) => {
      const connections = [
        ["nose", "left_eye"],
        ["nose", "right_eye"],
        ["left_eye", "left_ear"],
        ["right_eye", "right_ear"],
        ["left_shoulder", "right_shoulder"],
        ["left_shoulder", "left_elbow"],
        ["right_shoulder", "right_elbow"],
        ["left_elbow", "left_wrist"],
        ["right_elbow", "right_wrist"],
        ["left_shoulder", "left_hip"],
        ["right_shoulder", "right_hip"],
        ["left_hip", "right_hip"],
        ["left_hip", "left_knee"],
        ["right_hip", "right_knee"],
        ["left_knee", "left_ankle"],
        ["right_knee", "right_ankle"],
      ];
      connections.forEach(([p1, p2]) => {
        const point1 = keypoints.find((kp) => kp.name === p1);
        const point2 = keypoints.find((kp) => kp.name === p2);
        if (
          point1 &&
          point2 &&
          point1.score &&
          point2.score &&
          point1.score > 0.3 &&
          point2.score > 0.3
        ) {
          ctx.beginPath();
          ctx.moveTo(point1.x, point1.y);
          ctx.lineTo(point2.x, point2.y);
          ctx.strokeStyle = "#7b7ab8"; // Softer lilac blue for skeleton
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    };

    initPoseDetection();

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#e0e6f8]/80 rounded-lg animate-fade-up">
          <div className="text-lg font-semibold text-[#5e5b99]">
            Initializing Camera...
          </div>
        </div>
      )}
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg border border-[#cbd4f4]">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute inset-0 h-full object-cover"
        />
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full"
          width={640}
          height={480}
        />
      </div>
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md animate-fade-up">
        <div className="text-center">
          <span className="text-sm font-medium text-[#7b7ab8]">Reps</span>
          <div className="text-3xl font-bold text-[#5e5b99]">{repCount}</div>
        </div>
      </div>
    </div>
  );
};

export default PoseDetection;
