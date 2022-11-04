import './header.css';
import { UploadButton } from './uploadButton';
import { uploadCall, convertCall, downloadCall } from '../../api/apiCalls';
import { Button } from './button';
import React from 'react';

export function Header(props) {
	const [fileName, setFileName] = React.useState("");

	const onUploadFile = (e) => {
		e.preventDefault();
		uploadCall(e.target.files[0])
		setFileName(e.target.files[0].name);
	}

	const onConvert = (e) => {
		e.preventDefault();
		convertCall({ file: fileName, options: [], outputFile: "test.dae" }, (convertResponse) => {
			console.log(convertResponse);
			downloadCall(convertResponse,(file)=>{
				props.onFileLoaded(file);
			});
		});
	}

	return (
		<header className="Header">
			<UploadButton onFileSelected={onUploadFile}></UploadButton>
			<Button text="Convert" onClick={onConvert}></Button>
		</header>
	);

}