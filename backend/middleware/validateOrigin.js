// middleware/validate-origin.js

const validateOrigin = (req, res, next) => {
  const expectedOrigin = 'https://murdochroy2.github.io';
  const expectedReferrer = 'https://murdochroy2.github.io/';

  if (req.headers.origin === expectedOrigin && req.headers.referer === expectedReferrer) {
    next();
  } else {
    res.status(403).json({ error: 'Forbidden: Invalid origin or referrer' });
  }
};

module.exports = validateOrigin;