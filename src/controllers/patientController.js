const Patient = require('../models/Patient');
const buildQuery = require('../utils/queryBuilder');

// List all patients
const getPatients = async (req, res) => {
  const { filter, sort, skip, limit, page } = buildQuery(req.query, ['name', 'condition']);

  const [patients, total] = await Promise.all([
    Patient.find(filter)
      .populate('doctor', 'name specialization hospital')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .lean(),
    Patient.countDocuments(filter),
  ]);

  res.json({
    success: true,
    count: patients.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: patients,
  });
};

// Single patient
const getPatient = async (req, res) => {
  const patient = await Patient.findById(req.params.id).populate(
    'doctor',
    'name specialization hospital'
  );
  if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
  res.json({ success: true, data: patient });
};

// Update patient
const updatePatient = async (req, res) => {
  const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate('doctor', 'name specialization hospital');
  if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
  res.json({ success: true, data: patient });
};

// Delete patient
const deletePatient = async (req, res) => {
  const patient = await Patient.findById(req.params.id);
  if (!patient) return res.status(404).json({ success: false, message: 'Patient not found' });
  await patient.deleteOne();
  res.json({ success: true, message: 'Patient deleted' });
};

module.exports = { getPatients, getPatient, updatePatient, deletePatient };