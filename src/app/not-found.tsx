import Link from "next/link";

const NotFound = () => {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl">🧺</p>

      <h1 className="mt-6 text-3xl font-bold text-ink">৪০৪</h1>

      <h2 className="mt-2 text-xl font-semibold text-ink">
        পেজটি খুঁজে পাওয়া যায়নি
      </h2>

      <p className="mt-3 text-muted">
        আপনি যে পণ্য বা ক্যাটাগরি খুঁজছেন সেটি আমাদের তালিকায় নেই। হোম পেজ থেকে
        আজকের সব দাম দেখে নিতে পারেন।
      </p>

      <Link
        href="/"
        className="mt-8 rounded-full bg-bazar px-6 py-3 text-sm text-white transition hover:bg-bazar-dark"
      >
        হোম পেজে ফিরে যান
      </Link>
    </section>
  );
};

export default NotFound;
