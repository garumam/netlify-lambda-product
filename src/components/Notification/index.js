import React, { useContext, useEffect } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { BiMessageError } from 'react-icons/bi';
import { store } from '../../global/notificationStore';

import { Container } from './styles';

function Notification({ open, type, messages, time }) {
  const notify = useContext(store);

  const closeMessage = () => {
    notify.CLOSE();
  };

  useEffect(() => {
    let timeoutRef = null;

    if (time) {
      timeoutRef = setTimeout(closeMessage, time * 1000);
    }

    return () => {
      clearTimeout(timeoutRef);
    };
  }, [time]);

  return (
    <Container
      onClick={closeMessage}
      type={type}
      style={open ? { top: '1rem' } : null}
    >
      {type === 'success' ? <BsCheckCircle /> : <BiMessageError />}
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </Container>
  );
}

export default Notification;
