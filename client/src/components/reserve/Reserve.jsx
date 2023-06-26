import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useFetch } from '../../hooks/useFetch';
import React, { useContext, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import './reserve.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Reserve = ({ hotelId, setOpen }) => {
  const navigate = useNavigate();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `http://localhost:8080/api/hotels/room/${hotelId}`
  );
  const { date } = useContext(SearchContext);
  const { user } = useContext(AuthContext);

  const handleSelect = (event) => {
    const selected = event.target.checked;
    const value = event.target.value;
    setSelectedRooms(
      selected
        ? [...selectedRooms, value]
        : selectedRooms.filter((roomId) => roomId !== value)
    );
  };

  const getDateInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const allReservedDates = getDateInRange(date[0].startDate, date[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      allReservedDates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const handleReserveRoom = async (event) => {
    event.preventDefault();

    try {
      await Promise.all(
        selectedRooms.map((roomId) =>
          axios.put(
            `http://localhost:8080/api/rooms/availability/${roomId}`,
            {
              dates: allReservedDates,
            },
            {
              headers: {
                Authorization: `Bearer ${user?.token}`,
              },
            }
          )
        )
      );

      setOpen(false);
      navigate('/');
    } catch (error) {
      console.log('error', error);
    } // TODO: implement error handling later
  };

  return (
    <div className="reserve">
      {loading && 'Loading...'}
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data &&
          data.map((room) => (
            <div className="rItem" key={room._id}>
              <div className="rItemInfo">
                <div className="rTitle">{room.title}</div>
                <div className="rDesc">{room.desc}</div>
                <div className="rMax">
                  Max people: <b>{room.maxPeople}</b>
                </div>
                <div className="rPrice">{room.price}</div>
              </div>
              <div className="rSelectRooms">
                {room.roomNumbers.map((roomNumber) => (
                  <div className="room">
                    <label>{roomNumber.number}</label>
                    <input
                      type="checkbox"
                      value={roomNumber._id}
                      onChange={handleSelect}
                      disabled={!isAvailable(roomNumber)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        <button onClick={handleReserveRoom} className="rButton">
          Reserve Now!
        </button>
        {error && `Error occurs: ${error}`}
      </div>
    </div>
  );
};

export default Reserve;
