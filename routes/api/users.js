const router = require('express').Router();
const userController = require('../../controllers/UserController');
const bcrypt = require('bcryptjs');
const auth = require('../../middlewares/auth');

router.post('/login', userController.login);

router.post('/add', auth.verificarAdministrador, userController.add);
router.get('/list', auth.verificarAdministrador, userController.list);
router.put('/update', auth.verificarAdministrador, userController.update);

module.exports = router;