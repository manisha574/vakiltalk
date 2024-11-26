import React, { createContext, useState, useEffect } from 'react';
export const StateContext = createContext();

export const StateProvider = ({ children }) => {
  // Function to get the value from localStorage or default if not available
 const getLocalStorageValue = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);

  // Check if storedValue is valid (string and not "undefined")
  if (storedValue === null) {
    return defaultValue; // Return default value if key doesn't exist
  }

  try {
    // Try parsing the stored value, if it fails, return default value
    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Error parsing value for ${key}:`, error);
    return defaultValue; // Return default value if parsing fails
  }
};


  // State initialization
  const storedProfileVisible = sessionStorage.getItem('profileVisible') === 'true';
  const storedSelectedLawyer = JSON.parse(sessionStorage.getItem('selectedLawyer'))
  const [timeZone, setTimeZone] = useState(getLocalStorageValue('timeZone', ''));
  const [isSuccess, setIsSuccess] = useState(getLocalStorageValue('isSuccess', false));
  const [clicked, setIsClicked] = useState(getLocalStorageValue('clicked', true));
  const [otp, setOtp] = useState(getLocalStorageValue('otp', ''));
  const [timer, setTimer] = useState(getLocalStorageValue('timer', 0));
  const [isResendDisabled, setIsResendDisabled] = useState(getLocalStorageValue('isResendDisabled', true));
  const [id_1, setId] = useState(getLocalStorageValue('id_1', ''));
  const [logged, setLogged] = useState(getLocalStorageValue('logged', false));
  const [otpData, setOtpData] = useState(getLocalStorageValue('otpData', null));
  const [signUpData, setSignUpData] = useState(getLocalStorageValue('signUpData', { contactno: "", countryCode: "" }));
  const [showToast, setShowToast] = useState(getLocalStorageValue('showToast', false));
  const [isVisible, setIsVisible] = useState(getLocalStorageValue('isVisible', false));
  const [isALoginVisible, setIsALoginVisible] = useState(getLocalStorageValue('isALoginVisible', false));
  const [showTalkto, setShowTalkto] = useState(getLocalStorageValue('showTalkto', false));
  const [showBlogs, setShowBlogs] = useState(getLocalStorageValue('showBlogs', false));
  const [showTestimonials, setShowTestimonials] = useState(getLocalStorageValue('showTestimonials', false));
  const [showDesign, setShowDesign] = useState(getLocalStorageValue('showDesign', false));
  const [showWallet, setShowWallet] = useState(getLocalStorageValue('showWallet', false));
  const [currentBalance, setCurrentBalance] = useState(78);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [sortBy, setSortBy] = useState([]);
  const [selectedSortOptions, setSelectedSortOptions] = useState([]);
   const [showChat, setShowChat] = useState(false);
  const [otpDataf, setOtpDataf] = useState(getLocalStorageValue('otpDataf', null));
  const [showtransaction, setshowtransaction] = useState(getLocalStorageValue('showtransaction', false));
       const [isLoading, setIsLoading] = useState(false);
  const [lawyerKey, setLawyerKey] = useState(null); // Add this line
  const [autofilldata, setAutofillData] = useState(null);
      const [lawyers, setLawyers] = useState([]);
        const [wait, setwait] = useState(false);
  const [showedit, setshowedit] = useState(getLocalStorageValue('showedit', false));


  const [getcalldata, setgetcalldata] = useState(null);
  const [formresponse, setformresponse] = useState();
  const [chatorderId, setchatorderId] = useState();
  const [profileVisible, setProfileVisible] = useState(storedProfileVisible || false);
  const [selectedLawyer, setSelectedLawyer] = useState(storedSelectedLawyer || null);
  const [profilePic, setProfilePic] = useState(getLocalStorageValue('profilePic', null)); // State for profile picture
const [customername, setcustname] = useState(getLocalStorageValue('customername', null));




  // useEffect(() => {
  //   localStorage.setItem('profile', JSON.stringify(profileVisible))
  // }, [profileVisible]);
  // useEffect(() => {
  //   localStorage.setItem('selected', JSON.stringify(selectedLawyer))
  // }, [selectedLawyer]);

  useEffect(() => {
    localStorage.setItem('timeZone', JSON.stringify(timeZone));
  }, [timeZone]);

  useEffect(() => {
    localStorage.setItem('isSuccess', JSON.stringify(isSuccess));
  }, [isSuccess]);

  useEffect(() => {
    localStorage.setItem('clicked', JSON.stringify(clicked));
  }, [clicked]);

  useEffect(() => {
    localStorage.setItem('otp', JSON.stringify(otp));
  }, [otp]);

  useEffect(() => {
    localStorage.setItem('timer', JSON.stringify(timer));
  }, [timer]);

  useEffect(() => {
    localStorage.setItem('isResendDisabled', JSON.stringify(isResendDisabled));
  }, [isResendDisabled]);

  useEffect(() => {
    localStorage.setItem('id_1', JSON.stringify(id_1));
  }, [id_1]);

  useEffect(() => {
    localStorage.setItem('logged', JSON.stringify(logged));
  }, [logged]);
  useEffect(() => {
    localStorage.setItem('otpDataf', JSON.stringify(otpDataf))
  }, [otpDataf]);

  useEffect(() => {
    localStorage.setItem('otpData', JSON.stringify(otpData));
  }, [otpData]);

  useEffect(() => {
    localStorage.setItem('signUpData', JSON.stringify(signUpData));
  }, [signUpData]);

  useEffect(() => {
    localStorage.setItem('showToast', JSON.stringify(showToast));
  }, [showToast]);

  useEffect(() => {
    localStorage.setItem('isVisible', JSON.stringify(isVisible));
  }, [isVisible]);

  useEffect(() => {
    localStorage.setItem('isALoginVisible', JSON.stringify(isALoginVisible));
  }, [isALoginVisible]);

  useEffect(() => {
    localStorage.setItem('showTalkto', JSON.stringify(showTalkto));
  }, [showTalkto]);

  useEffect(() => {
    localStorage.setItem('showBlogs', JSON.stringify(showBlogs));
  }, [showBlogs]);

  useEffect(() => {
    localStorage.setItem('showTestimonials', JSON.stringify(showTestimonials));
  }, [showTestimonials]);

  useEffect(() => {
    localStorage.setItem('showDesign', JSON.stringify(showDesign));
  }, [showDesign]);

  useEffect(() => {
    localStorage.setItem('showWallet', JSON.stringify(showWallet));
    
  }, [showWallet]);
  
  useEffect(() => {
    localStorage.setItem('showtransaction', JSON.stringify(showtransaction));
    
  }, [showtransaction]);
  useEffect(() => {
    localStorage.setItem('showedit', JSON.stringify(showedit));
    
  }, [showedit]);
   
  useEffect(() => {
    localStorage.setItem('profilePic', JSON.stringify(profilePic));
}, [profilePic]);

useEffect(() => {
    localStorage.setItem('customername', JSON.stringify(customername));
}, [customername]);

  // Reset state when logging out or isVisible changes to false
  useEffect(() => {
    if (logged === false) {
      resetStateOnLogout();
    }
  }, [logged]);
   useEffect(() => {
        sessionStorage.setItem('profileVisible', profileVisible);
        if (selectedLawyer) {
            sessionStorage.setItem('selectedLawyer', JSON.stringify(selectedLawyer));
        }
    }, [profileVisible, selectedLawyer]);

  useEffect(() => {
    
    if (isVisible === false && logged === false) {
      resetStateOnLogout();
    } else if (isVisible === false && logged === true) {
      closelogin();
    }
  }, [isVisible, logged]); // Include both `isVisible` and `logged` in the dependency array
  
  const closelogin = () => {
 
   
    setIsClicked(true);
    setOtp('');
    setTimer(0);
    setIsResendDisabled(true);
    

   
    // setShowToast(false);
   
    // setShowTalkto(false);
    // setShowBlogs(false);
    // setShowTestimonials(false);
    // setShowDesign(false);
    // setShowWallet(false);
    
     
   }
  const resetStateOnLogout = () => {
    setTimeZone('');
    setIsSuccess(false);
    setIsClicked(true);
    setOtp('');
    setTimer(0);
    setIsResendDisabled(true);
    setId('');
    setOtpData(null);
    setSignUpData({ contactno: "", countryCode: "" });
    setShowToast(false);
    setIsVisible(false);
    setIsALoginVisible(false);
    setShowTalkto(false);
    setShowBlogs(false);
    setShowTestimonials(false);
    setShowDesign(false);
    setShowWallet(false);
    setSelectedLawyer(null);
    setProfileVisible(false);
    setshowedit(false);
    // Clear specific localStorage items
    localStorage.removeItem('timeZone');
    localStorage.removeItem('isSuccess');
    localStorage.removeItem('clicked');
    localStorage.removeItem('otp');
    localStorage.removeItem('timer');
    localStorage.removeItem('isResendDisabled');
    localStorage.removeItem('id_1');
    localStorage.removeItem('otpData');
    localStorage.removeItem('signUpData');
    localStorage.removeItem('showToast');
    localStorage.removeItem('showTalkto');
    localStorage.removeItem('showBlogs');
    localStorage.removeItem('showTestimonials');
    localStorage.removeItem('showDesign');
    localStorage.removeItem('showWallet');
    localStorage.removeItem('selectedLawyer');
    localStorage.removeItem(' profileVisible'); 
        localStorage.removeItem(' showedit');

  };

  return (
    <StateContext.Provider value={{
      timeZone, setTimeZone,
      isSuccess, setIsSuccess,
      clicked, setIsClicked,
      otp, setOtp,
      timer, setTimer,
      isResendDisabled, setIsResendDisabled,
      id_1, setId,
      logged, setLogged,
      otpData, setOtpData,
      signUpData, setSignUpData,
      showToast, setShowToast,
      isVisible, setIsVisible,
      isALoginVisible, setIsALoginVisible,
      showTalkto, setShowTalkto,
      showBlogs, setShowBlogs,
      showTestimonials, setShowTestimonials,
      showDesign, setShowDesign,
      isDropdownVisible, setIsDropdownVisible,
      showWallet, setShowWallet,
      sortBy, setSortBy,
      selectedSortOptions, setSelectedSortOptions,
      profileVisible, setProfileVisible,
      otpDataf, setOtpDataf,
      currentBalance, setCurrentBalance,
      showtransaction, setshowtransaction,
      isLoading, setIsLoading,
       lawyerKey,         
      setLawyerKey,
      autofilldata, setAutofillData,
      lawyers, setLawyers,
          wait, setwait,
      selectedLawyer, setSelectedLawyer,
      getcalldata, setgetcalldata,
      formresponse, setformresponse,
      chatorderId, setchatorderId,
      showChat, setShowChat,
      showedit, setshowedit,
      profilePic, setProfilePic,
      customername, setcustname
 
    }}>
      {children}
    </StateContext.Provider>
  );
};
