import { useState } from "react"

export default function Home() {

  const [first, setFirst] = useState(null);

  const points = {
    1: { x: 10, y: 10 },
    2: { x: 800, y: 10 },
    3: { x: 800, y: 800 },
    4: { x: 10, y: 800 },
  }

  const win = 3;

  const [lines, setLines] = useState([])

  const connectLine = (firstPoint, secondPoint) => {

    const line = {
      id: `${firstPoint[0]}-${secondPoint[0]}`,
      x1: firstPoint[1].x + 8,
      y1: firstPoint[1].y + 8,
      x2: secondPoint[1].x + 8,
      y2: secondPoint[1].y + 8,
    }

    const tempLines = [...lines, line]
    setLines(tempLines)
    console.log(tempLines.length);
    console.log(win);

    if (tempLines.length === win) {
      console.log("YOU WIN");
      return
    }

  }

  const connectClick = (point) => {

    if (!first) {
      setFirst(point)
    } else {
      let firstNum = parseInt(first[0])
      let potPoint = parseInt(point[0])
      let value = Math.abs(firstNum - potPoint);
      if (value === 1) {

        const valueExist = lines.find(l => l.id === `${first[0]}-${point[0]}` || l.id === `${point[0]}-${first[0]}`);

        if (!valueExist) {
          connectLine(first, point)
        } else {
          console.log("ALREADY exist");
        }


        setFirst(point);
      } else if (value === 0) {
        setFirst(null);
        console.log("REPEAT");
      } else {
        console.log("NOT VFALID");
        setFirst(null)
      }
    }

  }

  return (
    <div className="bg-blue-200 h-screen flex relative">
      {
        Object.entries(points).map((p) => (
          <button
            onClick={() => connectClick(p)} key={p[0]}
            className={`active:bg-red-600 ${first && first[0] === p[0] ? 'bg-red-600' : 'bg-black'} z-20  h-4 w-4 absolute rounded-full`}
            style={{ left: p[1].x, top: p[1].y }}>
            <span className="absolute top-3">{p[0]}</span>
          </button>
        ))
      }
      <svg className="absolute w-full h-full  z-10">

        {
          lines.map((l, i) => (
            <line
              key={l.id}
              x1={l.x1}
              y1={l.y1}
              x2={l.x2}
              y2={l.y2}
              stroke="black"
            />
          ))
        }
      </svg>

    </div>

  )
}

