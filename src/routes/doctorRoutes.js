const router = require('express').Router();
const { body } = require('express-validator');
const { protect } = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorPatients,
  addPatientToDoctor,
} = require('../controllers/doctorController');

router.use(protect); // all doctor routes protected

router
  .route('/')
  .get(getDoctors)
  .post(
    [
      body('name').notEmpty().withMessage('Name required'),
      body('specialization').notEmpty().withMessage('Specialization required'),
      body('hospital').notEmpty().withMessage('Hospital required'),
      body('phone').notEmpty().withMessage('Phone required'),
      body('email').isEmail().withMessage('Valid email required'),
    ],
    validate,
    createDoctor
  );


router.route('/:id').get(getDoctor).put(updateDoctor).delete(deleteDoctor);


router
  .route('/:id/patients')
  .get(getDoctorPatients)
  .post(
    [
      body('name').notEmpty().withMessage('Patient name required'),
      body('age').isInt({ min: 0, max: 150 }).withMessage('Valid age required'),
      body('condition').notEmpty().withMessage('Condition required'),
    ],
    validate,
    addPatientToDoctor
  );

module.exports = router;