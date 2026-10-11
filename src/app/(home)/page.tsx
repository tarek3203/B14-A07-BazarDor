import { Suspense } from "react";
import Hero from "@/components/home/Hero";
import ProductSections from "@/components/home/ProductSections";
import ProductGridSkeleton from "@/components/shared/ProductGridSkeleton";

const HomePage = () => {
  return (
    <>
      <Hero />

      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl px-4 py-12">
            <ProductGridSkeleton />
          </div>
        }
      >
        <ProductSections />
      </Suspense>
    </>
  );
};

export default HomePage;
