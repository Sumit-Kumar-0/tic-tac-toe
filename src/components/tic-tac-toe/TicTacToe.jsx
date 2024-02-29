import React, { useEffect, useState } from "react";
import "./TicTacToe.css";
import Button from "../buttons/Button";
import { MyToaster } from "../toaster/MyToaster";

export default function TicTacToe() {
  const [boxs, setBoxs] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("x");
  const [win, setWin] = useState(false);
  const [winnerName, setWinnerName] = useState(null);

  const boxClickHandler = (e) => {
    let boxId = e.target.getAttribute("val");
    const allBoxs = [...boxs];
    if (!boxs[boxId]) {
      allBoxs[boxId] = turn;
      setBoxs(allBoxs);
      setTurn(turn === "x" ? "o" : "x");
    } else MyToaster("choose another box", "error");
  };
  const winLogics = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  useEffect(() => {
    for (let winLogic of winLogics) {
      const [first, second, third] = winLogic;
      if (
        boxs[first] &&
        boxs[first] === boxs[second] &&
        boxs[first] === boxs[third]
      ) {
        setWin(true);
        setWinnerName(boxs[first]);
      }
    }
  }, [boxs]);

  const resetHandler = () => {
    setWin(false);
    setBoxs(Array(9).fill(null));
    setTurn(winnerName);
  };

  console.log(">>>>>>>> render");
  return (
    <div className="main-container">
      <h1 className="heading">Tic Tak Toe</h1>
      {win === false ? (
        <div className="board" onClick={boxClickHandler}>
          {boxs.map((box, i) => {
            return (
              <div key={i} val={i} className="box">
                {box}
              </div>
            );
          })}
          <div className="match-info">
            <div className="player-turn">
              player <span className="p">{turn}</span> turn
            </div>
          </div>
        </div>
      ) : (
        <div className="player-win">
          <p>player {winnerName} is winner</p>
          <Button text="play again" onClick={resetHandler} />
        </div>
      )}
    </div>
  );
}
