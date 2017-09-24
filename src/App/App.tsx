/// <reference path="./App.d.ts" />

import * as React from 'react';
import Board from '../Board';
import './App.css';
import {Bot, Draw, Empty, Human, None} from '../constants';
import {checkBoard, calculateMove, generateBoard} from '../utils';

function convert(n: string): BoardSize {
  const sizes: BoardSize[] = [3, 4, 5];
  return sizes.filter(i => i.toString() === n).shift() || 3;
}

export default class App extends React.Component<{}, AppState> {
  constructor() {
    super();

    this.handleBoardSize = this.handleBoardSize.bind(this);
    this.handleMarkBoard = this.handleMarkBoard.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleTestBoard = this.handleTestBoard.bind(this);
    this.handleBotMove = this.handleBotMove.bind(this);

    const size = 3;
    const {board} = generateBoard(size);

    this.state = {
      board,
      size,
      turn: Human,
      winner: None,
    };
  }

  handleBoardSize(event: any) {
    this.setState({size: convert(event.target.value)}, () => {
      this.handleRestart();
    });
  }

  handleMarkBoard(player: Bot | Human, location: number) {
    if (this.state.winner !== None || this.state.turn !== player) {
      return;
    }
    this.setState(
      {
        board: this.state.board.map((tile, index) => {
          return location === index ? player : tile;
        }),
        turn: player === Human ? Bot : Human,
      },
      () => {
        this.handleTestBoard(player === Human);
      }
    );
  }

  handleRestart() {
    const {board} = generateBoard(this.state.size);
    this.setState({board, winner: None}, () => {
      if (this.state.turn === Bot) {
        this.handleBotMove();
      }
    });
  }

  render() {
    const {size, turn, winner} = this.state;
    return (
      <div id="App">
        <div style={{height: '100px'}}>
          <h1>Tic Tac Toe</h1>
          <select onChange={this.handleBoardSize}>
            {[3, 4, 5].map((boardSize: BoardSize) => {
              return (
                <option
                  key={boardSize}
                  value={boardSize}
                >{`${boardSize}x${boardSize}`}</option>
              );
            })}
          </select>
          <button onClick={this.handleRestart}>New Game</button>
          {winner === Human && <p>Foul smelly human wins&hellip; and stinks</p>}
          {winner === Bot && <p>Computer master race wins</p>}
          {winner === Draw && (
            <p>Draw is the best you can ever hope for petty Human</p>
          )}
        </div>
        <div id="Game">
          <Board
            board={this.state.board}
            onMarkBoard={this.handleMarkBoard}
            size={size}
          />
        </div>
      </div>
    );
  }

  private handleTestBoard(moveBot: boolean) {
    const {board, size} = this.state;
    const winner: Winner = checkBoard(board, size);
    if (moveBot && winner === None) {
      this.handleBotMove();
    } else {
      this.setState({winner});
    }
  }

  private handleBotMove() {
    const {board, size} = this.state;
    const move = calculateMove(board, size);
    this.handleMarkBoard(Bot, move.location);
  }
}
