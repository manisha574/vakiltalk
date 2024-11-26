
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this

import SubH2 from './SubH2'; // Adjust the import path as needed
import './header.css';
import { IoFilterOutline } from "react-icons/io5";
import Profilr from './Profilr';
import { FaSearch } from "react-icons/fa";
import { StateContext } from './StateContext';
import Sorby from './Sorby';
import './alogin.css';
import { CSSTransition } from 'react-transition-group';
import ChatInterface from './ChatInterface';


const Fetchlawyer = ({ showdesign }) => {
    const [filteredLawyers, setFilteredLawyers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [verifiedSearchQuery, setVerifiedSearchQuery] = useState('');
    const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
  
    const { isDropdownVisible, setIsDropdownVisible, sortBy,profileVisible, setProfileVisible ,lawyerKey,setLawyerKey,lawyers, setLawyers,selectedLawyer, setSelectedLawyer,showChat} = useContext(StateContext);

    useEffect(() => {
        const fetchLawyers = async () => {
            try {
                const response = await fetch('https://?pageNo=0&pageSize=12&platformType=WEBSITE&moduleName=CALL&projectId=5&sortBy=false&filterType=1&timeZone=Asia/Calcutta&searchQuery=');
                const data = await response.json();
                setLawyers(data.data);
                console.log('lawyers',lawyers);
                setFilteredLawyers(data.data);
            } catch (error) {
                console.error('Error fetching lawyers:', error);
            }
        };

        fetchLawyers();
    }, []);
    useEffect(() => {
    if (selectedLawyer) {
        setLawyerKey(selectedLawyer.id);
        console.log('lawyer',lawyerKey);
    }
}, [selectedLawyer]);


    useEffect(() => {
        let result = [...lawyers]; // Start with the complete list of lawyers
    
        // Apply search filters
        if (searchQuery) {
            result = result.filter(lawyer =>
                lawyer.astrologerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                lawyer.specializationArea.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    
        if (isVerifiedOnly) {
            result = result.filter(lawyer =>
                lawyer.isVerifiedByAp && (
                    !verifiedSearchQuery ||
                    lawyer.astrologerName.toLowerCase().includes(verifiedSearchQuery.toLowerCase()) ||
                    lawyer.specializationArea.toLowerCase().includes(verifiedSearchQuery.toLowerCase())
                )
            );
        }
    
        // Apply sorting based on sortBy criteria
        sortBy.forEach(sortOption => {
            switch (sortOption) {
                case 'Online':
                    result = result.filter(lawyer =>
                        lawyer.serviceStatus === 'ONLINE'
                    );
                    break;
                case 'Newest':
                    result.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
                    break;
                case 'Oldest':
                    result.sort((a, b) => new Date(a.addedDate) - new Date(b.addedDate));
                    break;
                case 'Price: Low to High':
                    result.sort((a, b) => a.servicePrice - b.servicePrice);
                    break;
                case 'Price: High to Low':
                    result.sort((a, b) => b.servicePrice - a.servicePrice);
                    break;
                case 'Experience: Low to High':
                    result.sort((a, b) => a.totalWorkExperience - b.totalWorkExperience);
                    break;
                case 'Experience: High to Low':
                    result.sort((a, b) => b.totalWorkExperience - a.totalWorkExperience);
                    break;
                case 'Rating: Low to High':
                    result.sort((a, b) => a.averageRating - b.averageRating);
                    break;
                case 'Rating: High to Low':
                    result.sort((a, b) => b.averageRating - a.averageRating);
                    break;
                default:
                    break;
            }
        });
    
        setFilteredLawyers(result); // Update the state with the filtered and sorted lawyers
    }, [searchQuery, verifiedSearchQuery, isVerifiedOnly, sortBy, lawyers]);
    
    const handleclose = () => {
        setIsDropdownVisible(false);

    }
    useEffect(() => {
        console.log(selectedLawyer);
    },[selectedLawyer]
    )

    const handleSubH2Click = async (lawyer) => {
        try {
            const response = await fetch(`https://///?timeZone=Asia/Calcutta&profileUrl=${lawyer.profileUrl}&projectId=5`);
            const data = await response.json();
            console.log("astrologer", data);

           
            setSelectedLawyer(data.data);
            setProfileVisible(true);
        } catch (error) {
            console.error('Error calling API:', error);
        }
    };
    console.log(isDropdownVisible);
    return (
        <div>
            {!profileVisible && (
                <div className='ml-3'>
                    <div className=' p-4 mb-4 bg-white'>
                        <p className='text-4xl font-semibold mb-4 mt-7 text-blue-700  underline underline-offset-4'>Talk to Expert Law Consultants</p>
                        <div className='grid my-11 '>
                            <div className='flex flex-col md:flex-row  mb-4 md:mr-4 justify-start'>
                                <label className='flex items-center mb-2 lg:mb-0 lg:mr-4 ml-2 '>
                                    <input
                                        type='checkbox'
                                        checked={isVerifiedOnly}
                                        onChange={() => setIsVerifiedOnly(!isVerifiedOnly)}
                                        className='form-checkbox text-black w-6 h-6 bottom-2'
                                   
                                    />
                                    <span className='ml-2 text-blue-700 font-poppins text-xl font-semibold'>Verified Only</span>
                                </label>
                                <div className='flex flex-col items-baseline md:flex-row  w-auto justify-center md: ml-5'>
                                    <div className='flex items-center gap-4 w-auto'>
                                        <FaSearch color='blue' size={25} />
                                        <input
                                            type='text'
                                            placeholder='Search lawyers, case categories or concerns etc.'
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className='border-b-4 border-blue-500 bg-transparent text-black placeholder-gray-500 outline-none p-2 w-96'
                                        />
                                    </div>
                                    {isVerifiedOnly && (
                                        <div className='flex items-center gap-4 w-auto'>
                                            <FaSearch color='blue' size={25} />
                                            <input
                                                type='text'
                                                placeholder='Search verified lawyers'
                                                value={verifiedSearchQuery}
                                                onChange={(e) => setVerifiedSearchQuery(e.target.value)}
                                                className='border-b-4 border-blue-500 bg-transparent text-black placeholder-gray-500 outline-none p-2 w-96'
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                           
    <div className='flex space-x-4 bg-lightindigo justify-between p-6 rounded-19'>
    <div>
        <button
            className='border border-gray-300 rounded-lg p-2 flex items-center'
            onClick={() => setIsDropdownVisible(!isDropdownVisible)}
        >
            Sort by
            <IoFilterOutline className='text-xl text-gray-500 ml-2' />
        </button>
    </div>
</div>



                        </div>
                    </div>

                    <div className='flex flex-wrap items-start m-8'>
                        {filteredLawyers.length > 0 ? (
                            filteredLawyers.map(lawyer => (
                                <div key={lawyer.id} onClick={() => handleSubH2Click(lawyer)}>
                                    <SubH2
                                        premium={lawyer.isPremium}
                                        img={lawyer.profilePic}
                                        name={lawyer.astrologerName}
                                        title={lawyer.specializationArea}
                                        tag={[lawyer.knownLanguage]}
                                        chatcost={lawyer.servicePrice}
                                        callcost={lawyer.servicePrice}
                                        videocall={lawyer.servicePrice}
                                        online={lawyer.serviceStatus === 'AVAILABLE'}
                                        rating={lawyer.averageRating}
                                       
                                        showdesign={showdesign}
                                        lawyerid={lawyer.id}
                                    />
                                </div>
                            ))
                        ) : (
                            <p className='text-red-500 text-center'>No lawyers are currently online</p>
                        )}
                    </div>
                </div>
            )}
            {showChat ? (
                <div className='m-14 grid place-items-center'>
                    <ChatInterface />
                </div>
            ) : (
            profileVisible && selectedLawyer && (
                <div className='m-14'>
                    <Profilr
                         lawyerskey={selectedLawyer.id}
                        premium={selectedLawyer.isPremium}
                        img={selectedLawyer.profilePic}
                        name={selectedLawyer.astrologerName}
                        title={selectedLawyer.specializationArea}
                        tag={[selectedLawyer.knownLanguage]}
                        chatcost={selectedLawyer.chatService?.servicePrice || 0}
                        callcost={selectedLawyer.callService?.servicePrice || 0}
                        videocall={selectedLawyer.videoCallService?.servicePrice || 0}
                        online={selectedLawyer.serviceStatus === 'AVAILABLE'}
                        rating={selectedLawyer.averageRating}
                        showdesign={showdesign}
                        Experience={selectedLawyer.totalWorkExperience}
                                totalConsultation={selectedLawyer.totalConsultation}
                                aboutMe={selectedLawyer.description}
                                readmore={selectedLawyer.aboutMe}
                                ratingGrap={selectedLawyer.ratingGrap}
                                customerFeedback={selectedLawyer.customerFeedback||[]}
                        
                                
                    />
                        </div>
            )
            )}
          

<CSSTransition
            in={isDropdownVisible}
            timeout={300}
            classNames="overlay"
            unmountOnExit >
            <div className='overlay'>
            <CSSTransition
                in={isDropdownVisible}
                timeout={300}
                        classNames='login-slide'
                        onclose={handleclose}
                unmountOnExit
            >
                <Sorby />
                    </CSSTransition>
                    </div>
            </CSSTransition>
            
           
     
        
            </div>
            );
            }



export default Fetchlawyer;
