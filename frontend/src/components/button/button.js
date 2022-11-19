import './button.css';
export const Button = (props) => {
    if (props.visible) {
        return (
            <button onClick={props.onClick} className="button">{props.text} </button>
        );
    }
};