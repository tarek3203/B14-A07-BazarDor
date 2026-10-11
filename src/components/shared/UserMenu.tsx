"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";

const UserMenu = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const user = session?.user;

  const handleSignOut = async () => {
    await signOut();
    toast.success("সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return <div className="h-9 w-32 animate-pulse rounded-full bg-line" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/signin"
          className="rounded-full px-3 py-1.5 text-sm text-ink transition hover:bg-bazar/10 hover:text-bazar sm:px-4"
        >
          সাইন ইন
        </Link>

        <Link
          href="/signup"
          className="rounded-full bg-bazar px-3 py-1.5 text-sm text-white transition hover:bg-bazar-dark sm:px-4"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link href="/profile" className="flex items-center gap-2">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full border border-line object-cover"
          />
        ) : (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-bazar text-sm text-white">
            {user.name?.charAt(0).toUpperCase()}
          </span>
        )}

        <span className="hidden text-sm font-medium sm:block">{user.name}</span>
      </Link>

      <button
        type="button"
        onClick={handleSignOut}
        className="rounded-full border border-line px-3 py-1.5 text-sm text-fall transition hover:bg-fall hover:text-white"
      >
        সাইন আউট
      </button>
    </div>
  );
};

export default UserMenu;
