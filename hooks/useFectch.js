import {StyleSheet, Text, View} from 'react-native';
import {useState, useEffect} from 'react';
import axios from 'axios';
export default function useFectch() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchData = async () => {
    setIsLoading(true);
    await axios
      .get('http://192.168.1.4:3000/api/products/')
      .then(response => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
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
  return {data, isLoading, error, reFetch};
}

const styles = StyleSheet.create({});
