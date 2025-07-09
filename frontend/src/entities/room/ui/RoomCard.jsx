import './style.css';

export const RoomCard = ({ onClick, roomName, users = [] }) => {
  return (
    <button className="roomCard" onClick={onClick}>
      {roomName && <p className="roomCard__name">{roomName}</p>}

      <span className="roomCard__users">({users.length} чел.)</span>

      {!!users.length && (
        <div className="roomCard__usersList">
          {users.map((item) => (
            <span key={item} className="roomCard__user">
              {item}
            </span>
          ))}
        </div>
      )}
    </button>
  );
};
