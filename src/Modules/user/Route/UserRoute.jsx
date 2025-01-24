import React, { useEffect, useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'

import Box from '@mui/material/Box';
import Footer from '../Components/Nav/Footer';
import Navigations from '../Components/Nav/Navigations';
import Contact from '../Components/Pages/Contact';
import AboutUs from '../Components/Pages/AboutUs';
import Package from '../Components/Pages/Package/UserPackage';
import Home from '../Components/Pages/Home/Home';
import Login from '../Components/Auth/UserLogin';
import Register from '../Components/Auth/UserRegister';
import Gallery from '../Components/Pages/Gallery/UserGallery';
import UserStatus from '../Components/Pages/Status/UserStatus';
import SinglePackageDetail from '../Components/Pages/Package/PackageDetail';

export default function UserRoute() {
    const location = useLocation();
    const currentRoute = location.pathname;
    // Determine whether to display footer based on current route
    const shouldDisplayNavFooter = !currentRoute.includes('/login') && !currentRoute.includes('/register');

    let navigate=useNavigate()
    useEffect(() => {
        if (JSON.parse(localStorage.getItem('userToken')) == null) {
            navigate('/login')
        }
    }, [])

    return (
        <div>
            <Box>
                {shouldDisplayNavFooter && <Navigations />}
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/Contact" element={<Contact />} />
                    <Route exact path="/about" element={<AboutUs />} />
                    <Route exact path="/packages" element={<Package />} />
                    <Route exact path="/gallery" element={<Gallery />} />
                    <Route exact path="/bookingstatus" element={<UserStatus />} />
                    <Route exact path="/package-detail/:id" element={<SinglePackageDetail />} />
                    
                </Routes>
                {shouldDisplayNavFooter && <Footer />}
            </Box>
        </div>
    )
}
