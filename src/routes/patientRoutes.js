const router = require('express').Router();
const { protect } = require('../middleware/auth');
const {
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController');

router.use(protect);


router.get('/', getPatients);


router.route('/:id').get(getPatient).put(updatePatient).delete(deletePatient);

module.exports = router;