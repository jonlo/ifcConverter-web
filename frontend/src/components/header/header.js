import './header.css';
import { HeaderMenu } from './headerMenu';
import React from 'react';

export function Header(props) {

	return (
		<header>
			<label>IFC geometry converter</label>
			<HeaderMenu convertIfc={props.convertIfc} onItemsUpdated={props.onItemsUpdated}></HeaderMenu>
		</header>
	);

}