import { useState, useRef, useEffect } from "react"
import Die from "./Die"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {
    const [dice, setDice] = useState(() => generateAllNewDice())
    const [rollSum, setRollSum] = useState(Math.floor(Math.random() * 10) + 29)
    const [timeLeft, setTimeLeft] = useState(20) 
    const [gameActive, setGameActive] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)
    const buttonRef = useRef(null)

    const [windowSize] = useState({
        width: typeof window !== "undefined" ? window.innerWidth : 400,
        height: typeof window !== "undefined" ? window.innerHeight : 400,
    })

    // Only sum up the held (green) dice
    const gameWon = dice
        .filter(die => die.isHeld)
        .reduce((total, current) => total + current.value, 0) === rollSum

    // Handle countdown effect
    useEffect(() => {
        if (!gameActive || gameWon) return

        if (timeLeft === 0) {
            setGameActive(false)
            return
        }

        const timer = setTimeout(() => {
            setTimeLeft(prev => prev - 1)
        }, 1000)

        return () => clearTimeout(timer)
    }, [timeLeft, gameWon, gameActive])

    useEffect(() => {
        if (gameWon || (hasStarted && !gameActive)) {
            buttonRef.current?.focus()
        }
    }, [gameWon, gameActive, hasStarted])

    function startGame() {
        setHasStarted(true)
        setGameActive(true)
    }

    function generateAllNewDice() {
        return new Array(10)
            .fill(0)
            .map(() => ({
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            }))
    }
    
    function rollDice() {
        // If game is over (won or lost), reset everything
        if (gameWon || !gameActive) {
            setDice(generateAllNewDice())
            setRollSum(Math.floor(Math.random() * 10) + 29)
            setTimeLeft(20)
            setGameActive(true)
        } else {
            // Regular roll during gameplay
            setDice(oldDice => oldDice.map(die =>
                die.isHeld ?
                    die :
                    { ...die, value: Math.ceil(Math.random() * 6) }
            ))
        }
    }

    function hold(id) {
        // Prevent holding dice if time ran out
        if (!gameActive) return 

        setDice(oldDice => oldDice.map(die =>
            die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        ))
    }

    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}
        />
    ))

    // Determine what text to show on the main action button
    let buttonText = "Roll"
    if (gameWon) buttonText = "New Game"
    if (hasStarted && !gameActive && !gameWon) buttonText = "Try Again"

    return (
        <main>
            {gameWon && (
                <Confetti 
                    width={windowSize.width} 
                    height={windowSize.height}
                    style={{ position: "fixed", top: 0, left: 0, zIndex: 100 }} 
                />
            )}
            
            <h1 className="title">Equalzi</h1>
            
            {!hasStarted ? (
                <>
                    <p className="start-instructions">Roll until held dice equal the target sum before time runs out! 🕙💨</p>
                    <button className="game-control" onClick={startGame}>
                        Start Game
                    </button>
                </>
            ) : (
                <>
                    {gameActive && !gameWon &&                     
                        <div className="game-status">
                            <p className="instructions">Roll until held dice equal: <strong>{rollSum}</strong></p>
                            <p className="timer">
                                Time Remaining: <strong>{timeLeft}s</strong>
                            </p>
                        </div>
                    }

                    {gameWon && 
                        <div className="game-status">
                            <p className="win-message">You Won! Press "New Game" to start again. ✨</p>
                        </div>
                    }
                    {!gameActive && !gameWon && 
                        <div className="game-status">
                            <p className="game-over">Time's Up! Press "Try Again" to restart. 😥</p>
                        </div>
                    }

                    <div className="dice-container">
                        {diceElements}
                    </div>
                    
                    <button ref={buttonRef} className="game-control" onClick={rollDice}>
                        {buttonText}
                    </button>
                </>
            )}
        </main>
    )
}