// Library Imports
import React from "react";

// Relative Imports
import { Container, Label, Button } from "./styles";

const FileUpload = ({ onChange, handleClick, keyStoreFile }) => {
  return (
    <Container>
      <Label htmlfor="file-upload">
        {keyStoreFile === ""
          ? `Click here to choose your Keystore`
          : `You uploaded ${keyStoreFile}. Click to change`}
        <Button
          id="file-upload"
          onClick={handleClick}
          type="file"
          onChange={onChange}
        />
      </Label>
    </Container>
  );
};

export default FileUpload;