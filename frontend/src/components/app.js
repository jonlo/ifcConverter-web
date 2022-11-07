import { Scene } from './scene';
import './App.css';
import { Header } from './header/header';
import { CenterPanel } from './centerPanel/centerPanel'
import React from 'react';

function App() {
  const [file, setFile] = React.useState(null);
  const [fileLoaded, setFileLoaded] = React.useState(false);

  const onFileLoad = (file) => {
    setFile(file);
    setFileLoaded(true);
  }

  return (
    <div className="App">
      <Header ></Header>
      <CenterPanel showCenterPanel={fileLoaded} onFileLoaded={onFileLoad} ></CenterPanel>
      <Scene file={file}></Scene>
    </div>
  );
}

export default App;
