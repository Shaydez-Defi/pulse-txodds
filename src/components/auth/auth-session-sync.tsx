"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/stores/auth-store";

export function AuthSessionSync() {
  const { data: session } = useSession();
  const signIn = useAuthStore((s) => s.signIn);
  const user = useAuthStore((s) => s.user);

  useEffect(() => {
    if (session?.user && !user) {
      signIn({
        name: session.user.name ?? session.user.email ?? "Google User",
        email: session.user.email ?? undefined,
        type: "google",
      });
    }
  }, [session, user, signIn]);

  return null;
}