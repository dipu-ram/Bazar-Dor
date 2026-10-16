
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { UserRound, Pencil } from "lucide-react";

import { auth } from "@/lib/auth";
import SignOutButton from "@/components/SignOutButton";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/signin");
  }

  return (
    <main className="container-main flex min-h-[60vh] items-start justify-center py-10 sm:py-14">
      <section className="w-full max-w-xl rounded-3xl border border-[#e4eae4] bg-white p-6 shadow-sm sm:p-9">
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eaf6ee] text-[#16794b]">
            <UserRound size={32} />
          </span>

          <div>
            <h1 className="text-2xl font-extrabold text-[#17251c]">
              আমার প্রোফাইল
            </h1>
            <p className="mt-1 text-sm text-[#66756b]">
              তোমার অ্যাকাউন্টের তথ্য
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-2xl bg-[#f7f9f5] p-4">
            <p className="text-xs font-semibold text-[#66756b]">নাম</p>
            <p className="mt-1 font-bold text-[#17251c]">
              {session.user.name || "নাম দেওয়া হয়নি"}
            </p>
          </div>

          <div className="rounded-2xl bg-[#f7f9f5] p-4">
            <p className="text-xs font-semibold text-[#66756b]">ইমেইল</p>
            <p className="mt-1 break-all font-bold text-[#17251c]">
              {session.user.email}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/profile/update"
            className="inline-flex items-center gap-2 rounded-xl bg-[#16794b] px-4 py-3 text-sm font-bold text-white hover:bg-[#105b38]"
          >
            <Pencil size={16} />
            তথ্য আপডেট
          </Link>

          <SignOutButton />
        </div>
      </section>
    </main>
  );
}