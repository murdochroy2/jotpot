// middleware/validate-origin.js

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : [];

const allowedReferrers = process.env.ALLOWED_REFERRERS
  ? process.env.ALLOWED_REFERRERS.split(',')
  : [];

const validateOrigin = (req, res, next) => {
  const origin = req.headers.origin;
  const referer = req.headers.referer;

  if (allowedOrigins.includes(origin) && allowedReferrers.includes(referer)) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Invalid origin or referrer' });
  }
};

module.exports = validateOrigin;