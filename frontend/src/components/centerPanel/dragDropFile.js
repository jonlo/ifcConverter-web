import React from "react";
import './dragDropFile.css';

// drag drop file component
export function DragDropFile(props) {
    // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);

    // handle drag events
    const handleDrag = function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };


    const previewEnabled = () => {
        if (props.convertTo.id === "obj" || props.convertTo.id === "dae" || props.convertTo.id === "glb") {
            return true;
        }
    }

    // triggers when file is dropped
    const handleDrop = function (e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            props.onFileSelected(e.dataTransfer.files[0]);
            // handleFiles(e.dataTransfer.files);
        }
    };

    // triggers when file is selected with click
    const handleChange = function (e) {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            props.onFileSelected(e.target.files[0]);
            // handleFiles(e.target.files);
        }
    };

    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };

    return (
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
            <input ref={inputRef} type="file" id="input-file-upload" multiple={false} onChange={handleChange} accept=".ifc" />
            <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
                <div>
                    {!previewEnabled() && <p>3d preview not avaiable</p>}
                    <p>Drag and drop your <b>.IFC</b> file here</p>
                    <img src={process.env.PUBLIC_URL + '/ifclogo.png'} className="form-file-logo" alt="logo"></img>
                    <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
                </div>
            </label>
            {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
        </form>
    );
};