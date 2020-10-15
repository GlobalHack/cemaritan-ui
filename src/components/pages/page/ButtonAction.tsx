import React from "react";
import { Button } from "react-bootstrap";
import { IButtonAction } from "./types";

export const ButtonAction = ({ action }: { action: IButtonAction }) => (
  <Button id={action.id} variant={action.variant} onClick={action.onClick}>
    {action.label}
  </Button>
);
