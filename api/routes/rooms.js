import express from 'express';
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  updateRoomAvailability,
} from '../controllers/room.controller.js';
import { verifyAdmin, verifyToken } from '../utils/verfifyToken.js';

const router = express.Router();

// CREATE
router.post('/:hotelid', verifyToken, verifyAdmin, createRoom);

// UPDATE
router.put('/:id', verifyToken, verifyAdmin, updateRoom);
router.put('/availability/:id', verifyToken, updateRoomAvailability);

// DELETE
router.delete('/:id/:hotelid', verifyToken, verifyAdmin, deleteRoom);

// GET
router.get('/:id', getRoom);

// GET ALL
router.get('/', getAllRooms);

export default router;
