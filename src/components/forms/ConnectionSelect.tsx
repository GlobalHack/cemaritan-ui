import React from "react";
import { Form } from "react-bootstrap";

import { useConnectionOptions } from "../../hooks";
import { Connection } from "../../types";

interface ConnectionSelectProps {
  label: string;
  value: string;
  updateValue: (newValue: string) => void;
}

const ConnectionSelect = ({
  label,
  value,
  updateValue,
}: ConnectionSelectProps) => {
  const connectionOptions: Connection[] = useConnectionOptions();

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
        {connectionOptions.map((source) => (
          <option key={`source-option-${source.uid}`} value={source.uid}>
            {source.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};

export default ConnectionSelect;
