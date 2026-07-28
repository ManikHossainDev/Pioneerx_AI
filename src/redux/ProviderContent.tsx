"use client";

import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { store, persistor } from "./store";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";
import AuthCrossTabSync from "./AuthCrossTabSync";

const ProviderContent = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <AuthCrossTabSync />
          <Toaster position="top-center" richColors theme="dark" />
          {children}
        </NextThemesProvider>
      </PersistGate>
    </Provider>
  );
};

export default ProviderContent;
