/// <reference path="./App.d.ts" />

import * as React from 'react';
import Board from '../Board';
import './App.css';
import {Bot, Draw, Empty, Human, None} from '../constants';
import {checkBoard, calculateMove, newBoard} from '../utils';

export default class App extends React.Component<{}, AppState> {
  constructor() {
    super();

    this.handleMarkBoard = this.handleMarkBoard.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
    this.handleTestBoard = this.handleTestBoard.bind(this);
    this.handleBotMove = this.handleBotMove.bind(this);

    this.state = {
      board: newBoard,
      turn: Human,
      winner: None,
    };
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
    this.setState({board: newBoard, winner: None}, () => {
      if (this.state.turn === Bot) {
        this.handleBotMove();
      }
    });
  }

  render() {
    const {turn, winner} = this.state;
    return (
      <div id="App">
        <div style={{height: '100px'}}>
          <h1>Tic Tac Toe</h1>
          <button onClick={this.handleRestart}>New Game</button>
          {winner === Human && <p>Foul smelly human wins&hellip; and stinks</p>}
          {winner === Bot && <p>Computer master race wins</p>}
          {winner === Draw && (
            <p>Draw is the best you can ever hope for petty Human</p>
          )}
        </div>
        <div id="Game">
          <Board board={this.state.board} onMarkBoard={this.handleMarkBoard} />
        </div>
      </div>
    );
  }

  private handleTestBoard(moveBot: boolean) {
    const winner: Winner = checkBoard(this.state.board);
    if (moveBot && winner === None) {
      this.handleBotMove();
    } else {
      this.setState({winner});
    }
  }

  private handleBotMove() {
    const move = calculateMove(this.state.board);
    this.handleMarkBoard(Bot, move.location);
  }
}
