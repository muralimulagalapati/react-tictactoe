import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

const Square = ({item, handleClick, move=''}) => {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={() => handleClick(item)}>
        <span>{move}</span>
    </div>
  );
}

const Board = () => {
  const initialMoves = {
    '11': '',
    '12': '',
    '13': '',
    '21': '',
    '22': '',
    '23': '',
    '31': '',
    '32': '',
    '33': ''
  };
  const initialCurr = 'X';
  const initialWinner = 'None';
  const [curr, setCurr] = useState(initialCurr);
  const [moves, setMoves] = useState(initialMoves);
  const [winner, setWinner] = useState(initialWinner);

  const handleClick = (item) => {
    if (winner !== 'None') return;
    if (moves[item]) return;
    setMoves({...moves, [item]: curr});
    setCurr(curr === 'X'? 'O': 'X');
  }

  const reset = () => {
    setMoves(initialMoves);
    setCurr(initialCurr);
    setWinner(initialWinner);
  }

  useEffect(() => {
    const winner = determineWinner();
    if (winner) {
      setWinner(winner);
      setCurr('None');
    }
    Object.values(moves).filter(Boolean).length === 9 && setCurr('None')
  }, [moves])

  const determineWinner = () => {
    const filteredMoves = Object.values(moves).filter(Boolean);
    if (filteredMoves.length < 5) return false;
    return moves['11'] === moves['12'] && moves['11'] === moves['13']
      ? moves['11']
      : moves['21'] === moves['22'] && moves['21'] === moves['23']
      ? moves['21']
      : moves['31'] === moves['32'] && moves['31'] === moves['33']
      ? moves['31']
      : moves['11'] === moves['21'] && moves['11'] === moves['31']
      ? moves['11']
      : moves['12'] === moves['22'] && moves['12'] === moves['32']
      ? moves['12']
      : moves['13'] === moves['23'] && moves['13'] === moves['33']
      ? moves['13']
      : moves['11'] === moves['22'] && moves['11'] === moves['33']
      ? moves['11']
      : moves['13'] === moves['22'] && moves['13'] === moves['31']
      ? moves['13']
      : false
  }

  return (
    <div style={containerStyle} className="gameBoard">
      <div className="status" style={instructionsStyle}>Next player: {curr}</div>
      <div className="winner" style={instructionsStyle}>Winner: {winner}</div>
      <button style={buttonStyle} onClick={reset}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square item='11' handleClick={handleClick} move={moves['11']}/>
          <Square item='12' handleClick={handleClick} move={moves['12']}/>
          <Square item='13' handleClick={handleClick} move={moves['13']}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square item='21' handleClick={handleClick} move={moves['21']}/>
          <Square item='22' handleClick={handleClick} move={moves['22']}/>
          <Square item='23' handleClick={handleClick} move={moves['23']}/>
        </div>
        <div className="board-row" style={rowStyle}>
          <Square item='31' handleClick={handleClick} move={moves['31']}/>
          <Square item='32' handleClick={handleClick} move={moves['32']}/>
          <Square item='33' handleClick={handleClick} move={moves['33']}/>
        </div>
      </div>
    </div>
  );
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
