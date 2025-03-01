import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropertyCard from './components/PropertyCard';
import SearchForm from './components/SearchForm';
import FavoritesList from './components/FavouriteList';
import Header from './components/Header';
import Footer from './components/Footer';
import "react-tabs/style/react-tabs.css";
import PropertyDetails from "./components/PropertyDetails";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactUs from "./components/ContactUs";



function App() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      const response = await fetch('/data/properties.json');
      const data = await response.json();
      setProperties(data.properties);
      setFilteredProperties(data.properties);
    };
    fetchProperties();
  }, []);

  

 
  const handleAddToFavourites = (property) => {
    if (!favourites.some((fav) => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const handleRemoveFromFavourites = (property) => {
    setFavourites(favourites.filter((fav) => fav.id !== property.id));
  };

  const handleClearFavourites = () => {
    setFavourites([]);
  };

  const handleDropToFavourites = (e) => {
    e.preventDefault();
    const propertyId = e.dataTransfer.getData("propertyId");
    const property = properties.find((prop) => prop.id === propertyId);
    if (property) handleAddToFavourites(property);
  };

  const handleDragStart = (e, property) => {
    e.dataTransfer.setData("propertyId", property.id);
  };

  return (
    <Router>
      <Header />
      <Container fluid>
        <Routes>
          {/* Home Route */}
          <Route
            path="/"
            element={
              <>
              <div className="intro-content">
                <h1>Welcome to HavenHive</h1>
                  <p>
                    HavenHive is your trusted companion for finding the perfect place to call home. 
                    Whether you're looking to buy, rent, or explore properties, we've got you covered.
                  </p>
                  <a href="#get-started" className="explore-button">Get Started</a>
              </div>
                <SearchForm
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  properties={properties}
                  setFilteredProperties={setFilteredProperties}
                />
                <section id="get-started" className="get-started-section"></section>
                <Row>
                  <Col md={9}>
                    <div className="properties-grid">
                      {filteredProperties.length > 0 ? (
                        filteredProperties.map((property) => (
                          <PropertyCard
                            key={property.id}
                            property={property}
                            onClick={() => setSelectedProperty(property)}
                            onFavoriteToggle={handleAddToFavourites}
                            isFavorite={favourites.includes(property)}
                            onDragStart={(e) => handleDragStart(e, property)}
                          />
                        ))
                      ) : (
                        <p>No properties found matching your criteria.</p>
                      )}
                    </div>
                  </Col>
                  <Col md={3}>
                    <FavoritesList
                      favourites={favourites}
                      onRemove={handleRemoveFromFavourites}
                      onDrop={handleDropToFavourites}
                      onClear={handleClearFavourites}
                    />
                  </Col>
                </Row>
              </>
            }
          />

          {/* Property Details Route */}
          <Route
            path="/property/:id"
            element={<PropertyDetails properties={properties} />}
          />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;