export type DropdownItem = {
  label: string;
  onClick: () => void;
  show?: boolean;
  className?: string;
  separatorBefore?: boolean;
  separatorAfter?: boolean;
};
