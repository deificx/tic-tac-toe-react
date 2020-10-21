import './index.css';

import React from 'react';
import {render} from 'react-dom';
import {BoardState, Bot, Human, None, Player, Winner} from './constants';
import {getBotMove, checkBoard, emptyBoard, updateBoard} from './tic-tac-toe';
import {Game} from './components/Game';
import {Tiles} from './components/Tiles';

const initialState = {
  board: emptyBoard as BoardState,
  idle: true,
  turn: Human as Player,
  winner: None as Winner,
};

const reducer = (
  state: typeof initialState,
  action:
    | {location: number; player: Player; type: 'move'}
    | {type: 'restart'}
    | {type: 'winner'; winner: Winner}
) => {
  switch (action.type) {
    case 'move':
      return {
        ...state,
        board: updateBoard(action.location, action.player, state.board),
        idle: false,
        turn: action.player === Bot ? Human : Bot,
      };

    case 'restart':
      return {...initialState, idle: state.turn === Human, turn: state.turn};

    case 'winner':
      return {...state, winner: action.winner};
  }
};

const App: React.FC = () => {
  const [{board: tiles, idle, turn, winner}, dispatch] = React.useReducer(
    reducer,
    initialState
  );

  React.useEffect(() => {
    if (winner !== None || idle) {
      return;
    }

    const currentWinner = checkBoard(tiles);
    if (currentWinner !== winner) {
      dispatch({type: 'winner', winner: currentWinner});
    }

    // If it is the players turn we don't need to calculate a botMove
    if (turn === Human) {
      return;
    }

    const update = async () => {
      const location = await getBotMove(tiles);
      dispatch({location, player: Bot, type: 'move'});
    };

    update();
  }, [dispatch, idle, tiles, turn, winner]);

  return (
    <Game
      awaitingComputer={winner === None && turn === Bot}
      onRestart={() => dispatch({type: 'restart'})}
      winner={winner}
    >
      <Tiles
        gameOver={winner !== None}
        onMarkBoard={(location: number) => {
          dispatch({location, player: Human, type: 'move'});
        }}
        tiles={tiles}
      />
    </Game>
  );
};

render(<App />, document.getElementById('root'));
