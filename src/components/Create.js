import { useState } from "react"

function Create({ currentUser }) {
  const [food, setFood] = useState(null)
  const [mustard, setMustard] = useState("")
  const [ketchup, setKetchup] = useState("")
  const [onion, setOnion] = useState("")
  const [pepper, setPepper] = useState("")
  const [relish, setRelish] = useState("")
  const [sauerkraut, setSauerkraut] = useState("")
  const [ketchupImageUrl, setKetchupImageUrl] = useState("https://i.imgur.com/01q1vTv.png")
  const [mustardImageUrl, setMustardImageUrl] = useState("https://i.imgur.com/hERO83y.png")
  const [onionImageUrl, setOnionImageUrl] = useState("https://i.imgur.com/eFtxuN2.png")
  const [pepperImageUrl, setPepperImageUrl] = useState("https://i.imgur.com/9ammJkR.png")
  const [relishImageUrl, setRelishImageUrl] = useState("https://i.imgur.com/Gc3asHw.png")
  const [sauerkrautImageUrl, setSauerkrautImageUrl] = useState("https://i.imgur.com/dh7fEfb.png")

  const ketchupClick = (e) => {
    setKetchup(e.target.name)
    setKetchupImageUrl("https://i.imgur.com/kSKGj9y.png")
  }

  const mustardClick = (e) => {
    setMustard(e.target.name)
    setMustardImageUrl("https://i.imgur.com/mZFoFrb.png")
  }

  const onionClick = (e) => {
    setOnion(e.target.name)
    setOnionImageUrl("https://i.imgur.com/pvBIH9X.png")
  }

  const pepperClick = (e) => {
    setPepper(e.target.name)
    setPepperImageUrl("https://i.imgur.com/pY5LVCM.png")
  }

  const relishClick = (e) => {
    setRelish(e.target.name)
    setRelishImageUrl("https://i.imgur.com/dclxZRI.png")
  }

  const sauerkrautClick = (e) => {
    setSauerkraut(e.target.name)
    setSauerkrautImageUrl("https://i.imgur.com/gKfYD6P.png")
  }

  const handleFoodSubmit = (e) => {
    e.preventDefault()
    // myerror
    fetch('http://localhost:3000/food', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: e.target.name.value,
        food_style: "All-Beef",
        toppings: `${onion} ${pepper} ${relish} ${sauerkraut}`,
        condiments: `${ketchup} ${mustard}`,
        restaurant_id: 8,
        user_id: currentUser.id
      })
    })
    .then(res => res.json())
    .then(setFood)
    e.target.reset()
  }

  const refreshClick = () => {
    window.location.reload()
  }

  return(
    <div className="create-container">
      <h1>Create Your Own Order</h1>
      <img src={ketchupImageUrl} className="create-icon" alt="ketchup" name="Ketchup" onClick={e => ketchupClick(e)} />
      <img src={mustardImageUrl} className="create-icon" alt="mustard" name="Mustard" onClick={e => mustardClick(e)} />
      <img src={onionImageUrl} className="create-icon-onion" alt="onion" name="Onion" onClick={e => onionClick(e)} />
      <img src={pepperImageUrl} className="create-icon-onion" alt="pepper" name="Pepper" onClick={e => pepperClick(e)} />
      <img src={relishImageUrl} className="create-icon" alt="relish" name="Relish" onClick={e => relishClick(e)} />
      <img src={sauerkrautImageUrl} className="create-icon" alt="sauerkraut" name="Sauerkraut" onClick={e => sauerkrautClick(e)} />

      <form onSubmit={e => handleFoodSubmit(e)}>
        <label className="create-label">Name: </label>
        <input className="create-input" type="text" name="name" />
        <button className="create-btn">Add Food</button>
      </form>

      {food ?
      <div>
        <h3>Name: {food.name}</h3>
        <p>Toppings: {food.toppings}</p>
        <p>Flavoring: {food.flavoring}</p>
        <button className="create-btn" onClick={refreshClick}>Refresh Page</button>
      </div>
      : null}

        <div className="created-dog">
          <img src="https://i.imgur.com/dGeZ09N.png" alt="plain-hot-dog" className="plain-hot-dog" />
          {mustard ? <img src="https://i.imgur.com/5P5UO0l.png" alt="mustard_squiggle" className="mustard_sqiggle"/> : null }
          {ketchup ? <img src="https://i.imgur.com/95ceEa4.png" alt="ketchup-squiggle" className="ketchup_sqiggle"/> : null }
          {onion ? <img src="https://i.imgur.com/qPKxpz1.png" alt="chopped-onions" className="chopped-onions"/> : null }
          {pepper ? <img src="https://i.imgur.com/hjsYuRK.png" alt="sliced-peppers" className="sliced-peppers"/> : null }
          {relish ? <img src="https://i.imgur.com/9DQaH7E.png" alt="relish" className="relish"/> : null }
          {sauerkraut ? <img src="https://i.imgur.com/khLkkD3.png" alt="sauerkraut" className="sauerkraut"/> : null }
        </div>
    </div>
  )
}

export default Create
