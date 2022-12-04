import { useContext, createContext, useReducer, useEffect } from "react";
import { UserAuth } from "./AuthContext";
import { createMatchId } from "helpers/createMatchId";

const ChatContext = createContext(null);

export const ChatContextProvider = ({ children }) => {
  const { user } = UserAuth();
  const INITIAL_STATE = {
    chatId: "null",
    user: {},
  };

  const chatReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload.user,
          chatId: createMatchId(user.uid, action.payload.uid),
        };
      case "CHANGE_USER_CHAT":
        return {
          user: action.payload.user,
          chatId: action.payload.chatId,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE, () => {
    const localData = localStorage.getItem("state");
    if (!localData || localData === "undefined") {
      return INITIAL_STATE;
    } else {
      return JSON.parse(localData);
    }
  });

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const UserChat = () => {
  return useContext(ChatContext);
};