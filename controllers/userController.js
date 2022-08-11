const multer = require('multer');
const sharp = require('sharp');
const { cloudinary } = require('../utils/claudinary');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
// const APIFeatures = require('../utils/apiFeatures');
// const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const multerStorage = multer.memoryStorage();

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// const upload = multer({ dest: 'public/img/users' });

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next();
  }
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`frontend/public/img/users/${req.file.filename}`);

  next();
});

exports.getUser = factory.getOne(User);
// do not update password with this!
exports.updateUser = factory.updateOne(User);
exports.getAllUsers = factory.getAll(User);

exports.deleteUser = factory.deleteOne(User);

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'errror',
    message: 'this route is not yet build. Plase use /signup instad',
  });
};

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'sucess',
    data: null,
  });
});

exports.uploadUserPhoto2 = async (req, res, next) => {
  const fileStr = req.body.data;
  // const { id } = req.body;

  const uploadResponse = await cloudinary.uploader.upload(fileStr, {
    upload_preset: 'Natours_users',
  });

  const filteredBody = { photo: uploadResponse.url };
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'sucess',
    data: {
      user: updatedUser,
    },
  });
};
const filterObj = (obj, ...allowedArguments) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedArguments.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};
exports.updateMe = catchAsync(async (req, res, next) => {
  //1 create a error if user post password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('you can not update password by this route', 400));
  }

  //2 update user filltered with fields are allowed

  const filteredBody = filterObj(req.body, 'name', 'email');

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // console.log(updatedUser);
  res.status(200).json({
    status: 'sucess',
    data: {
      user: updatedUser,
    },
  });
});

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};
