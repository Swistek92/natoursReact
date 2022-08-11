const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
// const revievController = require('../controllers/revievController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// all routes after this middleware will be protectet
router.use(authController.protect);

router.patch('/updateMyPassword/', authController.updatePassword);
router.get('/me', userController.getMe, userController.getUser);
router.post('/logoImg', userController.uploadUserPhoto2);
router.patch(
  '/updateMe',
  // userController.uploadUserPhoto2,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);

// all routes after this middleware will be just for admin
router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
