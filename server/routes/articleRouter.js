const Router = require('express');
const router = new Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const controller = require('../controllers/articleController');

router.get('/', authMiddleware, controller.getArticles);

router.post('/create', roleMiddleware(['ADMIN']), controller.createArticle);

router.put('/:id', roleMiddleware(['ADMIN']), controller.updateArticle);

router.delete('/:id', roleMiddleware(['ADMIN']), controller.deleteArticle);

module.exports = router;
