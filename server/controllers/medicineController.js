const Medicine = require('../models/Medicine');

// @desc    Get all medicines
// @route   GET /api/medicines
// @access  Public
exports.getMedicines = async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    const medicines = await Medicine.find(query);
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single medicine
// @route   GET /api/medicines/:id
// @access  Public
exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (medicine) {
      res.json(medicine);
    } else {
      res.status(404).json({ message: 'Medicine not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create medicine
// @route   POST /api/medicines
// @access  Private (Admin/Vendor)
exports.createMedicine = async (req, res) => {
  try {
    const medicineData = { ...req.body };
    
    if (req.file) {
      medicineData.image = `/uploads/${req.file.filename}`;
    }

    const medicine = await Medicine.create({
      ...medicineData,
      vendor: req.user._id,
      // Ensure numeric values are correctly parsed if coming from FormData
      price: Number(medicineData.price),
      requiresPrescription: medicineData.requiresPrescription === 'true'
    });
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get vendor medicines
// @route   GET /api/medicines/my-medicines
// @access  Private (Vendor)
exports.getVendorMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find({ vendor: req.user._id });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
