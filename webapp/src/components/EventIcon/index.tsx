import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EWorkDayEvents } from '../../interfaces';
import { faTag, faSunglasses, faBed } from '@fortawesome/pro-regular-svg-icons';

interface IEventIconProps {
  event: EWorkDayEvents;
}

export const EventIcon: React.FC<IEventIconProps> = ({ event }) => {
  const title = event;

  if (event === 'Day off') {
    return <FontAwesomeIcon title={title} icon={faSunglasses} />;
  }

  if (event === 'Sick day') {
    return <FontAwesomeIcon title={title} icon={faBed} />;
  }

  return <FontAwesomeIcon title={title} icon={faTag} />;
};
