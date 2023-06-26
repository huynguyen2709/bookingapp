import express from 'express';
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
  countByCity,
  countByType,
  getRoomsByHotel,
} from '../controllers/hotel.controller.js';
import {
  verfifyUser,
  verifyToken,
  verifyAdmin,
} from '../utils/verfifyToken.js';

const router = express.Router();

// CREATE
router.post('/', verifyToken, verifyAdmin, createHotel);

// UPDATE
router.put('/:id', verifyToken, verfifyUser, updateHotel);

// DELETE
router.delete('/:id', verifyToken, verfifyUser, deleteHotel);

// GET
router.get('/find/:id', getHotel);

// GET ALL
router.get('/', getAllHotels);

router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/room/:id', getRoomsByHotel);

export default router;
