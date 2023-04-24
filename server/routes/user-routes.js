const UserController = require('../controllers/user-controller');
const AuthToken = require('../libs/auth/AuthToken');
function connectRoutes(router) {
    router.post('/register', UserController.createUser);
    router.post('/login', UserController.login);
    router.post('/admin/create-user', AuthToken.authTokenAdmin, UserController.createUser);
    router.get('/users', AuthToken.authTokenAdmin, UserController.getUserList);
    router.get('/my-info', AuthToken.authTokenUser, UserController.getUserByID);
    router.post('/update-user', AuthToken.authTokenUser, UserController.updateUser);
}

module.exports.connect = connectRoutes;