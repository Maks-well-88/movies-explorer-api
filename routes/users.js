const router = require('express').Router();
const { getMe, updateProfile } = require('../controllers/users');
const { updateProfileValidation } = require('../utils/validation');

router.get('/me', getMe);
router.patch('/me', updateProfileValidation, updateProfile);

module.exports = router;
