import { Toaster } from "@/components/ui/sonner";
import {
  CircleCheck,
  CircleX,
  Info,
  LoaderCircle,
  TriangleAlert,
} from "lucide-react";
import React from "react";

interface SonnerProviderProps {
  children: React.ReactNode;
}

const SonnerProvider = ({ children }: SonnerProviderProps) => {
  const iconSize = 20;
  return (
    <>
      {children}

      <Toaster
        closeButton
        position="bottom-right"
        icons={{
          success: <CircleCheck className="text-green-500" size={iconSize} />,
          info: <Info size={iconSize} className="text-blue-500" />,
          warning: (
            <TriangleAlert className="text-orange-500" size={iconSize} />
          ),
          error: <CircleX className="text-red-500" size={iconSize} />,
          loading: (
            <LoaderCircle
              className="text-primary animate-spin"
              size={iconSize}
            />
          ),
        }}
        toastOptions={{
          classNames: {
            toast: "toast-container",
            closeButton: "toast-close-button",
            error: "toast-error",
            success: "toast-success",
            info: "toast-info",
            warning: "toast-warning",
          },
        }}
      />
    </>
  );
};

export default SonnerProvider;
