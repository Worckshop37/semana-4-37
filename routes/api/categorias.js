const router = require('express').Router();
const categoriaController = require('../../controllers/CategoriaController');
const auth = require('../../middlewares/auth');

router.get('/list', auth.verificarAdministrador, categoriaController.list);
router.post('/add', auth.verificarAlmacenero, categoriaController.add);
router.put('/update', auth.verificarAdministrador, categoriaController.update);
router.put('/activate', auth.verificarAdministrador, categoriaController.activate);
router.put('/deactivate', auth.verificarAdministrador, categoriaController.deactivate);

module.exports = router;