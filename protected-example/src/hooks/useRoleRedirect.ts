"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/authStore";

export function useRoleRedirect(role: string) {
  const { user, load } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    load();
    if (!user) router.replace("/login");
    else if (user.role !== role) router.replace("/unauthorized");
  }, [user]);
}
