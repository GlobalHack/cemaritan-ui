export enum ActionType {
  link,
  button,
}

type IAction = {
  actionType: ActionType;
  id: string;
  label: string;
  variant: string;
  disabled?: boolean;
};

export type ILinkAction = IAction & {
  actionType: ActionType.link;
  linkTo: string;
};

export type IButtonAction = IAction & {
  actionType: ActionType.button;
  onClick: () => any;
};

export type IPageAction = ILinkAction | IButtonAction;
