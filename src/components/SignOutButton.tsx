"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogOut } from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);

    try {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error("সাইন আউট করা যায়নি।");
        return;
      }

      toast.success("সাইন আউট সম্পন্ন হয়েছে।");
      router.push("/");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করার সময় সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-[#e4eae4] px-4 py-2.5 text-sm font-semibold text-[#526158] transition hover:bg-[#f7f9f5] disabled:opacity-60"
    >
      <LogOut size={16} />
      {loading ? "অপেক্ষা করুন..." : "সাইন আউট"}
    </button>
  );
}