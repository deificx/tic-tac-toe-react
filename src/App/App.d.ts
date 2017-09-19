type Bot = 'Bot';
type Human = 'Human';
type Empty = 'Empty';
type Draw = 'Draw';
type None = 'None';

type TileType = Bot | Human | Empty;
type Winner = Bot | Human | Draw | None;
type Board = TileType[];

type MarkBoard = (player: Bot | Human, location: number) => void;

interface AppState {
  board: Board;
  turn: Bot | Human;
  winner: Winner;
}

interface Move {
  location: number;
  score: number;
}
