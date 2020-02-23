import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EWorkDayEvents } from '../../interfaces';
import {
  faTag,
  faTreePalm,
  faSyringe,
  faConstruction,
  faClock,
  faHome,
} from '@fortawesome/pro-regular-svg-icons';
import styled from '@emotion/styled';

interface IEventIconProps {
  event: EWorkDayEvents;
}

const TagIcon = styled(FontAwesomeIcon)`
  margin: 1px 0 0 1px;
`;

export const EventIcon: React.FC<IEventIconProps> = ({ event }) => {
  const title = event;

  if (event === 'DAY_OFF') {
    return <FontAwesomeIcon title={title} icon={faTreePalm} />;
  }

  if (event === 'WFH') {
    return <FontAwesomeIcon title={title} icon={faHome} />;
  }

  if (event === 'SICK_DAY') {
    return <FontAwesomeIcon title={title} icon={faSyringe} />;
  }

  if (event === 'PUBLIC_TRANSPORT_SHORTAGE') {
    return <FontAwesomeIcon title={title} icon={faConstruction} />;
  }

  if (event === 'PUBLIC_TRANSPORT_DELAY') {
    return <FontAwesomeIcon title={title} icon={faClock} />;
  }

  return <TagIcon title={title} icon={faTag} />;
};
