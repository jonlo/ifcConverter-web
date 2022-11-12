import { Scene } from './scene';
import './App.css';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { CenterPanel } from './centerPanel/centerPanel'
import { LoadingScreen } from './centerPanel/loadingScreen'
import React from 'react';
import { uploadCall, convertCall, downloadCall } from '../api/apiCalls';

function App() {
  const [convertedFile, setConvertedFile] = React.useState(null);
  const [fileName, setFileName] = React.useState("");
  const [file, setFile] = React.useState(null);
  const [options, updateOptions] = React.useState([]);
  const [convertTo, updateConvertTo] = React.useState("dae");
  const [converting, setConvertIng] = React.useState(false);

  const onFileConverted = (file) => {
    setConvertedFile(file);
  }

  const setFileData = (selectedFile) => {
    setFile(selectedFile)
    setFileName(selectedFile.name);
  }

  const convertIfc = async (e) => {
    setConvertIng(true);
    await uploadCall(file);
    const convertResponse = await convertCall({ file: fileName, options: options, outputFile: `${fileName.split('.')[0]}.${convertTo.id}` });
    const downloadedFile = await downloadCall(convertResponse);
    onFileConverted(downloadedFile);
    setConvertIng(false);
  }

  const setUpdatedItems = (id, items) => {
    if (id === "Options") {
      items = items.filter(item => item.selected);
      updateOptions(items);
    } else {
      updateConvertTo(items.find(item => item.selected));
    }

  }

  const reset = () => {
    setFile(null);
    setFileName("");
    setConvertedFile(null);
  }

  return (
    <div className="App">
      <Header convertIfc={convertIfc} onItemsUpdated={setUpdatedItems} ></Header>
      <CenterPanel setFileData={setFileData} showPanel={convertedFile || converting ? false : true} ></CenterPanel>
      <LoadingScreen visible={converting}> </LoadingScreen>
      <Scene file={convertedFile}></Scene>
      <Footer convertIfc={convertIfc} visible={(file !== null || convertedFile )&& !converting} mode={convertedFile ? 'reset' : 'convert'} reset={reset}></Footer>

    </div>
  );
}

export default App;
// 