import { notification } from "antd";
export const NotificationCycberbug = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};
