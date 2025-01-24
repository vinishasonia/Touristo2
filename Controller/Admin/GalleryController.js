const path = require('path');
const fs = require('fs');
const Images = require('../../Model/Gallery');

const GalleryInsert = async (req, res) => {
  try {
    const { title, description, location,date } = req.body;
    const thumbnail = req.files.thumbnail[0].filename; // Multer for multiple files
    const video = req.files.video[0].filename;
    const newImage = new Images({
      title,
      description,
      location,
      thumbnail,
      video ,// Save the video filename
      date // Save the video filename
    });

    // Check if a gallery with the same title already exists
    const existingGallery = await Images.findOne({ title });
    if (existingGallery) {
      return res.json({ status: false, message: 'Gallery with the same title already exists' });
    }

    await newImage.save();
    return res.json({ status: true, message: 'Gallery saved successfully' });
  } catch (error) {
    res.json({ success: false, message: "An error occurred while saving gallery item" });
    res.status(500).send('Internal Server Error');
  }
};


const GetGallery = async (req, res) => {
  try {
    const images = await Images.find();
    res.json({ status: true, images: images });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};

const GetSingleGallery = async (req, res) => {
  try {
    const gallery = await Images.findById(req.params.id);
    if (!gallery) {
      return res.json({ status: false, message: 'Gallery not found' });
    }
    res.json({ status: true, gallery });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};


const DeleteGallery = async (req, res) => {
  try {
    let image = await Images.findById(req.params.id);
    if (!image) {
      return res.json({ status: false, message: 'Gallery not found' });
    }
    image = await Images.findByIdAndDelete(req.params.id);
    return res.json({ status: true, message: 'Gallery deleted successfully' });

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};

// Function to handle updating gallery items
const UpdateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, location ,date} = req.body;
    // Find the gallery item to be updated
    let gallery = await Images.findById(id);
    if (!gallery) {
      return res.json({ status: false, message: 'Gallery not found' });
    }
    // Update text fields
    gallery.title = title || gallery.title;
    gallery.description = description || gallery.description;
    gallery.location = location || gallery.location;
    gallery.date = date || gallery.date;

    // Check if new files are provided and update them
    if (req.files) {
      if (req.files.thumbnail) {
        // Remove the old thumbnail file if it exists
        if (gallery.thumbnail) {
          const oldThumbnailPath = path.join(__dirname, '../../uploads/', gallery.thumbnail);
          if (fs.existsSync(oldThumbnailPath)) {
            fs.unlinkSync(oldThumbnailPath);
          }
        }
        gallery.thumbnail = req.files.thumbnail[0].filename;
      }

      if (req.files.video) {
        // Remove the old video file if it exists
        if (gallery.video) {
          const oldVideoPath = path.join(__dirname, '../../uploads/', gallery.video);
          if (fs.existsSync(oldVideoPath)) {
            fs.unlinkSync(oldVideoPath);
          }
        }
        gallery.video = req.files.video[0].filename;
      }
    }

    await gallery.save();
    res.json({ status: true, message: 'Gallery updated successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
};



module.exports = {
  GalleryInsert,
  GetGallery,
  DeleteGallery,
  GetSingleGallery,
  UpdateGallery
};
