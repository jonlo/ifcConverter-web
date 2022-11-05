import './centerPanel.css';
import { UploadButton } from './uploadButton';
import { uploadCall, convertCall, downloadCall } from '../../api/apiCalls';
import { Button } from './button';
import React from 'react';

export function CenterPanel(props) {
	const [fileName, setFileName] = React.useState("");
	const [file, setFile] = React.useState(null);

	const setFileData = (e) => {
		setFile(e.target.files[0])
		setFileName(e.target.files[0].name);
	}

	const convertIfc = async (e) => {
		await uploadCall(file);
		const convertResponse = await convertCall({ file: fileName, options: [], outputFile: "test.dae" });
		const downloadedFile = await downloadCall(convertResponse);
		props.onFileLoaded(downloadedFile);
	}

	return (
		<div className="Center-panel">
			<UploadButton onFileSelected={setFileData}></UploadButton>
			<Button text="Convert" onClick={convertIfc}></Button>
		</div>
	);

}