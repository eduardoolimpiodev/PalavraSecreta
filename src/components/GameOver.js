import './GameOver.css';

const GameOver = ({ retry, score }) => {
  return (
    <>
      <h2 className='gameOverTitle'>Game Over</h2>
      <h3>Your score: <span>{score}</span></h3>
      <button className="defaultAppButton" onClick={retry}>Play Again</button>
    </>
  )
}

export default GameOver