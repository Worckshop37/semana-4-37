const router = require('express').Router();
const userController = require('../../controllers/UserController');
const bcrypt = require('bcryptjs');
const auth = require('../../middlewares/auth');

router.post('/login', userController.login);

router.post('/add', userController.add);
router.get('/list', userController.list);
router.put('/update', userController.update);

module.exports = router;