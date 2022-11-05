import { Scene } from './scene';
import './App.css';
import { Header } from './header/header';
import { CenterPanel } from './centerPanel/centerPanel'
import React from 'react';

function App() {
  const [file, setFile] = React.useState(null);

  const onFileLoad = (file) => {
    setFile(file);
  }

  return (
    <div className="App">
      <Header ></Header>
      <CenterPanel onFileLoaded={onFileLoad} ></CenterPanel>
      <Scene file={file}></Scene>
    </div>
  );
}

export default App;
