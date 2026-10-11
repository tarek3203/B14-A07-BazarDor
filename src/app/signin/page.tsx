"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import toast from "react-hot-toast";
import SocialButtons from "@/components/auth/SocialButtons";
import { signIn } from "@/lib/auth-client";

const SignInForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  // a visitor bounced off a protected page comes back with ?redirect=
  const redirectTo = searchParams.get("redirect") ?? "/";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    const { error } = await signIn.email({ email, password });

    setLoading(false);

    if (error) {
      toast.error(error.message ?? "ইমেইল বা পাসওয়ার্ড ভুল হয়েছে");
      return;
    }

    toast.success("সাইন ইন সফল হয়েছে");
    router.push(redirectTo);
    router.refresh();
  };

  return (
    <div className="mx-auto w-full max-w-md px-4 py-12">
      <div className="rounded-2xl border border-line bg-paper p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-ink">সাইন ইন</h1>

        <p className="mt-1 text-sm text-muted">
          অ্যাকাউন্টে ঢুকে প্রতিটি পণ্যের বিস্তারিত দাম দেখুন।
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
              placeholder="********"
              className="w-full rounded-lg border border-line bg-cream px-4 py-2.5 outline-none transition focus:border-bazar"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-bazar py-2.5 font-medium text-white transition hover:bg-bazar-dark disabled:opacity-60"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
          </button>
        </form>

        <SocialButtons callbackURL={redirectTo} />

        <p className="mt-6 text-center text-sm text-muted">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="font-medium text-bazar hover:underline">
            সাইন আপ করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

const SignInPage = () => (
  <Suspense>
    <SignInForm />
  </Suspense>
);

export default SignInPage;
