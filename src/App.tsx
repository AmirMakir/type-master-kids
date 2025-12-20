import { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';
import Tutorial from './components/Tutorial';
import LevelSelector from './components/LevelSelector';
import GameLevel from './components/GameLevel';
import Results from './components/Results';
import { levels } from './data/levels';
import type { GameState } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: 'home',
    currentLevel: null,
    score: 0,
    completedLevels: [],
    hasSeenTutorial: false
  });

  const navigateToScreen = (screen: GameState['currentScreen']) => {
    setGameState({ ...gameState, currentScreen: screen });
  };

  const startGame = () => {
    if (!gameState.hasSeenTutorial) {
      setGameState({ ...gameState, currentScreen: 'tutorial' });
    } else {
      setGameState({ ...gameState, currentScreen: 'levels' });
    }
  };

  const selectLevel = (levelId: number) => {
    setGameState({ ...gameState, currentLevel: levelId, currentScreen: 'game' });
  };

  const completeLevel = (score: number) => {
    const newCompleted = gameState.currentLevel && !gameState.completedLevels.includes(gameState.currentLevel)
        ? [...gameState.completedLevels, gameState.currentLevel]
        : gameState.completedLevels;

    setGameState({
      ...gameState,
      score,
      completedLevels: newCompleted,
      currentScreen: 'results'
    });
  };

  const completeTutorial = () => {
    setGameState({
      ...gameState,
      hasSeenTutorial: true,
      currentScreen: 'levels'
    });
  };

  const skipTutorial = () => {
    setGameState({
      ...gameState,
      hasSeenTutorial: true,
      currentScreen: 'levels'
    });
  };

  const currentLevelData = gameState.currentLevel
      ? levels.find(l => l.id === gameState.currentLevel)
      : null;

  return (
      <div className="App">
        {gameState.currentScreen === 'home' && (
            <HomePage onStart={startGame} />
        )}

        {gameState.currentScreen === 'tutorial' && (
            <Tutorial
                onComplete={completeTutorial}
                onSkip={skipTutorial}
            />
        )}

        {gameState.currentScreen === 'levels' && (
            <LevelSelector
                levels={levels}
                completedLevels={gameState.completedLevels}
                onSelectLevel={selectLevel}
                onBack={() => navigateToScreen('home')}
            />
        )}

        {gameState.currentScreen === 'game' && currentLevelData && (
            <GameLevel
                level={currentLevelData}
                onComplete={completeLevel}
                onQuit={() => navigateToScreen('levels')}
            />
        )}

        {gameState.currentScreen === 'results' && currentLevelData && (
            <Results
                score={gameState.score}
                level={currentLevelData}
                onNextLevel={() => {
                  const nextLevel = gameState.currentLevel! + 1;
                  if (nextLevel <= levels.length) {
                    selectLevel(nextLevel);
                  } else {
                    navigateToScreen('levels');
                  }
                }}
                onBackToLevels={() => navigateToScreen('levels')}
                onBackToLevel={() => {
                  if (gameState.currentLevel != null) {
                    selectLevel(gameState.currentLevel);
                  }
                  }
                }
            />
        )}
      </div>
  );
}

export default App;