import Hotel from '../modules/Hotel.js';

const createHotel = async (req, res, next) => {
  try {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (error) {
    next(error);
  }
};

const updateHotel = async (req, res, next) => {
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
    next(error);
  }
};

const deleteHotel = async (req, res, next) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!deletedHotel) {
      res.status(200).json('No hotel to be deleted');
      return;
    }
    res.status(200).json('Hotel has been deleted successfully');
  } catch (error) {
    next(error);
  }
};

const getHotel = async (req, res, next) => {
  try {
    const foundHotel = await Hotel.findById(req.params.id);
    if (!foundHotel) {
      res.status(200).json('No hotel found');
      return;
    }
    res.status(200).json(foundHotel);
  } catch (error) {
    next(error);
  }
};

const getAllHotels = async (req, res, next) => {
  try {
    const allHotels = await Hotel.find();
    res.status(200).json(allHotels);
  } catch (error) {
    next(error);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(',');
  try {
    const listOfNumberCity = await Promise.all(
      cities.map((city) => Hotel.countDocuments({ city }))
    );
    res.status(200).json(listOfNumberCity);
  } catch (error) {
    next(error);
  }
};

export {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotel,
  getAllHotels,
  countByCity,
};
