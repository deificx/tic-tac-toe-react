import React from 'react';
import {Bot, Draw, Human, None, Winner} from '../constants';
import {Text} from './Text';

export const EndText: React.FC<{winner: Winner}> = ({winner}) => {
  switch (winner) {
    case Bot:
      return <Text type="p">Computer master race wins</Text>;

    case Human:
      return <Text type="p">Foul smelly human wins&hellip; and stinks</Text>;

    case Draw:
      return (
        <Text type="p">Draw is the best you can ever hope for petty Human</Text>
      );

    case None:
    default:
      return null;
  }
};
