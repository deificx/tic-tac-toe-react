/// <reference path="./Board.d.ts" />

import * as React from 'react';
import './Board.css';
import Tile from '../Tile';

export default class Board extends React.Component<BoardProps, {}> {
  render() {
    return (
      <div id="Board" className={`w${this.props.size.toString()}`}>
        {this.props.board.map((tile, index) => {
          return (
            <Tile
              key={`tile-${index}`}
              location={index}
              onMarkBoard={this.props.onMarkBoard}
              type={tile}
            />
          );
        })}
      </div>
    );
  }
}
