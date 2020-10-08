import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import useStoreState from "../../hooks/useStoreState";

import ConnectionSelect from "./ConnectionSelect";
import MappingSelect from "./MappingSelect";
import { UploadTransferData } from "../../types";

interface UploadTransferFormProps {
  onSubmit: (data: UploadTransferData) => any;
}

const UploadTransferForm = ({ onSubmit }: UploadTransferFormProps) => {
  const { user } = useStoreState();

  const [sourceFile, setSourceFile] = useState<string>("");
  const [sourceMappingUID, setSourceMappingUID] = useState<string>("");
  const [destinationUID, setDestinationUID] = useState<string>("");
  const [destinationMappingUID, setDestinationMappingUID] = useState<string>(
    ""
  );

  const isValid =
    sourceFile && sourceMappingUID && destinationUID && destinationMappingUID;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // convert data types
    const data = {
      location: sourceFile,
      source_mapping_uid: parseInt(sourceMappingUID),
      destination_uid: parseInt(destinationUID),
      destination_mapping_uid: parseInt(destinationMappingUID),
      organization: user.organization,
      created_by: user.uid,
    };
    onSubmit(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.File id="source-file-input" label="Choose File">
        <Form.File.Input
          onChange={(e: any) => {
            console.log(e.target.value);
            // e.target.files[0]
            setSourceFile(e.target.value);
          }}
        />
      </Form.File>
      <MappingSelect
        label="Source Mapping"
        value={sourceMappingUID}
        updateValue={setSourceMappingUID}
      />
      <ConnectionSelect
        label="Destination"
        value={destinationUID}
        updateValue={setDestinationUID}
      />
      <MappingSelect
        label="Destination Mapping"
        value={destinationMappingUID}
        updateValue={setDestinationMappingUID}
      />

      <Button type="submit" disabled={!isValid}>
        Submit
      </Button>
    </Form>
  );
};

export default UploadTransferForm;
