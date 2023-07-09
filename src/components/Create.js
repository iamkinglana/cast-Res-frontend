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
    setKetchupImageUrl("https://i.pinimg.com/236x/ac/35/8f/ac358f9e8352eeb3377339df2e218aa4.jpg")
  }

  const mustardClick = (e) => {
    setMustard(e.target.name)
    setMustardImageUrl("https://i.pinimg.com/236x/28/a9/49/28a949f884b7393f66a9624c3aff52e8.jpg")
  }

  const onionClick = (e) => {
    setOnion(e.target.name)
    setOnionImageUrl("https://i.pinimg.com/236x/04/ad/f7/04adf7878f38703d35f300bef510ad99.jpg")
  }

  const pepperClick = (e) => {
    setPepper(e.target.name)
    setPepperImageUrl("https://i.pinimg.com/236x/c4/89/d7/c489d7627b31f4c386c4803a3da262f7.jpg")
  }

  const relishClick = (e) => {
    setRelish(e.target.name)
    setRelishImageUrl("https://i.pinimg.com/564x/c2/c5/b2/c2c5b2c1f3026a249107cbbc7842112f.jpg")
  }

  const sauerkrautClick = (e) => {
    setSauerkraut(e.target.name)
    setSauerkrautImageUrl("https://i.pinimg.com/236x/6a/68/1c/6a681ceb5a197405e03d4814557cc963.jpg")
  }

  const handleFoodSubmit = (e) => {
    e.preventDefault()
    // myerror
    fetch('/foods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: e.target.name.value,
        food_style: "All-Beef",
        toppings: `${onion} ${pepper} ${relish} ${sauerkraut}`,
        falvoring: `${ketchup} ${mustard}`,
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
          <img src="https://i.pinimg.com/236x/c7/d1/ff/c7d1ffeaa8485ce3a7f9e0d3dcda48a3.jpg" alt="plain-hot-dog" className="plain-hot-dog" />
          {mustard ? <img src="https://i.pinimg.com/236x/a7/1c/d8/a71cd85069c9541fd118704164cf9f75.jpg" alt="mustard_squiggle" className="mustard_sqiggle"/> : null }
          {ketchup ? <img src="https://i.pinimg.com/236x/8f/53/d5/8f53d5098237b791c2b990cd5d01bb89.jpg" alt="ketchup-squiggle" className="ketchup_sqiggle"/> : null }
          {onion ? <img src="https://i.pinimg.com/236x/72/5c/94/725c94198a80323c696459325eec18b0.jpg" alt="chopped-onions" className="chopped-onions"/> : null }
          {pepper ? <img src="https://i.pinimg.com/originals/9b/8b/69/9b8b69be2856daab0b1927fce087f55d.jpg" alt="sliced-peppers" className="sliced-peppers"/> : null }
          {relish ? <img src="https://i.pinimg.com/564x/c2/c5/b2/c2c5b2c1f3026a249107cbbc7842112f.jpg" alt="relish" className="relish"/> : null }
          {sauerkraut ? <img src="https://i.pinimg.com/236x/4d/48/00/4d48008106cbae59f0d7f9696d92bf8f.jpg" alt="sauerkraut" className="sauerkraut"/> : null }
        </div>
    </div>
  )
}

export default Create
