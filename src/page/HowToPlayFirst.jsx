import { useNavigate } from 'react-router-dom';
import Cat from '../assets/maincat.svg';
import Bar from '../assets/info-img-bar.svg';
import '../style/how-to-play-first/howToPlayFirst.css';

const HowToPlayFirst = () => {
  const navigate = useNavigate();
  
  const handleNext = () => {
    navigate("/info-game");
  }

  return (
    <section className="info-wrapper">
      <section className="info-container">
        <section className="info-container-content">
          <h1 className="heading">
            Welcome to Virtual Pet!
          </h1>
          <img className="cat-image" src={Cat} alt="Lars the cat that you will take care during the game" />
          <p className="info">This is your cat, Lars</p>
          <p className="info">
          To care for your cat, keep an eye on their hunger and thirst! 
          Make sure these bars never drop to zero to keep your furry friend happy and healthy!
          </p>
          <img className="bar-image" src={Bar} alt="Bar status for hunger and thirst" />
        </section>
        <section className="btnNext">
            <button className="nextBtn" onClick={handleNext}>Next</button>
        </section>
      </section>
    </section>
  )
}

export default HowToPlayFirst;
