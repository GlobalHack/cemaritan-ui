import React from "react";
import { ILinkAction, IButtonAction, ActionType } from "./types";
import { ButtonAction } from "./ButtonAction";
import { LinkAction } from "./LinkAction";

interface PageActionProps {
  action: ILinkAction | IButtonAction;
}

export const PageAction = ({ action }: PageActionProps) => {
  switch (action.actionType) {
    case ActionType.link:
      return <LinkAction to={action.linkTo} action={action} />;
    case ActionType.button:
      return <ButtonAction action={action} />;
    default:
      console.log("no page action type exists for action:", action);
      return <></>;
  }
};
