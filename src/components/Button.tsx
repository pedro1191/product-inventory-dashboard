interface ButtonProps {
  label?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function Button({ label, onClick }: ButtonProps) {
  return (
    <button type="button" onClick={onClick}>{label}</button>
  );
};
