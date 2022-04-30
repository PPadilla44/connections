import React, { useState } from 'react'
import Layout from '../components/Layout';


export default function LevelCreator({isLoggedIn}) {
  const [dots, setDots] = useState({})
  const [i, setI] = useState(1)

  const clickHandler = (e) => {
    let temp = dots;
    temp[i] = { x: e.pageX, y: e.pageY }
    setDots(temp)
    setI(++i)
  }

  const undo = () => {
    let toRemove = i - 1
    let temp = dots;
    delete temp[toRemove]
    console.log(temp)
    if (i > 1) {
      setI(--i)
    }
    setDots(temp)

  }

  return (
    <Layout title='Level Creator' isLoggedIn={isLoggedIn}>
      <div className="bg-blue-200 h-screen flex relative">
        <div onClick={clickHandler} className="bg-orange-200 h-[645px] w-[1200px]"></div>
        {Object.entries(dots).map((p) => (
          <button
            key={p[0]}
            id={p[0]}
            className={`active:bg-red-600 z-20 bg-black h-4 w-4 absolute rounded-full`}
            style={{ left: p[1].x, top: p[1].y }}>
            <span className="absolute top-3">{p[0]}</span>
          </button>
        ))}
        <button onClick={undo}>UNDO</button>
      </div>
    </Layout>
  )
}


export const getServerSideProps = async (context) => {
  const cookies = context.req.cookies;

  return {
    props: {
      isLoggedIn : cookies.userInfo ? true : false
    },
  };
};

