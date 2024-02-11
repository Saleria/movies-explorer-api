const router = require('express').Router();
const { updateUser, getCurrentUser } = require('../controllers/user');
const { updateUserValidation } = require('../middlewares/validator');

router.get('/me', getCurrentUser);
router.patch('/me', updateUserValidation, updateUser);

module.exports = router;
