import { useQuery } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

const getData = async () => {
  const res = await fetch("https://fakestoreapi.com/products").then((res) => res.json());
  return res;
};

const Product = ({ setSession }: { setSession: Dispatch<SetStateAction<string | null>> }) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: async () => await getData(),
  });

  return (
    <div className="container w-full px-4 py-12 mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Product</h1>
        <button onClick={() => setSession(null)} className="px-4 py-2 text-sm font-semibold text-white bg-gray-500 rounded-md">
          Logout
        </button>
      </div>

      {!isError ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {isLoading ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={`skeleton-${i}`} className="w-full bg-gray-200 rounded-lg animate-pulse h-80"></div>
              ))}
            </>
          ) : (
            <>
              {data.map((product: { id: number; title: string; image: string; price: number }) => (
                <div key={`product=${product.id}`} className="flex flex-col items-center p-4 pt-8 border border-gray-200 rounded-lg">
                  <img src={product.image} alt={product.title} className="h-32" />
                  <p className="w-full mt-4 text-sm text-center truncate">{product.title}</p>
                  <hr className="w-full my-4 border-gray-200" />
                  <div className="flex items-center justify-between w-full">
                    <p className="text-xl font-semibold">${product.price}</p>
                    <button className="flex justify-center px-4 py-2 text-sm font-semibold text-white bg-teal-600 rounded-md hover:bg-teal-700 w-fit">Buy</button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-32 text-3xl text-gray-700 bg-gray-200 rounded-lg">Product Not Found</div>
      )}
    </div>
  );
};

export default Product;
