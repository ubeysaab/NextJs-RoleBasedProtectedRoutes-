"use client";
import { useRoleRedirect } from "@/hooks/useRoleRedirect";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axiosConfig";

export default function AdminPage() {
  useRoleRedirect("admin");

  const { data, isLoading, error } = useQuery({
    queryKey: ["adminData"],
    queryFn: async () => (await axios.get("/admin-data")).data,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Access denied</div>;

  return <div>Admin secret: {data.message}</div>;
}
