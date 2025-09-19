import { useEffect } from "react";
import type { Nullable } from "../models";
import { TOAST_DURATION_IN_MS } from "../constants";
import Button from "./Button";

interface ToastProps {
  message: Nullable<string>;
  onClose: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, TOAST_DURATION_IN_MS);

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

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
