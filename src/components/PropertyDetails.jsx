import React from "react";
import { useParams } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Carousel } from "react-bootstrap"; 
import "./PropertyDetails.css";

function PropertyDetails({ properties }) {
  const { id } = useParams();
  const property = properties.find((prop) => prop.id === id);

  if (!property) {
    return <div>Property not found.</div>;
  }

  return (
    <div className="property-details">
      <h1>{property.type}</h1>

      
      <Carousel>
        {property.images && property.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Property Image ${index + 1}`}
              style={{ maxHeight: "500px", objectFit: "cover" }} // Adjust for image display
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <p>{property.description}</p>
        </TabPanel>
        <TabPanel>
          <img src={property.floorPlan} alt="Floor Plan" />
        </TabPanel>
        <TabPanel>
          
          <iframe
            title="Google Map"
            src={property.googleMapEmbed}
            style={{ width: "100%", height: "400px", border: "0" }}
            allowFullScreen
          />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default PropertyDetails;
