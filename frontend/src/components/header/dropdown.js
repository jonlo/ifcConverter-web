import './dropdown.css';
import React from 'react';

export function Dropdown(props) {

	return (
		<div className="dropdown">
			<span>{props.title}</span>
			<div className="dropdown-content">
				{props.children.map((child, index) => {
					return <p key={index}>{child.id}</p>
				})}
			</div>
		</div>
	);

}