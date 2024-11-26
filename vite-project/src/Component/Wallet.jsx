
import React, { useState, useContext, useEffect } from 'react';
import { FaWallet } from "react-icons/fa";
import Offers from '../Image/gift (1).png';
import { StateContext } from './StateContext';
import Razorpay from 'razorpay';
import axios from 'axios';
import brand from '../Image/Frame 1 1.png';
const brandBase64 = 'data:image/png;base64,.....';
import { useApi } from './ApiContext';



export default function Wallet() {
  
  const [inputValue, setInputValue] = useState('');
  const [inputPromo, setInputPromo] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [paymentfailure, setPaymentfailure] = useState(false);

  const { timeZone, otpData, otpDataf,   showWallet } = useContext(StateContext);
      const { currentBalance, fetchWalletData } = useApi();

  useEffect(() => {
    if (showWallet) {
       fetchWalletData();
      
    }
  }, [showWallet, fetchWalletData]);

 
 useEffect(() => {

  if (currentBalance) {
    console.log(currentBalance);
  }
}, [currentBalance]);
  
 

  const handleInputChange = (e) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (value === '' || regex.test(value)) {
      setInputValue(value);
    }
  };

  const handleMoneyClick = (amount) => {
    setInputValue(amount.toString());
  };

  const handlePromoInputChange = (e) => {
    setInputPromo(e.target.value);
  };

  const handleApplyPromo = () => {
    console.log(`Applying promo code: ${inputPromo}`);
  };

  const handlePaymentSuccess = () => {
    setPaymentSuccess(true);
  };
  const handlePaymentFailure = () => {
    setPaymentfailure(true);
  };
  
  const handleProceedToPay = async () => {
    if (!inputValue || isNaN(inputValue) || parseFloat(inputValue) <= 0) {
      alert('Please enter a valid amount');
      return;
    }
    
   const test = 'rzp_live_eCV2t4ys71buLR';
   //const test = 'rzp_test_NxfiEhEy2UzrFS';
  
    const rechargeAmount = parseFloat(inputValue);
    const gst = 0.18;
    const taxes = rechargeAmount * gst;
    const totalPayable = rechargeAmount + taxes;
  
    const formData = {
      userId: otpData.data.id,
      amount: rechargeAmount,
      gst: taxes,
      discount: 0,
    };
  
    const url = new URL('https://');
    const params = {
      customerId: formData.userId,
      rechargeAmount: formData.amount,
      taxAmount: formData.gst,
      timeZone: timeZone,
      offerId: -1,
      discount: formData.discount,
      platformType: 'WEBSITE',
      finalAmount: formData.amount,
    };
    
  
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
    try {
      const response = await axios.post(url, {}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer`,
          'Id': formData.userId,
        }
      });
      console.log(response.data.status)
  
      if (response.data.status === 'success') {
        console.log('Payment successful');
        const paymentIdFromResponse = response.data.data.paymentId;
        setPaymentId(paymentIdFromResponse);
        console.log('paymentId', paymentIdFromResponse);

       
        const options = {
          key: test,
          amount: totalPayable * 100, // Amount in paise
          currency: 'INR',
          name: 'VakilTalk',
          description: 'Recharge Wallet',
          notes: {
            "user_id": formData.userId,
            "astro_order_id":paymentIdFromResponse
          },
          //image: brandBase64, 
          // order_id: response.data.data.paymentId, 
          handler: function (response) {
            console.log(response);
            console.log('Razorpay payment success', response);
            const txID = response.razorpay_payment_id; // Payment ID from Razorpay
            const paymentGatewayTxID = response.razorpay_order_id;
            console.log('Transaction ID:', txID);
            console.log('Order ID:', paymentGatewayTxID);
            axios.post(`https://?paymentId=${paymentIdFromResponse}&paymentStatus=COMPLETED&razorPayTransactionId=${txID}`, {
              paymentId:  paymentIdFromResponse ,
                 paymentStatus: 'COMPLETED',
              razorPayTransactionId:txID ,
              
            }, {
              headers: {
                'Authorization': `Bearer `,
                'Content-Type': 'application/json',
                'Id': formData.userId,
              }
            }).then(response => {
              if (response.data.status === 'success') {
                handlePaymentSuccess();
              } else {
                handlePaymentFailure();
              }
            })
            .catch(error => {
              console.error('Error completing payment:', error);
            });
          },
          prefill: {
            name: otpDataf.data.name,
            email: otpDataf.data.email,
            contact: otpDataf.data.mobileNo,
          },
          theme: {
            color: '#2E2EFF',
          },
        
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
  
      } else {
        console.log('Payment failed');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };
  
  
  const money = [
    { name: 100 }, { name: 200 }, { name: 250 },
    { name: 400 }, { name: 500 }, { name: 1000 },
    { name: 1500 }, { name: 2000 }, { name: 5000 },
    { name: 10000 }
  ];

  const rechargeAmount = parseFloat(inputValue) || 0;
  const gst = 0.18;
  const taxes = rechargeAmount * gst;
  const totalPayable = rechargeAmount + taxes;

  return (
    <div className='flex'>
      <div>
        <div className='m-3 w-auto bg-blue-500 bg-opacity-30 p-2 rounded-lg h-auto grid grid-flow-col gap-8 shadow-lg'>
          <div className='flex m-3 gap-8'>
            <FaWallet style={{ color: "blue", height: "100px", width: "100px" }} />
            <div className='flex flex-col gap-2'>
              <p className='font-poppins font-semibold text-2xl text-loblue'>₹{currentBalance.toFixed(2)}</p>
              <p className='font-poppins font-semibold text-xl text-black'>Current Wallet balance</p>
            </div>
          </div>

          <div className='flex flex-col items-end justify-between'>
            <img className='w-12 h-12 mr-14' src={Offers} alt='offers' />
            <button className='text-blue-500 border-blue-700 border-2 rounded-lg p-2 font-semibold hover:text-white hover:bg-loblue mb-2 shadow-md'>
              Cashback & Offers
            </button>
          </div>
        </div>
        <div className=''>
          <h1 className='text-2xl font-poppins text-black m-6 text-pretty underline underline-offset-8'>
            Choose Funds to Add
          </h1>

          <input
            className='w-full max-w-xs h-10 p-2 rounded-lg border bg-white border-black m-6 focus:border-blue-500 focus:outline-none font-medium'
            type='text'
            placeholder='Enter the amount'
            value={inputValue}
            onChange={handleInputChange}
          />

          <div className='flex flex-wrap m-2'>
            {money.map((item, index) => (
              <p
                key={index}
                className='border-2 border-gray-300 m-4 p-2 text-center rounded-lg bg-blue-500 w-24 bg-opacity-30 shadow-md font-poppins text-xl font-normal text-gray-700 hover:bg-blue-100 hover:text-blue-600 cursor-pointer'
                onClick={() => handleMoneyClick(item.name)}
              >
                ₹ {item.name}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className='m-3'>
          <div className='ml-6 border-2 border-grey p-3 rounded-lg shadow-md mr-6'>
            <h1 className='text-xl font-poppins font-semibold mb-2 text-gray-600'>Have a Promo Code?</h1>
            <div className='flex items-center gap-2'>
              <input
                placeholder='Enter a Coupon Code'
                value={inputPromo}
                className='w-full max-w-xs h-10 p-2 rounded-lg border bg-white border-black focus:border-blue-500 focus:outline-none font-medium'
                onChange={handlePromoInputChange}
              />
              <button
                className='bg-blue-500 text-white border-2 border-blue-500 rounded-lg p-2 font-semibold hover:bg-blue-600 shadow-md'
                onClick={handleApplyPromo}
              >
                Apply
              </button>
            </div>
          </div>
          <div className='m-6 p-4 bg-white border border-gray-300 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-4'>Payment Summary</h2>

            <div className='flex justify-between border-b border-gray-200 pb-2 mb-2'>
              <p className='text-lg font-medium'>Recharge Amount</p>
              <p className='text-lg font-medium'>₹ {rechargeAmount.toFixed(2)}</p>
            </div>

            <div className='flex justify-between border-b border-gray-200 pb-2 mb-2'>
              <p className='text-lg font-medium'>Taxes (GST@18%)</p>
              <p className='text-lg font-medium'>₹ {taxes.toFixed(2)}</p>
            </div>

            <div className='flex justify-between border-b border-gray-200 pb-2 mb-2'>
              <p className='text-lg font-medium'>Total Payable Amount</p>
              <p className='text-lg font-medium'>₹ {totalPayable.toFixed(2)}</p>
            </div>

            <div className='flex justify-between border-b border-gray-200 pb-2 mb-2'>
              <p className='text-lg font-medium'>Amount you will receive in wallet</p>
              <p className='text-lg font-medium'>₹ {rechargeAmount.toFixed(2)}</p>
            </div>

            <p className='text-sm font-medium text-gray-600'>
              * Recharge amount will be added to your wallet after successful payment.
            </p>

            <div className='flex justify-end'>
              <button
                className='bg-blue-500 text-white border-2 border-blue-500 rounded-lg p-2 font-semibold hover:bg-blue-600 mt-4 shadow-md'
                onClick={handleProceedToPay}
              >
                Proceed to Pay
              </button>
            </div>

            {paymentSuccess && (
               
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold mb-4">Payment Successful!</h2>
                  <p>Your payment has been processed successfully.</p>
                  
                    <button
                      className="bg-blue-500 text-white p-2 rounded-lg mt-4"
                      onClick={() => setPaymentSuccess(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
              {paymentfailure && (
               
               <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                 <div className="bg-white p-6 rounded-lg shadow-lg">
                   <h2 className="text-2xl font-bold mb-4 text-red-600">Payment Cancelled!</h2>
                 <p>Your payment has been Cancelled!!.</p>
                 
                   <button
                     className="bg-blue-500 text-white p-2 rounded-lg mt-4"
                     onClick={() => setPaymentfailure(false)}
                   >
                     Close
                   </button>
                 </div>
               </div>
             )}
              
           
          </div>
        </div>
      </div>
    </div>
  );
}
