import { createContext, useContext, useEffect, useState } from "react";

const productContext = createContext(null);

const ProductProvider = ({children})=>{


    const [loading, setLoading]=useState(false);
    const [productList,setProductList]=useState([]);

    async function fetchListOfProduct() {
        setLoading(true)
        const apiresponce= await fetch('https://dummyjson.com/products')
        const result =await apiresponce.json();

        if(result){
            setProductList(result?.products)
            setLoading(false)
        }else{
            setLoading(false)
            setProductList([])
        }
    }

    useEffect(()=>{
        fetchListOfProduct()
    },[])



//productContext.Provider → A special React component that provides values (state/data) to all child components.
    return <productContext.Provider
        value={{loading,productList}}
    >
        {children}
    </productContext.Provider>
}

export const useProducts = () =>useContext(productContext);

export default ProductProvider;
