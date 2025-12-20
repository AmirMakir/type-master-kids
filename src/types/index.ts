export interface Level {
    id: number;
    title: string;
    difficulty: 'easy' | 'medium' | 'hard';
    words: string[];
    timeLimit: number;
    description: string;
}

export interface GameState {
    currentScreen: 'home' | 'tutorial' | 'levels' | 'game' | 'results';
    currentLevel: number | null;
    score: number;
    completedLevels: number[];
    hasSeenTutorial: boolean;
}