import { useRef, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { toast } from "@/components/ui/use-toast";

const PoseDetection = ({ desiredExercises }: { desiredExercises?: string[] }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let detector: poseDetection.PoseDetector;
  let animationFrameId: number;

  const [isLoading, setIsLoading] = useState(true);
  const [repCount, setRepCount] = useState(0);
  const [lastUpdateTime, setLastUpdateTime] = useState<number>(0);
  let activePoseDesired: boolean = true;

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

  // Async function for recognizing different poses
  const detectPose = async () => {
    if (!detector || !videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const poses = await detector.estimatePoses(video).catch((error) => {});

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    if (poses) {
      poses.forEach((pose) => {
        drawKeypoints(ctx, pose.keypoints);
        drawSkeleton(ctx, pose.keypoints);
  
        const updateRepCount = (poseName: string) => {
          const currentTime = Date.now();
          // 0.5 second buffer time between valid reps, to prevent false positives for detection of the neutral pose
          if (currentTime - lastUpdateTime < 500) return;
  
          if (desiredExercises.includes(poseName) || desiredExercises === undefined) {
            setRepCount((prevCount) => prevCount + 1);
            setLastUpdateTime(currentTime);
            activePoseDesired = false;
          }
        };
  
        if (activePoseDesired && isTPose(pose.keypoints)) {
          updateRepCount("T-pose");
          console.log("T-pose detected!");
        }
  
        if (activePoseDesired && isSquatPose(pose.keypoints)) {
          updateRepCount("Squat pose");
          console.log("Squat pose detected!");
        }
  
        if (activePoseDesired && isLungePose(pose.keypoints)) {
          updateRepCount("Lunge pose");
          console.log("Lunge pose detected!");
        }
  
        if (activePoseDesired && isRaisedLegPose(pose.keypoints)) {
          updateRepCount("Raised leg pose");
          console.log("Raised leg pose detected!");
        }
  
        if (!activePoseDesired && isNeutralPose(pose.keypoints)) {
          activePoseDesired = true;
          console.log("Neutral pose detected!");
        }
      });
    }
    animationFrameId = requestAnimationFrame(detectPose);
  };

  const drawKeypoints = (ctx: CanvasRenderingContext2D, keypoints: poseDetection.Keypoint[]) => {
    keypoints.forEach((keypoint) => {
      if (keypoint.score && keypoint.score > 0.3) {
        const { x, y } = keypoint;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = "#2DD4BF";
        ctx.fill();
      }
    });
  };

  const drawSkeleton = (ctx: CanvasRenderingContext2D, keypoints: poseDetection.Keypoint[]) => {
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
      if (point1 && point2 && point1.score && point2.score && point1.score > 0.3 && point2.score > 0.3) {
        ctx.beginPath();
        ctx.moveTo(point1.x, point1.y);
        ctx.lineTo(point2.x, point2.y);
        ctx.strokeStyle = "#2DD4BF";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  };

  const isTPose = (keypoints: poseDetection.Keypoint[]) => {
    const leftShoulder = keypoints.find((kp) => kp.name === "left_shoulder");
    const rightShoulder = keypoints.find((kp) => kp.name === "right_shoulder");
    const leftWrist = keypoints.find((kp) => kp.name === "left_wrist");
    const rightWrist = keypoints.find((kp) => kp.name === "right_wrist");

    if (leftShoulder && rightShoulder && leftWrist && rightWrist) {
      const shoulderDistance = Math.abs(leftShoulder.x - rightShoulder.x);
      const leftArmHorizontal = Math.abs(leftShoulder.y - leftWrist.y) < shoulderDistance * 0.2;
      const rightArmHorizontal = Math.abs(rightShoulder.y - rightWrist.y) < shoulderDistance * 0.2;

      return leftArmHorizontal && rightArmHorizontal;
    }
    return false;
  };

  const isSquatPose = (keypoints: poseDetection.Keypoint[]) => {
    const leftHip = keypoints.find((kp) => kp.name === "left_hip");
    const rightHip = keypoints.find((kp) => kp.name === "right_hip");
    const leftKnee = keypoints.find((kp) => kp.name === "left_knee");
    const rightKnee = keypoints.find((kp) => kp.name === "right_knee");

    if (leftHip && rightHip && leftKnee && rightKnee) {
      const hipsLowerThanKnees = leftHip.y > leftKnee.y && rightHip.y > rightKnee.y;
      const kneesBent = Math.abs(leftHip.x - leftKnee.x) < Math.abs(leftHip.y - leftKnee.y) && Math.abs(rightHip.x - rightKnee.x) < Math.abs(rightHip.y - rightKnee.y);

      return hipsLowerThanKnees && kneesBent;
    }
    return false;
  };

  const isLungePose = (keypoints: poseDetection.Keypoint[]) => {
    const leftKnee = keypoints.find(point => point.name === 'left_knee');
    const rightKnee = keypoints.find(point => point.name === 'right_knee');
    const leftHip = keypoints.find(point => point.name === 'left_hip');
    const rightHip = keypoints.find(point => point.name === 'right_hip');

    if (leftKnee && rightKnee && leftHip && rightHip) {
      const oneLegBent = Math.abs(leftKnee.y - leftHip.y) < 20 || Math.abs(rightKnee.y - rightHip.y) < 20;
      const otherLegExtended = Math.abs(leftKnee.y - leftHip.y) > 100 || Math.abs(rightKnee.y - rightHip.y) > 100;

      return oneLegBent && otherLegExtended;
    }
    return false;
  };

  const isRaisedLegPose = (keypoints) => {
    const leftHip = keypoints.find(point => point.name === 'left_hip');
    const rightHip = keypoints.find(point => point.name === 'right_hip');
    const leftKnee = keypoints.find(point => point.name === 'left_knee');
    const rightKnee = keypoints.find(point => point.name === 'right_knee');
    const leftAnkle = keypoints.find(point => point.name === 'left_ankle');
    const rightAnkle = keypoints.find(point => point.name === 'right_ankle');

    if (!leftHip || !rightHip || !leftKnee || !rightKnee || !leftAnkle || !rightAnkle) {
      return false;
    }

    const isLeftLegRaised = leftKnee.y < leftHip.y && leftAnkle.y < leftHip.y;
    const isRightLegRaised = rightKnee.y < rightHip.y && rightAnkle.y < rightHip.y;

    return isLeftLegRaised || isRightLegRaised;
  };

  const isNeutralPose = (keypoints: poseDetection.Keypoint[]) => {
    const leftShoulder = keypoints.find((point) => point.name === "left_shoulder");
    const rightShoulder = keypoints.find((point) => point.name === "right_shoulder");
    const leftElbow = keypoints.find((point) => point.name === "left_elbow");
    const rightElbow = keypoints.find((point) => point.name === "right_elbow");
    const leftWrist = keypoints.find((point) => point.name === "left_wrist");
    const rightWrist = keypoints.find((point) => point.name === "right_wrist");
    const leftHip = keypoints.find((point) => point.name === "left_hip");
    const rightHip = keypoints.find((point) => point.name === "right_hip");

    if (leftShoulder && rightShoulder && leftElbow && rightElbow && leftWrist && rightWrist && leftHip && rightHip) {
      const armsRelaxed = leftWrist.y > leftElbow.y && rightWrist.y > rightElbow.y;
      const standingStraight = Math.abs(leftShoulder.y - rightShoulder.y) < 20 && Math.abs(leftHip.y - rightHip.y) < 20;

      return armsRelaxed && standingStraight;
    }
    return false;
  };

  useEffect(() => {
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

  const startWorkout = async () => {
    setIsLoading(true);

    // Initialize or resume the camera and pose detector
    if (videoRef.current) {
      videoRef.current.play();
    } else {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    }
    await initPoseDetection();

    setIsLoading(false);
    await detectPose();
  };

  const stopWorkout = () => {
    // Cancel the animation frame
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    // Pause the video
    if (videoRef.current) {
      videoRef.current.pause();
    }    
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary/80 rounded-lg animate-fade-up">
          <div className="text-lg font-semibold text-secondary-foreground">
            Initializing Camera...
          </div>
        </div>
      )}
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
        <video ref={videoRef} autoPlay playsInline className="absolute inset-0 h-full object-cover" />
        <canvas ref={canvasRef} className="absolute inset-0 h-full" width={640} height={480} />
      </div>
      <div className="mt-4 p-4 bg-white rounded-lg shadow-md animate-fade-up">
        <div className="text-center">
          <span className="text-sm font-medium text-gray-500">Reps</span>
          <div className="text-3xl font-bold text-primary">{repCount}</div>
          <div className="mt-4 flex justify-center space-x-4">
            <button
              onClick={() => startWorkout()}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 z-10"
            >
              Start Workout
            </button>
            <button
              onClick={() => stopWorkout()}
              className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 z-10"
            >
              Stop Workout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoseDetection;
