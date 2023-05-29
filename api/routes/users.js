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

// router.get('/checkuser/:id', verfifyUser, (req, res) => {
//   res.status(200).send('You are logged in and you can delete your account');
// });

// router.get('/checkadmin', verifyAdmin, (req, res) => {
//   res.status(200).send('You are Admin');
// });

// UPDATE
router.put('/:id', verfifyUser, updateUser);

// DELETE
router.delete('/:id', verfifyUser, deleteUser);

// GET
router.get('/:id', verfifyUser, getUser);

// GET ALL
router.get('/', verifyAdmin, getAllUsers);

export default router;
