import { useState } from "react";
import { X, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const typeOptions = ["Bag", "Figurine", "Hat", "Hoodie", "Poster", "T-Shirt"];

export default function ProductAdd() {
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
  });
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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

          <div className="flex gap-4">
            <Select
              className="w-[300px]"
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger className="borx2 w-[300px]">
                <SelectValue placeholder="Select Type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              className="borx2 w-[300px]"
              placeholder="Quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
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

          <div className="flex">
            <Button
              type="submit"
              className="transition duration-300 px-20 py-5 bg-[#A1C3D1] text-[#3D3B40] border border-[#A3E4DB] hover:border-stone-500 hover:text-white hover:bg-[#A1C3D1] cursor-pointer"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
