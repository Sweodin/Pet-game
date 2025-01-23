import { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import FoodStore from './page/Food';
import AnimalPage from './page/Animal-page';
import Navbar from './components/navbar/Navbar';
import VirtualPetGame from './page/VirtualPetGame';
import DrinkStore from './page/Drink';
import ClothStore from './page/Clothes';
import HowToPlayFirst from './page/HowToPlayFirst';
import HowToPlaySecond from './page/HowToPlaySecond';
import HowToPlayThird from './page/HowToPlayThird';
import TheTeam from './page/TheTeam';
import JamendoTracks from './components/music/music';
import './app.css';

const App = () => {
    const [points, setPoints] = useState(100);

    const [burger, setBurger] = useState(5);
    const [taco, setTaco] = useState(5);
    const [iceCream, setIceCream] = useState(5);
    const [cookie, setCookie] = useState(5);
    const [wine, setWine] = useState(5);
    const [beer, setBeer] = useState(5);

    return (
        <HashRouter>
            {/* music */}
            <JamendoTracks />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/info" element={<HowToPlayFirst />} />
                <Route path="/info-game" element={<HowToPlaySecond />} />
                <Route path="/info-button" element={<HowToPlayThird />} />
                <Route path="/meet-the-team" element={<TheTeam />} />

                <Route
                    path="/play"
                    element={
                        <>
                            <Navbar />
                            <AnimalPage
                                points={points} setPoints={setPoints}
                                burger={burger} setBurger={setBurger}
                                taco={taco} setTaco={setTaco}
                                iceCream={iceCream} setIceCream={setIceCream}
                                cookie={cookie} setCookie={setCookie}
                                wine={wine} setWine={setWine}
                                beer={beer} setBeer={setBeer}
                            />
                        </>
                    }
                />

                <Route
                    path="/play/game"
                    element={
                        <>
                            <Navbar />
                            <VirtualPetGame
                                points={points} setPoints={setPoints}
                            />
                        </>
                    }
                />

                <Route
                    path="/play/food"
                    element={
                        <>
                            <Navbar />
                            <FoodStore
                                points={points} setPoints={setPoints}
                                burger={burger} setBurger={setBurger}
                                taco={taco} setTaco={setTaco}
                                iceCream={iceCream} setIceCream={setIceCream}
                                cookie={cookie} setCookie={setCookie}
                            />
                        </>
                    }
                />

                <Route
                    path="/play/clothes"
                    element={
                        <>
                            <Navbar />
                            <ClothStore
                                points={points} setPoints={setPoints}
                            />
                        </>
                    }
                />

                <Route
                    path="/play/drink"
                    element={
                        <>
                            <Navbar />
                            <DrinkStore
                                points={points} setPoints={setPoints}
                                wine={wine} setWine={setWine}
                                beer={beer} setBeer={setBeer}
                            />
                        </>
                    }
                />
            </Routes>
        </HashRouter>
    );
};

export default App;
