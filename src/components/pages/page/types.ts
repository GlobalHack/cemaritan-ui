export enum ActionType {
  link,
  button,
}

export type ILinkAction = {
  actionType: ActionType.link;
  id: string;
  label: string;
  variant: string;
  linkTo: string;
};

export type IButtonAction = {
  actionType: ActionType.button;
  id: string;
  label: string;
  variant: string;
  onClick: () => any;
};

export type IPageAction = ILinkAction | IButtonAction;
