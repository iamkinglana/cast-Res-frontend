import RestaurantCard from './RestaurantCard'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"

const libraries = ["places"]

const Find = () => {
  const [restaurants, setRestaurants] = useState([])
  const [filterByCondTop, setFilterByCondTop] = useState("")
  const [filterByRating, setFilterByRating] = useState("All")
  const [clicked, setClicked] = useState(false)
  const [selectedRest, setSelectedRest] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/restaurants')
      .then(res => res.json())
      .then(setRestaurants)
  }, [])

  function handleCondTopFilterChange(e) {
    setFilterByCondTop(e.target.value)
  }

  function restaurantsToDisplayByCondTop() {
    return restaurants.slice(0, -1).filter(rest => {
      if (filterByCondTop === "") {
        return true
      } else {
        return rest.all_condiments_toppings.toLowerCase().includes(filterByCondTop.toLowerCase())
      }
    })
  }

  function eachRestaurantByCondTop() {
    return restaurantsToDisplayByCondTop().map(restaurant =>
      <RestaurantCard
        restaurant={restaurant}
        key={restaurant.id}
      />
      )
  }

  function handleRatingFilterChange(e) {
    setFilterByRating(e.target.value)
  }

  function restaurantsToDisplayRating() {
    return restaurants.slice(0, -1).filter(rest => {
      if (filterByRating === "All") {
        return true
      } else {
        return filterByRating === rest.avg_rating[0]
      }
    })
  }

  function eachRestaurantByRating() {
    return restaurantsToDisplayRating().map(restaurant =>
      <RestaurantCard
        restaurant={restaurant}
        key={restaurant.id}
      />
      )
  }

  ///// MAP STUFF /////

  const mapClick = () => {
    setClicked(!clicked)
  }

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCPoZGaukhIBRKPs27oGwShRpWQWC12TCI",
    libraries,
  })

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps"

  const mapContainerStyle = {
    width: '80vw',
    height: '80vh'
  }

  const center = {
    lat: 37.761848,
    lng: -122.445312,
  }

  return(
    <div>
      <div className="find-header">
        <h1 className="find-h1">Find a Joint</h1>
        <button className="find-btn" onClick={mapClick}>{!clicked ? "Map View": "List View"}</button>
      </div>
      {!clicked ?
      <div>
        <div className="search-bar">
          <label className="search-label">Search by Flavoring or Toppings: </label>
          <input className="search-input" type="text" onChange={handleCondTopFilterChange} />
          <label className="rating-label">Search by Rating: </label>
          <select className="rating-select" onChange={handleRatingFilterChange}>
            <option value="All">All</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="rest-container">
          {filterByRating === "All" ? eachRestaurantByCondTop() : eachRestaurantByRating()}
        </div>
      </div>
    : <div>
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center}>
         {restaurants.slice(0, -1).map(rest =>
           <Marker
            key={rest.id}
            position={{ lat: rest.lat, lng: rest.lon }}
            onClick={() => {setSelectedRest(rest)}}
            icon={{ url: "https://i.imgur.com/OqLB0qo.png", scaledSize: new window.google.maps.Size(35, 35) }}
          />
         )}
         {selectedRest && (
          <InfoWindow
            position={{ lat: selectedRest.lat, lng: selectedRest.lon }}
            onCloseClick={() => setSelectedRest(null)}
          >
             <div>
               <h2>{selectedRest.name}</h2>
               <h4>{selectedRest.description}</h4>
               <p>Rating: {"★".repeat(Math.round(parseFloat(selectedRest.avg_rating))) + "☆".repeat(5 - Math.round(parseFloat(selectedRest.avg_rating)))}</p>
               <Link to={`http://localhost:3000/details/${selectedRest.id}`}><button className="map-details-btn">See Details</button></ Link>
             </div>
           </InfoWindow>
          )}
        </GoogleMap>
      </div>}
    </div>
  )
}

export default Find
