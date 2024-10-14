"use client";

import { AppContext } from "@/contexts/app";

export default function Home() {
  const state = AppContext.useSelector((snapshot) => {
    return snapshot;
  });
  const actorRef = AppContext.useActorRef();

  return (
    <main>
      <h3>Dashboard:</h3>
      <button
        onClick={() => {
          actorRef.send({ type: "SIGN_OUT" });
        }}
      >
        {state.matches({ authenticated: "signingOut" })
          ? "...loading"
          : "sign out"}
      </button>
    </main>
  );
}
