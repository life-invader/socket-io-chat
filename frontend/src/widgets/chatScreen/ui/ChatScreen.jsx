import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { SendMessage } from '@features/message/sendMessage';
import { MessageCard, useMessageStore } from '@entities/message';
import { selectRoom, useRoomStore } from '@entities/room';
import { selectUser, useUserStore } from '@entities/user';
import { sendMessage, subscribeMessages } from '@shared/model/socket/messageService';
import { selectMessageSliceData } from '../model/selectors';
import { messageService } from '@shared/model/socket';
import './style.css';

export const ChatScreen = () => {
  const user = useUserStore(selectUser);
  const room = useRoomStore(selectRoom);
  const { messages, addMessage, addMessages, clearMessages } = useMessageStore(
    useShallow(selectMessageSliceData),
  );

  const messageSendHandler = (message) => {
    sendMessage(room, message);
  };

  useEffect(() => {
    clearMessages();
    messageService.getRoomMessages(room, addMessages);
    const unsub = subscribeMessages(addMessage);

    return () => {
      unsub();
    };
  }, [addMessage, addMessages, clearMessages, room]);

  return (
    <div className="chatScreen">
      <ul className="chatScreen__messages">
        {messages.map((msg) => (
          <li key={msg.time} className="chatScreen__item">
            <MessageCard msg={msg} user={user} />
          </li>
        ))}
      </ul>

      <SendMessage onMessageSend={messageSendHandler} />
    </div>
  );
};
