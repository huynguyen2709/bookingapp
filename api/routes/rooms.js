import express from 'express';
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
} from '../controllers/room.controller.js';
import { verfifyUser } from '../utils/verfifyToken.js';

const router = express.Router();

// CREATE
router.post('/:hotelid', verfifyUser, createRoom);

// UPDATE
router.put('/:id', verfifyUser, updateRoom);

// DELETE
router.delete('/:id/:hotelid', verfifyUser, deleteRoom);

// GET
router.get('/:id', getRoom);

// GET ALL
router.get('/', getAllRooms);

export default router;
