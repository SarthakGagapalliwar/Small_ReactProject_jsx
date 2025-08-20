import { useProducts } from "../context/product-context";

function ProductList() {
  const { loading, productList } = useProducts();
//   console.log(loading, productList);

  return (
    <div className="flex flex-col items-center pt-[80px] min-h-screen bg-gray-50 px-6">
      <h1 className="text-3xl font-bold mb-8">Product Listing  (Context API)</h1>

      {loading ? (
        <p className="text-lg text-gray-600 animate-pulse">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
          {productList.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
            >
              <img
                src={p.thumbnail}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {p.title}
                </h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                  {p.description}
                </p>
                <p className="text-red-500 font-bold mt-2">₹{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default ProductList;
