interface ButtonProps {
  className?: string;
  disabled?: boolean;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({ disabled, type = "button", className, label, onClick }: ButtonProps) {
  return (
    <button className={className} disabled={disabled} type={type} onClick={onClick}>{label}</button>
  );
};
