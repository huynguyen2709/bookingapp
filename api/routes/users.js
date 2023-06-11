import express from 'express';
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
} from '../controllers/user.controller.js';
import {
  verfifyUser,
  verifyAdmin,
  verifyToken,
} from '../utils/verfifyToken.js';

const router = express.Router();

// router.get('/checkcauthentication', verifyToken, (req, res) => {
//   res.status(200).send('You are logged in');
// });

// router.get('/checkuser/:id', verifyToken, verfifyUser, (req, res) => {
//   res.status(200).send('You are logged in and you can delete your account');
// });

// router.get('/checkadmin', verifyAdmin, (req, res) => {
//   res.status(200).send('You are Admin');
// });

// UPDATE
router.put('/:id', verifyToken, verfifyUser, updateUser);

// DELETE
router.delete('/:id', verifyToken, verfifyUser, deleteUser);

// GET
router.get('/:id', verifyToken, verfifyUser, getUser);

// GET ALL
router.get('/', verifyToken, verifyAdmin, getAllUsers);

export default router;
