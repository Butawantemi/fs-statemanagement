import { createContext, useState } from "react";

const NotificationContext = createContext();

export default NotificationContext;

export const NotificationContextProvider = (props) => {
  const [notification, SetNotification] = useState(null);

  const addNotification = (message) => SetNotification(message);

  return (
    <NotificationContext.Provider value={{ notification, addNotification }}>
      {props.children}
    </NotificationContext.Provider>
  );
};
