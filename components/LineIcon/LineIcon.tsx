import React from "react";

const LineIcon = () => {
  return (
    <svg width={36} height={36}>
      <circle cx={6} cy={30} r={4} stroke="white" fill="white" />
      <line x1={6} x2={30} y1={30} y2={6} stroke="white" />
      <circle cx={30} cy={6} r={4} stroke="white" fill="white" />
    </svg>
  );
};

export default LineIcon;
