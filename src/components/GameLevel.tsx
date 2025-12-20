import React, {useState, useEffect, useRef} from 'react';
import './GameLevel.css';
import type {Level} from '../types';

interface GameLevelProps {
    level: Level;
    onComplete: (score: number) => void;
    onQuit: () => void;
}

const GameLevel= ({level, onComplete, onQuit}: GameLevelProps) => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [typedText, setTypedText] = useState('');
    const [timeLeft, setTimeLeft] = useState(level.timeLimit);
    const [mistakes, setMistakes] = useState(0);
    const [correctStreak, setCorrectStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);
    const [startTime] = useState(Date.now());
    const [wordStartTime, setWordStartTime] = useState(Date.now());
    const [isGameActive, setIsGameActive] = useState(true);
    const [totalKeystrokes, setTotalKeystrokes] = useState(0);
    const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const currentWord = level.words[currentWordIndex];
    const progress = ((currentWordIndex / level.words.length) * 100).toFixed(0);

    useEffect(() => {
        if (!isGameActive || timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setIsGameActive(false);
                    calculateScore(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isGameActive, timeLeft]);

    useEffect(() => {
        inputRef.current?.focus();
    }, [currentWordIndex]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isGameActive) return;

        const value = e.target.value;
        setTypedText(value);
        setTotalKeystrokes(prev => prev + 1);

        const isCorrectSoFar = value.split('').every((char, idx) => char === currentWord[idx]);

        if (isCorrectSoFar && value.length <= currentWord.length) {
            setCorrectKeystrokes(prev => prev + 1);
        }

        if (value === currentWord) {
            const wordTime = Date.now() - wordStartTime;
            const avgTimePerChar = wordTime / currentWord.length;

            if (avgTimePerChar < 500) {
                setCorrectStreak(prev => prev + 1);
            } else {
                setCorrectStreak(0);
            }

            if (correctStreak + 1 > maxStreak) {
                setMaxStreak(correctStreak + 1);
            }

            if (currentWordIndex === level.words.length - 1) {
                setIsGameActive(false);
                calculateScore(true);
            } else {
                setCurrentWordIndex(prev => prev + 1);
                setTypedText('');
                setWordStartTime(Date.now());
            }
        } else if (value.length > currentWord.length) {
            setMistakes(prev => prev + 1);
            setCorrectStreak(0);
            setTypedText('');
        } else if (!isCorrectSoFar) {
            setMistakes(prev => prev + 1);
            setCorrectStreak(0);
        }
    };
    const Reload = () => {
        setCurrentWordIndex(0)
        setTypedText('')
        setTimeLeft(level.timeLimit)
        setMistakes(0)
        setCorrectStreak(0)
        setMaxStreak(0);
        setWordStartTime(Date.now());
        setIsGameActive(true);
        setTotalKeystrokes(0);
        setCorrectKeystrokes(0);
    }
    const calculateScore = (completed: boolean) => {
        let score = 50;

        if (completed) {
            score += 100;

            const timeBonus = timeLeft * (level.difficulty === 'easy' ? 3 : level.difficulty === 'medium' ? 2.5 : 2);
            score += timeBonus;

            const timeTaken = (Date.now() - startTime) / 1000;
            const speedRatio = Math.max(0, 1 - (timeTaken / level.timeLimit));
            const speedBonus = speedRatio * 100;
            score += speedBonus;

            const accuracy = totalKeystrokes > 0 ? (correctKeystrokes / totalKeystrokes) : 1;
            const accuracyBonus = accuracy * 150;
            score += accuracyBonus;

            const streakBonus = maxStreak * 10;
            score += Math.min(100, streakBonus);

            if (mistakes === 0 && timeLeft > level.timeLimit * 0.3) {
                score += 200;
            }

            const difficultyMultiplier = level.difficulty === 'easy' ? 1 : level.difficulty === 'medium' ? 1.2 : 1.5;
            score = score * difficultyMultiplier;

        } else {
            const wordsCompleted = currentWordIndex;
            const partialBonus = (wordsCompleted / level.words.length) * 100;
            score += Math.round(partialBonus);

            const accuracy = totalKeystrokes > 0 ? (correctKeystrokes / totalKeystrokes) : 0;
            score += Math.round(accuracy * 50);
        }

        const mistakePenalty = mistakes * 3;
        score = Math.max(0, score - mistakePenalty);

        onComplete(Math.round(score));
    };

    const getCharacterClass = (index: number) => {
        if (index >= typedText.length) return 'char-untyped';
        return typedText[index] === currentWord[index] ? 'char-correct' : 'char-incorrect';
    };

    return (
        <div className="game-level">
            <div className="game-header">
                <button className="quit-button" onClick={onQuit}>✕ Quit</button>
                <div className="game-stats">
                    <span className="stat stat-time">⏱️ {timeLeft}s</span>
                    <span className="stat stat-mistakes">❌ {mistakes}</span>
                    <span className="stat stat-streak">🔥 {correctStreak}</span>
                    <span className="stat stat-progress">📊 {progress}%</span>
                </div>
            </div>

            <div className="game-content">
                <h2 className="level-name">{level.title}</h2>
                <div className="progress-bar">
                    <div className="progress-fill" style={{width: `${progress}%`}}></div>

                </div>


                <div className="word-display">
                    {currentWord.split('').map((char, index) => (
                        <span key={index} className={`char ${getCharacterClass(index)}`}>
              {char}
            </span>
                    ))}
                </div>

                <input
                    ref={inputRef}
                    type="text"
                    className="type-input"
                    value={typedText}
                    onChange={handleInputChange}
                    disabled={!isGameActive}
                    placeholder="Start typing..."
                    autoComplete="off"
                    spellCheck="false"
                />

                <div className="words-remaining">
                    Word {currentWordIndex + 1} of {level.words.length}
                </div>
                <div className="accuracy-display">
                    Accuracy: {totalKeystrokes > 0 ? Math.round((correctKeystrokes / totalKeystrokes) * 100) : 100}%
                </div>
                <button className="reload-button" onClick={Reload}>
                    ⟳
                </button>
            </div>
        </div>
    );
};

export default GameLevel;