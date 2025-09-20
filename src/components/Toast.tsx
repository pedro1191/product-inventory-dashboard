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
    <div>
      <div>
        <span>{message}</span>
        <Button label="Close" onClick={handleClose} />
      </div>
    </div>
  );
};
