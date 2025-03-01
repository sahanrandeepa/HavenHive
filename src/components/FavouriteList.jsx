import React from 'react';
import './FavouriteList.css';

function FavoritesList({ favourites, onRemove, onDrop, onClear }) {
  const handleDragOver = (e) => e.preventDefault();

  const handleDragStart = (e, propertyId) => {
    e.dataTransfer.setData("propertyId", propertyId);
  };

  return (
    <div className="favorites-container">
      
      <div className="favorites-list" onDragOver={handleDragOver} onDrop={onDrop}>
      <h3 className="favorites-title">Favourites</h3>
        {favourites.length > 0 ? (
          favourites.map((property) => (
            <div
              className="favorite-item"
              key={property.id}
              draggable
              onDragStart={(e) => handleDragStart(e, property.id)}
            >
              <img src={property.picture} alt={property.type} className="favorite-thumbnail" />
              <div className="favorite-info">
                <h4 className="favorite-type">{property.type}</h4>
                <p className="favorite-price">£{property.price.toLocaleString()}</p>
              </div>
              <button className="remove-favorite" onClick={() => onRemove(property)}>-</button>
            </div>
          ))
        ) : (
          <p>No favourites aded yet.</p>
        )}
        <button className="clear-favorites" onClick={onClear}>
          Clear Favourites
        </button>
      </div>

      <div
        className="remove-zone"
        onDragOver={handleDragOver}
        onDrop={(e) => {
          const propertyId = e.dataTransfer.getData("propertyId");
          const property = favourites.find((fav) => fav.id === propertyId);
          if (property) {
            onRemove(property);
          }
        }}
      >
           Drag here to remove from Favourites



      </div>
    </div>
  );
}

export default FavoritesList;