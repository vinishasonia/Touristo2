const express = require('express');

const router = express.Router();
const upload = require('../Middleware/upload')
const {
    PackageInsert,
    GetPackages,
    GetSinglePackage,
    DeletePackage,
    UpdatePackage

} = require('../Controller/Admin/PackageController');
//insert  package
router.post('/packageInsert', upload.single('thumbnail'), PackageInsert);
//get all packages

router.get('/getPackages', GetPackages);

// get single package

router.get('/getSinglePackage/:id', GetSinglePackage);

//delete pacakge


router.delete('/deletePackage/:id', DeletePackage);

//update

router.put('/updatePackage/:id', upload.single('thumbnail'), UpdatePackage);
module.exports = router;
