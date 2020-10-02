import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import useStoreState from "../../hooks/useStoreState";

import ConnectionSelect from "./ConnectionSelect";
import MappingSelect from "./MappingSelect";
import { Active, Frequency, TransferData } from "../../types";

interface TransferFormProps {
  initialValues?: TransferData;
  onSubmit: (data: TransferData) => any;
}

const TransferForm = ({ initialValues, onSubmit }: TransferFormProps) => {
  const { user } = useStoreState();

  const init = {
    name: initialValues?.name || "",
    source_uid: initialValues?.source_uid.toString() || "",
    source_mapping_uid: initialValues?.source_mapping_uid.toString() || "",
    destination_uid: initialValues?.destination_uid.toString() || "",
    destination_mapping_uid: initialValues?.source_mapping_uid.toString() || "",
    start_datetime: initialValues?.start_datetime
      ? new Date(initialValues.start_datetime)
      : new Date(),
    frequency: initialValues?.frequency || "Week",
    active: initialValues?.active || "FALSE",
  };

  const [name, setName] = useState<string>(init.name);
  const [sourceUID, setSourceUID] = useState<string>(init.source_uid);
  const [sourceMappingUID, setSourceMappingUID] = useState<string>(
    init.source_mapping_uid
  );
  const [destinationUID, setDestinationUID] = useState<string>(
    init.destination_uid
  );
  const [destinationMappingUID, setDestinationMappingUID] = useState<string>(
    init.destination_mapping_uid
  );
  const [startDatetime, setStartDatetime] = useState<Date>(init.start_datetime);
  const [frequency, setFrequency] = useState<Frequency>(init.frequency);
  const [active, setActive] = useState<Active>(init.active);

  const isValid =
    name &&
    sourceUID &&
    sourceMappingUID &&
    destinationUID &&
    destinationMappingUID &&
    startDatetime &&
    frequency;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    // convert data types
    const data: TransferData = {
      name: name,
      source_uid: parseInt(sourceUID),
      source_mapping_uid: parseInt(sourceMappingUID),
      destination_uid: parseInt(destinationUID),
      destination_mapping_uid: parseInt(destinationMappingUID),
      start_datetime: startDatetime.toUTCString(),
      frequency: frequency,
      active: active === "TRUE" ? "TRUE" : "FALSE",
      organization: user.organization,
      created_by: user.uid,
    };
    onSubmit(data);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>
      <ConnectionSelect
        label="Source"
        value={sourceUID}
        updateValue={setSourceUID}
      />
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

      <Form.Group>
        <Form.Label>Start Date and Time</Form.Label>
        <div>
          <DatePicker
            showTimeSelect
            selected={startDatetime}
            dateFormat="MM/dd/yyyy hh:mm a"
            onChange={(date: Date) => setStartDatetime(date)}
          />
        </div>
      </Form.Group>

      <Form.Group>
        <Form.Label>Frequency</Form.Label>
        <Form.Control
          as="select"
          custom
          value={frequency}
          onChange={(e) => {
            const value = e.target.value as Frequency;
            setFrequency(value);
          }}
        >
          <option value="5 Minute">5 Minute</option>
          <option value="Hour">Hour</option>
          <option value="Day">Day</option>
        </Form.Control>
      </Form.Group>

      <Form.Switch
        id="active"
        label="Active"
        checked={active === "TRUE"}
        onChange={() => {
          const newValue = active === "TRUE" ? "FALSE" : "TRUE";
          setActive(newValue);
        }}
      />

      <Button type="submit" disabled={!isValid}>
        Submit
      </Button>
    </Form>
  );
};

export default TransferForm;
