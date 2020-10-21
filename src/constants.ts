export const Bot = 'Bot' as const;
export const Human = 'Human' as const;
export const Empty = 'Empty' as const;
export const None = 'None' as const;
export const Draw = 'Draw' as const;

export type Player = typeof Bot | typeof Human;
export type TileType = Player | typeof Empty;
export type Winner = Player | typeof Draw | typeof None;
export type BoardState = TileType[];
