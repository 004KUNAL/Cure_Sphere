const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Medicine = require('./models/Medicine');
const User = require('./models/User');

dotenv.config();

const checkMedicines = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const medicines = await Medicine.find({});
    console.log(`Total medicines: ${medicines.length}`);

    const medicinesWithoutVendor = medicines.filter(m => !m.vendor);
    console.log(`Medicines without vendor: ${medicinesWithoutVendor.length}`);

    if (medicinesWithoutVendor.length > 0) {
      const firstVendor = await User.findOne({ role: 'vendor' });
      if (firstVendor) {
        console.log(`Assigning vendor ${firstVendor._id} to ${medicinesWithoutVendor.length} medicines`);
        await Medicine.updateMany({ vendor: { $exists: false } }, { vendor: firstVendor._id });
        await Medicine.updateMany({ vendor: null }, { vendor: firstVendor._id });
        console.log('Update complete');
      } else {
        console.log('No vendor found in database to assign');
      }
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkMedicines();
