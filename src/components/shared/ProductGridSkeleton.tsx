const ProductGridSkeleton = ({ count = 8 }: { count?: number }) => {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-line bg-paper p-5"
        >
          <div className="skeleton h-10 w-10 rounded-xl" />
          <div className="skeleton mt-3 h-5 w-3/4" />
          <div className="skeleton mt-2 h-4 w-1/3" />

          <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
            <div className="w-1/2">
              <div className="skeleton h-3 w-2/3" />
              <div className="skeleton mt-2 h-6 w-full" />
            </div>

            <div className="skeleton h-7 w-16 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSkeleton;
