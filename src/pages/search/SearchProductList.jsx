import React from "react";
import { Star, ShoppingCart } from "lucide-react";

const Card = ({ children, className }) => (
  <div
    className={`rounded-2xl overflow-hidden shadow-lg bg-white flex items-center p-4 ${className}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`flex flex-col gap-2 ${className}`}>{children}</div>
);

const Button = ({ children, className, onClick }) => (
  <button
    className={`bg-[#A3E4DB] text-[#3D3B40] flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-[#A1C3D1] ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const SearchProductList = ({ dataList }) => {
  return (
    <div className="p-6 flex flex-col gap-6 bg-[#F4EAE6] min-h-screen sm:px-20 md:px-52 ">
      {dataList && dataList.length == 0 && (
        <div>No Product Found In Database</div>
      )}
      {dataList &&
        dataList.map((product) => (
          <Card key={product.id} className="flex-row gap-4">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <CardContent className="flex-1">
              <h3 className="text-lg font-semibold text-[#3D3B40]">
                {product.title}
              </h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#F9D976]" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
              <div className="flex bor items-center justify-start gap-5 text-[#D8A7B1] font-semibold">
                <span className="text-lg">
                  NRP{" "}
                  {(product.price * (1 - product.discount / 100)).toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-sm line-through text-gray-500">
                    NRP {product.price}
                  </span>
                )}
              </div>
              <Button>
                <ShoppingCart className="w-4 h-4" /> Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default SearchProductList;
