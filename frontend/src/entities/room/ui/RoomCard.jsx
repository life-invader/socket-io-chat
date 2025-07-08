import './style.css';

export const RoomCard = ({ onClick, users }) => {
  return (
    <div className="roomCard">
      <button className="roomCard__btn" onClick={onClick}>
        <span className="roomCard__users">({users.length} чел.)</span>
      </button>

      <div className="roomCard__usersList">
        {users.map((item) => (
          <span key={item} className="roomCard__user">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};
