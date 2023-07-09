import { useEffect, useState } from 'react'
import RestaurantCard from './RestaurantCard'

function Favorites({ currentUser }) {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    if (!!currentUser.id) {
    fetch(`http://localhost:3000/favorites/${currentUser.id}`)
      .then(res => res.json())
      .then(setFavorites)
      }
  }, [currentUser])

  const eachRestaurant = () => {
    return favorites.map(restaurant =>
      <RestaurantCard
        restaurant={restaurant.restaurant}
        key={restaurant.restaurant.id}
      />
    )}

  return(
    <div className="rest-container">
      <h1>My Favorites</h1>
      {eachRestaurant()}
    </div>
  )
}

export default Favorites
