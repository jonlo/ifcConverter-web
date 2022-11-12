import './footer.css';
import React from 'react';
import { Button } from '../button';

export function Footer(props) {
	if (props.visible) {
		if (props.mode === "convert") {
			return (
				<footer>
					<Button text="Convert" onClick={props.convertIfc} visible={true}></Button>
				</footer>
			);
		} else {
			return (
				<footer>
					<Button text="Upload new" onClick={props.reset} visible={true}></Button>
				</footer>
			);
		}
	}


}