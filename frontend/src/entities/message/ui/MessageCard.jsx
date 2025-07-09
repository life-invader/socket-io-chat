import './style.css';

export const MessageCard = ({ msg, user }) => {
  return (
    <div className={`messageCard ${msg.user === user ? 'messageCard--own' : ''}`}>
      <span className="messageCard__user">{msg.user}:</span> {msg.message}
      <span className="messageCard__time">
        {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
};
