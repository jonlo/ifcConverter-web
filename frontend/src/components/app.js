import { Scene } from './scene';
import './App.css';
import { Header } from './header/header';
import { CenterPanel } from './centerPanel/centerPanel'
import React from 'react';
import { uploadCall, convertCall, downloadCall } from '../api/apiCalls';

function App() {
  const [convertedFile, setConvertedFile] = React.useState(null);
  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState(null);

  const onFileConverted = (file) => {
    setConvertedFile(file);
  }

  const setFileData = (selectedFile) => {
    setFile(selectedFile)
    setFileName(selectedFile.name);
  }

  const convertIfc = async (e) => {
    await uploadCall(file);
    const convertResponse = await convertCall({ file: fileName, options: [], outputFile: "test.dae" });
    const downloadedFile = await downloadCall(convertResponse);
    onFileConverted(downloadedFile);
  }

  return (
    <div className="App">
      <Header convertIfc={convertIfc}></Header>
      <CenterPanel setFileData={setFileData} showPanel={convertedFile ? false:true} ></CenterPanel>
      <Scene file={convertedFile}></Scene>
    </div>
  );
}

export default App;
