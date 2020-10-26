import React from "react";
import { Form } from "react-bootstrap";

import { useMappings } from "../../hooks";

interface MappingSelectProps {
  label: string;
  value: string;
  updateValue: (newValue: string) => void;
}

const MappingSelect = ({ label, value, updateValue }: MappingSelectProps) => {
  const { mappings: mappingOptions } = useMappings();

  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        custom
        value={value}
        onChange={(e) => updateValue(e.target.value)}
      >
        <option value=""></option>
        {mappingOptions.map((mapping) => (
          <option key={`mapping-option-${mapping.uid}`} value={mapping.uid}>
            {mapping.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default MappingSelect;
