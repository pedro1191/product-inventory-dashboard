import Spinner from "./Spinner";

interface ButtonProps {
  className?: React.HTMLAttributes<HTMLButtonElement>['className'];
  disabled?: boolean;
  isLoading?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Button({ disabled, type = "button", className, isLoading, label, onClick }: ButtonProps) {
  return (
    <button className={className} disabled={disabled} type={type} onClick={onClick}>
      {isLoading && <Spinner />}
      {label}
    </button>
  );
};
