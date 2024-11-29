import React, { useRef, useState, useEffect } from "react";

const Camera: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
      }
    };

    getUserMedia();
  }, []);

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        const image = canvasRef.current.toDataURL("image/png");
        setImageSrc(image);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Camera</h1>
      <video ref={videoRef} autoPlay className="border rounded mb-4"></video>
      <button
        onClick={capture}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Capture
      </button>
      <canvas ref={canvasRef} className="hidden"></canvas>
      {imageSrc && (
        <div>
          <h2 className="text-xl font-bold mb-2">Captured Image:</h2>
          <img src={imageSrc} alt="Captured" className="border rounded" />
        </div>
      )}
    </div>
  );
};

export default Camera;
