import React, { useState } from "react";
import "./SearchForm.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function SearchForm({ searchQuery, onSearchChange, properties, setFilteredProperties }) {
  const [filters, setFilters] = useState({
    type: "any",
    minPrice: "",
    maxPrice: "",
    minBedrooms: "",
    maxBedrooms: "",
    startDate: "",
    endDate: "",
    postcode: "",
  });

  const getMonthNumber = (monthName) => {
    const months = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11,
    };
    return months[monthName];
  };

  const handleSubmit = () => {
    const filteredResults = properties.filter((property) => {
      const matchesSearch =
        property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType =
        filters.type === "any" || 
        property.type.toLowerCase() === filters.type.toLowerCase();
      const matchesMinPrice =
        !filters.minPrice || property.price >= parseInt(filters.minPrice);
      const matchesMaxPrice =
        !filters.maxPrice || property.price <= parseInt(filters.maxPrice);
      const matchesMinBedrooms =
        !filters.minBedrooms || property.bedrooms >= parseInt(filters.minBedrooms);
      const matchesMaxBedrooms =
        !filters.maxBedrooms || property.bedrooms <= parseInt(filters.maxBedrooms);
      const propertyDate = new Date(
        property.added.year,
        getMonthNumber(property.added.month),
        property.added.day
      );
      const matchesStartDate =
        !filters.startDate || propertyDate >= new Date(filters.startDate);
      const matchesEndDate =
        !filters.endDate || propertyDate <= new Date(filters.endDate);
      const matchesPostcode =
        !filters.postcode ||
        property.location.toLowerCase().includes(filters.postcode.toLowerCase());

      return (
        matchesSearch &&
        matchesType &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesMinBedrooms &&
        matchesMaxBedrooms &&
        matchesStartDate &&
        matchesEndDate &&
        matchesPostcode
      );
    });

    setFilteredProperties(filteredResults);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      type: "any",
      minPrice: "",
      maxPrice: "",
      minBedrooms: "",
      maxBedrooms: "",
      startDate: "",
      endDate: "",
      postcode: "",
    });
    onSearchChange(""); 
    setFilteredProperties(properties); 
  };

  return (
    <div className="filter-form container">
      <div className="row g-3">
        <div className="col-md-6">
          <label>
            Property Type:
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
            >
              <option value="any">Any</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
            </select>
          </label>
        </div>
        <div className="col-md-6">
          <label>
            Postcode Area:
            <input
              type="text"
              value={filters.postcode}
              onChange={(e) => handleFilterChange("postcode", e.target.value)}
              placeholder="Postcode (e.g., NW1)"
            />
          </label>
        </div>
        <div className="col-md-6">
          <label>
            Min Price:
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              placeholder="Min Price"
            />
          </label>
        </div>
        <div className="col-md-6">
          <label>
            Max Price:
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              placeholder="Max Price"
            />
          </label>
        </div>
        <div className="col-md-6">
          <label>
            Min Bedrooms:
            <input
              type="number"
              value={filters.minBedrooms}
              onChange={(e) => handleFilterChange("minBedrooms", e.target.value)}
              placeholder="Min Bedrooms"
            />
          </label>
        </div>
        <div className="col-md-6">
          <label>
            Max Bedrooms:
            <input
              type="number"
              value={filters.maxBedrooms}
              onChange={(e) => handleFilterChange("maxBedrooms", e.target.value)}
              placeholder="Max Bedrooms"
            />
          </label>
        </div>
        <div className="col-md-6">
          <label>
            Date Added (Start):
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
            />
          </label>
        </div>
        <div className="col-md-6">
          <label>
            Date Added (End):
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
            />
          </label>
        </div>
        
      </div>
      <div className="button-group mt-4">
        <button className="submit-button" onClick={handleSubmit}>
          Apply Filters
        </button>
        <button className="reset-button" onClick={handleReset}>
          Reset Filters
        </button>
      </div>
    </div>
  );
}

export default SearchForm;
