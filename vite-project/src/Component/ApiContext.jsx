import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { StateContext } from './StateContext';

const ApiContext = createContext();

export const useApi = () => useContext(ApiContext);

export const ApiProvider = ({ children }) => {
  const [currentBalance, setCurrentBalance] = useState(0);
  const { showWallet, otpData } = useContext(StateContext); // Corrected usage

  const fetchWalletData = async () => {
    try {
      const response = await axios.get('https://testapi.astroapp.live:8082/astrologyapp/api/v1/customers/get/wallet/transaction', {
        params: {
          pageNo: 0, // Example page number, adjust as needed
          customerId: otpData.data.id,
          pageSize: 12,
          projectId: 3,
        },
        headers: {
          'Authorization': `Bearer ***`,
          'Content-Type': 'application/json',
          'Id': otpData.data.id,
        },
      });

      console.log('Wallet transactions:', response.data.availableBalance);
      if (response.data && response.data.hasOwnProperty('availableBalance')) {
        setCurrentBalance(response.data.availableBalance);
      }
    } catch (error) {
      console.error('Error fetching wallet transactions:', error);
    }
  };

  useEffect(() => {
    if (showWallet) {
      fetchWalletData();
    }
  }, [showWallet]);
  

  return (
    <ApiContext.Provider value={{ currentBalance, fetchWalletData }}>
      {children}
    </ApiContext.Provider>
  );
};
