import { atom, selectorFamily } from "recoil";
import { User } from "@/store/models";

export const usersState = atom<User[]>({
  key: "usersState",
  default: [],
});

export const userIdState = atom<string | null>({
  key: "userIdState",
  default: null,
});

export const userState = selectorFamily<User, string>({
  key: "userState",
  get:
    (id) =>
    ({ get }) => {
      const users = get(usersState);
      return users.find((user) => user.id === id) as User;
    },
});
