import {useState, useEffect} from 'react';
import axios from 'axios';
import Ip from '../constants/ipAddress';
export default function useFectch() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const fetchData = async () => {
    setIsLoading(true);
    await axios
      .get(`http://${Ip}:3000/api/products/`)
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setFetchError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const reFetch = () => {
    setIsLoading(true);
    fetchData();
  };
  return {products, isLoading, fetchError, reFetch};
}
