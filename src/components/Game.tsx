import React from 'react';
import {Button} from './Button';
import {Winner} from '../constants';
import {EndText} from './EndText';
import {Text} from './Text';
import styles from './game.module.css';

export const Game: React.FC<{
  awaitingComputer: boolean;
  onRestart: () => void;
  winner: Winner;
}> = ({awaitingComputer, children, onRestart, winner}) => {
  return (
    <div className={styles.game}>
      <div style={{height: '100px'}}>
        <Text type="h1">Tic Tac Toe</Text>
        <Button onClick={onRestart}>New Game</Button>
        <EndText winner={winner} />
      </div>
      {React.Children.only(children)}
      {awaitingComputer ? (
        <Text type="p">Thinking...</Text>
      ) : (
        <Text type="p">Your turn</Text>
      )}
    </div>
  );
};
