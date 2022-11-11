import './footer.css';
import React from 'react';
import { Button } from '../button';

export function Footer(props) {

	return (
		<footer>
			<Button text="Convert" onClick={props.convertIfc} visible={props.isFileLoaded}></Button>
		</footer>
	);

}