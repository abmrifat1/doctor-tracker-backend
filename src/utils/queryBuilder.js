const buildQuery = (query, searchFields = []) => {
  const { page = 1, limit = 10, search, sort, from, to, ...filters } = query;

  const filter = {};

  // Search across fields
  if (search && searchFields.length) {
    filter.$or = searchFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    }));
  }

  // Date range
  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(from);
    if (to) filter.createdAt.$lte = new Date(to);
  }

  // Direct filters (e.g., specialization, condition, doctor)
  Object.keys(filters).forEach((key) => {
    if (filters[key] !== undefined && filters[key] !== '') {
      filter[key] = filters[key];
    }
  });

  // Sorting
  let sortObj = { createdAt: -1 };
  if (sort) {
    const [field, order] = sort.split(':');
    sortObj = { [field]: order === 'asc' ? 1 : -1 };
  }

  const pageNum = Math.max(1, parseInt(page));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit)));

  return {
    filter,
    sort: sortObj,
    skip: (pageNum - 1) * limitNum,
    limit: limitNum,
    page: pageNum,
  };
};

module.exports = buildQuery;