import express from 'express';
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
  countByCity,
  countByType,
} from '../controllers/hotel.controller.js';
import { verfifyUser } from '../utils/verfifyToken.js';

const router = express.Router();

// CREATE
router.post('/', verfifyUser, createHotel);

// UPDATE
router.put('/:id', verfifyUser, updateHotel);

// DELETE
router.delete('/:id', verfifyUser, deleteHotel);

// GET
router.get('/find/:id', getHotel);

// GET ALL
router.get('/', getAllHotels);

router.get('/countByCity', countByCity);
router.get('/countByType', countByType);

export default router;
