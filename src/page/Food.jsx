import { useNavigate } from "react-router-dom";
import "../../src/style/shop/shop.css";
import {
  CheeseBurger,
  Cookie,
  IceCream,
  Taco,
} from "../assets/form/food-drinks";

const FoodStore = ({
  points, setPoints, 
  burger, setBurger,
  taco, setTaco, 
  iceCream, setIceCream, 
  cookie, setCookie,  }) => {
  const navigate = useNavigate();

  const foodItems = [
    {
      id: 1,
      name: "Cookie",
      description: "Mmmmhmm a warm, soft cookie.",
      cost: 5,
      img: Cookie,
      onBuy: () => setCookie((prevCookie) => prevCookie + 1),
    },
    {
      id: 2,
      name: "Taco",
      description: "Crisp tortilla with yummy stuffing.",
      cost: 10,
      img: Taco,
      onBuy: () => setTaco((prevTaco) => prevTaco + 1),
    },
    {
      id: 3,
      name: "Burger",
      description: "yummy cheesy burger!",
      cost: 15,
      img: CheeseBurger,
      onBuy: () => setBurger((prevBurger) => prevBurger + 1),
    },
    {
      id: 4,
      name: "Ice Cream",
      description: "Strawberry ice cream for those warm days. ",
      cost: 5,
      img: IceCream,
      onBuy: () => setIceCream((prevIceCream) => prevIceCream + 1),
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

export default FoodStore;
