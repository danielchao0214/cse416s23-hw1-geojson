import React from "react";

const FileUploader = () => {
    const showFile = (e) => {
        e.preventDefault();
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            let map = JSON.parse(text);
            console.log(text);
            console.log(map);
        };
        reader.readAsText(e.target.files[0]);
    };

    return (
        <div>
            <input type="file" onChange={showFile} />
        </div>
    );
}

export default FileUploader