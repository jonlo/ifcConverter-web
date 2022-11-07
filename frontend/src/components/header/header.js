import './header.css';
import { HeaderMenu } from './headerMenu';
import React from 'react';

export function Header(props) {

	return (
		<header>
			<div className="Header">
				<label>IFC geometry converter</label>
				<HeaderMenu convertIfc={props.convertIfc}></HeaderMenu>
			</div>
		</header>
	);

}