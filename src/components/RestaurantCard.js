import { Link } from "react-router-dom"

function RestaurantCard({ restaurant }) {

  return(
    <div className="restaurant-card">
      <div className="rest-card-header">
        <h3>{restaurant.name} {"★".repeat(Math.round(parseFloat(restaurant.avg_rating))) + "☆".repeat(5 - Math.round(parseFloat(restaurant.avg_rating)))}</h3>
        <Link to={`/details/${restaurant.id}`}><button className="restaurant-details-btn">Restaurant Details</button></ Link>
        </div>
        <img className="restaurant-img" src={restaurant.image} alt="restaurant"/>
    </div>
  )
}
 
export default RestaurantCard