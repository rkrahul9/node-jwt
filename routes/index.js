const userServices = require("../controller/userServices");
const auth = require("../auth");
const { body } = require("express-validator");
const { sanitizeBody } = require("express-validator");

const appRoutes = router => {
  router.post(
    "/register",
    [ body("email").isEmail().normalizeEmail(),
      body("password").not().isEmpty().trim().escape(),
      sanitizeBody("terms").toBoolean()
    ],
    userServices.registerUser
  );
  router.post(
    "/login",
    [ body("email").isEmail().normalizeEmail(),
      body("password").not().isEmpty().trim().escape(),
    ],
    userServices.loginUser
  );
  router.get(
    "/me",
    auth.verifyAuthToken,
    userServices.getCurrentUser
  );
};

module.exports = appRoutes;
