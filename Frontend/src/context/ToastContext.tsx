import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import "./ToastContext.scss";

type Toast = {
  message: string;
  leaving: boolean;
};

type ToastContextValue = {
  showToast: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);
const TOAST_DURATION_MS = 3000;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((message: string) => {
    setToast({ message, leaving: false });
    setTimeout(() => {
      setToast((current) => (current ? { ...current, leaving: true } : current));
    }, TOAST_DURATION_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="toast-stack" role="status" aria-live="polite">
          <p
            className={`toast-stack__toast ${toast.leaving ? "toast-stack__toast--leaving" : ""}`}
            onAnimationEnd={() => toast.leaving && setToast(null)}
          >
            {toast.message}
          </p>
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within a ToastProvider");
  return context;
}
