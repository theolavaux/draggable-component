import React, { FC } from 'react';
import './App.scss';
import Draggable from './components/Draggable/Draggable';

const App: FC = () => {
  return (
    <div className="App">
      <Draggable />
    </div>
  );
};

export default App;
