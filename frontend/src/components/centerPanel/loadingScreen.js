import './loadingScreen.css';
import React from 'react';

export function LoadingScreen(props) {
	if(props.visible){
		return (
			<div className="LoadingScreen">
				<div className="loader">Loading...</div>
			</div>
		);
	}
}