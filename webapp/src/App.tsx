import React from 'react';
import { hot } from 'react-hot-loader/root';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-regular-svg-icons';

const App: React.FC = () => {
  return (
    <div>
      hell yea! <FontAwesomeIcon icon={faTimes} />
    </div>
  );
};

export default process.env.NODE_ENV === 'development' ? hot(App) : App;
