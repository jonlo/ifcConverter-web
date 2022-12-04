import './centerPanel.css';
import { DragDropFile } from './dragDropFile';
import React from 'react';

export function CenterPanel(props) {
	if (props.showPanel) {
		return (
			<div className="Center-panel">
				<DragDropFile convertTo={props.convertTo} onFileSelected={props.setFileData}></DragDropFile>
			</div>
		);
	}
}