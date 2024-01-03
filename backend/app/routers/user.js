const userController = require("../controllers/userController");
const router = require("express").Router();
const verifyToken = require('../utils/middleware');
const _const = require('../config/constant');
const middleware = require('../utils/middleware');


router.post('/search', verifyToken.checkLogin, userController.getAllUser);
router.get('/profile', verifyToken.checkLogin, userController.getProfile);
router.get("/searchByEmail", verifyToken.checkLogin, userController.searchUserByEmail);

router.post('/', verifyToken.checkLogin, userController.createUser);
router.delete("/:id", verifyToken.checkLogin, userController.deleteUser);
router.put('/password/:id', verifyToken.checkLogin, userController.updatePassword);
router.put('/:id', verifyToken.checkLogin, userController.updateUser);

module.exports = router;