"use client";  // ✅ Add this line at the very top

import { useEffect, useState } from "react";
import { useSession, useUser } from "@clerk/nextjs";
import { createClient, User } from "@supabase/supabase-js";

export default function Home() {
  const { user } = useUser();
  const { session } = useSession();
  const [supabaseUser, setSupabaseUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) return;

    const createSupabaseClient = async () => {
      const clerkToken = await session.getToken({ template: "supabase" });

      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${clerkToken}`,
            },
          },
        }
      );

      const { data, error } = await supabase.auth.getUser();
      if (error) console.error("Supabase Error:", error);
      setSupabaseUser(data?.user ?? null);
      setLoading(false);
    };

    createSupabaseClient();
  }, [session]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">User Information</h1>

      <div className="mt-4 p-4 border rounded shadow">
        <h2 className="text-lg font-semibold">Clerk User</h2>
        {user ? (
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(user, null, 2)}</pre>
        ) : (
          <p>Loading Clerk user...</p>
        )}
      </div>

      <div className="mt-4 p-4 border rounded shadow">
        <h2 className="text-lg font-semibold">Supabase User</h2>
        {loading ? (
          <p>Loading Supabase user...</p>
        ) : supabaseUser ? (
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(supabaseUser, null, 2)}</pre>
        ) : (
          <p>No Supabase user found.</p>
        )}
      </div>
    </div>
  );
}
