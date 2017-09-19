/// <reference path="../App/App.d.ts" />

import * as React from 'react';
import './Tile.css';
import {Bot, Human, Empty} from '../constants';

export default class Tile extends React.Component<
  {location: number; onMarkBoard: MarkBoard; type: TileType},
  {}
> {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.props.type === Empty) {
      this.props.onMarkBoard(Human, this.props.location);
    }
  }
  mark(type: TileType) {
    switch (type) {
      case Bot:
        return 'O';
      case Human:
        return 'X';
      case Empty:
      default:
        return ' ';
    }
  }
  render() {
    const {type} = this.props;
    return (
      <div className={'tile ' + type} onClick={this.handleClick}>
        {this.mark(type)}
      </div>
    );
  }
}
