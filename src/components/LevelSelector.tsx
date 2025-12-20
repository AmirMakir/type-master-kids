import './LevelSelector.css';
import type {Level} from '../types';

interface LevelSelectorProps {
    levels: Level[];
    completedLevels: number[];
    onSelectLevel: (levelId: number) => void;
    onBack: () => void;
}

const LevelSelector = ({
                           levels,
                           completedLevels,
                           onSelectLevel,
                           onBack
                       }: LevelSelectorProps) => {
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'easy':
                return '#4ade80';
            case 'medium':
                return '#fbbf24';
            case 'hard':
                return '#f87171';
            default:
                return '#94a3b8';
        }
    };

    return (
        <div className="level-selector">
            <button className="back-button" onClick={onBack}>← Back</button>
            <h1 className="selector-title">Choose Your Level</h1>

            <div className="levels-grid">
                {levels.map(level => (
                    <div
                        key={level.id}
                        className="level-card"
                        onClick={() => onSelectLevel(level.id)}
                    >
                        <div className="level-header">
                            <span className="level-number">Level {level.id}</span>
                            {completedLevels.includes(level.id) && (
                                <span className="completed-badge">✓</span>
                            )}
                        </div>
                        <h3 className="level-title">{level.title}</h3>
                        <p className="level-description">{level.description}</p>
                        <div className="level-footer">
    <span
        className="difficulty-badge"
        style={{backgroundColor: getDifficultyColor(level.difficulty)}}
    >
    {level.difficulty}
    </span>
                            <span className="time-limit">⏱️ {level.timeLimit}s</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LevelSelector;