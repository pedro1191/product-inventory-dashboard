
interface ModalProps {
  isOpen?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ isOpen, children, onClose }: ModalProps) {
  return (
    // @ts-expect-error - closedby is a valid HTML attribute but not yet in React type definitions
    <dialog className="modal" open={isOpen} closedby="any" onClose={onClose}>
      {children}
    </dialog>
  );
}
