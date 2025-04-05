import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loadSetting, updateSetting } from "../../context/SettingContext";

const CustomerList = () => {
  const naviaget = useNavigate();
  const ITEMS_PER_PAGE = 10;

  const { userList } = loadSetting();
  const { getUserList } = updateSetting();

  const [dataList, setDataList] = useState(userList ? userList : []);
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
    naviaget(`/dashboard/user/update/${id}`);
  };

  useEffect(() => {
    getUserList();
  }, []);

  useEffect(() => {
    console.log("userList", userList);
    setDataList(userList);
  }, [userList]);
  return (
    <div className="flex flex-col p-6 pb-8 bg-[#f9f9f9] h-full  overflow-auto ">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <div className="bor flex-1">
        <table className="w-full border-collapse border border-[#3D3B40]">
          <thead>
            <tr className="bg-[#A1C3D1]">
              <th className="border border-[#3D3B40] p-2">SN</th>
              <th className="border border-[#3D3B40] p-2">Name</th>
              <th className="border border-[#3D3B40] p-2">Email</th>
              <th className="border border-[#3D3B40] p-2">Authority</th>
              <th className="border border-[#3D3B40] p-2 none">Detail</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((user, index) => (
              <tr key={user.id} className="bg-[#ddd]">
                <td className="border border-[#3D3B40] p-2">
                  {index + 1 + (currentPage - 1) * ITEMS_PER_PAGE}
                </td>
                <td className="border border-[#3D3B40] p-2">{user.name}</td>
                <td className="border border-[#3D3B40] p-2">{user.email}</td>
                <td className="border border-[#3D3B40] p-2">
                  {user.authorities.length == 2 ? (
                    <span>Admin</span>
                  ) : (
                    <span>Customer</span>
                  )}
                </td>
                <td className="border border-[#3D3B40] p-2 none"></td>
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
};

export default CustomerList;
