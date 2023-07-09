import './Food.css'
function Foods({ food }) {

  return(
    <div>
      <div className="food-card">
        <div className="food-card-left">
          <h3>{food.name}</h3>
          <img className="food-img" src={food.image} alt="food" />
        </div>

        <div className="food-card-right">
          <p><b>Food Style:</b> {food.food_style}</p>
          <p><b>Toppings:</b> {food.toppings}</p>
          <p><b>Flavoring:</b> {food.flavoring}</p>
        </div>
      </div>
    </div>
  )
}

export default Foods

