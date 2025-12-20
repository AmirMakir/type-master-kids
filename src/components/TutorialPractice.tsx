import React, {useState, useRef, useEffect} from 'react';
import './TutorialPractice.css';

interface TutorialPracticeProps {
    onComplete: () => void;
}

const TutorialPractice = ({onComplete}: TutorialPracticeProps) => {
    const practiceLetters = ['A', 'S', 'D', 'F', 'J', 'K', 'L', ';']; // Home row only
    const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
    const [typedCorrectly, setTypedCorrectly] = useState<string[]>([]);
    const [feedback, setFeedback] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const currentLetter = practiceLetters[currentLetterIndex];
    const progress = ((typedCorrectly.length / practiceLetters.length) * 100).toFixed(0);

    useEffect(() => {
        inputRef.current?.focus();
    }, [currentLetterIndex]);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key.length !== 1) return;

        const pressed = e.key.toUpperCase();

        if (pressed === currentLetter) {
            setTypedCorrectly(prev => [...prev, currentLetter]);
            setFeedback('');

            setCurrentLetterIndex(prev => {
                if (prev < practiceLetters.length - 1) {
                    return prev + 1;
                } else {
                    setFeedback('🎉 Amazing! You typed all the letters!');
                    setTimeout(onComplete, 1500);
                    return prev;
                }
            });
        } else {
            setFeedback(`❌ Try again! Press ${currentLetter}`);
        }

        e.currentTarget.value = '';
    };


    return (
        <div className="tutorial-practice-card">
            <div className="practice-progress-bar">
                <div className="practice-progress-fill" style={{width: `${progress}%`}}></div>
            </div>

            <p className="practice-instruction">
                Press the <strong>{currentLetter}</strong> key on your keyboard
            </p>

            <div className="practice-letter-display">
                {currentLetter}
            </div>

            <input
                ref={inputRef}
                type="text"
                className="practice-hidden-input"
                onKeyDown={handleKeyPress}
                autoFocus
            />

            {feedback && (
                <div className={`practice-feedback ${feedback.includes('❌') ? 'error' : 'success'}`}>
                    {feedback}
                </div>
            )}

            <div className="practice-completed">
                {typedCorrectly.map((letter, index) => (
                    <span key={index} className="completed-letter">
            {letter}
          </span>
                ))}
            </div>

            <p className="practice-hint">
                💡 Click anywhere if the keyboard isn't working
            </p>
        </div>
    );
};

export default TutorialPractice;