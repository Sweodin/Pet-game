import { useNavigate } from 'react-router-dom';
import Cat from '../assets/maincat.svg';
import '../style/meet-the-team/meetTheTeam.css';
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Import delle icone

const TheTeam = () => {
  const navigate = useNavigate();

  const handleGame = () => {
    navigate('/play');
  };

  return (
    <section className="team-wrapper">
      <section className="team-container">
        <section className="team-container-content">
          <img src={Cat} alt="Cat game" />
          <h1 className="heading-meet">Here we are!</h1>
        </section>
        <section className="team">
          <div className="team-row">
            {[
              {
                name: 'Carmelo',
                role: 'Functionality and main page',
                linkedin: 'https://www.linkedin.com/in/carmelo-salis-7726ba298/',
                github: 'https://github.com/carmelo85s',
              },
              {
                name: 'Peter',
                role: 'Math and Quiz game',
                linkedin: 'https://www.linkedin.com/in/peter-gustafsson-3206a8108/',
                github: 'https://github.com/Sweodin',
              },
            ].map((dev) => (
              <section className="dev" key={dev.name}>
                <h2 className="dev-heading">{dev.name}</h2>
                <p className="info">{dev.role}</p>
                <div className="social-links">
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn">
                    <FaLinkedin />
                  </a>
                  <a href={dev.github} target="_blank" rel="noopener noreferrer" className="social-btn">
                    <FaGithub />
                  </a>
                </div>
              </section>
            ))}
          </div>
          <div className="team-row">
            {[
              {
                name: 'Elin',
                role: 'Graphic and stores',
                linkedin: 'https://www.linkedin.com/in/elin-bradway-75a8aa2a9/',
                github: 'https://github.com/ElinBradway',
              },
              {
                name: 'Simon',
                role: 'Graphic and API integration',
                linkedin: 'https://www.linkedin.com/in/simon-tunje-6a4b5a197/',
                github: 'https://github.com/Tunje',
              },
            ].map((dev) => (
              <section className="dev" key={dev.name}>
                <h2 className="dev-heading">{dev.name}</h2>
                <p className="info">{dev.role}</p>
                <div className="social-links">
                  <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn">
                    <FaLinkedin />
                  </a>
                  <a href={dev.github} target="_blank" rel="noopener noreferrer" className="social-btn">
                    <FaGithub />
                  </a>
                </div>
              </section>
            ))}
          </div>
        </section>
        {/* Button placed under the developer section */}
        <section className="game-button-section">
          <button className="game-button" onClick={handleGame}>
            Play Game
          </button>
        </section>
      </section>
    </section>
  );
};

export default TheTeam;
