
import React from "react";

const palettes = [
  {
    title: "Professional Dark Mode",
    colors: [
      "#1E1E2E",
      "#282A36",
      "#FF79C6",
      "#F8F8F2",
      "#50FA7B",
      "#F1FA8C",
      "#FF5555",
    ],
  },
  {
    title: "Soft Pastel Theme",
    colors: [
      "#A1C3D1",
      "#F4EAE6",
      "#D8A7B1",
      "#3D3B40",
      "#A3E4DB",
      "#F9D976",
      "#FF6961",
    ],
  },
  {
    title: "High Contrast & Vibrant",
    colors: [
      "#0D1117",
      "#161B22",
      "#FF6F61",
      "#F0F6FC",
      "#2EA043",
      "#FFD700",
      "#D73A49",
    ],
  },
  {
    title: "Sleek Material UI Style",
    colors: [
      "#1976D2",
      "#424242",
      "#FFC107",
      "#E0E0E0",
      "#4CAF50",
      "#FF9800",
      "#D32F2F",
    ],
  },
  {
    title: "Earthy & Minimalist",
    colors: [
      "#4E6E58",
      "#D9BF77",
      "#B5525C",
      "#FFF7EB",
      "#6A994E",
      "#F2C14E",
      "#E63946",
    ],
  },
];

const ColorPalette = () => {

  

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Color Palettes</h1>
      <div className="space-y-8">
        {palettes.map((palette, index) => (
          <div key={index} className="bg-stone-300 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {palette.title}
            </h2>
            <div className="grid grid-cols-7 gap-4">
              {palette.colors.map((color, i) => (
                <div className="flex flex-col gap-2">
                  <div
                    key={i}
                    className="h-16 w-16 rounded-lg shadow-md border"
                    style={{ backgroundColor: color }}
                    title={color}
                  ></div>
                  <div>{color}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
