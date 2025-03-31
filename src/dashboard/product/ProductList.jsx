import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loadProduct, updateProduct } from "../../context/ProductContext";

export default function ProductList() {
  const naviaget = useNavigate();
  const ITEMS_PER_PAGE = 10;

  const { productList } = loadProduct();
  const { getProductList } = updateProduct();

  const [dataList, setDataList] = useState(productList ? productList : []);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dataList.length / ITEMS_PER_PAGE);

  const currentProducts = dataList.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const naviagetToUpdate = (id) => {
    console.log("item:", id);
    naviaget(`/dashboard/product/update/${id}`);
  };

  useEffect(() => {
    getProductList();
  }, []);

  useEffect(() => {
    // console.log("productList",productList)
    setDataList(productList);
  }, [productList]);

  return (
    <div className="flex flex-col p-6 pb-8 bg-[#f9f9f9] h-full  overflow-auto ">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <div className="bor flex-1">
        <table className="w-full border-collapse border border-[#3D3B40]">
          <thead>
            <tr className="bg-[#A1C3D1]">
              <th className="border border-[#3D3B40] p-2">SN</th>
              <th className="border border-[#3D3B40] p-2">Code</th>
              <th className="border border-[#3D3B40] p-2">Type</th>
              <th className="border border-[#3D3B40] p-2">Title</th>
              {/* <th className="border border-[#3D3B40] p-2">Description</th> */}
              <th className="border border-[#3D3B40] p-2">Game</th>
              <th className="border border-[#3D3B40] p-2">Genre</th>
              <th className="border border-[#3D3B40] p-2">Price</th>
              <th className="border border-[#3D3B40] p-2">Quantity</th>
              <th className="border border-[#3D3B40] p-2">Update</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product, index) => (
              <tr key={product.id} className="bg-[#ddd]">
                <td className="border border-[#3D3B40] p-2">
                  {index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}
                </td>
                <td className="border border-[#3D3B40] p-2">{product.code}</td>
                <td className="border border-[#3D3B40] p-2">{product.type}</td>
                <td className="border border-[#3D3B40] p-2">{product.title}</td>
                {/* <td className="border border-[#3D3B40] p-2">
                  {product.description}
                </td> */}
                <td className="border border-[#3D3B40] p-2">{product.game}</td>
                <td className="border border-[#3D3B40] p-2">{product.genre}</td>
                <td className="border border-[#3D3B40] p-2">
                {product.price}
                  {/* ${product.price.toFixed(2)} */}
                </td>
                <td className="border border-[#3D3B40] p-2">
                  {product.quantity}
                </td>
                <td className="border border-[#3D3B40] p-2 underline">
                  <div
                    className="underline cursor-pointer"
                    onClick={() => {
                      naviagetToUpdate(product.id);
                    }}
                  >
                    Update
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4 bor">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="flex bg-[#A1C3D1] px-3 gap-1 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
        >
          <ChevronLeft /> Prev
        </button>
        <span className="text-[#3D3B40]">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="flex bg-[#A1C3D1] px-3 gap-1 py-2 rounded-lg disabled:opacity-50 cursor-pointer"
        >
          Next <ChevronRight />
        </button>
      </div>
    </div>
  );
}
