const router = require('express').Router();
const { verifyToken, requireRole } = require('../middleware/auth');

router.get('/admin-data', verifyToken, requireRole('admin'), (_, res) => {
  res.json({ message: 'Secret admin content' });
});

module.exports = router;
