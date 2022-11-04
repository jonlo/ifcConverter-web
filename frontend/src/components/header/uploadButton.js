
export const UploadButton = (props) => {
    return (
        <div className="input-div">
            <label>upload IFC</label>
            <input onChange={props.onFileSelected} type="file"></input>
        </div>
    );
};