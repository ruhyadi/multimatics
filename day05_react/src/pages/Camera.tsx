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

// const CameraDua: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [photo, setPhoto] = useState<string | null>(null);
//   const [streaming, setStreaming] = useState<boolean>(false);
//   const width = 640;
//   const [height, setHeight] = useState<number>(0);

//   const handleCanPlay = () => {
//     if (!streaming) {
//       const video = videoRef.current;
//       if (video) {
//         const computedHeight = video.videoHeight / (video.videoWidth / width);
//         setHeight(isNaN(computedHeight) ? width / (4 / 3) : computedHeight);

//         video.setAttribute("width", width.toString());
//         video.setAttribute("height", height.toString());
//         canvasRef.current!.setAttribute("width", width.toString());
//         canvasRef.current!.setAttribute("height", height.toString());
//         setStreaming(true);
//       }
//     }
//   };

//   const clearPhoto = () => {
//     const canvas = canvasRef.current;
//     const context = canvas?.getContext("2d");
//     context?.fillStyle = "#AAA";
//     context?.fillRect(0, 0, canvas!.width, canvas!.height);
//     setPhoto(canvas?.toDataURL("image/png"));
//   };

//   const takePicture = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;
//     const context = canvas?.getContext("2d");
//     if (width && height) {
//       canvas?.width = width;
//       canvas?.height = height;
//       context?.drawImage(video!, 0, 0, width, height);

//       const data = canvas?.toDataURL("image/png");
//       setPhoto(data);
//     } else {
//       clearPhoto();
//     }
//   };

//   useEffect(() => {
//     const startCamera = async () => {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({
//           video: true,
//           audio: false,
//         });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           videoRef.current.play();
//         }
//       } catch {
//         console.error("Error accessing the camera");
//       }
//     };

//     startCamera();

//     return () => {
//       if (videoRef.current && videoRef.current.srcObject) {
//         const tracks = videoRef.current.srcObject.getTracks();
//         tracks.forEach((track) => track.stop());
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <h1>Camera Component</h1>
//       <div>
//         <video
//           ref={videoRef}
//           onCanPlay={handleCanPlay}
//           style={{ display: streaming ? "block" : "none" }}
//         />
//         <canvas ref={canvasRef} style={{ display: "none" }} />
//       </div>
//       <button onClick={takePicture}>Take Picture</button>
//       {photo && <img src={photo} alt="Captured" />}
//     </div>
//   );
// };

export default Camera;
// export { CameraDua };
