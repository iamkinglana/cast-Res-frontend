import Foods from "./Food";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function RestaurantDetails({ currentUser }) {
  const [restaurant, setRestaurant] = useState({});
  const [commentsArr, setCommentsArr] = useState([]);
  const [foodsArr, setFoodsArr] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [favClicked, setFavClicked] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/restaurants/${id}`)
      .then((res) => res.json())
      .then((rest) => {
        setRestaurant(rest);
        setCommentsArr(rest.comments);
        setFoodsArr(rest.foods);
      });
  }, [id]);

  const handleAddComment = (newComment) => {
    setCommentsArr([...commentsArr, newComment]);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    fetch("/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        comment: e.target.comment.value,
        restaurant_id: restaurant.id,
        user_id: currentUser.id,
      }),
    })
      .then((res) => res.json())
      .then(handleAddComment);
    e.target.reset();
  };

  const handleAddFav = (newFav) => {
    setRatings([...ratings, newFav]);
  };

  const handleFavorite = () => {
    fetch("/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        favorite: true,
        restaurant_id: restaurant.id,
        user_id: currentUser.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleAddFav(data);
        setFavClicked((favClicked) => !favClicked);
      });
  };

  const handleAddRating = (newRating) => {
    setFavorites([...favorites, newRating]);
  };

  const handleRating = (e) => {
    e.preventDefault();
    fetch("/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating: e.target.value,
        favorite: false,
        restaurant_id: restaurant.id,
        user_id: currentUser.id,
      }),
    })
      .then((res) => res.json())
      .then(handleAddRating);
  };

  const handleDeleteRestaurant = () => {
    fetch(`/restaurants/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        navigate("/restaurants"); // Redirect to the restaurant list page
      });
  };

  function eachFood() {
    return foodsArr.map((food) => (
      <Foods food={food} key={food.id} />
    ));
  }

  return (
    <div>
      <div className="rest-details">
        <div className="rest-details-left">
          <h1 className="rest-details-header">
            {restaurant.name}{" "}
            {"★".repeat(
              Math.round(parseFloat(restaurant.avg_rating))
            ) + "☆".repeat(5 - Math.round(parseFloat(restaurant.avg_rating)))}
          </h1>
          <p className="rest-details-header">{restaurant.address}</p>
          <img
            className="rest-details-img"
            src={restaurant.image}
            alt="restaurant"
          />

          <div className="rest-details-btns">
            <button
              className="rest-details-btn"
              onClick={() => window.open(restaurant.url, "_blank")}
            >
              Order Online
            </button>
            <br />
            <br />
            <button
              className="rest-details-btn"
              onClick={handleFavorite}
            >
              {favClicked ? "Added!" : "Add to Favorites"}
            </button>
          </div>

          <div className="details-rating-bar">
            <label className="details-rating-label">
              Rate Restaurant:{" "}
            </label>
            <select
              className="details-rating-select"
              onChange={handleRating}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          <form className="comment-form" onSubmit={handleCommentSubmit}>
            <input className="comment-input" type="text" name="comment" />
            <button className="comment-btn">Add Comment</button>
          </form>
          <div className="comments">
            <p>
              <b>Comments: </b>
            </p>
            {commentsArr.map((com) => {
              return <p key={com.id}>{com.comment}</p>;
            })}
          </div>
        </div>

        <div className="rest-details-right">
          <h2 className="rest-details-header">Menu Highlights:</h2>
          {eachFood()}
        </div>
      </div>

      <button className="delete-btn" onClick={handleDeleteRestaurant}>
        Delete Restaurant
      </button>
    </div>
  );
}

export default RestaurantDetails;
