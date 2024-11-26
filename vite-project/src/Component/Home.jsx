import React, { useContext, useEffect } from 'react';
import SubH1 from './SubH1';
import SubH2data from './SubH2data';
import Footer from './Footer';
import Header from './Header';
import Fetchlawyer from './Fetchlawyer';
import Wallet from './Wallet'; // Import the Wallet component
import axios from 'axios'; // Ensure axios is imported
import { StateContext } from './StateContext';
import Transaction from './Transaction';
import Edit from './Edit';

export default function Home() {
  const {
    showTalkto,
    setShowTalkto,
    showBlogs,
    setShowBlogs,
    showTestimonials,
    setShowTestimonials,
    showDesign,
    setShowDesign,
    showWallet,
    setShowWallet,
    profileVisible, setProfileVisible,
    currentBalance, setCurrentBalance,
    otpData, // Ensure otpData is included here
    setshowtransaction,showtransaction,showedit,setshowedit
    
  } = useContext(StateContext);

  const handleShowTalkto = () => {
    if (!showTalkto) {
      setShowTalkto(true);
    } 
    else {
      setProfileVisible(false);
    }
    //else if (showTalkto && profileVisible) {
    //   setProfileVisible(true);
    // }

    setShowBlogs(false);
    setShowWallet(false);
    setShowTestimonials(false);
    setShowDesign(true);
    setshowtransaction(false);
    setshowedit(false);
    // Hide Wallet
  };

  const handleShowBlogs = () => {
    setShowTalkto(false);
    setShowBlogs(true);
    setShowTestimonials(false);
    setShowDesign(false);
    setShowWallet(false); // Hide Wallet
  };

  const handleShowTestimonials = () => {
    setShowTalkto(false);
    setShowBlogs(false);
    setShowTestimonials(true);
    setShowDesign(false);
    setShowWallet(false); // Hide Wallet
  };

  const handleShowWallet = () => {
    console.log("Showing Wallet");
    setShowTalkto(false);
    setShowBlogs(false);
    setShowTestimonials(false);
    setShowDesign(false);
    setShowWallet(true);
    setshowtransaction(false)
  };
  const handleShowTransaction = () => {
    console.log("Showing Wallet Transaction");
    setShowTalkto(false);
    setShowBlogs(false);
    setShowTestimonials(false);
    setShowDesign(false);
    setShowWallet(false);
    setshowtransaction(true)
  };
  const handleShowEdit = () => {
  setShowedit(true); // Or setshowedit(true) depending on the naming convention
  setShowTalkto(false);
  setShowBlogs(false);
  setShowTestimonials(false);
  setShowWallet(false);
  setshowtransaction(false);
};



 

  return (
    <div>
      <Header
        onTalktoClick={handleShowTalkto}
        // onReadBlogsClick={handleShowBlogs}
        // onTestimonialsClick={handleShowTestimonials}
        // onWalletClick={handleShowWallet}
        // onTransactionClick={handleShowTransaction}
        // oneditclick={handleShowEdit}
      />
      {showTalkto && !showWallet &&!showtransaction&&!showedit? (
        <div>
          <Fetchlawyer showdesign={showDesign} />
          <Footer />
        </div>
      ) : showBlogs && !showWallet ? (
        <div>
          <SubH1 />
          <Footer />
        </div>
      ) : showTestimonials && !showWallet ? (
        <div>
          <SubH2data />
          <Footer />
        </div>
      ) : showWallet ? (
        <div>
          <Wallet />
          <Footer />
        </div>
      ) : showtransaction ? (
        <div>
          <Transaction />
          <Footer />
                </div>) :
                 showedit ? (
                  <div>
          <Edit/>
          <Footer />
                </div>
                  
        ):(
        <div>
          <SubH1 />
          <SubH2data />
          <Footer />
        </div>
      )}
    </div>
  );
}
