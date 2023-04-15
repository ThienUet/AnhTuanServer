const CategoryController = require('../controllers/category-controller');

function connectRoutes(router) {
    router.post('/create-category', CategoryController.createCategory);
    router.get('/get-category/:id', CategoryController.getCategory);
    router.get('/get-list-category', CategoryController.getCategoryList);
}

module.exports.connect = connectRoutes;