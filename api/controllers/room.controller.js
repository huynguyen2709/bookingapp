import Room from '../modules/Room.js';
import Hotel from '../modules/Hotel.js';
const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;

  try {
    const newRoom = await new Room(req.body);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: newRoom._id },
      });
      await newRoom.save();
      res.status(200).json(newRoom);
    } catch (error) {
      next(error);
    }
  } catch (error) {
    next(error);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const foundRoom = await Room.findById(req.params.id);
    if (!foundRoom) {
      res.status(200).json('No room found');
      return;
    }
    res.status(200).json(foundRoom);
  } catch (error) {
    next(error);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};

const updateRoomAvailability = async (req, res, next) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates,
        },
      }
    );
    res.status(200).json('Room status has been updated.');
  } catch (err) {
    next(err);
  }
};

const deleteRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    const deletedRoom = await Room.findByIdAndRemove(req.params.id);

    if (!deletedRoom) {
      res.status(200).json('No room to be deleted');
      return;
    }

    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }
    res.status(200).json('Room has been deleted successfully');
  } catch (error) {
    next(error);
  }
};

const getAllRooms = async (req, res, next) => {
  try {
    const allRooms = await Room.find();
    res.status(200).json(allRooms);
  } catch (error) {
    next(error);
  }
};

export {
  createRoom,
  getRoom,
  deleteRoom,
  getAllRooms,
  updateRoom,
  updateRoomAvailability,
};
