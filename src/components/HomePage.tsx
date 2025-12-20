import './HomePage.css';
import star from './images/star.jpg';
import like from './images/like.png';
import bulb from './images/bulb.png';

interface HomePageProps {
    onStart: () => void;
}

const HomePage= ({onStart}: HomePageProps) => {
    return (
        <div className="home-page">
            <div className="hero-section">
                <p className="game-title">Type practicing</p>
                <p className="game-subtitle">Learn to Type While Having Fun!</p>

                <div className="features">
                    <div className="feature">
                        <img src={like} alt={'heart'} id="like" className="feature-icon"></img>
                        <p>Fun Levels</p>
                    </div>
                    <div className="feature">
                        <img src={star} alt={'star image'} className="feature-icon"></img>
                        <p>Earn Stars</p>
                    </div>
                    <div className="feature">
                        <img src={bulb} alt={'bulb'} className="feature-icon"></img>
                        <p>Level Up</p>
                    </div>
                </div>

                <button className="start-button" onClick={onStart}>
                    Start Playing!
                </button>

                <div className="about-section">
                    <div className="instructions">
                        <div className="instruction-step">
                            <span className="step-number">1</span>
                            <p>Pass tutorial</p>
                        </div>
                        <div className="instruction-step">
                            <span className="step-number">2</span>
                            <p>Choose a level</p>
                        </div>
                        <div className="instruction-step">
                            <span className="step-number">3</span>
                            <p>Watch and type</p>
                        </div>
                        <div className="instruction-step">
                            <span className="step-number">4</span>
                            <p>Beat the timer!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;