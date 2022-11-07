import {Button} from './button';
export function HeaderMenu(props) {
    return (

        <div className="HeaderMenu">
            <select name="lenguajes" id="lang">
                <option value="javascript">JavaScript</option>
                <option value="php">PHP</option>
                <option value="java">Java</option>
                <option value="golang">Golang</option>
                <option value="python">Python</option>
                <option value="c#">C#</option>
                <option value="C++">C++</option>
                <option value="erlang">Erlang</option>
            </select>
            <select name="cars" id="cars" multiple>
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option>
            </select>
            <Button text="Convert" onClick={props.convertIfc}></Button>
        </div>
    );

}