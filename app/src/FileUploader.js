import React from 'react';

const FileUploader = props => {
    // Create a reference to the hidden file input element
    const hiddenFileInput = React.useRef(null);
    
    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file 
    const handleChange = event => {
        const fileUploaded = event.target.files[0];
        // props.handleFile(fileUploaded);
    };

    // const handleFile(fileUploaded) {
        
    // }

    return (
        <>
            <button onClick={handleClick}>
                Upload a file
            </button>
            <input
                type = "file"
                accept = ".json"
                ref = {hiddenFileInput}
                onChange = {handleChange}
                style = {{display: 'none'}}
            />
        </>
    );
}

export default FileUploader;