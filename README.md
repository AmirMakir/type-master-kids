# Type Master Kids 

## What is this?

It's a simple game where kids type words on the screen before time runs out. I made it colorful and fun because, honestly, learning to type can be pretty boring otherwise.

The game has:
- A tutorial that shows kids where to put their fingers
- 10 levels that get harder as you go
- Stars you can earn (because who doesn't like stars?)
- Big, friendly text and lots of emojis

## Want to try it?

You'll need Node.js installed on your computer. Then just:

```bash
git clone https://github.com/AmirMakir/type-master-kids.git
cd type-master-kids
npm install
npm start
```

It'll open in your browser.

## How does it work?

Pretty straightforward:
1. you pick a level
2. type the words you see
3. try to beat the timer

The faster and more accurate you are, the more points you get. There's also a streak system that gives you bonus points if you're on a roll.

## Project Structure
```
type-master-kids/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/     # React components
│   │   ├── images      # Image folder
│   │   ├── HomePage.tsx     # Landing page
│   │   ├── HomePage.css
│   │   ├── Tutorial.tsx     # Tutorial system
│   │   ├── Tutorial.css
│   │   ├── KeyboardGuide.tsx        # Visual keyboard
│   │   ├── KeyboardGuide.css
│   │   ├── FingerPractice.tsx       # Finger placement guide
│   │   ├── FingerPractice.css
│   │   ├── TutorialPractice.tsx     # Practice typing
│   │   ├── TutorialPractice.css
│   │   ├── LevelSelector.tsx        # Level selection screen
│   │   ├── LevelSelector.css
│   │   ├── GameLevel.tsx            # Main game logic
│   │   ├── GameLevel.css
│   │   ├── Results.tsx              # Results screen
│   │   └── Results.css
│   ├── data/
│   │   └── levels.ts        # Level descriptions
│   ├── types/
│   │   └── index.ts         # TypeScript interfaces
│   ├── App.tsx              # Main app component
│   ├── App.css              # Global styles
│   └── index.tsx            # Entry point
├── package.json
├── tsconfig.json
└── README.md
```

## What I learned

This project taught me a lot:
- How React actually works (not just tutorials)
- Why TypeScript is useful (catching bugs before they happen)

## Want to help?

If you see bugs or have ideas, feel free to open an issue or make a pull request. I'm still learning, so I'd appreciate any feedback!

## Technical stuff

Built with React, TypeScript, and CSS. No fancy libraries - just the basics. The whole thing is only frontend.
