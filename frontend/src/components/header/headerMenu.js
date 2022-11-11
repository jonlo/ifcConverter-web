import { Button } from './button';
import { Dropdown } from './dropdown';
import options from './options.json';
import convertions from './convertions.json';

export function HeaderMenu(props) {
    return (

        <div className="HeaderMenu">
            <Dropdown title="Options" children={options} multiSelection={true}></Dropdown>
            <Dropdown title="Convert to" children={convertions} multiSelection={false}></Dropdown>
            <Button text="Convert" onClick={props.convertIfc}></Button>
        </div>
    );

}