import {createContext, useContext, useEffect, useState} from 'react';
import axios from 'axios';
import Ip from '../constants/ipAddress';

const productsContext = createContext();
const ProductsProvider = ({children}) => {
  const [productsData, setProductsData] = useState({
    products: [],
    isLoading: true,
  });
  const [fetchProductsError, setFetchProductsError] = useState(null);
  const FetchProducts = async () => {
    console.log('Fetching products...');
    await axios
      .get(`http://${Ip}:3000/api/products/`)
      .then(response => {
        setProductsData({
          products: response.data,
          isLoading: false,
        });
      })
      .catch(error => {
        setFetchProductsError(error);
      })
      .finally(() => {
        console.log('Products fetched!');
      });
  };
  useEffect(() => {
    FetchProducts();
  }, []);
  const reFetchProducts = () => {
    setProductsData({
      products: [],
      isLoading: true,
    });
    FetchProducts();
  };
  const data = {
    products: productsData.products,
    isLoadingProducts: productsData.isLoading,
    fetchProductsError,
    reFetchProducts,
  };

  return (
    <productsContext.Provider value={data}>{children}</productsContext.Provider>
  );
};

export {productsContext, ProductsProvider};
