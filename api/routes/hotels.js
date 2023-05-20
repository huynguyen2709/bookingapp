import express from 'express';
import Hotel from '../modules/Hotels.js';
import { createError } from '../utils/error.js';

const routes = express.Router();

// CREATE
routes.post('/', async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// UPDATE
routes.put('/:id', async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE
routes.delete('/:id', async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) {
      res.status(200).json('No hotel to be deleted');
      return;
    }
    res.status(200).json('Hotel has been deleted successfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET
routes.get('/:id', async (req, res) => {
  try {
    const foundHotel = await Hotel.findById(req.params.id);
    if (!foundHotel) {
      res.status(200).json('No hotel found');
      return;
    }
    res.status(200).json(foundHotel);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET ALL
routes.get('/', async (req, res, next) => {
  try {
    const allHotels = await Hotel.find();
    res.status(200).json(allHotels);
  } catch (error) {
    next(error);
  }
});

export default routes;
