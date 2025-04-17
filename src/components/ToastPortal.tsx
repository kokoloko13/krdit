import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast/Toast";

type ToastPortalProps = {
    message: string
}

const ToastPortal = ({ message }: ToastPortalProps) => {
    const [root, setRoot] = useState<HTMLElement | null>(null);
  
    useEffect(() => {
      const rootElement = document.getElementById('root');
      setRoot(rootElement);
    }, []);
  
    if (!root) return null;
  
    return createPortal(
      <Toast data-testid='portalToast' message={message} />,
      root
    );
  };
  
  export default ToastPortal;