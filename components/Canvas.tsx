import { dots } from "@prisma/client";
import React from "react";
import { line } from "../types";

interface CanvasProps {
  dots: dots[];
  first: dots | null;
  lines: line[];
  connectClick: (dot: dots) => void;
}

const Canvas: React.FC<CanvasProps> = ({
  dots,
  first,
  lines,
  connectClick,
}) => {
  return (
    <div className="bg-white w-[1200px] h-[645px]">
      <svg className="absolute w-full h-full z-10">
        {lines.map((l, i) => (
          <line
            key={l.id}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke="black"
          />
        ))}
        {dots.map((p) => (
          <g key={p.sequence}>
            <circle
              onClick={() => connectClick(p)}
              r={4}
              cx={p.x}
              cy={p.y}
              fill={"black"}
              className={`active:stroke-red-600 active:fill-red-600 cursor-pointer ${
                first && first.sequence === p.sequence
                  ? "stroke-red-600 fill-red-600"
                  : "stroke-black fill-black"
              } z-20  h-4 w-4 absolute rounded-full`}
            />
            <text x={p.x + 10} y={p.y + 5} color="black" className="cursor-default">
              {p.sequence}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default Canvas;
