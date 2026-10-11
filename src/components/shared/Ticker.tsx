import { changeArrow, toBnDigits, toBnPrice, unitShort } from "@/lib/bn";
import { IProduct } from "@/types/product.type";

// the strip is rendered twice back to back so the css loop never shows a gap
const Ticker = ({ products }: { products: IProduct[] }) => {
  const strip = [...products, ...products];

  return (
    <div className="overflow-hidden border-y border-line bg-bazar-dark py-2 text-white">
      <div className="ticker-track">
        {strip.map((product, index) => (
          <span
            key={`${product.id}-${index}`}
            className="mx-5 inline-flex shrink-0 items-center gap-2 text-sm"
          >
            <span>{product.image}</span>

            <span>{product.nameBn}</span>

            <span className="text-white/80">
              {toBnPrice(product.today)} টাকা/{unitShort[product.unit]}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "text-lime-300"
                  : product.change.dir === "down"
                    ? "text-red-300"
                    : "text-white/60"
              }
            >
              {changeArrow(product.change.dir)}{" "}
              {toBnDigits(Math.abs(product.change.pct).toFixed(1))}%
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Ticker;
