import { useNavigate } from 'react-router-dom';
import Star from '../assets/star-points.svg';
import FoodAndDrinks from'../assets/buttons-item.svg';
import '../style/how-to-play-second/howToPlaySecond.css';

const HowToPlaySecond = () => {

  const navigate = useNavigate();
  
  const handleNextButton = () => {
    navigate("/info-button");
  }

  return (
    <section className="info-wrapper">
      <section className="info-container">
        <section className="info-container-content">
          <p className="info">
            You'll start with a few stars, along with some delicious food and 
            refreshing drinks for your cat, click on the buttons and watch 
            Lars eat and get more full and hydrated!
          </p>
          <section className="img-container">
            <img className="star" src={Star} alt="Star image used for points" />
            <img src={FoodAndDrinks} alt="Button items food and drinks" />  
          </section>
        </section>
        <section className="btnNext">
            <button className="nextBtn" onClick={handleNextButton}>Next</button>
        </section>
      </section>
    </section>
  )
}

export default HowToPlaySecond;
