import { useNavigate } from 'react-router-dom';
import '../style/how-to-play-third/howToPlayThird.css';

const HowToPlayThird = () => {

  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/play/')
  }

  return (
    <section className="info-wrapper">
      <section className="info-container">
        <section className="info-container-content">
          <section className="btnPlay">
              <button className="play">Play game</button>
          </section>
              
          <p className="info">
            But to buy more, you'll need to play games, you find the games in the top of your home screen.
          </p>
            
          <section className="gameBtn-container">
            <button className="game-btn">Feed</button>
            <button className="game-btn">Hydrate</button>
          </section>
              
          <p className="info">
            Visit the Feed and Hydrate stores in the pet center to stock up on food and drinks for Lars!
          </p>
           
        </section>

      <section className="play-button-container">
          <button className="play-btn" onClick={handleStart}>Start</button>
      </section>

      </section>
    </section>
  )
}

export default HowToPlayThird
