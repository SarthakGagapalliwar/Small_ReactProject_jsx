import { useEffect, useState, useRef } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

function useDebounce(value, delay) {
  const [debounceValue, setDebounceValue] = useState(value);
  const handler = useRef(null);

  useEffect(() => {
    if (handler.current) clearTimeout(handler.current);

    handler.current = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      if (handler.current) clearTimeout(handler.current);
    };
  }, [value, delay]);

  return debounceValue;
}

function DebounceSearchWithApiCall() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedTerm = useDebounce(searchTerm, 500);

  async function fetchListOfProduct(term) {
    setIsLoading(true);
    try {
      const apiResponse = await fetch(
        `https://dummyjson.com/products/search?q=${term}`
      );
      const data = await apiResponse.json();

      if (data?.products) {
        setResult(data.products);
      } else {
        setResult([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setResult([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!debouncedTerm.trim()) {
      setResult([]);
      return;
    }
    fetchListOfProduct(debouncedTerm);
  }, [debouncedTerm]);

  return (
    <div className="flex flex-col items-center pt-[80px] min-h-screen bg-gray-50 px-6">
      <h1>Debounce Search With Api call</h1>

      <div className="mt-5 w-full max-w-md mx-auto">
        <Card>
          <CardHeader title="Product Search" />

          <CardContent className="space-y-4">
            <input
              type="text"
              placeholder="Search the product"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded border px-3 py-2"
            />

            {isLoading && <p>Loading...</p>}

            {!isLoading && result.length > 0 && (
              <ul className="list-disc pl-5">
                {result.map((item) => (
                  <li key={item.id}>{item.title}</li>
                ))}
              </ul>
            )}

            {!isLoading && !result.length && debouncedTerm && (
              <p>No products found</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default DebounceSearchWithApiCall;
