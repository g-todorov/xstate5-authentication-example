"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/contexts/app";

export function StateRouter() {
  const router = useRouter();
  const state = AppContext.useSelector((snapshot) => {
    return snapshot;
  });

  useEffect(() => {
    if (state.matches("unauthenticated")) {
      router.push("/sign-in");
    } else if (state.matches("authenticated")) {
      router.push("/");
    }
  }, [state.value]);

  return null;
}
