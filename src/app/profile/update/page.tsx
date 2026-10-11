"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { updateUser, useSession } from "@/lib/auth-client";

const UpdateProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name")).trim();

    if (!name) {
      setLoading(false);
      toast.error("নাম লিখুন");
      return;
    }

    const { error } = await updateUser({ name });

    setLoading(false);

    if (error) {
      toast.error(error.message ?? "তথ্য হালনাগাদ করা যায়নি");
      return;
    }

    toast.success("তথ্য হালনাগাদ হয়েছে");
    router.push("/profile");
    router.refresh();
  };

  return (
    <section className="mx-auto w-full max-w-md px-4 py-12">
      <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-ink">তথ্য হালনাগাদ</h1>

        <p className="mt-1 text-sm text-muted">
          আপনার নাম পরিবর্তন করে সংরক্ষণ করুন।
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium">
              নাম
            </label>

            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={session?.user?.name ?? ""}
              placeholder="আপনার নাম"
              className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 outline-none transition focus:border-bazar"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-bazar py-2.5 font-medium text-white transition hover:bg-bazar-dark disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "তথ্য হালনাগাদ করুন"}
          </button>
        </form>

        <Link
          href="/profile"
          className="mt-5 block text-center text-sm text-muted transition hover:text-bazar"
        >
          ← প্রোফাইলে ফিরে যান
        </Link>
      </div>
    </section>
  );
};

export default UpdateProfilePage;
