import React from 'react';
import classNames from 'classnames';
import {Bot, Human, Empty, TileType, BoardState} from '../constants';
import {Button} from './Button';
import styles from './tiles.module.css';

const mark = {
  [Bot]: 'O',
  [Empty]: ' ',
  [Human]: 'X',
};

const Mark: React.FC<{type: TileType}> = ({type}) => (
  <div className={classNames(styles.tile, styles[type])}>{mark[type]}</div>
);

const Action: React.FC<{
  gameOver: boolean;
  onClick: () => void;
  type: TileType;
}> = ({gameOver, onClick, type}) =>
  gameOver ? (
    <Mark type={type} />
  ) : (
    <Button
      className={classNames(styles.tile, styles.Empty, styles.clickable)}
      onClick={onClick}
    >
      {' '}
    </Button>
  );

const Tile: React.FC<{
  gameOver: boolean;
  onClick: () => void;
  type: TileType;
}> = ({gameOver, onClick, type}) =>
  type === Empty ? (
    <Action gameOver={gameOver} onClick={onClick} type={type} />
  ) : (
    <Mark type={type} />
  );

export const Tiles: React.FC<{
  gameOver: boolean;
  onMarkBoard: (location: number) => void;
  tiles: BoardState;
}> = ({gameOver, onMarkBoard, tiles}) => (
  <div className={styles.tiles}>
    {tiles.map((tile, location) => (
      <Tile
        gameOver={gameOver}
        key={`tile-${location}`}
        onClick={() => onMarkBoard(location)}
        type={tile}
      />
    ))}
  </div>
);
