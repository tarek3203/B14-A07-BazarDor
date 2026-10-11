import Link from "next/link";
import { changeClasses, changeLabel, toBnPrice, unitLabels } from "@/lib/bn";
import { IProduct } from "@/types/product.type";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-paper p-5 transition hover:-translate-y-1 hover:border-bazar hover:shadow-md"
    >
      <span className="text-4xl">{product.image}</span>

      <h3 className="mt-3 text-lg font-semibold text-ink group-hover:text-bazar">
        {product.nameBn}
      </h3>

      <p className="text-sm text-muted">{unitLabels[product.unit]}</p>

      <div className="mt-4 flex items-end justify-between gap-2 border-t border-line pt-4">
        <div>
          <p className="text-xs text-muted">আজকের দাম</p>

          <p className="text-xl font-bold text-ink">
            {toBnPrice(product.today)} টাকা
          </p>
        </div>

        <span
          className={`rounded-full px-2.5 py-1 text-sm font-medium ${changeClasses(
            product.change.dir,
          )}`}
        >
          {changeLabel(product.change.dir, product.change.pct)}
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
