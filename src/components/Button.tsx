interface ButtonProps {
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({ disabled, type = "button", label, onClick }: ButtonProps) {
  return (
    <button disabled={disabled} type={type} onClick={onClick}>{label}</button>
  );
};
