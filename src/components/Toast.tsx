import { useCallback } from "react";
import { TOAST_DURATION_IN_MS } from "../constants";
import { useTimeout } from "../hooks";
import { useToastContext, useToastDispatchContext } from "../contexts";
import Button from "./Button";

export default function Toast() {
  const { message } = useToastContext();
  const dispatch = useToastDispatchContext();

  const { clear } = useTimeout(() => {
    dispatch({ type: 'hid_toast' });
  }, TOAST_DURATION_IN_MS);

  const handleClose = useCallback(() => {
    clear();
    dispatch({ type: 'hid_toast' });
  }, [clear, dispatch]);

  return (
    <div className="fixed w-full flex justify-center bottom-10 z-10">
      <div className="flex flex-row gap-3 rounded-xl border p-3">
        <span>{message}</span>
        <Button label="Close" onClick={handleClose} />
      </div>
    </div>
  );
};
