import React, { useContext, useEffect, useState } from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import backgroundImage from '../../../../../Images/pink.png'; // Update the path as necessary
import { AuthContext } from '../../../../GlobalContext';
import GalleryHead from './GalleryHead';

const Gallery = () => {
    const { host } = useContext(AuthContext)
    const [images, setImages] = useState([]);
    const [hoveredImageId, setHoveredImageId] = useState(null);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const response = await fetch(`${host}/api/images/getImages`);
            if (response.ok) {
                const data = await response.json();
                setImages(data);
            } else {
                console.error('Failed to fetch images', response.status);
                setDefaultImages(); // Use default data if the fetch fails
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            setDefaultImages(); // Use default data if there's an error
        }
    };

    const setDefaultImages = () => {
        // Default images data
        const defaultImages = [
            {
                _id: '1',
                thumbnail: 'default1.jpg', // Replace with actual default image URLs
                location: 'Paris, France'
            },
            {
                _id: '2',
                thumbnail: 'default2.jpg',
                location: 'New York, USA'
            },
            {
                _id: '3',
                thumbnail: 'default3.jpg',
                location: 'Tokyo, Japan'
            },
            {
                _id: '4',
                thumbnail: 'default4.jpg',
                location: 'Sydney, Australia'
            }
        ];
        setImages(defaultImages);
    };

    return (
        <>

            <div style={{
                display: 'grid',
                gap: '20px',
                padding: '20px',
                background: `url(${backgroundImage}) no-repeat center center fixed`,
                backgroundSize: 'cover'
            }}>
                <GalleryHead />
            </div>


        </>

    );
};

export default Gallery;
