import './StartMenu.css';

const StartMenu = ({ startGame }) => {
    return (
        <>
            <h2>Secret Word</h2>
            <div>Click in the button below to start the game!</div>
            <button className="defaultAppButton" onClick={startGame}>Play Now!</button>
        </>
    )
}

export default StartMenu