const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');

// Dashboard stats
const getStats = async (req, res) => {
  const [totalDoctors, totalPatients, patientsPerDoctor, dateStats, conditionStats] =
    await Promise.all([
      Doctor.countDocuments(),
      Patient.countDocuments(),
      Patient.aggregate([
        { $group: { _id: '$doctor', count: { $sum: 1 } } },
        {
          $lookup: {
            from: 'doctors',
            localField: '_id',
            foreignField: '_id',
            as: 'doctor',
          },
        },
        { $unwind: '$doctor' },
        {
          $project: {
            _id: 0,
            doctorName: '$doctor.name',
            specialization: '$doctor.specialization',
            count: 1,
          },
        },
        { $sort: { count: -1 } },
        { $limit: 100 },
      ]),
      Patient.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
        { $project: { _id: 0, date: '$_id', count: 1 } },
      ]),
      Patient.aggregate([
        { $group: { _id: '$condition', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $project: { _id: 0, condition: '$_id', count: 1 } },
      ]),
    ]);

  res.json({
    success: true,
    data: {
      totalDoctors,
      totalPatients,
      avgPatientsPerDoctor: totalDoctors
        ? (totalPatients / totalDoctors).toFixed(2)
        : 0,
      patientsPerDoctor,
      dateStats,
      conditionStats,
    },
  });
};

module.exports = { getStats };