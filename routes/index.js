const router = require('express').Router();
const { loginValidatoin, createUserValidation } = require('../middlewares/validator');
const { login, createUser } = require('../controllers/user');
const auth = require('../middlewares/auth');

router.post('/signin', loginValidatoin, login);
router.post('/signup', createUserValidation, createUser);
router.use(auth);
router.use('/users', require('./user'));

router.use('/movies', require('./movie'));

module.exports = router;
