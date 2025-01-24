const Package = require('../../Model/Package');
const PackageInsert = async (req, res) => {
    try {
        const { 
            name, description, price, destination, startDate, endDate, days, 
            accommodation, transportation, meals, numberOfAdults, numberOfChildren, 
            familyPackage, totalMembersPerFamily, specialRequests, guideName, email, phoneNumber 
        } = req.body;
        // Check if a package with the same name already exists
        const existingPackage = await Package.findOne({ name });

        if (existingPackage) {
            return res.json({ success: false, message: 'Package with this name already exists' });
        }
        const thumbnail = req.file.filename;
        const parseddaysDetail = JSON.parse(days);

        const newPackage = new Package({
            name,
            description,
            price,
            destination,
            startDate,
            endDate,
            days: parseddaysDetail,
            accommodation,
            transportation,
            meals,
            numberOfAdults,
            numberOfChildren,
            familyPackage,
            totalMembersPerFamily,
            specialRequests,
            guideName,
            email,
            phoneNumber,
            thumbnail
        });
        await newPackage.save();
       return res.json({success: true,message:'Package saved successfully!!'});
    } catch (error) {
       return res.json({success: false,message:'Internal Server Error'});
    }
};


const GetPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison
        // Filter out packages that are already expired
        const activePackages = packages?.filter(pkg => pkg.status !== 'expired');
        // Iterate over the active packages and update the status if the current date is the day after the end date
        const updatedPackages = await Promise.all(activePackages?.map(async (pkg) => {
            const endDate = new Date(pkg.endDate);
            endDate.setHours(0, 0, 0, 0); // Set time to midnight for accurate date comparison
            // Check if the current date is greater than the end date
            if (currentDate > endDate) {
                pkg.status = 'expired';  // Update status
                await pkg.save();  // Save changes to the database
            }
            
            return pkg;
        }));
        // Combine updated packages with already expired packages
        const finalPackages = [...updatedPackages, ...packages.filter(pkg => pkg.status === 'expired')];
        return res.json({ success: true, packages: finalPackages });
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: 'Something went wrong' });
    }
};


const GetSinglePackage = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (!package) {
            return res.status(404).send('Package not found');
        }
        return res.json({success: true, package: package});

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
};

const DeletePackage = async (req, res) => {
    try {
        const package = await Package.findById(req.params.id);
        if (!package) {
            return res.status(404).send('Package not found');
        }
        await Package.findByIdAndDelete(req.params.id);
        res.json({success:true, message: 'Package deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.json({success:false, message: 'Something went wrong !' });
        res.status(500).send('Internal Server Error');
    }
};

const UpdatePackage = async (req, res) => {
    try {
        let id=req.params.id;
        const { 
             name, description, price, destination, startDate, endDate, days, 
            accommodation, transportation, meals, numberOfAdults, numberOfChildren, 
            familyPackage, totalMembersPerFamily, specialRequests, guideName, email, phoneNumber 
        } = req.body;
        // Check if the package exists
        const existingPackage = await Package.findById(id);
        if (!existingPackage) {
            return res.json({ success: false, message: 'Package not found' });
        }
        // Check if a package with the same name already exists and is not the current package
        const duplicatePackage = await Package.findOne({ name, _id: { $ne: id } });
        if (duplicatePackage) {
            return res.json({ success: false, message: 'Package with this name already exists' });
        }
        // If a new file is uploaded, handle the thumbnail update
        let thumbnail;
        if (req.file) {
            thumbnail = req.file.filename;
        } else {
            // Preserve the old thumbnail if no new file is uploaded
            thumbnail = existingPackage.thumbnail;
        }
        const parseddaysDetail = JSON.parse(days);
        // Update the package fields
        existingPackage.name = name;
        existingPackage.description = description;
        existingPackage.price = price;
        existingPackage.destination = destination;
        existingPackage.startDate = startDate;
        existingPackage.endDate = endDate;
        existingPackage.days = parseddaysDetail;
        existingPackage.accommodation = accommodation;
        existingPackage.transportation = transportation;
        existingPackage.meals = meals;
        existingPackage.numberOfAdults = numberOfAdults;
        existingPackage.numberOfChildren = numberOfChildren;
        existingPackage.familyPackage = familyPackage;
        existingPackage.totalMembersPerFamily = totalMembersPerFamily;
        existingPackage.specialRequests = specialRequests;
        existingPackage.guideName = guideName;
        existingPackage.email = email;
        existingPackage.phoneNumber = phoneNumber;
        existingPackage.thumbnail = thumbnail;
        existingPackage.status = "active";
        // Save the updated package
        await existingPackage.save();
        return res.json({ success: true, message: 'Package updated successfully!' });

    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = {
    PackageInsert,
    GetPackages,
    GetSinglePackage,
    DeletePackage,
    UpdatePackage
};
