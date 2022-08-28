import { USER_SIGN_API } from "../constants/CyberBugs/CyberBug";

export const signinCyberbugAction = (email, passWord) => {
  return {
    type: USER_SIGN_API,
    userLogin: {
      email: email,
      passWord: passWord,
    },
  };
};
