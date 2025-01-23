import { useNavigate } from "react-router-dom";
import "../../src/style/shop/shop.css";
import { Beer, Wine } from "../assets/form/food-drinks.js";
const DrinkStore = ({ points, setPoints,
  beer, setBeer, 
  wine, setWine
}) => {
  const navigate = useNavigate();

  const foodItems = [
    {
      id: 1,
      name: "Orange Juice",
      description: "Liquid sunshine in a glass from Sicily!",
      cost: 15,
      img: Beer,
      onBuy: () => setBeer((prevBeer) => prevBeer + 1),
    },
    {
      id: 2,
      name: "Cranberry Juice",
      description: "A ruby-red thirst quencher that screams 'Fancy!'",
      cost: 20,
      img: Wine,
      onBuy: () => setWine((prevWine) => prevWine + 1),
    },
  ];

  const handleBuy = (cost, onBuy) => {
    if (points >= cost) {
      setPoints(points - cost);
      onBuy();
      return true;
    } else {
      alert("Sorry, you do not have enough points!");
      return false;
    }
  };

  return (
    <div className="mainContainer">
      {foodItems.map((food) => (
        <div key={food.id} className="foodItem">
          <div className="foodDetails">
            <h3>{food.name}</h3>
            <p>{food.description}</p>
            <p>Cost: {food.cost} points</p>
            <button
              onClick={() => {
                const success = handleBuy(food.cost, food.onBuy);
                if (success) {
                  navigate("/play");
                }
              }}
              disabled={points < food.cost}
            >
              Buy
            </button>
          </div>
          <img src={food.img} alt={food.name} className="foodImage" />
        </div>
      ))}
    </div>
  );
};

export default DrinkStore;
