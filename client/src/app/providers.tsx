import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "../store/store";
import { AuthBootstrap } from "./AuthBootstrap";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <Provider store={store}>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <AuthBootstrap>{children}</AuthBootstrap>
      </BrowserRouter>
    </Provider>
  );
}
