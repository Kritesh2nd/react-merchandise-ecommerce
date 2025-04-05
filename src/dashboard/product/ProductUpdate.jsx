import React, { useEffect, useState } from "react";
import { X, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import { showInfoMessage } from "../../utils/notification";
import { loadProduct, updateProduct } from "../../context/ProductContext";
import { useNavigate, useParams } from "react-router-dom";

const typeOptions = ["Bag", "Figurine", "Hat", "Hoodie", "Poster", "T-Shirt"];
const codeOptions = [
  { name: "Bag", code: "BAG" },
  { name: "Figurine", code: "FIG" },
  { name: "Hat", code: "HAT" },
  { name: "Hoodie", code: "HOD" },
  { name: "Poster", code: "POS" },
  { name: "T-Shirt", code: "TSS" },
  { name: "All", code: "ALL" },
];

export default function ProductUpdate() {
  const { id } = useParams();
  const { productDetail } = loadProduct();
  const { getProductById, updateProductWithImage, deleteProductById } =
    updateProduct();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    game: "",
    genre: "",
    type: "",
    price: "",
    quantity: "",
    discount: "",
    image: null,
    rating: "",
    code: "",
    featured: false,
    soldAmount: 0,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const printt = () => {
    console.log("formData", formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageRemove = () => {
    setFormData({ ...formData, image: null });
    setImagePreview(null);
  };

  const handelFeatureCheck = () => {
    setFormData({ ...formData, featured: !formData.featured });
  };

  const handelOptionSelect = (event) => {
    const value = event.target.value;
    const tempCode =
      codeOptions.find((item) => item.name === value)?.code || "";
    setFormData({ ...formData, type: value, code: tempCode });
  };

  const deleteProduct = () => {
    deleteProductById(id);
    navigate("/dashboard/product/list");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataCopy = { ...formData };
    delete formDataCopy.image;
    const newFormData = new FormData();
    let reportRequestBlob;
    if (formData.image == null) {
      delete formDataCopy.image;
      let reportRequestBlob = new Blob([JSON.stringify(formDataCopy)], {
        type: "application/json",
      });
      newFormData.append("productData", reportRequestBlob, "data.json");
      updateProductWithImage(formDataCopy, false, formData.id);
    } else {
      reportRequestBlob = JSON.stringify(formDataCopy);
      newFormData.append("image", formData.image);
      newFormData.append("productData", reportRequestBlob);
      updateProductWithImage(newFormData, true, formData.id);
    }
  };

  useEffect(() => {
    getProductById(id);
  }, []);

  useEffect(() => {
    setFormData({
      id: productDetail ? productDetail.id : "",
      imageUrl: productDetail ? productDetail.imageUrl : "",
      title: productDetail ? productDetail.title : "",
      description: productDetail ? productDetail.description : "",
      game: productDetail ? productDetail.game : "",
      genre: productDetail ? productDetail.genre : "",
      type: productDetail ? productDetail.type : "",
      price: productDetail ? productDetail.price : "",
      quantity: productDetail ? productDetail.quantity : "",
      discount: productDetail ? productDetail.discount : "",
      image: null,
      rating: productDetail ? productDetail.rating : "",
      code: productDetail ? productDetail.code : "",
      featured: productDetail ? productDetail.featured : false,
      soldAmount: productDetail ? productDetail.soldAmount : "",
    });
    setImagePreview(productDetail ? productDetail.imageUrl : null);
  }, [productDetail]);

  return (
    <div className="p-6 bg-[#f9f9f9] h-full  overflow-auto ">
      <div className="bor w-2/3">
        <h2 className="text-2xl font-semibold mb-4">Upload Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            className="borx2"
            placeholder="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <Textarea
            className="borx2 h-[200px] resize-none"
            placeholder="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Input
            className="borx2"
            placeholder="Game"
            name="game"
            value={formData.game}
            onChange={handleChange}
            required
          />
          <Input
            className="borx2"
            placeholder="Genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
          <div className="flex justify-between gap-4 bor">
            <div className="flex flex-1 px-3 rounded-md borx2 ">
              <select
                name="onChange"
                className={`w-full ${
                  formData.type == "" ? "text-stone-400" : "text-stone-900"
                }`}
                onInput={handelOptionSelect}
                required
              >
                <option
                  className="flex items-center px-3  h-full w-full text-stone-900"
                  value=""
                >
                  Select an option
                </option>
                {typeOptions.map((option) => (
                  <option
                    className="flex items-center px-3 h-full w-full text-stone-900"
                    key={option}
                    value={option}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-1 bor">
              <Input
                type="number"
                className="borx2"
                placeholder="Quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-1 items-center gap-2 bor">
              <Checkbox
                id="featureCheckbox"
                checked={formData.featured}
                onCheckedChange={handelFeatureCheck}
              />
              <label
                htmlFor="featureCheckbox"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Feature
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <Input
              type="number"
              className="borx2 w-[300px]"
              placeholder="Price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <Input
              type="number"
              className="borx2 w-[300px]"
              placeholder="Discount (%)"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="border p-3 rounded-lg text-center bg-[#F4EAE6] border-stone-600">
            {!imagePreview ? (
              <label className="py-8 cursor-pointer flex flex-col items-center text-stone-700 border-2 rounded-md border-stone-700 border-dashed">
                <UploadCloud className="w-10 h-10 mb-2" />
                <span className="text-sm">Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Uploaded"
                  className="w-full h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                  onClick={handleImageRemove}
                >
                  <X size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-4 bor">
            <Button
              type="submit"
              className="transition duration-300 px-16 py-5 bg-[#A1C3D1] text-[#3D3B40] border border-[#A3E4DB] hover:border-stone-500 hover:text-white hover:bg-[#A1C3D1] cursor-pointer"
            >
              Submit
            </Button>
            <div
              className="transition duration-300 px-16 py-2 rounded-md bg-[#FF6961] text-[#fff] border border-[#CC4E4A] hover:border-stone-500 hover:text-white hover:bg-[#CC4E4A] cursor-pointer"
              onClick={deleteProduct}
            >
              Delete
            </div>
            <div className="borx px-10 py-2 none" onClick={printt}>
              print
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
