import ProductCard from "@/components/shared/ProductCard";
import { toBnDigits } from "@/lib/bn";
import { getProducts, getTopMovers } from "@/lib/api";

const ProductSections = async () => {
  const products = await getProducts();
  const risers = getTopMovers(products, "up");
  const fallers = getTopMovers(products, "down");

  return (
    <>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-rise sm:text-3xl">
          আজ দাম বেড়েছে ▲
        </h2>

        <p className="mt-1 text-muted">
          গতকালের তুলনায় সবচেয়ে বেশি দাম বেড়েছে যেসব পণ্যের।
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-bold text-fall sm:text-3xl">
          আজ দাম কমেছে ▼
        </h2>

        <p className="mt-1 text-muted">
          গতকালের তুলনায় সবচেয়ে বেশি দাম কমেছে যেসব পণ্যের।
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section id="সব-পণ্য" className="mx-auto max-w-6xl scroll-mt-40 px-4 pb-12">
        <h2 className="text-2xl font-bold text-ink sm:text-3xl">সব পণ্য</h2>

        <p className="mt-1 text-muted">
          মোট {toBnDigits(products.length)} টি পণ্যের আজকের বাজার দর, ক্যাটাগরি অনুযায়ী
          সাজানো।
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductSections;
