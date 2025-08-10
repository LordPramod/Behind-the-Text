import { useEffect, useState } from "react";

interface Toast {
  id: string;
  type: "success" | "error" | "loading" | "info";
  title?: string;
  description?: string;
  duration?: number;
}

export const ToasterProvider = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    // Auto-remove toasts after duration
    toasts.forEach((toast) => {
      if (toast.duration && toast.type !== "loading") {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        }, toast.duration);
      }
    });
  }, [toasts]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg shadow-lg max-w-sm ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : toast.type === "error"
              ? "bg-red-500 text-white"
              : toast.type === "loading"
              ? "bg-blue-500 text-white"
              : "bg-gray-500 text-white"
          }`}
        >
          {toast.title && (
            <div className="font-semibold mb-1">{toast.title}</div>
          )}
          {toast.description && (
            <div className="text-sm opacity-90">{toast.description}</div>
          )}
          <button
            onClick={() => removeToast(toast.id)}
            className="absolute top-2 right-2 text-white opacity-70 hover:opacity-100"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};
