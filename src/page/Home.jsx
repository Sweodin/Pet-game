import { Link } from "react-router-dom";
import Cat from "../assets/home-cat.svg";
import "../style/home/home.css";

const Home = () => {
  return (
    <div className="home-wrapper">
      <section className="home-container">
        <section className="title-container">
          <h1 className="title">Welcome to Virtual Pet</h1>
        </section>
        <section className="cta-container">
          <h2 className="lets-play">Let's Play!</h2>
          <section className="btn-container">
            <Link className="btn-info" to="/info">
              Info
            </Link>
            <Link className="btn-play" to="/play">
              Play
            </Link>
          </section>
        </section>
        <section className="home-cat">
          <img src={Cat} alt="litte cute pixel cat" />
        </section>
      </section>
    </div>
  );
};

export default Home;
