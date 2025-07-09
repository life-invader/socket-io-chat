import { useEffect, useRef } from 'react';
import { SendMessage } from '@features/message/sendMessage';
import {
  MessageCard,
  selectAddMessage,
  selectClearMessages,
  selectMessages,
  useMessageStore,
} from '@entities/message';
import { selectRoom, useRoomStore } from '@entities/room';
import { selectUser, useUserStore } from '@entities/user';
import { subscribeMessages } from '@shared/model/socket/messageService';
import './style.css';

export const ChatScreen = () => {
  // room
  const user = useUserStore(selectUser);
  const room = useRoomStore(selectRoom);

  // messages
  const messages = useMessageStore(selectMessages);
  const addMessage = useMessageStore(selectAddMessage);
  const clearMessages = useMessageStore(selectClearMessages);

  useEffect(() => {
    clearMessages();
    const unsub = subscribeMessages(addMessage);

    return () => {
      unsub();
    };
    // eslint-disable-next-line
  }, [addMessage, clearMessages]);

  return (
    <div className="chatScreen">
      <ul className="chatScreen__messages">
        {messages.map((msg, index) => (
          <MessageCard msg={msg} user={user} />
        ))}
      </ul>

      <SendMessage room={room} />
    </div>
  );
};
