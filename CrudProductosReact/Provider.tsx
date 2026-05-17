import { Loader } from "@components/Loader";
import { LoaderProvider, useLoader } from "@context/LoaderContext";
import { ToastProvider, } from "@heroui/react";
import { HeroUIProvider } from "@heroui/system";
import type { NavigateOptions } from "react-router-dom";
import { useHref, useNavigate } from "react-router-dom";

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NavigateOptions;
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <LoaderProvider>
      {/* COMMENT: Asegura que el contexto esté disponible primero */}
      <InnerProvider>{children}</InnerProvider>
    </LoaderProvider>
  );
}

function InnerProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { isLoading } = useLoader();

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <Loader mostrarLoader={isLoading} />
      <ToastProvider
        maxVisibleToasts={3}
        placement="top-right"
        toastOffset={75}
        regionProps={{
          classNames: {
            base: "z-50",
          },
        }}
      />
      {children}
    </HeroUIProvider>
  );
}