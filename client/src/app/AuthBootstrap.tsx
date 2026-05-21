import { PropsWithChildren, useEffect } from "react";

import { initializeAuth } from "../features/auth/authSlice";
import { useAppDispatch } from "../shared/hooks/redux";

export function AuthBootstrap({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(initializeAuth());
  }, [dispatch]);

  return <>{children}</>;
}
