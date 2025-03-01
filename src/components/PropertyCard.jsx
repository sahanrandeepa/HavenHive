import { Link } from "react-router-dom";
import "./PropertyCard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function PropertyCard({ property, onFavoriteToggle, onDragStart, isFavorite }) {
  return (
    <div
      className="property-card"
      draggable
      onDragStart={(e) => onDragStart(e, property)}
    >
      <div className="image-container">
        <Link to={`/property/${property.id}`}>
          <img src={property.picture} alt={property.type} className="property-image" />
        </Link>
        <button
          className={`favorite-button ${isFavorite ? 'favorite' : ''}`} // Add class based on isFavorite
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(property);
          }}
        >
          <FontAwesomeIcon icon={faHeart} className="favorite-icon" />
        </button>
      </div>
      <div className="property-info">
      <Link to={`/property/${property.id}`}>
        <h3>{property.type}</h3>
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Price:</strong> £{property.price.toLocaleString()}</p>
        <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
        </Link>
      </div>
    </div>
  );
}

export default PropertyCard;