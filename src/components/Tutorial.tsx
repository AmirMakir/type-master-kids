import { useState } from 'react';
import './Tutorial.css';
import KeyboardGuide from './KeyboardGuide';
import FingerPractice from './FingerPractice';
import TutorialPractice from './TutorialPractice';
import keyboardimage from './images/hands_and_keyboard.jpg';
import star from './images/star.jpg';
import fingerposition from './images/fingerposition.png';
import keyboardhappy from './images/keyboardhappy.png';

interface TutorialProps {
    onComplete: () => void;
    onSkip: () => void;
}

type TutorialStep = 'welcome' | 'keyboard' | 'fingers' | 'practice' | 'complete';

const Tutorial= ({ onComplete, onSkip }: TutorialProps) => {
    const [currentStep, setCurrentStep] = useState<TutorialStep>('welcome');

    const nextStep = () => {
        const steps: TutorialStep[] = ['welcome', 'keyboard', 'fingers', 'practice', 'complete'];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
        }
    };

    const prevStep = () => {
        const steps: TutorialStep[] = ['welcome', 'keyboard', 'fingers', 'practice', 'complete'];
        const currentIndex = steps.indexOf(currentStep);
        if (currentIndex > 0) {
            setCurrentStep(steps[currentIndex - 1]);
        }
    };

    return (
        <div className="tutorial">
            <button className="skip-button" onClick={onSkip}>
                Skip Tutorial →
            </button>

            {currentStep === 'welcome' && (
                <div className="tutorial-content">
                    <h1 className="tutorial-title">Welcome to Tutorial!</h1>
                    <div className="welcome-card">
                        <h2>Let's Learn to Type!</h2>
                        <p className="tutorial-text">
                            Don't worry if this is your first time using a keyboard.
                            We'll teach you everything step by step!
                        </p>
                        <div className="tutorial-features">
                            <div className="tutorial-feature">
                                <img src={keyboardhappy} alt={"keyboard with a smile"} id="happykeyboard" className="feature-emoji"></img>
                                <p>See the keyboard</p>
                            </div>
                            <div className="tutorial-feature">
                                <img src={fingerposition} alt={'finger'} id="finger"  className="feature-emoji"></img>
                                <p>Learn finger positions</p>
                            </div>
                            <div className="tutorial-feature">
                                <img src={keyboardimage} alt={'here is a keyboard'} id="keyboard" className="feature-emoji"></img>
                                <p>Practice typing</p>
                            </div>
                        </div>
                        <button className="tutorial-button" onClick={nextStep}>
                            Let's Start!
                        </button>
                    </div>
                </div>
            )}

            {currentStep === 'keyboard' && (
                <div className="tutorial-content">
                    <h1 className="tutorial-title">Meet Your Keyboard</h1>
                    <div className="tutorial-card">
                        <p className="tutorial-text">
                            This is what a keyboard looks like. Each key has a letter on it.
                            When you press a key, that letter appears on the screen!
                        </p>
                        <KeyboardGuide />
                        <p className="tutorial-hint">
                            💡 Try pressing any key on your real keyboard right now!
                        </p>
                        <div className="tutorial-nav">
                            <button className="tutorial-button-secondary" onClick={prevStep}>
                                ← Back
                            </button>
                            <button className="tutorial-button" onClick={nextStep}>
                                Next →
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {currentStep === 'fingers' && (
                <div className="tutorial-content">
                    <h1 className="tutorial-title">Finger Placement</h1>
                    <div className="tutorial-card">
                        <p className="tutorial-text">
                            Place your fingers on these special keys called the "Home Row".
                            This is where your fingers rest when you're not typing!
                        </p>
                        <FingerPractice />
                        <div className="finger-instructions">
                            <div className="finger-instruction">
                                <span className="hand-emoji">🫲</span>
                                <div>
                                    <strong>Left Hand</strong>
                                    <p>Pinky on <kbd>A</kbd>, Ring on <kbd>S</kbd>, Middle on <kbd>D</kbd>, Index on <kbd>F</kbd></p>
                                </div>
                            </div>
                            <div className="finger-instruction">
                                <span className="hand-emoji">🫱</span>
                                <div>
                                    <strong>Right Hand</strong>
                                    <p>Index on <kbd>J</kbd>, Middle on <kbd>K</kbd>, Ring on <kbd>L</kbd>, Pinky on <kbd>;</kbd></p>
                                </div>
                            </div>
                        </div>
                        <p className="tutorial-hint">
                            💡 Feel the small bumps on <kbd>F</kbd> and <kbd>J</kbd>? They help you find the home row without looking!
                        </p>
                        <div className="tutorial-nav">
                            <button className="tutorial-button-secondary" onClick={prevStep}>
                                ← Back
                            </button>
                            <button className="tutorial-button" onClick={nextStep}>
                                Let's Practice! →
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {currentStep === 'practice' && (
                <div className="tutorial-content">
                    <h1 className="tutorial-title">Time to Practice!</h1>
                    <TutorialPractice onComplete={nextStep} />
                </div>
            )}

            {currentStep === 'complete' && (
                <div className="tutorial-content">
                    <h1 className="tutorial-title">You Did It!</h1>
                    <div className="tutorial-card completion-card">
                        <img src={star} alt={'image of star'} className="completion-icon"></img>
                        <h2>You're Ready to Type!</h2>
                        <p className="tutorial-text">
                            Great job! You now know how to use a keyboard.
                            Let's start playing and practice more!
                        </p>
                        <div className="completion-tips">
                            <h3>Remember:</h3>
                            <ul>
                                <li>Keep your fingers on the home row</li>
                                <li>Look at the screen, not the keyboard</li>
                                <li>Speed comes with practice</li>
                                <li>Have fun!🤗</li>
                            </ul>
                        </div>
                        <button className="tutorial-button large" onClick={onComplete}>
                            Start Playing!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tutorial;