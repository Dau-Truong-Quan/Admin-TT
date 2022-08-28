import { notification } from "antd";
export const NotificationWithIcon = (type, message, description) => {
  notification[type]({
    message: message,
    description: description,
  });
};
