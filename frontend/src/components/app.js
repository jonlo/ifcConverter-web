import { Scene } from './scene';
import './App.css';
import { Header } from './header/header';
import React from 'react';

function App() {
  const [file, setFile] = React.useState(null);

  const onFileLoad = (file) => {
    setFile(file);
  }

  return (
    <div className="App">
      <Header onFileLoaded={onFileLoad} ></Header>
      <Scene file={file}></Scene>
    </div>
  );
}

export default App;
