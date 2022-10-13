import { atom } from "recoil";
import { Dispatcher } from "@/store/dispatchers";

export const dispatcherState = atom<Dispatcher | undefined>({
  key: "dispatcherState",
  default: undefined,
});
