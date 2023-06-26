import User from '../modules/User.js';
import { createError } from '../utils/error.js';

const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      res.status(200).json('No user to be deleted');
      return;
    }
    res.status(200).json('User has been deleted successfully');
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id);
    if (!foundUser) {
      res.status(200).json('No user found');
      return;
    }
    res.status(200).json(foundUser);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    next(error);
  }
};

export { updateUser, deleteUser, getUser, getAllUsers };
