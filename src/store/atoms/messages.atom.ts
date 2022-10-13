import { atom } from "recoil";
import { Message } from "@/store/models";

export const messagesState = atom<Message[]>({
  key: "messagesState",
  default: [],
});
