"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICategory } from "@/types/product.type";

const NavLinks = ({ categories }: { categories: ICategory[] }) => {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition ${
      pathname === href
        ? "bg-bazar text-white"
        : "text-ink hover:bg-bazar/10 hover:text-bazar"
    }`;

  return (
    <nav className="flex items-center gap-1 overflow-x-auto py-2">
      <Link href="/" className={linkClass("/")}>
        হোম
      </Link>

      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/category/${category.slug}`}
          className={linkClass(`/category/${category.slug}`)}
        >
          {category.icon} {category.nameBn}
        </Link>
      ))}
    </nav>
  );
};

export default NavLinks;
