import React from 'react';
import P5Wrapper from './P5Wrapper';
import p5 from 'p5';
import breakoutSketch from './breakoutSketch';

function App() {
  return (
    <div className="App">
      <P5Wrapper sketch={breakoutSketch} />
    </div>
  );
}

export default App;
