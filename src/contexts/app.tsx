"use client";

import React, { PropsWithChildren } from "react";
import { fromCallback, fromPromise, setup } from "xstate";
import { createActorContext } from "@xstate/react";
import { onAuthStateChanged, getAuth, signInAnonymously } from "firebase/auth";

import firebaseApp from "@/firebase";

const auth = getAuth(firebaseApp);

const appMachine = setup({
  types: {
    events: {} as
      | { type: "GO_TO_AUTHENTICATED" }
      | { type: "GO_TO_UNAUTHENTICATED" }
      | { type: "SIGN_IN" }
      | { type: "SIGN_OUT" },
  },
  actors: {
    userSubscriber: fromCallback(({ sendBack }) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          sendBack({ type: "GO_TO_AUTHENTICATED" });
        } else {
          sendBack({ type: "GO_TO_UNAUTHENTICATED" });
        }
      });
      return () => unsubscribe();
    }),
    signIn: fromPromise(async () => {
      await signInAnonymously(auth);
    }),
    signOut: fromPromise(async () => {
      await auth.signOut();
    }),
  },
}).createMachine({
  invoke: { src: "userSubscriber" },
  on: {
    GO_TO_AUTHENTICATED: { target: ".authenticated" },
    GO_TO_UNAUTHENTICATED: { target: ".unauthenticated" },
  },
  initial: "loading",
  states: {
    loading: { tags: "loading" },
    authenticated: {
      on: { SIGN_OUT: { target: ".signingOut" } },
      initial: "idle",
      states: {
        idle: {},
        signingOut: {
          invoke: { src: "signOut" },
          onDone: { target: "idle" },
        },
      },
    },
    unauthenticated: {
      on: { SIGN_IN: { target: ".signingIn" } },
      initial: "idle",
      states: {
        idle: {},
        signingIn: { invoke: { src: "signIn" }, onDone: { target: "idle" } },
      },
    },
  },
});

export const AppContext = createActorContext(appMachine);

export function AppProvider({ children }: PropsWithChildren<{}>) {
  return <AppContext.Provider>{children}</AppContext.Provider>;
}
