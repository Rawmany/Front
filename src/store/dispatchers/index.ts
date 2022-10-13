import { useRecoilCallback } from "recoil";
import { usersState, userIdState } from "@/store/atoms/users.atom";
import { messagesState } from "@/store/atoms/messages.atom";
import { globalErrorState } from "@/store/atoms/error.atom";

import { Message, User } from "@/store/models";

export const createDispatcher = () => {
  const setMessages = useRecoilCallback(({ set }) => (messages: Message[]) => {
    set(messagesState, () => {
      return messages;
    });
  });

  const setUsers = useRecoilCallback(({ set }) => (users: User[]) => {
    set(usersState, () => {
      return users;
    });
  });

  const setCurrentUserId = useRecoilCallback(({ set }) => (id: string) => {
    set(userIdState, () => {
      return id;
    });
  });

  const setGlobalError = useRecoilCallback(({ set }) => (error: string) => {
    set(globalErrorState, () => error);
  });

  return {
    setUsers,
    setMessages,
    setCurrentUserId,
    setGlobalError,
  };
};

export type Dispatcher = ReturnType<typeof createDispatcher>;
