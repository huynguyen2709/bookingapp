import User from '../modules/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';

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

const login = async (req, res, next) => {
  try {
    const foundUser = await User.findOne({
      username: req.body.username,
    });

    if (!foundUser) {
      next(createError(404, 'User not found!'));
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );

    if (!isPasswordCorrect) {
      next(createError(401, 'Wrong password or username!'));
      return;
    }
    const { password, isAdmin, ...otherDetails } = foundUser._doc;

    const token = jwt.sign(
      {
        id: foundUser.id,
        isAdmin,
      },
      'this-is-fake-key'
    );
    res.status(200).json({ ...otherDetails, token });
  } catch (error) {
    next(error);
  }
};

export { register, login };
