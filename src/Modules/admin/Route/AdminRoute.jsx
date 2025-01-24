import React, { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navigation from '../component/Nav/Navigation'
import Box from '@mui/material/Box';
import Home from '../component/Pages/Home';
import { styled } from '@mui/material/styles';
import '../css/Style.css'

import CssBaseline from '@mui/material/CssBaseline';


// Package
import AddPackage from '../component/Pages/Package/AddPackage';
import ManagePackageList from '../component/Pages/Package/ManagePackageList';
import UpdatePackage from '../component/Pages/Package/UpdatePackage';

// Gallery
import GalleryList from '../component/Pages/Gallery/GalleryList';
import AddGallery from '../component/Pages/Gallery/AddGallery';

import Feedback from '../component/Pages/Feedback/AdminFeedback';
import ManageRequest from '../component/Pages/Request/ManageRequest';

import ManagePayment from '../component/Pages/Transaction/ManagePayment';
import Login from '../component/Auth/Login';
import UpdateGallery from '../component/Pages/Gallery/UpdateGallery';
import Users from '../component/Pages/Users/AdminUsers';


export default function AdminRoute() {

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }));

    const navigate = useNavigate();
    const location = useLocation();
    const currentRoute = location.pathname;

    useEffect(() => {
        if (JSON.parse(localStorage.getItem('adminToken')) == null) {
            navigate('/admin/login')
        }
    }, [])

    return (
        <div>
            <Box sx={{ display: 'flex' }}>
                {currentRoute.includes('/admin/login') ? (
                    <Routes>
                        <Route exact path="/login" element={<Login />} />
                    </Routes>
                )
                    :
                    (
                        <>
                            <CssBaseline />
                            <Navigation />
                            <Box
                                component="main"
                                sx={{
                                    flexGrow: 1,
                                    p: 2.5,
                                    minHeight: '100vh',
                                    backgroundColor: "rgba(255, 105, 177, 0.1)", // Adjust alpha (0.65) for transparency
                                }}
                            >
                                <DrawerHeader />
                                <Routes>
                                    <Route exact path="/" element={<Home />} />
                                    <Route exact path="/manage-packages" element={<AddPackage />} />
                                    <Route exact path="/packages-list" element={<ManagePackageList />} />
                                    <Route exact path="/manage-update/:id" element={<UpdatePackage />} />

{/* Gallery */}
                                    <Route exact path='/add-gallery' element={<AddGallery />} />
                                    <Route exact path='/edit-gallery/:id' element={<UpdateGallery />} />
                                    <Route exact path='/gallery-list' element={<GalleryList />} />

{/* Request */}
                                    <Route exact path='/requests' element={<ManageRequest />} />
                                    <Route exact path="/feedback" element={<Feedback />} />
                                    <Route exact path='/payments' element={<ManagePayment />} />
                                    <Route exact path='/users' element={<Users />} />



                                </Routes>
                            </Box>
                        </>
                    )}
            </Box>
        </div>
    )
}
