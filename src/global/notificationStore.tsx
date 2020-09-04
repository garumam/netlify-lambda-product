import React, { createContext, useState } from 'react';
import Notification from '../components/Notification';

type MessageType = string | string[];
type TimeType = number | null;

interface MyContext {
  MESSAGE(messages: MessageType, time: TimeType): void;
  ERROR(messages: MessageType, time: TimeType): void;
  CLOSE(): void;
}

const store = createContext({} as MyContext);

const { Provider } = store;

interface StateFormat {
  open: boolean;
  type: string;
  messages: string[];
  time: TimeType;
}

const initialState: StateFormat = {
  open: false,
  type: 'success',
  messages: [''],
  time: null,
};

const NotificationProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(initialState);

  const returnNewState = (
    type: StateFormat['type'],
    messages: MessageType,
    time: StateFormat['time']
  ): StateFormat => {
    return {
      open: true,
      type,
      messages: typeof messages === 'string' ? [messages] : messages,
      time,
    };
  };

  const notify: MyContext = {
    MESSAGE: (messages: MessageType, time: TimeType = null) => {
      setState(returnNewState('success', messages, time));
    },
    ERROR: (messages: MessageType, time: TimeType = null) => {
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
};

export { store, NotificationProvider };
