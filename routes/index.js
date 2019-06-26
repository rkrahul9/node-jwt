const userServices = require('../controller/userServices');
const auth = require('../auth');

const appRoutes = (router) => {
    router.post('/register', userServices.registerUser);
    router.post('/login', userServices.loginUser);
    router.get('/me', auth.verifyAuth, userServices.getCurrentUser);
}

module.exports = appRoutes;