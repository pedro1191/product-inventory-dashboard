import type { Nullable } from "../models";
import { TOAST_DURATION_IN_MS } from "../constants";
import { useToast } from "../hooks";
import Button from "./Button";

interface ToastProps {
  message: Nullable<string>;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useToast(message, TOAST_DURATION_IN_MS, onClose);

  if (!message) {
    return null;
  }

  return (
    <div>
      <div>
        <span>{message}</span>
        <Button label="Close" onClick={onClose} />
      </div>
    </div>
  );
};
