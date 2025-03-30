import { FC } from "react";

type ButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
}
export const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return (
      <button onClick={onClick}>{children}</button>
  );
};
