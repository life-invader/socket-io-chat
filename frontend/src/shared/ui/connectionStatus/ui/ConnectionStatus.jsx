import { clsx } from 'clsx';
import './style.css';

export const ConnectionStatus = ({ isOnline = false }) => {
  const classNames = clsx({
    connectionStatus: true,
    'connectionStatus--isOnline': isOnline,
  });

  return <div className={classNames}></div>;
};
