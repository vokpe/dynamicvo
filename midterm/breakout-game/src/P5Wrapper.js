import React, { useRef, useEffect, useState } from 'react';
import p5 from 'p5';

const P5Wrapper = ({ sketch }) => {
    const p5Ref = useRef(null);
    let p5Instance = null;
    const [highScore, setHighScore] = useState(0);  // <-- add this line
  
    useEffect(() => {
      p5Instance = new p5(sketch(highScore, setHighScore), p5Ref.current); // <-- pass props here
      return () => {
        if(p5Instance) p5Instance.remove();
      };
    }, [sketch]);
  
    return <div ref={p5Ref} />;
};
  
export default P5Wrapper;
