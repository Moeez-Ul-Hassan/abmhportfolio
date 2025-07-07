const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// File upload setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// File upload endpoint (used by frontend to store files locally and get a URL)
router.post('/upload', upload.array('files', 10), (req, res) => {
  if (!req.files || req.files.length === 0) return res.status(400).json({ error: 'No files uploaded' });
  const urls = req.files.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
  res.json({ urls });
});

module.exports = router; 