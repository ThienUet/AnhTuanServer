const UserController = require('../controllers/user-controller');
const AuthToken = require('../libs/auth/AuthToken');
function connectRoutes(router) {
    router.post('/register', UserController.createUser);
    router.post('/login', UserController.login);
    router.get('/users', AuthToken.authTokenUser, UserController.getUserList);
    router.get('/my-info', AuthToken.authTokenUser, UserController.getUserByID);
}

module.exports.connect = connectRoutes;