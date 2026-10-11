"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/auth/SocialButtons";
import { signUp } from "@/lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const { error } = await signUp.email({ name, email, password });

    setLoading(false);

    if (error) {
      toast.error(error.message ?? "রেজিস্ট্রেশন ব্যর্থ হয়েছে");
      return;
    }

    toast.success("রেজিস্ট্রেশন সফল হয়েছে, এবার সাইন ইন করুন");
    router.push("/signin");
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-ink">সাইন আপ</h1>

        <p className="mt-1 text-sm text-muted">
          নতুন অ্যাকাউন্ট খুলে আজকের বাজার দর দেখা শুরু করুন।
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
              placeholder="আপনার নাম"
              className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 outline-none transition focus:border-bazar"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              ইমেইল
            </label>

            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 outline-none transition focus:border-bazar"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              পাসওয়ার্ড
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 outline-none transition focus:border-bazar"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-bazar py-2.5 font-medium text-white transition hover:bg-bazar-dark disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "রেজিস্ট্রেশন করুন"}
          </button>
        </form>

        <SocialButtons />

        <p className="mt-6 text-center text-sm text-muted">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="font-medium text-bazar hover:underline">
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
