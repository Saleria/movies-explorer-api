const router = require('express').Router();
const { updateUser, getCurrentUser } = require('../controllers/user');
const { updateUserValidation, getCurrentUserValidation } = require('../middlewares/validator');

router.get('/me', getCurrentUserValidation, getCurrentUser);
router.patch('/me', updateUserValidation, updateUser);

module.exports = router;
