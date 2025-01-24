// src/contexts/AuthContext.js

import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import Hosts from '../config/Hosts';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const host = Hosts.host;
    const imagePath = `${host}/upload/images`;

    const [token, setToken] = useState(false);
    const [authModal, setAuthModal] = React.useState(false);
    const [checkoutModalOpen, setCheckoutModalOpen] = React.useState(false);
    const navigate = useNavigate();
    const handleAuthModalOpen = () => {
        if (token == false) {
            setAuthModal(true);
        }
    };
    const handleAuthModalClose = () => {
        setAuthModal(false);
    };

    useEffect(() => {
        const userToken = JSON.parse(localStorage.getItem('userToken'));
        if (userToken) {
            setToken(true);
        } else {
            setToken(false);
        }
    }, [handleAuthModalClose]);

    // User
    const [user, setUser] = useState({})
    const [loggedCount, setLoggedCount] = useState(0)
    useEffect(() => {
        const tokensss = JSON.parse(localStorage.getItem('userToken'));
        axios.get(`${host}/api/user/get-single-user`, { headers: { 'auth-token': tokensss } })
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                console.log("Error : " + err);
            })
    }, [loggedCount])

    const [alluser, setAllUser] = useState([]);
    useEffect(() => {
        axios.get(`${host}/api/user/get-user`)
            .then((res) => {
                // Set state with the fetched data
                setAllUser(res?.data?.user || []);
            })
            .catch((err) => {
                // Handle errors here
                console.error('Error fetching requests:', err.message);
            });
    }, []); // Empty dependency array ensures this runs only once after initial render

    // Gallery
    const [galleryList, setGalleryList] = useState([]);
    const [galleryCount, setGalleryCount] = useState(0);


    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get(`${host}/api/admin/getgallery`);
                if (res.data.status) {
                    setGalleryList(res?.data?.images);
                } else {
                    toast.error(res.data.message)
                }
            } catch (error) {
                console.error('Error fetching images:', error);
                // Handle error state in your UI
            }
        };
        fetchImages()
    }, [galleryCount]);

    const [packageList, setPackageList] = useState([]);
    const [packageCount, setPackageCount] = useState(0);
    useEffect(() => {
        const fetchPackageList = async () => {
            try {
                const response = await axios.get(`${host}/api/package/getPackages`);
                setPackageList(response?.data?.packages);
            } catch (error) {
                console.error('Error fetching packages:', error);
            }
        };
        fetchPackageList()
    }, [packageCount]);



    const [singleusereq, setSingleUserRequest] = useState([]);
  
    
    const [allreq, setAllRequest] = useState([]);
    const [reqCount, setreqCount] = useState(0);

    useEffect(() => {
        axios.get(`${host}/api/admin/getrequests`)
            .then((res) => {
                if(res.data.success){
                    // Set state with the fetched data
                    setAllRequest(res?.data?.requests || []);
                }
            })
            .catch((err) => {
                // Handle errors here
                console.error('Error fetching requests:', err.message);
            });
        const token = JSON.parse(localStorage.getItem('userToken')); // or wherever you're storing the token
        axios.get(`${host}/api/admin/getrequestsbyuserId`, {
            headers: {
                'auth-token': token
            }
        })
            .then((res) => {
                if(res.data.success){
                // Set state with the fetched data
                setSingleUserRequest(res?.data?.requests || []);
                }
            })
            .catch((err) => {
                // Handle errors here
                console.error('Error fetching requests:', err.message);
            });

    }, [reqCount]); // Empty dependency array ensures this runs only once after initial render


    const [feedback,setFeedback]=useState([])
    const [feedbackCount,setFeedbackCount]=useState(0)
    useEffect(() => {
        axios.get(`${host}/api/admin/getfeedback`)
            .then((res) => {
                if(res.data.success){
                    // Set state with the fetched data
                    setFeedback(res?.data?.feedbacks);
                }
            })
            .catch((err) => {
                // Handle errors here
                console.error('Error fetching requests:', err.message);
            });
    }, [feedbackCount]); // Empty dependency array ensures this runs only once after initial render

    
    return (
        <AuthContext.Provider value={{
            host, imagePath,
            token, setToken,
            authModal, handleAuthModalOpen, handleAuthModalClose,
            checkoutModalOpen, setCheckoutModalOpen,
            // User
            user, setLoggedCount,
            // Alluser
            alluser,
            // Gallery
            galleryList, galleryCount, setGalleryCount,
            // Package
            packageList, packageCount, setPackageCount,
            // SingleUser
            singleusereq,allreq,
            setreqCount,
            // Feedback
            feedback, setFeedbackCount

        }}>
            {children}
        </AuthContext.Provider>
    );
};
export { AuthContext, AuthProvider };
