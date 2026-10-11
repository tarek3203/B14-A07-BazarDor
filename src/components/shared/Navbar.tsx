import Link from "next/link";
import BanglaDate from "@/components/shared/BanglaDate";
import NavLinks from "@/components/shared/NavLinks";
import Ticker from "@/components/shared/Ticker";
import UserMenu from "@/components/shared/UserMenu";
import { getCategories, getProducts } from "@/lib/api";

const Navbar = async () => {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <header className="sticky top-0 z-50 bg-paper shadow-sm">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-4 py-3">
          {/* brand */}
          <Link href="/" className="shrink-0">
            <span className="block text-lg font-bold text-bazar sm:text-xl">
              🛒 বাজার দর
            </span>

            <BanglaDate />
          </Link>

          <UserMenu />
        </div>

        <NavLinks categories={categories} />
      </div>

      <Ticker products={products} />
    </header>
  );
};

export default Navbar;
