import React, { useState } from 'react';

function App() {
  const [player, setPlayer] = useState("X")
  const [victory, setVictory] = useState(false)
  const [playingBoard, setPlayingBoard] = useState([['','',''],['','',''],['','','']])

  function handleClick(cellIndex:number, rowIndex:number) {
      let b = [...playingBoard]
      if (b[rowIndex][cellIndex] === ''){
        b[rowIndex][cellIndex] = player
        setPlayingBoard(b)
        player === "X" ? setPlayer("O") : setPlayer("X")
      };
      checkWinStatus(cellIndex, rowIndex)
  }

  function checkWinStatus(cellIndex:number, rowIndex:number){
    //if straight up and down 
    if (playingBoard[rowIndex][0] === playingBoard[rowIndex][1] && playingBoard[rowIndex][0] === playingBoard[rowIndex][2] ){
      setVictory(true)
    }
    //if straight left to right
    else if (playingBoard[0][cellIndex] === playingBoard[1][cellIndex] && playingBoard[0][cellIndex] === playingBoard[2][cellIndex] ){
      setVictory(true)
    }
    //if diagonal one way
    else if (playingBoard[0][0] === playingBoard[1][1] && playingBoard[0][0] === playingBoard[2][2] ){
    // else if (playingBoard[rowIndex-1][0] === playingBoard[rowIndex][1] && playingBoard[rowIndex-1][0] === playingBoard[rowIndex+1][2] ){
      if (playingBoard[1][1] !== ''){
        setVictory(true)
      }
    }
    //if diagonal other way
    else if (playingBoard[2][0] === playingBoard[1][1] && playingBoard[2][0] === playingBoard[0][2] ){
      if (playingBoard[1][1] !== ''){
        setVictory(true)  
      }
    }
  }  

  function handlePlayAgain(){
    setPlayingBoard([['','',''],['','',''],['','','']])
    setVictory(false)
  }

  return (
    <div className='flex justify-center pt-14 space-x-8'>
      <div className={player === "O" ? 'border mr-8 border-solid': 'border mr-8 border-solid bg-green-600' } >
            <h2>PLAYER X</h2>
      </div>

      {playingBoard.map((row, rowIndex) => {
        return (
          <div className='flex flex-col justify-center items-center ' key={rowIndex}>
            {row.map((cell, cellIndex) => {
              return (
                <div className="h-14 w-14 border border-solid flex justify-center items-center cursor-pointer -ml-8" onClick={() => handleClick(cellIndex, rowIndex)} key={cellIndex}>
                  {cell}
                </div>
              )
            })}
          </div>
        )
      })}
          <div className={player === "X" ?  'border border-solid': 'border border-solid bg-green-600'}>
            <h2>PLAYER O</h2>
          </div>
          {victory ? <div className='absolute flex flex-col justify-center items-center bg-amber-200 shadow-2xl shadow-yellow-200 rounded-xl p-12 space-y-4'>
                        <h1> Congrats Player {player === "X" ? "O" : "X"}, You won!</h1> 
                        <button onClick={handlePlayAgain} className='h-4 bg-blue-600 text-xs p-2 shadow-md shadow-blue-400 rounded-xl hover:bg-blue-500'> <p className='-mt-2'>Play Again</p></button>
                      </div>
                        : null}
    </div>
  );
}

export default App;
