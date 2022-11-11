import './dropdown.css';
import React from 'react';

export function Dropdown(props) {

	const [items, updateItems] = React.useState(props.children);

	const toggleSelected = (element) => {

		const selectedItem = items.find((i) => i.id === element.target.innerHTML);
		selectedItem.selected = !selectedItem.selected;

		if (!props.multiSelection) {
			items.forEach(item => {
				if (selectedItem.id !== item.id) {
					item.selected = false;
				}
			});
		}
		updateItems([...items]);
	};

	return (
		<div className="dropdown">
			<span>{props.title}</span>
			<div className="dropdown-content">
				{items.map((child, index) => {
					return <p key={index} onClick={toggleSelected} data-selected={child.selected}>{child.id}</p>
				})}
			</div>
		</div >
	);

}