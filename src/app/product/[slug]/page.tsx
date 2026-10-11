import Link from "next/link";
import { notFound } from "next/navigation";
import {
  changeClasses,
  changeLabel,
  toBnPrice,
  unitLabels,
  unitShort,
} from "@/lib/bn";
import { getProduct, getProducts } from "@/lib/api";

interface IProductPageProps {
  params: Promise<{ slug: string }>;
}

export const generateStaticParams = async () => {
  const products = await getProducts();

  return products.map((product) => ({ slug: product.slug }));
};

const ProductPage = async ({ params }: IProductPageProps) => {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  // the price summary is derived from every market reporting today
  const lows = product.markets.map((market) => market.min);
  const highs = product.markets.map((market) => market.max);
  const minPrice = Math.min(...lows);
  const maxPrice = Math.max(...highs);
  const avgPrice = Math.round(
    product.markets.reduce((total, market) => total + (market.min + market.max) / 2, 0) /
      product.markets.length,
  );

  const summary = [
    { label: "সর্বনিম্ন দাম", value: minPrice, tone: "text-rise" },
    { label: "সর্বোচ্চ দাম", value: maxPrice, tone: "text-fall" },
    { label: "গড় দাম", value: avgPrice, tone: "text-ink" },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/" className="text-sm text-muted transition hover:text-bazar">
        ← সব পণ্য
      </Link>

      {/* summary */}
      <div className="mt-4 rounded-2xl border border-line bg-paper p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="text-5xl sm:text-6xl">{product.image}</span>

            <div>
              <h1 className="text-2xl font-bold text-ink sm:text-3xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-sm text-muted">
                {unitLabels[product.unit]}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-muted">আজকের দাম</p>

            <p className="text-3xl font-bold text-ink">
              {toBnPrice(product.today)} টাকা
            </p>

            <span
              className={`mt-1 inline-block rounded-full px-2.5 py-1 text-sm font-medium ${changeClasses(
                product.change.dir,
              )}`}
            >
              {changeLabel(product.change.dir, product.change.pct)}
            </span>
          </div>
        </div>

        <p className="mt-5 leading-7 text-muted">
          {product.markets.length} টি বাজারের তথ্য অনুযায়ী {product.nameBn} আজ{" "}
          {toBnPrice(minPrice)} থেকে {toBnPrice(maxPrice)} টাকায় বিক্রি হচ্ছে।
          গতকাল দাম ছিল {toBnPrice(product.yesterday)} টাকা, এক সপ্তাহ আগে{" "}
          {toBnPrice(product.lastWeek)} টাকা।
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={`/category/${product.category}`}
            className="rounded-full bg-bazar/10 px-3 py-1 text-sm text-bazar transition hover:bg-bazar hover:text-white"
          >
            {product.categoryIcon} {product.categoryNameBn}
          </Link>

          <span className="rounded-full border border-line px-3 py-1 text-sm text-muted">
            {unitLabels[product.unit]}
          </span>
        </div>
      </div>

      {/* price summary */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {summary.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-line bg-paper p-5"
          >
            <p className="text-sm text-muted">{item.label}</p>

            <p className={`mt-2 text-2xl font-bold ${item.tone}`}>
              {toBnPrice(item.value)} টাকা
            </p>

            <p className="text-xs text-muted">প্রতি {unitShort[product.unit]}</p>
          </div>
        ))}
      </div>

      {/* market by market */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-line bg-paper">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="border-b border-line text-muted">
              <tr>
                <th className="px-5 py-3 font-medium">বাজার</th>
                <th className="px-5 py-3 font-medium">বিভাগ</th>
                <th className="px-5 py-3 text-right font-medium">সর্বনিম্ন</th>
                <th className="px-5 py-3 text-right font-medium">সর্বোচ্চ</th>
              </tr>
            </thead>

            <tbody>
              {product.markets.map((market) => (
                <tr
                  key={`${market.market}-${market.division}`}
                  className="border-b border-line last:border-b-0"
                >
                  <td className="px-5 py-3 font-medium text-ink">
                    {market.market}
                  </td>
                  <td className="px-5 py-3 text-muted">{market.division}</td>
                  <td className="px-5 py-3 text-right text-rise">
                    {toBnPrice(market.min)} টাকা
                  </td>
                  <td className="px-5 py-3 text-right text-fall">
                    {toBnPrice(market.max)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ProductPage;
