const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const buildQuery = require('../utils/queryBuilder');

// Create doctor
const createDoctor = async (req, res) => {
  try {
    const existingDoctor = await Doctor.findOne({ email: req.body.email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: 'A doctor with this email already exists.'
      });
    }
    const doctor = await Doctor.create(req.body);
    res.status(201).json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get doctors (search + filter + paginate)
const getDoctors = async (req, res) => {
  const { filter, sort, skip, limit, page } = buildQuery(req.query, [
    'name',
    'specialization',
    'email',
  ]);

  const [doctors, total] = await Promise.all([
    Doctor.find(filter).sort(sort).skip(skip).limit(limit).lean(),
    Doctor.countDocuments(filter),
  ]);

  res.json({
    success: true,
    count: doctors.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: doctors,
  });
};

// Get single doctor
const getDoctor = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
  res.json({ success: true, data: doctor });
};

// Update doctor
const updateDoctor = async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });
  res.json({ success: true, data: doctor });
};

// Delete doctor + cascade patients
const deleteDoctor = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

  await Patient.deleteMany({ doctor: doctor._id });
  await doctor.deleteOne();

  res.json({ success: true, message: 'Doctor and associated patients deleted' });
};

// Get patients of a specific doctor (paginated)
const getDoctorPatients = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);

  const [patients, total] = await Promise.all([
    Patient.find({ doctor: req.params.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .lean(),
    Patient.countDocuments({ doctor: req.params.id }),
  ]);

  res.json({
    success: true,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: patients,
  });
};

// Add patient under doctor
const addPatientToDoctor = async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

  const patient = await Patient.create({ ...req.body, doctor: doctor._id });
  res.status(201).json({ success: true, data: patient });
};

module.exports = {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorPatients,
  addPatientToDoctor,
};