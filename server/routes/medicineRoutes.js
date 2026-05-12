const express = require('express');
const router = express.Router();
const { getMedicines, getMedicineById, createMedicine, getVendorMedicines } = require('../controllers/medicineController');
const { protect, authorize } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

router.get('/', getMedicines);
router.get('/my-medicines', protect, authorize('vendor'), getVendorMedicines);
router.get('/:id', getMedicineById);
router.post('/', protect, authorize('admin', 'vendor'), upload.single('image'), createMedicine);

module.exports = router;
