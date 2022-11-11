import './headerMenu.css';
import { Dropdown } from './dropdown';
import options from './options.json';
import convertions from './convertions.json';
import React from 'react';

export function HeaderMenu(props) {
    const [convertTitle, updateTitle] = React.useState("Convert to");

    const onItemsUpdated = (id, items) => {
        updateTitle(`Convert to : ${items.find(item => item.selected).id}`);
        props.onItemsUpdated(id, items);
    }
    return (
        <div className="HeaderMenu">
            <Dropdown title="Options" children={options} multiSelection={true} onItemsUpdated ={props.onItemsUpdated}></Dropdown>
            <Dropdown title={convertTitle} children={convertions} multiSelection={false} onItemsUpdated ={onItemsUpdated}></Dropdown>
        </div>
    );
}