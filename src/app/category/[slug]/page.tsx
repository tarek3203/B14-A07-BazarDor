import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SortableProducts from "@/components/home/SortableProducts";
import ProductGridSkeleton from "@/components/shared/ProductGridSkeleton";
import { getCategories, getCategory, getProductsByCategory } from "@/lib/api";

export const generateStaticParams = async () => {
  const categories = await getCategories();

  return categories.map((category) => ({ slug: category.slug }));
};

const CategoryProducts = async ({ slug }: { slug: string }) => {
  const products = await getProductsByCategory(slug);

  if (products.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-line bg-paper px-6 py-16 text-center">
        <p className="text-5xl">🧺</p>

        <h2 className="mt-4 text-xl font-bold text-ink">
          এই ক্যাটাগরিতে এখন কোনো পণ্য নেই
        </h2>

        <p className="mt-2 text-muted">
          অন্য ক্যাটাগরি দেখুন অথবা হোম পেজ থেকে সব পণ্যের দাম দেখে নিন।
        </p>

        <Link
          href="/"
          className="mt-6 inline-block rounded-full bg-bazar px-6 py-3 text-sm text-white transition hover:bg-bazar-dark"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return <SortableProducts products={products} />;
};

interface ICategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: ICategoryPageProps) => {
  const { slug } = await params;
  const category = await getCategory(slug);

  // unknown slug goes to the 404 page
  if (!category) {
    notFound();
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center gap-3">
        <span className="text-4xl">{category.icon}</span>

        <div>
          <h1 className="text-2xl font-bold text-ink sm:text-3xl">
            {category.nameBn}
          </h1>

          <p className="text-sm text-muted">
            এই ক্যাটাগরির পণ্যগুলোর আজকের বাজার দর।
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="mt-10"><ProductGridSkeleton count={4} /></div>}>
        <CategoryProducts slug={slug} />
      </Suspense>
    </section>
  );
};

export default CategoryPage;
