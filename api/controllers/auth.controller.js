import User from '../modules/User.js';
import bcrypt from 'bcryptjs';

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    await newUser.save();
    res.status(200).json('User has been created');
  } catch (error) {
    next(error);
  }
};

export { register };
