import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useSound from "use-sound";
import GameOver from "../components/game-over/GameOver";
import Star from "../assets/star.svg";
import Cat from "../assets/maincat.svg";
import Poop from "../assets/poopstink.svg";
import Fart from "../assets/audio/fart.mp3";
import DeadCat from "../assets/cat_dead_05.svg";
import SadCat from "../assets/sadcat.svg";
import LoveCat from "../assets/cat_love.svg";
import Burger from "../assets/form/cheesburger.svg";
import Taco from "../assets/form/taco.svg";
import IceCream from "../assets/form/icecream.svg";
import Cookie from "../assets/form/cookie.svg";
import Beer from "../assets/form/beer.svg";
import Wine from "../assets/form/wine.svg";
import "../style/animal-page/animal-page.css";

const AnimalPage = ({
  points,
  setPoints,
  burger,
  setBurger,
  taco,
  setTaco,
  iceCream,
  setIceCream,
  cookie,
  setCookie,
  beer,
  setBeer,
  wine,
  setWine,
}) => {
  const [hunger, setHunger] = useState(() => {
    const storedHunger = localStorage.getItem("hunger");
    return storedHunger ? parseInt(storedHunger, 10) : 50;
  });

  const [thirst, setThirst] = useState(() => {
    const storedThirst = localStorage.getItem("thirst");
    return storedThirst ? parseInt(storedThirst, 10) : 50;
  });

  const [isGameOver, setIsGameOver] = useState(false);
  const [visible, setVisible] = useState(null);
  const [playFartSound] = useSound(Fart);
  const [poopVisible, setPoopVisible] = useState(null);
  const navigate = useNavigate();

  const MAX_VALUE = 100;

  const useConsumableItem = (
    itemType,
    setItemType,
    itemName,
    itemCount,
    setItemCount,
    visibleItem,
    setVisible
  ) => {
    if (itemType < MAX_VALUE && itemCount > 0) {
      setItemType(Math.min(itemType + 10, MAX_VALUE));
      setVisible(visibleItem);
      setTimeout(() => setVisible(null), 2000);
      setItemCount((prevCount) => Math.max(prevCount - 1, 0));
    } else if (itemCount <= 0) {
      alert(`No ${itemName.toLowerCase()} left!`);
    } else {
      alert(itemType === hunger ? "Not hungry" : "Not thirsty");
    }
  };

  const useBurger = () => {
    useConsumableItem(
      hunger,
      setHunger,
      "Burger",
      burger,
      setBurger,
      Burger,
      setVisible
    );
  };

  const useTaco = () => {
    useConsumableItem(
      hunger,
      setHunger,
      "Taco",
      taco,
      setTaco,
      Taco,
      setVisible
    );
  };

  const useIceCream = () => {
    useConsumableItem(
      hunger,
      setHunger,
      "Ice Cream",
      iceCream,
      setIceCream,
      IceCream,
      setVisible
    );
  };

  const useCookie = () => {
    useConsumableItem(
      hunger,
      setHunger,
      "Cookie",
      cookie,
      setCookie,
      Cookie,
      setVisible
    );
  };

  const useBeer = () => {
    useConsumableItem(
      thirst,
      setThirst,
      "Beer",
      beer,
      setBeer,
      Beer,
      setVisible
    );
  };

  const useWine = () => {
    useConsumableItem(
      thirst,
      setThirst,
      "Wine",
      wine,
      setWine,
      Wine,
      setVisible
    );
  };

  useEffect(() => {
    localStorage.setItem("hunger", hunger.toString());
    localStorage.setItem("thirst", thirst.toString());
  }, [hunger, thirst]);

  useEffect(() => {
    const storedHunger = localStorage.getItem("hunger");
    const storedThirst = localStorage.getItem("thirst");

    if (storedHunger && !isNaN(storedHunger)) {
      setHunger(parseInt(storedHunger, 10));
    }

    if (storedThirst && !isNaN(storedThirst)) {
      setThirst(parseInt(storedThirst, 10));
    }
  }, []);

  // Hunger Decrement
  useEffect(() => {
    if (hunger <= 0) {
      setIsGameOver(true);
      playFartSound();
    } else {
      const hungerInterval = setInterval(() => {
        setHunger((prevHunger) => Math.max(prevHunger - 10, 0));
      }, 20000);

      return () => clearInterval(hungerInterval);
    }
  }, [hunger]);

  // Thirst Decrement
  useEffect(() => {
    if (thirst <= 0) {
      setIsGameOver(true);
      playFartSound();
    } else {
      const thirstInterval = setInterval(() => {
        setThirst((prevThirst) => Math.max(prevThirst - 10, 0));
      }, 22000);

      return () => clearInterval(thirstInterval);
    }
  }, [thirst]);

  //Poop every and fart 10 seconds

  useEffect(() => {
    const fartInterval = setInterval(() => {
      playFartSound();
    }, 10000);

    return () => clearInterval(fartInterval);
  }, [playFartSound]);

  useEffect(() => {
    const poopInterval = setInterval(() => {
      setPoopVisible((currentPoop) => currentPoop || Poop);
    }, 10000);

    return () => {
      clearInterval(poopInterval);
    };
  }, [playFartSound]);

  //Poop cleaned
  const cleanPoop = () => {
    if (poopVisible) {
      setPoopVisible(null);
      setPoints((prevPoints) => prevPoints + 10);
    }
  };

  // Feed page navigation
  const handleFood = () => {
    navigate("/play/food");
  };

  // Hydrate page navigation
  const handleHydrate = () => {
    navigate("/play/drink");
  };

  //info page
  const handleInfo = () => {
    navigate("/info");
  };

  const restartGame = () => {
    setHunger(75);
    setThirst(75);
    setBurger(3);
    setCookie(3);
    setIceCream(4);
    setTaco(4);
    setBeer(4);
    setWine(4);
    setIsGameOver(false);
    setPoopVisible(null);
    setPoints(50);
  };

  return (
    <section className="animal-page-container">
      {isGameOver && <GameOver onRestart={restartGame} />}

      <section className="point-container">
        <p className="star-point-number" id="star">
          {points}
        </p>
        <img src={Star} alt="star points" />
      </section>

      <section className="animal-status-container">
        <section className="animal-img">
          {hunger === 0 || thirst === 0 ? (
            <div>
              <h2 className="cat-status">Dead</h2>
              <img src={DeadCat} alt="dead cat" />
            </div>
          ) : hunger < 20 || thirst < 20 ? (
            <div>
              <h2 className="cat-status">I'm sad</h2>
              <img src={SadCat} alt="sad cat" />
            </div>
          ) : hunger > 80 && thirst > 80 ? (
            <div>
              <h2 className="cat-status">I'm super happy</h2>
              <img src={LoveCat} alt="love cat" />
            </div>
          ) : (
            <div>
              <h2 className="cat-status">I'm waiting</h2>
              <img src={Cat} alt="cute cat" />
            </div>
          )}
          <section className="visible">
            {visible && <img src={visible} alt="food or drink visible" />}
          </section>
          <section className="poop-visible">
            {poopVisible && (
              <button className="poopBtn" onClick={cleanPoop}>
                <img src={poopVisible} alt="poop" />
              </button>
            )}
          </section>
        </section>

        <section className="animal-status">
          <section className="needs">
            <div className="text-container">
              <p className="spec">Hunger</p>
            </div>
            <div className="bar">
              <div
                className="color"
                style={{ width: `${hunger}%`, backgroundColor: "#5EE270" }}
              ></div>
            </div>
          </section>

          <section className="needs">
            <div className="text-container">
              <p className="spec">Thirst</p>
            </div>
            <div className="bar">
              <div
                className="color"
                style={{ width: `${thirst}%`, backgroundColor: "#5EE270" }}
              ></div>
            </div>
          </section>

          <section className="img-food-container">
            <div className="food">
              <img className="img" src={Burger} alt="Cheese burger icon" />
            </div>
            <div className="food">
              <img className="img" src={Taco} alt="Taco icon" />
            </div>
            <div className="food">
              <img className="img" src={IceCream} alt="Ice cream icon" />
            </div>
            <div className="food">
              <img className="img" src={Cookie} alt="Cookie icon" />
            </div>
            <div className="drink">
              <img className="img" src={Beer} alt="Beer icon" />
            </div>
            <div className="drink">
              <img className="img-wine" src={Wine} alt="Drink icon" />
            </div>
          </section>

          <section className="button-food-container">
            <button className="food-btn" onClick={useBurger}>
              {burger}
            </button>
            <button className="food-btn" onClick={useTaco}>
              {taco}
            </button>
            <button className="food-btn" onClick={useIceCream}>
              {iceCream}
            </button>
            <button className="food-btn" onClick={useCookie}>
              {cookie}
            </button>
            <button className="drink-btn" onClick={useBeer}>
              {beer}
            </button>
            <button className="drink-btn" onClick={useWine}>
              {wine}
            </button>
          </section>
        </section>
      </section>

      <section className="animal-page-btn">
        <button className="btn-game" onClick={handleFood}>
          Feed
        </button>
        <button className="btn-game" onClick={handleHydrate}>
          Hydrate
        </button>
        <button className="btn-game" onClick={handleInfo}>
          Info
        </button>
      </section>
    </section>
  );
};

export default AnimalPage;
