import './header.css';
import { UploadButton } from './uploadButton';
import { uploadCall, convertCall, downloadCall } from '../../api/apiCalls';
import { Button } from './button';
import React from 'react';

export function Header(props) {
	const [fileName, setFileName] = React.useState("");
	const [file, setFile] = React.useState(null);

	const onUploadFile = (e) => {
		setFile(e.target.files[0])
		setFileName(e.target.files[0].name);
	}

	const onConvert = async (e) => {
		await uploadCall(file);
		const convertResponse = await convertCall({ file: fileName, options: [], outputFile: "test.dae" });
		const downloadedFile = await downloadCall(convertResponse);
		props.onFileLoaded(downloadedFile);
	}

	return (
		<header className="Header">
			<UploadButton onFileSelected={onUploadFile}></UploadButton>
			<Button text="Convert" onClick={onConvert}></Button>
		</header>
	);

}