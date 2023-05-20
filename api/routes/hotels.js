import express from 'express';
import {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
} from '../controllers/hotel.controller.js';

const routes = express.Router();

// CREATE
routes.post('/', createHotel);

// UPDATE
routes.put('/:id', updateHotel);

// DELETE
routes.delete('/:id', deleteHotel);

// GET
routes.get('/:id', getHotel);

// GET ALL
routes.get('/', getAllHotels);

export default routes;
