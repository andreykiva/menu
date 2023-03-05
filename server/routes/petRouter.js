const Router = require('express');
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const controller = require('../controllers/petController');

router.get('/pets/:kind', authMiddleware, controller.getPetsByKind);

router.get('/pet/:id', authMiddleware, controller.getPet);

router.post('/pets', roleMiddleware(['ADMIN']), controller.createPet);

module.exports = router;
