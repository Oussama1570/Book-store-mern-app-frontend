import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import ProductCard from "../products/ProductCard";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const Recommened = () => {
  const {
    data: products = [],
    isLoading,
    isError,
  } = useFetchAllProductsQuery();

  // 👉 Take up to 10 products for recommendations
  const recommendedProducts = products.slice(0, 10);

  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommended for you</h2>

      {isLoading && <p>Loading recommendations...</p>}
      {isError && <p>Failed to load recommended products.</p>}

      {!isLoading && !isError && recommendedProducts.length === 0 && (
        <p>No products to recommend yet.</p>
      )}

      {!isLoading && !isError && recommendedProducts.length > 0 && (
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1180: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {recommendedProducts.map((product, index) => (
            <SwiperSlide key={product._id || index}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Recommened;
