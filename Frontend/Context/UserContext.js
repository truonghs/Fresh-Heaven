import {createContext, useEffect, useState} from 'react';
const userContext = createContext();
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UserProvider = ({children}) => {
  const [userId, setUserId] = useState('');
  // const FetchUser = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('authToken');
  //     if (token) {
  //       const decodedToken = jwt_decode(token);
  //       const userId = decodedToken.userId;
  //       console.log('FetchUser: ', userId);
  //       setUserId(userId);
  //     }
  //   } catch (error) {
  //     console.log('token not exist!');
  //   }
  // };
  // useEffect(() => {
  //   FetchUser();
  // }, []);
  const reFetchUser = () => {
    setUserId('');
  };
  const clearUser = () => {};
  const data = {
    // reFetchUser,
    clearUser,
    userId,
    setUserId,
  };

  return <userContext.Provider value={data}>{children}</userContext.Provider>;
};

export {userContext, UserProvider};
