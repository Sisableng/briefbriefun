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
  const iconSize = 16;
  return (
    <>
      {children}

      <Toaster
        closeButton
        position="top-center"
        icons={{
          success: (
            <CircleCheck className="dark text-green-200" size={iconSize} />
          ),
          info: <Info size={iconSize} className="dark text-blue-500" />,
          warning: (
            <TriangleAlert className="dark text-yellow-500" size={iconSize} />
          ),
          error: <CircleX className="dark text-destructive" size={iconSize} />,
          loading: (
            <LoaderCircle
              className="dark text-primary animate-spin"
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
            title: "toast-title",
            description: "toast-description",
            icon: "toast-icon",
          },
        }}
      />
    </>
  );
};

export default SonnerProvider;
