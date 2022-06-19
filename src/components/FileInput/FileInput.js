import React, {useEffect} from "react";
import { FileDrop } from "react-file-drop";
import { Button, Icon } from "semantic-ui-react";
import "./FileInput.css";

export const FileInput = ({onFileChange}) => {
  const [file, setFile] = React.useState(null);
  const [isHovering, setIsHovering] = React.useState(false);
  const fileInputRef = React.useRef(null);

  useEffect(() => {
    onFileChange(file);
  }, [file])
  

  const onFileInputChange = (event) => {
    const { files } = event.target;
    setFile(files[0]);
  };

  const onTargetClick = () => {
    fileInputRef.current.click();
  };

  const styles = {
    border: "2px dashed black",
    borderRadius: ".28571429rem",
    width: "100%",
    color: "black",
  };
  return (
    <div
      style={{
        marginBottom: "20px",
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {file ? (
        <Button icon labelPosition="left" onClick={() => setFile(null)}>
          <Icon name={isHovering ? "remove" : "file"} />
          {file.name}
        </Button>
      ) : (
        <div style={styles}>
          <FileDrop
            onTargetClick={onTargetClick}
            onDrop={(files, event) => {
              event.preventDefault();
              setFile(files[0]);
            }}
          >
            Drop your NFT here!
          </FileDrop>
        </div>
      )}
      <input
        onChange={onFileInputChange}
        ref={fileInputRef}
        type="file"
        style={{ display: "none", width: 0 }}
      />
    </div>
  );
};
