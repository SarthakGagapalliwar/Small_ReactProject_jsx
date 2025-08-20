import { useEffect, useState } from "react";
import { categoryTree } from "../config";

function FllatArray() {
  const [flatCategories, setFlatCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const flattenCategories = (categories) => {
    const result = [];

    const processCategory = (category) => {
      const { children, ...categoryWithoutChildren } = category;
      result.push(categoryWithoutChildren);

      if (children && children.length > 0) {
        for (const childItem of children) {
          processCategory(childItem);
        }
      }
    };

    for (const singleCategory of categories) {
      processCategory(singleCategory);
    }

    return result;
  };

  useEffect(() => {
    const result = flattenCategories(categoryTree);
    console.log(result);
    setFlatCategories(result);
  }, []);

  // ✅ handle select change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div className="flex flex-col items-center pt-[155px] min-h-screen bg-gray-50">
      <h1 className="text-xl font-bold mb-4">Flat Array Without Array.flat()</h1>

      <select
        value={selectedCategory}
        onChange={handleCategoryChange}
        className="border p-2 rounded-md"
      >
        <option value="all">All categories</option>
        {flatCategories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      <p className="mt-4">
        Selected Category: <strong>{selectedCategory}</strong>
      </p>
    </div>
  );
}
export default FllatArray;
