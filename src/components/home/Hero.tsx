import Image from "next/image";
import { FiArrowDown } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="border-b border-line bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-16">
        <div>
          <p className="text-sm font-semibold tracking-wide text-bazar">
            আজকের বাজার
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-ink sm:text-4xl lg:text-5xl">
            প্রয়োজনীয় পণ্যের দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-xl text-muted">
            চাল, ডাল, তেল থেকে মাছ মাংস পর্যন্ত, দেশের বিভিন্ন বাজারের আজকের দাম
            আর গতকালের তুলনায় কতটা বাড়ল বা কমল, সবই এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-bazar px-6 py-3 text-sm font-medium text-white transition hover:bg-bazar-dark sm:text-base"
          >
            সব পণ্যের দাম দেখুন
            <FiArrowDown />
          </a>
        </div>

        <div className="order-first md:order-last">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের ঝুড়িতে সবজি"
            width={315}
            height={263}
            priority
            className="mx-auto h-auto w-full max-w-sm"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
