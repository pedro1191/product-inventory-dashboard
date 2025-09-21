import Button from "./Button";
import { useToast } from "../../hooks";

export default function Toast() {
  const { isVisible, message, handleClose } = useToast();

  return (
    <div className={`fixed left-1/2 -translate-x-1/2 bottom-10 z-10 animate-slide-up ${isVisible ? 'show' : 'hidden'}`}>
      <div className="flex flex-row items-center gap-6 card p-3">
        <span className="text-md">{message}</span>
        <Button className="primary-button" label="Close" onClick={handleClose} />
      </div>
    </div>
  );
};
