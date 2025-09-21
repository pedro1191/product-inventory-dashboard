import { useEffect, useRef } from "react";

interface ModalProps {
  isOpen?: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}

export default function Modal({ isOpen, children, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      modalRef.current?.showModal();
    } else {
      modalRef.current?.close();
    }
  }, [isOpen]);

  return (
    // @ts-expect-error - closedby is a valid HTML attribute but not yet in React type definitions
    <dialog ref={modalRef} className="m-auto card animate-fade-in" closedby="any" onClose={onClose}>
      <div className="flex flex-col items-center justify-center h-full">
        {children}
      </div>
    </dialog>
  );
}
