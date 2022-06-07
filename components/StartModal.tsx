import React from "react";

interface StartModalProps {
  handleClick: () => void;
}

const StartModal: React.FC<StartModalProps> = ({ handleClick }) => {
  return (
    <>
      <button
        onClick={handleClick}
        className="bg-black z-20 rounded-md p-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <h1 className="text-dom">START</h1>
      </button>
      <div className="bg-black/60 z-10 w-screen h-screen fixed left-0 top-0 blur-sm" />
    </>
  );
};

export default StartModal;
