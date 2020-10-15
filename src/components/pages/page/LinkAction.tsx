import React from "react";
import { Link, LinkProps } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ILinkAction } from "./types";

type ILinkActionProps = { action: ILinkAction } & LinkProps;

export const LinkAction = React.forwardRef(
  (props: ILinkActionProps, ref: React.Ref<any>) => (
    <Button
      ref={ref}
      to={props.action.linkTo}
      id={props.action.id}
      variant={props.action.variant}
      as={Link}
    >
      {props.action.label}
    </Button>
  )
);
