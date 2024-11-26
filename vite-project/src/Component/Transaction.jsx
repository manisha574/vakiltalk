import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StateContext } from './StateContext';
import { FaWallet } from 'react-icons/fa';
import { FcMoneyTransfer } from 'react-icons/fc';
import Wallet from './Wallet';
import { useApi } from './ApiContext';

export default function Transaction() {
    const { otpData, setShowWallet } = useContext(StateContext);
    const [transactions, setTransactions] = useState([]);
    const [chat, setchat] = useState([]);
    const [activeFeature, setActiveFeature] = useState('recharge'); // Default to 'recharge'
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { currentBalance, fetchWalletData } = useApi();

    useEffect(() => {
        if (activeFeature === 'recharge') {
            fetchWalletTransactions();
        } else if (activeFeature === 'chatHistory') {
            fetchChatTransactions();
        }
        // Fetch wallet data initially
        fetchWalletData();
    }, [activeFeature, fetchWalletData]);

    const fetchWalletTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://testapi.astroapp.live:8082/astrologyapp/api/v1/customers/get/wallet/transaction', {
                params: {
                    customerId: otpData.data.id,
                    pageSize: 5,
                    pageNo: 0,
                },
                headers: {
                    'Authorization': `Bearer ${otpData.data.authToken}`,
                    'Content-Type': 'application/json',
                    'Id': otpData.data.id,
                }
            });
            setTransactions(response.data.data);
        } catch (error) {
            setError('Error fetching wallet transactions');
            console.error('Error fetching wallet transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchChatTransactions = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('https://prodapi.astroapp.live:8082/astrologyapp/api/v1/customers/get-chat-order-listing', {
                params: {
                    customerId: otpData.data.id,
                    pageSize: 5,
                    pageNo: 0,
                },
                headers: {
                    'Authorization': `Bearer ${otpData.data.authToken}`,
                    'Content-Type': 'application/json',
                    'Id': otpData.data.id,
                }
            });
            setchat(response.data.data);
        } catch (error) {
            setError('Error fetching chat transactions');
            console.error('Error fetching chat transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    const features = [
        { name: 'Recharge', action: 'recharge' },
        { name: 'Chat History', action: 'chatHistory' },
        { name: 'Call History', action: 'callHistory' },
        { name: 'Report Analysis History', action: 'reportAnalysisHistory' }
    ];

    const handleFeatureClick = (feature) => {
        setActiveFeature(feature);
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    return (
        <div>
            <div className='flex gap-8 m-5'>
                <div className='border-black rounded-10 shadow-md p-3 font-poppins text-black font-semibold text-2xl leading-loose w-1/4'>
                    <ul>
                        {features.map((feature, index) => (
                            <li
                                key={index}
                                onClick={() => handleFeatureClick(feature.action)}
                                className={`cursor-pointer p-2 rounded-md ${activeFeature === feature.action ? 'text-blue-500 bg-gray-100' : 'text-black'}`}
                            >
                                <h1 className='text-lg font-semibold'>{feature.name}</h1>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='border-black rounded-10 shadow-md p-3 font-poppins text-black font-semibold w-3/4'>
                    {loading && <p>Loading...</p>}
                    {error && <p className='text-red-500'>{error}</p>}
                    {activeFeature === 'recharge' && !loading && !error && (
                        <div className='flex flex-col gap-4 mb-5'>
                            <div className='flex justify-between items-center mb-4'>
                                <div className='flex items-center gap-4'>
                                    <FaWallet style={{ color: "blue", height: "75px", width: "75px" }} />
                                    <div className='flex flex-col'>
                                        <p className='font-poppins font-semibold text-3xl text-blue-600'>₹{currentBalance.toFixed(2)}</p>
                                        <p className='font-poppins font-semibold text-xl text-black'>Current Wallet Balance</p>
                                    </div>
                                </div>
                                <button className='bg-blue-500 text-white border-2 border-blue-500 rounded-lg p-2 font-semibold hover:bg-blue-700 shadow-md flex items-center gap-2' onClick={() => setShowWallet(true)}>
                                    Recharge Wallet <FcMoneyTransfer className='ml-2' />
                                </button>
                            </div>
                            <ul>
                                {transactions.length > 0 ? (
                                    transactions.map((transaction, index) => (
                                        <li key={index} className='border border-black rounded-md p-4 mb-4 bg-gray-50'>
                                            <div className='flex'>
                                                <h1 className='text-xl font-bold mb-2 inline'>Amount {transaction.expenseType === 'ADD' ? 'Added' : 'Spent'}: </h1>
                                                <p className={`text-xl font-semibold ${transaction.expenseType === 'ADD' ? 'text-green-500' : 'text-red-500'}`}> {transaction.expenseType === 'ADD' ? '+' : '-'}₹{transaction.transactionAmount}</p>
                                            </div>
                                            <div className='flex items-center'>
                                                <h1 className='text-xl font-bold mt-2 mb-2'>Transaction Date: </h1>
                                                <p className='text-lg font-medium ml-2'>{formatDate(transaction.transactionDate)}</p>
                                            </div>
                                            <div className='flex items-center'>
                                                <h1 className='text-xl font-bold mt-2 mb-2'>Description: </h1>
                                                <p className='text-lg font-medium ml-2'>{transaction.description}</p>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <p>No transactions available</p>
                                )}
                            </ul>
                        </div>
                    )}
                    {activeFeature === 'chatHistory' && !loading && !error && (
                        <div className='flex flex-col gap-4 mb-5'>
                            {/* Content for Chat History */}
                            {chat.length > 0 ? (
                                chat.map((chat, index) => (
                                    <li key={index} className='border border-black rounded-md p-4 mb-4 bg-gray-50'>
                                        <img src={`${chat.astrologerProfilePic}`} />
                                    </li>
                                ))
                            ) : (
                                <p>No chat transactions available</p>
                            )}
                        </div>
                    )}
                    {activeFeature !== 'recharge' && activeFeature !== 'chatHistory' && (
                        <p>Select a feature to view details</p>
                    )}
                </div>
            </div>
        </div>
    );
}
