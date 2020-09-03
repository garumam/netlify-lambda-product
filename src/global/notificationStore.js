import React, { createContext, useState } from 'react';
import Notification from '../components/Notification';

const initialState = {
  open: false,
  type: 'success',
  messages: [''],
  time: null,
};
const store = createContext(initialState);
const { Provider } = store;

function NotificationProvider({ children }) {
  const [state, setState] = useState(initialState);

  const returnNewState = (type, messages, time) => {
    return {
      open: true,
      type,
      messages: typeof messages === 'string' ? [messages] : messages,
      time,
    };
  };

  const notify = {
    MESSAGE: (messages, time = null) => {
      setState(returnNewState('success', messages, time));
    },
    ERROR: (messages, time = null) => {
      setState(returnNewState('error', messages, time));
    },
    CLOSE: () => {
      setState((oldState) => ({
        ...oldState,
        time: null,
        open: false,
      }));
    },
  };

  return (
    <Provider value={notify}>
      <Notification {...state} />
      {children}
    </Provider>
  );
}

export { store, NotificationProvider };
