"use client";

import { FaGithub, FaGoogle } from "react-icons/fa";
import toast from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

const SocialButtons = ({ callbackURL = "/" }: { callbackURL?: string }) => {
  const handleSocial = async (provider: "google" | "github") => {
    const { error } = await signIn.social({ provider, callbackURL });

    if (error) {
      toast.error(error.message ?? "সোশ্যাল লগইন ব্যর্থ হয়েছে");
    }
  };

  return (
    <div className="mt-5">
      <div className="flex items-center gap-3 text-xs text-muted">
        <span className="h-px flex-1 bg-line" />
        অথবা
        <span className="h-px flex-1 bg-line" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleSocial("google")}
          className="flex items-center justify-center gap-2 rounded-lg border border-line bg-paper py-2.5 text-sm transition hover:border-bazar hover:text-bazar"
        >
          <FaGoogle />
          গুগল দিয়ে
        </button>

        <button
          type="button"
          onClick={() => handleSocial("github")}
          className="flex items-center justify-center gap-2 rounded-lg border border-line bg-paper py-2.5 text-sm transition hover:border-bazar hover:text-bazar"
        >
          <FaGithub />
          গিটহাব দিয়ে
        </button>
      </div>
    </div>
  );
};

export default SocialButtons;
