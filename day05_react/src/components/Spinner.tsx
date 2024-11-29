import React from "react";

const Spinner: React.FC = () => {
  return (
    // <div className="spinner-border text-primary" role="status">
    //   <span className="visually-hidden">Loading...</span>
    // </div>
    <div className="flex space-x-2 justify-center items-center h-screen">
      <span className="sr-only">Loading ...</span>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.05s]"></div>
    </div>
  );
};

export default Spinner;
