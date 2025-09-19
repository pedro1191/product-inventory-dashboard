interface ButtonProps {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({ type = "button", label, onClick }: ButtonProps) {
  return (
    <button type={type} onClick={onClick}>{label}</button>
  );
};
