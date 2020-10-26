import React from "react";
import { Form } from "react-bootstrap";

import { useConnections } from "../../hooks";

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
  const { connections: connectionOptions } = useConnections();

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
