import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { StateContext } from './StateContext';
import { FaRegUser, FaCamera } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import defaultProfilePic from '../Image/profile pic.png';



export default function Edit() {
  const { otpData,profilePic, setProfilePic , setcustname} = useContext(StateContext);
  const [customerData, setCustomerData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const [bprofile, setbrofile] = useState(true);
  const [dprofile, setdprofile] = useState(false);
  const [formData, setFormData] = useState({
      
    customerName: '',
    customerEmail: '',
    customerMobile: '',
    gender: '',
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    customerId: '',
    profilePic: '', // Add profilePic to the state

  });


  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`https://prodapi.astroapp.live:8082/astrologyapp/api/v1/customers/get-customer-detail?customerId=${otpData.data.id}`, {
          headers: {
            'Authorization': `Bearer ${otpData.data.authToken}`,
            'Content-Type': 'application/json',
            'Id': otpData.data.id,
          },
        });
        setCustomerData(response.data);

        const customerDetails = response.data.data;
        setFormData({
          customerName: customerDetails.customerName || '',
          customerEmail: customerDetails.customerEmail || '',
          customerMobile: customerDetails.customerMobile || '',
          gender: customerDetails.gender !== "null" ? customerDetails.gender : '',
          birthDate: customerDetails.birthDate || '',
          birthTime: customerDetails.birthTime !== "null" ? customerDetails.birthTime : '',
          birthPlace: customerDetails.birthPlace !== "null" ? customerDetails.birthPlace : '',
          customerId: otpData.data.id,

          
        });
        setProfilePic(customerDetails.customerProfilePic);
        setcustname(customerDetails.customerName);

      } catch (err) {
        setError('Failed to fetch customer details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [otpData]);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileName = file.name;  // Get the file name
      const fileExtension = fileName.split('.').pop();  // Extract the extension

      uploadProfilePic(file, fileExtension);
    }
  };
  const uploadProfilePic = async (file, fileExtension) => {
    const formData = new FormData(); // Create FormData instance
    formData.append('image', file); // Append the file
    formData.append('extension', fileExtension);

    try {
      const response = await axios.post(
        'https://prodapi.astroapp.live:8082/astrologyapp/image/upload',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${otpData.data.authToken}`,
            'Content-Type': 'multipart/form-data', // This is important for file uploads
            'Id': otpData.data.id,

          },
        }
      );
      console.log('Profile picture updated:', response.data);
      setProfilePic(response.data.data.file_url);

    } catch (err) {
      setError('Failed to upload profile picture. Please try again.');
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,

    }));
  };
  const queryParams = {
    customerName: formData.customerName,
    customerEmail: formData.customerEmail,
    customerMobile: formData.customerMobile,
    gender: formData.gender,
    birthDate: formData.birthDate,
    birthTime: formData.birthTime,
    birthPlace: formData.birthPlace,
    customerId: otpData.data.id, // Include CustomerId if required
    profilePic: profilePic,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post(`https://prodapi.astroapp.live:8082/astrologyapp/api/v1/customers/update-customer-profile`, {}, {
        params: queryParams,

        headers: {
          'Authorization': `Bearer ${otpData.data.authToken}`,
          'Content-Type': 'application/json',
          'Id': otpData.data.id,

        },
      });
       

      
    } catch (err) {
      setError('Failed to update customer details. Please try again.');
    }
  };
  const profileshow = () => {
    setbrofile(true); // Toggles the bProfile state
    setdprofile(false);
  };
  const deleteaccount = () => {
    // logic to delete the account
    console.log("Delete account button clicked"); 0
    setbrofile(false);
    setdprofile(true);
  };


  return (
    <>
         <div>
      <button className={`w-fit h-fit m-3 rounded-10 p-3  font-medium shadow-xl ${bprofile ? 'bg-blue-600 text-white p-3 m-3' : 'bg-white  border-blue-700 border-2'}`} onClick={profileshow}>My Profile</button>
      <button className={`w-fit h-fit m-3 rounded-10 p-3 font-medium shadow-xl  ${dprofile ? 'bg-blue-600 text-white ' : 'bg-white border-blue-700 border-2'}`} onClick={deleteaccount} >Delete Account</button>
    </div>
      {bprofile ? ( <div  className = 'm-3 p-2' >
 

  { error && <p className="text-red-500">{error}</p> }

  {
    loading ? (
      <p>Loading customer details...</p>
    ) : (
      customerData && (
                    
        <div className="bg-gray-100 shadow-md rounded-10 m-2 p-2">
          <div className="relative w-14 h-14 m-2">
            <img
              src={profilePic || defaultProfilePic}
              alt="Profile"
              className="rounded-full w-full h-full object-cover"
            />
            <label htmlFor="profilePic">
              <FaCamera className="absolute bottom-0 right-0 text-gray-500 cursor-pointer bg-white p-1 rounded-full" size={25} />
            </label>
            <input
              type="file"
              id="profilePic"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <form onSubmit={handleSubmit} className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4.">
            <div className="m-2 relative">
              <label htmlFor="fullName" className="text-base font-medium">Full Name</label>
              <div className="relative">
                <FaRegUser className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 justify-center m-2' size={25} />
                <input
                  type="text"
                  id="fullName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="border p-2 rounded w-full shadow-md border-l-4 border-l-customBlue pl-10"
                  required
                />
              </div>
            </div>
            <div className="m-2 relative">
              <label htmlFor="email" className="text-base font-medium">Email ID</label>
              <div className="relative">
                <MdEmail className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 justify-center m-2' size={25} />
                <input
                  type="email"
                  id="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="border p-2 rounded w-full shadow-md border-l-4 border-l-customBlue pl-10"
                  required
                />
              </div>
            </div>
            <div className="m-2">
              <label htmlFor="mobile" className="text-base font-medium">Enter Mobile No* </label>
              <input
                type="tel"
                id="mobile"
                name="customerMobile"
                value={formData.customerMobile}
                onChange={handleChange}
                className="border p-2 rounded w-full shadow-md border-l-4 border-l-customBlue"
                required
              />
            </div>
            <div className="m-2">
              <label htmlFor="gender" className="text-base font-medium">Select Gender</label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border p-2 rounded w-full shadow-md border-l-4 border-l-customBlue"
                required
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="m-2">
              <label htmlFor="dateOfBirth" className="text-base font-medium">Date of Birth (DD-MM-YYYY)</label>
              <input
                type="date"
                id="dateOfBirth"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="border p-2 rounded w-full shadow-md border-l-4 border-l-customBlue"
                required
              />
            </div>
            <div className="m-2">
              <label htmlFor="timeOfBirth" className="text-base font-medium">Time of Birth</label>
              <input
                type="time"
                id="timeOfBirth"
                name="birthTime"
                value={formData.birthTime}
                onChange={handleChange}
                className="border p-2 rounded w-full shadow-md border-l-4 border-l-customBlue"
              />
            </div>
            <div className="m-2 relative">
              <label htmlFor="placeOfBirth" className="text-base font-medium">Place of Birth</label>
              <div className="relative">
                <IoLocation className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 justify-center m-2' size={25} />

                <input
                  type="text"
                  id="placeOfBirth"
                  name="birthPlace"
                  value={formData.birthPlace}
                  onChange={handleChange}
                  className="border p-2 rounded w-full shadow-md border-l-4 border-l-customBlue pl-10"
                />
              </div>
            </div>
             
          </form>
          <button type="submit" className="mt-4 p-2 border-2 rounded-20 shadow-md m-2 hover:bg-gradient-to-b from-loblue to-liloblue hover:text-white" onClick={handleSubmit} >Update Details</button>
                        
        </div>
      )
    )
  }
      </div >) : (<div>
          <div className='m-3 ml-4 bg-slate-200 w-2/3 h-80 rounded-20'> <p className='text-gray-700 text-lg font-medium m-5 p-5'>Its really sad to see you go. Pls mention reason behind your request for account deletion.
          </p>
            <div className="flex justify-end  mr-32"> {/* Added flex and justify-end */}
        <button className='bg-blue-400 text-white font-normal p-3 rounded-20  hover:bg-blue-500 hover:shadow-lg'>
          Submit Request
        </button>
      </div>
          </div>
    </div>)}
   
   
    </>
  );
}
