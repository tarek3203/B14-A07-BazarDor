"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;

  if (isPending) {
    return (
      <div className="mx-auto max-w-md px-4 py-12">
        <div className="skeleton h-64 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <section className="mx-auto w-full max-w-md px-4 py-12">
      <div className="rounded-2xl border border-line bg-paper p-6 text-center sm:p-8">
        {user?.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={80}
            height={80}
            className="mx-auto h-20 w-20 rounded-full border border-line object-cover"
          />
        ) : (
          <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-bazar text-2xl text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </span>
        )}

        <h1 className="mt-4 text-2xl font-bold text-ink">{user?.name}</h1>

        <p className="text-muted">{user?.email}</p>

        <Link
          href="/profile/update"
          className="mt-6 inline-block rounded-full bg-bazar px-6 py-2.5 text-sm text-white transition hover:bg-bazar-dark"
        >
          তথ্য হালনাগাদ করুন
        </Link>
      </div>
    </section>
  );
};

export default ProfilePage;
