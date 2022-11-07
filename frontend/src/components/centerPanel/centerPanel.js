import './centerPanel.css';
import { DragDropFile } from './dragDropFile';
import { uploadCall, convertCall, downloadCall } from '../../api/apiCalls';
import { Button } from './button';
import React from 'react';

export function CenterPanel(props) {
	const [fileName, setFileName] = React.useState("");
	const [file, setFile] = React.useState(null);

	const setFileData = (selectedFile) => {
		setFile(selectedFile)
		setFileName(selectedFile.name);
	}

	const convertIfc = async (e) => {
		await uploadCall(file);
		const convertResponse = await convertCall({ file: fileName, options: [], outputFile: "test.dae" });
		const downloadedFile = await downloadCall(convertResponse);
		props.onFileLoaded(downloadedFile);
	}

	if(!props.showCenterPanel){
		return (
			<div className="Center-panel">
				<Button text="Convert" onClick={convertIfc}></Button>
				<DragDropFile onFileSelected={setFileData}></DragDropFile>
			</div>
		);
	}

}