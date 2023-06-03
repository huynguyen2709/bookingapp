import './featuredProperties.css';
import { useFetch } from '../../hooks/useFetch';

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch('http://localhost:8080/api/hotels');

  return (
    <div className="fp">
      {loading && 'Loading...'}
      {error && `Error occurs: ${error}`}
      {data &&
        data.map((hotel, index) => (
          <div className="fpItem" key={index}>
            <img src={hotel.photo[0]} alt="" className="fpImg" />
            <span className="fpName">{hotel.name}</span>
            <span className="fpCity">{hotel.city}</span>
            <span className="fpPrice">Starting from {hotel.cheapPrice}$</span>
            {hotel.rating && (
              <div className="fpRating">
                <button>{hotel.rating}</button>
                <span>Excellent</span>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default FeaturedProperties;
