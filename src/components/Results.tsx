import './Results.css';
import type {Level} from '../types';

interface ResultsProps {
    score: number;
    level: Level;
    onNextLevel: () => void;
    onBackToLevels: () => void;
    onBackToLevel: () => void;
}

const Results = ({score, level, onNextLevel, onBackToLevels, onBackToLevel}: ResultsProps) => {
    const getStars = () => {
        // More generous star system
        if (score >= 400) return 3; // Perfect/Near-perfect
        if (score >= 250) return 2; // Good performance
        if (score >= 100) return 1; // Completed
        return 0; // Didn't finish
    };

    const getGrade = () => {
        if (score >= 600) return {grade: "S+", color: '#fbbf24', label: 'UNBELIEVABLE!!!'}
        if (score >= 500) return {grade: 'S', color: '#fbbf24', label: 'SUPERSTAR!'};
        if (score >= 400) return {grade: 'A+', color: '#4ade80', label: 'AMAZING!'};
        if (score >= 300) return {grade: 'A', color: '#4ade80', label: 'EXCELLENT!'};
        if (score >= 250) return {grade: 'B+', color: '#60a5fa', label: 'GREAT JOB!'};
        if (score >= 200) return {grade: 'B', color: '#60a5fa', label: 'GOOD WORK!'};
        if (score >= 150) return {grade: 'C+', color: '#a78bfa', label: 'NICE TRY!'};
        if (score >= 100) return {grade: 'C', color: '#a78bfa', label: 'KEEP GOING!'};
        return {grade: 'D', color: '#94a3b8', label: 'TRY AGAIN!'};
    };

    const stars = getStars();
    const gradeInfo = getGrade();

    const getMessage = () => {
        if (score >= 500) return "WOW! You're a typing LEGEND! 🏆";
        if (stars === 3) return "Amazing! You're a typing superstar! ⭐";
        if (stars === 2) return "Great job! Keep practicing! 🎉";
        if (stars === 1) return "Good effort! Try again for more stars! 💪";
        return "Keep trying! Practice makes perfect! 📚";
    };

    return (
        <div className="results">
            <div className="results-card">
                <div className="grade-badge" style={{backgroundColor: gradeInfo.color}}>
                    {gradeInfo.grade}
                </div>

                <h1 className="results-title">{gradeInfo.label}</h1>
                <h2 className="level-name">{level.title}</h2>

                <div className="stars-display">
                    {[1, 2, 3].map(star => (
                        <span key={star} className={`star ${star <= stars ? 'star-earned' : ''}`}>
              ⭐
            </span>
                    ))}
                </div>

                <div className="score-display">
                    <span className="score-label">Score</span>
                    <span className="score-value">{score}</span>
                </div>

                <div className="score-breakdown">
                    <h3>Score information:</h3>
                    <div className="breakdown-item">
                        <span>✅ Base Score</span>
                        <span>50-150 pts</span>
                    </div>
                    <div className="breakdown-item">
                        <span>⚡ Speed Bonus</span>
                        <span>0-100 pts</span>
                    </div>
                    <div className="breakdown-item">
                        <span>🎯 Accuracy Bonus</span>
                        <span>0-150 pts</span>
                    </div>
                    <div className="breakdown-item">
                        <span>🔥 Streak Bonus</span>
                        <span>0-100 pts</span>
                    </div>
                    <div className="breakdown-item">
                        <span>⏱️ Time Bonus</span>
                        <span>0-150 pts</span>
                    </div>
                    {score >= 500 && (
                        <div className="breakdown-item perfect">
                            <span>🏆 PERFECT RUN!</span>
                            <span>+200 pts</span>
                        </div>
                    )}
                </div>

                <p className="results-message">{getMessage()}</p>

                <div className="results-actions">
                    <button className='retry-button' onClick={onBackToLevel}>
                        Retry
                    </button>
                    <button className="levels-button" onClick={onBackToLevels}>
                        All Levels
                    </button>
                    <button className="next-button" onClick={onNextLevel}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Results;