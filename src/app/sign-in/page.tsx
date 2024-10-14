"use client";

import { AppContext } from "@/contexts/app";

export default function SignIn() {
  const state = AppContext.useSelector((snapshot) => {
    return snapshot;
  });
  const actorRef = AppContext.useActorRef();

  return (
    <main>
      <div>
        <h3>Sign In:</h3>
      </div>
      <div>
        <button
          onClick={() => {
            actorRef.send({ type: "SIGN_IN" });
          }}
        >
          {state.matches({ unauthenticated: "signingIn" })
            ? "...loading"
            : "sign in"}
        </button>
      </div>
    </main>
  );
}
