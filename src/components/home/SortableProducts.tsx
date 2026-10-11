"use client";

import { useMemo, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import ProductCard from "@/components/shared/ProductCard";
import { IProduct, SortKey } from "@/types/product.type";

const options: { value: SortKey; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "low-to-high", label: "দাম: কম থেকে বেশি" },
  { value: "high-to-low", label: "দাম: বেশি থেকে কম" },
];

const SortableProducts = ({ products }: { products: IProduct[] }) => {
  const [sortBy, setSortBy] = useState<SortKey>("default");

  // sorts on the raw number, never the bengali string the card renders
  const sorted = useMemo(() => {
    if (sortBy === "default") return products;

    const copy = [...products];
    copy.sort((a, b) =>
      sortBy === "low-to-high" ? a.today - b.today : b.today - a.today,
    );

    return copy;
  }, [products, sortBy]);

  return (
    <>
      <div className="mt-6 flex items-center justify-end">
        <div className="relative">
          <label htmlFor="sort" className="sr-only">
            সাজান
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortKey)}
            className="appearance-none rounded-full border border-line bg-paper py-2 pl-5 pr-10 text-sm text-ink outline-none transition focus:border-bazar"
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                সাজান: {option.label}
              </option>
            ))}
          </select>

          <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-bazar" />
        </div>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default SortableProducts;
