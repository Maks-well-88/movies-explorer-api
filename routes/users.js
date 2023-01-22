const router = require('express').Router();
const { getMe, updateProfile } = require('../controllers/users');
const { getMeValidation } = require('../utils/validation');

router.get('/me', getMe);
router.patch('/me', getMeValidation, updateProfile);

module.exports = router;
