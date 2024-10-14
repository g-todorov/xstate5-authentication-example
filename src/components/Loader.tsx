"use client";

import { PropsWithChildren } from "react";
import { AppContext } from "@/contexts/app";

export function Loader({ children }: PropsWithChildren<{}>) {
  const state = AppContext.useSelector((snapshot) => {
    return snapshot;
  });

  return state.matches("loading") ? (
    <main>
      <div>Loading...</div>
    </main>
  ) : (
    children
  );
}
