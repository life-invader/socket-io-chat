import { useEffect, useRef } from 'react';
import { SendMessage } from '@features/message/sendMessage';
import { MessageCard } from '@entities/message';
import { selectUser, useUserStore } from '@entities/user';
import { useMessageStore } from '@shared/model/store/messageSlice';
import { subscribeMessages } from '@shared/model/socket/messageService';
import { useRoomStore } from '@shared/model/store/roomSlice';
import './style.css';

export const ChatScreen = () => {
  const user = useUserStore(selectUser);
  const room = useRoomStore((state) => state.room);
  const messages = useMessageStore((s) => s.messages);
  const addMessage = useMessageStore((s) => s.addMessage);
  const clearMessages = useMessageStore((s) => s.clearMessages);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    clearMessages();
    const unsub = subscribeMessages(addMessage);

    return () => {
      unsub();
    };
    // eslint-disable-next-line
  }, [addMessage, clearMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chatScreen">
      <ul className="chatScreen__messages">
        {messages.map((msg, index) => (
          <MessageCard msg={msg} user={user} />
        ))}

        <div ref={messagesEndRef} />
      </ul>

      <SendMessage room={room} />
    </div>
  );
};
